"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { AgentNetworkVisual } from "./agent-network-visual"

const rotatingWords = [
  "Agentes IA",
  "Sitios Web",
  "Automatizaciones",
  "Soluciones",
]

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/prueba.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Animated agent network overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen">
        <AgentNetworkVisual />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(to right, #FF4D00 1px, transparent 1px),
          linear-gradient(to bottom, #FF4D00 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center pt-32 lg:pt-40">
        {/* Main heading with rotating words */}
        <h1
          className={`text-5xl font-bold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-foreground block">Creamos</span>
          <span className="relative mt-2 block min-h-[1.3em] flex items-center justify-center">
            {rotatingWords.map((word, idx) => (
              <span
                key={word}
                className={`absolute inset-x-0 flex items-center justify-center font-bold transition-all duration-500 px-4 ${idx === currentWord
                    ? "opacity-100 translate-y-0 scale-100"
                    : idx === (currentWord - 1 + rotatingWords.length) % rotatingWords.length
                      ? "opacity-0 -translate-y-full scale-95"
                      : "opacity-0 translate-y-full scale-95"
                  }`}
                style={{
                  color: idx === 0 ? "#FF4D00" : idx === 1 ? "#0EA5E9" : idx === 2 ? "#8B5CF6" : "#FF4D00",
                }}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="text-foreground block mt-2">que transforman</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          Desarrollamos agentes de inteligencia artificial que trabajan 24/7, creamos sitios web que convierten visitantes en clientes, y automatizamos procesos para que tu negocio crezca sin límites.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
          >
            Comienza tu proyecto
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card/50 backdrop-blur-sm px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1"
          >
            Ver servicios
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <a href="#servicios" className="inline-flex flex-col items-center gap-2 text-foreground/50 hover:text-primary transition-colors" aria-label="Scroll a servicios">
            <span className="text-xs font-medium uppercase tracking-widest">Explora</span>
            <ArrowDown size={18} className="animate-bounce" />
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/80 to-transparent" />
    </section>
  )
}
