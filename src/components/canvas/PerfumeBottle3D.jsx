import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { luxuryAudio } from '../../utils/audio';

// Custom Liquid Shader with Waves & Ripples
const LiquidShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#3a2410') },
    uColorTop: { value: new THREE.Color('#d4af37') },
    uWaveIntensity: { value: 0.08 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uWaveIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;
      
      // Wave disturbance at the liquid top surface
      if (pos.y > 0.4) {
        float wave = sin(pos.x * 6.0 + uTime * 3.0) * cos(pos.z * 6.0 + uTime * 2.5) * uWaveIntensity;
        pos.y += wave;
      }
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uColorTop;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      // Depth gradient & internal light scattering
      float depth = smoothstep(-0.8, 0.5, vPosition.y);
      vec3 col = mix(uColor, uColorTop, depth * 0.7);
      
      // Specular rim inside liquid
      vec3 viewDir = normalize(-vPosition);
      float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
      col += pow(rim, 3.0) * vec3(0.3, 0.2, 0.1);

      gl_FragColor = vec4(col, 0.88);
    }
  `,
};

export default function PerfumeBottle3D({
  color = '#2a1a0e',
  topColor = '#d4af37',
  brandName = 'VÉLORA',
  subName = 'NOIR',
  isPopped = false,
  onSpray = null,
  mousePos = { x: 0, y: 0 },
  autoRotate = true,
}) {
  const bottleGroupRef = useRef();
  const capRef = useRef();
  const liquidMaterialRef = useRef();

  // Procedural geometries for luxury beveled flacon
  const bottleGeometry = useMemo(() => new THREE.BoxGeometry(1.6, 2.0, 1.0, 16, 16, 16), []);
  const liquidGeometry = useMemo(() => new THREE.BoxGeometry(1.35, 1.6, 0.78, 16, 16, 16), []);
  const collarGeometry = useMemo(() => new THREE.CylinderGeometry(0.32, 0.38, 0.35, 32), []);
  const nozzleGeometry = useMemo(() => new THREE.CylinderGeometry(0.18, 0.18, 0.25, 32), []);
  const capGeometry = useMemo(() => new THREE.CylinderGeometry(0.48, 0.48, 0.75, 32), []);
  const tubeGeometry = useMemo(() => new THREE.CylinderGeometry(0.025, 0.025, 1.8, 16), []);
  const basePedestalGeometry = useMemo(() => new THREE.CylinderGeometry(1.6, 1.8, 0.15, 48), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Update liquid wave uniform
    if (liquidMaterialRef.current) {
      liquidMaterialRef.current.uniforms.uTime.value = time;
    }

    // Parallax mouse tilt
    if (bottleGroupRef.current) {
      const targetRotX = mousePos.y * 0.25;
      const targetRotY = autoRotate ? time * 0.25 + mousePos.x * 0.35 : mousePos.x * 0.5;
      bottleGroupRef.current.rotation.x = THREE.MathUtils.lerp(bottleGroupRef.current.rotation.x, targetRotX, 0.05);
      bottleGroupRef.current.rotation.y = THREE.MathUtils.lerp(bottleGroupRef.current.rotation.y, targetRotY, 0.05);
    }

    // Cap Pop Animation Physics
    if (capRef.current) {
      const targetY = isPopped ? 2.4 : 1.45;
      const targetRotZ = isPopped ? 0.35 : 0;
      capRef.current.position.y = THREE.MathUtils.lerp(capRef.current.position.y, targetY, 0.1);
      capRef.current.rotation.z = THREE.MathUtils.lerp(capRef.current.rotation.z, targetRotZ, 0.1);
    }
  });

  return (
    <group ref={bottleGroupRef} position={[0, -0.2, 0]} dispose={null}>
      {/* 1. Outer Heavy Glass Flacon with Thick Refraction & Chamfer */}
      <mesh geometry={bottleGeometry} position={[0, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          roughness={0.04}
          transmission={0.96}
          thickness={1.4}
          ior={1.52}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          color="#ffffff"
          attenuationColor="#f8f4eb"
          attenuationDistance={1.2}
          transparent={true}
        />
      </mesh>

      {/* 2. Inner Perfume Liquid Body with Shader Waves */}
      <mesh geometry={liquidGeometry} position={[0, -0.12, 0]}>
        <shaderMaterial
          ref={liquidMaterialRef}
          args={[LiquidShaderMaterial]}
          uniforms-uColor-value={new THREE.Color(color)}
          uniforms-uColorTop-value={new THREE.Color(topColor)}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Internal Dip Tube */}
      <mesh geometry={tubeGeometry} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.1} transparent opacity={0.6} />
      </mesh>

      {/* 4. Luxury Golden Atomizer Collar */}
      <mesh geometry={collarGeometry} position={[0, 1.12, 0]} castShadow>
        <meshStandardMaterial
          color="#e6ca65"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* 5. Golden Spray Nozzle / Sprayer */}
      <mesh geometry={nozzleGeometry} position={[0, 1.32, 0]}>
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>

      {/* 6. Luxury Heavy Cap (Animated Pop-off) */}
      <group
        ref={capRef}
        position={[0, 1.45, 0]}
        onClick={(e) => {
          e.stopPropagation();
          luxuryAudio.playGlassClink();
          if (onSpray) onSpray();
        }}
        data-interactive="true"
      >
        <mesh geometry={capGeometry} castShadow>
          <meshStandardMaterial
            color="#0c0c10"
            metalness={0.85}
            roughness={0.2}
            envMapIntensity={2.0}
          />
        </mesh>
        {/* Gold Trim Ring around Cap */}
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.49, 0.49, 0.08, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* 7. Front Gold & Obsidian Plaque Label */}
      <group position={[0, 0.05, 0.51]}>
        {/* Dark Obsidian Plate */}
        <mesh>
          <planeGeometry args={[1.0, 0.9]} />
          <meshStandardMaterial
            color="#0a0a0e"
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
        {/* Gold Border on Plaque */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.96, 0.86)]} />
          <lineBasicMaterial color="#d4af37" linewidth={1.5} />
        </lineSegments>
        {/* Brand Text Typography */}
        <Text
          position={[0, 0.2, 0.01]}
          fontSize={0.12}
          color="#f3e5ab"
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          {brandName}
        </Text>
        <Text
          position={[0, 0.02, 0.01]}
          fontSize={0.07}
          color="#d4af37"
          letterSpacing={0.25}
          anchorX="center"
          anchorY="middle"
        >
          {subName}
        </Text>
        <Text
          position={[0, -0.22, 0.01]}
          fontSize={0.045}
          color="#a1a1aa"
          letterSpacing={0.18}
          anchorX="center"
          anchorY="middle"
        >
          EAU DE PARFUM
        </Text>
      </group>

      {/* 8. Reflective Mirror Obsidian Base Pedestal */}
      <mesh geometry={basePedestalGeometry} position={[0, -1.08, 0]} receiveShadow>
        <meshStandardMaterial
          color="#060608"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.55, 48]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>
    </group>
  );
}
