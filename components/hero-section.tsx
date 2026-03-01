"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { NeuralNetworkBg } from "./neural-network-bg"
import { DataStreamVisual } from "./data-stream-visual"

const rotatingWords = [
  "Agentes IA",
  "Sitios Web",
  "Automatizacioness",
  "Soluciones",
]

function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`absolute rounded-full opacity-40 animate-blob ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${8 + delay}s`,
      }}
    />
  )
}

function AgentNode({ label, x, y, delay }: { label: string; x: string; y: string; delay: number }) {
  return (
    <div
      className="absolute animate-float hidden lg:flex"
      style={{
        left: x,
        top: y,
        animationDelay: `${delay}s`,
        animationDuration: `${5 + delay}s`,
      }}
    >
      <div className="flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-sm px-4 py-2 shadow-lg border border-border">
        <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse-soft" />
        <span className="text-xs font-medium text-foreground whitespace-nowrap">{label}</span>
      </div>
    </div>
  )
}

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
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero-landscape.jpg"
          alt=""
          className="w-full h-full object-cover opacity-35"
          style={{ filter: 'blur(3px)' }}
        />
      </div>

      {/* Floating decorative orbs - reducidos */}
      <FloatingOrb className="w-96 h-96 bg-primary/10 -top-32 -left-32 blur-3xl" delay={0} />
      <FloatingOrb className="w-96 h-96 bg-accent/10 -bottom-48 -right-48 blur-3xl" delay={2} />

      {/* Floating agent nodes - solo 2 */}
      <AgentNode label="Procesando datos..." x="10%" y="30%" delay={0} />
      <AgentNode label="Optimizando resultados..." x="85%" y="65%" delay={1.5} />

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full z-0 hidden lg:block" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="12%" y1="28%" x2="50%" y2="45%"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="8 4"
          className="opacity-20 animate-draw-line"
        />
        <line
          x1="82%" y1="23%" x2="55%" y2="45%"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeDasharray="8 4"
          className="opacity-20 animate-draw-line"
          style={{ animationDelay: "0.5s" }}
        />
        <line
          x1="9%" y1="68%" x2="48%" y2="55%"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="8 4"
          className="opacity-20 animate-draw-line"
          style={{ animationDelay: "1s" }}
        />
        <line
          x1="84%" y1="63%" x2="55%" y2="55%"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeDasharray="8 4"
          className="opacity-20 animate-draw-line"
          style={{ animationDelay: "1.5s" }}
        />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-32 lg:pt-40">
        {/* Main heading */}
        <h1
          className={`text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-8xl transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          <span className="text-foreground block">Creamos</span>
          <span className="relative mt-2 block h-[1.2em] overflow-hidden">
            {rotatingWords.map((word, idx) => (
              <span
                key={word}
                className={`absolute inset-0 flex items-center justify-center font-serif italic transition-all duration-500 ${idx === currentWord
                  ? "opacity-100 translate-y-0 scale-100"
                  : idx === (currentWord - 1 + rotatingWords.length) % rotatingWords.length
                    ? "opacity-0 -translate-y-full scale-95"
                    : "opacity-0 translate-y-full scale-95"
                  }`}
                style={{
                  color: idx === 0 ? "var(--primary)" : idx === 1 ? "var(--accent)" : idx === 2 ? "#D4A853" : "var(--primary)",
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
          className={`mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
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
          <a href="#servicios" className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors" aria-label="Scroll a servicios">
            <span className="text-xs font-medium uppercase tracking-widest">Explora</span>
            <ArrowDown size={18} className="animate-bounce" />
          </a>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute -bottom-1 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z"
            fill="var(--secondary)"
          />
        </svg>
      </div>
    </section>
  )
}
