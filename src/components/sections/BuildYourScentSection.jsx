import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Check, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { luxuryAudio } from '../../utils/audio';

const AVAILABLE_NOTES = {
  top: [
    { id: 't1', name: 'Calabrian Bergamot', category: 'Citrus', color: '#f59e0b', desc: 'Sparkling, crisp sunlit citrus peel', bottleImg: '/assets/velora-santal.jpg' },
    { id: 't2', name: 'Pink Peppercorn', category: 'Spicy', color: '#fb7185', desc: 'Vibrant rosy warmth with gentle bite', bottleImg: '/assets/velora-rose.jpg' },
    { id: 't3', name: 'Green Cardamom', category: 'Aromatic', color: '#34d399', desc: 'Cool herbal spice with botanical zest', bottleImg: '/assets/velora-blanc.jpg' },
  ],
  heart: [
    { id: 'h1', name: 'Star Jasmine', category: 'Floral', color: '#f3e5ab', desc: 'Ethereal nocturnal white petals', bottleImg: '/assets/velora-blanc.jpg' },
    { id: 'h2', name: 'Damask Rose Absolute', category: 'Floral', color: '#e0a899', desc: 'Deep velvet crimson honey notes', bottleImg: '/assets/velora-rose.jpg' },
    { id: 'h3', name: 'Smoked Iris', category: 'Earthy', color: '#c084fc', desc: 'Powdery aristocratic root elegance', bottleImg: '/assets/velora-noir.jpg' },
  ],
  base: [
    { id: 'b1', name: 'Mysore Sandalwood', category: 'Woody', color: '#d97706', desc: 'Creamy warm sacred heartwood', bottleImg: '/assets/velora-santal.jpg' },
    { id: 'b2', name: 'Royal Ambergris', category: 'Amber', color: '#d4af37', desc: 'Solar warmth with magnetic skin hold', bottleImg: '/assets/velora-noir.jpg' },
    { id: 'b3', name: 'Smoked Cambodian Oud', category: 'Resin', color: '#78350f', desc: 'Dark regal resinous incense', bottleImg: '/assets/velora-oud.jpg' },
    { id: 'b4', name: 'Tuscan Leather', category: 'Leather', color: '#c2782b', desc: 'Rich vintage leather and bourbon', bottleImg: '/assets/velora-cuir.jpg' },
  ],
};

