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
  total,
  tags,
}: {
  title: string
  subtitle: string
  description: string
  VisualComponent: React.ComponentType<{ className?: string }>
  features: { text: string }[]
  accentColor: string
  index: number
  total: number
  tags: string[]
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  const isReversed = index % 2 !== 0
  const num = String(index + 1).padStart(2, "0")
  const totalStr = String(total).padStart(2, "0")

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {/* Editorial number watermark behind */}
      <div
        aria-hidden="true"
        className={`absolute -top-8 lg:-top-16 ${isReversed ? "right-0" : "left-0"} pointer-events-none select-none`}
      >
        <span
          className="block text-[120px] sm:text-[180px] lg:text-[240px] font-bold leading-none text-foreground/[0.03]"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.06em" }}
        >
          {num}
        </span>
      </div>

      {/* Service header line: index + tags */}
      <div className={`relative mb-6 lg:mb-10 flex items-center gap-4 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold tabular-nums text-primary"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
          >
            {num}
          </span>
          <span className="text-xs text-muted-foreground/60 tabular-nums">/ {totalStr}</span>
          <span className="hidden sm:block h-px w-12 bg-border" />
          <span
            className="hidden sm:inline text-[10px] font-semibold uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.25em" }}
          >
            {subtitle}
          </span>
        </div>
        <div className={`hidden md:flex flex-1 items-center gap-2 ${isReversed ? "justify-start" : "justify-end"}`}>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground/80"
              style={{ fontFamily: "var(--font-mono, ui-monospace)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={`relative flex flex-col items-center gap-8 lg:gap-0 ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Visual Side - BIG and immersive */}
        <div className="relative w-full lg:w-3/5">
          <div className="relative aspect-[16/10]">
            <VisualComponent />
          </div>
        </div>

        {/* Content Side - Minimal but impactful */}
        <div className={`w-full lg:w-2/5 flex flex-col gap-6 ${isReversed ? "lg:pr-12" : "lg:pl-12"}`}>
          <h3
            className="text-3xl font-bold text-foreground lg:text-5xl text-balance leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}
          >
            {title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground lg:text-lg max-w-xl">
            {description}
          </p>

          {/* Feature list as bullet pairs */}
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {features.map((f) => (
              <li key={f.text} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                <span>{f.text}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="group hidden lg:inline-flex items-center gap-3 self-start mt-4 rounded-full px-8 py-4 text-base font-semibold text-primary-foreground bg-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
            style={{ boxShadow: `0 10px 40px -10px ${accentColor}50` }}
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
      accentColor: "#FF4D00",
      tags: ["GPT-4", "RAG", "Webhooks"],
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
      accentColor: "#FF4D00",
      tags: ["Next.js", "TypeScript", "Vercel"],
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
      accentColor: "#FF4D00",
      tags: ["n8n", "Zapier", "REST API"],
      features: [
        { text: "Flujos personalizados" },
        { text: "Triggers inteligentes" },
        { text: "ROI medible" },
        { text: "Escalado automatico" },
      ],
    },
  ]

  return (
    <section id="servicios" className="relative bg-background py-16 lg:py-20 overflow-hidden">
      {/* Subtle editorial grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`mb-16 lg:mb-24 transition-all duration-500 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span
              className="text-[11px] font-semibold uppercase text-primary"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.3em" }}
            >
              Nuestros servicios
            </span>
          </div>
          <h2
            className="text-4xl font-bold text-foreground sm:text-5xl lg:text-7xl text-balance leading-[1.02]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.035em" }}
          >
            Tres formas de hacer
            <br />
            <span className="text-foreground/40">que tu negocio</span> <span className="text-primary">crezca solo.</span>
          </h2>
        </div>

        {/* Services with editorial dividers */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <div key={service.title}>
              <ServiceShowcase {...service} index={i} total={services.length} />
              {i < services.length - 1 && (
                <ServiceDivider
                  fromIdx={i}
                  toIdx={i + 1}
                  nextSubtitle={services[i + 1].subtitle}
                  nextTitle={services[i + 1].title}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile CTA - Solo visible en móvil, al final de todos los servicios */}
        <div className="mt-16 flex justify-center lg:hidden">
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

/* ────────────────────────────────────────────────────────────────────────
   Editorial divider between services
   Animated SVG line that draws across, with a "next up" card revealing the
   following service title. Subtle, premium, no fake-functional UI.
   ──────────────────────────────────────────────────────────────────────── */
function ServiceDivider({
  fromIdx,
  toIdx,
  nextSubtitle,
  nextTitle,
}: {
  fromIdx: number
  toIdx: number
  nextSubtitle: string
  nextTitle: string
}) {
  const { ref, isVisible } = useScrollReveal(0.3)
  const fromNum = String(fromIdx + 1).padStart(2, "0")
  const toNum = String(toIdx + 1).padStart(2, "0")

  return (
    <div ref={ref} className="relative my-12 lg:my-16">
      {/* Animated draw-on horizontal SVG line */}
      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[2px] overflow-visible pointer-events-none"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="var(--primary)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="100"
          strokeDashoffset={isVisible ? "0" : "100"}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)", opacity: 0.4 }}
        />
      </svg>

      {/* Center floating "next up" preview */}
      <div className="relative flex items-center justify-center">
        <div
          className={`
            relative flex items-center gap-3 sm:gap-4 lg:gap-6
            bg-background border border-border/60 rounded-full
            px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3
            max-w-[calc(100%-3rem)]
            transition-all duration-700
            ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}
          `}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)", transitionDelay: "0.4s" }}
        >
          {/* From → To progression chips */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span
              className="text-[10px] font-bold tabular-nums text-muted-foreground/50"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
            >
              {fromNum}
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-px w-1.5 sm:w-2 bg-muted-foreground/30" />
              <span className="h-px w-2 sm:w-3 bg-primary" />
              <svg width="6" height="6" viewBox="0 0 6 6" className="text-primary" fill="currentColor">
                <path d="M0 0 L6 3 L0 6 Z" />
              </svg>
            </span>
            <span
              className="text-[10px] font-bold tabular-nums text-primary"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
            >
              {toNum}
            </span>
          </div>

          <span className="h-4 w-px bg-border flex-shrink-0" />

          {/* Next service preview */}
          <div className="flex flex-col min-w-0">
            <span
              className="text-[8px] font-semibold uppercase text-primary/80 leading-none mb-1"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.25em" }}
            >
              {nextSubtitle}
            </span>
            <span
              className="text-[11px] sm:text-xs lg:text-sm font-semibold text-foreground leading-tight truncate"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
            >
              {nextTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Side floating dots — hidden on mobile to avoid clutter */}
      <div
        className={`hidden sm:flex absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 items-center gap-1 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "0.8s" }}
      >
        <span className="h-1 w-1 rounded-full bg-primary/60" />
        <span className="h-1 w-1 rounded-full bg-border" />
      </div>
      <div
        className={`hidden sm:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 items-center gap-1 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "0.8s" }}
      >
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className="h-1 w-1 rounded-full bg-primary/60" />
      </div>
    </div>
  )
}
