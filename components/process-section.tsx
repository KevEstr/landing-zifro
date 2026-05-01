"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState } from "react"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Te escuchamos",
    shortDesc: "Entendemos tu negocio",
    color: "#FF6B35",
    image: "/primera.png",
  },
  {
    number: "02",
    title: "Diseñamos la solucion",
    shortDesc: "Plan personalizado",
    color: "#00D9FF",
    image: "/segunda.png",
  },
  {
    number: "03",
    title: "Desarrollamos",
    shortDesc: "Convertimos ideas en realidad",
    color: "#8B5CF6",
    image: "/tercera.png",
  },
  {
    number: "04",
    title: "Crecemos juntos",
    shortDesc: "Soporte y mejora continua",
    color: "#10B981",
    image: "/cuarta.png",
  },
]

function ProcessStep({
  step,
  index,
  isActive,
  onClick,
}: {
  step: (typeof steps)[number]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ willChange: isVisible ? 'transform, opacity' : 'auto' }}
    >
      <button
        onClick={onClick}
        className={`group relative w-full h-full text-left rounded-[2rem] border-2 p-4 lg:p-5 transition-all duration-500 flex flex-col ${isActive
          ? "border-current shadow-2xl scale-[1.02] bg-card"
          : "border-border bg-card/50 hover:border-border hover:bg-card hover:shadow-lg"
          }`}
        style={{ color: isActive ? step.color : undefined, willChange: 'transform' }}
      >
        {/* Robot Image */}
        <div
          className={`w-full flex items-center justify-center mb-2 lg:mb-3 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"
            }`}
        >
          <div className="relative w-56 h-56 lg:w-48 lg:h-48">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 192px, 208px"
            />
          </div>
        </div>

        {/* Number and title */}
        <div className="flex items-end justify-between gap-4 flex-1">
          <div className="flex-1">
            <span
              className="block text-xs font-bold uppercase tracking-[0.3em] mb-2 transition-colors duration-300"
              style={{ color: step.color }}
            >
              Paso {step.number}
            </span>
            <h3 className="text-xl font-bold text-foreground leading-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.shortDesc}</p>
          </div>
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-125 flex-shrink-0"
            style={{ backgroundColor: `${step.color}20`, willChange: 'transform' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        {/* Active indicator */}
        {isActive && (
          <div
            className="absolute -bottom-1 left-8 right-8 h-1 rounded-full"
            style={{ backgroundColor: step.color }}
          />
        )}
      </button>
    </div>
  )
}

export function ProcessSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const [activeStep, setActiveStep] = useState(0)

  // NO auto-cycle - solo manual

  return (
    <section className="relative bg-background py-12 lg:py-16 overflow-hidden">
      {/* Top wave */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rotate-180">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="var(--background)" />
        </svg>
      </div>

      {/* Decorative - reducido */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={titleRef}
          className={`mb-12 lg:mb-16 text-center transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
            Como trabajamos
          </span>
          <h2 className="text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            De tu idea a{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">resultados medibles.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={i}
              isActive={activeStep === i}
              onClick={() => setActiveStep(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
