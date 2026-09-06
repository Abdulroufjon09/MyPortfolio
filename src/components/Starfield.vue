<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

interface Star {
  x: number; // sahifa koordinatalari (px)
  y: number;
  size: number; // px
  baseOpacity: number;
  bright: boolean;
  twinkleSpeed: number; // rad/s
  twinklePhase: number;
  driftAmpX: number; // px
  driftAmpY: number; // px
  driftSpeedX: number; // rad/s
  driftSpeedY: number;
  driftPhaseX: number;
  driftPhaseY: number;
  curX: number; // joriy siljish (px) — silliq yaqinlashish
  curY: number;
}

interface ShootingStar {
  x: number; // boshlanish nuqtasi (px, sahifa koordinatalari)
  y: number;
  dx: number; // uchish vektori (px)
  dy: number;
  duration: number; // s
  delay: number; // s (manfiy → sikllarni fazalash)
}

// Bitta ekran balandligiga to'g'ri keladigan yulduzlar soni
// (osmon to'lib ketmaydi, lekin bo'm-bo'sh ham ko'rinmaydi).
const STARS_PER_VIEWPORT = 85;
const MAX_STARS = 900;
// Kursor yaqinida yulduzlarning qochish radiusi va kuchi (px)
const REPEL_RADIUS = 170;
const REPEL_MAX = 30;
const STREAK_LEN = 140; // uchib o'tuvchi yulduzning izi uzunligi (px)

const canvasEl = ref<HTMLCanvasElement | null>(null);

let ctx: CanvasRenderingContext2D | null = null;
let glow: HTMLCanvasElement | null = null; // yumshoq yulduz spriti
let stars: Star[] = [];
let shootingStars: ShootingStar[] = [];
let coveredH = 0; // qaysi balandlikkacha yulduz joylashtirilgan (px)
let docW = 0; // sahifa kengligi (yulduz x koordinatalari uchun)
let docH = 0; // sahifa balandligi (yulduz zichligi uchun)
let scale = 1; // canvas backing-store koeffitsiyenti (devicePixelRatio)
let rafId = 0;
let staticRaf = 0;
let lastDraw = 0;
let staticMode = false;
let roTimer = 0;
let resizeObserver: ResizeObserver | null = null;

// Canvas ENDI viewport o'lchamida (fixed) — sahifa bo'ylab cho'zilgan
// ulkan tekstura telefon GPU'sini bo'g'ardi. Yulduzlar sahifa
// koordinatalarida qoladi, chizishda scroll siljishi ayiriladi.
const mouse = { x: -1e9, y: -1e9 }; // VIEWPORT koordinatalari (clientX/Y)
// Touch qurilmalarda kadr tezligini 30fps ga cheklaymiz — twinkle/drift
// sekin, 60fps farqi ko'rinmaydi, lekin GPU/batareya yuki ikki barobar kamayadi.
const FRAME_MS = window.matchMedia("(pointer: coarse)").matches ? 33 : 16;

const inBand = (y: number, top: number, bottom: number, pad = 120) =>
  y >= top - pad && y <= bottom + pad;

const makeStar = (y: number): Star => {
  const bright = Math.random() < 0.1;
  const size = bright ? 2.2 + Math.random() * 1.3 : 1 + Math.random() * 1.2;
  return {
    x: Math.random() * docW,
    y,
    size: Number(size.toFixed(2)),
    baseOpacity: bright
      ? 0.75 + Math.random() * 0.25
      : 0.35 + Math.random() * 0.45,
    bright,
    twinkleSpeed: 1.2 + Math.random() * 2.2,
    twinklePhase: Math.random() * Math.PI * 2,
    driftAmpX: 4 + Math.random() * 8,
    driftAmpY: 3 + Math.random() * 6,
    driftSpeedX: 0.12 + Math.random() * 0.3,
    driftSpeedY: 0.1 + Math.random() * 0.28,
    driftPhaseX: Math.random() * Math.PI * 2,
    driftPhaseY: Math.random() * Math.PI * 2,
    curX: 0,
    curY: 0,
  };
};

// Yulduzlarni faqat yangi ochilgan oraliqqa qo'shamiz — resize'da hech narsa siljimaydi.
const ensureStarsCover = () => {
  if (docH <= coveredH) return;
  const vh = window.innerHeight;
  const band = docH - coveredH;
  const count = Math.min(
    MAX_STARS - stars.length,
    Math.max(1, Math.round((band / vh) * STARS_PER_VIEWPORT)),
  );
  for (let i = 0; i < count; i++) {
    stars.push(makeStar(coveredH + Math.random() * band));
  }
  coveredH = docH;
};

