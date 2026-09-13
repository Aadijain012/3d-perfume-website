import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { luxuryAudio } from '../../utils/audio';

// Clean SVG Social Icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const XTwitterIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);

export default function FooterSection({ onExplore }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    luxuryAudio.playGlassClink();
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#d4af37', '#f3e5ab'],
    });
  };

  return (
    <footer
      id="story"
      style={{
        position: 'relative',
        backgroundColor: '#050507',
        color: '#fff',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Cinematic Dramatic Horizon & Mountain Silhouette Overlay */}
      <div
        className="section-padding"
        style={{
          position: 'relative',
          padding: '120px 48px 80px',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(212, 175, 55, 0.12) 0%, rgba(15, 14, 20, 0.9) 50%, #050507 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Glowing Horizon Flare */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)',
            boxShadow: '0 0 30px #d4af37, 0 0 60px rgba(212, 175, 55, 0.6)',
          }}
        />

        <div style={{ maxWidth: '800px', margin: '0 auto', zIndex: 2 }}>
          <span
            className="font-display"
            style={{
              fontSize: '1rem',
              letterSpacing: '0.4em',
              color: '#d4af37',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '20px',
            }}
          >
            VÉLORA
          </span>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.3rem, 5.5vw, 4.8rem)',
              lineHeight: 1.1,
              fontWeight: 400,
              marginBottom: '24px',
              color: '#ffffff',
            }}
          >
            More Than a Fragrance. <br />
            <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>
              It's You.
            </span>
          </h2>

          <p
            className="font-sans"
            style={{
              fontSize: 'clamp(0.88rem, 2vw, 1rem)',
              color: '#a1a1aa',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: '0 auto 36px',
              fontWeight: 300,
            }}
          >
            Rooted in French haute parfumerie tradition, empowered by bespoke modern alchemy.
          </p>

          <a
            href="#hero"
            className="btn-luxury btn-luxury-solid"
            data-interactive="true"
            onClick={() => {
              luxuryAudio.playHoverTick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Explore Collection</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Newsletter & Boutique Locations Section */}
      <div
        className="section-padding"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '60px 48px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '36px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Newsletter Signup */}
        <div>
          <h4 className="font-display" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: '#f3e5ab', marginBottom: '12px' }}>
            THE VÉLORA CIRCLE
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '18px', lineHeight: 1.6 }}>
            Receive private allocations, sensory previews, and invitations to intimate salon tastings.
          </p>

          {subscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.85rem' }}>
              <Check size={16} />
              <span>Welcome to the private circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn-luxury btn-luxury-solid"
                style={{ padding: '12px 24px', borderRadius: '9999px' }}
                data-interactive="true"
              >
                Join
              </button>
            </form>
          )}
        </div>

        {/* Maison Boutiques */}
        <div>
          <h4 className="font-display" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: '#f3e5ab', marginBottom: '12px' }}>
            MAISON BOUTIQUES
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#a1a1aa' }}>
            <div><strong style={{ color: '#fff' }}>Paris:</strong> 28 Place Vendôme, 75001</div>
            <div><strong style={{ color: '#fff' }}>New York:</strong> 740 Madison Ave, NY 10065</div>
            <div><strong style={{ color: '#fff' }}>London:</strong> 14 Old Bond Street, W1S 4PP</div>
            <div><strong style={{ color: '#fff' }}>Tokyo:</strong> Ginza Six 4F, Chuo-ku</div>
          </div>
        </div>

        {/* Ethical Commitment */}
        <div>
          <h4 className="font-display" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: '#f3e5ab', marginBottom: '12px' }}>
            ALCHEMICAL ETHOS
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#a1a1aa', lineHeight: 1.6 }}>
            100% sustainably cultivated, cruelty-free, bottled in recyclable lead-free crystal with solar-powered distillation.
          </p>
        </div>
      </div>

      {/* Copyright & Social Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '28px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: '#71717a' }}>
          © 2026 VÉLORA. All rights reserved.
        </span>

        {/* Social Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {[
            { icon: InstagramIcon, href: '#', label: 'Instagram' },
            { icon: XTwitterIcon, href: '#', label: 'X (Twitter)' },
            { icon: FacebookIcon, href: '#', label: 'Facebook' },
            { icon: YoutubeIcon, href: '#', label: 'YouTube' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              title={label}
              data-interactive="true"
              style={{
                color: '#a1a1aa',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4af37')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#a1a1aa')}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
