"use client"

const items = [
  { text: "Agentes Inteligentes" },
  { text: "Desarrollo Web" },
  { text: "Automatizacion" },
  { text: "Machine Learning" },
  { text: "Chatbots IA" },
  { text: "Alto Rendimiento" },
  { text: "Flujos Inteligentes" },
  { text: "Integraciones API" },
  { text: "Analisis de Datos" },
  { text: "Experiencias Unicas" },
]

export function MarqueeBand() {
  return (
    <div className="relative bg-background overflow-hidden py-6 border-y border-border">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            <svg width="6" height="6" viewBox="0 0 6 6" className="flex-shrink-0">
              <circle cx="3" cy="3" r="3" fill="currentColor" opacity="0.4" />
            </svg>
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
