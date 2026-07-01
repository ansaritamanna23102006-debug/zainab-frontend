'use client';

import React, { useEffect, useRef } from 'react';
import { Award, HeartHandshake, ShieldCheck, Users, Heart, CalendarRange, CheckCircle2 } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const CARDS_DATA = [
  {
    icon: Award,
    color: 'from-primary to-primary-hover',
    lightBg: 'bg-accent-light',
    lightText: 'text-primary',
    title: 'Experienced Doctor',
    desc: 'Led by Dr. Mohammad Shoeb Shaikh (B.A.M.S.), bringing expert Ayurvedic & clinical precision to every consultation.',
    tag: 'Qualified Practitioner',
  },
  {
    icon: HeartHandshake,
    color: 'from-primary-light to-primary-light/80',
    lightBg: 'bg-green-50',
    lightText: 'text-green-700',
    title: 'Affordable Consultation',
    desc: 'Premium diagnostics and care at cost-effective fees — making quality family healthcare accessible to all.',
    tag: 'No Hidden Costs',
  },
  {
    icon: Users,
    color: 'from-cyan-600 to-cyan-700',
    lightBg: 'bg-accent-light',
    lightText: 'text-cyan-850',
    title: 'Family Healthcare',
    desc: 'Comprehensive solutions from pediatric check-ups to geriatric monitoring — covering every stage of life.',
    tag: 'All Age Groups',
  },
  {
    icon: ShieldCheck,
    color: 'from-primary to-primary-hover',
    lightBg: 'bg-accent-light',
    lightText: 'text-primary',
    title: 'Personalized Treatment',
    desc: 'Every patient receives a customized care program tailored to their unique medical history and needs.',
    tag: 'Custom Care Plans',
  },
  {
    icon: Heart,
    color: 'from-rose-500 to-rose-600',
    lightBg: 'bg-rose-50',
    lightText: 'text-rose-700',
    title: 'Patient-First Approach',
    desc: 'Empathetic consultations where the doctor truly listens, understands your symptoms, then recommends therapy.',
    tag: 'Compassionate Care',
  },
  {
    icon: CalendarRange,
    color: 'from-indigo-500 to-indigo-600',
    lightBg: 'bg-indigo-50',
    lightText: 'text-indigo-700',
    title: 'Easy Appointment Booking',
    desc: 'Book online or connect via WhatsApp & direct call to secure your preferred consultation slot instantly.',
    tag: 'Quick & Easy',
  },
];

const STATS = [
  { value: 500, suffix: '+', label: 'Happy Patients', id: 'wcu-stat-patients' },
  { value: 5,   suffix: '+', label: 'Years Experience', id: 'wcu-stat-years'    },
  { value: 10,  suffix: '+', label: 'Services Offered', id: 'wcu-stat-services' },
  { value: 6,   suffix: '',  label: 'Days a Week',      id: 'wcu-stat-days'     },
];

export default function WhyChooseUs() {
  const sectionRef  = useRef(null);
  const badgeRef    = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef    = useRef(null);
  const gridRef     = useRef(null);
  const ctaRef      = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return;
    }
    const ctx = gsap.context(() => {

      /* ── 1. Section header reveal (badge → title → subtitle) ── */
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: badgeRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
      headerTl
        .fromTo(badgeRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
        .fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

      /* ── 2. Stats band: count-up numbers ── */
      STATS.forEach((stat) => {
        const el = document.getElementById(stat.id);
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          onStart: () => {
            el.textContent = '0' + stat.suffix;
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + stat.suffix;
          },
        });
      });

      /* Stats cards slide-up stagger */
      gsap.fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 30, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── 3. Feature cards staggered entrance ── */
      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── 4. CTA strip slide up ── */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F8FAFC] py-24 md:py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-light blur-3xl opacity-70" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-green-50/50 blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span ref={badgeRef} className="inline-flex items-center gap-2 bg-accent-light border border-primary/10 text-primary text-xs px-4 py-1.5 rounded-full uppercase tracking-widest font-bold mb-4">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Why Choose Us
          </span>
          <h2 ref={titleRef} className="text-3xl md:text-[2.6rem] font-extrabold text-[#0F172A] leading-tight tracking-tight">
            The Clinic That Puts{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Patients First</span>
              <span className="absolute bottom-1 left-0 w-full h-2 bg-accent-light -z-0 rounded" />
            </span>
          </h2>
          <p ref={subtitleRef} className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
            We combine Ayurvedic expertise with modern medicine to deliver care that is compassionate, thorough, and results-driven.
          </p>
        </div>

        {/* Trust Stats Band */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm py-5 px-3">
              <span id={stat.id} className="text-3xl font-extrabold text-primary tracking-tight">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-xs text-slate-600 font-medium mt-1 text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Feature Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS_DATA.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl border border-slate-100 p-7 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-20 h-20 rounded-br-full bg-gradient-to-br from-accent-light/50 to-transparent opacity-70 pointer-events-none" />
                <div className="relative z-10">
                  <div
                    className={`h-13 w-13 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                    style={{ width: '52px', height: '52px' }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${card.lightBg} ${card.lightText}`}>
                    {card.tag}
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A] font-heading mb-2 group-hover:text-primary transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-primary to-primary-light rounded-full group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div
          ref={ctaRef}
          className="mt-16 bg-gradient-to-r from-accent to-accent-hover rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-accent/20"
        >
          <div className="text-white text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-1">Ready to Get Started?</p>
            <h3 className="text-xl md:text-2xl font-extrabold leading-tight">Book Your Consultation Today</h3>
            <p className="text-white/90 text-sm mt-1 font-sans">Mon–Sat · 9 AM–1 PM &amp; 5 PM–9 PM</p>
          </div>
          <a
            href="/appointment"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-7 py-3 rounded-xl hover:bg-accent-light active:scale-95 transition-all duration-200 shadow-md"
          >
            <CalendarRange className="h-4 w-4" />
            Book Appointment
          </a>
        </div>

      </div>
    </section>
  );
}
