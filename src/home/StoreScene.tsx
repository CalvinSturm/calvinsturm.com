// The 3D shelf at the top of the homepage: the five Fast Series apps as boxed
// products under studio light on a reflective floor. Loaded lazily and only in
// the browser, so the prerendered page and first paint never wait on three.js.
//
// Motion budget: one entrance (the boxes rise into place, staggered), a slow
// idle float, and a small tilt that follows the pointer. With reduced motion
// all three are off and the canvas only renders on demand: the boxes are drawn
// in their resting pose and move only when the visitor picks a product.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Environment, Lightformer, MeshReflectorMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { Product } from './products';

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
        const size = 340;
        ctx.drawImage(img, (w - size) / 2, 150, size, size);
      }

      ctx.textAlign = 'left';
      ctx.fillStyle = '#f4f7fa';
      (ctx as CanvasRenderingContext2D & { fontStretch?: string }).fontStretch = 'condensed';
      ctx.font = '800 104px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.name, 60, 650, w - 120);

      ctx.fillStyle = '#98a2b3';
      (ctx as CanvasRenderingContext2D & { fontStretch?: string }).fontStretch = 'normal';
      ctx.font = '500 42px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.verb, 62, 716);

      ctx.fillStyle = '#2a303a';
      ctx.fillRect(60, 800, w - 120, 2);

      ctx.fillStyle = product.priceTone === 'pro' ? '#f5b942' : product.priceTone === 'free' ? '#32d583' : '#98a2b3';
      ctx.font = '700 44px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.boxPrice, 60, 880);

      ctx.fillStyle = '#98a2b3';
      ctx.font = '500 34px Archivo, "Segoe UI", sans-serif';
      ctx.fillText(product.version ? `${product.status}  ·  v${product.version}` : product.status, 60, 944);

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

function Box({
  product,
  index,
  selected,
  onSelect,
  reducedMotion,
}: {
  product: Product;
  index: number;
  selected: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const art = useBoxArt(product);
  const invalidate = useThree((s) => s.invalidate);
  const born = useRef<number | null>(null);

  useEffect(() => {
    if (art) invalidate();
  }, [art, invalidate]);

  const wide = useThree((s) => s.size.width / s.size.height > 1.5);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const offset = index - selected;
    const isSelected = offset === 0;

    // Wide canvases show the whole row centred; narrow ones slide the row so
    // the picked box sits in the middle.
    const tx = (wide ? index - 2 : offset) * SPACING;
    const tz = isSelected ? 0.7 : -Math.abs(offset) * 0.45;
    const tryaw = isSelected ? 0 : -Math.sign(offset) * 0.42;
    let ty = isSelected ? 0.12 : 0;
    if (hovered && !isSelected) ty += 0.1;

    if (reducedMotion) {
      g.position.set(tx, ty, tz);
      g.rotation.set(0, tryaw, 0);
      return;
    }

    // Entrance: each box rises out of the floor a beat after the one before.
    const t = state.clock.elapsedTime;
    if (born.current === null) born.current = t;
    const age = t - born.current - index * 0.11;
    if (age < 0) {
      g.position.set(tx, -2.6, tz);
      return;
    }

    ty += Math.sin(t * 0.9 + index * 1.3) * 0.035;
    const k = age < 1.2 ? 4 : 6;
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, k, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, k, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, tz, k, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tryaw, k, delta);
  });

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    invalidate();
  };
  const onOut = () => {
    setHovered(false);
    document.body.style.cursor = '';
    invalidate();
  };

  return (
    <group
      ref={ref}
      position={[(index - 2) * SPACING, reducedMotion ? 0 : -2.6, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={onOver}
      onPointerOut={onOut}
    >
      <RoundedBox args={[BOX_W, BOX_H, BOX_D]} radius={0.05} smoothness={4} castShadow>
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
      {/* A thin strip of the product colour down the spine. */}
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

/** Frames the shelf for the canvas shape: all five boxes when wide, three when narrow. */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, size, pointer } = useThree();
  const aspect = size.width / size.height;
  const halfWidth = aspect > 1.5 ? 4.9 : aspect > 1 ? 3.6 : 2.3;
  const fov = 32;
  const distance = Math.max(6.4, halfWidth / (Math.tan(THREE.MathUtils.degToRad(fov / 2)) * aspect));

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = fov;
    cam.position.set(0, 0.9, distance);
    cam.lookAt(0, -0.25, 0);
    cam.updateProjectionMatrix();
  }, [camera, distance]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.5, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.9 + pointer.y * 0.25, 2.5, delta);
    camera.lookAt(0, -0.25, 0);
  });

  return null;
}

function InvalidateOn({ value }: { value: unknown }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [value, invalidate]);
  return null;
}

export default function StoreScene({ products, selected, onSelect, reducedMotion }: SceneProps) {
  const lightColor = useMemo(() => products[selected]?.color ?? '#3b82f6', [products, selected]);

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 32, position: [0, 0.9, 9] }}
      onPointerMissed={() => {
        document.body.style.cursor = '';
      }}
    >
      <color attach="background" args={['#0a0c10']} />
      <fog attach="fog" args={['#0a0c10', 9, 20]} />
      <CameraRig reducedMotion={reducedMotion} />
      <InvalidateOn value={selected} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 6]} intensity={1.4} />
      <spotLight position={[0, 7, 5]} angle={0.6} penumbra={1} intensity={120} color="#ffffff" />
      {/* Rim light in the selected product's colour, low and behind the shelf. */}
      <pointLight position={[0, 1.5, -2.5]} intensity={14} distance={9} color={lightColor} />

      {products.map((product, index) => (
        <Box
          key={product.slug}
          product={product}
          index={index}
          selected={selected}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
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
  );
}
