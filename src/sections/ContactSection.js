'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const infoRef    = useRef(null);
  const mapRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Section header reveal ── */
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
      headerTl
        .fromTo(headerRef.current.querySelector('.contact-badge'),
          { opacity: 0, scale: 0.85, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)' })
        .fromTo(headerRef.current.querySelector('h2'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.2')
        .fromTo(headerRef.current.querySelector('p'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');

      /* ── 2. Info panel slides from left ── */
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* Stagger each info row inside the panel */
      gsap.fromTo(
        infoRef.current?.querySelectorAll('.info-row') ?? [],
        { opacity: 0, x: -25 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 83%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── 3. Map slides from right ── */
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-b border-primary/5">
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-light/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="contact-badge inline-block bg-accent-light border border-primary-light/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-accent leading-tight">
            Contact Zainab Clinic
          </h2>
          <p className="text-muted text-sm font-sans">
            Reach out to schedule consultations or locate our premium clinic facility in Ambernath.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Direct Info */}
          <div
            ref={infoRef}
            className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl border border-slate-100/80 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-8">

              <div className="info-row flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-accent-light text-primary flex items-center justify-center shrink-0 border border-primary-light/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-accent text-xs uppercase tracking-widest mb-1">Clinic Address</h4>
                  <a
                    href="https://maps.google.com/?q=Zainab+Clinic+Sangam+Complex+Ambernath+West"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-xs leading-relaxed font-sans hover:text-primary transition-colors block"
                  >
                    Sangam Complex, Opp. Muthoot Finance, <br />
                    Woollen Chawl, Ambernath (West) - 421501
                  </a>
                </div>
              </div>

              <div className="info-row flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-accent-light text-primary flex items-center justify-center shrink-0 border border-primary-light/10">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-accent text-xs uppercase tracking-widest mb-1">Phone Numbers</h4>
                  <a href="tel:7021096008" className="hover:text-primary transition-colors block font-semibold text-accent text-xs">
                    +91 70210 96008
                  </a>
                </div>
              </div>

              <div className="info-row flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-accent-light text-primary flex items-center justify-center shrink-0 border border-primary-light/10">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-accent text-xs uppercase tracking-widest mb-1">Direct Email</h4>
                  <a href="mailto:info@zainabclinic.com" className="hover:text-primary transition-colors block text-xs text-muted">
                    info@zainabclinic.com
                  </a>
                </div>
              </div>

              <div className="info-row flex gap-4 border-t border-slate-100 pt-6">
                <div className="h-11 w-11 rounded-xl bg-accent-light text-primary flex items-center justify-center shrink-0 border border-primary-light/10">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-heading font-bold text-accent text-xs uppercase tracking-widest mb-2">Consultation Timings</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <p className="font-bold text-slate-800">Monday - Saturday</p>
                      <p className="text-muted mt-1">Morning: 9:00 AM - 1:00 PM</p>
                      <p className="text-muted">Evening: 5:00 PM - 9:00 PM</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Sunday</p>
                      <p className="text-red-500 mt-1 font-semibold">Closed</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 bg-accent-light/50 p-4 rounded-2xl border border-primary-light/10 flex items-center gap-3">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                Emergency calls are attended on priority basis
              </span>
            </div>
          </div>

          {/* Right: Google Maps */}
          <div
            ref={mapRef}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-150/80 shadow-sm h-[350px] lg:h-auto min-h-[350px]"
          >
            <iframe
              title="Zainab Clinic Location Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.618641916327!2d73.1944843!3d19.2131106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be793f8479b9945%3A0x2b5eaf8656bbbb81!2sZainab%20clinic!5e0!3m2!1sen!2sin!4v1717800000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
