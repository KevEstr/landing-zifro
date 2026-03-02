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
    company: "TechRetail Co.",
    industry: "E-commerce",
    visualType: "ecommerce" as const,
    stat: { value: 80, suffix: "%", label: "atendidas por IA" },
    result: "Pasaron de 500 consultas diarias sin responder a atención automatizada en 3 segundos. Su equipo ahora se enfoca en ventas estratégicas.",
    color: "#FF6B35",
  },
  {
    company: "Clinica Salud+",
    industry: "Salud",
    visualType: "health" as const,
    stat: { value: 60, suffix: "%", label: "menos cancelaciones" },
    result: "Sistema de agendamiento inteligente 24/7. Los pacientes reservan cuando quieren y los doctores optimizan su tiempo.",
    color: "#00D9FF",
  },
  {
    company: "LogiMax",
    industry: "Logistica",
    visualType: "logistics" as const,
    stat: { value: 3, suffix: "x", label: "mas cotizaciones" },
    result: "Nuevo sitio web + automatización de cotizaciones. Triplicaron leads calificados y recuperaron la inversión en 2 meses.",
    color: "#8B5CF6",
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
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="group relative overflow-hidden rounded-[2rem] bg-card border border-border cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Visual */}
        <div className="relative aspect-[4/3] overflow-hidden bg-background/30">
          <CaseVisual type={caseData.visualType} className="w-full h-full" />
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-80" : "opacity-30"}`}
            style={{ background: `linear-gradient(to top, ${caseData.color}, transparent)` }}
          />

          {/* Big stat overlay on hover */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-card transition-all duration-500 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-7xl font-bold font-serif lg:text-8xl">
              <AnimatedCounter target={caseData.stat.value} suffix={caseData.stat.suffix} />
            </span>
            <span className="mt-2 text-base font-medium opacity-90">{caseData.stat.label}</span>
          </div>

          {/* Industry badge */}
          <div className="absolute top-4 left-4">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-card"
              style={{ backgroundColor: caseData.color }}
            >
              {caseData.industry}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h4 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>{caseData.company}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{caseData.result}</p>
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
      <div className="relative py-24 lg:py-32">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 -top-64 -right-64 blur-3xl animate-blob" />
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 -bottom-64 -left-64 blur-3xl animate-blob"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div
            ref={titleRef}
            className={`mb-20 text-center transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
              Casos de exito
            </span>
            <h2 className="text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Resultados reales de
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">clientes reales.</span>
            </h2>
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
