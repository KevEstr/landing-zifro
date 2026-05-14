"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Shield, Clock, Headphones, Code2 } from "lucide-react"

const items = [
  { icon: Shield, text: "Sin contratos de permanencia" },
  { icon: Clock, text: "Respuesta en menos de 24h" },
  { icon: Headphones, text: "Soporte dedicado" },
  { icon: Code2, text: "Codigo 100% tuyo" },
]

export function TrustStrip() {
  const { ref, isVisible } = useScrollReveal(0.3)

  return (
    <div
      ref={ref}
      className={`relative bg-background py-12 lg:py-16 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:gap-x-16">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="flex items-center gap-2.5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                <span
                  className="text-sm font-medium text-foreground/80"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
