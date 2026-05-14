"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Footer() {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <footer ref={ref} className="relative bg-background text-foreground overflow-hidden border-t border-border/20">

      <div
        className={`relative mx-auto max-w-7xl px-6 pt-20 pb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Big CTA section */}
        <div className="mb-16 text-center">
          <h3
            className="text-3xl font-bold text-foreground lg:text-5xl text-balance leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
          >
            Transforma tu negocio con
            <br />
            <span className="text-primary">inteligencia artificial.</span>
          </h3>
          <a
            href="#contacto"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-[0.98]"
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
              <img src="/logo.png" alt="Zifro" className="h-8 w-auto object-contain" />
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
                  { label: "Testimonios", href: "#testimonios" },
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
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "GitHub", href: "https://github.com" },
                  { label: "hola@zifro.dev", href: "mailto:hola@zifro.dev" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm opacity-50 transition-all duration-300 hover:opacity-100 hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] opacity-30 mb-4">Legal</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Privacidad", href: "/privacidad" },
                  { label: "Terminos", href: "/terminos" },
                  { label: "Cookies", href: "/cookies" },
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
          <p className="text-xs opacity-40">© 2026 Zifro. Todos los derechos reservados.</p>
          <p className="text-xs opacity-40">Hecho en Buenos Aires · Trabajamos remoto</p>
        </div>
      </div>
    </footer>
  )
}
