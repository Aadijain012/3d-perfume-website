import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, ShoppingBag, Star } from 'lucide-react';
import { luxuryAudio } from '../../utils/audio';

export const SIGNATURE_PERFUMES = [
  {
    id: 'noir',
    name: 'NOIR',
    fullName: 'VÉLORA NOIR',
    subtitle: 'Eau De Parfum · 100ml / 3.4 FL. OZ.',
    price: '$340',
    tag: 'Flagship Bestseller',
    color: '#2a1a0e',
    topColor: '#d4af37',
    glow: 'rgba(212, 175, 55, 0.55)',
    rating: '5.0',
    tagline: 'Smoked black pepper, midnight rose noir & golden ambergris.',
    notes: ['Black Pepper', 'Rose Noir', 'Smoked Oud', 'Ambergris'],
    image: '/assets/velora-noir.jpg',
  },
  {
    id: 'santal',
    name: 'SANTAL',
    fullName: 'VÉLORA SANTAL',
    subtitle: 'Eau De Parfum · 100ml / 3.4 FL. OZ.',
    price: '$295',
    tag: 'Iconic',
    color: '#3d2508',
    topColor: '#e6ca65',
    glow: 'rgba(230, 202, 101, 0.45)',
    rating: '4.9',
    tagline: 'Warm Mysore sandalwood, creamy cardamom & velvety violet.',
    notes: ['Cardamom', 'Iris Root', 'Sandalwood', 'Cedarwood'],
    image: '/assets/velora-santal.jpg',
  },
  {
    id: 'rose',
    name: 'ROSE',
    fullName: 'VÉLORA ROSE',
    subtitle: 'Extrait De Parfum · 100ml / 3.4 FL. OZ.',
    price: '$280',
    tag: 'Romantic',
    color: '#401824',
    topColor: '#e0a899',
    glow: 'rgba(224, 168, 153, 0.45)',
    rating: '4.8',
    tagline: 'Dew-kissed Damask petals, crisp pink pepper & velvet cashmere.',
    notes: ['Damask Rose', 'Pink Pepper', 'Cashmeran', 'White Musk'],
    image: '/assets/velora-rose.jpg',
  },
  {
    id: 'oud',
    name: 'OUD',
    fullName: 'VÉLORA OUD',
    subtitle: 'Extrait De Parfum · 100ml / 3.4 FL. OZ.',
    price: '$360',
    tag: 'Royal Reserve',
    color: '#1a1208',
    topColor: '#b48a28',
    glow: 'rgba(180, 138, 40, 0.5)',
    rating: '4.95',
    tagline: 'Aged Cambodian agarwood, royal saffron & sacred temple incense.',
    notes: ['Rare Agarwood', 'Golden Saffron', 'Leather', 'Incense'],
    image: '/assets/velora-oud.jpg',
  },
  {
    id: 'blanc',
    name: 'BLANC',
    fullName: 'VÉLORA BLANC',
    subtitle: 'Eau De Parfum · 100ml / 3.4 FL. OZ.',
    price: '$310',
    tag: 'Luminous Solar',
    color: '#e8e8ea',
    topColor: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.4)',
    rating: '4.9',
    tagline: 'Pure white neroli, nocturnal magnolia blossom & solar bergamot.',
    notes: ['Star Magnolia', 'Neroli Petals', 'White Amber', 'Solar Musk'],
    image: '/assets/velora-blanc.jpg',
  },
  {
    id: 'cuir',
    name: 'CUIR',
    fullName: 'VÉLORA CUIR',
    subtitle: 'Extrait De Parfum · 100ml / 3.4 FL. OZ.',
    price: '$350',
    tag: 'Private Vintage',
    color: '#3b200e',
    topColor: '#c2782b',
    glow: 'rgba(194, 120, 43, 0.5)',
    rating: '5.0',
    tagline: 'Smoked Tuscan leather, spiced black saffron & bourbon vanilla.',
    notes: ['Tuscan Leather', 'Black Saffron', 'Bourbon Vanilla', 'Birch Tar'],
    image: '/assets/velora-cuir.jpg',
  },
];

// Double array for infinite marquee loop (1..6 -> 1..6)
const INFINITE_PERFUMES = [...SIGNATURE_PERFUMES, ...SIGNATURE_PERFUMES];

export default function SignatureCollectionSection({ onSelectQuickView, onAddToCart }) {
  return (
    <section
      id="fragrances"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#060608',
        padding: '120px 0',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Block */}
      <div
        className="section-padding"
        style={{
          maxWidth: '1440px',
          margin: '0 auto 50px',
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
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
              OUR COLLECTION (6 FLACONS)
            </span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              color: '#fff',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Signature <br />
            <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>
              Fragrances
            </span>
          </h2>
        </div>

        <div style={{ maxWidth: '400px' }}>
          <p
            className="font-sans"
            style={{
              fontSize: '0.92rem',
              color: '#a1a1aa',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}
          >
            Discover our six signature flacons, each crafted to evoke an unforgettable dimension of you.
          </p>

          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              color: '#d4af37',
              textTransform: 'uppercase',
            }}
          >
            Hover on any bottle to pause & inspect
          </span>
        </div>
      </div>

      {/* INFINITE SMOOTH MARQUEE OF 6 LUXURY BOTTLE CARDS */}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
        <div className="marquee-track-slow" style={{ gap: '28px', padding: '20px 0' }}>
          {INFINITE_PERFUMES.map((perfume, idx) => (
            <div
              key={`${perfume.id}-${idx}`}
              className="glass-panel glass-panel-hover"
              style={{
                width: '320px',
                padding: '24px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                flexShrink: 0,
                borderColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              }}
              onClick={() => {
                luxuryAudio.playGlassClink();
                if (onSelectQuickView) onSelectQuickView(perfume);
              }}
            >
              {/* Top Tag & Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '0.65rem',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#f3e5ab',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                  }}
                >
                  {perfume.tag}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d4af37', fontSize: '0.75rem' }}>
                  <Star size={12} fill="#d4af37" />
                  <span>{perfume.rating}</span>
                </div>
              </div>

              {/* Real Photorealistic Bottle Visual */}
              <div
                style={{
                  height: '260px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '18px',
                  background: '#040406',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <img
                  src={perfume.image}
                  alt={perfume.fullName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(10, 10, 14, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    color: '#f3e5ab',
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  <Eye size={12} />
                  <span>Inspect 3D</span>
                </div>
              </div>

              {/* Details & Actions */}
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 500, marginBottom: '4px' }}>
                  {perfume.fullName}
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#a1a1aa', marginBottom: '14px', lineHeight: 1.5 }}>
                  {perfume.tagline}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginBottom: '14px' }}>
                  <span className="font-sans" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f3e5ab' }}>
                    {perfume.price}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#71717a' }}>100ml / 3.4 oz</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      luxuryAudio.playGlassClink();
                      if (onSelectQuickView) onSelectQuickView(perfume);
                    }}
                    className="btn-luxury"
                    data-interactive="true"
                    style={{ flex: 1, padding: '9px 0', fontSize: '0.68rem' }}
                  >
                    <Eye size={13} />
                    <span>3D View</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      luxuryAudio.playGlassClink();
                      if (onAddToCart) onAddToCart(perfume);
                    }}
                    className="btn-luxury btn-luxury-solid"
                    data-interactive="true"
                    style={{ flex: 1, padding: '9px 0', fontSize: '0.68rem' }}
                  >
                    <ShoppingBag size={13} />
                    <span>Add To Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
