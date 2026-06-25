"use client"

import { useEffect, useRef, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  ScanEye,
  AudioLines,
  Volume2,
  Database,
  Infinity as InfinityIcon,
  CheckCheck,
  Mic,
  Play,
  MapPin,
  Beef,
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
} from "lucide-react"

/* ════════════════════════════════════════════════════════════════════
   VERA — Agente de WhatsApp multimodal
   Centerpiece: una conversación de WhatsApp que se escribe sola, mostrando
   cada capacidad (ve, escucha, habla, consulta BD, 24/7) sincronizada con
   un stream lateral de capacidades que se ilumina en tiempo real.
   ════════════════════════════════════════════════════════════════════ */

type Capability = "db" | "audio" | "vision" | "voice" | "always"

const capabilities: {
  id: Capability
  Icon: typeof ScanEye
  title: string
  desc: string
}[] = [
  {
    id: "vision",
    Icon: ScanEye,
    title: "Mira tus fotos",
    desc: "Le mandas una foto de un producto y te dice cuál es, si lo hay y a qué precio.",
  },
  {
    id: "audio",
    Icon: AudioLines,
    title: "Entiende tus audios",
    desc: "Tu cliente manda una nota de voz y le responde al instante, sin pedirle que escriba.",
  },
  {
    id: "voice",
    Icon: Volume2,
    title: "Contesta con su voz",
    desc: "Responde con notas de voz que suenan como una persona, no como un robot.",
  },
  {
    id: "db",
    Icon: Database,
    title: "Sabe qué tienes",
    desc: "Está al tanto de tu inventario: precios, tallas y lo que queda disponible.",
  },
  {
    id: "always",
    Icon: InfinityIcon,
    title: "Atiende a toda hora",
    desc: "Responde en segundos a las 3 de la mañana o en plena temporada alta. Nunca se cansa.",
  },
]

/* ── Timeline de la conversación ─────────────────────────────────────── */
type Msg =
  | { kind: "text"; from: "user" | "bot"; text: string; cap?: Capability }
  | { kind: "voice"; from: "user" | "bot"; dur: string; cap?: Capability }
  | { kind: "image"; from: "user"; cap?: Capability }
  | { kind: "products"; from: "bot"; cap?: Capability }

const thread: Msg[] = [
  { kind: "text", from: "user", text: "Buenas! ¿están abiertos para pedidos? 🍔" },
  {
    kind: "text",
    from: "bot",
    text: "¡Hola! Sí, estamos full activos 😄 ¿qué se te antoja hoy?",
    cap: "always",
  },
  { kind: "text", from: "user", text: "¿Qué hamburguesas tienen?" },
  { kind: "products", from: "bot", cap: "db" },
  { kind: "voice", from: "user", dur: "0:09", cap: "audio" },
  {
    kind: "text",
    from: "bot",
    text: "¡De una! La doble con papas y sin cebolla, anotado 🍟",
    cap: "audio",
  },
  { kind: "image", from: "user", cap: "vision" },
  {
    kind: "text",
    from: "bot",
    text: "Recibí tu ubicación 📍 te llega en unos 30 min a esa dirección.",
    cap: "vision",
  },
  { kind: "voice", from: "bot", dur: "0:07", cap: "voice" },
  { kind: "text", from: "user", text: "Listo, gracias! 🙌" },
  {
    kind: "text",
    from: "bot",
    text: "¡A ti! Tu pedido ya está en cocina. Te aviso cuando salga 🛵",
    cap: "always",
  },
]

/* ── Hook: reproduce el hilo paso a paso cuando entra en viewport ───────── */
function useConversation(active: boolean) {
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(false)
  const [activeCap, setActiveCap] = useState<Capability | null>(null)

  useEffect(() => {
    if (!active) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const step = (i: number) => {
      if (cancelled) return
      if (i >= thread.length) {
        // breve pausa y reinicio del loop
        timers.push(
          setTimeout(() => {
            if (cancelled) return
            setVisible(0)
            setActiveCap(null)
            step(0)
          }, 3200)
        )
        return
      }

      const msg = thread[i]
      const isBot = msg.from === "bot"
      const showDelay = isBot ? 900 : 500

      if (isBot) setTyping(true)

      timers.push(
        setTimeout(() => {
          if (cancelled) return
          setTyping(false)
          setVisible(i + 1)
          if (msg.cap) setActiveCap(msg.cap)
          const readTime =
            msg.kind === "products" ? 2200 : msg.kind === "voice" ? 1900 : 1500
          timers.push(setTimeout(() => step(i + 1), readTime))
        }, showDelay)
      )
    }

    const boot = setTimeout(() => step(0), 600)
    timers.push(boot)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [active])

  return { visible, typing, activeCap }
}

/* ── Waveform estático para notas de voz ─────────────────────────────── */
function VoiceWave({ playing }: { playing?: boolean }) {
  const bars = [0.4, 0.7, 1, 0.5, 0.8, 0.3, 0.9, 0.6, 1, 0.4, 0.7, 0.5, 0.85, 0.35]
  return (
    <div className="flex items-center gap-[2px] h-5 flex-1">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-current"
          style={{
            height: `${h * 100}%`,
            opacity: playing ? 0.45 + h * 0.55 : 0.5,
            animation: playing
              ? `typing-dot 1.1s ease-in-out ${i * 0.06}s infinite`
              : undefined,
          }}
        />
      ))}
    </div>
  )
}

