import React from "react";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Clinical Services & Treatments | Zainab Clinic Ambernath West",
  description: "Comprehensive family healthcare services by Dr. Mohammad Shoeb Shaikh (B.A.M.S.) including general consultations, fever and infection treatments, diabetes & BP monitoring, nebulization, and trauma dressings.",
  keywords: "Zainab Clinic Services, General Consultation, Fever Treatment, Diabetes Monitoring, BP Management, Nebulization Therapy, Wound Dressing, Family Healthcare, Ambernath Clinic",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Clinical Services & Treatments - Zainab Clinic",
    description: "Explore comprehensive healthcare treatments and consultations offered by Dr. Mohammad Shoeb Shaikh (B.A.M.S.) in Ambernath West.",
    url: "https://zainabclinic.com/services",
    images: [
      {
        url: "/images/clinic-og.png",
        width: 1200,
        height: 630,
        alt: "Zainab Clinic Clinical Services",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://zainabclinic.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://zainabclinic.com/services"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I bring for my first consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Please bring your identity cards, past medical reports, lists of active medications, and notes on symptoms you are experiencing."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a general consultation session take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically, a consultation session takes about 15-20 minutes, depending on the complexity of your health issues."
      }
    },
    {
      "@type": "Question",
      "name": "When should I visit the doctor for a fever?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your temperature exceeds 101°F, lasts for more than 48 hours, or is accompanied by severe head/body pain, you should consult Dr. Shoeb Shaikh immediately."
      }
    },
    {
      "@type": "Question",
      "name": "Does every fever require antibiotics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, seasonal viral fevers do not require antibiotics. Dr. Shoeb Shaikh prescribes antibiotics strictly on clinical evidence of bacterial infections."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I monitor my blood sugar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For active diabetic patients, we recommend regular monitoring as advised by the doctor, typically once a week or daily depending on severity."
      }
    },
    {
      "@type": "Question",
      "name": "What is considered a normal blood pressure reading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard healthy reading is typically around 120/80 mmHg. Readings consistently above 140/90 mmHg are clinically classified as hypertension."
      }
    }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesClient />
    </>
  );
}
