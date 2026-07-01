import { Poppins, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Zainab Clinic | Dr. Mohammad Shoeb Shaikh (B.A.M.S.) | Ambernath West",
  description: "Zainab Clinic, run by General Physician Dr. Mohammad Shoeb Shaikh (B.A.M.S.), provides premium and compassionate healthcare services in Ambernath West. Book your consultation today.",
  keywords: "Zainab Clinic, Dr. Mohammad Shoeb Shaikh, BAMS, General Physician, Doctor in Ambernath, Clinic in Ambernath West, Fever Treatment, Diabetes Monitoring, BP Monitoring, Nebulization, Ambernath Doctor, Family Healthcare",
  authors: [{ name: "Dr. Mohammad Shoeb Shaikh" }],
  creator: "Zainab Clinic",
  metadataBase: new URL("https://zainabclinic.com"), // Placeholders for production
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zainab Clinic - Your Family's Trusted Healthcare Partner",
    description: "Premium healthcare services by Dr. Mohammad Shoeb Shaikh (B.A.M.S.) in Ambernath (W). Experience compassionate, patient-first general practice.",
    url: "https://zainabclinic.com",
    siteName: "Zainab Clinic",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/clinic-og.png",
        width: 1200,
        height: 630,
        alt: "Zainab Clinic - Dr. Mohammad Shoeb Shaikh BAMS General Physician in Ambernath West",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zainab Clinic | Dr. Mohammad Shoeb Shaikh (B.A.M.S.)",
    description: "Premium healthcare services by Dr. Mohammad Shoeb Shaikh (B.A.M.S.) in Ambernath (W). Experience compassionate, patient-first general practice.",
    images: ["/images/clinic-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Zainab Clinic",
  "alternateName": "Zainab Clinic Ambernath",
  "description": "Zainab Clinic is a premium healthcare clinic in Ambernath West headed by Dr. Mohammad Shoeb Shaikh, offering general consultations, fever treatments, diabetes and BP monitoring.",
  "url": "https://zainabclinic.com",
  "telephone": "+91-7021096008",
  "priceRange": "$$",
  "image": "https://zainabclinic.com/images/clinic-og.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sangam Complex, Opp. Muthoot Finance, Woollen Chawl",
    "addressLocality": "Ambernath (West)",
    "addressRegion": "Maharashtra",
    "postalCode": "421501",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.1994",
    "longitude": "73.1932"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "17:00",
      "closes": "21:00"
    }
  ],
  "medicalSpecialty": ["GeneralPractice", "PrimaryCare"],
  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "General Consultation"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Fever Treatment"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Diabetes Monitoring"
    },
    {
      "@type": "MedicalProcedure",
      "name": "BP Monitoring"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Nebulization"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Wound Dressing"
    }
  ],
  "employee": {
    "@type": "Physician",
    "name": "Dr. Mohammad Shoeb Shaikh",
    "medicalSpecialty": "GeneralPhysician",
    "legalName": "Dr. Mohammad Shoeb Shaikh",
    "credential": "B.A.M.S.",
    "identifier": "I-84363-A-1",
    "telephone": "+91-7021096008"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        {/* Main wrapper starts with padding to offset fixed navbar */}
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
