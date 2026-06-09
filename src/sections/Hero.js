'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, Calendar, ShieldCheck, Activity, Award, UserCheck, Stethoscope } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import Button from '@/components/UI/Button';

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonsRef = useRef(null);
  const vectorRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text reveals
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
      );

      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.6 }
      );

      // 2. Vector illustration float/fade-in
      gsap.fromTo(
        vectorRef.current,
        { opacity: 0, scale: 0.95, x: 30 },
        { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );

      // 3. Floating mini trust cards stagger
      gsap.fromTo(
        '.hero-trust-card',
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.5)',
          delay: 0.8,
        }
      );

      // 4. Subtle continuous floating motion for illustration elements
      gsap.to('.floating-medical-cross', {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'power1.easeInOut',
      });
      
      gsap.to('.floating-pulse-wave', {
        scaleX: 1.03,
        scaleY: 1.01,
        opacity: 0.9,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.easeInOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-accent-light/30 via-white to-light overflow-hidden py-16 md:py-28 border-b border-primary/5"
    >
      {/* Soft hospital theme backgrounds (blur gradients) */}
      <div className="absolute top-1/4 left-10 h-80 w-80 rounded-full bg-primary-light/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-accent-light/40 blur-3xl pointer-events-none" />

      {/* Grid Pattern overlays for medical diagnostic theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e05_1px,transparent_1px),linear-gradient(to_bottom,#0f766e05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography and Action Buttons */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/10 shadow-sm text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Certified Family Healthcare Practitioner</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-accent leading-[1.15]"
            >
              Your Family&apos;s <span className="text-primary-light">Trusted</span> <br />
              Healthcare Partner
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-sm sm:text-base text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Get qualified diagnosis and comprehensive care under <strong className="text-accent">Dr. Mohammad Shoeb Shaikh (B.A.M.S.)</strong>. We specialize in fever management, metabolic monitoring, pediatric consulting, and personalized trauma dressings.
            </p>

            {/* Action Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/appointment" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 shadow-lg shadow-primary/10">
                  <Calendar className="h-4.5 w-4.5" />
                  <span>Book Appointment</span>
                </Button>
              </Link>

              <a href="tel:7021096008" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 border border-slate-200">
                  <Phone className="h-4.5 w-4.5 text-primary" />
                  <span>Call: 7021096008</span>
                </Button>
              </a>
            </div>

            {/* Medical Highlights Grid */}
            <div
              ref={cardsRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 max-w-md sm:max-w-lg mx-auto lg:mx-0"
            >
              <div className="hero-trust-card flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-accent-light text-primary flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent">B.A.M.S.</h4>
                  <p className="text-[10px] text-muted">General Practitioner</p>
                </div>
              </div>

              <div className="hero-trust-card flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-accent-light text-primary flex items-center justify-center shrink-0">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent">MMC Regd.</h4>
                  <p className="text-[10px] text-muted">I-84363-A-1 Status</p>
                </div>
              </div>

              <div className="hero-trust-card flex items-start gap-3 col-span-2 sm:col-span-1">
                <div className="h-9 w-9 rounded-xl bg-accent-light text-primary flex items-center justify-center shrink-0">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent">Family Care</h4>
                  <p className="text-[10px] text-muted">Aged & Pediatric Care</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Clinical Card Display */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            <div
              ref={vectorRef}
              className="relative w-72 h-72 sm:w-85 sm:h-85 lg:w-96 lg:h-96 rounded-3xl bg-white p-6 shadow-xl border border-primary/15 flex items-center justify-center overflow-hidden"
            >
              {/* Outer pulsing decoration ring */}
              <div className="absolute inset-[-15px] rounded-full border border-primary-light/10 animate-ping opacity-45 pointer-events-none" />

              {/* Central Vector graphic of clinical monitor */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-10"
              >
                {/* Background radar grid */}
                <circle cx="100" cy="100" r="70" stroke="#0f766e" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.25" />
                <circle cx="100" cy="100" r="90" stroke="#0f766e" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.15" />

                {/* Pulse wave (ECG Wave) */}
                <path
                  className="floating-pulse-wave"
                  d="M25 100 H70 L80 65 L90 135 L100 80 L108 115 L116 100 H175"
                  stroke="#0F766E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />

                {/* Floating Stethoscope graphic */}
                <g className="floating-medical-cross" transform="translate(100, 42)">
                  <rect x="-18" y="-18" width="36" height="36" rx="10" fill="#0F766E" filter="drop-shadow(0px 8px 16px rgba(15, 118, 110, 0.3))" />
                  <path d="M-6 0 H6 M0 -6 V6" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Cell / capsule shapes */}
                <g transform="translate(150, 75)">
                  <circle cx="0" cy="0" r="7" fill="#0F172A" opacity="0.85" />
                  <path d="M-2.5 0 H2.5 M0 -2.5 V2.5" stroke="#14B8A6" strokeWidth="1.5" />
                </g>
                <g transform="translate(45, 140)">
                  <rect x="-8" y="-12" width="16" height="24" rx="8" fill="#14B8A6" opacity="0.15" stroke="#14B8A6" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3" fill="#0F766E" />
                </g>
              </svg>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2 animate-bounce" style={{ animationDuration: '5s' }}>
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                  Doctor is Present
                </span>
              </div>

              {/* Consultation info layout */}
              <div className="absolute bottom-4 left-4 right-4 bg-accent-light/95 border border-primary-light/20 p-3 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    +
                  </div>
                  <div>
                    <p className="text-[9px] text-muted font-bold uppercase tracking-wider">Consultation Fee</p>
                    <p className="text-xs font-extrabold text-primary">Affordable Rates</p>
                  </div>
                </div>
                <div className="h-6 w-[1px] bg-primary-light/25" />
                <div className="text-right">
                  <p className="text-[9px] text-muted font-bold uppercase tracking-wider">Wait Time</p>
                  <p className="text-xs font-extrabold text-accent">Minimal Waiting</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
