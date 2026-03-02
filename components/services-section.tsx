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
      className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div className={`flex flex-col items-center gap-8 lg:gap-0 ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Visual Side - BIG and immersive */}
        <div className="relative w-full lg:w-3/5 group">
          <div className="relative overflow-hidden rounded-[2rem] aspect-[16/10] shadow-2xl bg-card/50 backdrop-blur-sm border border-border">
            <VisualComponent className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />

            {/* Floating feature pills ON the visual */}
            <div className="absolute inset-0 hidden lg:block">
              {features.map((f, i) => {
                const positions = [
                  { top: "15%", left: "10%" },      // Flujos personalizados
                  { top: "12%", right: "8%" },      // Triggers inteligentes
                  { bottom: "25%", left: "12%" },   // ROI medible
                  { top: "68%", right: "2%" },      // Escalado automático - MÁS A LA DERECHA
                ]
                const pos = positions[i] || positions[0]

                return (
                  <div
                    key={f.text}
                    className="absolute animate-float group"
                    style={{
                      ...pos,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${5 + i}s`,
                    } as React.CSSProperties}
                  >
                    <div className="relative">
                      {/* Hexagonal background */}
                      <div 
                        className="absolute inset-0 opacity-20 blur-sm"
                        style={{
                          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                          backgroundColor: accentColor,
                        }}
                      />
                      <div 
                        className="relative flex items-center justify-center px-3 py-1.5 backdrop-blur-md border transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          backgroundColor: `${accentColor}10`,
                          borderColor: `${accentColor}40`,
                          clipPath: 'polygon(8% 0%, 92% 0%, 100% 25%, 100% 75%, 92% 100%, 8% 100%, 0% 75%, 0% 25%)',
                        }}
                      >
                        <span className="text-[10px] font-bold text-foreground tracking-wider uppercase">{f.text}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Big number in corner */}
            <div className="absolute bottom-6 right-6">
              <span
                className="text-8xl font-serif font-bold opacity-30"
                style={{ color: accentColor }}
              >
                0{index + 1}
              </span>
            </div>
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

          {/* Mobile features */}
          <div className="flex flex-wrap gap-2 lg:hidden">
            {features.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border"
              >
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-xs font-bold text-foreground">{f.text}</span>
              </div>
            ))}
          </div>

          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 self-start mt-2 rounded-full px-8 py-4 text-base font-semibold text-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
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
    <section id="servicios" className="relative bg-secondary py-24 lg:py-32 overflow-hidden">
      {/* Decorative floating orbs across section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-primary/5 -top-48 -right-48 blur-3xl animate-blob" />
        <div
          className="absolute w-80 h-80 rounded-full bg-accent/5 bottom-1/4 -left-40 blur-3xl animate-blob"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute w-64 h-64 rounded-full bg-[#D4A853]/5 top-1/3 right-1/4 blur-2xl animate-blob"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`mb-24 text-center transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
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
        <div className="flex flex-col gap-32 lg:gap-40">
          {services.map((service, i) => (
            <ServiceShowcase key={service.title} {...service} index={i} />
          ))}
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
