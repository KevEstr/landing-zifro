"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useEffect, useState, useRef } from "react"
import { AgentVisual, WebVisual, AutomationVisual } from "./service-visuals-new"

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: `${6 + delay}s` }}
    >
      {children}
    </div>
  )
}

function InteractiveOrb({
  color,
  size,
  x,
  y,
  label,
  icon,
  index = 0,
}: {
  color: string
  size: number
  x: string
  y: string
  label: string
  icon: string
  index?: number
}) {
  const [hovered, setHovered] = useState(false)
  const animDuration = 7 + (index % 4) * 1
  const animDelay = (index % 3) * 1

  return (
    <div
      className="absolute animate-float cursor-pointer transition-all duration-500 group z-10"
      style={{ left: x, top: y, animationDuration: `${animDuration}s`, animationDelay: `${animDelay}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-500 ${
          hovered ? "scale-125" : "scale-100"
        }`}
        style={{
          width: size,
          height: size,
          background: color,
          boxShadow: hovered ? `0 0 40px ${color}40` : `0 0 20px ${color}20`,
        }}
      >
        <span className="text-2xl">{icon}</span>
      </div>
      <div
        className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-card px-4 py-1.5 text-xs font-bold text-foreground shadow-lg border border-border transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {label}
      </div>
    </div>
  )
}

function ServiceShowcase({
  title,
  subtitle,
  description,
  VisualComponent,
  features,
  accentColor,
  index,
}: {
  title: string
  subtitle: string
  description: string
  VisualComponent: React.ComponentType<{ className?: string }>
  features: { text: string }[]
  accentColor: string
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  const isReversed = index % 2 !== 0

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className={`flex flex-col items-center gap-8 lg:gap-0 ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Visual Side - BIG and immersive */}
        <div className="relative w-full lg:w-3/5">
          <div className="relative aspect-[16/10]">
            <VisualComponent />
          </div>
        </div>

        {/* Content Side - Minimal but impactful */}
        <div className={`w-full lg:w-2/5 flex flex-col gap-6 ${isReversed ? "lg:pr-12" : "lg:pl-12"}`}>
          <div
            className="inline-flex self-start rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {subtitle}
          </div>
          <h3 className="text-4xl font-bold text-foreground lg:text-5xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
            {description}
          </p>

          <a
            href="#contacto"
            className="group hidden lg:inline-flex items-center gap-3 self-start mt-2 rounded-full px-8 py-4 text-base font-semibold text-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{ backgroundColor: accentColor }}
          >
            Solicitar informacion
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  const services = [
    {
      title: "Asistentes virtuales que nunca duermen",
      subtitle: "Agentes de IA",
      description:
        "Creamos agentes inteligentes que atienden a tus clientes las 24 horas, responden preguntas al instante y aprenden de cada conversación para mejorar continuamente.",
      VisualComponent: AgentVisual,
      accentColor: "#FF6B35",
      features: [
        { text: "Contexto de negocio" },
        { text: "Memoria de clientes" },
        { text: "Acciones automaticas" },
        { text: "Integracion total" },
      ],
    },
    {
      title: "Sitios web que venden por ti",
      subtitle: "Desarrollo Web",
      description:
        "Diseñamos y desarrollamos sitios web modernos, rapidos y optimizados para convertir visitantes en clientes. Cada pixel tiene un proposito.",
      VisualComponent: WebVisual,
      accentColor: "#00D9FF",
      features: [
        { text: "Conversion optimizada" },
        { text: "Analytics integrado" },
        { text: "A/B testing incluido" },
        { text: "CRO estrategico" },
      ],
    },
    {
      title: "Automatiza y enfocate en crecer",
      subtitle: "Automatizacion",
      description:
        "Eliminamos tareas repetitivas conectando tus herramientas favoritas. Tu equipo se dedica a lo importante mientras la tecnologia trabaja por ti.",
      VisualComponent: AutomationVisual,
      accentColor: "#8B5CF6",
      features: [
        { text: "Flujos personalizados" },
        { text: "Triggers inteligentes" },
        { text: "ROI medible" },
        { text: "Escalado automatico" },
      ],
    },
  ]

  return (
    <section id="servicios" className="relative bg-background py-12 lg:py-16 overflow-hidden">
      {/* Decorative floating orbs across section - reducido */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`mb-12 lg:mb-16 text-center transition-all duration-500 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">
            Nuestros servicios
          </span>
          <h2 className="text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Tecnologia que impulsa
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">tu crecimiento.</span>
          </h2>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {services.map((service, i) => (
            <ServiceShowcase key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* Mobile CTA - Solo visible en móvil, al final de todos los servicios */}
        <div className="mt-12 flex justify-center lg:hidden">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1"
          >
            Solicitar información
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  )
}
