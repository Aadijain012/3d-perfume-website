import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbitingOrb({ angle, radius, color, iconText, name, onClick, isSelected }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.4 + angle;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.25;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={meshRef} onClick={onClick} data-interactive="true">
      {/* Glowing Crystal Orb Sphere */}
      <mesh>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshPhysicalMaterial
          roughness={0.1}
          transmission={0.85}
          thickness={0.8}
          ior={1.4}
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.8 : 0.25}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Outer Golden Aura Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.33, 32]} />
        <meshBasicMaterial color={isSelected ? '#f3e5ab' : '#d4af37'} side={THREE.DoubleSide} />
      </mesh>
      {/* 3D Label Text */}
      <Text
        position={[0, 0.38, 0]}
        fontSize={0.09}
        color="#fff"
        anchorX="center"
        anchorY="bottom"
      >
        {name}
      </Text>
    </group>
  );
}

function ScentLabBottle({ liquidColor, engravingName }) {
  const bottleRef = useRef();

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={bottleRef} position={[0, -0.15, 0]}>
      {/* Outer Glass Flacon */}
      <mesh>
        <boxGeometry args={[1.4, 1.8, 0.9]} />
        <meshPhysicalMaterial
          roughness={0.05}
          transmission={0.95}
          thickness={1.2}
          ior={1.5}
          clearcoat={1.0}
          color="#ffffff"
          transparent
        />
      </mesh>

      {/* Dynamic Colored Liquid Core */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.18, 1.45, 0.7]} />
        <meshStandardMaterial
          color={liquidColor}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Gold Atomizer Collar */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.3, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Dark Luxury Cap */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.65, 32]} />
        <meshStandardMaterial color="#0b0b0f" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Front Custom Engraved Plaque */}
      <group position={[0, 0.05, 0.46]}>
        <mesh>
          <planeGeometry args={[0.9, 0.8]} />
          <meshStandardMaterial color="#08080b" />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.86, 0.76)]} />
          <lineBasicMaterial color="#d4af37" />
        </lineSegments>
        <Text
          position={[0, 0.18, 0.01]}
          fontSize={0.09}
          color="#f3e5ab"
          letterSpacing={0.15}
        >
          VÉLORA
        </Text>
        <Text
          position={[0, -0.02, 0.01]}
          fontSize={0.065}
          color="#d4af37"
          letterSpacing={0.18}
        >
          {engravingName ? engravingName.toUpperCase() : 'BESPOKE'}
        </Text>
        <Text
          position={[0, -0.2, 0.01]}
          fontSize={0.04}
          color="#a1a1aa"
          letterSpacing={0.15}
        >
          EXTRAIT DE PARFUM
        </Text>
      </group>

      {/* Illuminated Pedestal Ring */}
      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.12, 48]} />
        <meshStandardMaterial color="#050507" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.91, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.38, 1.44, 48]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>
    </group>
  );
}

export default function ScentLab3D({
  liquidColor = '#d97706',
  engravingName = 'BESPOKE',
  onSelectIngredient,
  ingredients = [],
}) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '440px' }}>
      <Canvas
        camera={{ position: [0, 0.6, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[3, 4, 4]} intensity={3.5} color="#f5e6c8" />
        <spotLight position={[-3, 2, 2]} intensity={2.0} color="#e0a899" />
        <directionalLight position={[0, 3, -3]} intensity={2.5} color="#d4af37" />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
          <ScentLabBottle liquidColor={liquidColor} engravingName={engravingName} />
        </Float>

        {/* Orbiting Interactive Ingredient Orbs */}
        {ingredients.map((ing, idx) => (
          <OrbitingOrb
            key={ing.id}
            angle={(idx * (Math.PI * 2)) / ingredients.length}
            radius={2.1}
            color={ing.color}
            name={ing.name}
            isSelected={ing.isSelected}
            onClick={() => onSelectIngredient(ing)}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
}
