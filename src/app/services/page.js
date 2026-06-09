'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Stethoscope, Flame, Activity, Heart, Wind, Scissors, Users, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import useGsapAnimation from '@/hooks/useGsapAnimation';

const SERVICES_DETAIL = [
  {
    id: 'consultation',
    icon: Stethoscope,
    title: 'General Consultation',
    tagline: 'Expert diagnostic advice and personalized prescriptions.',
    desc: 'Our general consultation services serve as your primary defense against acute and chronic illnesses. Under the expert care of Dr. Mohammad Shoeb Shaikh, we perform thorough checks of your symptoms, clinical history, and lifestyle factors to arrive at an accurate diagnosis.',
    benefits: [
      'Accurate diagnosis based on complete clinical histories.',
      'Customized medication plans matching your specific physiology.',
      'Professional advice on lifestyle and nutrition adjustments.',
      'Referrals to trusted specialists when necessary.',
    ],
    procedure: 'The doctor listens to your concerns, runs physical checkups (pulse, blood pressure, chest sounds), reviews files, registers symptoms, and prescribes medication or lifestyle therapies.',
    faqs: [
      { q: 'What should I bring for my first consultation?', a: 'Please bring your identity cards, past medical reports, lists of active medications, and notes on symptoms you are experiencing.' },
      { q: 'How long does a general consultation session take?', a: 'Typically, a consultation session takes about 15-20 minutes, depending on the complexity of your health issues.' }
    ]
  },
  {
    id: 'fever',
    icon: Flame,
    title: 'Fever & Infection Treatment',
    tagline: 'Precise diagnostics and fast relief for viral and bacterial infections.',
    desc: 'Fevers can be symptoms of diverse underlying viral, bacterial, or seasonal infections. We offer diagnostic screenings and targeted symptom management to bring your body temperature down and help you recover energy quickly.',
    benefits: [
      'Rapid diagnostics to identify viral vs bacterial fevers.',
      'Effective symptomatic relief to manage headaches and body pain.',
      'Dehydration prevention with clinical monitoring guidelines.',
      'Safe antibiotic/antiviral charting only when clinically needed.',
    ],
    procedure: 'We record body temperature, check for throat/ear infections, order blood tests if necessary (CBC, Malaria, Typhoid), and supply targeted medication courses to eliminate the core infection.',
    faqs: [
      { q: 'When should I visit the doctor for a fever?', a: 'If your temperature exceeds 101°F, lasts for more than 48 hours, or is accompanied by severe head/body pain, you should consult Dr. Shoeb Shaikh immediately.' },
      { q: 'Does every fever require antibiotics?', a: 'No, seasonal viral fevers do not require antibiotics. Dr. Shoeb Shaikh prescribes antibiotics strictly on clinical evidence of bacterial infections.' }
    ]
  },
  {
    id: 'diabetes',
    icon: Activity,
    title: 'Diabetes Monitoring & Care',
    tagline: 'Comprehensive management of blood glucose and diabetic health.',
    desc: 'Managing diabetes is essential to prevent chronic cardiovascular, renal, or ocular complications. We provide blood sugar tracking, HbA1c reviews, therapeutic adjustments, and detailed diet plans to keep your blood glucose in check.',
    benefits: [
      'Regular monitoring of fasting and post-prandial blood sugar.',
      'HbA1c test analysis and therapeutic dose optimizations.',
      'Personalized diabetic nutritional guides and exercise advices.',
      'Complication prevention checkups for feet, eyes, and kidney health.',
    ],
    procedure: 'We run rapid glucometer blood tests, analyze your carbohydrate intake, assess physical parameters, and review your insulin or oral hypoglycemic dosages for optimization.',
    faqs: [
      { q: 'How often should I monitor my blood sugar?', a: 'For active diabetic patients, we recommend regular monitoring as advised by the doctor, typically once a week or daily depending on severity.' },
      { q: 'Can diabetes be reversed or managed naturally?', a: 'Type-2 diabetes can often be significantly managed or put into remission through strict weight control, exercise, and nutritional changes, under clinical supervision.' }
    ]
  },
  {
    id: 'bp',
    icon: Heart,
    title: 'BP & Hypertension Management',
    tagline: 'Protect your cardiovascular health with active blood pressure control.',
    desc: 'High blood pressure (Hypertension) is a silent threat that can lead to heart attacks or strokes if left unmanaged. We provide precise blood pressure tracking, medication reviews, and lifestyle counseling to help keep your vascular pressures normal.',
    benefits: [
      'Accurate blood pressure reading using calibrated clinical sphygmomanometers.',
      'Dose calibrations for anti-hypertensive drugs to prevent pressure spikes.',
      'Stress management guidance and sodium-controlled diet plans.',
      'Early checks for hypertensive cardiovascular issues.',
    ],
    procedure: 'The patient rests briefly, after which we take blood pressure readings in both arms. We review medication compliance, examine kidney functions, and adjust medications accordingly.',
    faqs: [
      { q: 'What is considered a normal blood pressure reading?', a: 'A standard healthy reading is typically around 120/80 mmHg. Readings consistently above 140/90 mmHg are clinically classified as hypertension.' },
      { q: 'Are blood pressure medications lifelong?', a: 'Often, BP medications are continued long-term to protect vital organs, but dosages can sometimes be reduced if lifestyle changes successfully lower pressure.' }
    ]
  },
  {
    id: 'nebulization',
    icon: Wind,
    title: 'Nebulization Therapy',
    tagline: 'Fast and reliable breathing relief for acute congestion and asthma.',
    desc: 'Nebulization therapy turns liquid breathing medications into fine aerosols that are inhaled directly into the lungs. This provides rapid relief from bronchial spasms, asthma flare-ups, bronchitis, and chest congestion.',
    benefits: [
      'Rapid delivery of asthma medication directly to bronchial airways.',
      'Quick relief from wheezing, dyspnea, and respiratory congestion.',
      'Safe and comfortable therapy for pediatric and geriatric patients.',
      'High-grade, sterile nebulizer equipment cleaned after every single use.',
    ],
    procedure: 'We check oxygen saturation levels, administer the liquid bronchodilator or steroid into the sterile nebulizer cup, and guide you to breathe through the mask for 10-15 minutes.',
    faqs: [
      { q: 'Who needs nebulization therapy?', a: 'Patients suffering from acute asthma, COPD, bronchitis, croup, or severe chest congestion due to seasonal colds.' },
      { q: 'Is nebulization safe for children?', a: 'Yes, it is highly safe and often the preferred method for delivering respiratory medication to infants and children.' }
    ]
  },
  {
    id: 'wound-dressing',
    icon: Scissors,
    title: 'Wound Dressing & Trauma Care',
    tagline: 'Sterile and hygienic wound care for fast scar-free healing.',
    desc: 'Injuries, cuts, diabetic ulcers, and surgical wounds require professional, sterile dressings to avoid dangerous bacterial infections. We provide hygienic cleaning, wound debridement, suturing, and premium sterile wraps.',
    benefits: [
      'Strict adherence to aseptic protocols to prevent infection.',
      'Gentle debridement to clear necrotizing tissues for fast recovery.',
      'Specialized care for diabetic foot ulcers and deep abrasions.',
      'Tetanus vaccination checking and custom dressing changes scheduling.',
    ],
    procedure: 'We irrigate the wound with sterile saline, apply antibacterial ointments or specialized dressings, secure the wound, and advice on care and pain management.',
    faqs: [
      { q: 'How often should a wound dressing be changed?', a: 'Depending on the depth and fluid discharge of the wound, dressing changes range from once daily to once every 3 days.' },
      { q: 'What are signs of an infected wound?', a: 'Increased redness, swelling, throbbing pain, pus discharge, or running a fever. If you see these, seek medical attention immediately.' }
    ]
  },
  {
    id: 'family-healthcare',
    icon: Users,
    title: 'Family Healthcare & Wellness',
    tagline: 'A single point of medical care for your entire household.',
    desc: 'From pediatric checkups for children to geriatric health tracking for grandparents, our clinic provides comprehensive medical management. We maintain family medical profiles to identify hereditary clinical patterns.',
    benefits: [
      'Continuity of medical care by a physician who understands your family history.',
      'Comprehensive checks covering growth parameters in children.',
      'Care programs for aging parents, including bone density and mobility checks.',
      'Hassle-free, central tracking of clinical records for all members.',
    ],
    procedure: 'We offer health assessments, check immunizations, screen vital functions, perform metabolic checks, and advice on home care routines.',
    faqs: [
      { q: 'Do you offer vaccinations for infants?', a: 'We offer counseling on child immunization schedules and refer to local pediatric vaccine centers for special immunizations.' },
      { q: 'Can you consult multiple family members in a single slot?', a: 'Yes, when booking, you can add names to schedule block consultations back-to-back.' }
    ]
  },
  {
    id: 'preventive',
    icon: ShieldCheck,
    title: 'Preventive Health Screenings',
    tagline: 'Identify health risks early with proactive screenings.',
    desc: 'Preventive care is the key to longevity. We offer routine health checkup panels to screen for metabolic disorders, organ functions, and cardiovascular issues before they manifest as chronic diseases.',
    benefits: [
      'Early detection of lifestyle diseases (diabetes, fatty liver, cholesterol).',
      'Comprehensive checks on liver, kidney, and hematology profiles.',
      'Risk assessment calculators based on genetics and body mass parameters.',
      'Peace of mind knowing your health markers are regularly audited.',
    ],
    procedure: 'We consult on risk factors, perform metabolic testing, and review laboratory test panels (cholesterol, creatinine, thyroid) to offer personalized wellness recommendations.',
    faqs: [
      { q: 'At what age should I start preventive checkups?', a: 'Adults above 25 years should undergo basic health screenings at least once a year.' },
      { q: 'Are these tests done in the clinic?', a: 'We collect blood samples or direct patients to accredited partner laboratories, and review the diagnostic outputs in-clinic.' }
    ]
  }
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(SERVICES_DETAIL[0].id);
  const detailContainerRef = useRef(null);

  const selectedService = SERVICES_DETAIL.find((s) => s.id === activeTab);
  const Icon = selectedService.icon;

  useEffect(() => {
    gsap.fromTo(
      detailContainerRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeTab]);

  return (
    <div className="bg-light min-h-screen">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-accent-light/30 via-white to-light border-b border-primary/5 text-center overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-accent-light/50 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <div className="inline-block bg-accent-light border border-primary-light/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
            Clinical Services
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent">
            Comprehensive Healthcare Solutions
          </h1>
          <p className="text-muted max-w-xl mx-auto text-sm font-sans">
            Under the professional supervision of Dr. Mohammad Shoeb Shaikh, explore our premium treatments, diagnostic procedures, and wellness benefits.
          </p>
        </div>
      </section>

      {/* Main Tabbed Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Sidebar Menu */}
          <div className="lg:col-span-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
              Select A Service
            </span>
            {SERVICES_DETAIL.map((service) => {
              const TabIcon = service.icon;
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-sans font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <TabIcon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-primary'}`} />
                    <span>{service.title}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isActive ? 'translate-x-1' : ''}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed View of Active Service */}
          <div
            ref={detailContainerRef}
            className="lg:col-span-8 bg-white border border-slate-150/80 p-8 md:p-10 rounded-3xl shadow-xl shadow-primary/5 space-y-8"
          >
            {/* Header detail */}
            <div className="flex gap-4 items-start border-b border-slate-100 pb-6">
              <div className="h-14 w-14 rounded-2xl bg-accent-light text-primary flex items-center justify-center shrink-0 shadow-sm border border-primary-light/10">
                <Icon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-accent font-heading">
                  {selectedService.title}
                </h2>
                <p className="text-primary font-semibold text-sm">
                  {selectedService.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-accent uppercase tracking-widest font-heading">
                Service Overview
              </h3>
              <p className="text-muted text-sm leading-relaxed font-sans">
                {selectedService.desc}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-accent uppercase tracking-widest font-heading">
                Key Benefits & Advantages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedService.benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-xs leading-relaxed font-sans">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure details */}
            <div className="bg-light p-6 rounded-2xl border border-slate-150/60 space-y-2">
              <h3 className="text-xs font-bold text-accent uppercase tracking-widest font-heading">
                Clinical Procedure
              </h3>
              <p className="text-muted text-xs leading-relaxed font-sans">
                {selectedService.procedure}
              </p>
            </div>

            {/* Service FAQs Accordion */}
            <div className="space-y-4 border-t border-slate-100 pt-8">
              <h3 className="text-xs font-bold text-accent uppercase tracking-widest font-heading">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {selectedService.faqs.map((faq, i) => (
                  <div key={i} className="bg-light p-4 rounded-xl border border-slate-150/50">
                    <h4 className="text-xs font-bold text-accent font-heading flex items-center gap-2 mb-2">
                      <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-muted text-xs leading-relaxed font-sans pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
