// The 3D shelf at the top of the homepage: the five Fast Series apps as boxed
// products under studio light on a reflective floor. Loaded lazily and only in
// the browser, so the prerendered page and first paint never wait on three.js.
//
// Motion: on load the camera dollies in, the lights come up, and the boxes
// rise out of the floor one after another on springs, each catching a sheen as
// it lands. Picking a box (click, tab, or a swipe across the shelf) sends it
// through one turntable spin with a sheen; hovering leans a box toward the
// cursor; the picked box floats and sways. Resting on the FastCast box turns
// it around to show the real app, which then starts recording. With reduced
// motion none of the movement runs: the canvas renders on demand, boxes snap
// to their places, and the FastCast box snaps around instead of spinning.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Environment, Html, Lightformer, MeshReflectorMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { Product, ProductAction } from './products';
import { trackCtaClick } from '../lib/analytics';

const BOX_W = 1.5;
const BOX_H = 2;
const BOX_D = 0.24;
const SPACING = 1.95;
const FLOOR_Y = -BOX_H / 2 - 0.02;

type SceneProps = {
  products: Product[];
  selected: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
};

/** Paints the front of a box: the app icon, name, job, status and price. */
function useBoxArt(product: Product) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = product.icon384;

    Promise.all([
      img.decode().catch(() => undefined),
      document.fonts?.load('800 96px Archivo').catch(() => undefined),
      document.fonts?.load('500 40px Archivo').catch(() => undefined),
    ]).then(() => {
      if (cancelled) return;
      const w = canvas.width;
      const h = canvas.height;

      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#1b212b');
      bg.addColorStop(1, '#0d1015');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // A wash of the product colour behind the icon, like light on packaging.
      const wash = ctx.createRadialGradient(w / 2, 330, 20, w / 2, 330, 420);
      wash.addColorStop(0, hexToRgba(product.color, 0.28));
      wash.addColorStop(1, hexToRgba(product.color, 0));
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = product.color;
      ctx.fillRect(0, 0, w, 14);

      if (img.complete && img.naturalWidth) {
        const size = 310;
        ctx.drawImage(img, (w - size) / 2, 120, size, size);
      }

      ctx.textAlign = 'left';
      ctx.fillStyle = '#f4f7fa';
      (ctx as CanvasRenderingContext2D & { fontStretch?: string }).fontStretch = 'condensed';
      ctx.font = '800 104px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.name, 60, 590, w - 120);

      ctx.fillStyle = '#98a2b3';
      (ctx as CanvasRenderingContext2D & { fontStretch?: string }).fontStretch = 'normal';
      ctx.font = '500 42px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.verb, 62, 650);

      ctx.fillStyle = '#2a303a';
      ctx.fillRect(60, 700, w - 120, 2);

      ctx.fillStyle = product.priceTone === 'pro' ? '#f5b942' : product.priceTone === 'free' ? '#32d583' : '#98a2b3';
      ctx.font = '700 44px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.boxPrice, 60, 770);

      ctx.fillStyle = '#98a2b3';
      ctx.font = '500 34px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.version ? `${product.status}  ·  v${product.version}` : product.status, 60, 826);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      setTexture(tex);
    });

    return () => {
      cancelled = true;
    };
  }, [product]);

  useEffect(() => () => texture?.dispose(), [texture]);

  return texture;
}

function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/**
 * A damped spring. Unlike exponential easing it carries velocity, so a box
 * that is sent somewhere overshoots a touch and settles, which reads as weight.
 */
type Spring = { x: number; v: number };

function spring(s: Spring, target: number, dt: number, stiffness = 90, damping = 13) {
  const a = stiffness * (target - s.x) - damping * s.v;
  s.v += a * dt;
  s.x += s.v * dt;
  return s.x;
}

function snap(s: Spring, target: number) {
  s.x = target;
  s.v = 0;
  return target;
}

