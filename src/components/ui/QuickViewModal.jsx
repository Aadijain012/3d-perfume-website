import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, ShieldCheck, Heart, Share2, Box, Image as ImageIcon } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import PerfumeBottle3D from '../canvas/PerfumeBottle3D';
import { luxuryAudio } from '../../utils/audio';

export default function QuickViewModal({ perfume, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [viewTab, setViewTab] = useState('photo'); // 'photo' or '3d'

  if (!isOpen || !perfume) return null;

  const handleAdd = () => {
    luxuryAudio.playGlassClink();
    for (let i = 0; i < quantity; i++) {
      onAddToCart(perfume);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 980,
          background: 'rgba(5, 5, 8, 0.88)',
          backdropFilter: 'blur(30px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-gold"
          style={{
            width: '100%',
            maxWidth: '960px',
            maxHeight: '92vh',
            overflowY: 'auto',
            borderRadius: '24px',
            padding: 'clamp(20px, 4vw, 40px)',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            data-interactive="true"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={18} />
          </button>

          {/* Left: Media Viewport (Toggle between Real Photo & 360 WebGL 3D) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* View Mode Toggle Switcher */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  luxuryAudio.playHoverTick();
                  setViewTab('photo');
                }}
                data-interactive="true"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '6px 0',
                  borderRadius: '9999px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: viewTab === 'photo' ? '#d4af37' : 'rgba(255, 255, 255, 0.05)',
                  color: viewTab === 'photo' ? '#070709' : '#a1a1aa',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <ImageIcon size={13} />
                <span>STUDIO STILL</span>
              </button>

              <button
                onClick={() => {
                  luxuryAudio.playGlassClink();
                  setViewTab('3d');
                }}
                data-interactive="true"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '6px 0',
                  borderRadius: '9999px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  background: viewTab === '3d' ? '#d4af37' : 'rgba(255, 255, 255, 0.05)',
                  color: viewTab === '3d' ? '#070709' : '#a1a1aa',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Box size={13} />
                <span>3D ROTATE</span>
              </button>
            </div>

            {/* Main Visual Box */}
            <div
              style={{
                height: '380px',
                borderRadius: '20px',
                background: '#040406',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}
            >
              {viewTab === 'photo' ? (
                <img
                  src={perfume.image || '/assets/velora-noir.jpg'}
                  alt={perfume.fullName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Canvas camera={{ position: [0, 0.3, 3.8], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <spotLight position={[3, 4, 3]} intensity={4.0} color="#f5e6c8" />
                  <spotLight position={[-3, 2, 2]} intensity={2.0} color="#e0a899" />
                  <directionalLight position={[0, 3, -3]} intensity={2.5} color="#d4af37" />

                  <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
                    <PerfumeBottle3D
                      color={perfume.color}
                      topColor={perfume.topColor || '#d4af37'}
                      brandName="VÉLORA"
                      subName={perfume.name}
                      autoRotate={true}
                    />
                  </Float>

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.8}
                  />
                </Canvas>
              )}
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={14} color="#d4af37" />
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: '#d4af37', textTransform: 'uppercase' }}>
                  HAUTE PARFUMERIE · PARIS
                </span>
              </div>

              <h2 className="font-serif" style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 600 }}>
                {perfume.fullName}
              </h2>

              <p style={{ fontSize: '0.82rem', color: '#a1a1aa', letterSpacing: '0.1em', marginTop: '4px' }}>
                {perfume.subtitle || 'Eau De Parfum · 100ml / 3.4 FL. OZ.'}
              </p>
            </div>

            <div className="font-sans" style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f3e5ab' }}>
              {perfume.price}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#a1a1aa', lineHeight: 1.6 }}>
              {perfume.tagline || 'An intoxicating composition of rare hand-selected botanicals and ancient tree resins.'}
            </p>

            {/* Notes Pyramid Chips */}
            <div>
              <span style={{ fontSize: '0.7rem', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Olfactory Composition:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {perfume.notes && perfume.notes.map((note) => (
                  <span
                    key={note}
                    style={{
                      background: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      color: '#f3e5ab',
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Quantity & Add to Bag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
              {/* Quantity Counter */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px' }}
                >
                  -
                </button>
                <span style={{ padding: '0 12px', fontSize: '0.85rem', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px' }}
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="btn-luxury btn-luxury-solid"
                data-interactive="true"
                style={{ flex: 1, padding: '14px 0' }}
              >
                <ShoppingBag size={16} />
                <span>Add To Bag · {perfume.price}</span>
              </button>

              {/* Like Heart */}
              <button
                onClick={() => {
                  luxuryAudio.playHoverTick();
                  setIsLiked(!isLiked);
                }}
                data-interactive="true"
                style={{
                  background: isLiked ? 'rgba(224, 168, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isLiked ? '#e0a899' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isLiked ? '#e0a899' : '#a1a1aa',
                  cursor: 'pointer',
                }}
              >
                <Heart size={18} fill={isLiked ? '#e0a899' : 'none'} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
