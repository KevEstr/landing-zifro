"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Clock, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"

const Footer = dynamic(
  () => import("./footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[20vh]" /> }
)

export type TocItem = { id: string; title: string }

interface LegalShellProps {
  kicker: string
  title: React.ReactNode
  subtitle: string
  lastUpdated: string
  readingTime: string
  toc: TocItem[]
  children: React.ReactNode
}

export function LegalShell({
  kicker,
  title,
  subtitle,
  lastUpdated,
  readingTime,
  toc,
  children,
}: LegalShellProps) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "")

  useEffect(() => {
    const headings = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [toc])

  return (
    <main className="relative bg-background text-foreground">
      <Navigation />

      {/* ════════ HERO BAND ════════ */}
      <header
        className="relative overflow-hidden border-b border-border/30 pt-32 pb-16 lg:pt-40 lg:pb-24"
        style={{
          background:
            "linear-gradient(180deg, #0a0e14 0%, #0c1119 60%, #0a0e14 100%)",
        }}
      >
        {/* ambient orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 30%, rgba(255,77,0,0.08) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,77,0,0.04) 0%, transparent 55%)",
          }}
        />
        {/* grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* breadcrumb / back */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Volver al inicio
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                <span
                  className="text-[11px] font-semibold uppercase text-primary"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.3em",
                  }}
                >
                  {kicker}
                </span>
              </div>

              <h1
                className="mt-6 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-7xl"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.035em",
                }}
              >
                {title}
              </h1>

              <p
                className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                style={{ textWrap: "pretty" as React.CSSProperties["textWrap"] }}
              >
                {subtitle}
              </p>
            </div>

            {/* meta card */}
            <aside className="flex flex-col gap-3 self-end rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl lg:min-w-[260px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Vigente desde
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <span
                className="text-lg font-semibold tabular-nums text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lastUpdated}
              </span>
              <div className="mt-1 flex items-center gap-2 border-t border-border/30 pt-3 text-xs text-muted-foreground">
                <Clock size={12} />
                <span className="tabular-nums">{readingTime}</span>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* ════════ CONTENT ════════ */}
      <article className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* sticky TOC */}
          <nav
            aria-label="Tabla de contenidos"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-xl">
              <p
                className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Contenido
              </p>
              <ol className="flex flex-col gap-1">
                {toc.map((item, idx) => {
                  const isActive = activeId === item.id
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`group flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 ${
                          isActive
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-block w-6 text-[10px] font-semibold tabular-nums tracking-wider transition-colors ${
                            isActive ? "text-primary" : "text-muted-foreground/60"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 leading-snug">
                          {item.title}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ol>
            </div>
          </nav>

          {/* main copy */}
          <div className="min-w-0 max-w-3xl">{children}</div>
        </div>

        {/* ════════ CONTACT CARD ════════ */}
        <div className="mt-20 lg:mt-28">
          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/40 p-8 backdrop-blur-xl sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 90% 10%, rgba(255,77,0,0.10) 0%, transparent 50%)",
              }}
            />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-primary" />
                  <span
                    className="text-[11px] font-semibold uppercase text-primary"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.3em",
                    }}
                  >
                    Asuntos legales
                  </span>
                </div>
                <h3
                  className="mt-4 text-2xl font-bold leading-tight sm:text-3xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ¿Tienes una pregunta sobre este documento?
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Respondemos solicitudes formales y consultas sobre privacidad,
                  datos personales y términos contractuales en máximo 15 días
                  hábiles.
                </p>
              </div>
              <a
                href="mailto:legal@zifro.dev"
                className="group inline-flex items-center justify-center gap-3 self-start rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] lg:self-auto"
              >
                <Mail size={16} />
                legal@zifro.dev
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

/* ──────────── SECTION HELPER ──────────── */

interface LegalSectionProps {
  id: string
  index: number
  title: string
  children: React.ReactNode
}

export function LegalSection({
  id,
  index,
  title,
  children,
}: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border/30 py-12 first:border-t-0 first:pt-0">
      <div className="mb-6 flex items-baseline gap-5">
        <span
          className="select-none text-3xl font-semibold tabular-nums text-primary/40 sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden
        >
          {String(index).padStart(2, "0")}
        </span>
        <h2
          className="text-2xl font-bold leading-tight sm:text-3xl"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  )
}

/* ──────────── PROSE HELPERS ──────────── */

export function LegalLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
      {children}
    </p>
  )
}

export function LegalList({
  items,
  variant = "bullet",
}: {
  items: Array<React.ReactNode | { term: string; description: React.ReactNode }>
  variant?: "bullet" | "definition"
}) {
  if (variant === "definition") {
    return (
      <dl className="mt-2 space-y-3">
        {items.map((item, i) => {
          const it = item as { term: string; description: React.ReactNode }
          return (
            <div
              key={i}
              className="rounded-xl border border-border/30 bg-card/30 p-4"
            >
              <dt className="text-sm font-semibold text-foreground">
                {it.term}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {it.description}
              </dd>
            </div>
          )
        })}
      </dl>
    )
  }

  return (
    <ul className="mt-2 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-2 h-1 w-1.5 shrink-0 rounded-full bg-primary"
          />
          <span className="flex-1">{item as React.ReactNode}</span>
        </li>
      ))}
    </ul>
  )
}
