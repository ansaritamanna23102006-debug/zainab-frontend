'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Stethoscope, Flame, Activity, Heart, Wind, FlameKindling, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import Button from '@/components/UI/Button';

const SERVICES_DATA = [
  { icon: Stethoscope, title: 'General Consultation', desc: 'Thorough diagnosis and medication charting for acute or chronic symptoms.', tag: 'Primary Care' },
  { icon: Flame,       title: 'Fever Treatment',      desc: 'Targeted diagnostics and infection relief for seasonal and bacterial fevers.', tag: 'Acute Care' },
  { icon: Activity,    title: 'Diabetes Monitoring',  desc: 'Regular blood sugar evaluations, dose optimizations, and custom diet charts.', tag: 'Chronic Care' },
  { icon: Heart,       title: 'BP Monitoring',        desc: 'Active hypertension checking, cardiac safety monitoring, and medication audits.', tag: 'Heart Health' },
  { icon: Wind,        title: 'Nebulization',         desc: 'Rapid breathing aerosols for asthma spasms, chest congestions, and bronchitis.', tag: 'Respiratory' },
  { icon: FlameKindling, title: 'Wound Dressing',     desc: 'Sterile surgical dressings, debridements, minor injuries care, and suture support.', tag: 'Trauma Care' },
  { icon: Users,       title: 'Family Healthcare',    desc: 'Pediatric checks and senior diagnostics managing all family medical histories.', tag: 'General Wellness' },
  { icon: ShieldCheck, title: 'Preventive Care',      desc: 'Custom medical screenings, vital checks, and disease prevention advice.', tag: 'Screenings' },
];

export default function ServicesHome() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const ctaRef      = useRef(null);
  const gridRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Header + CTA reveal ── */
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Badge label
      headerTl.fromTo(
        headerRef.current.querySelector('.services-badge'),
        { opacity: 0, y: 16, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.8)' }
      );
      // Heading
      headerTl.fromTo(
        headerRef.current.querySelector('h2'),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.2'
      );
      // Subtext
      headerTl.fromTo(
        headerRef.current.querySelector('p'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35'
      );
      // CTA button
      headerTl.fromTo(
        ctaRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4'
      );

      /* ── 2. Service cards stagger ── */
      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          stagger: { each: 0.09, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-b border-primary/5">
      <div className="absolute top-1/3 left-0 w-32 h-32 bg-primary-light/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-slate-200/50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div ref={headerRef} className="space-y-4 max-w-xl text-center md:text-left">
            <div className="services-badge inline-block bg-accent-light border border-primary-light/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
              Specialized Care
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-accent leading-tight">
              Our Primary Clinical Specializations
            </h2>
            <p className="text-muted text-sm md:text-base font-sans">
              Explore professional healthcare treatments and diagnostics managed daily under Dr. Shoeb Shaikh.
            </p>
          </div>
          <div ref={ctaRef} className="shrink-0 flex justify-center">
            <Link href="/services">
              <Button variant="outline" className="flex items-center gap-2 border-primary/20 hover:border-primary">
                <span>View Detailed Procedures</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md hover:shadow-primary/5 hover:border-primary-light/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-10 w-10 rounded-xl bg-accent-light text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-bold text-primary bg-accent-light px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-accent font-heading mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-6 font-sans">{service.desc}</p>
                </div>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group-hover:underline">
                  <span>Read clinical procedure</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
