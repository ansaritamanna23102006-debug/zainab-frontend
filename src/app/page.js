import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/sections/Hero';

const WhyChooseUs = dynamic(() => import('@/sections/WhyChooseUs'));
const DoctorSection = dynamic(() => import('@/sections/DoctorSection'));
const ServicesHome = dynamic(() => import('@/sections/ServicesHome'));
const TestimonialsSlider = dynamic(() => import('@/components/TestimonialsSlider'));
const ContactSection = dynamic(() => import('@/sections/ContactSection'));

export const metadata = {
  title: "Zainab Clinic | Dr. Mohammad Shoeb Shaikh (B.A.M.S.) | Ambernath West",
  description: "Zainab Clinic, run by General Physician Dr. Mohammad Shoeb Shaikh (B.A.M.S.), provides premium and compassionate healthcare services in Ambernath West. Book your consultation today.",
  keywords: "Zainab Clinic, Dr. Mohammad Shoeb Shaikh, BAMS, General Physician, Doctor in Ambernath, Clinic in Ambernath West, Fever Treatment, Diabetes Monitoring, BP Monitoring, Nebulization, Ambernath Doctor, Family Healthcare",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zainab Clinic - Your Family's Trusted Healthcare Partner",
    description: "Premium healthcare services by Dr. Mohammad Shoeb Shaikh (B.A.M.S.) in Ambernath (W). Experience compassionate, patient-first general practice.",
    url: "https://zainabclinic.com",
    images: [
      {
        url: "/images/clinic-og.png",
        width: 1200,
        height: 630,
        alt: "Zainab Clinic - Dr. Mohammad Shoeb Shaikh BAMS General Physician in Ambernath West",
      },
    ],
  },
};

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
