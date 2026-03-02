"use client"

import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Send } from "lucide-react"
import { MatrixRain } from "./matrix-rain"

export function ContactSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.1)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: "", email: "", company: "", message: "" })
  }

  return (
    <section id="contacto" className="relative bg-background overflow-hidden">
      {/* Matrix rain background */}
      <div className="relative w-full h-[40vh] lg:h-[45vh] overflow-hidden bg-muted/20">
        <MatrixRain density={0.98} />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background/60 to-background" />

        {/* Floating text over illustration */}
        <div
          ref={titleRef}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 bg-secondary/90 backdrop-blur-xl px-4 py-1.5 rounded-full border border-primary/30">
            Contacto
          </span>
          <h2 className="text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            <span className="bg-secondary/90 backdrop-blur-xl px-6 py-2 rounded-2xl inline-block border border-border/30">
              Hablemos de tu{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">proyecto.</span>
            </span>
          </h2>
        </div>
      </div>

      <div className="relative -mt-20 mx-auto max-w-4xl px-6 pb-24 lg:pb-32">
        <div
          ref={formRef}
          className={`transition-all duration-1000 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
        >
          <div className="rounded-[2rem] border border-border/20 bg-background/80 backdrop-blur-xl p-8 lg:p-12 shadow-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-scale-in">
                <div className="relative mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 border-4 border-accent">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="absolute -inset-4 rounded-full bg-accent/10 animate-ping" />
                </div>
                <h4 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>¡Mensaje recibido!</h4>
                <p className="mt-3 text-lg text-muted-foreground">
                  Nos pondremos en contacto contigo en menos de 24 horas. Gracias por confiar en Zifro.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Quick info pills */}
                <div className="flex flex-wrap gap-3 justify-center mb-4">
                  {[
                    { text: "Consulta sin costo", color: "accent" },
                    { text: "Respuesta en 24 horas", color: "primary" },
                    { text: "Sin compromiso", color: "muted" },
                  ].map((pill) => (
                    <div
                      key={pill.text}
                      className="flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 border border-border"
                    >
                      <div className={`h-2 w-2 rounded-full bg-${pill.color}`} />
                      <span className="text-sm font-semibold text-foreground">{pill.text}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-bold text-foreground">
                      Tu nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={`rounded-2xl border-2 bg-secondary/80 backdrop-blur-sm px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none ${
                        focusedField === "name"
                          ? "border-primary shadow-lg shadow-primary/10 bg-secondary"
                          : "border-border/30 hover:border-primary/30"
                      }`}
                      placeholder="Juan Perez"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-bold text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={`rounded-2xl border-2 bg-secondary/80 backdrop-blur-sm px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none ${
                        focusedField === "email"
                          ? "border-primary shadow-lg shadow-primary/10 bg-secondary"
                          : "border-border/30 hover:border-primary/30"
                      }`}
                      placeholder="juan@empresa.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-sm font-bold text-foreground">
                    Empresa{" "}
                    <span className="text-muted-foreground font-normal">(opcional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formState.company}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    className={`rounded-2xl border-2 bg-secondary/80 backdrop-blur-sm px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none ${
                      focusedField === "company"
                        ? "border-accent shadow-lg shadow-accent/10 bg-secondary"
                        : "border-border/30 hover:border-accent/30"
                    }`}
                    placeholder="Tu empresa"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-foreground">
                    Cuentanos sobre tu proyecto
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`rounded-2xl border-2 bg-secondary/80 backdrop-blur-sm px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none resize-none ${
                      focusedField === "message"
                        ? "border-accent shadow-lg shadow-accent/10 bg-secondary"
                        : "border-border/30 hover:border-accent/30"
                    }`}
                    placeholder="Ejemplo: Necesito un chatbot para mi tienda online que atienda consultas de productos..."
                  />
                </div>

                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-3 self-center rounded-full bg-primary px-12 py-5 text-lg font-bold text-primary-foreground transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Enviar mensaje
                    <Send
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact info below form */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <a
            href="mailto:hola@zifro.dev"
            className="group flex items-center gap-3 rounded-full bg-card px-6 py-3 border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span className="text-sm font-semibold text-foreground">hola@zifro.dev</span>
          </a>
          <div className="flex items-center gap-3 rounded-full bg-card px-6 py-3 border border-border shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className="text-sm font-semibold text-foreground">Remoto - Global</span>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-card px-6 py-3 border border-border shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span className="text-sm font-semibold text-foreground">{"Respuesta < 24h"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
