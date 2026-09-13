import React, { useState } from 'react';
import Preloader from './components/ui/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/ui/Navbar';
import SearchModal from './components/ui/SearchModal';
import QuickViewModal from './components/ui/QuickViewModal';
import CartDrawer from './components/ui/CartDrawer';
import HeroSection from './components/sections/HeroSection';
import FilmShowcaseSection from './components/sections/FilmShowcaseSection';
import EssenceSection from './components/sections/EssenceSection';
import FragranceNotesSection from './components/sections/FragranceNotesSection';
import BuildYourScentSection from './components/sections/BuildYourScentSection';
import SignatureCollectionSection, { SIGNATURE_PERFUMES } from './components/sections/SignatureCollectionSection';
import FooterSection from './components/sections/FooterSection';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([
    {
      id: 'noir-init',
      name: 'VÉLORA NOIR',
      fullName: 'VÉLORA NOIR',
      price: '$340',
      subtitle: 'Eau De Parfum · 100ml',
      image: '✨',
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewPerfume, setQuickViewPerfume] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectPerfumeFromSearch = (id) => {
    const found = SIGNATURE_PERFUMES.find((p) => p.id === id);
    if (found) {
      setQuickViewPerfume(found);
    } else {
      const el = document.getElementById(id === 'custom' ? 'scent-lab' : 'fragrances');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="velora-root" style={{ minHeight: '100vh', backgroundColor: '#070709', color: '#fff' }}>
      {/* 1. Custom Gold Magnetic Cursor */}
      <CustomCursor />

      {/* 2. Loading Screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 3. Luxury Navigation Bar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenScentLab={() => {
          const el = document.getElementById('scent-lab');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPerfume={handleSelectPerfumeFromSearch}
      />

      {/* 5. 3D Quick View Inspection Modal */}
      <QuickViewModal
        perfume={quickViewPerfume}
        isOpen={Boolean(quickViewPerfume)}
        onClose={() => setQuickViewPerfume(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Luxury Glass Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <main>
        {/* 7. Hero Section with Video + 3D Mode Switcher */}
        <HeroSection
          onExplore={() => {
            const el = document.getElementById('film');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onAddToCart={handleAddToCart}
        />

        {/* 8. Dedicated Cinema Film Showcase Section (Your Google Drive Video) */}
        <FilmShowcaseSection />

        {/* 9. Essence: Nature's Finest Ingredients */}
        <EssenceSection />

        {/* 10. Fragrance Notes: A Journey in Three Notes */}
        <FragranceNotesSection
          onOpenScentLab={() => {
            const el = document.getElementById('scent-lab');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 11. Interactive "Build Your Scent" Scent Lab */}
        <BuildYourScentSection onAddToCart={handleAddToCart} />

        {/* 12. Our Collection: Signature Fragrances */}
        <SignatureCollectionSection
          onSelectQuickView={(perfume) => setQuickViewPerfume(perfume)}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* 13. Grand Finale Story & Footer */}
      <FooterSection
        onExplore={() => {
          const el = document.getElementById('fragrances');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
