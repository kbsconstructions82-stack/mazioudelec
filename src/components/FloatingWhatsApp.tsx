import React, { useState, useEffect, useRef } from 'react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '33766072094',
  defaultMessage = "Bonjour MAZIOUDELEC, je vous contacte au sujet de travaux électriques à mon domicile.",
}) => {
  const [pos, setPos] = useState({ bottom: 24, right: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, bottom: 24, right: 24 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem('mazioudelec_wa_pos_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.bottom === 'number' && typeof parsed.right === 'number') {
          // Validate position is within screen bounds
          const maxBottom = window.innerHeight - 80;
          const maxRight = window.innerWidth - 80;
          setPos({ 
            bottom: Math.min(Math.max(20, parsed.bottom), maxBottom), 
            right: Math.min(Math.max(20, parsed.right), maxRight) 
          });
        }
      } catch (e) {}
    }
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: clientX, y: clientY, bottom: pos.bottom, right: pos.right };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    handleDragStart(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = dragStartRef.current.x - e.clientX;
      const deltaY = dragStartRef.current.y - e.clientY;
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) hasMovedRef.current = true;
      
      const newBottom = Math.max(20, Math.min(window.innerHeight - 80, dragStartRef.current.bottom + deltaY));
      const newRight = Math.max(20, Math.min(window.innerWidth - 80, dragStartRef.current.right + deltaX));
      
      setPos({ bottom: newBottom, right: newRight });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      localStorage.setItem('mazioudelec_wa_pos_v2', JSON.stringify(pos));
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = dragStartRef.current.x - e.touches[0].clientX;
        const deltaY = dragStartRef.current.y - e.touches[0].clientY;
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) hasMovedRef.current = true;
        
        const newBottom = Math.max(20, Math.min(window.innerHeight - 80, dragStartRef.current.bottom + deltaY));
        const newRight = Math.max(20, Math.min(window.innerWidth - 80, dragStartRef.current.right + deltaX));
        
        setPos({ bottom: newBottom, right: newRight });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging, pos]);

  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleButtonClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      hasMovedRef.current = false;
    }
  };

  return (
    <div
      style={{ bottom: `${pos.bottom}px`, right: `${pos.right}px` }}
      className={`fixed z-50 flex flex-col items-center justify-center select-none ${
        isDragging ? 'transition-none cursor-grabbing' : 'transition-[bottom,right] duration-100 ease-out cursor-grab'
      }`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      title="Glissez pour déplacer le bouton"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        onClick={handleButtonClick}
        aria-label="Contacter MAZIOUDELEC par WhatsApp"
        className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0052D4] via-[#0082FF] to-[#00D2FF] text-white shadow-[0_0_20px_rgba(0,210,255,0.65),0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_32px_rgba(0,210,255,0.95),0_0_50px_rgba(0,130,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 ${
          isDragging ? 'scale-105' : ''
        }`}
      >
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm pointer-events-none"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
};
