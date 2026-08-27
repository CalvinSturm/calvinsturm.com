import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, AlertTriangle, Mail, Gift, User, Wallet, Lock, FileSearch, Wifi, Volume2, Type, Printer, Eye, Play, Pause } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, PresentationControls, Text3D, Text } from '@react-three/drei';
import * as THREE from 'three';

function FolderModel({ hovered }: { hovered?: boolean }) {
  const paperRef = useRef<THREE.Group>(null);
  const paperSheetRef = useRef<THREE.Mesh>(null);
  const paperLinesRef = useRef<THREE.Group>(null);
  
  useFrame((_state, delta) => {
    if (paperRef.current) {
      paperRef.current.position.x = THREE.MathUtils.lerp(paperRef.current.position.x, hovered ? 2.65 : 0.2, 0.11);
      paperRef.current.position.y = THREE.MathUtils.lerp(paperRef.current.position.y, hovered ? 2.15 : 0.2, 0.11);
      paperRef.current.position.z = THREE.MathUtils.lerp(paperRef.current.position.z, hovered ? 1.45 : 0, 0.11);
      paperRef.current.rotation.x = THREE.MathUtils.lerp(paperRef.current.rotation.x, hovered ? -0.55 : 0, 0.1);
      paperRef.current.rotation.y = THREE.MathUtils.lerp(paperRef.current.rotation.y, hovered ? 1.3 : 0, 0.11);
      paperRef.current.rotation.z = THREE.MathUtils.lerp(paperRef.current.rotation.z, hovered ? -1.35 : 0, 0.11);

      const paperScale = hovered ? 0.3 : 1;
      paperRef.current.scale.x = THREE.MathUtils.lerp(paperRef.current.scale.x, paperScale, 0.12);
      paperRef.current.scale.y = THREE.MathUtils.lerp(paperRef.current.scale.y, paperScale, 0.12);
      paperRef.current.scale.z = THREE.MathUtils.lerp(paperRef.current.scale.z, hovered ? 0.7 : 1, 0.12);
    }

    if (paperSheetRef.current) {
      const targetScale = hovered ? 0.45 : 1;
      paperSheetRef.current.scale.x = THREE.MathUtils.lerp(paperSheetRef.current.scale.x, targetScale, 0.1);
      paperSheetRef.current.scale.y = THREE.MathUtils.lerp(paperSheetRef.current.scale.y, targetScale, 0.1);
      paperSheetRef.current.scale.z = THREE.MathUtils.lerp(paperSheetRef.current.scale.z, hovered ? 0.7 : 1, 0.12);

      const material = paperSheetRef.current.material as THREE.MeshStandardMaterial;
      material.transparent = true;
      material.opacity = THREE.MathUtils.lerp(material.opacity, hovered ? 0.18 : 1, 0.14);
    }

    if (paperLinesRef.current) {
      paperLinesRef.current.scale.x = THREE.MathUtils.lerp(paperLinesRef.current.scale.x, hovered ? 0.55 : 1, 0.12);
      paperLinesRef.current.scale.y = THREE.MathUtils.lerp(paperLinesRef.current.scale.y, hovered ? 0.55 : 1, 0.12);
      paperLinesRef.current.position.z = THREE.MathUtils.lerp(paperLinesRef.current.position.z, hovered ? 0.08 : 0.03, 0.12);
      for (const child of paperLinesRef.current.children) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.transparent = true;
        material.opacity = THREE.MathUtils.lerp(material.opacity, hovered ? 0.12 : 1, 0.14);
      }
    }
  });

  return (
    <group>
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <group ref={paperRef} position={[0.2, 0.2, 0]}>
        <mesh ref={paperSheetRef}>
          <boxGeometry args={[1.6, 1.4, 0.05]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <group ref={paperLinesRef} position={[0, 0, 0.03]}>
          <mesh position={[-0.3, 0.4, 0]}>
            <boxGeometry args={[0.8, 0.1, 0.02]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          <mesh position={[-0.3, 0.15, 0]}>
            <boxGeometry args={[0.7, 0.08, 0.02]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[-0.3, -0.1, 0]}>
            <boxGeometry args={[0.6, 0.08, 0.02]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
        </group>
      </group>
      <mesh position={[0, -0.1, 0.2]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[2, 1.4, 0.1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
}

function OrbitingKey({
  baseAngle,
  baseOffset,
  color,
  seed,
  hoverTimeRef,
}: {
  baseAngle: number;
  baseOffset: number;
  color: string;
  seed: number;
  hoverTimeRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const hv = hoverTimeRef.current;
    const chaos = Math.min(hv / 2.5, 1);

    const baseSpeed = 0.2;
    const hoverSpeed = 2.5 + seed * 0.7;
    const angularSpeed = baseSpeed + (hoverSpeed - baseSpeed) * chaos;

    const wobble =
      chaos *
      (Math.sin(t * (3 + seed) + seed * 2.1) * 0.6 +
        Math.sin(t * (5 + seed * 0.7) + seed) * 0.35);
    const angle = baseAngle + t * angularSpeed + wobble;

    const radius = 1.3 + baseOffset * 0.3 + chaos * Math.sin(t * (2.3 + seed)) * 0.35;
    const yJitter = chaos * Math.sin(t * (4 + seed * 1.3) + seed * 3.1) * 0.45;
    const zJitter = chaos * Math.cos(t * (3.2 + seed * 0.9) + seed * 1.7) * 0.3;

    groupRef.current.position.set(
      Math.cos(angle) * radius,
      yJitter,
      Math.sin(angle) * radius + zJitter,
    );
    groupRef.current.rotation.set(
      chaos * Math.sin(t * (4 + seed)) * 0.8,
      -angle + Math.PI / 2 + chaos * Math.sin(t * 2 + seed) * 0.5,
      Math.PI / 2 + chaos * Math.cos(t * 3 + seed) * 0.8,
    );
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.18, 0.04, 0.03]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function LockModel({ hovered }: { hovered?: boolean }) {
  const shackleRef = useRef<THREE.Group>(null);
  const lockBodyRef = useRef<THREE.Group>(null);
  const keyholeRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const hoverTimeRef = useRef(0);

  useFrame((state, delta) => {
    hoverTimeRef.current = hovered
      ? hoverTimeRef.current + delta
      : Math.max(hoverTimeRef.current - delta * 1.5, 0);

    if (shackleRef.current) {
      // Lift much higher and twist open on hover
      const liftTarget = hovered ? 0.75 : 0.2;
      const rotTarget = hovered ? Math.PI * 0.35 + Math.sin(state.clock.elapsedTime * 2) * 0.08 : 0;
      shackleRef.current.position.y = THREE.MathUtils.lerp(shackleRef.current.position.y, liftTarget, 0.12);
      shackleRef.current.rotation.y = THREE.MathUtils.lerp(shackleRef.current.rotation.y, rotTarget, 0.1);
      shackleRef.current.rotation.z = THREE.MathUtils.lerp(
        shackleRef.current.rotation.z,
        hovered ? Math.sin(state.clock.elapsedTime * 3) * 0.06 : 0,
        0.1,
      );
    }
    if (keyholeRef.current) {
      keyholeRef.current.rotation.z = THREE.MathUtils.lerp(
        keyholeRef.current.rotation.z,
        hovered ? Math.PI / 2 : 0,
        0.12,
      );
    }
    if (lockBodyRef.current) {
      const pulse = hovered ? Math.sin(state.clock.elapsedTime * 3) * 0.015 + 1 : 1;
      lockBodyRef.current.scale.setScalar(pulse);
    }
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        hovered ? 1.2 + Math.sin(state.clock.elapsedTime * 5) * 0.4 : 0,
        0.15,
      );
      mat.color.lerp(hovered ? new THREE.Color("#22c55e") : new THREE.Color("#1f2937"), 0.15);
      mat.emissive.lerp(hovered ? new THREE.Color("#22c55e") : new THREE.Color("#000000"), 0.15);
    }
  });

  const keyColors = ["#fbbf24", "#fcd34d", "#fef3c7", "#f59e0b", "#d97706", "#92400e", "#78350f", "#451a03"];

  return (
    <group>
      <group ref={lockBodyRef}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[1.5, 1.2, 0.8]} />
          <meshStandardMaterial color="#eab308" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Keyhole plate */}
        <mesh position={[0, -0.5, 0.41]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
          <meshStandardMaterial color="#78716c" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Keyhole slot (rotates on hover like a turning key) */}
        <group ref={keyholeRef} position={[0, -0.5, 0.44]}>
          <mesh>
            <circleGeometry args={[0.08, 24]} />
            <meshStandardMaterial color="#0b0f19" />
          </mesh>
          <mesh position={[0, -0.12, 0]}>
            <boxGeometry args={[0.06, 0.2, 0.01]} />
            <meshStandardMaterial color="#0b0f19" />
          </mesh>
        </group>
        {/* Status LED */}
        <mesh ref={ledRef} position={[0, -0.95, 0.41]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#1f2937" emissive="#000000" emissiveIntensity={0} />
        </mesh>
      </group>
      <group ref={shackleRef} position={[0, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.5, -0.2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.5, -0.2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Orbiting keys: calm when idle, chaotic on hover */}
      <group position={[0, 0, 0]}>
        {[
          [0, 0],
          [Math.PI * 0.25, 0.1],
          [Math.PI * 0.5, 0.05],
          [Math.PI * 0.75, 0],
          [Math.PI, 0.1],
          [Math.PI * 1.25, 0],
          [Math.PI * 1.5, 0.05],
          [Math.PI * 1.75, 0],
        ].map(([angle, offset], i) => (
          <OrbitingKey
            key={i}
            baseAngle={angle}
            baseOffset={offset}
            color={keyColors[i]}
            seed={i * 1.37}
            hoverTimeRef={hoverTimeRef}
          />
        ))}
      </group>
    </group>
  );
}

function EnvelopeModel({ hovered }: { hovered?: boolean }) {
  const warningRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const elonRef = useRef<THREE.Group>(null);
  const jeffRef = useRef<THREE.Group>(null);
  const gift1Ref = useRef<THREE.Group>(null);
  const gift2Ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (warningRef.current && hovered) {
      warningRef.current.position.z = THREE.MathUtils.lerp(warningRef.current.position.z, 0.35, 0.12);
      // Pulse the warning
      const pulse = Math.sin(state.clock.elapsedTime * 6) * 0.05 + 1;
      warningRef.current.scale.setScalar(pulse);
    } else if (warningRef.current) {
      warningRef.current.position.z = THREE.MathUtils.lerp(warningRef.current.position.z, 0.15, 0.1);
      warningRef.current.scale.setScalar(1);
    }
    if (flapRef.current && hovered) {
      flapRef.current.rotation.z = THREE.MathUtils.lerp(flapRef.current.rotation.z, Math.PI / 2 - 0.4, 0.1);
    } else if (flapRef.current) {
      flapRef.current.rotation.z = THREE.MathUtils.lerp(flapRef.current.rotation.z, Math.PI / 4, 0.1);
    }
    // Animate floating avatars
    if (elonRef.current) {
      const bobHeight = hovered ? 0.1 : 0.05;
      elonRef.current.position.y = THREE.MathUtils.lerp(elonRef.current.position.y, hovered ? 0 : 0.3, 0.08);
      elonRef.current.rotation.z = THREE.MathUtils.lerp(elonRef.current.rotation.z, hovered ? 0 : 0.2, 0.08);
    }
    if (jeffRef.current) {
      jeffRef.current.position.y = THREE.MathUtils.lerp(jeffRef.current.position.y, hovered ? 0 : 0.3, 0.08);
      jeffRef.current.rotation.z = THREE.MathUtils.lerp(jeffRef.current.rotation.z, hovered ? 0 : -0.2, 0.08);
    }
    // Gift cards bob
    if (gift1Ref.current && hovered) {
      gift1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      gift1Ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
    if (gift2Ref.current && hovered) {
      gift2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 3 + 1) * 0.1;
      gift2Ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 2 + 1) * 0.2;
    }
  });

  return (
    <group>
      {/* Envelope body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.1]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      <group ref={flapRef} position={[0, 0.35, 0.06]} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 0.05]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
      </group>
      
      {/* Warning triangle */}
      <group ref={warningRef} position={[0, 0, 0.15]}>
        <mesh>
          <circleGeometry args={[0.45, 32]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, 0.12, 0.01]}>
          <boxGeometry args={[0.1, 0.35, 0.01]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, -0.18, 0.01]}>
          <boxGeometry args={[0.1, 0.1, 0.01]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      
      {/* Fake "Elon" avatar */}
      <group ref={elonRef} position={[-0.85, 0.3, 0.2]}>
        <mesh>
          <circleGeometry args={[0.25, 32]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[-0.08, 0.05, 0.03]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0.08, 0.05, 0.03]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0, -0.08, 0.03]}>
          <boxGeometry args={[0.12, 0.04, 0.01]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </group>
      
      {/* Fake "Jeff" avatar */}
      <group ref={jeffRef} position={[0.85, 0.3, 0.2]}>
        <mesh>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.17, 32]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
        <mesh position={[0, -0.05, 0.03]}>
          <boxGeometry args={[0.1, 0.03, 0.01]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </group>
      
      {/* Gift card 1 */}
      <group ref={gift1Ref} position={[-0.5, -0.5, 0.3]}>
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.2, 0.25, 0.02]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0, 0.1, 0.04]}>
          <boxGeometry args={[0.15, 0.08, 0.01]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      
      {/* Gift card 2 */}
      <group ref={gift2Ref} position={[0.5, -0.5, 0.3]}>
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.2, 0.25, 0.02]} />
          <meshStandardMaterial color="#a78bfa" />
        </mesh>
        <mesh position={[0, 0.1, 0.04]}>
          <boxGeometry args={[0.15, 0.08, 0.01]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

function PrinterModel({ hovered }: { hovered?: boolean }) {
  const paperOutRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (paperOutRef.current) {
      paperOutRef.current.position.z = THREE.MathUtils.lerp(
        paperOutRef.current.position.z,
        hovered ? 1.15 : 0.25,
        0.08,
      );
      paperOutRef.current.position.y = THREE.MathUtils.lerp(
        paperOutRef.current.position.y,
        hovered ? -0.05 : -0.25,
        0.08,
      );
    }
    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        hovered ? -0.35 : -0.15,
        0.1,
      );
    }
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      const blink = hovered ? 0.6 + Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.4 : 1;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, blink, 0.2);
    }
    if (headRef.current && hovered) {
      headRef.current.position.x = Math.sin(state.clock.elapsedTime * 4) * 0.45;
    } else if (headRef.current) {
      headRef.current.position.x = THREE.MathUtils.lerp(headRef.current.position.x, -0.5, 0.1);
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Main body */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[2.2, 0.9, 1.5]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Darker base plinth */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[2.3, 0.15, 1.55]} />
        <meshStandardMaterial color="#475569" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Control panel front strip */}
      <mesh position={[0, -0.2, 0.755]}>
        <boxGeometry args={[2.1, 0.2, 0.02]} />
        <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[-0.55, -0.2, 0.77]}>
        <boxGeometry args={[0.55, 0.14, 0.01]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={hovered ? 0.6 : 0.3} />
      </mesh>
      {/* Buttons */}
      <mesh position={[0.25, -0.2, 0.77]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.45, -0.2, 0.77]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.65, -0.2, 0.77]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#22c55e" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Power LED */}
      <mesh ref={ledRef} position={[0.88, -0.2, 0.77]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
      </mesh>
      {/* Hinged top lid with paper tray */}
      <group ref={lidRef} position={[0, 0.05, -0.72]}>
        <mesh position={[0, 0.1, 0.4]}>
          <boxGeometry args={[2, 0.12, 1]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.2} roughness={0.6} />
        </mesh>
        {/* Input paper stack */}
        <mesh position={[0, 0.2, 0.4]}>
          <boxGeometry args={[1.4, 0.08, 0.7]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Paper tray guide rails */}
        <mesh position={[-0.75, 0.22, 0.4]}>
          <boxGeometry args={[0.04, 0.1, 0.7]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0.75, 0.22, 0.4]}>
          <boxGeometry args={[0.04, 0.1, 0.7]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      </group>
      {/* Print head carriage moving across */}
      <group ref={headRef} position={[-0.5, 0.03, 0.3]}>
        <mesh>
          <boxGeometry args={[0.25, 0.12, 0.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.4} />
        </mesh>
      </group>
      {/* Guide rail for carriage */}
      <mesh position={[0, 0.05, 0.25]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Output slot */}
      <mesh position={[0, -0.05, 0.76]}>
        <boxGeometry args={[1.5, 0.04, 0.01]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Paper coming out */}
      <group ref={paperOutRef} position={[0, -0.25, 0.25]} rotation={[0.08, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.1, 0.02, 0.9]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Print content lines */}
        <mesh position={[-0.25, 0.015, -0.2]}>
          <boxGeometry args={[0.4, 0.005, 0.25]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0.15, 0.015, 0.05]}>
          <boxGeometry args={[0.55, 0.005, 0.06]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0.05, 0.015, 0.2]}>
          <boxGeometry args={[0.45, 0.005, 0.06]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[-0.05, 0.015, 0.35]}>
          <boxGeometry args={[0.35, 0.005, 0.06]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      </group>
    </group>
  );
}

