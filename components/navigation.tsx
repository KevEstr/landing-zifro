"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeHash, setActiveHash] = useState<string>("#inicio")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      // Detect active section
      const sections = navLinks.map((l) => l.href)
      const offset = window.innerHeight * 0.35
      let current = sections[0]
      for (const id of sections) {
        const el = document.querySelector(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top - offset <= 0) current = id
        }
      }
      setActiveHash(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/60 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* Logo */}
        <a href="#inicio" className="flex items-center group pl-1 sm:pl-2">
          <div className="relative h-6 sm:h-7 lg:h-8 transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="Zifro" 
              className="h-full w-auto object-contain"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive
                      ? "left-4 w-[calc(100%-2rem)]"
                      : "left-1/2 w-0 group-hover:left-4 group-hover:w-[calc(100%-2rem)]"
                  }`}
                />
              </a>
            )
          })}
          <a
            href="#contacto"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Hablemos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary md:hidden"
          aria-label={isMobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 right-0 top-full bg-card/95 backdrop-blur-xl shadow-lg transition-all duration-300 md:hidden ${
          isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setIsMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Hablemos
          </a>
        </div>
      </div>
    </nav>
  )
}
