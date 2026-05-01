"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState } from "react"
import Image from "next/image"

const testimonials = [
  {
    quote: "Pasamos de perder reservas por teléfono a tener todo automatizado. Ahora el hotel se gestiona solo y nosotros dormimos tranquilos.",
    author: "Carlos Méndez",
    role: "Gerente General",
    company: "Hotel Guacarí",
    industry: "Hotelería",
    image: "https://i.pravatar.cc/150?img=12",
    metric: { value: "100%", label: "digitalizado" },
    color: "#FF6B35",
  },
  {
    quote: "Antes perdíamos 3 horas diarias en papeles y planillas. Ahora todo es automático y los instructores solo se preocupan por enseñar.",
    author: "Ana Rodríguez",
    role: "Directora",
    company: "Academia Ritmo & Volley",
    industry: "Educación Deportiva",
    image: "https://i.pravatar.cc/150?img=45",
    metric: { value: "85%", label: "menos admin" },
    color: "#00D9FF",
  },
  {
    quote: "Triplicamos las ventas sin contratar más gente. El sistema hace el trabajo pesado y nosotros nos enfocamos en crecer.",
    author: "Roberto Sánchez",
    role: "Socio Fundador",
    company: "Distribuidora Sandwich Express",
    industry: "Distribución Mayorista",
    image: "https://i.pravatar.cc/150?img=33",
    metric: { value: "3x", label: "más ventas" },
    color: "#8B5CF6",
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="group relative h-full rounded-[2rem] border-2 bg-card p-8 transition-all duration-500 hover:shadow-2xl"
        style={{
          borderColor: isHovered ? testimonial.color : "var(--border)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Quote mark decorativo */}
        <div
          className="absolute -top-4 -left-4 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl font-serif transition-all duration-500"
          style={{
            backgroundColor: `${testimonial.color}15`,
            color: testimonial.color,
            transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
          }}
        >
          "
        </div>

        {/* Industry tag */}
        <div className="absolute top-6 right-6">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${testimonial.color}15`,
              color: testimonial.color,
            }}
          >
            {testimonial.industry}
          </span>
        </div>

        {/* Testimonial text */}
        <blockquote className="relative mb-8 mt-12">
          <p className="text-lg leading-relaxed text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            {testimonial.quote}
          </p>
        </blockquote>

        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2" style={{ borderColor: testimonial.color }}>
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex-1">
            <div className="font-bold text-foreground mb-1">{testimonial.author}</div>
            <div className="text-sm text-muted-foreground mb-0.5">{testimonial.role}</div>
            <div className="text-sm font-medium" style={{ color: testimonial.color }}>
              {testimonial.company}
            </div>
          </div>
        </div>

        {/* Metric badge */}
        <div
          className="absolute -bottom-4 -right-4 rounded-2xl px-6 py-3 shadow-lg transition-all duration-500"
          style={{
            backgroundColor: testimonial.color,
            transform: isHovered ? "scale(1.1) rotate(3deg)" : "scale(1) rotate(0deg)",
          }}
        >
          <div className="text-2xl font-bold text-white leading-none mb-1">{testimonial.metric.value}</div>
          <div className="text-xs uppercase tracking-wider text-white/90 leading-none">{testimonial.metric.label}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  return (
    <section id="testimonios" className="relative bg-background py-12 lg:py-16 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`mb-12 lg:mb-16 text-center transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
            Lo que dicen
          </span>
          <h2
            className="text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Empresas reales,
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              resultados reales.
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            No vendemos humo. Estas son las palabras de quienes ya transformaron su negocio con nosotros.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.company} testimonial={testimonial} index={i} />
          ))}
        </div>

        {/* Social proof footer */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-300 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border bg-card/50 px-8 py-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground leading-none mb-2" style={{ fontFamily: "var(--font-display)" }}>
                50+
              </div>
              <div className="text-sm text-muted-foreground leading-none">Proyectos entregados</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground leading-none mb-2" style={{ fontFamily: "var(--font-display)" }}>
                99%
              </div>
              <div className="text-sm text-muted-foreground leading-none">Clientes satisfechos</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground leading-none mb-2" style={{ fontFamily: "var(--font-display)" }}>
                3x
              </div>
              <div className="text-sm text-muted-foreground leading-none">ROI promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
