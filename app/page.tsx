"use client"

import dynamic from 'next/dynamic'
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section-3d"

// Lazy load heavy sections
const ServicesSection = dynamic(() => import("@/components/services-section").then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="min-h-screen" />,
})

const ResultsSection = dynamic(() => import("@/components/results-section").then(mod => ({ default: mod.ResultsSection })), {
  loading: () => <div className="min-h-screen" />,
})

const ProcessSection = dynamic(() => import("@/components/process-section").then(mod => ({ default: mod.ProcessSection })), {
  loading: () => <div className="min-h-screen" />,
})

const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-[50vh]" />,
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="min-h-[20vh]" />,
})

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ResultsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
