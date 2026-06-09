'use client';

import React, { useEffect, useRef } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function FloatingActions() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Subtle entry animation for floating buttons
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, scale: 0.5, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 1.5,
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-auto"
    >
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917021096008?text=Hello%20Zainab%20Clinic%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-emerald-600 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-white text-emerald-500" />
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:7021096008"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-primary-hover active:scale-95"
        aria-label="Call Zainab Clinic"
      >
        <Phone className="h-6 w-6 fill-white text-primary" />
      </a>
    </div>
  );
}