export default function BuildYourScentSection({ onAddToCart }) {
  const [selectedTop, setSelectedTop] = useState(AVAILABLE_NOTES.top[0]);
  const [selectedHeart, setSelectedHeart] = useState(AVAILABLE_NOTES.heart[1]);
  const [selectedBase, setSelectedBase] = useState(AVAILABLE_NOTES.base[1]);
  const [engraving, setEngraving] = useState('ÉTERNEL');
  const [activeTab, setActiveTab] = useState('top');

  const activeBottleImage = selectedBase.bottleImg || '/assets/velora-noir.jpg';
  const blendColor = selectedBase.color;

  const handleSelectNote = (tier, note) => {
    luxuryAudio.playNoteChord(tier === 'top' ? 620 : tier === 'heart' ? 520 : 420);
    if (tier === 'top') setSelectedTop(note);
    if (tier === 'heart') setSelectedHeart(note);
    if (tier === 'base') setSelectedBase(note);
  };

  const handleOrderBespoke = () => {
    luxuryAudio.playGlassClink();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#d4af37', '#f3e5ab', '#e0a899', '#ffffff'],
    });

    if (onAddToCart) {
      onAddToCart({
        id: `bespoke-${Date.now()}`,
        name: `VÉLORA BESPOKE (${engraving.toUpperCase()})`,
        fullName: `VÉLORA BESPOKE · ${engraving.toUpperCase()}`,
        price: '$380',
        subtitle: `${selectedTop.name} · ${selectedHeart.name} · ${selectedBase.name}`,
        image: activeBottleImage,
        isBespoke: true,
        engraving: engraving.toUpperCase(),
      });
    }
  };

  return (
    <section
      id="scent-lab"
      className="section-padding"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#07070a',
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
          top: '40%',
          left: '35%',
          width: '700px',
          height: '700px',
          background: `radial-gradient(circle, ${blendColor}22 0%, transparent 65%)`,
          filter: 'blur(80px)',
          transition: 'background 0.8s ease',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
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
              INTERACTIVE EXPERIENCE
            </span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
              color: '#fff',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: '12px',
            }}
          >
            Build Your <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>Scent</span>
          </h2>

          <p
            className="font-sans"
            style={{
              fontSize: '0.92rem',
              color: '#a1a1aa',
              lineHeight: 1.6,
              maxWidth: '560px',
            }}
          >
            Harmonize rare pure essences, personalize your crystal bottle engraving, and formulate a bespoke fragrance uniquely tailored to your aura.
          </p>
        </div>

        {/* Main 2-Column Grid: Perfect Equal-Height Responsive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Photorealistic Luxury Bespoke Bottle Visual Stage */}
          <div
            className="glass-panel"
            style={{
              minHeight: '640px',
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              background: '#050508',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.85), 0 0 35px rgba(212, 175, 55, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Real Photorealistic Perfume Bottle */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeBottleImage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                src={activeBottleImage}
                alt="Bespoke Perfume Bottle"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.05)',
                }}
              />
            </AnimatePresence>

            {/* Glowing Liquid Halo Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 50% 55%, ${blendColor}35 0%, transparent 60%)`,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />

            {/* Live Custom Laser Engraved Plaque */}
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                background: 'rgba(8, 8, 12, 0.94)',
                border: '1px solid #d4af37',
                padding: '10px 28px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 10px 35px rgba(0,0,0,0.9), 0 0 20px rgba(212, 175, 55, 0.4)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="font-display" style={{ fontSize: '0.62rem', color: '#f3e5ab', letterSpacing: '0.3em' }}>
                VÉLORA
              </div>
              <div style={{ fontSize: '0.95rem', color: '#d4af37', fontWeight: 600, letterSpacing: '0.22em', fontFamily: 'var(--font-display)', margin: '2px 0' }}>
                {engraving ? engraving.toUpperCase() : 'BESPOKE'}
              </div>
              <div style={{ fontSize: '0.52rem', color: '#a1a1aa', letterSpacing: '0.2em' }}>
                EXTRAIT DE PARFUM 32%
              </div>
            </div>

            {/* Floating Top & Heart Badges */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                right: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontSize: '0.72rem', color: '#f3e5ab', background: 'rgba(5,5,8,0.75)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '9999px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                TOP: {selectedTop.name}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#e0a899', background: 'rgba(5,5,8,0.75)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '9999px', border: '1px solid rgba(224, 168, 153, 0.3)' }}>
                HEART: {selectedHeart.name}
              </span>
            </div>
          </div>

          {/* Right: "YOUR BLEND" Formulation Control Panel (Matching Full Height) */}
          <div
            className="glass-panel-gold"
            style={{
              minHeight: '640px',
              padding: '36px',
              borderRadius: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Top Formulation Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', letterSpacing: '0.2em', color: '#fff' }}>
                    YOUR BLEND
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Select notes to evolve your olfactory formula</p>
                </div>
                <span className="font-sans" style={{ color: '#f3e5ab', fontSize: '1.45rem', fontWeight: 700 }}>
                  $380
                </span>
              </div>

              {/* Note Tier Selector Tabs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '4px',
                  borderRadius: '10px',
                  marginBottom: '18px',
                }}
              >
                {['top', 'heart', 'base'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => {
                      luxuryAudio.playHoverTick();
                      setActiveTab(tier);
                    }}
                    data-interactive="true"
                    style={{
                      background: activeTab === tier ? '#d4af37' : 'transparent',
                      color: activeTab === tier ? '#070709' : '#a1a1aa',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '9px 0',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {/* Note Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                {AVAILABLE_NOTES[activeTab].map((note) => {
                  const isCurrent =
                    (activeTab === 'top' && selectedTop.id === note.id) ||
                    (activeTab === 'heart' && selectedHeart.id === note.id) ||
                    (activeTab === 'base' && selectedBase.id === note.id);

                  return (
                    <div
                      key={note.id}
                      onClick={() => handleSelectNote(activeTab, note)}
                      data-interactive="true"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: isCurrent ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${isCurrent ? '#d4af37' : 'rgba(255, 255, 255, 0.06)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: note.color,
                            boxShadow: isCurrent ? `0 0 10px ${note.color}` : 'none',
                          }}
                        />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{note.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>{note.desc}</div>
                        </div>
                      </div>
                      {isCurrent ? <Check size={16} color="#d4af37" /> : <Plus size={16} color="#71717a" />}
                    </div>
                  );
                })}
              </div>

              {/* Selected Summary Card */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: '#a1a1aa' }}>Top Note:</span>
                  <strong style={{ color: '#f3e5ab' }}>{selectedTop.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: '#a1a1aa' }}>Heart Note:</span>
                  <strong style={{ color: '#e0a899' }}>{selectedHeart.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: '#a1a1aa' }}>Base Note:</span>
                  <strong style={{ color: '#d4af37' }}>{selectedBase.name}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Laser Engraving & Order Action */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#a1a1aa',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Bespoke Laser Engraving (Max 12 Chars):
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="YOUR NAME"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#f3e5ab',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Order Bespoke Blend CTA */}
              <button
                onClick={handleOrderBespoke}
                className="btn-luxury btn-luxury-solid"
                data-interactive="true"
                style={{ width: '100%', padding: '16px 0' }}
              >
                <ShoppingBag size={16} />
                <span>Order Bespoke Blend · $380</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
