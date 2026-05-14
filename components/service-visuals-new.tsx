"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  Zap,
  ShoppingBag,
  Package,
  Mail,
  FileText,
  ArrowUpRight,
  Users,
  Activity,
  Check,
} from "lucide-react"

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/**
 * Glass chip — slightly warm tint to harmonize with brand orange.
 * The shadow and border carry a faint orange hue so chips feel part
 * of the page palette instead of floating monochrome boxes.
 */
const CHIP = `
  bg-[rgba(18,16,18,0.82)]
  backdrop-blur-[14px]
  border border-white/[0.09]
  shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_14px_44px_-14px_rgba(255,77,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.6)]
`

const CHIP_ACTIVE = `
  bg-[rgba(28,22,20,0.92)]
  backdrop-blur-[14px]
  border border-primary/30
  shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_55px_-12px_rgba(255,77,0,0.25)]
`

// Live indicator — uses brand primary for cohesion
function LiveDot({ size = "md" }: { size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-1 w-1" : "h-1.5 w-1.5"
  return (
    <span className={`${s} relative inline-flex`}>
      <span className={`absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping`} />
      <span className={`relative inline-flex rounded-full ${s} bg-primary`} />
    </span>
  )
}

// Reusable styles for typography integration
const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  letterSpacing: "0.18em",
}

const NUM_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "-0.02em",
}

// ═══════════════════════════════════════════════════════════════════════════
// AGENT VISUAL — Live Voice Command Center: waveform + action stack + progress
// ═══════════════════════════════════════════════════════════════════════════

