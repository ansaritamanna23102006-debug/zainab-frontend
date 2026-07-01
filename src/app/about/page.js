import React from "react";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Dr. Mohammad Shoeb Shaikh & Zainab Clinic | Ambernath West",
  description: "Learn more about Zainab Clinic and Dr. Mohammad Shoeb Shaikh (B.A.M.S.), registered general physician providing premium and compassionate healthcare services in Ambernath West since 2016.",
  keywords: "About Zainab Clinic, Dr. Mohammad Shoeb Shaikh, BAMS, General Physician, Doctor Profile Ambernath, Clinic History, Medical Council Registration, Ambernath West Doctor",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Zainab Clinic & Dr. Mohammad Shoeb Shaikh",
    description: "Learn more about Zainab Clinic and Dr. Mohammad Shoeb Shaikh (B.A.M.S.), registered general physician providing premium and compassionate healthcare services in Ambernath West.",
    url: "https://zainabclinic.com/about",
    images: [
      {
        url: "/images/clinic-og.png",
        width: 1200,
        height: 630,
        alt: "About Zainab Clinic and Dr. Mohammad Shoeb Shaikh",
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
      "name": "About Us",
      "item": "https://zainabclinic.com/about"
    }
  ]
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}