function MagnifyingGlassModel({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const line1Ref = useRef<THREE.Mesh>(null);
  const line2Ref = useRef<THREE.Mesh>(null);
  const line3Ref = useRef<THREE.Mesh>(null);

  useFrame((_state, _delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        hovered ? -0.15 : 0,
        0.1,
      );
    }
    if (textRef.current) {
      const s = hovered ? 1.6 : 1;
      textRef.current.scale.x = THREE.MathUtils.lerp(textRef.current.scale.x, s, 0.1);
      textRef.current.scale.y = THREE.MathUtils.lerp(textRef.current.scale.y, s, 0.1);
    }
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    lines.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      const target = hovered ? (i === 0 ? "#3b82f6" : "#475569") : "#cbd5e1";
      mat.color.lerp(new THREE.Color(target), 0.1);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Paper document behind */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[2.6, 2.2, 0.04]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Text lines on paper (magnified by lens) */}
      <group ref={textRef} position={[0, 0, -0.27]}>
        <mesh ref={line1Ref} position={[0, 0.25, 0]}>
          <boxGeometry args={[0.9, 0.1, 0.01]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh ref={line2Ref} position={[-0.05, 0, 0]}>
          <boxGeometry args={[0.8, 0.08, 0.01]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh ref={line3Ref} position={[0, -0.22, 0]}>
          <boxGeometry args={[0.7, 0.08, 0.01]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </group>

      {/* Handle */}
      <group position={[0.95, -0.95, 0]} rotation={[0, 0, Math.PI / 4]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.14, 0.12, 1.3, 24]} />
          <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Collar connecting handle to rim */}
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.18, 0.16, 0.25, 24]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>

      {/* Chrome rim */}
      <mesh>
        <torusGeometry args={[0.85, 0.12, 24, 64]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Inner bevel */}
      <mesh>
        <torusGeometry args={[0.78, 0.04, 16, 64]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Glass lens */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.78, 0.78, 0.1, 48]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          transmission={0.95}
          transparent
          opacity={0.4}
          metalness={0}
          roughness={0.05}
          ior={1.45}
          thickness={0.4}
        />
      </mesh>
      {/* Specular highlight */}
      <mesh position={[-0.3, 0.35, 0.08]} rotation={[0, 0, -0.5]}>
        <circleGeometry args={[0.18, 24]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>
      <mesh position={[-0.15, 0.2, 0.08]} rotation={[0, 0, -0.5]}>
        <circleGeometry args={[0.07, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function SoundWaveArc({
  radius,
  hovered,
  delay,
  meshRef,
}: {
  radius: number;
  hovered: boolean;
  delay: number;
  meshRef: React.MutableRefObject<THREE.Mesh | null>;
}) {
  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.transparent = true;
    if (hovered) {
      const t = (state.clock.elapsedTime - delay) % 1.2;
      const phase = Math.max(0, Math.min(t, 1));
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.2 + 0.8 * Math.sin(phase * Math.PI), 0.3);
      const s = 1 + 0.08 * Math.sin(phase * Math.PI);
      meshRef.current.scale.setScalar(s);
    } else {
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.2);
      meshRef.current.scale.setScalar(1);
    }
  });
  return (
    <mesh ref={meshRef} position={[0, -0.25, 0.6]} rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
      <torusGeometry args={[radius, 0.05, 12, 32, Math.PI * 0.6]} />
      <meshStandardMaterial color="#38bdf8" transparent opacity={0} />
    </mesh>
  );
}

