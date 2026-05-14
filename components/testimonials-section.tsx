"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useEffect, useState } from "react"
import Image from "next/image"

const testimonials = [
  {
    short: "El hotel se gestiona solo.",
    author: "Carlos Mendez",
    company: "Hotel Guacari",
    image: "https://robohash.org/carlos-mendez-hotel?set=set1&size=200x200&bgset=bg2",
    metric: "100%",
    label: "digitalizado",
  },
  {
    short: "Triplicamos ventas sin contratar.",
    author: "Roberto Sanchez",
    company: "Que Cubano",
    image: "https://robohash.org/roberto-sanchez-cubano?set=set1&size=200x200&bgset=bg2",
    metric: "3.2x",
    label: "mas ventas",
  },
  {
    short: "Recuperamos 3 horas al dia.",
    author: "Ana Rodriguez",
    company: "Ritmo & Volley",
    image: "https://robohash.org/ana-rodriguez-academy?set=set1&size=200x200&bgset=bg2",
    metric: "83%",
    label: "menos admin",
  },
]

export function TestimonialsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx(i => (i + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="testimonios"
      className="relative bg-background py-12 lg:py-16 overflow-hidden"
      aria-labelledby="testimonios-title"
    >
      {/* Top editorial line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 77, 0, 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Compact header */}
        <div
          ref={titleRef}
          className={`mb-10 lg:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span
                className="text-[11px] font-semibold uppercase text-primary"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.3em" }}
              >
                Lo que dicen
              </span>
            </div>
            <h2
              id="testimonios-title"
              className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Resultados, no promesas.
            </h2>
          </div>
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Ver testimonio ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIdx
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stage with overlapping quotes */}
        <div className="relative h-[280px] sm:h-[260px] lg:h-[300px]">
          {testimonials.map((t, i) => {
            const isActive = i === activeIdx
            const isPrev = i === (activeIdx - 1 + testimonials.length) % testimonials.length
            const isNext = i === (activeIdx + 1) % testimonials.length

            return (
              <article
                key={t.company}
                aria-hidden={!isActive}
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-all duration-1000
                `}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  opacity: isActive ? 1 : isPrev || isNext ? 0.08 : 0,
                  transform: isActive
                    ? "scale(1) translateX(0)"
                    : isPrev
                    ? "scale(0.92) translateX(-8%)"
                    : isNext
                    ? "scale(0.92) translateX(8%)"
                    : "scale(0.85)",
                  pointerEvents: isActive ? "auto" : "none",
                  filter: isActive ? "blur(0)" : "blur(2px)",
                }}
              >
                <div className="w-full max-w-4xl text-center px-4">
                  {/* Giant quote text */}
                  <p
                    className="text-3xl font-bold text-foreground sm:text-4xl lg:text-6xl leading-[1.1]"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                  >
                    <span className="text-primary mr-2">&ldquo;</span>
                    {t.short}
                    <span className="text-primary ml-1">&rdquo;</span>
                  </p>

                  {/* Author + metric inline */}
                  <div className="mt-8 lg:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 lg:h-11 lg:w-11 overflow-hidden rounded-full border border-border/60 flex-shrink-0">
                        <Image src={t.image} alt={`Retrato de ${t.author}`} fill className="object-cover" sizes="44px" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm lg:text-base font-semibold text-foreground leading-tight">{t.author}</div>
                        <div className="text-xs lg:text-sm text-muted-foreground leading-tight">{t.company}</div>
                      </div>
                    </div>

                    {/* Vertical separator */}
                    <div className="hidden sm:block h-10 w-px bg-border/60" />

                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-3xl lg:text-4xl font-bold text-primary tabular-nums"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
                      >
                        {t.metric}
                      </span>
                      <span className="text-xs lg:text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        {t.label}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Compact stat strip */}
      </div>
    </section>
  )
}