// Uchib o'tuvchi yulduzlar — uzoq davrli, fazalangan sikllar.
const initShootingStars = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  shootingStars = [
    { x: 0.86 * docW, y: 0.08 * docH, dx: -0.58 * vw, dy: 0.4 * vh, duration: 17, delay: -4 },
    { x: 0.78 * docW, y: 0.2 * docH, dx: -0.72 * vw, dy: 0.48 * vh, duration: 23, delay: -13 },
    { x: 0.94 * docW, y: 0.05 * docH, dx: -0.5 * vw, dy: 0.34 * vh, duration: 29, delay: -22 },
  ];
};

// Canvas o'lchami faqat VIEWPORT — hujjat emas. Yulduzlar modeli sahifa
// koordinatalarida qolgani uchun resize'da hech narsa siljimaydi (pop yo'q).
const resize = () => {
  const el = canvasEl.value;
  if (!el) return;
  docW = document.documentElement.clientWidth;
  docH = Math.max(document.documentElement.scrollHeight, window.innerHeight);
  scale = Math.min(window.devicePixelRatio || 1, 2);
  el.width = Math.max(1, Math.round(window.innerWidth * scale));
  el.height = Math.max(1, Math.round(window.innerHeight * scale));
  ensureStarsCover();
  if (shootingStars.length === 0) initShootingStars();
};

// Yumshoq, anti-aliased yulduz chizish uchun tayyor radial sprite
const makeGlowSprite = () => {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d");
  if (!g) return;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.3, "rgba(255,255,255,0.85)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  glow = c;
};

const paintStar = (x: number, y: number, size: number, alpha: number, bright: boolean) => {
  if (!ctx || !glow || alpha <= 0.02) return;
  if (bright) {
    // Dastlabki ko'rinishdagi kabi kichik, yumshoq halo (avvalgi box-shadow o'rnida)
    const halo = size * 5;
    ctx.globalAlpha = Math.min(alpha * 0.4, 1);
    ctx.drawImage(glow, x - halo / 2, y - halo / 2, halo, halo);
  }
  // Aniq, kichik oq nuqta — asl o'lcham (size px) saqlanadi
  ctx.globalAlpha = Math.min(alpha, 1);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};

const shootAlpha = (p: number) => {
  if (p < 0.02) return p / 0.02; // paydo bo'lish
  if (p < 0.12) return 1; // ko'rinish
  if (p < 0.15) return 1 - (p - 0.12) / 0.03; // so'nish
  return 0;
};

const paintShootingStar = (s: ShootingStar, t: number, top: number) => {
  if (!ctx || !glow) return;
  const dur = s.duration;
  const p = ((((t - s.delay) % dur) + dur) % dur) / dur;
  const alpha = shootAlpha(p);
  if (alpha <= 0.02) return;
  const prog = Math.min(p / 0.12, 1);
  // Sahifa koordinatalaridan VIEWPORT koordinatalariga o'tamiz (scroll ayiriladi)
  const hx = s.x + s.dx * prog - top;
  const hy = s.y + s.dy * prog - top;
  const len = Math.hypot(s.dx, s.dy) || 1;
  const ux = s.dx / len;
  const uy = s.dy / len;
  const tx = hx - ux * STREAK_LEN;
  const ty = hy - uy * STREAK_LEN;

  ctx.globalAlpha = alpha;
  const grad = ctx.createLinearGradient(tx, ty, hx, hy);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(1, "rgba(255,255,255,0.95)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(hx, hy);
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
  ctx.fill();

  const halo = 18;
  ctx.globalAlpha = alpha * 0.6;
  ctx.drawImage(glow, hx - halo / 2, hy - halo / 2, halo, halo);
  ctx.globalAlpha = 1;
};

const drawView = (now: number, animated: boolean) => {
  if (!ctx || !glow) return;
  const t = now / 1000;
  const top = window.scrollY;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Viewport canvas — to'liq tozalash juda arzon (hujjat emas)
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, vw, vh);

  const draws: { s: Star; dx: number; dy: number; alpha: number }[] = [];
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i]!;
    // Yulduz ekrandagi o'rni = sahifa pozitsiyasi − scroll siljishi
    if (!inBand(s.y - top, 0, vh)) continue;
    let alpha = s.baseOpacity;
    let dx = 0;
    let dy = 0;
    if (animated) {
      // Sichqonchadan qochish: kursorga yaqin yulduzlar uzoqlashadi (ekran koordinatalarida)
      const relX = s.x - mouse.x;
      const relY = s.y - top - mouse.y;
      const dist = Math.hypot(relX, relY);
      let pushX = 0;
      let pushY = 0;
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const k = (1 - dist / REPEL_RADIUS) * REPEL_MAX;
        pushX = (relX / dist) * k;
        pushY = (relY / dist) * k;
      }
      // Sekin suzish (drayf)
      const driftX = Math.sin(t * s.driftSpeedX + s.driftPhaseX) * s.driftAmpX;
      const driftY = Math.cos(t * s.driftSpeedY + s.driftPhaseY) * s.driftAmpY;
      // Silliq yaqinlashish (inerciya)
      s.curX += (driftX + pushX - s.curX) * 0.12;
      s.curY += (driftY + pushY - s.curY) * 0.12;
      // Miltillash
      const twinkle =
        0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinklePhase));
      alpha = s.baseOpacity * twinkle;
      dx = s.curX;
      dy = s.curY;
    }
    draws.push({ s, dx, dy, alpha });
  }
  for (const { s, dx, dy, alpha } of draws) {
    paintStar(s.x + dx, s.y + dy - top, s.size, alpha, s.bright);
  }

  if (animated) {
    for (const sh of shootingStars) {
      if (inBand(sh.y - top, 0, vh, 260)) paintShootingStar(sh, t, top);
    }
  }
};

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Static rejim (reduced-motion): fixed canvas scroll'da o'zi siljimaydi,
// shuning uchun scroll hodisasida bandni qayta chizamiz.
const drawStatic = () => {
  cancelAnimationFrame(staticRaf);
  staticRaf = requestAnimationFrame(() => drawView(performance.now(), false));
};