/** A soft diagonal band of light, swept across a box front when it is picked. */
let sheenImage: HTMLCanvasElement | null = null;
function makeSheenTexture() {
  if (!sheenImage) {
    sheenImage = document.createElement('canvas');
    sheenImage.width = 256;
    sheenImage.height = 4;
    const ctx = sheenImage.getContext('2d');
    if (ctx) {
      const g = ctx.createLinearGradient(0, 0, 256, 0);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.42, 'rgba(255,255,255,0)');
      g.addColorStop(0.5, 'rgba(255,255,255,0.5)');
      g.addColorStop(0.58, 'rgba(255,255,255,0)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 4);
    }
  }
  const tex = new THREE.CanvasTexture(sheenImage);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.center.set(0.5, 0.5);
  tex.rotation = -0.45;
  tex.offset.x = 1;
  return tex;
}

/**
 * The back of the FastCast box: the real app, from two real screenshots. It
 * starts on the Ready screen; when it "presses record" it switches to the
 * capture of FastCast mid-recording and paints a live counter over that
 * capture's Stop recording timer, starting from zero.
 */
const BACK_READY = '/assets/FastCast/fastcast-default-view.png';
const BACK_RECORDING = '/assets/FastCast/fastcast-green-screen.png';
// Where the timer sits in fastcast-green-screen.png (730×792): the text box and
// the flat red of the button behind it.
const TIMER_BOX = { x: 224, y: 727, w: 60, h: 18 };
const TIMER_TEXT = { x: 227, y: 741 };
const TIMER_BG = '#e94b52';

type BackMode = 'ready' | 'recording';

