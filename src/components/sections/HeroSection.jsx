import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Film } from 'lucide-react';
import { luxuryAudio } from '../../utils/audio';

export default function HeroSection({ onExplore }) {
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
          pointerEvents: 'none',
        }}
      >
        <video
          src="/velora-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
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
            background: 'radial-gradient(circle at 50% 40%, rgba(7, 7, 9, 0.35) 0%, rgba(7, 7, 9, 0.8) 75%, #070709 100%)',
          }}
        />
      </div>

      {/* 2. HERO UI CONTENT OVERLAY */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '140px 24px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '92vh',
          pointerEvents: 'none',
        }}
        className="hero-container"
      >
        {/* Left Headline Area */}
        <div style={{ maxWidth: '620px', pointerEvents: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              marginBottom: '22px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Sparkles size={13} color="#d4af37" />
            <span
              className="font-sans"
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
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
              fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              color: '#ffffff',
              marginBottom: '22px',
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
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              color: '#e4e4e7',
              lineHeight: 1.65,
              fontWeight: 300,
              marginBottom: '36px',
              maxWidth: '480px',
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

            <a
              href="#film"
              className="btn-luxury"
              data-interactive="true"
              onClick={() => luxuryAudio.playHoverTick()}
            >
              <Film size={14} color="#d4af37" />
              <span>Watch Campaign Film</span>
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-container { padding: 150px 48px 60px !important; }
        }
      `}</style>
    </section>
  );
}
