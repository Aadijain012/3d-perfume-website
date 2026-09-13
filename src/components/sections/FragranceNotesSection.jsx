import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Clock, Flame, Wind, Droplets } from 'lucide-react';
import { luxuryAudio } from '../../utils/audio';

const NOTES_DATA = [
  {
    id: 'top',
    type: 'TOP NOTES',
    duration: '0 - 30 Minutes',
    ingredients: 'Citrus · Bergamot · Green Tea',
    vibe: 'First Impression',
    description: 'The luminous opening sensation that greets you upon the first spray — effervescent, invigorating, and awakening the senses with citrus sparkle.',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    icon: Wind,
    visualBadge: '🍊',
    visualDesc: 'Sicilian Bergamot & Crisp Lemon Peel',
  },
  {
    id: 'heart',
    type: 'HEART NOTES',
    duration: '30 Min - 4 Hours',
    ingredients: 'Jasmine · Rose · French Lavender',
    vibe: 'The Emotional Core',
    description: 'As top notes soften, the heart blooms into a rich, full-bodied floral bouquet that defines the unforgettable personality of the blend.',
    color: '#e0a899',
    glow: 'rgba(224, 168, 153, 0.45)',
    icon: Droplets,
    visualBadge: '🌸',
    visualDesc: 'Star Jasmine & Velvety Damask Rose',
  },
  {
    id: 'base',
    type: 'BASE NOTES',
    duration: '4 - 12+ Hours',
    ingredients: 'Sandalwood · Amber · Sensual Musk',
    vibe: 'The Enduring Soul',
    description: 'The heaviest aromatic molecules that meld intimately with your unique body chemistry, leaving a lingering, hypnotic sillage for hours to come.',
    color: '#d4af37',
    glow: 'rgba(212, 175, 55, 0.45)',
    icon: Flame,
    visualBadge: '🪵',
    visualDesc: 'Mysore Sandalwood & Molten Amber',
  },
];

export default function FragranceNotesSection({ onOpenScentLab }) {
  const [selectedNote, setSelectedNote] = useState(1); // default heart notes

  const handleNext = () => {
    luxuryAudio.playGlassClink();
    setSelectedNote((prev) => (prev + 1) % NOTES_DATA.length);
  };

  const handlePrev = () => {
    luxuryAudio.playGlassClink();
    setSelectedNote((prev) => (prev - 1 + NOTES_DATA.length) % NOTES_DATA.length);
  };

  return (
    <section
      id="fragrance-notes"
      className="section-padding"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#060608',
        padding: '100px 48px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Header Block */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 60px',
          }}
        >
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
            <Sparkles size={12} color="#d4af37" />
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
              FRAGRANCE NOTES
            </span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              color: '#fff',
              fontWeight: 500,
              lineHeight: 1.1,
              marginBottom: '14px',
            }}
          >
            A Journey in <br />
            <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>
              Three Notes
            </span>
          </h2>

          <p
            className="font-sans"
            style={{
              fontSize: '0.92rem',
              color: '#a1a1aa',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            From the first breath to the lasting memory, each note tells a different part of your story.
          </p>
        </div>

        {/* 3 Glowing Crystal Orbs Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '28px',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {NOTES_DATA.map((note, index) => {
            const isCurrent = selectedNote === index;
            const Icon = note.icon;

            return (
              <motion.div
                key={note.id}
                onClick={() => {
                  luxuryAudio.playNoteChord(index === 0 ? 600 : index === 1 ? 520 : 440);
                  setSelectedNote(index);
                }}
                data-interactive="true"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRadius: '24px',
                  background: isCurrent ? 'rgba(20, 20, 28, 0.7)' : 'rgba(12, 12, 16, 0.4)',
                  border: `1px solid ${isCurrent ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255, 255, 255, 0.05)'}`,
                  boxShadow: isCurrent ? `0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px ${note.glow}` : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                }}
              >
                {/* Glowing Crystal Sphere Container */}
                <div
                  style={{
                    width: '210px',
                    height: '210px',
                    borderRadius: '50%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.2) 0%, rgba(20, 18, 25, 0.9) 65%, #050507 100%)`,
                    border: `1.5px solid ${isCurrent ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'}`,
                    boxShadow: `inset 0 0 30px rgba(0, 0, 0, 0.9), 0 0 40px ${note.glow}`,
                    overflow: 'hidden',
                  }}
                >
                  {/* Outer Crystal Refraction Ring */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '8px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Inner Botanical Emblem & Glow */}
                  <motion.div
                    animate={isCurrent ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle at 40% 40%, ${note.glow} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Center Realistic Botanical Icon / Core */}
                  <div
                    style={{
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '3.6rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))' }}>
                      {note.visualBadge}
                    </span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        color: '#f3e5ab',
                        textTransform: 'uppercase',
                        marginTop: '4px',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '2px 8px',
                        borderRadius: '999px',
                      }}
                    >
                      {note.vibe}
                    </span>
                  </div>

                  {/* Glass Specular Flare */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '32px',
                      width: '38px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.45)',
                      filter: 'blur(3px)',
                      transform: 'rotate(-35deg)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Note Label */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.1rem',
                    letterSpacing: '0.22em',
                    color: '#fff',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  {note.type}
                </h3>

                {/* Subtitle / Ingredients */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.88rem',
                    color: isCurrent ? '#f3e5ab' : '#a1a1aa',
                    fontWeight: 500,
                    marginBottom: '16px',
                  }}
                >
                  {note.ingredients}
                </p>

                {/* Duration Tag */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.72rem',
                    color: '#71717a',
                    marginBottom: '18px',
                  }}
                >
                  <Clock size={12} color="#d4af37" />
                  <span>{note.duration}</span>
                </div>

                {/* Description */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.8rem',
                    color: '#71717a',
                    lineHeight: 1.6,
                    maxWidth: '320px',
                  }}
                >
                  {note.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA to Scent Lab */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <a
            href="#scent-lab"
            className="btn-luxury btn-luxury-solid"
            data-interactive="true"
            onClick={() => luxuryAudio.playHoverTick()}
          >
            <span>Blend These Notes In Scent Lab</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
