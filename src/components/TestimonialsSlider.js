'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const TESTIMONIALS = [
  {
    name: 'Rajesh Patil',
    role: 'Local Resident',
    location: 'Ambernath West',
    initials: 'RP',
    color: 'from-teal-500 to-teal-600',
    rating: 5,
    text: "Dr. Shoeb Shaikh is an excellent doctor. He patiently listens to all your concerns and diagnoses carefully. His fever treatment helped me recover in just two days. Highly professional and caring physician.",
  },
  {
    name: 'Zoya Khan',
    role: 'Family Medicine Patient',
    location: 'Ulhasnagar',
    initials: 'ZK',
    color: 'from-emerald-500 to-emerald-600',
    rating: 5,
    text: "Zainab Clinic is our family&apos;s trusted healthcare partner. Dr. Shoeb is extremely polite and provides personalized treatment. We manage my father&apos;s diabetes and BP here regularly — very satisfied.",
  },
  {
    name: 'Amit Sharma',
    role: 'Emergency Care Patient',
    location: 'Ambernath',
    initials: 'AS',
    color: 'from-cyan-500 to-cyan-600',
    rating: 5,
    text: "Visited for nebulization and wound dressing after a minor injury. The procedure was extremely clean, professional, and painless. The clinic maintains top-notch hygiene standards. Highly recommended.",
  },
  {
    name: 'Priya Nair',
    role: 'Preventive Care Patient',
    location: 'Badlapur',
    initials: 'PN',
    color: 'from-indigo-500 to-indigo-600',
    rating: 5,
    text: "Consultations are highly affordable and the doctor actually spends time explaining the treatment plan. Truly a patient-first approach. Easily the best clinic in Ambernath West area.",
  },
];

export default function TestimonialsSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const cardRef     = useRef(null);
  const tabsRef     = useRef(null);
  const statsRef    = useRef(null);
  const autoPlayRef = useRef(null);

  /* ── Slide transition ── */
  const goTo = (idx) => {
    if (!cardRef.current) { setActiveIdx(idx); return; }
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setActiveIdx(idx);
      return;
    }
    gsap.to(cardRef.current, {
      opacity: 0, y: 14, scale: 0.97,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIdx(idx);
        gsap.to(cardRef.current, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.42,
          ease: 'power3.out',
        });
      },
    });
  };

  const slidePrev = () => goTo(activeIdx === 0 ? TESTIMONIALS.length - 1 : activeIdx - 1);
  const slideNext = () => goTo(activeIdx === TESTIMONIALS.length - 1 ? 0 : activeIdx + 1);

  /* Auto-advance */
  useEffect(() => {
    autoPlayRef.current = setInterval(slideNext, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [activeIdx]);

  /* ── Scroll-triggered intro animations ── */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return;
    }
    const ctx = gsap.context(() => {

      /* Header reveal */
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
      headerTl
        .fromTo(headerRef.current.querySelector('.testi-badge'),
          { opacity: 0, scale: 0.85, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)' })
        .fromTo(headerRef.current.querySelector('h2'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.2')
        .fromTo(headerRef.current.querySelector('p'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');

      /* Sidebar tabs stagger */
      gsap.fromTo(
        tabsRef.current?.children ?? [],
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* Main card entrance */
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* Stats widget */
      gsap.fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = TESTIMONIALS[activeIdx];

  return (
    <section ref={sectionRef} className="relative bg-[#0F172A] py-24 md:py-32 overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-900/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal-800/20 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="testi-badge inline-flex items-center gap-2 bg-teal-900/60 border border-teal-700/40 text-teal-300 text-xs px-4 py-1.5 rounded-full uppercase tracking-widest font-bold mb-4">
            <Star className="h-3 w-3 fill-teal-400 text-teal-400" />
            Patient Reviews
          </span>
          <h2 className="text-3xl md:text-[2.6rem] font-extrabold text-white leading-tight">
            What Our <span className="text-teal-400">Patients Say</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Real experiences from real patients — trusted healthcare, proven results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">

          {/* Left: Patient tab list */}
          <div ref={tabsRef} className="hidden lg:flex flex-col gap-3 col-span-1">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                  i === activeIdx
                    ? 'bg-teal-700/30 border-teal-600/40 text-white'
                    : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-bold truncate ${i === activeIdx ? 'text-white' : 'text-slate-300'}`}>{t.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{t.role}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Center: Active testimonial card */}
          <div className="col-span-1 lg:col-span-3 flex flex-col">
            <div ref={cardRef} className="relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
              <Quote className="absolute top-6 right-8 h-16 w-16 text-teal-700/20 fill-teal-700/20" />

              <div className="flex gap-1 mb-6">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-slate-200 text-base sm:text-lg leading-relaxed italic mb-8">
                &ldquo;{active.text}&rdquo;
              </blockquote>

              <div className="h-px bg-gradient-to-r from-teal-500/30 via-teal-400/20 to-transparent mb-6" />

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${active.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {active.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm font-heading">{active.name}</h3>
                    <p className="text-[11px] text-teal-400 font-semibold tracking-wide uppercase">{active.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-teal-600" />
                  <span>{active.location}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="py-3 px-1.5 flex items-center focus:outline-none"
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 block ${
                        i === activeIdx ? 'w-8 bg-teal-400' : 'w-2 bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={slidePrev}
                  className="h-11 w-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-teal-700/30 hover:text-white hover:border-teal-600/40 active:scale-95 transition-all duration-200"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={slideNext}
                  className="h-11 w-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-teal-700/30 hover:text-white hover:border-teal-600/40 active:scale-95 transition-all duration-200"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Rating widget */}
          <div ref={statsRef} className="hidden lg:flex flex-col items-center justify-center col-span-1 gap-6">
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 w-full text-center">
              <div className="text-5xl font-extrabold text-white mb-1">5.0</div>
              <div className="flex justify-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500">Average Rating</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-2xl font-bold text-teal-400">100%</div>
                <p className="text-xs text-slate-500 mt-0.5">Would Recommend</p>
              </div>
            </div>
            <div className="bg-teal-800/30 border border-teal-700/30 rounded-2xl p-4 w-full text-center">
              <div className="text-lg font-bold text-teal-300">Verified</div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                All reviews from real clinic patients.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
