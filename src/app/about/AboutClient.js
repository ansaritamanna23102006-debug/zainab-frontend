'use client';

import React from 'react';
import { ShieldCheck, Heart, Award, Target, Eye, Stethoscope, Compass } from 'lucide-react';
import useGsapAnimation from '@/hooks/useGsapAnimation';

const TIMELINE_EVENTS = [
  {
    year: '2015',
    title: 'B.A.M.S. Graduation',
    desc: 'Completed B.A.M.S. medical training, establishing a strong clinical base in Ayurveda and modern therapeutics.',
  },
  {
    year: '2016',
    title: 'Registration & Establishment',
    desc: 'Registered with the Medical Council (Reg No: I-84363-A-1) and officially launched Zainab Clinic in Ambernath West.',
  },
  {
    year: '2020',
    title: 'Serving the Community',
    desc: 'Maintained continuous patient-first clinical services during the health crises, serving thousands of local families.',
  },
  {
    year: '2023',
    title: '15,000+ Patient Milestones',
    desc: 'Achieved a major milestone of diagnosing and successfully treating over 15,000 unique patients with outstanding recovery records.',
  },
  {
    year: '2026',
    title: 'Premium Digital Clinic Services',
    desc: 'Expanded the clinic infrastructure and integrated digital appointment scheduling to reduce patient waiting queues.',
  },
];

export default function AboutClient() {
  const headerRef = useGsapAnimation({ animationType: 'fade-up', y: 30 });
  const storyRef = useGsapAnimation({ animationType: 'fade-up', y: 30, delay: 0.15 });
  const mvRef = useGsapAnimation({ animationType: 'stagger', y: 30, stagger: 0.12, start: 'top 85%' });
  const timelineHeaderRef = useGsapAnimation({ animationType: 'fade-up', y: 30, start: 'top 85%' });
  const timelineRef = useGsapAnimation({ animationType: 'stagger', y: 40, stagger: 0.15, start: 'top 80%' });

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Header Banner */}
      <section
        ref={headerRef}
        className="relative py-20 bg-gradient-to-b from-accent-light/40 via-white to-white border-b border-slate-50 text-center overflow-hidden"
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-accent-light/50 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <div className="inline-block bg-accent-light border border-primary/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
            About Our Clinic
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent">
            Dedicated To Clinical Excellence
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base font-sans">
            Learn more about the values, history, and people driving high-standard healthcare services at Zainab Clinic.
          </p>
        </div>
      </section>

      {/* 2. Clinic Story & Doctor Intro */}
      <section ref={storyRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold text-accent">
              Our Journey & Dedication
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Founded by <strong className="text-accent">Dr. Mohammad Shoeb Shaikh</strong>, Zainab Clinic opened its doors in Ambernath (W) with a simple but powerful vision: to provide premium, trustworthy, and empathetic healthcare services. Over the years, the clinic has become a staple healthcare partner in the local community.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              We specialize in blending diagnostics with holistic care to address the root causes of illnesses rather than just managing symptoms. Dr. Shoeb Shaikh focuses on patient comfort, making sure every visitor is fully educated about their recovery path, medications, and health status.
            </p>
            
            {/* Trust factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-md bg-accent-light text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-sm">Registered Integrity</h4>
                  <p className="text-xs text-slate-500">MMC Reg. No: I-84363-A-1</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-md bg-accent-light text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-accent text-sm">Empathetic Care</h4>
                  <p className="text-xs text-slate-500">Patient wellbeing is our core guide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-light/10 rounded-full blur-2xl" />
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg">
                  Dr
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Dr. M. Shoeb Shaikh</h3>
                  <p className="text-primary-light text-xs font-semibold">B.A.M.S. Physician</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                &ldquo;Our clinic exists to inspire trust and deliver qualified medical care. We measure success by the smiles and recovery of our patients. We look forward to being your wellness partner.&rdquo;
              </p>
              <div className="text-[11px] font-bold text-slate-400 border-t border-slate-800 pt-4 flex justify-between">
                <span>QUALIFICATION: B.A.M.S.</span>
                <span>REG NO: I-84363-A-1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={mvRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Mission Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm flex gap-6">
              <div className="h-12 w-12 rounded-2xl bg-accent-light text-primary flex items-center justify-center shrink-0">
                <Target className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-accent">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-sans">
                  To provide qualified, compassionate, and highly professional general healthcare services to the community of Ambernath West. We aim to offer clinical precision and treatment plans that prioritize fast recovery at affordable prices.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm flex gap-6">
              <div className="h-12 w-12 rounded-2xl bg-accent-light text-primary flex items-center justify-center shrink-0">
                <Eye className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-accent">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-sans">
                  To establish Zainab Clinic as the model family healthcare provider in Maharashtra, recognized for patient-first integrity, highly professional diagnostics, and compassionate holistic treatments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Animated Timeline */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Timeline Header */}
        <div ref={timelineHeaderRef} className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-block bg-accent-light border border-primary/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
            History Timeline
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-accent leading-tight">
            Our Journey & Key Milestones
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            How we evolved from a newly registered clinic to a trusted medical advisor for thousands of families.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto pl-6 sm:pl-0">
          
          {/* Vertical central line */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 w-1 -translate-x-1/2 timeline-line rounded-full" />

          {/* Timeline Nodes */}
          {TIMELINE_EVENTS.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className="relative mb-16 sm:mb-20">
                
                {/* Year circular pin */}
                <div className="absolute top-1.5 left-6 sm:left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-white border-4 border-primary flex items-center justify-center text-xs font-bold text-accent shadow-md z-10">
                  {event.year}
                </div>

                <div className={`sm:w-[45%] ${isLeft ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left pl-8 sm:pl-0'}`}>
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="inline-block bg-primary/10 text-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mb-2">
                      {event.year} Milestone
                    </span>
                    <h3 className="font-heading font-bold text-accent text-base mb-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans">
                      {event.desc}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
