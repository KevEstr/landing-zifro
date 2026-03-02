"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Footer() {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <footer ref={ref} className="relative bg-secondary text-foreground overflow-hidden border-t border-border/20">
      {/* Decorative SVG background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="30%" r="100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 10 30" to="360 10 30" dur="30s" repeatCount="indefinite" />
          </circle>
          <circle cx="90%" cy="60%" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8">
            <animateTransform attributeName="transform" type="rotate" from="360 90 60" to="0 90 60" dur="25s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="80%" r="150" fill="none" stroke="currentColor" strokeWidth="0.3">
            <animateTransform attributeName="transform" type="rotate" from="0 50 80" to="360 50 80" dur="40s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div
        className={`relative mx-auto max-w-7xl px-6 pt-20 pb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Big CTA section */}
        <div className="mb-16 text-center">
          <h3 className="text-4xl font-bold lg:text-6xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Transforma tu negocio con
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              inteligencia artificial.
            </span>
          </h3>
          <a
            href="#contacto"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1"
          >
            Agenda una llamada
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Logo + links */}
        <div className="flex flex-col gap-10 border-t border-border/20 pt-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
                <span className="text-2xl font-bold text-primary-foreground font-serif">Z</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Zifro</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed opacity-50">
              Desarrollamos agentes de IA, sitios web y automatizaciones que impulsan el crecimiento de tu negocio.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] opacity-30 mb-4">Navega</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Inicio", href: "#inicio" },
                  { label: "Servicios", href: "#servicios" },
                  { label: "Resultados", href: "#resultados" },
                  { label: "Contacto", href: "#contacto" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm opacity-50 transition-all duration-300 hover:opacity-100 hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] opacity-30 mb-4">Conecta</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "LinkedIn", href: "#" },
                  { label: "Twitter / X", href: "#" },
                  { label: "GitHub", href: "#" },
                  { label: "hola@zifro.dev", href: "mailto:hola@zifro.dev" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm opacity-50 transition-all duration-300 hover:opacity-100 hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/20 pt-8 sm:flex-row">
          <p className="text-xs opacity-30">© 2026 Zifro. Todos los derechos reservados.</p>
          <p className="text-xs opacity-30">Desarrollado con tecnología de vanguardia.</p>
        </div>
      </div>
    </footer>
  )
}
