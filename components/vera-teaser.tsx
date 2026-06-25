"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  ArrowUpRight,
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  CheckCheck,
  Mic,
  Play,
} from "lucide-react"

const KICKER: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  letterSpacing: "0.3em",
}
const DISPLAY: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  letterSpacing: "-0.035em",
}

const DOODLE =
  "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.018'%3E%3Cpath d='M20 12l2 6h-4zM58 30c3 0 5 2 5 5s-2 5-5 5M12 50l6 2-6 2zM64 58l-5 4 1-6z'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E\")"

const TAIL_IN: React.CSSProperties = { clipPath: "polygon(100% 0, 0 0, 100% 100%)" }
const TAIL_OUT: React.CSSProperties = { clipPath: "polygon(0 0, 100% 0, 0 100%)" }

type Step =
  | { from: "in" | "out"; kind: "text"; text: string }
  | { from: "in"; kind: "voice"; dur: string }

const script: Step[] = [
  { from: "in", kind: "text", text: "Hola! ¿tienen cupo para corte hoy? 💈" },
  { from: "out", kind: "text", text: "¡Hola! Sí 😊 tengo a las 4 o a las 6 con Andrés. ¿Cuál te sirve?" },
  { from: "in", kind: "voice", dur: "0:06" },
  { from: "out", kind: "text", text: "¡Listo! Te agendo a las 4 para corte y barba ✂️" },
  { from: "in", kind: "text", text: "Mil gracias 🙌" },
  { from: "out", kind: "text", text: "A ti 💈 te llega un recordatorio una hora antes ✅" },
]

function useTypewriterThread(active: boolean) {
  const [count, setCount] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!active) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const run = (i: number) => {
      if (cancelled) return
      if (i >= script.length) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return
            setCount(0)
            run(0)
          }, 4000)
        )
        return
      }
      const isOut = script[i].from === "out"
      if (isOut) setTyping(true)
      timers.push(
        setTimeout(
          () => {
            if (cancelled) return
            setTyping(false)
            setCount(i + 1)
            timers.push(setTimeout(() => run(i + 1), script[i].kind === "voice" ? 1600 : 1300))
          },
          isOut ? 1000 : 600
        )
      )
    }

    timers.push(setTimeout(() => run(0), 500))
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [active])

  return { count, typing }
}

