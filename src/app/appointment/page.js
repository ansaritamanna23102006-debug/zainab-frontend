import React from "react";
import AppointmentClient from "./AppointmentClient";

export const metadata = {
  title: "Book a Consultation Slot Online | Zainab Clinic Ambernath",
  description: "Schedule your clinical appointment slot online with Dr. Mohammad Shoeb Shaikh (B.A.M.S.) at Zainab Clinic, Ambernath West. Quick registration and prioritized doctor consulting slots.",
  keywords: "Book Doctor Appointment, Zainab Clinic Appointment, Dr. Mohammad Shoeb Shaikh Consulting, Online Clinic Slot Booking, General Physician Appointment, Ambernath West Doctor Booking",
  alternates: {
    canonical: "/appointment",
  },
  openGraph: {
    title: "Book a Consultation Slot Online - Zainab Clinic",
    description: "Schedule your clinical appointment slot online with Dr. Mohammad Shoeb Shaikh (B.A.M.S.) at Zainab Clinic, Ambernath West.",
    url: "https://zainabclinic.com/appointment",
    images: [
      {
        url: "/images/clinic-og.png",
        width: 1200,
        height: 630,
        alt: "Zainab Clinic Appointment Booking",
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
      "name": "Book Appointment",
      "item": "https://zainabclinic.com/appointment"
    }
  ]
};

export default function AppointmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AppointmentClient />
    </>
  );
}
