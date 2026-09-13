import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 900);
          }, 400);
          return 100;
        }
        const diff = Math.random() * 15 + 8;
        return Math.min(prev + Math.floor(diff), 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: '#070709',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Gold Glow in Background */}
          <div
            style={{
              position: 'absolute',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(7, 7, 9, 0) 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          {/* Luxury Geometric Diamond Flask Outline Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              width: '84px',
              height: '84px',
              position: 'relative',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Outer Diamond */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '64px',
                height: '64px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                transform: 'rotate(45deg)',
              }}
            />
            {/* Inner Glowing Core */}
            <motion.div
              animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#d4af37',
                borderRadius: '50%',
                boxShadow: '0 0 25px #d4af37, 0 0 45px rgba(243, 229, 171, 0.8)',
              }}
            />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display"
            style={{
              fontSize: '2.4rem',
              letterSpacing: '0.35em',
              marginBottom: '8px',
              color: '#fcfcfd',
              textShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
            }}
          >
            VÉLORA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              color: '#d4af37',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Haute Parfumerie · Paris
          </motion.p>

          {/* Progress Bar Container */}
          <div
            style={{
              width: '240px',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #aa8010 0%, #f3e5ab 50%, #d4af37 100%)',
                boxShadow: '0 0 12px #d4af37',
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>

          {/* Percentage Counter */}
          <span
            className="font-sans"
            style={{
              fontSize: '0.75rem',
              color: '#a1a1aa',
              letterSpacing: '0.25em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
