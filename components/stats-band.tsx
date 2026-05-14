"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useEffect, useState } from "react"

const stats = [
  { target: 47, suffix: "", label: "Proyectos entregados" },
  { target: 96, suffix: "%", label: "Clientes que repiten" },
  { target: 2.3, suffix: "s", label: "Tiempo de respuesta IA" },
  { target: 18, suffix: "h", label: "Ahorradas por semana" },
]

function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let current = 0
    const isDecimal = target % 1 !== 0
    const steps = 50
    const increment = target / steps
    const id = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(id)
      }
      setValue(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current))
    }, 30)
    return () => clearInterval(id)
  }, [inView, target])

  return (
    <span style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>
      {target % 1 !== 0 ? value.toFixed(1) : value}{suffix}
    </span>
  )
}

export function StatsBand() {
  const { ref, isVisible } = useScrollReveal(0.3)

  return (
    <section
      ref={ref}
      className="relative bg-background py-16 lg:py-24 overflow-hidden"
    >
      {/* Top editorial line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative text-center lg:text-left"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Large number */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-none mb-2">
                <AnimatedNumber target={stat.target} suffix={stat.suffix} inView={isVisible} />
              </div>
              {/* Label */}
              <div
                className="text-xs sm:text-sm text-muted-foreground font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.label}
              </div>
              {/* Decorative accent dot */}
              <div className="absolute -top-2 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-1 h-1 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom editorial line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
