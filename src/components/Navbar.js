'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope, Menu, X, PhoneCall, Clock, MapPin } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Book Appointment', href: '/appointment' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Scroll listener for sticky navbar offsets
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initial Navbar animation reveal
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        '.mobile-link',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'shadow-md shadow-primary/5 bg-white/90 backdrop-blur-md border-b border-primary/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Clinic Info Sub-Navbar Top Row (Hidden on Scroll or Mobile) */}
        <div className={`bg-primary text-white text-[11px] py-1.5 font-sans font-medium transition-all duration-300 hidden md:block ${
          isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent-light" />
                <span>Timing: Mon-Sat 9 AM - 1 PM, 5 PM - 9 PM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent-light" />
                <span>Sangam Complex, Ambernath (W)</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Registration No: I-84363-A-1</span>
              <span>•</span>
              <a href="tel:7021096008" className="font-semibold hover:text-accent-light transition-colors">
                Emergency Hotline: +91 7021096008
              </a>
            </div>
          </div>
        </div>

        {/* Primary Navbar Row */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? 'py-2.5' : 'py-4 lg:py-5'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-primary-hover shadow-sm">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-accent tracking-tight flex items-center gap-1">
                  Zainab <span className="text-primary-light">Clinic</span>
                </span>
                <span className="block text-[10px] text-slate-500 font-semibold tracking-wider uppercase -mt-1">
                  Healthcare Partner
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 font-sans font-semibold text-xs tracking-wider uppercase">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 text-accent hover:text-primary transition-colors duration-200 ${
                      isActive ? 'text-primary font-bold' : 'text-slate-600'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Call to Action Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:7021096008"
                className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-lg shadow-accent/10 active:scale-95 border border-transparent"
              >
                <PhoneCall className="h-3.5 w-3.5 text-primary-light" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-accent hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-accent/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div
          ref={mobileMenuRef}
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl p-6 transition-transform duration-300 ease-out flex flex-col justify-between ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <Link href="/" className="flex items-center gap-2" onClick={toggleMenu}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold font-heading text-accent">
                  Zainab <span className="text-primary">Clinic</span>
                </span>
              </Link>
              <button
                onClick={toggleMenu}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 py-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMenu}
                    className={`mobile-link block text-lg font-heading font-semibold py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent-light text-primary font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <a
              href="tel:7021096008"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-primary/10"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Call 7021096008</span>
            </a>
            <p className="text-center text-xs text-slate-400 mt-4">
              © Zainab Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
