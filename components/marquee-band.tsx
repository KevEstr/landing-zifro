"use client"

import { Sparkles } from "lucide-react"

const items = [
  "Agentes Inteligentes",
  "Desarrollo Web",
  "Automatizacion",
  "Machine Learning",
  "Chatbots IA",
  "Integraciones API",
  "Analisis de Datos",
  "Experiencias Unicas",
  "Flujos n8n",
  "GPT-4 · Claude · Gemini",
]

export function MarqueeBand() {
  return (
    <div className="relative bg-background overflow-hidden border-y border-border/30">
      {/* Top + bottom thin lines for editorial weight */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap py-5 lg:py-6">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 sm:mx-10 flex items-center gap-3 sm:gap-4"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/60 flex-shrink-0" strokeWidth={2} />
            <span
              className="text-sm sm:text-base font-semibold uppercase text-foreground/70"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.18em" }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