function SpeakerModel({ hovered }: { hovered?: boolean }) {
  const wooferRef = useRef<THREE.Group>(null);
  const tweeterRef = useRef<THREE.Group>(null);
  const wave1 = useRef<THREE.Mesh>(null);
  const wave2 = useRef<THREE.Mesh>(null);
  const wave3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (wooferRef.current) {
      const pulse = hovered ? 1 + Math.sin(t * 9) * 0.05 : 1;
      wooferRef.current.scale.x = THREE.MathUtils.lerp(wooferRef.current.scale.x, pulse, 0.3);
    }
    if (tweeterRef.current) {
      const pulse = hovered ? 1 + Math.sin(t * 14) * 0.03 : 1;
      tweeterRef.current.scale.x = THREE.MathUtils.lerp(tweeterRef.current.scale.x, pulse, 0.3);
    }
  });

  return (
    <group rotation={[0, -0.35, 0]} position={[0, 0, 0]}>
      {/* Cabinet body, tilted slightly so the face catches light */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.5, 0.75]} />
        <meshStandardMaterial color="#475569" metalness={0.35} roughness={0.55} />
      </mesh>
      {/* Cabinet front baffle (slightly inset darker panel) */}
      <mesh position={[0, 0, 0.38]}>
        <boxGeometry args={[0.82, 1.42, 0.03]} />
        <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Tweeter housing */}
      <mesh position={[0, 0.42, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Tweeter cone */}
      <group ref={tweeterRef} position={[0, 0.42, 0.42]}>
        <mesh>
          <sphereGeometry args={[0.14, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {/* Woofer outer surround ring */}
      <mesh position={[0, -0.25, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.04, 48]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Woofer cone assembly */}
      <group ref={wooferRef} position={[0, -0.25, 0.42]}>
        {/* Cone */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.36, 0.12, 48, 1, true]} />
          <meshStandardMaterial color="#0f172a" metalness={0.25} roughness={0.75} side={THREE.DoubleSide} />
        </mesh>
        {/* Dust cap */}
        <mesh position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.13, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.55} roughness={0.35} />
        </mesh>
      </group>

      {/* Base plinth */}
      <mesh position={[0, -0.82, 0]}>
        <boxGeometry args={[1.05, 0.08, 0.85]} />
        <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Sound wave arcs radiating from the front */}
      <SoundWaveArc radius={0.35} hovered={!!hovered} delay={0} meshRef={wave1} />
      <SoundWaveArc radius={0.6} hovered={!!hovered} delay={0.25} meshRef={wave2} />
      <SoundWaveArc radius={0.9} hovered={!!hovered} delay={0.5} meshRef={wave3} />
    </group>
  );
}

