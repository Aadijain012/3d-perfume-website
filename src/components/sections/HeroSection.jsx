import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Wind, Move, Film, Box } from 'lucide-react';
import HeroBottleScene from '../canvas/HeroBottleScene';
import { luxuryAudio } from '../../utils/audio';

export const HERO_PERFUMES = [
  {
    id: 'noir',
    index: '01',
    name: 'NOIR',
    fullName: 'VÉLORA NOIR',
    subtitle: 'Eau De Parfum · 100ml',
    tagline: 'An intoxicating descent into midnight obsidian & smoked amber.',
    color: '#2a1a0e',
    topColor: '#d4af37',
    price: '$340',
    notes: ['Black Pepper', 'Rose Noir', 'Smoked Oud', 'Ambergris'],
  },
  {
    id: 'santal',
    index: '02',
    name: 'SANTAL',
    fullName: 'VÉLORA SANTAL',
    subtitle: 'Eau De Parfum · 100ml',
    tagline: 'Sun-drenched Mysore sandalwood laced with creamy cardamom & iris.',
    color: '#3d2508',
    topColor: '#e6ca65',
    price: '$295',
    notes: ['Cardamom', 'Papyrus', 'Sandalwood', 'Cedarwood'],
  },
  {
    id: 'rose',
    index: '03',
    name: 'ROSE',
    fullName: 'VÉLORA ROSE',
    subtitle: 'Extrait De Parfum · 100ml',
    tagline: 'Dew-kissed Damask petals infused with velvet musk & pink pepper.',
    color: '#401824',
    topColor: '#e0a899',
    price: '$280',
    notes: ['Damask Rose', 'Pink Pepper', 'Cashmeran', 'White Musk'],
  },
  {
    id: 'oud',
    index: '04',
    name: 'OUD',
    fullName: 'VÉLORA OUD',
    subtitle: 'Extrait De Parfum · 100ml',
    tagline: 'A royal coronation of rare Cambodian agarwood & golden saffron.',
    color: '#1a1208',
    topColor: '#b48a28',
    price: '$360',
    notes: ['Rare Agarwood', 'Golden Saffron', 'Leather', 'Incense'],
  },
];