function useFastCastBack(enabled: boolean) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const draw = useRef<(mode: BackMode, seconds: number) => void>(() => {});

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ready = new Image();
    const recording = new Image();
    ready.src = BACK_READY;
    recording.src = BACK_RECORDING;

    Promise.all([ready.decode().catch(() => undefined), recording.decode().catch(() => undefined)]).then(() => {
      if (cancelled) return;
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;

      const shotW = 720;
      const scale = shotW / 730;
      const shotX = 24;
      // Status line on top, screenshot under it, and the bottom band left clear
      // for the centre tile's button, the same as on the front.
      const shotY = 92;

      draw.current = (mode, seconds) => {
        const w = canvas.width;
        const h = canvas.height;
        ctx.fillStyle = '#0d1015';
        ctx.fillRect(0, 0, w, h);

        const img = mode === 'recording' ? recording : ready;
        if (img.naturalWidth) {
          const shotH = (img.naturalHeight / img.naturalWidth) * shotW;
          ctx.drawImage(img, shotX, shotY, shotW, shotH);
        }

        if (mode === 'recording') {
          const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');
          const clock = `${pad(seconds / 3600)}:${pad((seconds / 60) % 60)}:${pad(seconds % 60)}`;
          ctx.fillStyle = TIMER_BG;
          ctx.fillRect(
            shotX + TIMER_BOX.x * scale,
            shotY + TIMER_BOX.y * scale,
            TIMER_BOX.w * scale,
            TIMER_BOX.h * scale,
          );
          ctx.fillStyle = '#fdecee';
          ctx.font = `${Math.round(12.5 * scale)}px "Segoe UI", system-ui, sans-serif`;
          ctx.textAlign = 'left';
          ctx.fillText(clock, shotX + TIMER_TEXT.x * scale, shotY + TIMER_TEXT.y * scale);
        }

        // Status line above the screenshot, in the app's own words.
        ctx.textAlign = 'left';
        ctx.font = '700 38px Archivo, "Segoe UI", sans-serif';
        ctx.fillStyle = '#f4f7fa';
        ctx.fillText('FastCast', 36, 66);
        ctx.textAlign = 'right';
        if (mode === 'recording') {
          ctx.fillStyle = '#e94b52';
          ctx.fillText('Recording', w - 36, 66);
          ctx.beginPath();
          ctx.arc(w - 36 - ctx.measureText('Recording').width - 22, 54, 11, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#32d583';
          ctx.fillText('Ready', w - 36, 66);
        }
        ctx.textAlign = 'left';

        tex.needsUpdate = true;
      };

      draw.current('ready', 0);
      setTexture(tex);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => () => texture?.dispose(), [texture]);

  return { texture, draw };
}

/** The button on the centre tile: the product's main action, as a real link. */
function TileCta({ product }: { product: Product }) {
  const action: ProductAction = product.actions[0];
  const onClick = () => {
    if (action.kind === 'download') trackCtaClick(product.slug, 'download_clicked', 'shelf', action.href);
  };
  return (
    <a
      className={`hm-tile-cta${action.kind === 'download' ? '' : ' hm-tile-cta-quiet'}`}
      href={action.href}
      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {action.label}
    </a>
  );
}

/**
 * Where a box sits relative to the picked one on a looped shelf: -2..2 for
 * five boxes, so there are always two apps either side of centre stage.
 */
function shelfOffset(index: number, selected: number, count: number) {
  const half = Math.floor(count / 2);
  return ((((index - selected + half) % count) + count) % count) - half;
}

const SHEEN_TIME = 0.95;
const ENTRANCE_DELAY = 0.35;
const ENTRANCE_STAGGER = 0.13;

function Box({
  product,
  index,
  selected,
  onSelect,
  reducedMotion,
  onRecordingChange,
  release,
  onHover,
  count,
}: {
  product: Product;
  index: number;
  selected: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
  onRecordingChange: (recording: boolean) => void;
  /** Bumped by the scene when the pointer leaves the shelf or rests on another box. */
  release: number;
  onHover: (index: number) => void;
  count: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const isFastCast = product.slug === 'fastcast';
  const back = useFastCastBack(isFastCast);
  const [hovered, setHovered] = useState(false);
  const art = useBoxArt(product);
  const invalidate = useThree((s) => s.invalidate);
  const sheen = useMemo(() => makeSheenTexture(), []);
  const sheenMat = useRef<THREE.MeshBasicMaterial>(null);

  // Motion state lives in refs so the frame loop never re-renders React.
  const m = useRef({
    px: { x: shelfOffset(index, selected, count) * SPACING, v: 0 },
    py: { x: reducedMotion ? 0 : -3.2, v: 0 },
    pz: { x: 0, v: 0 },
    ry: { x: reducedMotion ? 0 : 1.1 - index * 0.35, v: 0 },
    rx: { x: 0, v: 0 },
    tiltX: { x: 0, v: 0 },
    tiltY: { x: 0, v: 0 },
    scale: { x: 1, v: 0 },
    spin: 0,
    tiltTarget: { x: 0, y: 0 },
    start: null as number | null,
    sheenAt: -10,
    landed: false,
    flipped: false,
  });
  // Timers for the FastCast hover sequence: dwell, then flip, then record.
  const timers = useRef<{ dwell?: number; record?: number; tick?: number; leave?: number }>({});
  const prevSelected = useRef(selected);
  const [ctaReady, setCtaReady] = useState(false);
  // Mirrors m.current.flipped for rendering: the tile button moves below the
  // box while its back (the real app) is showing, so it never covers it.
  const [showingBack, setShowingBack] = useState(false);

  // The centre tile's button appears once the box has actually come to rest
  // (checked in the frame loop below), so it never sits still over a box that
  // is still spinning into place, however fast or slow the frames come.
  const ctaShown = useRef(false);
  useEffect(() => {
    ctaShown.current = false;
    setCtaReady(false);
  }, [selected]);

  useEffect(() => {
    if (art) invalidate();
  }, [art, invalidate]);

  useEffect(() => () => sheen.dispose(), [sheen]);

  // Picked: one full turntable spin, in the direction it travelled, and a sheen.
  useEffect(() => {
    const prev = prevSelected.current;
    prevSelected.current = selected;
    if (reducedMotion || prev === selected || selected !== index) return;
    m.current.spin += (shelfOffset(index, prev, count) > 0 ? -1 : 1) * Math.PI * 2;
    m.current.sheenAt = performance.now() / 1000 + 0.25;
  }, [selected, index, reducedMotion]);

  useFrame((state, rawDelta) => {
    const g = ref.current;
    if (!g) return;
    const s = m.current;
    const dt = Math.min(rawDelta, 1 / 30);
    const offset = shelfOffset(index, selected, count);
    const isSelected = offset === 0;

    // Centre stage: the picked box sits in the middle, front, and the rest of
    // the shelf fans out on either side of it with a little extra room.
    const rowX = offset * SPACING + Math.sign(offset) * 0.35;
    // A flipped box is brought to the front and toward the middle, like
    // something picked up off the shelf to look at.
    const tx = s.flipped ? rowX * 0.3 : rowX;
    // A box that wraps from one end of the loop to the other re-enters from
    // the outside edge instead of sweeping across the whole shelf.
    if (Math.abs(tx - s.px.x) > SPACING * 3 && !reducedMotion) {
      s.px.x = tx + Math.sign(tx) * SPACING * 1.5;
      s.px.v = 0;
    }
    const flipped = s.flipped;
    const tz = flipped ? 1.6 : isSelected ? 0.9 : -Math.abs(offset) * 0.45;
    // Flipped boxes face the camera square, back side out.
    const tYaw = (isSelected || flipped ? 0 : -Math.sign(offset) * 0.42) + (flipped ? Math.PI : 0);
    let ty = isSelected || flipped ? 0.12 : 0;
    if (hovered && !isSelected && !flipped) ty += 0.12;
    const tScale = flipped ? 1.12 : isSelected ? 1.04 : hovered ? 1.02 : 1;

    if (isSelected && !ctaShown.current) {
      const settled =
        reducedMotion ||
        (s.landed &&
          Math.abs(s.ry.x - (tYaw + s.spin)) < 0.12 &&
          Math.abs(s.ry.v) < 0.4 &&
          Math.abs(s.px.x - tx) < 0.08);
      if (settled) {
        ctaShown.current = true;
        setCtaReady(true);
      }
    }

    if (reducedMotion) {
      g.position.set(snap(s.px, tx), snap(s.py, ty), snap(s.pz, tz));
      g.rotation.set(0, snap(s.ry, tYaw), 0);
      g.scale.setScalar(snap(s.scale, tScale));
      if (sheenMat.current) sheenMat.current.opacity = 0;
      return;
    }

    const t = state.clock.elapsedTime;
    const now = performance.now() / 1000;
    if (s.start === null) s.start = t;
    const age = t - s.start - ENTRANCE_DELAY - index * ENTRANCE_STAGGER;

    // Entrance: hold each box under the floor until its turn, then let the
    // springs throw it up into place with a quarter turn.
    if (age < 0) {
      g.position.set(tx, s.py.x, tz);
      g.rotation.set(0, s.ry.x, 0);
      s.px.x = tx;
      s.pz.x = tz;
      return;
    }
    if (!s.landed && age > 0.55) {
      s.landed = true;
      s.sheenAt = now;
    }

    const float = Math.sin(t * 0.9 + index * 1.3) * (isSelected ? 0.05 : 0.03);
    const sway = isSelected && !flipped ? Math.sin(t * 0.6) * 0.07 : 0;
    const soft = age < 1.4;

    g.position.set(
      spring(s.px, tx, dt, 70, 12),
      spring(s.py, ty + float, dt, soft ? 60 : 90, soft ? 9 : 13),
      spring(s.pz, tz, dt, 70, 12),
    );

    const ry = spring(s.ry, tYaw + s.spin + sway, dt, 52, 10.5);
    const leaning = hovered && !flipped;
    const tiltX = spring(s.tiltX, leaning ? s.tiltTarget.x : 0, dt, 120, 14);
    const tiltY = spring(s.tiltY, leaning ? s.tiltTarget.y : 0, dt, 120, 14);
    g.rotation.set(tiltX, ry + tiltY, 0);
    g.scale.setScalar(spring(s.scale, tScale, dt, 160, 16));

    // Sheen: a band of light crosses the front once, left to right.
    const mat = sheenMat.current;
    if (mat) {
      const p = (now - s.sheenAt) / SHEEN_TIME;
      if (p >= 0 && p <= 1) {
        const eased = p * p * (3 - 2 * p);
        sheen.offset.x = 0.9 - eased * 1.8;
        mat.opacity = Math.sin(p * Math.PI);
      } else {
        mat.opacity = 0;
      }
    }
  });

  const clearTimers = () => {
    const tm = timers.current;
    window.clearTimeout(tm.dwell);
    window.clearTimeout(tm.record);
    window.clearInterval(tm.tick);
    tm.dwell = tm.record = tm.tick = undefined;
  };

  // FastCast only: rest on the box and it turns around to show the real app,
  // then "presses record" and the timer starts counting.
  const startRecording = () => {
    const started = performance.now();
    back.draw.current('recording', 0);
    onRecordingChange(true);
    invalidate();
    timers.current.tick = window.setInterval(() => {
      back.draw.current('recording', (performance.now() - started) / 1000);
      invalidate();
    }, 250);
  };

  const engage = () => {
    if (!isFastCast || m.current.flipped || timers.current.dwell !== undefined) return;
    timers.current.dwell = window.setTimeout(() => {
      m.current.flipped = true;
      setShowingBack(true);
      invalidate();
      timers.current.record = window.setTimeout(startRecording, reducedMotion ? 400 : 1100);
    }, 900);
  };

  const leave = () => {
    clearTimers();
    setHovered(false);
    document.body.style.cursor = '';
    if (m.current.flipped) {
      m.current.flipped = false;
      setShowingBack(false);
      back.draw.current('ready', 0);
      onRecordingChange(false);
    }
    invalidate();
  };

  // Let go when the scene says so. Pointer-out on the box itself is not enough
  // once it is flipped: it has moved out from under the cursor on purpose.
  const firstRelease = useRef(true);
  useEffect(() => {
    if (firstRelease.current) {
      firstRelease.current = false;
      return;
    }
    leave();
  }, [release]);

  useEffect(
    () => () => {
      clearTimers();
      window.clearTimeout(timers.current.leave);
    },
    [],
  );

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    window.clearTimeout(timers.current.leave);
    onHover(index);
    setHovered(true);
    document.body.style.cursor = 'pointer';
    engage();
    invalidate();
  };
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    const g = ref.current;
    if (!g || reducedMotion) return;
    const local = g.worldToLocal(e.point.clone());
    // Lean the box toward the cursor, as if it were being picked up.
    m.current.tiltTarget.x = -(local.y / BOX_H) * 0.3;
    m.current.tiltTarget.y = (local.x / BOX_W) * 0.4;
  };
  // Pointer-out also fires when the ray crosses from one part of the box to
  // another, or slips off an edge mid-turn, so only let go after a short grace.
  const onOut = () => {
    window.clearTimeout(timers.current.leave);
    if (m.current.flipped) {
      setHovered(false);
      return;
    }
    timers.current.leave = window.setTimeout(leave, 90);
  };

  return (
    <group
      ref={ref}
      position={[shelfOffset(index, selected, count) * SPACING, reducedMotion ? 0 : -3.2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        // A swipe that happens to end on a box is a swipe, not a pick, and the
        // tap that ends a press-and-hold on FastCast is not a pick either.
        if (e.delta > 8 || m.current.flipped) return;
        onSelect(index);
      }}
      onPointerOver={onOver}
      onPointerMove={onMove}
      onPointerOut={onOut}
      onPointerDown={(e) => {
        // Phones have no hover: press and hold on FastCast does the same job.
        // A still finger never sends a move, so start the hold on the touch.
        if (e.nativeEvent.pointerType !== 'touch') return;
        onHover(index);
        engage();
      }}
      onPointerUp={(e) => {
        // Let go before the hold completes and it was only a tap.
        if (e.nativeEvent.pointerType !== 'touch' || m.current.flipped) return;
        window.clearTimeout(timers.current.dwell);
        timers.current.dwell = undefined;
      }}
    >
      <RoundedBox args={[BOX_W, BOX_H, BOX_D]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial color="#12161d" roughness={0.38} metalness={0.2} clearcoat={1} clearcoatRoughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, BOX_D / 2 + 0.002]}>
        <planeGeometry args={[BOX_W - 0.08, BOX_H - 0.08]} />
        {art ? (
          <meshPhysicalMaterial
            map={art}
            emissiveMap={art}
            emissive="#ffffff"
            emissiveIntensity={0.55}
            roughness={0.32}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        ) : (
          <meshStandardMaterial color="#181d25" />
        )}
      </mesh>
      <mesh position={[0, 0, BOX_D / 2 + 0.005]}>
        <planeGeometry args={[BOX_W - 0.08, BOX_H - 0.08]} />
        <meshBasicMaterial
          ref={sheenMat}
          map={sheen}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      {ctaReady ? (
        <Html position={[0, showingBack ? -BOX_H / 2 - 0.26 : -0.8, 0]} center zIndexRange={[20, 0]} wrapperClass="hm-tile-cta-wrap">
          <TileCta product={product} />
        </Html>
      ) : null}
      {back.texture ? (
        <mesh position={[0, 0, -BOX_D / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[BOX_W - 0.08, BOX_H - 0.08]} />
          <meshPhysicalMaterial
            map={back.texture}
            emissiveMap={back.texture}
            emissive="#ffffff"
            emissiveIntensity={0.6}
            roughness={0.35}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>
      ) : null}
      {/* A thin strip of the product colour down each spine. */}
      <mesh position={[BOX_W / 2 + 0.001, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[BOX_D - 0.06, BOX_H - 0.1]} />
        <meshStandardMaterial color={product.color} emissive={product.color} emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-BOX_W / 2 - 0.001, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[BOX_D - 0.06, BOX_H - 0.1]} />
        <meshStandardMaterial color={product.color} emissive={product.color} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

/**
 * Frames the shelf for the canvas shape (the centre box with two neighbours a
 * side when wide, one when narrow), dollies in on load, and drifts a little
 * with the pointer.
 */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, size, pointer } = useThree();
  const aspect = size.width / size.height;
  const halfWidth = aspect > 1.5 ? 5.5 : aspect > 1.3 ? 3.6 : 2.1;
  const fov = 32;
  const distance = Math.max(6.4, halfWidth / (Math.tan(THREE.MathUtils.degToRad(fov / 2)) * aspect));
  const intro = useRef(!reducedMotion);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = fov;
    if (intro.current) cam.position.set(0, 2.4, distance + 4.5);
    else cam.position.set(0, 0.9, distance);
    intro.current = false;
    cam.lookAt(0, -0.25, 0);
    cam.updateProjectionMatrix();
  }, [camera, distance]);

  useFrame((_, rawDelta) => {
    if (reducedMotion) return;
    const dt = Math.min(rawDelta, 1 / 30);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.5, 2.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.9 + pointer.y * 0.25, 1.6, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, distance, 1.5, dt);
    camera.lookAt(0, -0.25, 0);
  });

  return null;
}