export function VeraTeaser() {
  const { ref, isVisible } = useScrollReveal(0.2)
  const { count, typing } = useTypewriterThread(isVisible)
  const shown = script.slice(0, count)

  return (
    <section id="vera" className="relative overflow-hidden bg-background py-20 lg:py-28">
      {/* grid editorial sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        ref={ref}
        className={`relative mx-auto grid max-w-7xl items-center gap-14 px-6 transition-all duration-1000 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* ── Teléfono ── */}
        <div className="order-2 mx-auto w-full max-w-[300px] sm:max-w-[330px] lg:order-1 lg:max-w-[360px]">
          <div className="relative rounded-[2.4rem] border border-white/10 bg-[#05080c] p-2.5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
            <div className="absolute left-1/2 top-3 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
            <div className="overflow-hidden rounded-[2rem]">
              {/* header WhatsApp */}
              <div className="flex items-center gap-2 bg-[#202c33] px-2.5 pb-2 pt-5">
                <ArrowLeft className="h-4 w-4 text-[#8696a0]" strokeWidth={2.2} />
                <div className="relative">
                  <img src="/agente.jpg" alt="Ziff" className="h-8 w-8 rounded-full object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#202c33] bg-emerald-400" />
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-[#e9edef]">Ziff</span>
                    <span className="rounded-[3px] bg-primary/25 px-1 text-[7px] font-bold uppercase text-primary">IA</span>
                  </div>
                  <div className="text-[10px] text-emerald-400">{typing ? "escribiendo…" : "en línea"}</div>
                </div>
                <Video className="h-[18px] w-[18px] text-[#8696a0]" strokeWidth={2} />
                <Phone className="h-4 w-4 text-[#8696a0]" strokeWidth={2} />
                <MoreVertical className="h-4 w-4 text-[#8696a0]" strokeWidth={2} />
              </div>

              {/* body */}
              <div
                className="flex h-[340px] flex-col justify-end gap-[3px] px-3 py-3"
                style={{ backgroundImage: DOODLE, backgroundColor: "#0b141a" }}
              >
                {shown.map((s, i) =>
                  s.kind === "voice" ? (
                    <Voice key={i} dur={s.dur} />
                  ) : s.from === "in" ? (
                    <In key={i}>{s.text}</In>
                  ) : (
                    <Out key={i}>{s.text}</Out>
                  )
                )}
                {typing && <TypingBubble />}
              </div>

              {/* input bar */}
              <div className="flex items-center gap-2 bg-[#0b141a] px-2.5 py-2">
                <div className="flex flex-1 items-center rounded-full bg-[#202c33] px-3 py-1.5 text-[11px] text-[#8696a0]">
                  Escribe un mensaje
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a884]">
                  <Mic className="h-4 w-4 text-[#0b141a]" strokeWidth={2.2} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Texto a la derecha ── */}
        <div className="order-1 lg:order-2">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[11px] font-semibold uppercase text-primary" style={KICKER}>
              Nuevo producto
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-[1.02] text-foreground text-balance sm:text-5xl lg:text-6xl xl:text-7xl" style={DISPLAY}>
            Conoce a <span className="text-primary">Ziff.</span>
            <br />
            <span className="text-foreground/40">Vende por ti</span> en WhatsApp.
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground lg:text-lg">
            Atiende a tus clientes, les muestra tus productos y cierra ventas. A cualquier hora.
          </p>

          <Link
            href="/ziff"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]"
          >
            Ver todo lo que hace
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Burbujas ── */
function In({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-[82%] self-start animate-task-slide-in">
      <span className="absolute -left-[6px] top-0 h-2 w-2 bg-[#202c33]" style={TAIL_IN} />
      <div className="rounded-lg rounded-tl-none bg-[#202c33] px-2 py-1.5 pr-3 text-[13px] leading-[18px] text-[#e9edef]">
        {children}
        <span className="float-right -mb-0.5 ml-2 mt-1 text-[10px] text-[#8696a0]">9:41</span>
      </div>
    </div>
  )
}

function Out({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-[82%] self-end animate-task-slide-in">
      <span className="absolute -right-[6px] top-0 h-2 w-2 bg-[#005c4b]" style={TAIL_OUT} />
      <div className="rounded-lg rounded-tr-none bg-[#005c4b] px-2 py-1.5 pr-3 text-[13px] leading-[18px] text-[#e9edef]">
        {children}
        <span className="float-right -mb-0.5 ml-2 mt-1 inline-flex items-center gap-0.5 text-[10px] text-[#8696a0]">
          9:41 <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="relative max-w-[60%] self-end">
      <span className="absolute -right-[6px] top-0 h-2 w-2 bg-[#005c4b]" style={TAIL_OUT} />
      <div className="flex w-fit items-center gap-1 rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/70 animate-typing-dot" style={{ animationDelay: `${d * 0.18}s` }} />
        ))}
      </div>
    </div>
  )
}

function Voice({ dur }: { dur: string }) {
  const bars = [0.4, 0.8, 1, 0.5, 0.9, 0.35, 0.7, 0.55, 1, 0.45, 0.75, 0.5]
  return (
    <div className="relative max-w-[82%] self-start animate-task-slide-in">
      <span className="absolute -left-[6px] top-0 h-2 w-2 bg-[#202c33]" style={TAIL_IN} />
      <div className="flex w-[200px] items-center gap-2 rounded-lg rounded-tl-none bg-[#202c33] px-2 py-2">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#ff8a3d]">
          <Mic className="h-3.5 w-3.5 text-white" />
        </div>
        <Play className="h-4 w-4 flex-shrink-0 fill-[#8696a0] text-[#8696a0]" />
        <div className="flex h-5 flex-1 items-center gap-[2px]">
          {bars.map((h, i) => (
            <span key={i} className="w-[2px] rounded-full bg-[#8696a0]" style={{ height: `${h * 100}%`, opacity: 0.5 + h * 0.4 }} />
          ))}
        </div>
        <span className="flex-shrink-0 text-[10px] text-[#8696a0] tabular-nums">{dur}</span>
      </div>
    </div>
  )
}