function WifiArc({
  radius,
  y,
  thickness,
  index,
  hovered,
  meshRef,
}: {
  radius: number;
  y: number;
  thickness: number;
  index: number;
  hovered: boolean;
  meshRef: React.MutableRefObject<THREE.Mesh | null>;
}) {
  const IDLE_BLUE = new THREE.Color("#3b82f6");
  const IDLE_LIGHT = new THREE.Color(index === 0 ? "#3b82f6" : index === 1 ? "#60a5fa" : "#93c5fd");
  const ACTIVE_BLUE = new THREE.Color("#2563eb");
  const DIM = new THREE.Color("#1e3a8a");

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (hovered) {
      // Cycle: 0 -> bar0 lit, 1 -> bar1 lit, 2 -> bar2 lit, 3 -> pause, then repeat
      const cycle = 2.0;
      const t = state.clock.elapsedTime % cycle;
      const stepLen = cycle / 4;
      const activeStep = Math.floor(t / stepLen);
      const on = index <= activeStep && activeStep < 3;
      const target = on ? ACTIVE_BLUE : DIM;
      mat.color.lerp(target, 0.2);
      mat.emissive.lerp(on ? ACTIVE_BLUE : new THREE.Color("#000000"), 0.2);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, on ? 0.8 : 0, 0.2);
    } else {
      mat.color.lerp(index === 0 ? IDLE_BLUE : IDLE_LIGHT, 0.15);
      mat.emissive.lerp(new THREE.Color("#000000"), 0.15);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0, 0.15);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, y, 0]}>
      <torusGeometry args={[radius, thickness, 16, 48, Math.PI]} />
      <meshStandardMaterial color={IDLE_LIGHT} />
    </mesh>
  );
}

