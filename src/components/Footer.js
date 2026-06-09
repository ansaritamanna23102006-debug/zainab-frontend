'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Stethoscope, Phone, MapPin, Clock,
  Facebook, Instagram, Twitter,
  Mail, ArrowRight, HeartPulse,
} from 'lucide-react';
import { gsap } from '@/lib/gsap';

const NAV_LINKS = [
  { label: 'Home',             href: '/' },
  { label: 'About Us',         href: '/about' },
  { label: 'Our Services',     href: '/services' },
  { label: 'Book Appointment', href: '/appointment' },
  { label: 'Contact Us',       href: '/contact' },
];

const SERVICES = [
  'General Consultation',
  'Fever & Infection Treatment',
  'Diabetes Monitoring',
  'BP & Hypertension Care',
  'Nebulization Therapy',
  'Wound Dressing & Trauma',
];

const HOURS = [
  { days: 'Monday – Saturday', slots: ['9:00 AM – 1:00 PM', '5:00 PM – 9:00 PM'] },
  { days: 'Sunday',            slots: ['Closed'] },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Columns stagger reveal ── */
      gsap.fromTo(
        footerRef.current?.querySelectorAll('.footer-col') ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      /* ── Bottom bar fade in ── */
      gsap.fromTo(
        '.footer-bottom-bar',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.footer-bottom-bar',
            start: 'top 98%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0B1120] text-slate-400 relative overflow-hidden">

      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      {/* Background blur shapes */}
      <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-teal-900/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-800/10 blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: Brand Identity */}
          <div className="footer-col lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-900/30 group-hover:scale-105 transition-transform duration-200">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <span className="block text-lg font-extrabold text-white font-heading tracking-tight leading-none">
                  Zainab <span className="text-teal-400">Clinic</span>
                </span>
                <span className="text-[10px] text-slate-500 tracking-widest uppercase">Trusted Healthcare</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Compassionate, expert Ayurvedic &amp; general healthcare under Dr. Mohammad Shoeb Shaikh. Your health is our highest priority.
            </p>

            {/* Doctor credential badge */}
            <div className="bg-teal-900/25 border border-teal-800/40 rounded-xl px-4 py-3 text-xs space-y-1 mb-6">
              <div className="flex items-center gap-2 text-teal-300 font-semibold">
                <HeartPulse className="h-3.5 w-3.5" />
                <span>Dr. Mohammad Shoeb Shaikh</span>
              </div>
              <p className="text-slate-500 pl-5">B.A.M.S. · Reg. No: I-84363-A-1</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter,  label: 'Twitter / X', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-500 hover:bg-teal-700/30 hover:text-teal-300 hover:border-teal-600/40 active:scale-95 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 className="text-white font-heading font-bold text-sm mb-5 uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors duration-200">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-700 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="footer-col">
            <h3 className="text-white font-heading font-bold text-sm mb-5 uppercase tracking-widest">
              Our Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((svc) => (
                <li key={svc}>
                  <Link href="/services" className="group flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors duration-200">
                    <ArrowRight className="h-3.5 w-3.5 text-teal-700 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all duration-200" />
                    {svc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col">
            <h3 className="text-white font-heading font-bold text-sm mb-5 uppercase tracking-widest">
              Contact Info
            </h3>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-teal-900/30 border border-teal-800/40 flex items-center justify-center">
                  <MapPin className="h-3.5 w-3.5 text-teal-400" />
                </div>
                <p className="text-sm leading-relaxed pt-0.5">
                  Sangam Complex, Opp. Muthoot Finance,<br />
                  Woollen Chawl, Ambernath (W) - 421501
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-teal-900/30 border border-teal-800/40 flex items-center justify-center">
                  <Phone className="h-3.5 w-3.5 text-teal-400" />
                </div>
                <a href="tel:7021096008" className="text-sm text-slate-400 hover:text-teal-400 transition-colors font-medium">
                  +91 70210 96008
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-teal-900/30 border border-teal-800/40 flex items-center justify-center">
                  <Mail className="h-3.5 w-3.5 text-teal-400" />
                </div>
                <a href="mailto:zainabclinic@gmail.com" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                  zainabclinic@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-teal-900/30 border border-teal-800/40 flex items-center justify-center">
                  <Clock className="h-3.5 w-3.5 text-teal-400" />
                </div>
                <div className="space-y-1.5">
                  {HOURS.map((h) => (
                    <div key={h.days}>
                      <p className="text-xs font-bold text-slate-200">{h.days}</p>
                      {h.slots.map((slot) => (
                        <p key={slot} className="text-xs text-slate-500">{slot}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>&copy; {currentYear} <span className="text-slate-400 font-medium">Zainab Clinic</span>. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <HeartPulse className="h-3.5 w-3.5 text-teal-700" />
            <span>Designed to inspire trust. Qualified care.</span>
          </p>
          <div className="flex gap-5">
            <Link href="/services"     className="hover:text-teal-400 transition-colors">Services</Link>
            <Link href="/contact"      className="hover:text-teal-400 transition-colors">Contact</Link>
            <Link href="/appointment"  className="hover:text-teal-400 transition-colors">Book</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