export default function HeroSection({ onExplore, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopped, setIsPopped] = useState(false);
  const [isSpraying, setIsSpraying] = useState(false);
  const [viewMode, setViewMode] = useState('film'); // 'film' or '3d'
  const [videoMuted, setVideoMuted] = useState(true);

  const currentPerfume = HERO_PERFUMES[currentIndex];

  const handleNext = () => {
    luxuryAudio.playGlassClink();
    setCurrentIndex((prev) => (prev + 1) % HERO_PERFUMES.length);
  };

  const handlePrev = () => {
    luxuryAudio.playGlassClink();
    setCurrentIndex((prev) => (prev - 1 + HERO_PERFUMES.length) % HERO_PERFUMES.length);
  };

  const handleSprayTrigger = () => {
    luxuryAudio.playMistSpray();
    setIsPopped(true);
    setIsSpraying(true);
    setTimeout(() => {
      setIsSpraying(false);
    }, 1800);
    setTimeout(() => {
      setIsPopped(false);
    }, 2800);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#060608',
      }}
    >
      {/* 1. CINEMA VIDEO BACKGROUND LAYER */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: viewMode === 'film' ? 1 : 0.25,
          transition: 'opacity 0.8s ease',
          pointerEvents: 'none',
        }}
      >
        <video
          src="/velora-video.mp4"
          autoPlay
          loop
          muted={videoMuted}
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(1.08) brightness(0.9)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(7, 7, 9, 0.4) 0%, rgba(7, 7, 9, 0.85) 75%, #070709 100%)',
          }}
        />
      </div>

      {/* 2. 3D WEBGL INTERACTIVE CANVAS LAYER */}
      {viewMode === '3d' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            cursor: 'grab',
          }}
        >
          <HeroBottleScene
            currentPerfume={currentPerfume}
            isPopped={isPopped}
            isSpraying={isSpraying}
            onSprayTrigger={handleSprayTrigger}
          />
        </div>
      )}

      {/* 3. HERO UI CONTENT OVERLAY */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '110px 24px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '92vh',
          pointerEvents: 'none',
        }}
        className="hero-container"
      >
        {/* Top View Mode Switcher */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '10px',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(10, 10, 14, 0.75)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '9999px',
              padding: '3px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            }}
          >
            <button
              onClick={() => {
                luxuryAudio.playHoverTick();
                setViewMode('film');
              }}
              data-interactive="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                background: viewMode === 'film' ? 'linear-gradient(135deg, #d4af37, #aa8010)' : 'transparent',
                color: viewMode === 'film' ? '#070709' : '#a1a1aa',
                fontWeight: 600,
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <Film size={13} />
              <span>CINEMA FILM</span>
            </button>

            <button
              onClick={() => {
                luxuryAudio.playGlassClink();
                setViewMode('3d');
              }}
              data-interactive="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                background: viewMode === '3d' ? 'linear-gradient(135deg, #d4af37, #aa8010)' : 'transparent',
                color: viewMode === '3d' ? '#070709' : '#a1a1aa',
                fontWeight: 600,
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <Box size={13} />
              <span>3D VIEW</span>
            </button>
          </div>
        </div>

        {/* Left Headline Area */}
        <div style={{ maxWidth: '580px', pointerEvents: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              marginBottom: '20px',
            }}
          >
            <Sparkles size={12} color="#d4af37" />
            <span
              className="font-sans"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                color: '#f3e5ab',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              MORE THAN A FRAGRANCE
            </span>
          </motion.div>

          {/* Large Serif Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif"
            style={{
              fontSize: 'clamp(2.3rem, 6vw, 4.8rem)',
              lineHeight: 1.06,
              fontWeight: 400,
              color: '#ffffff',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 24px rgba(0,0,0,0.9)',
            }}
          >
            A Scent <br />
            <span className="text-gold-gradient" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              That Stays
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans"
            style={{
              fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
              color: '#e4e4e7',
              lineHeight: 1.65,
              fontWeight: 300,
              marginBottom: '32px',
              maxWidth: '460px',
              textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            }}
          >
            VÉLORA crafts more than perfumes — we create memories, bottled in time.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}
          >
            <a
              href="#fragrances"
              className="btn-luxury btn-luxury-solid"
              data-interactive="true"
              onClick={() => {
                luxuryAudio.playHoverTick();
                if (onExplore) onExplore();
              }}
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </a>

            {viewMode === '3d' ? (
              <button
                onClick={handleSprayTrigger}
                className="btn-luxury"
                data-interactive="true"
                title="Trigger Physics Cap & Spray"
              >
                <Wind size={14} color="#d4af37" />
                <span>{isSpraying ? 'Spraying Mist...' : 'Test Atomizer'}</span>
              </button>
            ) : (
              <a
                href="#film"
                className="btn-luxury"
                data-interactive="true"
                onClick={() => luxuryAudio.playHoverTick()}
              >
                <Film size={14} color="#d4af37" />
                <span>Watch Campaign Film</span>
              </a>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar: Switcher Controls + Hints */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            pointerEvents: 'auto',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Left Carousel Switcher (< 01 / 04 >) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handlePrev}
              title="Previous Fragrance"
              data-interactive="true"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <span
              className="font-sans"
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                color: '#f3e5ab',
                fontWeight: 600,
              }}
            >
              {currentPerfume.index} <span style={{ color: '#71717a' }}>/ 04</span>
            </span>

            <button
              onClick={handleNext}
              title="Next Fragrance"
              data-interactive="true"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={16} />
            </button>

            <span
              className="font-serif"
              style={{
                marginLeft: '8px',
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              {currentPerfume.fullName}
            </span>
          </div>

          {/* Right Scroll Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#a1a1aa',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            <span>Scroll To Explore</span>
            <div
              style={{
                width: '1px',
                height: '24px',
                background: 'linear-gradient(to bottom, #d4af37, transparent)',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-container { padding: 130px 48px 48px !important; }
        }
      `}</style>
    </section>
  );
}
