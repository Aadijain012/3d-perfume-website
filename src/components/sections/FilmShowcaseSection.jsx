import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film, Volume2, VolumeX } from 'lucide-react';
import { luxuryAudio } from '../../utils/audio';

export default function FilmShowcaseSection() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    luxuryAudio.playHoverTick();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section
      id="film"
      style={{
        position: 'relative',
        backgroundColor: '#07070a',
        padding: '100px 0',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-padding" style={{ maxWidth: '1440px', margin: '0 auto 40px', padding: '0 48px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            marginBottom: '16px',
          }}
        >
          <Film size={12} color="#d4af37" />
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
            THE CAMPAIGN FILM
          </span>
        </div>

        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            color: '#fff',
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Bottled in Time · <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>The Film</span>
        </h2>

        <p className="font-sans" style={{ fontSize: '0.92rem', color: '#a1a1aa', lineHeight: 1.6, fontWeight: 300, maxWidth: '540px', margin: '0 auto' }}>
          Immerse yourself in the dark, smoky obsidian universe of VÉLORA.
        </p>
      </div>

      {/* Pure Edge-to-Edge Cinematic Video Frame without any player bars */}
      <div
        style={{
          width: '100vw',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(360px, 60vh, 720px)',
            background: '#000',
          }}
        >
          <video
            ref={videoRef}
            src="/velora-video.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            webkit-playsinline="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              filter: 'contrast(1.08) brightness(0.95)',
            }}
          />

          {/* Cinematic Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Minimal Floating Sound Toggle & Brand Watermark */}
          <div
            className="film-overlay-bar"
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <button
              onClick={toggleMute}
              data-interactive="true"
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(8, 8, 12, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                padding: '8px 18px',
                borderRadius: '9999px',
                color: isMuted ? '#a1a1aa' : '#f3e5ab',
                cursor: 'pointer',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Unmute Film' : 'Sound Active'}</span>
            </button>

            <span
              className="font-display"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                color: '#d4af37',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              VÉLORA · PARIS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
