"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { CaseVisual } from "./results-visuals"

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.unobserve(node)
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

const cases = [
  {
    company: "Hotel Guacarí",
    industry: "Hotelería",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop", // Reemplaza con: /images/case-hotel-guacari.jpg
    stat: { value: 100, suffix: "%", label: "digitalizado" },
    result: "Sistema completo de reservas, facturación hotel-restaurante y control de inventario de alimentos. Automatizamos toda la operación desde la reserva hasta el checkout.",
    color: "#FF6B35",
    services: ["Sistema de Reservas", "Facturación", "Control de Inventario"],
  },
  {
    company: "Academia Ritmo & Volley",
    industry: "Educación Deportiva",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=900&fit=crop", // Reemplaza con: /images/case-academia-ritmo.jpg
    stat: { value: 85, suffix: "%", label: "menos tiempo admin" },
    result: "Plataforma de gestión integral con sistema de pagos automatizado, control de asistencia en tiempo real y facturación electrónica. Los instructores se enfocan en enseñar, no en papeles.",
    color: "#00D9FF",
    services: ["Pagos Automatizados", "Control de Asistencia", "Facturación"],
  },
  {
    company: "Distribuidora Sandwich Express",
    industry: "Distribución Mayorista",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&h=900&fit=crop", // Reemplaza con: /images/case-sandwich-express.jpg
    stat: { value: 3, suffix: "x", label: "más ventas procesadas" },
    result: "Sistema de control de ventas mayoristas multi-socio con gestión de inventario, pedidos y facturación. Triplicaron su capacidad de procesamiento sin contratar más personal.",
    color: "#8B5CF6",
    services: ["Control de Ventas", "Multi-Socio", "Gestión de Pedidos"],
  },
]

const bigStats = [
  { value: 300, suffix: "%", label: "Eficiencia promedio" },
  { value: 85, suffix: "%", label: "Menos tareas manuales" },
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 99, suffix: "%", label: "Clientes satisfechos" },
]

function CaseCard({
  caseData,
  index,
}: {
  caseData: (typeof cases)[number]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div className="group relative overflow-hidden rounded-[2rem] bg-card border border-border">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-background/30">
          <img
            src={caseData.image}
            alt={caseData.company}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(to top, ${caseData.color}, transparent)` }}
          />

          {/* Industry badge */}
          <div className="absolute top-4 left-4">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-card backdrop-blur-sm"
              style={{ backgroundColor: `${caseData.color}dd` }}
            >
              {caseData.industry}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h4 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>{caseData.company}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{caseData.result}</p>
          
          {/* Services tags */}
          <div className="mt-2.5 flex flex-wrap gap-2">
            {caseData.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border"
                style={{ 
                  borderColor: `${caseData.color}40`,
                  backgroundColor: `${caseData.color}10`,
                  color: caseData.color
                }}
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ResultsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1)

  return (
    <section id="resultados" className="relative bg-background overflow-hidden">
      {/* Cases section */}
      <div className="relative py-12 lg:py-16">

        <div className="relative mx-auto max-w-7xl px-6">
          <div
            ref={titleRef}
            className={`mb-12 lg:mb-16 text-center transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
              Proyectos Reales
            </span>
            <h2 className="text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Empresas que confían
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">en nuestro trabajo.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Sistemas personalizados que resuelven problemas reales y generan resultados medibles.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <CaseCard key={c.company} caseData={c} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
