import React from 'react';
import Hero from '@/sections/Hero';
import WhyChooseUs from '@/sections/WhyChooseUs';
import DoctorSection from '@/sections/DoctorSection';
import ServicesHome from '@/sections/ServicesHome';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import ContactSection from '@/sections/ContactSection';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero landing section */}
      <Hero />

      {/* Why Choose Us benefits cards */}
      <WhyChooseUs />

      {/* Doctor profile with registration status and animated counters */}
      <DoctorSection />

      {/* Core clinical services grid */}
      <ServicesHome />

      {/* Testimonials Slider — full-bleed dark section */}
      <TestimonialsSlider />

      {/* Timings, Address and Google Maps integration */}
      <ContactSection />
    </div>
  );
}