const onPointerMove = (e: PointerEvent) => {
  mouse.x = e.clientX; // viewport koordinatalari
  mouse.y = e.clientY;
};

const resetPointer = () => {
  mouse.x = -1e9;
  mouse.y = -1e9;
};

const tick = (now: number) => {
  if (now - lastDraw >= FRAME_MS) {
    drawView(now, true);
    lastDraw = now;
  }
  rafId = requestAnimationFrame(tick);
};

const onBoxChange = () => {
  window.clearTimeout(roTimer);
  roTimer = window.setTimeout(() => {
    resize();
    if (!rafId) drawStatic();
  }, 150);
};

onMounted(() => {
  const el = canvasEl.value;
  if (!el) return;
  ctx = el.getContext("2d");
  makeGlowSprite();
  resize();
  if (reducedMotion()) {
    staticMode = true;
    window.addEventListener("scroll", drawStatic, { passive: true });
    drawStatic();
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", resetPointer);
    window.addEventListener("pointerup", resetPointer);
    window.addEventListener("pointercancel", resetPointer);
    rafId = requestAnimationFrame(tick);
  }
  // Canvas box'i (viewport) o'zgarsa — backing'ni yangilaymiz; body box'i esa
  // hujjat balandligini aks ettiradi: kontent keyinroq o'ssa (font yuklanishi,
  // dinamik bloklar) pastki band ham yulduzlar bilan to'ldiriladi. Fixed canvas
  // hujjat balandligini kuzatmaydi, shuning uchun body ham kuzatiladi.
  resizeObserver = new ResizeObserver(onBoxChange);
  resizeObserver.observe(el);
  resizeObserver.observe(document.body);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  cancelAnimationFrame(staticRaf);
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerleave", resetPointer);
  window.removeEventListener("pointerup", resetPointer);
  window.removeEventListener("pointercancel", resetPointer);
  window.removeEventListener("scroll", drawStatic);
  window.clearTimeout(roTimer);
  resizeObserver?.disconnect();
  resizeObserver = null;
});
</script>

<template>
  <canvas ref="canvasEl" class="starfield" aria-hidden="true"></canvas>
</template>

<style scoped>
/* VIEWPORT o'lchamidagi fixed qatlam — sahifa bo'ylab cho'zilgan ulkan canvas
   telefon GPU'sini bo'g'ardi. Endi canvas ekran o'lchamida, yulduzlar esa
   sahifa koordinatalarida model qilib saqlanadi va scroll siljishi bilan
   chiziladi (vizual natija avvalgidek: yulduzlar sahifa bilan birga suzadi).
   `width/height: 100%` replaced element tufayli majburiy — aks holda
   attribute balandligi layoutga o'tib, katta scroll paydo bo'ladi. */
.starfield {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  pointer-events: none;
  display: block;
}
</style>