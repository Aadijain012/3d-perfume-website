import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Volume2, VolumeX, Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { luxuryAudio } from '../../utils/audio';

export default function Navbar({ onOpenCart, cartCount = 0, onOpenSearch, onOpenScentLab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Scent Lab', href: '#scent-lab', isSpecial: true },
    { name: 'About', href: '#story' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: isScrolled ? '16px 24px' : '22px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isScrolled ? 'rgba(7, 7, 9, 0.55)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => luxuryAudio.playHoverTick()}
          style={{
            textDecoration: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: 'clamp(1.3rem, 4vw, 1.65rem)',
              letterSpacing: '0.28em',
              fontWeight: 400,
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            VÉLORA
          </span>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => luxuryAudio.playHoverTick()}
              style={{
                color: link.isSpecial ? '#f3e5ab' : '#d4d4d8',
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: link.isSpecial ? 600 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                padding: '6px 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.textShadow = '0 0 15px rgba(212, 175, 55, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = link.isSpecial ? '#f3e5ab' : '#d4d4d8';
                e.currentTarget.style.textShadow = '0 2px 10px rgba(0,0,0,0.8)';
              }}
            >
              {link.isSpecial && <Sparkles size={12} color="#d4af37" />}
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Icons & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Audio Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Play Ambient Audio' : 'Mute Ambient Audio'}
            data-interactive="true"
            style={{
              background: 'none',
              border: 'none',
              color: isMuted ? '#a1a1aa' : '#d4af37',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px',
              transition: 'all 0.3s ease',
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Search */}
          <button
            onClick={() => {
              luxuryAudio.playHoverTick();
              if (onOpenSearch) onOpenSearch();
            }}
            title="Search Collection"
            data-interactive="true"
            style={{
              background: 'none',
              border: 'none',
              color: '#e4e4e7',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <Search size={18} />
          </button>

          {/* Luxury Bag Button */}
          <button
            onClick={() => {
              luxuryAudio.playGlassClink();
              if (onOpenCart) onOpenCart();
            }}
            title="Shopping Bag"
            data-interactive="true"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: '#f3e5ab',
              cursor: 'pointer',
              padding: '6px 14px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ShoppingBag size={15} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{cartCount}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              luxuryAudio.playHoverTick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            data-interactive="true"
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(9, 9, 13, 0.98)',
              backdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
              padding: '24px',
              zIndex: 890,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
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
                  color: link.isSpecial ? '#f3e5ab' : '#fff',
                  fontSize: '0.95rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
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
        @media (min-width: 920px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 919px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
