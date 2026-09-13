import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor for non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setIsVisible(true);
      setDotPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Magnetic and interactive element listeners
    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, input, [data-interactive], [role="button"]');
      if (target) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('button, a, input, [data-interactive], [role="button"]');
      if (target) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Smooth lerp follower loop for the luxury gold aura ring
  useEffect(() => {
    let animationFrameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const follow = () => {
      setPos((prev) => ({
        x: lerp(prev.x, dotPos.x, 0.18),
        y: lerp(prev.y, dotPos.y, 0.18),
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dotPos]);

  if (!isVisible) return null;

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999 }}>
      {/* Central crisp gold pinpoint */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isClicking ? '6px' : '4px',
          height: isClicking ? '6px' : '4px',
          borderRadius: '50%',
          backgroundColor: '#f3e5ab',
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`,
          boxShadow: '0 0 10px #d4af37, 0 0 20px rgba(212, 175, 55, 0.8)',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
      {/* Outer fluid luxury aura ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : isClicking ? '28px' : '36px',
          height: isHovered ? '48px' : isClicking ? '28px' : '36px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid rgba(243, 229, 171, 0.9)' : '1px solid rgba(212, 175, 55, 0.45)',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.12)' : 'rgba(212, 175, 55, 0.03)',
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          boxShadow: isHovered ? '0 0 25px rgba(212, 175, 55, 0.4)' : 'none',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      />
    </div>
  );
}