/* ── Burbuja de mensaje ─────────────────────────────────────────────── */
function Bubble({ msg, last }: { msg: Msg; last: boolean }) {
  const isBot = msg.from === "bot"
  // Look auténtico de WhatsApp dark: bot recibe (gris), usuario envía (verde)
  const base =
    "relative max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-snug animate-task-slide-in shadow-sm"
  const sideStyle = isBot
    ? "bg-[#202c33] text-[#e9edef] rounded-tl-md self-start"
    : "bg-[#005c4b] text-[#e9edef] rounded-tr-md self-end"

  const Ticks = () =>
    !isBot ? (
      <CheckCheck className="inline-block w-3.5 h-3.5 ml-1 -mb-0.5 text-[#53bdeb]" strokeWidth={2.5} />
    ) : null

  if (msg.kind === "text") {
    return (
      <div className={`${base} ${sideStyle}`}>
        {msg.text}
        <span className="float-right ml-2 mt-1 inline-flex items-center text-[10px] text-white/45">
          {time(last)} <Ticks />
        </span>
      </div>
    )
  }

  if (msg.kind === "voice") {
    return (
      <div className={`${base} ${sideStyle} flex items-center gap-2.5 min-w-[200px]`}>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
          {isBot ? (
            <Play className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Mic className="w-3.5 h-3.5" />
          )}
        </span>
        <VoiceWave playing={isBot} />
        <span className="flex-shrink-0 text-[10px] text-white/55 tabular-nums">{msg.dur}</span>
      </div>
    )
  }

  if (msg.kind === "image") {
    return (
      <div className={`${base.replace("px-3 py-2", "p-1")} ${sideStyle} w-[170px]`}>
        <div
          className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-xl"
          style={{ background: "linear-gradient(135deg, #1c2b24, #11201a)" }}
        >
          {/* mini mapa estilizado */}
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(#2e4a3c 1px, transparent 1px), linear-gradient(90deg, #2e4a3c 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <MapPin className="relative h-10 w-10 text-primary drop-shadow-lg" strokeWidth={2} fill="currentColor" />
          <span className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/40 px-1.5 py-0.5 text-[9px] text-white/80 backdrop-blur">
            <MapPin className="h-2.5 w-2.5" /> ubicación
          </span>
          <span className="absolute bottom-1.5 right-2 inline-flex items-center text-[10px] text-white/80">
            {time(last)} <Ticks />
          </span>
        </div>
      </div>
    )
  }

  // products — foto de producto con caption, como un negocio real en WhatsApp
  return (
    <div className="relative max-w-[72%] self-start animate-task-slide-in">
      <span
        className="absolute -left-[6px] top-0 h-2 w-2 bg-[#202c33]"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      <div className="overflow-hidden rounded-lg rounded-tl-none bg-[#202c33] p-1">
        <div
          className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-md"
          style={{ background: "linear-gradient(135deg, #3a2418, #15100c)" }}
        >
          <Beef className="h-16 w-16 text-white/30" strokeWidth={1.1} />
        </div>
        <p className="px-1.5 pb-1 pt-1.5 text-[13px] leading-[18px] text-[#e9edef]">
          Esta es la Doble Clásica 🍔 $28.000 · viene con papas y bebida. ¿Te la pido?
          <span className="float-right ml-2 mt-1 inline-flex items-center gap-0.5 text-[10px] text-[#8696a0]">
            9:41
            <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
          </span>
        </p>
      </div>
    </div>
  )
}

// Marca de tiempo determinista para evitar mismatch de hidratación
function time(last: boolean) {
  return last ? "9:42" : "9:41"
}

/* ── El teléfono ────────────────────────────────────────────────────── */
function PhoneMockup({
  visible,
  typing,
}: {
  visible: number
  typing: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const shown = thread.slice(0, visible)

  // Auto-scroll al último mensaje
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [visible, typing])

  return (
    <div className="relative mx-auto w-[320px] sm:w-[360px] lg:w-[390px]">
      {/* glow detrás del teléfono */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[3rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,77,0,0.22), transparent 65%)",
        }}
      />

      <div className="relative rounded-[2.8rem] border border-white/10 bg-[#0b0f14] p-3 shadow-[0_40px_120px_-30px_rgba(255,77,0,0.35),0_30px_60px_-30px_rgba(0,0,0,0.9)]">
        {/* notch */}
        <div className="absolute left-1/2 top-3.5 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />

        <div className="overflow-hidden rounded-[2.3rem] bg-[#0b141a]">
          {/* Header de WhatsApp */}
          <div className="flex items-center gap-2 bg-[#202c33] px-2.5 pb-2.5 pt-7">
            <ArrowLeft className="h-4 w-4 flex-shrink-0 text-[#8696a0]" strokeWidth={2.2} />
            <div className="relative flex-shrink-0">
              <img src="/agente.jpg" alt="Ziff" className="h-9 w-9 rounded-full object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#202c33] bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#e9edef]">
                Ziff · Tienda
                <span className="rounded-[3px] bg-primary/25 px-1 text-[7px] font-bold uppercase tracking-wide text-primary">
                  IA
                </span>
              </div>
              <div className="text-[10px] text-[#8696a0]">
                {typing ? "escribiendo…" : "en línea"}
              </div>
            </div>
            <Video className="h-[18px] w-[18px] flex-shrink-0 text-[#8696a0]" strokeWidth={2} />
            <Phone className="h-4 w-4 flex-shrink-0 text-[#8696a0]" strokeWidth={2} />
            <MoreVertical className="h-4 w-4 flex-shrink-0 text-[#8696a0]" strokeWidth={2} />
          </div>

          {/* Cuerpo del chat con el fondo característico */}
          <div
            ref={scrollRef}
            className="flex h-[440px] flex-col gap-2 overflow-y-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:h-[480px]"
            style={{
              backgroundColor: "#0b141a",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M30 5l3 8h-6zM10 25l8 3-8 3zM50 35l-8-3 8-3z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          >
            {/* sello de cifrado */}
            <div className="mx-auto mb-1 max-w-[85%] rounded-md bg-[#182229] px-2.5 py-1 text-center text-[9px] leading-tight text-white/45">
              Los mensajes están cifrados de extremo a extremo
            </div>

            {shown.map((msg, i) => (
              <Bubble key={i} msg={msg} last={i === shown.length - 1} />
            ))}

            {typing && (
              <div className="flex w-fit items-center gap-1 self-start rounded-2xl rounded-tl-md bg-[#202c33] px-3 py-2.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/60 animate-typing-dot"
                    style={{ animationDelay: `${d * 0.18}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Barra de input */}
          <div className="flex items-center gap-2 bg-[#0b141a] px-3 py-2.5">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-[#202c33] px-3 py-2 text-[11px] text-white/35">
              Escribe un mensaje
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Mic className="h-4 w-4 text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Demo interactivo: teléfono + stream de capacidades en vivo ──────── */
export function VeraDemo() {
  const { ref: stageRef, isVisible: stageVisible } = useScrollReveal(0.2)
  const { visible, typing, activeCap } = useConversation(stageVisible)

  return (
    <div
      ref={stageRef}
      className={`grid items-center gap-12 transition-all duration-700 lg:grid-cols-2 lg:gap-16 ${
        stageVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* Teléfono */}
      <div className="order-1 lg:order-none">
        <PhoneMockup visible={visible} typing={typing} />
      </div>

      {/* Stream de capacidades */}
      <div className="flex flex-col gap-3">
        <div
          className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.22em" }}
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Capacidades en acción
        </div>

        {capabilities.map((cap, i) => {
          const isLive = activeCap === cap.id
          return (
            <div
              key={cap.id}
              className={`group relative flex items-start gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-500 ${
                isLive
                  ? "border-primary/40 bg-primary/[0.06] translate-x-1"
                  : "border-border/40 bg-card/30 hover:border-primary/20"
              }`}
            >
              <span
                className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-500 ${
                  isLive ? "bg-primary" : "bg-transparent"
                }`}
              />
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                  isLive
                    ? "bg-primary text-white shadow-[0_8px_30px_-6px_rgba(255,77,0,0.6)] scale-110"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <cap.Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <h3
                    className="text-[15px] font-bold text-foreground"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                  >
                    {cap.title}
                  </h3>
                  {isLive && (
                    <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary animate-fade-in-scale">
                      en vivo
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {cap.desc}
                </p>
              </div>
              <span
                className="mt-1 text-[11px] font-bold tabular-nums text-muted-foreground/40"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
