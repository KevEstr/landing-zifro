"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { RobotConveyor3D } from "./robot-conveyor-3d"

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
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Animated Robot Conveyor Background */}
      <RobotConveyor3D />

      {/* Dark gradient overlays for text readability */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* MOBILE: thin bottom-only gradient so animation stays visible */}
        {/* DESKTOP: wider, richer gradients for the side-layout */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] sm:h-[55%] bg-gradient-to-t from-[#050505] via-[#050505]/70 sm:via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 left-0 w-0 sm:w-[50%] bg-gradient-to-r from-[#050505]/70 via-[#050505]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full sm:w-[60%] h-[30%] sm:h-[60%] bg-gradient-to-tr from-[#050505]/50 sm:from-[#050505]/60 to-transparent" />
      </div>

      {/* Main Content - Positioned at bottom */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-4 sm:pb-16 lg:pb-24">
        <div className="max-w-2xl">
          {/* Main heading */}
          <h1
            className={`text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-foreground block">Creamos</span>
            <span className="relative mt-1 block min-h-[1.3em] flex items-center">
              {rotatingWords.map((word, idx) => (
                <span
                  key={word}
                  className={`absolute inset-x-0 flex items-center font-bold transition-all duration-500 ${
                    idx === currentWord
                      ? "opacity-100 translate-y-0 scale-100"
                      : idx ===
                        (currentWord - 1 + rotatingWords.length) %
                          rotatingWords.length
                      ? "opacity-0 -translate-y-full scale-95"
                      : "opacity-0 translate-y-full scale-95"
                  }`}
                  style={{
                    color:
                      idx === 0
                        ? "#FF4D00"
                        : idx === 1
                        ? "#0EA5E9"
                        : idx === 2
                        ? "#8B5CF6"
                        : "#FF4D00",
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="text-foreground block mt-1">que transforman</span>
          </h1>

          {/* Subtitle – hidden on small mobile to save space, visible from sm up */}
          <p
            className={`mt-4 sm:mt-6 max-w-xl hidden sm:block text-sm leading-relaxed text-foreground/60 sm:text-lg transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            Desarrollamos agentes de inteligencia artificial que trabajan 24/7,
            creamos sitios web que convierten visitantes en clientes, y
            automatizamos procesos para que tu negocio crezca sin límites.
          </p>

          {/* CTAs */}
          <div
            className={`mt-4 sm:mt-8 flex flex-col gap-2.5 sm:gap-4 sm:flex-row transition-all duration-1000 delay-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
            >
              Comienza tu proyecto
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-card/50 backdrop-blur-sm px-6 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1"
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Scroll indicator – hidden on small mobile */}
        <div
          className={`mt-4 sm:mt-12 hidden sm:flex justify-center lg:justify-start transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#servicios"
            className="inline-flex flex-col items-center gap-2 text-foreground/40 hover:text-primary transition-colors"
            aria-label="Scroll a servicios"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Explora
            </span>
            <ArrowDown size={18} className="animate-bounce" />
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  )
}
