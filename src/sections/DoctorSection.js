'use client';

import React, { useEffect, useRef } from 'react';
import { Award, ShieldCheck, Heart, UserCheck, CheckCircle2 } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import Button from '@/components/UI/Button';
import Link from 'next/link';

const STATS = [
  { id: 'happy-patients', label: 'Happy Patients', value: 15000, suffix: '+' },
  { id: 'years-exp', label: 'Years of Experience', value: 10, suffix: '+' },
  { id: 'consultations', label: 'Consultations', value: 25000, suffix: '+' },
];

export default function DoctorSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return;
    }
    let ctx = gsap.context(() => {
      // Animate the counters
      STATS.forEach((stat) => {
        const el = document.getElementById(stat.id);
        if (!el) return;

        const countObj = { val: 0 };
        gsap.to(countObj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          onStart: () => {
            el.innerText = '0' + stat.suffix;
          },
          onUpdate: () => {
            el.innerText = Math.floor(countObj.val).toLocaleString() + stat.suffix;
          },
        });
      });

      // Slide-up effect for doctor details
      gsap.fromTo(
        '.doctor-fade-up',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.doctor-fade-up-trigger',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden border-b border-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Clinic Profile Card */}
          <div className="lg:col-span-5 flex justify-center doctor-fade-up-trigger">
            <div className="relative w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl text-slate-800 shadow-xl border border-slate-100/80 transform hover:scale-[1.01] transition-transform duration-300">
              
              {/* Soft decorative background circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-light/50 rounded-full blur-2xl pointer-events-none" />
              
              {/* Doctor Info Row */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold font-heading text-accent leading-tight">
                    Dr. Mohammad Shoeb Shaikh
                  </p>
                  <p className="text-primary-light font-bold text-xs uppercase tracking-wider mt-0.5">
                    Lead General Physician
                  </p>
                </div>
              </div>

              {/* Clinic details list */}
              <div className="space-y-4 text-slate-600 text-sm mb-8 border-b border-slate-100 pb-8">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-light shrink-0 mt-0.5" />
                  <p>Graduated in <strong className="text-accent">B.A.M.S.</strong> (Bachelor of Ayurveda, Medicine and Surgery).</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-light shrink-0 mt-0.5" />
                  <p>Certified clinical practice registered with Maharashtra Medical Council.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-light shrink-0 mt-0.5" />
                  <p>Comprehensive expertise in metabolic disorders & infection control.</p>
                </div>
              </div>

              {/* Verification & Registration Code block */}
              <div className="flex items-center gap-3 bg-accent-light p-4 rounded-2xl border border-primary-light/10">
                <ShieldCheck className="h-5.5 w-5.5 text-primary shrink-0" />
                <div>
                  <span className="block text-[9px] text-primary font-bold uppercase tracking-widest">
                    MMC Registered & Verified
                  </span>
                  <span className="text-sm font-bold text-accent">
                    Reg. No: I-84363-A-1
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Doctor Profile & Stats grid */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="doctor-fade-up space-y-4">
              <div className="inline-block bg-accent-light border border-primary-light/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
                Clinical Excellence
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-accent leading-tight">
                Meet Your Healthcare Partner
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
                Dr. Mohammad Shoeb Shaikh is a highly dedicated and experienced B.A.M.S. physician committed to providing comprehensive healthcare. Blending traditional clinical observation with modern diagnostic workflows, he provides family medicine, fever management, metabolic monitoring, and minor trauma dressings.
              </p>
              <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
                At Zainab Clinic, the mission is strictly patient-first: taking sufficient consultation time to listen to symptoms, understand previous health charts, and prescribe optimal therapeutic courses that promote natural and rapid healing.
              </p>
            </div>

            {/* Counters stats row */}
            <div className="doctor-fade-up grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              {STATS.map((stat) => (
                <div key={stat.id} className="space-y-1">
                  <span
                    id={stat.id}
                    className="block text-2xl sm:text-4xl font-extrabold text-primary font-heading tracking-tight"
                  >
                    {stat.value.toLocaleString()}{stat.suffix}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA action buttons */}
            <div className="doctor-fade-up pt-4 flex flex-wrap gap-4">
              <Button href="/about" variant="accent" size="md" className="border border-primary-light/10 font-bold">
                View Full Profile
              </Button>
              <Button href="/appointment" variant="outline" size="md" className="font-bold">
                Book Slot
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
