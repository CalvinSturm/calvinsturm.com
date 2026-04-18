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
  const hoverTimeRef = useRef(0);

  useFrame((state, delta) => {
    hoverTimeRef.current = hovered
      ? hoverTimeRef.current + delta
      : Math.max(hoverTimeRef.current - delta * 1.5, 0);

    if (shackleRef.current) {
      if (hovered) {
        shackleRef.current.position.y = THREE.MathUtils.lerp(shackleRef.current.position.y, 0.35, 0.1);
        shackleRef.current.rotation.z = THREE.MathUtils.lerp(shackleRef.current.rotation.z, Math.sin(state.clock.elapsedTime * 4) * 0.08, 0.1);
      } else {
        shackleRef.current.position.y = THREE.MathUtils.lerp(shackleRef.current.position.y, 0, 0.1);
        shackleRef.current.rotation.z = THREE.MathUtils.lerp(shackleRef.current.rotation.z, 0, 0.1);
      }
    }
    if (lockBodyRef.current && hovered) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.02 + 1;
      lockBodyRef.current.scale.setScalar(pulse);
    } else if (lockBodyRef.current) {
      lockBodyRef.current.scale.setScalar(1);
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
        <mesh position={[0, -0.5, 0.41]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="#1f2937" />
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
      
      {/* Orbiting keys — calm when idle, chaotic on hover */}
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
  
  useFrame((state, delta) => {
    if (paperOutRef.current && hovered) {
      paperOutRef.current.position.y = THREE.MathUtils.lerp(paperOutRef.current.position.y, 0.2, 0.08);
      paperOutRef.current.position.z = THREE.MathUtils.lerp(paperOutRef.current.position.z, 1.2, 0.08);
    } else if (paperOutRef.current) {
      paperOutRef.current.position.y = THREE.MathUtils.lerp(paperOutRef.current.position.y, -0.3, 0.1);
      paperOutRef.current.position.z = THREE.MathUtils.lerp(paperOutRef.current.position.z, 0.8, 0.1);
    }
  });

  return (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[2, 0.8, 1.5]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
      <mesh position={[0, 0.2, -0.2]}>
        <boxGeometry args={[1.8, 0.4, 1]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
      <mesh position={[0, 0.8, -0.6]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.2, 1, 0.05]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      <mesh position={[0, 0.9, -0.55]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1, 1.2, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <group ref={paperOutRef} position={[0, -0.3, 0.8]} rotation={[0.1, 0, 0]}>
        <mesh>
          <boxGeometry args={[1, 1, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {hovered && (
          <group position={[0, 0, 0.02]}>
            <mesh position={[-0.3, 0.2, 0]}>
              <boxGeometry args={[0.4, 0.3, 0.01]} />
              <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[0.1, -0.2, 0]}>
              <boxGeometry args={[0.5, 0.15, 0.01]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

function MagnifyingGlassModel({ hovered }: { hovered?: boolean }) {
  const glassRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (glassRef.current && hovered) {
      glassRef.current.rotation.x = THREE.MathUtils.lerp(glassRef.current.rotation.x, 0.3, 0.1);
      glassRef.current.rotation.y = THREE.MathUtils.lerp(glassRef.current.rotation.y, 0.3, 0.1);
    } else if (glassRef.current) {
      glassRef.current.rotation.x = THREE.MathUtils.lerp(glassRef.current.rotation.x, 0, 0.1);
      glassRef.current.rotation.y = THREE.MathUtils.lerp(glassRef.current.rotation.y, 0, 0.1);
    }
    if (handleRef.current && hovered) {
      handleRef.current.rotation.z = THREE.MathUtils.lerp(handleRef.current.rotation.z, Math.PI / 4 + 0.2, 0.1);
    } else if (handleRef.current) {
      handleRef.current.rotation.z = THREE.MathUtils.lerp(handleRef.current.rotation.z, Math.PI / 4, 0.1);
    }
  });

  return (
    <group>
      <group ref={handleRef} position={[0.8, -0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 1.5]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </group>
      <group ref={glassRef} position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.8, 0.15, 16, 32]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.9} 
            opacity={1} 
            metalness={0} 
            roughness={0} 
            ior={1.5} 
            thickness={0.5} 
          />
        </mesh>
        <group position={[0, 0, -0.5]}>
          <mesh>
            <boxGeometry args={[1, 0.2, 0.05]} />
            <meshStandardMaterial color={hovered ? "#3b82f6" : "#94a3b8"} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.8, 0.1, 0.05]} />
            <meshStandardMaterial color="#9ca3af" />
          </mesh>
          {hovered && (
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[0.6, 0.08, 0.05]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
}

function SpeakerModel({ hovered }: { hovered?: boolean }) {
  const volumeRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (volumeRef.current && hovered) {
      volumeRef.current.scale.x = THREE.MathUtils.lerp(volumeRef.current.scale.x, 1.3, 0.1);
    } else if (volumeRef.current) {
      volumeRef.current.scale.x = THREE.MathUtils.lerp(volumeRef.current.scale.x, 1, 0.1);
    }
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.7, 0.6]} />
        <meshStandardMaterial color="#4b5563" metalness={0.3} roughness={0.4} />
      </mesh>
      <group ref={volumeRef} position={[0, 0, 0.33]}>
        <group position={[-0.6, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        </group>
        <group position={[0.6, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        </group>
        {hovered && (
          <>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[1.5, 0.3, 0.3]} />
              <meshStandardMaterial color="#22c55e" />
            </mesh>
            <mesh position={[0, 0.5, 0.16]}>
              <boxGeometry args={[0.8, 0.15, 0.02]} />
              <meshStandardMaterial color="#16a34a" />
            </mesh>
          </>
        )}
      </group>
      <mesh position={[-0.3, 0.38, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, 0.38, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.9, -0.35, 0.15]}>
        <boxGeometry args={[0.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.9, -0.35, 0.15]}>
        <boxGeometry args={[0.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
}

function WifiModel({ hovered }: { hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const arc1Ref = useRef<THREE.Mesh>(null);
  const arc2Ref = useRef<THREE.Mesh>(null);
  const arc3Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (arc1Ref.current && hovered) {
      const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1;
      arc1Ref.current.scale.setScalar(pulse);
    }
    if (arc2Ref.current && hovered) {
      const pulse = Math.sin(state.clock.elapsedTime * 4 + 0.5) * 0.15 + 1;
      arc2Ref.current.scale.setScalar(pulse);
    }
    if (arc3Ref.current && hovered) {
      const pulse = Math.sin(state.clock.elapsedTime * 4 + 1) * 0.2 + 1;
      arc3Ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center dot */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color={hovered ? "#22c55e" : "#3b82f6"} emissive={hovered ? "#22c55e" : "#3b82f6"} emissiveIntensity={hovered ? 0.5 : 0.2} />
      </mesh>
      
      {/* Signal arc 1 */}
      <mesh ref={arc1Ref} position={[0, -0.2, 0]}>
        <torusGeometry args={[0.4, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color={hovered ? "#22c55e" : "#3b82f6"} />
      </mesh>
      
      {/* Signal arc 2 */}
      <mesh ref={arc2Ref} position={[0, 0.15, 0]}>
        <torusGeometry args={[0.7, 0.12, 16, 32, Math.PI]} />
        <meshStandardMaterial color={hovered ? "#22c55e" : "#60a5fa"} />
      </mesh>
      
      {/* Signal arc 3 */}
      <mesh ref={arc3Ref} position={[0, 0.55, 0]}>
        <torusGeometry args={[1.1, 0.14, 16, 32, Math.PI]} />
        <meshStandardMaterial color={hovered ? "#4ade80" : "#93c5fd"} />
      </mesh>
      
      {hovered && (
        <>
          {/* Router base */}
          <mesh position={[0, -0.9, 0]}>
            <boxGeometry args={[0.6, 0.15, 0.4]} />
            <meshStandardMaterial color="#166534" />
          </mesh>
          {/* Router antennas */}
          <mesh position={[-0.2, -0.75, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.25]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[0.2, -0.75, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.25]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          {/* LED indicator */}
          <mesh position={[0, -0.9, 0.21]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
          </mesh>
          {/* Connection lines */}
          <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.02, 0.5, 0.02]} />
            <meshStandardMaterial color="#4ade80" transparent opacity={0.6} />
          </mesh>
        </>
      )}
    </group>
  );
}

const issues = [
  { 
    id: 1, 
    title: 'Where did my files go?', 
    description: 'Downloaded a document or picture and can\'t find it? We can help you locate your missing files and organize your folders.',
    hoverTitle: 'The file shoots out and flies away',
    Model: FolderModel 
  },
  { 
    id: 2, 
    title: 'Too many passwords', 
    description: 'Struggling to remember all your logins? Learn how to safely store and manage your passwords without writing them on sticky notes.',
    hoverTitle: '8 keys orbit around the lock!',
    Model: LockModel 
  },
  {
    id: 3,
    title: 'Is this a scam?',
    description: 'Received a suspicious email or text message? We can teach you how to spot phishing attempts and keep your personal info safe.',
    hoverTitle: 'Real scam messages we\'ve seen',
    Model: EnvelopeModel,
    images: ['/scam-jeff.png', '/scam-elon.png'],
  },
  { 
    id: 4, 
    title: 'The printer won\'t print', 
    description: 'Printer offline or out of ink? We can help you reconnect your printer to the Wi-Fi and get your documents printing again.',
    hoverTitle: 'Printed page slides out with your document',
    Model: PrinterModel 
  },
  { 
    id: 5, 
    title: 'The text is too small', 
    description: 'Squinting at the screen? We can show you how to increase the text size and make your device easier to read.',
    hoverTitle: 'Glass magnifies text as it grows larger',
    Model: MagnifyingGlassModel 
  },
  { 
    id: 6, 
    title: 'I can\'t hear anything', 
    description: 'Volume too low on video calls? We can help you adjust your sound settings so you can hear your family clearly.',
    hoverTitle: 'Volume bars pulse to show sound level',
    Model: SpeakerModel 
  },
  { 
    id: 7, 
    title: 'The internet is broken', 
    description: 'Wi-Fi disconnected or running slow? We can help you get back online and stay connected with your loved ones.',
    hoverTitle: 'Green = connected! Router appears',
    Model: WifiModel 
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
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-4">Tech Help Center</h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
          Common technology challenges and how we can help you solve them.
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
                  alt="Example scam message"
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
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="bg-slate-900/90 text-white text-sm px-4 py-2 rounded-full inline-flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {issues[currentIndex].hoverTitle}
            </motion.div>
          </div>
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
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-blue-600 w-8' : 'bg-slate-200 w-2 hover:bg-slate-300'
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
