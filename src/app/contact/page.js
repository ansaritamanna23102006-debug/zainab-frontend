import React from "react";
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Zainab Clinic | Address, Phone & Map | Ambernath West",
  description: "Get in touch with Zainab Clinic in Ambernath West. Find our clinic address, direct phone number (+91 70210 96008), email, consultation hours, and Google maps directions.",
  keywords: "Contact Zainab Clinic, Zainab Clinic Phone Number, Zainab Clinic Address, Ambernath West Doctor Phone, Dr. Shoeb Shaikh Contact, Clinic Timings Ambernath",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Zainab Clinic | Address, Phone & Directions",
    description: "Get in touch with Zainab Clinic in Ambernath West. Find our address, phone number, hours of operation, and directions.",
    url: "https://zainabclinic.com/contact",
    images: [
      {
        url: "/images/clinic-og.png",
        width: 1200,
        height: 630,
        alt: "Contact Zainab Clinic",
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
      "name": "Contact Us",
      "item": "https://zainabclinic.com/contact"
    }
  ]
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}
