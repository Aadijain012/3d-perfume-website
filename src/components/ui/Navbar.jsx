import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Volume2, VolumeX, Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { luxuryAudio } from '../../utils/audio';

export default function Navbar({ onOpenCart, cartCount = 0, onOpenSearch, onOpenScentLab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const isPlaying = luxuryAudio.toggleMute();
    setIsMuted(!isPlaying);
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'The Film', href: '#film' },
    { name: 'Fragrances', href: '#fragrances' },
    { name: 'Ingredients', href: '#essence' },
    { name: 'Scent Lab', href: '#scent-lab' },
    { name: 'About', href: '#story' },
  ];

  return (
    <>
      {/* Floating Pill Capsule Header Container */}
      <header
        style={{
          position: 'fixed',
          top: isScrolled ? '12px' : '18px',
          left: 0,
          right: 0,
          zIndex: 900,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 16px',
          pointerEvents: 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* The Sleek Floating Capsule Island */}
        <div
          className="floating-nav-pill"
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1180px',
            background: isScrolled ? 'rgba(10, 10, 14, 0.88)' : 'rgba(12, 12, 16, 0.72)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(212, 175, 55, 0.22)',
            borderRadius: '9999px',
            padding: '8px 12px 8px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.75), 0 0 20px rgba(212, 175, 55, 0.08)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Left Brand Area (Emblem Badge + VÉLORA Typography) */}
          <a
            href="#hero"
            onClick={() => luxuryAudio.playHoverTick()}
            data-interactive="true"
            style={{
              textDecoration: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(12, 12, 16, 0.9) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
              }}
            >
              <Sparkles size={15} color="#f3e5ab" />
            </div>

            <span
              className="font-display"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                letterSpacing: '0.26em',
                fontWeight: 600,
                color: '#ffffff',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
              }}
            >
              VÉLORA
            </span>
          </a>

          {/* Center Navigation Links with Smooth Pill Hover Highlights */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isHovered = hoveredLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => luxuryAudio.playHoverTick()}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  data-interactive="true"
                  style={{
                    color: isHovered ? '#f3e5ab' : '#a1a1aa',
                    background: isHovered ? 'rgba(212, 175, 55, 0.14)' : 'transparent',
                    border: `1px solid ${isHovered ? 'rgba(212, 175, 55, 0.3)' : 'transparent'}`,
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: isHovered ? 600 : 500,
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Luxury Shopping Bag Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Audio Toggle Pill */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Play Ambient Audio' : 'Mute Ambient Audio'}
              data-interactive="true"
              style={{
                background: isMuted ? 'rgba(255, 255, 255, 0.04)' : 'rgba(212, 175, 55, 0.15)',
                border: `1px solid ${isMuted ? 'rgba(255, 255, 255, 0.08)' : 'rgba(212, 175, 55, 0.4)'}`,
                color: isMuted ? '#a1a1aa' : '#f3e5ab',
                cursor: 'pointer',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Search Pill */}
            <button
              onClick={() => {
                luxuryAudio.playHoverTick();
                if (onOpenSearch) onOpenSearch();
              }}
              title="Search Collection"
              data-interactive="true"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#e4e4e7',
                cursor: 'pointer',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <Search size={16} />
            </button>

            {/* Luxury Bag Pill Button (Matching Pill Button in Reference Image) */}
            <button
              onClick={() => {
                luxuryAudio.playGlassClink();
                if (onOpenCart) onOpenCart();
              }}
              title="Shopping Bag"
              data-interactive="true"
              className="btn-luxury-solid"
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                fontWeight: 700,
                border: '1px solid #f3e5ab',
              }}
            >
              <ShoppingBag size={14} />
              <span>BAG ({cartCount})</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                luxuryAudio.playHoverTick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              data-interactive="true"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            style={{
              position: 'fixed',
              top: '76px',
              left: '16px',
              right: '16px',
              background: 'rgba(10, 10, 14, 0.98)',
              backdropFilter: 'blur(32px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '24px',
              padding: '24px',
              zIndex: 890,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  luxuryAudio.playHoverTick();
                  setMobileMenuOpen(false);
                }}
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{link.name}</span>
                <ArrowRight size={14} color="#d4af37" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 959px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
