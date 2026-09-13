import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Gift, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { luxuryAudio } from '../../utils/audio';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {
  const [giftBox, setGiftBox] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  // Calculate total
  const subtotal = cartItems.reduce((acc, item) => {
    const p = parseFloat(item.price.replace('$', '')) || 300;
    return acc + p;
  }, 0);

  const handleCheckout = () => {
    luxuryAudio.playGlassClink();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f3e5ab', '#e0a899', '#ffffff'],
      });
      setTimeout(() => {
        onClearCart();
      }, 4000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 990,
          background: 'rgba(5, 5, 8, 0.75)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            maxWidth: 'min(460px, 100vw)',
            height: '100%',
            background: 'rgba(12, 12, 16, 0.98)',
            borderLeft: '1px solid rgba(212, 175, 55, 0.25)',
            boxShadow: '-20px 0 60px rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 20px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={20} color="#d4af37" />
              <h2 className="font-display" style={{ fontSize: '1.2rem', letterSpacing: '0.15em', color: '#fff' }}>
                SHOPPING BAG ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              data-interactive="true"
              style={{
                background: 'none',
                border: 'none',
                color: '#a1a1aa',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Body content */}
          {orderComplete ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
              <CheckCircle size={56} color="#d4af37" />
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff' }}>Maison VÉLORA</h3>
              <p style={{ fontSize: '0.85rem', color: '#f3e5ab', letterSpacing: '0.1em' }}>
                Your order has been consecrated. A courier dispatch email has been sent.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="btn-luxury btn-luxury-solid"
                style={{ marginTop: '20px' }}
              >
                Continue Exploring
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
              <ShoppingBag size={48} color="#71717a" strokeWidth={1} />
              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff' }}>Your Bag is Empty</h3>
              <p style={{ fontSize: '0.8rem', color: '#71717a', maxWidth: '240px' }}>
                Discover our signature flacons or craft a custom blend in the Scent Lab.
              </p>
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 0' }}>
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(12,12,16,0.9) 100%)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                      }}
                    >
                      {item.image || '✨'}
                    </div>

                    <div>
                      <div className="font-serif" style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 600 }}>
                        {item.fullName || item.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#d4af37' }}>
                        {item.isBespoke ? `ENGRAVED: "${item.engraving}"` : item.subtitle || '100ml Eau De Parfum'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span className="font-sans" style={{ color: '#f3e5ab', fontWeight: 700, fontSize: '0.95rem' }}>
                      {item.price}
                    </span>
                    <button
                      onClick={() => {
                        luxuryAudio.playHoverTick();
                        if (onRemoveItem) onRemoveItem(idx);
                      }}
                      style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Complimentary Gift Box option */}
              <div
                onClick={() => setGiftBox(!giftBox)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                <Gift size={18} color="#d4af37" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>Complimentary Luxury Gift Box</div>
                  <div style={{ fontSize: '0.68rem', color: '#a1a1aa' }}>Hand-tied gold silk ribbon & wax seal</div>
                </div>
                <input type="checkbox" checked={giftBox} readOnly style={{ accentColor: '#d4af37' }} />
              </div>
            </div>
          )}

          {/* Footer Subtotal & Checkout */}
          {!orderComplete && cartItems.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#a1a1aa', letterSpacing: '0.1em' }}>COMPLIMENTARY SHIPPING</span>
                <span style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 600 }}>EXPRESS WORLDWIDE</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-display" style={{ fontSize: '1rem', color: '#fff', letterSpacing: '0.15em' }}>
                  SUBTOTAL
                </span>
                <span className="font-sans" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f3e5ab' }}>
                  ${subtotal}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-luxury btn-luxury-solid"
                data-interactive="true"
                style={{ width: '100%', padding: '16px 0' }}
              >
                <span>{isCheckingOut ? 'Consecrating Order...' : 'Proceed To Checkout'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
