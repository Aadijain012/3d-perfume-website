import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flower2, Citrus, Trees, HeartHandshake, MapPin } from 'lucide-react';
import { luxuryAudio } from '../../utils/audio';

const INGREDIENTS = [
  {
    num: '01',
    title: 'Floral',
    subtitle: 'Delicate, Elegant, Timeless.',
    origin: 'Grasse, France',
    harvest: 'Dawn hand-picked',
    icon: Flower2,
    color: '#e0a899',
    accentGlow: 'rgba(224, 168, 153, 0.4)',
    notes: 'Damask Rose · Star Jasmine · Neroli',
    description: 'Harvested exclusively at first morning light when dew preserves the fragile essential aromatic oils in each velvety petal.',
  },
  {
    num: '02',
    title: 'Citrus',
    subtitle: 'Fresh, Energetic, Vibrant.',
    origin: 'Calabria, Italy',
    harvest: 'Cold-pressed peel',
    icon: Citrus,
    color: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    notes: 'Sunlit Bergamot · Blood Orange · Yuzu',
    description: 'Cold-pressed from sun-drenched Italian groves, releasing sparkling top effervescence that awakens the senses instantly.',
  },
  {
    num: '03',
    title: 'Woody',
    subtitle: 'Warm, Bold, Grounded.',
    origin: 'Mysore, India',
    harvest: 'Aged Heartwood',
    icon: Trees,
    color: '#d97706',
    accentGlow: 'rgba(217, 119, 6, 0.4)',
    notes: 'Sandalwood · Atlas Cedar · Vetiver',
    description: 'Distilled from seasoned root heartwoods, providing a smooth, creamy, meditative foundation that anchors the perfume.',
  },
  {
    num: '04',
    title: 'Musk & Resins',
    subtitle: 'Sensual, Lasting, Unforgettable.',
    origin: 'Dhofar, Oman',
    harvest: 'Sun-cured Amber & Frankincense',
    icon: HeartHandshake,
    color: '#d4af37',
    accentGlow: 'rgba(212, 175, 55, 0.45)',
    notes: 'Ambergris · Royal Musk · Benzoin',
    description: 'Rare solar resins that meld intimately with body heat, evolving uniquely on your skin for over twenty-four hours.',
  },
];

// Double array for seamless infinite marquee loop (1 2 3 4 -> 1 2 3 4)
const INFINITE_INGREDIENTS = [...INGREDIENTS, ...INGREDIENTS];

export default function EssenceSection() {
  const [selectedNum, setSelectedNum] = useState('01');

  return (
    <section
      id="essence"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#07070a',
        padding: '100px 0 120px',
        overflow: 'hidden',
      }}
    >
      {/* 1. FULL-WIDTH CINEMATIC BOTANICAL BANNER (Edge to Edge 100% Screen Width) */}
      <div
        style={{
          width: '100vw',
          position: 'relative',
          marginBottom: '60px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(380px, 48vh, 520px)',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          <img
            src="/assets/botanical-essence.jpg"
            alt="Nature's Finest Ingredients"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              filter: 'contrast(1.08) brightness(0.95)',
            }}
          />

          {/* Full Screen Vignette Gradient & Headline */}
          <div
            className="essence-banner-content"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(7,7,10,0.92) 0%, rgba(7,7,10,0.4) 50%, rgba(7,7,10,0.92) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 48px',
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  marginBottom: '14px',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Sparkles size={12} color="#d4af37" />
                <span
                  className="font-sans"
                  style={{
                    fontSize: '0.68rem',
                    letterSpacing: '0.25em',
                    color: '#f3e5ab',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  THE ESSENCE
                </span>
              </div>

              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.1rem, 4.5vw, 4.2rem)',
                  color: '#fff',
                  fontWeight: 400,
                  lineHeight: 1.08,
                  marginBottom: '14px',
                  textShadow: '0 4px 24px rgba(0,0,0,0.9)',
                }}
              >
                Nature's Finest <br />
                <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>
                  Ingredients
                </span>
              </h2>

              <p
                className="font-sans"
                style={{
                  fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
                  color: '#e4e4e7',
                  lineHeight: 1.65,
                  textShadow: '0 2px 12px rgba(0,0,0,0.9)',
                  maxWidth: '480px',
                }}
              >
                Rare. Pure. Powerful. Every single note is ethically hand-harvested from legendary micro-terroirs across five continents.
              </p>
            </div>

            <div
              className="essence-badge-desktop"
              style={{
                alignItems: 'center',
                gap: '8px',
                color: '#d4af37',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                background: 'rgba(8,8,12,0.75)',
                backdropFilter: 'blur(16px)',
                padding: '10px 22px',
                borderRadius: '9999px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <span>HOVER TO PAUSE & DISCOVER</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .essence-banner-content {
            padding: 0 20px !important;
          }
          .essence-badge-desktop {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .essence-badge-desktop {
            display: flex !important;
          }
        }
      `}</style>

      {/* 2. INFINITE SEAMLESS MARQUEE (1 2 3 4 -> 1 2 3 4 CONTINUOUS MOTION) */}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
        <div className="marquee-track" style={{ gap: '28px', padding: '16px 0' }}>
          {INFINITE_INGREDIENTS.map((item, idx) => {
            const isSelected = selectedNum === item.num;
            const Icon = item.icon;

            return (
              <div
                key={`${item.num}-${idx}`}
                onClick={() => {
                  luxuryAudio.playNoteChord(item.num === '01' ? 523.25 : item.num === '02' ? 587.33 : item.num === '03' ? 659.25 : 783.99);
                  setSelectedNum(item.num);
                }}
                data-interactive="true"
                className={isSelected ? 'glass-panel-gold' : 'glass-panel glass-panel-hover'}
                style={{
                  width: '340px',
                  padding: '36px 28px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  position: 'relative',
                  flexShrink: 0,
                  borderColor: isSelected ? 'rgba(212, 175, 55, 0.7)' : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? `0 20px 50px rgba(0,0,0,0.9), 0 0 30px ${item.accentGlow}` : '0 15px 40px rgba(0,0,0,0.6)',
                }}
              >
                {/* Header Number & Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                  }}
                >
                  <span
                    className="font-sans"
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: isSelected ? '#f3e5ab' : '#71717a',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.num}
                  </span>

                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: isSelected ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${isSelected ? '#d4af37' : 'rgba(255, 255, 255, 0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? '#f3e5ab' : '#a1a1aa',
                      boxShadow: isSelected ? `0 0 20px ${item.accentGlow}` : 'none',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3
                  className="font-serif"
                  style={{
                    fontSize: '1.55rem',
                    color: '#fff',
                    marginBottom: '6px',
                    fontWeight: 400,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.8rem',
                    color: isSelected ? '#f3e5ab' : '#a1a1aa',
                    fontWeight: 500,
                    marginBottom: '16px',
                  }}
                >
                  {item.subtitle}
                </p>

                {/* Description */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.78rem',
                    color: '#a1a1aa',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  {item.description}
                </p>

                {/* Notes & Origin */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d4af37', fontSize: '0.74rem' }}>
                    <MapPin size={12} />
                    <span style={{ fontWeight: 600 }}>{item.origin}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#e4e4e7' }}>
                    {item.notes}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
