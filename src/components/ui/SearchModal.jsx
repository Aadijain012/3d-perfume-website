import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { luxuryAudio } from '../../utils/audio';

const FRAGRANCE_DATABASE = [
  { id: 'noir', name: 'VÉLORA NOIR', mood: 'Mysterious, Sensual & Smoky', notes: 'Black Pepper, Rose Noir, Smoked Oud, Amber', price: '$340', tag: 'Bestseller' },
  { id: 'santal', name: 'VÉLORA SANTAL', mood: 'Warm, Creamy & Grounded', notes: 'Cardamom, Iris, Sandalwood, Cedarwood', price: '$295', tag: 'Iconic' },
  { id: 'rose', name: 'VÉLORA ROSE', mood: 'Ethereal, Luminous & Velvet', notes: 'Damask Rose, Pink Pepper, Cashmere Wood', price: '$280', tag: 'Romantic' },
  { id: 'oud', name: 'VÉLORA OUD', mood: 'Regal, Dark & Intoxicating', notes: 'Royal Agarwood, Saffron, Leather, Incense', price: '$360', tag: 'Extrait de Parfum' },
  { id: 'custom', name: 'BESPOKE SCENT LAB', mood: 'Craft Your Signature Fragrance', notes: 'Tailored Top, Heart & Base formulation', price: 'Custom', tag: 'Interactive' },
];

export default function SearchModal({ isOpen, onClose, onSelectPerfume }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = FRAGRANCE_DATABASE.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.notes.toLowerCase().includes(query.toLowerCase()) ||
    item.mood.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 950,
          background: 'rgba(5, 5, 8, 0.88)',
          backdropFilter: 'blur(28px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '10vh',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          style={{
            width: '100%',
            maxWidth: '640px',
            background: 'rgba(14, 14, 20, 0.95)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
            <Search size={22} color="#d4af37" />
            <input
              type="text"
              autoFocus
              placeholder="Search by scent, note (Oud, Rose, Bergamot) or mood..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '1.1rem',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#71717a',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div style={{ display: 'flex', gap: '8px', margin: '16px 0 20px', flexWrap: 'wrap' }}>
            {['Oud', 'Rose', 'Sandalwood', 'Bergamot', 'Jasmine', 'Vanilla'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  luxuryAudio.playHoverTick();
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  color: '#a1a1aa',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#a1a1aa';
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto' }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  luxuryAudio.playGlassClink();
                  if (onSelectPerfume) onSelectPerfume(item.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateX(0px)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="font-serif" style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 600 }}>{item.name}</span>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', padding: '2px 8px', borderRadius: '4px' }}>{item.tag}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>{item.notes}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="font-sans" style={{ color: '#f3e5ab', fontSize: '0.85rem', fontWeight: 600 }}>{item.price}</span>
                  <ArrowRight size={16} color="#d4af37" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