export function AgentVisual({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView(0.3)
  const [activeTask, setActiveTask] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completedLog, setCompletedLog] = useState<number[]>([])
  const [waveBars, setWaveBars] = useState<number[]>(() => Array(7).fill(0.3))

  // Tasks the agent is "doing" live
  const tasks = [
    { label: "Reservando mesa",      sub: "Viernes · 21:00 · 4 pax",  duration: 2200 },
    { label: "Consultando inventario", sub: "Modelo X200 · 12 unidades", duration: 1800 },
    { label: "Enviando confirmacion",  sub: "cliente@email.com",        duration: 1400 },
    { label: "Actualizando CRM",       sub: "Lead movido a 'Cerrado'",  duration: 1600 },
    { label: "Reprogramando cita",     sub: "Jueves 16 · 10:00",        duration: 2000 },
  ]

  // Cycle tasks — use setInterval instead of rAF for less CPU pressure
  useEffect(() => {
    if (!inView) return
    let cancelled = false
    let timer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    const runTask = (idx: number) => {
      if (cancelled) return
      setActiveTask(idx)
      setProgress(0)
      const t = tasks[idx]
      const start = Date.now()

      progressTimer = setInterval(() => {
        if (cancelled) return
        const p = Math.min((Date.now() - start) / t.duration, 1)
        setProgress(p)
        if (p >= 1) {
          clearInterval(progressTimer)
          setCompletedLog(prev => [idx, ...prev].slice(0, 3))
          timer = setTimeout(() => runTask((idx + 1) % tasks.length), 600)
        }
      }, 50) // 20fps is enough for a progress bar
    }

    runTask(0)
    return () => { cancelled = true; clearTimeout(timer); clearInterval(progressTimer) }
  }, [inView])

  // Waveform animation - CSS-driven instead of JS state updates
  // Use a single interval at lower frequency
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setWaveBars(Array(7).fill(0).map(() => 0.25 + Math.random() * 0.75))
    }, 300) // Reduced from 130ms to 300ms — still looks alive, 70% fewer renders
    return () => clearInterval(id)
  }, [inView])

  const currentTask = tasks[activeTask]
  // SVG circle math for progress ring
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      {/* Robot */}
      <div className="relative w-full h-full z-[2]">
        <Image
          src="/robot.png"
          alt="Asistente virtual inteligente"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={false}
        />
      </div>

      {/* ── TOP RIGHT: Live voice waveform ──────────────────────────────── */}
      <div className="absolute right-1 top-1 md:right-3 md:top-3 z-[4] animate-fade-in-scale origin-top-right scale-[0.7] md:scale-100">
        <div className={`${CHIP} rounded-lg px-2 py-1.5 md:px-2.5 md:py-2`}>
          <div className="flex items-center gap-1.5 mb-1 md:mb-1.5">
            <LiveDot size="sm" />
            <span className="text-[9px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>
              Escuchando
            </span>
          </div>
          {/* Vertical bars waveform - subtle warm tint on tallest bar */}
          <div className="flex items-center gap-[3px] h-9">
            {waveBars.map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-150 ease-out"
                style={{
                  height: `${h * 100}%`,
                  backgroundColor: h > 0.75 ? "var(--primary)" : "rgba(255,255,255,0.85)",
                  opacity: 0.45 + h * 0.55,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM RIGHT: Active task with progress ring ────────────────── */}
      <div className="absolute right-1 bottom-1 md:right-3 md:bottom-3 z-[4] origin-bottom-right scale-[0.7] md:scale-100 animate-fade-in-scale" style={{ animationDelay: "0.15s" }}>
        <div className={`${CHIP} rounded-xl p-2 md:p-2.5 flex items-center gap-2 md:gap-3 w-[260px] md:w-auto md:max-w-[280px]`}>
          {/* Progress ring with primary accent */}
          <div className="relative flex-shrink-0 w-10 h-10 md:w-11 md:h-11">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle
                cx="22" cy="22" r={radius}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 50ms linear", filter: "drop-shadow(0 0 4px rgba(255,77,0,0.4))" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[8px] font-semibold uppercase text-primary/85" style={LABEL_STYLE}>
                Procesando
              </span>
            </div>
            <div className="text-xs font-bold text-white truncate leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {currentTask.label}
            </div>
            <div className="text-[10px] text-white/45 truncate">
              {currentTask.sub}
            </div>
          </div>

          <div className="flex-shrink-0 text-xs font-bold text-primary tabular-nums" style={NUM_STYLE}>
            {Math.floor(progress * 100)}%
          </div>
        </div>
      </div>

      {/* ── TOP LEFT: Completed actions stack ──────────────────────────── */}
      <div className="absolute left-1 top-1 md:left-3 md:top-3 z-[3] origin-top-left scale-[0.7] md:scale-100 w-[200px] md:w-[36%] md:max-w-[230px] pointer-events-none">
        <div className="flex flex-col gap-1 md:gap-1.5">
          {completedLog.map((taskIdx, i) => {
            const task = tasks[taskIdx]
            const isLatest = i === 0
            return (
              <div
                key={`${taskIdx}-${completedLog.length - i}`}
                className="animate-task-slide-in"
                style={{
                  opacity: Math.max(0.35, 1 - i * 0.18),
                  transform: `scale(${1 - i * 0.04})`,
                  transformOrigin: "top left",
                }}
              >
                <div className={`${CHIP} rounded-lg px-2 py-1 md:px-2.5 md:py-1.5 flex items-center gap-2`}>
                  <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${isLatest ? "bg-primary/20 border border-primary/40" : "bg-white/10 border border-white/20"}`}>
                    <Check className={`w-2.5 h-2.5 ${isLatest ? "text-primary" : "text-white"}`} strokeWidth={3} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold text-white truncate leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                      {task.label}
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-[9px] font-medium text-white/40 tabular-nums" style={NUM_STYLE}>
                    {i === 0 ? "ahora" : `${i * 2 + 2}s`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── BOTTOM LEFT: Connections live ──────────────────────────────── */}
      <div className="absolute left-1 bottom-1 md:left-3 md:bottom-3 z-[4] origin-bottom-left scale-[0.7] md:scale-100 animate-fade-in-scale" style={{ animationDelay: "0.3s" }}>
        <div className={`${CHIP} rounded-full px-3 py-1.5 flex items-center gap-1.5`}>
          <Users className="w-3 h-3 text-primary" strokeWidth={2.5} />
          <span className="text-[10px] font-bold text-white tabular-nums" style={NUM_STYLE}>147</span>
          <span className="text-[10px] text-white/50">conversaciones</span>
        </div>
      </div>

      {/* ── Concentric "neural" pulses behind robot ─────────────────────── */}
      {inView && (
        <div className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute rounded-full border border-white/8"
              style={{
                width: "55%",
                height: "55%",
                animation: `neural-pulse 4s ease-out infinite ${i * 1.3}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// WEB VISUAL — Dashboard satellites, pure monochrome glass
// ═══════════════════════════════════════════════════════════════════════════

export function WebVisual({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView(0.3)
  const [revenue, setRevenue] = useState(0)
  const [visitors, setVisitors] = useState(0)
  const [saleIdx, setSaleIdx] = useState(0)

  const sales = [
    { city: "Madrid",   amount: 342, time: "Hace 2s" },
    { city: "Bogota",   amount: 127, time: "Hace 5s" },
    { city: "CDMX",     amount: 89,  time: "Hace 11s" },
    { city: "Lima",     amount: 215, time: "Hace 18s" },
    { city: "Santiago", amount: 478, time: "Hace 24s" },
  ]

  useEffect(() => {
    if (!inView) return
    let r = 0, v = 0
    const targetR = 12847, targetV = 2341
    const id = setInterval(() => {
      r = Math.min(r + targetR / 50, targetR)
      v = Math.min(v + targetV / 40, targetV)
      setRevenue(Math.floor(r))
      setVisitors(Math.floor(v))
      if (r >= targetR && v >= targetV) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [inView])

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setSaleIdx(i => (i + 1) % sales.length), 2500)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      <div className="relative w-full h-full">
        <Image
          src="/venta.png"
          alt="Diseño web moderno"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={false}
        />
      </div>

      {/* Subtle white connector lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" viewBox="0 0 100 100" preserveAspectRatio="none">
        {inView && (
          <>
            <line x1="12" y1="18" x2="42" y2="42" stroke="rgba(255,255,255,0.06)" strokeWidth="0.12" strokeDasharray="1 1.5" className="animate-dash-flow" />
            <line x1="88" y1="14" x2="58" y2="38" stroke="rgba(255,255,255,0.06)" strokeWidth="0.12" strokeDasharray="1 1.5" className="animate-dash-flow" style={{ animationDelay: "0.5s" }} />
            <line x1="90" y1="58" x2="65" y2="52" stroke="rgba(255,255,255,0.06)" strokeWidth="0.12" strokeDasharray="1 1.5" className="animate-dash-flow" style={{ animationDelay: "1s" }} />
          </>
        )}
      </svg>

      {/* Revenue — top left */}
      {inView && (
        <div className="absolute left-1 top-1 md:left-3 md:top-3 z-[3] origin-top-left scale-[0.7] md:scale-100 animate-fade-in-scale">
          <div className={`${CHIP} rounded-xl px-2.5 py-1.5 md:px-3 md:py-2`}>
            <div className="flex items-center gap-1 mb-0.5">
              <ArrowUpRight className="w-3 h-3 text-primary" strokeWidth={2.5} />
              <span className="text-[9px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>Revenue hoy</span>
            </div>
            <div className="text-base md:text-xl font-bold text-white" style={NUM_STYLE}>
              ${revenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] font-bold text-primary tabular-nums" style={NUM_STYLE}>+23.4%</span>
              <span className="text-[9px] text-white/35">vs ayer</span>
            </div>
          </div>
        </div>
      )}

      {/* Visitors — top right */}
      {inView && (
        <div className="absolute right-1 top-1 md:right-3 md:top-3 z-[3] origin-top-right scale-[0.7] md:scale-100 animate-fade-in-scale" style={{ animationDelay: "0.15s" }}>
          <div className={`${CHIP} rounded-xl px-2.5 py-1.5 md:px-3 md:py-2`}>
            <div className="flex items-center gap-1 mb-0.5">
              <Users className="w-3 h-3 text-white/60" strokeWidth={2.5} />
              <span className="text-[9px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>En vivo</span>
              <LiveDot size="sm" />
            </div>
            <div className="text-base md:text-xl font-bold text-white" style={NUM_STYLE}>
              {visitors.toLocaleString()}
            </div>
            <div className="text-[9px] text-white/35">visitantes</div>
          </div>
        </div>
      )}

      {/* Sales ticker — bottom left */}
      {inView && (
        <div className="absolute left-1 bottom-1 md:left-3 md:bottom-3 z-[3] origin-bottom-left scale-[0.7] md:scale-100 animate-fade-in-scale" style={{ animationDelay: "0.3s" }}>
          <div className={`${CHIP} rounded-xl overflow-hidden w-[230px] md:w-[42vw] md:max-w-[250px]`}>
            <div className="px-2.5 py-1 border-b border-white/10 flex items-center gap-1.5">
              <ShoppingBag className="w-3 h-3 text-primary" strokeWidth={2.5} />
              <span className="text-[9px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>
                Ultimas ventas
              </span>
            </div>
            <div className="relative h-11 overflow-hidden">
              {sales.map((sale, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex items-center justify-between px-2.5 transition-all duration-600 ${
                    i === saleIdx ? "opacity-100 translate-y-0" : i === (saleIdx - 1 + sales.length) % sales.length ? "opacity-0 -translate-y-full" : "opacity-0 translate-y-full"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-white truncate leading-tight" style={{ fontFamily: "var(--font-display)" }}>{sale.city}</div>
                      <div className="text-[9px] text-white/35 leading-tight">{sale.time}</div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary flex-shrink-0" style={NUM_STYLE}>
                    ${sale.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conversion — bottom right */}
      {inView && (
        <div className="absolute right-1 bottom-1 md:right-3 md:bottom-3 z-[3] origin-bottom-right scale-[0.7] md:scale-100 animate-fade-in-scale" style={{ animationDelay: "0.45s" }}>
          <div className={`${CHIP} rounded-xl px-2.5 py-1.5 md:px-3 md:py-2`}>
            <div className="flex items-center gap-1 mb-1">
              <Activity className="w-3 h-3 text-primary" strokeWidth={2.5} />
              <span className="text-[8px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>Conversion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full origin-left animate-progress-grow" style={{ width: "67%" }} />
              </div>
              <span className="text-xs font-bold text-primary tabular-nums" style={NUM_STYLE}>6.7%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTOMATION VISUAL — Live workflow pipeline + counters + event log
// ═══════════════════════════════════════════════════════════════════════════

export function AutomationVisual({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView(0.3)
  const [activeStage, setActiveStage] = useState(0)
  const [stageProgress, setStageProgress] = useState(0)
  const [executions, setExecutions] = useState(0)
  const [timeSaved, setTimeSaved] = useState(0)
  const [chartData, setChartData] = useState<number[]>(() =>
    Array(14).fill(0).map(() => 0.3 + Math.random() * 0.6)
  )
  const [eventLog, setEventLog] = useState<{ id: number; text: string; time: string }[]>([])

  const stages = [
    { Icon: Package,  short: "Pedido",   detail: "#1847" },
    { Icon: Activity, short: "Stock",    detail: "-3" },
    { Icon: Mail,     short: "Email",    detail: "OK" },
    { Icon: FileText, short: "Factura",  detail: "$127" },
  ]

  // Cycle through stages with progress — lightweight interval
  useEffect(() => {
    if (!inView) return
    let cancelled = false
    let timer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    const runStage = (idx: number) => {
      if (cancelled) return
      setActiveStage(idx)
      setStageProgress(0)
      const dur = 1200
      const start = Date.now()

      progressTimer = setInterval(() => {
        if (cancelled) return
        const p = Math.min((Date.now() - start) / dur, 1)
        setStageProgress(p)
        if (p >= 1) {
          clearInterval(progressTimer)
          const events = [
            "Pedido #1847 recibido",
            "Inventario sincronizado",
            "Email enviado a cliente",
            "Factura generada PDF",
            "Slack: equipo notificado",
            "CRM: lead actualizado",
          ]
          setEventLog(prev => [{
            id: Date.now() + Math.random(),
            text: events[Math.floor(Math.random() * events.length)],
            time: new Date().toLocaleTimeString("es-ES", { hour12: false }),
          }, ...prev].slice(0, 4))
          setExecutions(e => e + 1)
          timer = setTimeout(() => runStage((idx + 1) % stages.length), 200)
        }
      }, 50)
    }

    runStage(0)
    return () => { cancelled = true; clearTimeout(timer); clearInterval(progressTimer) }
  }, [inView])

  // Animate top counters when in view
  useEffect(() => {
    if (!inView) return
    let exec = 0, ts = 0
    const targetExec = 1247, targetTs = 18.3
    const id = setInterval(() => {
      exec = Math.min(exec + targetExec / 50, targetExec)
      ts = Math.min(ts + targetTs / 50, targetTs)
      setExecutions(Math.floor(exec))
      setTimeSaved(Math.round(ts * 10) / 10)
      if (exec >= targetExec && ts >= targetTs) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [inView])

  // Live chart shifting bars — reduced frequency
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setChartData(prev => [...prev.slice(1), 0.25 + Math.random() * 0.75])
    }, 1200) // Reduced from 600ms to 1200ms
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      <div className="relative w-full h-full">
        <Image
          src="/automatizacion.png"
          alt="Automatizacion de procesos"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority={false}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TOP-RIGHT — Live counter "Ejecuciones hoy" with mini sparkline
          ═══════════════════════════════════════════════════════════════════ */}
      {inView && (
        <div className="absolute right-1 top-1 md:right-3 md:top-3 z-[4] origin-top-right scale-[0.7] md:scale-100 animate-fade-in-scale">
          <div className={`${CHIP} rounded-lg px-2.5 py-1.5`}>
            <div className="flex items-center gap-1 mb-0.5">
              <Activity className="w-3 h-3 text-primary" strokeWidth={2.5} />
              <span className="text-[8px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>
                Ejecuciones hoy
              </span>
            </div>
            <div className="text-sm font-bold text-white" style={NUM_STYLE}>
              {executions.toLocaleString()}
            </div>
            {/* Mini sparkline - last bar in primary color */}
            <div className="flex items-end gap-[2px] h-4 mt-0.5">
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm transition-all duration-500 ease-out"
                  style={{
                    height: `${h * 100}%`,
                    backgroundColor: i === chartData.length - 1 ? "var(--primary)" : "rgba(255,255,255,0.7)",
                    opacity: 0.3 + (i / chartData.length) * 0.7,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TOP-LEFT — Two stacked metric chips
          ═══════════════════════════════════════════════════════════════════ */}
      {inView && (
        <div className="absolute left-1 top-1 md:left-3 md:top-3 z-[4] origin-top-left scale-[0.7] md:scale-100 flex flex-col gap-1.5 animate-fade-in-scale" style={{ animationDelay: "0.15s" }}>
          <div className={`${CHIP} rounded-lg px-2.5 py-1.5`}>
            <div className="flex items-center gap-1 mb-0.5">
              <Zap className="w-2.5 h-2.5 text-primary" strokeWidth={2.5} fill="currentColor" />
              <span className="text-[8px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>
                Tiempo ahorrado
              </span>
            </div>
            <div className="text-sm font-bold text-white" style={NUM_STYLE}>
              {timeSaved}<span className="text-primary text-[10px] ml-0.5">h</span>
            </div>
          </div>
          <div className={`${CHIP} rounded-lg px-2.5 py-1.5`}>
            <div className="flex items-center gap-1 mb-0.5">
              <Check className="w-2.5 h-2.5 text-primary" strokeWidth={2.5} />
              <span className="text-[8px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>
                Tasa exito
              </span>
            </div>
            <div className="text-sm font-bold text-white tabular-nums" style={NUM_STYLE}>
              99.2<span className="text-primary text-[10px]">%</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MIDDLE-LEFT — Live event log (terminal-style) — hidden on small mobile
          ═══════════════════════════════════════════════════════════════════ */}
      {inView && (
        <div className="hidden sm:block absolute left-2 top-[40%] md:left-3 md:top-[34%] z-[3] w-[42%] md:w-[34%] max-w-[230px] animate-fade-in-scale" style={{ animationDelay: "0.3s" }}>
          <div className={`${CHIP} rounded-lg overflow-hidden`}>
            <div className="flex items-center gap-1.5 px-2 py-1 border-b border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <span className="ml-1 text-[8px] font-semibold uppercase text-white/55" style={LABEL_STYLE}>
                events.log
              </span>
            </div>
            <div className="px-2 py-1 md:px-2.5 md:py-1.5 flex flex-col gap-0.5 md:gap-1">
              {eventLog.length === 0 && (
                <div className="text-[9px] text-white/30 italic">esperando eventos...</div>
              )}
              {eventLog.map((e, i) => (
                <div
                  key={e.id}
                  className="flex items-baseline gap-1.5 animate-task-slide-in"
                  style={{ opacity: Math.max(0.3, 1 - i * 0.2) }}
                >
                  <span className="text-[8px] text-white/35 tabular-nums flex-shrink-0" style={NUM_STYLE}>
                    {e.time.slice(0, 8)}
                  </span>
                  <span className="text-primary/70 flex-shrink-0 text-[9px]">→</span>
                  <span className="text-[9px] text-white/85 truncate">
                    {e.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM — Horizontal workflow pipeline (n8n / Zapier style)
          ═══════════════════════════════════════════════════════════════════ */}
      {inView && (
        <div className="absolute left-1 right-1 bottom-1 md:left-3 md:right-3 md:bottom-3 z-[4] origin-bottom scale-[0.85] md:scale-100 animate-fade-in-scale" style={{ animationDelay: "0.45s" }}>
          <div className={`${CHIP} rounded-xl px-2 py-2 md:px-3 md:py-2.5`}>
            <div className="flex items-center justify-between mb-1.5 md:mb-2">
              <div className="flex items-center gap-1.5">
                <LiveDot size="sm" />
                <span className="text-[7px] md:text-[9px] font-semibold uppercase text-white/65" style={LABEL_STYLE}>
                  Workflow activo
                </span>
              </div>
              <span className="text-[7px] md:text-[9px] font-medium text-white/40 tabular-nums" style={NUM_STYLE}>
                2.3s · sin intervencion
              </span>
            </div>

            {/* Pipeline of nodes with connectors */}
            <div className="flex items-center justify-between gap-1 md:gap-1.5">
              {stages.map((stage, i) => {
                const Icon = stage.Icon
                const isActive = activeStage === i
                const isCompleted = activeStage > i
                const isLast = i === stages.length - 1

                return (
                  <div key={i} className="flex items-center flex-1 min-w-0">
                    {/* Node */}
                    <div
                      className={`
                        relative flex items-center gap-1 md:gap-1.5
                        rounded-lg px-1.5 py-1 md:px-2 md:py-1.5 flex-shrink-0
                        transition-all duration-300
                        ${isActive
                          ? "bg-primary text-white shadow-[0_4px_20px_rgba(255,77,0,0.4)]"
                          : isCompleted
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-white/[0.03] border border-white/10"
                        }
                      `}
                    >
                      <div className="flex-shrink-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-md flex items-center justify-center">
                        {isCompleted && !isActive ? (
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" strokeWidth={3} />
                        ) : (
                          <Icon
                            className={`w-2.5 h-2.5 md:w-3 md:h-3 ${isActive ? "text-white" : "text-white/55"}`}
                            strokeWidth={2.2}
                          />
                        )}
                      </div>
                      <div className="min-w-0 hidden sm:block">
                        <div
                          className={`text-[8px] md:text-[10px] font-bold leading-tight truncate ${isActive ? "text-white" : isCompleted ? "text-primary" : "text-white"}`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {stage.short}
                        </div>
                      </div>

                      {/* Active progress percentage */}
                      {isActive && (
                        <span
                          className="text-[7px] md:text-[9px] font-bold tabular-nums text-white/85"
                          style={NUM_STYLE}
                        >
                          {Math.floor(stageProgress * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Connector with traveling dot */}
                    {!isLast && (
                      <div className="relative flex-1 mx-0.5 md:mx-1 h-[2px]">
                        <div className={`
                          absolute inset-0 rounded-full
                          ${activeStage > i ? "bg-primary/50" : "bg-white/10"}
                        `} />
                        {/* Traveling pulse on active connector */}
                        {isActive && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,77,0,0.9)]"
                            style={{ left: `${stageProgress * 100}%`, transform: "translate(-50%, -50%)" }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