function WifiModel({ hovered }: { hovered?: boolean }) {
  const arc1Ref = useRef<THREE.Mesh>(null);
  const arc2Ref = useRef<THREE.Mesh>(null);
  const arc3Ref = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame((_state) => {
    if (!dotRef.current) return;
    const mat = dotRef.current.material as THREE.MeshStandardMaterial;
    const target = hovered ? new THREE.Color("#2563eb") : new THREE.Color("#3b82f6");
    mat.color.lerp(target, 0.15);
    mat.emissive.lerp(target, 0.15);
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, hovered ? 0.6 : 0.2, 0.15);
  });

  return (
    <group>
      <mesh ref={dotRef} position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} />
      </mesh>
      <WifiArc radius={0.4} y={-0.2} thickness={0.1} index={0} hovered={!!hovered} meshRef={arc1Ref} />
      <WifiArc radius={0.7} y={0.15} thickness={0.12} index={1} hovered={!!hovered} meshRef={arc2Ref} />
      <WifiArc radius={1.1} y={0.55} thickness={0.14} index={2} hovered={!!hovered} meshRef={arc3Ref} />
    </group>
  );
}

function SlowComputerModel({ hovered }: { hovered?: boolean }) {
  const spinnerRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (spinnerRef.current) {
      const speed = hovered ? 2.4 : 0.9;
      spinnerRef.current.rotation.z -= delta * speed;
    }
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      const target = hovered ? 0.35 : 0.18;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, target, 0.15);
    }
  });

  return (
    <group rotation={[0, -0.25, 0]} position={[0, 0.05, 0]}>
      {/* Monitor body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 1.15, 0.12]} />
        <meshStandardMaterial color="#334155" metalness={0.45} roughness={0.45} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.2, 0.07]}>
        <boxGeometry args={[1.65, 1.0, 0.02]} />
        <meshStandardMaterial color="#0f172a" emissive="#1e3a8a" emissiveIntensity={0.18} metalness={0.3} roughness={0.25} />
      </mesh>
      {/* Loading spinner on screen */}
      <group ref={spinnerRef} position={[0, 0.2, 0.09]}>
        <mesh>
          <torusGeometry args={[0.25, 0.04, 12, 48, Math.PI * 1.4]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.7} metalness={0.3} roughness={0.3} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI * 1.4]} position={[0.18, 0.18, 0]}>
          <sphereGeometry args={[0.055, 16, 12]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
        </mesh>
      </group>
      {/* Stand neck */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.18, 0.45, 0.12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function VirusShieldModel({ hovered }: { hovered?: boolean }) {
  const shieldRef = useRef<THREE.Mesh>(null);
  const bugRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shieldRef.current) {
      const mat = shieldRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, hovered ? 0.5 : 0.15, 0.1);
    }
    if (bugRef.current) {
      const bob = hovered ? Math.sin(t * 4) * 0.04 : Math.sin(t * 1.5) * 0.02;
      bugRef.current.position.y = THREE.MathUtils.lerp(bugRef.current.position.y, 0.05 + bob, 0.2);
      bugRef.current.rotation.z = Math.sin(t * 2) * 0.08;
    }
  });

  // Shield silhouette
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(0, 0.9);
  shieldShape.bezierCurveTo(0.7, 0.85, 0.85, 0.7, 0.85, 0.3);
  shieldShape.lineTo(0.85, -0.15);
  shieldShape.bezierCurveTo(0.85, -0.55, 0.5, -0.85, 0, -1);
  shieldShape.bezierCurveTo(-0.5, -0.85, -0.85, -0.55, -0.85, -0.15);
  shieldShape.lineTo(-0.85, 0.3);
  shieldShape.bezierCurveTo(-0.85, 0.7, -0.7, 0.85, 0, 0.9);

  return (
    <group rotation={[0, -0.2, 0]}>
      {/* Shield body */}
      <mesh ref={shieldRef} position={[0, 0, 0]}>
        <extrudeGeometry
          args={[
            shieldShape,
            { depth: 0.15, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 3 },
          ]}
        />
        <meshStandardMaterial color="#475569" emissive="#ef4444" emissiveIntensity={0.15} metalness={0.55} roughness={0.35} />
      </mesh>
      {/* Shield inner plate */}
      <mesh position={[0, 0, 0.22]}>
        <extrudeGeometry
          args={[
            shieldShape,
            { depth: 0.02, bevelEnabled: false },
          ]}
        />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Bug body on front of shield */}
      <group ref={bugRef} position={[0, 0.05, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.26, 24, 18]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.35} metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.14, 18, 14]} />
          <meshStandardMaterial color="#dc2626" metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Antennae */}
        <mesh position={[-0.08, 0.42, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.08, 0.42, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Legs */}
        {[-0.25, 0, 0.25].map((x) => (
          <group key={`leg-${x}`}>
            <mesh position={[-0.22, x * 0.35, 0]} rotation={[0, 0, 0.8]}>
              <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            <mesh position={[0.22, x * 0.35, 0]} rotation={[0, 0, -0.8]}>
              <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          </group>
        ))}
        {/* Eyes */}
        <mesh position={[-0.05, 0.3, 0.11]}>
          <sphereGeometry args={[0.025, 10, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.05, 0.3, 0.11]}>
          <sphereGeometry args={[0.025, 10, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

const issues = [
  {
    id: 1,
    title: 'The internet is broken',
    description: 'Wi-Fi disconnected or running slow? We can help you get back online and stay connected with your loved ones.',
    Model: WifiModel
  },
  {
    id: 2,
    title: 'My computer is slow',
    description: 'Is your computer taking forever to start up or open programs? We can clean it up, remove what it doesn\'t need, and get it running smoothly again.',
    Model: SlowComputerModel
  },
  {
    id: 3,
    title: 'The printer won\'t print',
    description: 'Printer offline or out of ink? We can help you reconnect your printer to the Wi-Fi and get your documents printing again.',
    Model: PrinterModel
  },
  {
    id: 4,
    title: 'I think I have a virus',
    description: 'Strange pop-ups, fake warnings, or worried something slipped in? We can check your computer, remove anything harmful, and help you feel safe online again.',
    Model: VirusShieldModel
  },
  {
    id: 5,
    title: 'Is this a scam?',
    description: 'Received a suspicious email or text message? We can teach you how to spot phishing attempts and keep your personal info safe.',
    Model: EnvelopeModel,
    images: ['/scam-jeff.png', '/scam-elon.png'],
  },
  {
    id: 6,
    title: 'Too many passwords',
    description: 'Struggling to remember all your logins? Learn how to safely store and manage your passwords without writing them on sticky notes.',
    Model: LockModel
  },
  {
    id: 7,
    title: 'Where did my files go?',
    description: 'Downloaded a document or picture and can\'t find it? We can help you locate your missing files and organize your folders.',
    Model: FolderModel
  },
  {
    id: 8,
    title: 'The text is too small',
    description: 'Squinting at the screen? We can show you how to increase the text size and make your device easier to read.',
    Model: MagnifyingGlassModel
  },
  {
    id: 9,
    title: 'I can\'t hear anything',
    description: 'Volume too low on video calls? We can help you adjust your sound settings so you can hear your family clearly.',
    Model: SpeakerModel
  },
];

export default function TechHelpCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPanelHovered, setIsPanelHovered] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % issues.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + issues.length) % issues.length);
  };

  useEffect(() => {
    if (!isAutoPlaying || isPanelHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isPanelHovered, currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  const CurrentModel = issues[currentIndex].Model;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Tech Help Center</div>
        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-slate-900 mb-3">Common tech challenges, explained simply.</h2>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
          A quick tour of the everyday problems we fix at home.
        </p>
      </div>

      <div
        className="relative h-[600px] md:h-[450px] w-full overflow-hidden rounded-[32px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col md:flex-row"
        onMouseEnter={() => setIsPanelHovered(true)}
        onMouseLeave={() => setIsPanelHovered(false)}
      >
        <div 
          className="w-full md:w-1/2 h-1/2 md:h-full relative bg-slate-50/50 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {issues[currentIndex].images ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
              {issues[currentIndex].images!.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={src.includes('elon') ? 'Fake Elon Musk crypto giveaway scam message' : 'Fake Jeff Bezos giveaway scam message'}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="max-w-full max-h-[45%] object-contain drop-shadow-md"
                />
              ))}
            </div>
          ) : (
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Environment preset="city" />
              <PresentationControls
                global
                rotation={[0.1, 0.3, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                snap={true}
              >
                <Float rotationIntensity={0} floatIntensity={0} speed={0}>
                  <InteractableModel key={currentIndex} hovered={isHovered}>
                    <CurrentModel hovered={isHovered} />
                  </InteractableModel>
                </Float>
              </PresentationControls>
              <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
            </Canvas>
          )}
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center relative bg-white">
          <div className="flex-1 flex flex-col justify-center relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h3 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4 leading-tight">
                  {issues[currentIndex].title}
                </h3>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
                  {issues[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
                aria-label="Previous issue"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
                aria-label="Next issue"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsAutoPlaying((v) => !v)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center hover:scale-105 active:scale-95 transition-all ${
                  isAutoPlaying
                    ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
                aria-pressed={isAutoPlaying}
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex gap-2">
              {issues.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractableModel({ children, hovered }: { children: React.ReactNode; hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const entranceRef = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (entranceRef.current < 1) {
        entranceRef.current = Math.min(entranceRef.current + delta * 3, 1);
      }

      const t = state.clock.elapsedTime;
      const maxAngle = (15 * Math.PI) / 180;
      groupRef.current.rotation.y = Math.sin(t * 1.2) * maxAngle;
      groupRef.current.position.y = Math.sin(t * 2) * 0.15;

      const easeOutBack = (x: number): number => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
      };

      const baseScale = easeOutBack(entranceRef.current);
      const targetScale = hovered ? baseScale * 1.15 : baseScale;

      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef}
      scale={[0, 0, 0]}
    >
      {children}
    </group>
  );
}