/** Lights come up on load, and the rim light fades to the picked product's colour. */
function Lights({ color, reducedMotion }: { color: string; reducedMotion: boolean }) {
  const spot = useRef<THREE.SpotLight>(null);
  const rim = useRef<THREE.PointLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const target = useMemo(() => new THREE.Color(color), [color]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30);
    if (reducedMotion) {
      if (spot.current) spot.current.intensity = 120;
      if (ambient.current) ambient.current.intensity = 0.5;
      rim.current?.color.copy(target);
      return;
    }
    if (spot.current) spot.current.intensity = THREE.MathUtils.damp(spot.current.intensity, 120, 1.8, dt);
    if (ambient.current) ambient.current.intensity = THREE.MathUtils.damp(ambient.current.intensity, 0.5, 1.8, dt);
    rim.current?.color.lerp(target, 1 - Math.exp(-3 * dt));
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={reducedMotion ? 0.5 : 0.05} />
      <directionalLight position={[2, 4, 6]} intensity={1.4} />
      <spotLight ref={spot} position={[0, 7, 5]} angle={0.6} penumbra={1} intensity={reducedMotion ? 120 : 0} />
      {/* Rim light in the selected product's colour, low and behind the shelf. */}
      <pointLight ref={rim} position={[0, 1.5, -2.5]} intensity={14} distance={9} color={color} />
    </>
  );
}

