"use client"

import dynamic from 'next/dynamic'
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section-3d"

// Lazy load heavy sections
const ServicesSection = dynamic(() => import("@/components/services-section").then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="min-h-screen" />,
})

const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="min-h-[50vh]" />,
})

const ProcessSection = dynamic(() => import("@/components/process-section").then(mod => ({ default: mod.ProcessSection })), {
  loading: () => <div className="min-h-[50vh]" />,
})

const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-[50vh]" />,
})

const FaqSection = dynamic(() => import("@/components/faq-section").then(mod => ({ default: mod.FaqSection })), {
  loading: () => <div className="min-h-[50vh]" />,
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="min-h-[20vh]" />,
})

const VeraTeaser = dynamic(() => import("@/components/vera-teaser").then(mod => ({ default: mod.VeraTeaser })), {
  loading: () => <div className="min-h-[40vh]" />,
})

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <VeraTeaser />
      <TestimonialsSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
