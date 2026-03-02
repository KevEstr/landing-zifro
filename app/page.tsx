"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section-new"
import { MarqueeBand } from "@/components/marquee-band"
import { ServicesSection } from "@/components/services-section"
import { ResultsSection } from "@/components/results-section"
import { ProcessSection } from "@/components/process-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <MarqueeBand />
      <ServicesSection />
      <ResultsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
