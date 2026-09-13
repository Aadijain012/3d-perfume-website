import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PerfumeParticles({ isSpraying = false, count = 120 }) {
  const pointsRef = useRef();
  const sprayPointsRef = useRef();

  // 1. Ambient Gold Dust & Smoke Particles
  const { positions, scales, opacities, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const op = new Float32Array(count);
    const sp = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a cylinder around the bottle
      const radius = 1.2 + Math.random() * 3.0;
      const angle = Math.random() * Math.PI * 2;
      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * 5.0;
      pos[i3 + 2] = Math.sin(angle) * radius;

      sc[i] = Math.random() * 0.06 + 0.02;
      op[i] = Math.random() * 0.6 + 0.2;

      sp[i3] = (Math.random() - 0.5) * 0.005;
      sp[i3 + 1] = Math.random() * 0.008 + 0.003; // gently drift upward
      sp[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return { positions: pos, scales: sc, opacities: op, speeds: sp };
  }, [count]);

  // 2. Mist Spray Atomizer Particles
  const sprayCount = 350;
  const sprayPositions = useMemo(() => new Float32Array(sprayCount * 3), [sprayCount]);
  const sprayVelocities = useMemo(() => {
    const vel = new Float32Array(sprayCount * 3);
    for (let i = 0; i < sprayCount; i++) {
      const i3 = i * 3;
      // Conical spray upward and outward
      const theta = Math.random() * Math.PI * 2;
      const spread = Math.random() * 0.45;
      vel[i3] = Math.cos(theta) * spread * 0.08;
      vel[i3 + 1] = 0.08 + Math.random() * 0.12; // shoot up
      vel[i3 + 2] = Math.sin(theta) * spread * 0.08 + 0.05; // slight forward arc
    }
    return vel;
  }, [sprayCount]);

  useFrame((state) => {
    // Animate ambient gold dust
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posAttr.array[i3] += speeds[i3];
        posAttr.array[i3 + 1] += speeds[i3 + 1];
        posAttr.array[i3 + 2] += speeds[i3 + 2];

        // Reset if drifted too high
        if (posAttr.array[i3 + 1] > 2.8) {
          posAttr.array[i3 + 1] = -2.5;
        }
      }
      posAttr.needsUpdate = true;
      pointsRef.current.rotation.y += 0.001;
    }

    // Animate active spray particles
    if (sprayPointsRef.current && isSpraying) {
      const sprayPos = sprayPointsRef.current.geometry.attributes.position;
      for (let i = 0; i < sprayCount; i++) {
        const i3 = i * 3;
        sprayPos.array[i3] += sprayVelocities[i3];
        sprayPos.array[i3 + 1] += sprayVelocities[i3 + 1];
        sprayPos.array[i3 + 2] += sprayVelocities[i3 + 2];

        // Fade / reset
        if (sprayPos.array[i3 + 1] > 3.0) {
          sprayPos.array[i3] = 0;
          sprayPos.array[i3 + 1] = 1.35; // start at nozzle
          sprayPos.array[i3 + 2] = 0;
        }
      }
      sprayPos.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Ambient Gold Mist/Dust */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#d4af37"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Atomizer Mist Spray Cloud */}
      {isSpraying && (
        <points ref={sprayPointsRef} position={[0, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[sprayPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#f3e5ab"
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  );
}