function InvalidateOn({ value }: { value: unknown }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [value, invalidate]);
  return null;
}

export default function StoreScene({ products, selected, onSelect, reducedMotion }: SceneProps) {
  const [recording, setRecording] = useState(false);
  const [release, setRelease] = useState(0);
  const hoveredIndex = useRef<number | null>(null);
  const onHover = (index: number) => {
    // Resting on a different box puts a flipped one back on the shelf.
    if (hoveredIndex.current !== null && hoveredIndex.current !== index) setRelease((n) => n + 1);
    hoveredIndex.current = index;
  };
  // While the FastCast box is "recording", the rim light goes tally red.
  const color = recording ? '#e94b52' : (products[selected]?.color ?? '#3b82f6');
  const swipe = useRef<{ x: number; y: number } | null>(null);

  // Swipe left or right anywhere on the shelf to move to the next app.
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const n = products.length;
    onSelect((selected + (dx < 0 ? 1 : n - 1)) % n);
  };

  return (
    <div
      className="hm-scene"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onContextMenu={(e) => e.preventDefault()}
      onPointerLeave={(e) => {
        // A finger lifting off the screen also "leaves"; on touch, a tap on
        // empty space or another box is what puts FastCast back.
        if (e.pointerType === 'touch') return;
        hoveredIndex.current = null;
        setRelease((n) => n + 1);
      }}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 32, position: [0, 0.9, 9] }}
        onPointerMissed={() => {
          document.body.style.cursor = '';
          hoveredIndex.current = null;
          setRelease((n) => n + 1);
        }}
      >
        <color attach="background" args={['#0a0c10']} />
        <fog attach="fog" args={['#0a0c10', 9, 20]} />
        <CameraRig reducedMotion={reducedMotion} />
        <InvalidateOn value={selected} />
        <Lights color={color} reducedMotion={reducedMotion} />

        {products.map((product, index) => (
          <Box
            key={product.slug}
            product={product}
            index={index}
            selected={selected}
            onSelect={onSelect}
            reducedMotion={reducedMotion}
            onRecordingChange={setRecording}
            release={release}
            onHover={onHover}
            count={products.length}
          />
        ))}

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y, 0]}>
          <planeGeometry args={[60, 30]} />
          <MeshReflectorMaterial
            blur={[300, 80]}
            resolution={1024}
            mixBlur={1}
            mixStrength={34}
            roughness={1}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.3}
            color="#0c0f14"
            metalness={0.6}
            mirror={0}
          />
        </mesh>

        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.4} position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[-6, 1, 3]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[6, 1, 3]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
          <Lightformer form="ring" intensity={0.8} color="#3b82f6" position={[0, 2, -6]} scale={3} />
        </Environment>
      </Canvas>
    </div>
  );
}
