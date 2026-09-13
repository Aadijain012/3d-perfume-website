import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import PerfumeBottle3D from './PerfumeBottle3D';
import PerfumeParticles from './PerfumeParticles';

export default function HeroBottleScene({
  currentPerfume,
  isPopped,
  isSpraying,
  onSprayTrigger,
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Ambient & Dramatic Luxury Lighting */}
          <ambientLight intensity={0.4} color="#fbf4e6" />
          
          {/* Main Key Spotlight (Gold warm glow from above) */}
          <spotLight
            position={[3, 5, 4]}
            angle={0.4}
            penumbra={1}
            intensity={4.5}
            color="#f5e6c8"
            castShadow
            shadow-bias={-0.0001}
          />
          
          {/* Soft Fill Light (Rose/Champagne accent) */}
          <spotLight
            position={[-4, 3, 2]}
            angle={0.6}
            penumbra={0.8}
            intensity={2.2}
            color="#e0a899"
          />

          {/* Crisp Rim Light (Backlight for glass edge refraction) */}
          <directionalLight position={[0, 4, -4]} intensity={3.0} color="#d4af37" />

          {/* Floating Subtle Physics */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <PerfumeBottle3D
              color={currentPerfume.color || '#2a1a0e'}
              topColor={currentPerfume.topColor || '#d4af37'}
              brandName="VÉLORA"
              subName={currentPerfume.name || 'NOIR'}
              isPopped={isPopped}
              onSpray={onSprayTrigger}
              mousePos={mousePos}
              autoRotate={false}
            />
          </Float>

          {/* Floating Gold & Mist Particles */}
          <PerfumeParticles isSpraying={isSpraying} count={140} />

          {/* Contact Shadow for grounded luxury realism */}
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.7}
            scale={6}
            blur={2.4}
            far={4}
            color="#000000"
          />

          {/* Smooth Interactive Orbit Controls (Restricted for controlled beauty) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.8}
            maxPolarAngle={Math.PI / 1.8}
            rotateSpeed={0.6}
            dampingFactor={0.05}
          />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
