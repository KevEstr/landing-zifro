"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VeraDemo } from "@/components/vera-demo"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  ScanEye,
  AudioLines,
  Volume2,
  Database,
  MessagesSquare,
  Clock,
  ShoppingBag,
  CalendarCheck,
  HeartPulse,
  Utensils,
  ArrowUpRight,
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  Check,
  CheckCheck,
  X,
  Mic,
  Play,
  Plus as PlusIcon,
  SmilePlus,
  Cake,
  Wrench,
  Scissors,
  Sparkles,
  Zap,
  ShieldCheck,
  Truck,
  type LucideIcon,
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

/* ════════════════════════════════════════════════════════════════════
   PRIMITIVAS WHATSAPP REALISTAS
   ════════════════════════════════════════════════════════════════════ */

function WaScreen({
  children,
  status = "en línea",
  withInput = false,
  className = "",
  style,
}: {
  children: React.ReactNode
  status?: string
  withInput?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border border-black/50 bg-[#0b141a] ${className}`}
      style={style}
    >
      {/* Header */}
      <div className="flex items-center gap-2 bg-[#202c33] px-2.5 py-2">
        <ArrowLeft className="h-4 w-4 flex-shrink-0 text-[#8696a0]" strokeWidth={2.2} />
        <div className="relative flex-shrink-0">
          <img src="/agente.jpg" alt="Ziff" className="h-8 w-8 rounded-full object-cover" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#202c33] bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-[#e9edef]">Ziff</span>
            <span className="rounded-[3px] bg-primary/25 px-1 text-[7px] font-bold uppercase tracking-wide text-primary">
              IA
            </span>
          </div>
          <div className="text-[10px] text-[#8696a0]">{status}</div>
        </div>
        <Video className="h-[18px] w-[18px] flex-shrink-0 text-[#8696a0]" strokeWidth={2} />
        <Phone className="h-4 w-4 flex-shrink-0 text-[#8696a0]" strokeWidth={2} />
        <MoreVertical className="h-4 w-4 flex-shrink-0 text-[#8696a0]" strokeWidth={2} />
      </div>

      {/* Body */}
      <div
        className="flex flex-col gap-[3px] px-3 py-3"
        style={{ backgroundImage: DOODLE, backgroundColor: "#0b141a" }}
      >
        {children}
      </div>

      {/* Input bar */}
      {withInput && (
        <div className="flex items-center gap-2 bg-[#0b141a] px-2.5 py-2">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-[#202c33] px-3 py-2">
            <SmilePlus className="h-4 w-4 text-[#8696a0]" strokeWidth={2} />
            <span className="text-[11px] text-[#8696a0]">Escribe un mensaje</span>
            <PlusIcon className="ml-auto h-4 w-4 text-[#8696a0]" strokeWidth={2} />
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884]">
            <Mic className="h-[18px] w-[18px] text-[#0b141a]" strokeWidth={2.2} />
          </span>
        </div>
      )}
    </div>
  )
}

/* Separador de fecha */
function WaDay({ children = "HOY" }: { children?: string }) {
  return (
    <div className="my-1 flex justify-center">
      <span className="rounded-md bg-[#1d2a32] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-[#8696a0]">
        {children}
      </span>
    </div>
  )
}

/* Aviso de cifrado */
function WaEncryption() {
  return (
    <div className="my-1 flex justify-center">
      <span className="max-w-[88%] rounded-md bg-[#182431] px-2.5 py-1 text-center text-[9px] leading-tight text-[#ffd279]/70">
        🔒 Los mensajes están cifrados de extremo a extremo
      </span>
    </div>
  )
}

const TAIL_IN: React.CSSProperties = { clipPath: "polygon(100% 0, 0 0, 100% 100%)" }
const TAIL_OUT: React.CSSProperties = { clipPath: "polygon(0 0, 100% 0, 0 100%)" }

/* Burbuja entrante (cliente) */
function In({ children, time = "9:41" }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="relative max-w-[82%] self-start">
      <span className="absolute -left-[6px] top-0 h-2 w-2 bg-[#202c33]" style={TAIL_IN} />
      <div className="rounded-lg rounded-tl-none bg-[#202c33] px-2 py-1.5 pr-3 text-[13px] leading-[18px] text-[#e9edef]">
        {children}
        <span className="float-right -mb-0.5 ml-2 mt-1 text-[10px] text-[#8696a0]">{time}</span>
      </div>
    </div>
  )
}

/* Burbuja saliente (Ziff) */
function Out({ children, time = "9:41" }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="relative max-w-[82%] self-end">
      <span className="absolute -right-[6px] top-0 h-2 w-2 bg-[#005c4b]" style={TAIL_OUT} />
      <div className="rounded-lg rounded-tr-none bg-[#005c4b] px-2 py-1.5 pr-3 text-[13px] leading-[18px] text-[#e9edef]">
        {children}
        <span className="float-right -mb-0.5 ml-2 mt-1 inline-flex items-center gap-0.5 text-[10px] text-[#8696a0]">
          {time}
          <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  )
}

/* Nota de voz */
function Voice({ bot, dur }: { bot?: boolean; dur: string }) {
  const bars = [0.4, 0.8, 1, 0.5, 0.9, 0.35, 0.7, 0.55, 1, 0.45, 0.75, 0.5, 0.85, 0.4]
  return (
    <div className={`relative max-w-[82%] ${bot ? "self-end" : "self-start"}`}>
      <span
        className={`absolute top-0 h-2 w-2 ${bot ? "-right-[6px] bg-[#005c4b]" : "-left-[6px] bg-[#202c33]"}`}
        style={bot ? TAIL_OUT : TAIL_IN}
      />
      <div
        className={`flex w-[210px] items-center gap-2 rounded-lg px-2 py-2 ${
          bot ? "rounded-tr-none bg-[#005c4b]" : "rounded-tl-none bg-[#202c33]"
        }`}
      >
        {/* avatar mini */}
        <div className="relative flex-shrink-0">
          {bot ? (
            <img src="/agente.jpg" alt="Ziff" className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#ff8a3d]">
              <Mic className="h-3.5 w-3.5 text-white" />
            </div>
          )}
        </div>
        <Play className="h-4 w-4 flex-shrink-0 fill-[#8696a0] text-[#8696a0]" />
        <div className="flex h-5 flex-1 items-center gap-[2px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[2px] rounded-full bg-[#8696a0]"
              style={{
                height: `${h * 100}%`,
                opacity: 0.5 + h * 0.4,
                animation: bot ? `typing-dot 1.1s ease-in-out ${i * 0.06}s infinite` : undefined,
              }}
            />
          ))}
        </div>
        <span className="flex-shrink-0 text-[10px] text-[#8696a0] tabular-nums">{dur}</span>
      </div>
    </div>
  )
}

/* Imagen enviada */
function ImageMsg({
  tint = "#3a2a22",
  from = "in",
  Icon = Cake,
}: {
  tint?: string
  from?: "in" | "out"
  Icon?: LucideIcon
}) {
  const out = from === "out"
  return (
    <div className={`relative max-w-[60%] ${out ? "self-end" : "self-start"}`}>
      <span
        className={`absolute top-0 h-2 w-2 ${out ? "-right-[6px] bg-[#005c4b]" : "-left-[6px] bg-[#202c33]"}`}
        style={out ? TAIL_OUT : TAIL_IN}
      />
      <div className={`p-1 ${out ? "rounded-lg rounded-tr-none bg-[#005c4b]" : "rounded-lg rounded-tl-none bg-[#202c33]"}`}>
        <div
          className="relative flex h-[128px] w-[150px] items-center justify-center overflow-hidden rounded-md"
          style={{ background: `linear-gradient(135deg, ${tint}, #15100c)` }}
        >
          <Icon className="h-12 w-12 text-white/30" strokeWidth={1.2} />
          <span className="absolute bottom-1.5 right-2 inline-flex items-center gap-0.5 rounded bg-black/40 px-1 text-[9px] text-white/90 backdrop-blur">
            9:41 <CheckCheck className="h-3 w-3 text-[#53bdeb]" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  )
}

/* Foto de producto con caption — como un negocio real responde en WhatsApp */
function ProductReply({
  tint = "#2a1d14",
  caption = "Mira, esta es la torta de chocolate 🎂 $85.000 · alcanza para 15 porciones.",
  time = "9:41",
  Icon = Cake,
}: {
  tint?: string
  caption?: string
  time?: string
  Icon?: LucideIcon
}) {
  return (
    <div className="relative max-w-[72%] self-start">
      <span className="absolute -left-[6px] top-0 h-2 w-2 bg-[#202c33]" style={TAIL_IN} />
      <div className="overflow-hidden rounded-lg rounded-tl-none bg-[#202c33] p-1">
        {/* foto */}
        <div
          className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-md"
          style={{ background: `linear-gradient(135deg, ${tint}, #15100c)` }}
        >
          <Icon className="h-16 w-16 text-white/30" strokeWidth={1.1} />
        </div>
        {/* caption */}
        <p className="px-1.5 pb-1 pt-1.5 text-[13px] leading-[18px] text-[#e9edef]">
          {caption}
          <span className="float-right ml-2 mt-1 inline-flex items-center gap-0.5 text-[10px] text-[#8696a0]">
            {time}
            <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
          </span>
        </p>
      </div>
    </div>
  )
}

/* ─── Encabezado de sección compacto ──────────────────────────────────── */
function SectionHeader({
  kicker,
  title,
  center = false,
}: {
  kicker: string
  title: React.ReactNode
  center?: boolean
}) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className={`mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="h-px w-10 bg-primary" />
        <span className="text-[11px] font-semibold uppercase text-primary" style={KICKER}>
          {kicker}
        </span>
        {center && <span className="h-px w-10 bg-primary" />}
      </div>
      <h2
        className="text-3xl font-bold leading-[1.05] text-foreground text-balance sm:text-4xl lg:text-5xl"
        style={DISPLAY}
      >
        {title}
      </h2>
    </div>
  )
}

/* ─── HERO ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-14 lg:pt-32 lg:pb-20"
      style={{ background: "linear-gradient(160deg, #0a0e14 0%, #060a12 55%, #0a0e14 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(255,77,0,0.15) 0%, transparent 50%), radial-gradient(circle at 8% 95%, rgba(255,77,0,0.05) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Texto mínimo */}
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase text-primary" style={KICKER}>
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Agente de WhatsApp
            </span>

            <h1 className="text-5xl font-bold leading-[1.0] text-foreground text-balance sm:text-6xl lg:text-7xl xl:text-8xl" style={DISPLAY}>
              Conoce a <span className="text-primary">Ziff.</span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-foreground/70">
              Atiende a tus clientes, muestra tus productos, entiende tus audios y fotos, y cierra ventas.
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                Quiero a Ziff
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-card/40 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                Ver demo
              </a>
            </div>

            {/* sellos de confianza */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/5 pt-6">
              {[
                { Icon: Zap, t: "Listo en 2 semanas" },
                { Icon: ShieldCheck, t: "Datos protegidos" },
                { Icon: MessagesSquare, t: "Habla como tú" },
              ].map((b) => (
                <span key={b.t} className="inline-flex items-center gap-2 text-sm text-foreground/55">
                  <b.Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                  {b.t}
                </span>
              ))}
            </div>
          </div>

          {/* Teléfono real */}
          <div className="relative mx-auto w-[300px] sm:w-[340px] lg:w-[370px]">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[3rem] opacity-70 blur-3xl"
              style={{ background: "radial-gradient(circle at 60% 30%, rgba(255,77,0,0.3), transparent 65%)" }}
            />
            {/* marco de teléfono */}
            <div className="relative rounded-[2.8rem] border border-white/10 bg-[#05080c] p-3 shadow-[0_50px_140px_-30px_rgba(255,77,0,0.45)]">
              <div className="absolute left-1/2 top-3.5 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />
              <WaScreen withInput className="rounded-[2.1rem] pt-4">
                <WaEncryption />
                <WaDay />
                <In>Hola! ¿Tienen estos tenis en talla 42? 👟</In>
                <ImageMsg from="in" Icon={ShoppingBag} tint="#1e2228" />
                <Out time="9:41">¡Hola! Son los Air Nova 🔥 sí me quedan en talla 42. Valen $289.000.</Out>
                <In time="9:41">Perfecto, los quiero</In>
                <Out time="9:42">¡Genial! ¿A qué ciudad te los enviamos? Así te confirmo el costo y el tiempo de envío 📦</Out>
                <Voice dur="0:08" />
                <Out time="9:42">¡Listo! Te paso los métodos de pago y coordinamos el envío 🙌</Out>
              </WaScreen>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─── DEMO ────────────────────────────────────────────────────────────── */
function DemoBlock() {
  const { ref, isVisible } = useScrollReveal(0.1)
  return (
    <section id="demo" className="relative overflow-hidden bg-background py-14 lg:py-20">
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
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle at 50% 20%, rgba(255,77,0,0.06) 0%, transparent 50%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <SectionHeader
            center
            kicker="Demo en vivo"
            title={
              <>
                Esto es lo que ve <span className="text-primary">tu cliente.</span>
              </>
            }
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Una conversación real, paso a paso. Mira cómo entiende, muestra y cierra la venta sola.
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-10 transition-all duration-700 lg:mt-14 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <VeraDemo />
        </div>
      </div>
    </section>
  )
}

/* ─── CAPACIDADES — grid uniforme, cada tarjeta es un chat ────────────── */
function Tile({
  Icon,
  title,
  delay = 0,
  children,
}: {
  Icon: typeof ScanEye
  title: string
  delay?: number
  children: React.ReactNode
}) {
  const { ref, isVisible } = useScrollReveal(0.15)
  return (
    <div
      ref={ref}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/30 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
          {title}
        </h3>
      </div>
      <div className="mt-auto">{children}</div>
    </div>
  )
}

function Capabilities() {
  return (
    <section id="capacidades" className="relative bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Qué sabe hacer"
          title={
            <>
              Atiende como tu mejor
              <br />
              <span className="text-foreground/40">vendedor.</span> <span className="text-primary">O mejor.</span>
            </>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {/* Fotos */}
          <Tile Icon={ScanEye} title="Mira lo que le mandas" delay={0}>
            <WaScreen className="w-full shadow-xl">
              <In>¿Tienen este repuesto? 👇</In>
              <ImageMsg from="in" Icon={Wrench} tint="#1e2630" />
              <Out>¡Sí! Es la bomba de agua para Mazda 3 🔧 original y genérica.</Out>
            </WaScreen>
          </Tile>

          {/* Inventario */}
          <Tile Icon={Database} title="Sabe qué tienes y a cuánto" delay={80}>
            <WaScreen className="w-full shadow-xl">
              <In>¿Les queda el labial rojo mate?</In>
              <ProductReply Icon={Sparkles} tint="#2e1622" caption="¡Sí! El tono Cereza 💄 $38.000 · me quedan 6." />
            </WaScreen>
          </Tile>

          {/* Audio */}
          <Tile Icon={AudioLines} title="Le mandas una nota de voz" delay={160}>
            <WaScreen className="w-full shadow-xl">
              <Voice dur="0:11" />
              <Out>¡Listo! Te agendo el corte y barba para el sábado a las 3 ✂️</Out>
            </WaScreen>
          </Tile>

          {/* Voz */}
          <Tile Icon={Volume2} title="Te contesta hablando" delay={0}>
            <WaScreen className="w-full shadow-xl">
              <In>¿Dónde quedan ubicados?</In>
              <Voice bot dur="0:08" />
              <Out>Te dejé la ubicación 📍</Out>
            </WaScreen>
          </Tile>

          {/* Memoria */}
          <Tile Icon={MessagesSquare} title="Recuerda toda la charla" delay={80}>
            <WaScreen className="w-full shadow-xl">
              <In>¿La pizza que pedí venía sin champiñones?</In>
              <Out>Sí 🍕 tu mediana de pepperoni iba sin champiñones 👍</Out>
            </WaScreen>
          </Tile>

          {/* 24/7 — tarjeta destacada, mismo tamaño */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-primary/25 p-5" style={{ background: "linear-gradient(150deg, #1a0f08, #0d1117)" }}>
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,77,0,0.18), transparent 60%)" }} />
            <div className="relative flex h-full flex-col">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <Clock className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                  No descansa nunca
                </h3>
              </div>
              <div className="mt-auto">
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-bold leading-none text-primary tabular-nums" style={DISPLAY}>24/7</span>
                  <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> en línea
                  </span>
                </div>
                <p className="mt-3 text-sm text-foreground/60">
                  Contesta en segundos a las 3 de la mañana o en plena temporada alta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PARA QUIÉN ES — filas deslizantes; al pasar el mouse se abre el chat ── */
const useCases = [
  { Icon: ShoppingBag, sector: "Tiendas y catálogos", ask: "¿Tienen el labial rojo?", reply: "¡Sí! El tono Cereza 💄 ¿te lo aparto?" },
  { Icon: Utensils, sector: "Restaurantes", ask: "¿Tienen mesa el viernes?", reply: "Claro, ¿para cuántas personas? 🍽️" },
  { Icon: Cake, sector: "Pastelerías", ask: "¿Hacen tortas por encargo?", reply: "¡Sí! Te paso sabores y precios 🎂" },
  { Icon: Wrench, sector: "Repuestos y talleres", ask: "¿Tienen frenos para mi Mazda?", reply: "Sí, ¿modelo y año? Te confirmo 🔧" },
  { Icon: Scissors, sector: "Peluquerías y barberías", ask: "¿Hay cupo para corte hoy?", reply: "Tengo a las 4 o a las 6 ✂️" },
  { Icon: CalendarCheck, sector: "Servicios y citas", ask: "Quiero agendar una visita", reply: "Listo, ¿qué día te queda bien? 📅" },
  { Icon: HeartPulse, sector: "Consultorios y clínicas", ask: "¿Atienden hoy?", reply: "Sí, ¿te agendo en la tarde? 🩺" },
  { Icon: Truck, sector: "Domicilios y envíos", ask: "¿Hacen envíos a mi zona?", reply: "¿A qué barrio? Te confirmo 📦" },
  { Icon: Sparkles, sector: "Spa y estética", ask: "¿Qué tratamientos tienen?", reply: "Te paso el menú y precios ✨" },
  { Icon: Database, sector: "Inmobiliarias", ask: "¿Tienen apartamentos en arriendo?", reply: "Sí, ¿zona y presupuesto? 🏠" },
  { Icon: ShoppingBag, sector: "Moda y calzado", ask: "¿Les queda en talla 38?", reply: "Déjame revisar… ¡sí queda! 👟" },
  { Icon: Volume2, sector: "Academias y cursos", ask: "¿Cuándo abren inscripciones?", reply: "Ya están abiertas, te cuento 🎓" },
]

type UseCase = (typeof useCases)[number]

function UseCaseChip({ data }: { data: UseCase }) {
  const { Icon, sector, ask, reply } = data
  return (
    <div className="group mx-2 shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-card/40 transition-all duration-500 hover:border-primary/40 hover:bg-card/60">
      {/* fila base: ícono + nombre */}
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <span className="whitespace-nowrap text-[15px] font-semibold text-foreground" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
          {sector}
        </span>
      </div>

      {/* chat que se despliega al hover */}
      <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div
            className="mx-2 mb-2 flex w-[230px] flex-col gap-1.5 rounded-xl px-2.5 py-2.5"
            style={{ backgroundColor: "#0b141a", backgroundImage: DOODLE }}
          >
            {/* cliente */}
            <div className="relative max-w-[88%] self-start">
              <span className="absolute -left-[5px] top-0 h-1.5 w-1.5 bg-[#202c33]" style={TAIL_IN} />
              <div className="rounded-lg rounded-tl-none bg-[#202c33] px-2 py-1 pr-2.5 text-[11px] leading-snug text-[#e9edef]">
                {ask}
              </div>
            </div>
            {/* Ziff */}
            <div className="relative max-w-[90%] self-end">
              <span className="absolute -right-[5px] top-0 h-1.5 w-1.5 bg-[#005c4b]" style={TAIL_OUT} />
              <div className="rounded-lg rounded-tr-none bg-[#005c4b] px-2 py-1 pr-2.5 text-[11px] leading-snug text-[#e9edef]">
                {reply}
                <CheckCheck className="ml-1 inline-block h-3 w-3 text-[#53bdeb]" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }: { items: UseCase[]; reverse?: boolean }) {
  return (
    <div className="marquee-row relative flex overflow-hidden py-1">
      <div className={`marquee-track flex w-max items-start ${reverse ? "animate-marquee-reverse-slow" : "animate-marquee-slow"}`}>
        {[...items, ...items].map((u, i) => (
          <UseCaseChip key={i} data={u} />
        ))}
      </div>
    </div>
  )
}

function UseCases() {
  const { ref, isVisible } = useScrollReveal(0.1)
  const half = Math.ceil(useCases.length / 2)
  const rowA = useCases.slice(0, half)
  const rowB = useCases.slice(half)

  return (
    <section className="relative overflow-hidden bg-background py-14 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,77,0,0.06) 0%, transparent 55%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader
            center
            kicker="Para quién es"
            title={<>Hecho para negocios <span className="text-primary">como el tuyo.</span></>}
          />
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Pasa el mouse por encima y mira cómo respondería Ziff en cada negocio.
          </p>
        </div>
      </div>

      {/* filas deslizantes a todo el ancho */}
      <div
        ref={ref}
        className={`relative mt-10 flex flex-col gap-3 transition-all duration-700 lg:mt-14 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* fades laterales */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-40" />

        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>

      <div className="relative mx-auto mt-10 flex max-w-7xl items-center justify-center gap-2 px-6 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" strokeWidth={2} />
        ¿No ves el tuyo? Se adapta a casi cualquier negocio.
      </div>
    </section>
  )
}

/* ─── CÓMO FUNCIONA — timeline rico con días y detalle ────────────────── */
const steps = [
  {
    n: "01",
    Icon: Phone,
    day: "Día 1",
    title: "Nos cuentas tu negocio",
    sub: "Una llamada corta para entender qué vendes y cómo te gusta atender.",
    chips: ["Tus objetivos", "Tu estilo"],
  },
  {
    n: "02",
    Icon: Database,
    day: "Día 2 a 6",
    title: "Lo conectamos todo",
    sub: "Enlazamos tus productos y tu WhatsApp. Le enseñamos a hablar como tú.",
    chips: ["Tus productos", "Tu WhatsApp"],
  },
  {
    n: "03",
    Icon: MessagesSquare,
    day: "Día 7 a 12",
    title: "Lo probamos juntos",
    sub: "Revisas conversaciones reales y ajustamos lo que haga falta.",
    chips: ["Pruebas", "Ajustes"],
  },
  {
    n: "04",
    Icon: ArrowUpRight,
    day: "Día 14",
    title: "Ziff sale en vivo",
    sub: "Empieza a atender y vender en tu número. Y lo seguimos mejorando contigo.",
    chips: ["Funcionando", "Con soporte"],
  },
]

function HowItWorks() {
  const { ref, isVisible } = useScrollReveal(0.1)
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-background py-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle at 85% 15%, rgba(255,77,0,0.07) 0%, transparent 45%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Cómo funciona"
          title={<>De cero a vendiendo <br /><span className="text-foreground/40">en</span> <span className="text-primary">dos semanas.</span></>}
        />

        <div
          ref={ref}
          className={`relative mt-10 grid gap-5 transition-all duration-700 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* línea conectora con flujo */}
          <div className="absolute left-6 right-6 top-12 hidden lg:block">
            <div className="relative h-px w-full bg-border">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
            </div>
          </div>

          {steps.map((s, i) => (
            <div
              key={s.n}
              className="group relative flex flex-col rounded-3xl border border-border/40 bg-card/30 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-card/50"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* nodo numerado */}
              <div className="relative mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_30px_-8px_rgba(255,77,0,0.6)] transition-transform duration-500 group-hover:scale-110">
                  <s.Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <span className="text-5xl font-bold leading-none text-foreground/[0.06] transition-colors duration-500 group-hover:text-primary/20" style={DISPLAY}>
                  {s.n}
                </span>
              </div>

              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                <Clock className="h-3 w-3" /> {s.day}
              </span>

              <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.sub}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.chips.map((c) => (
                  <span key={c} className="rounded-md border border-border/50 bg-secondary/40 px-2 py-0.5 text-[10px] font-medium text-foreground/70">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── COMPARATIVA — dos tarjetas enfrentadas ──────────────────────────── */
const veraWins = [
  { Icon: ScanEye, t: "Entiende fotos y audios" },
  { Icon: Volume2, t: "Te contesta con su voz" },
  { Icon: Database, t: "Muestra tus productos al momento" },
  { Icon: MessagesSquare, t: "Recuerda toda la conversación" },
  { Icon: Clock, t: "Atiende de día y de noche" },
]
const botFails = [
  "Solo entiende mensajes de texto",
  "Te hace elegir entre botones",
  "Siempre las mismas respuestas",
  "Olvida lo que dijiste antes",
  "“No entendí, intenta de nuevo”",
]

function Comparison() {
  const { ref, isVisible } = useScrollReveal(0.1)
  return (
    <section className="relative overflow-hidden bg-background py-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle at 25% 50%, rgba(255,77,0,0.06) 0%, transparent 45%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader center kicker="La diferencia" title={<>No es un bot más. <br /><span className="text-foreground/40">Es</span> <span className="text-primary">Ziff.</span></>} />

        <div
          ref={ref}
          className={`mt-10 grid items-stretch gap-5 transition-all duration-700 md:grid-cols-2 lg:mt-14 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Tarjeta VERA — destacada */}
          <div className="relative overflow-hidden rounded-3xl border border-primary/40 p-7 lg:p-8" style={{ background: "linear-gradient(155deg, #1c1109 0%, #0d1117 100%)" }}>
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 80% 0%, rgba(255,77,0,0.22), transparent 55%)" }} />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/agente.jpg" alt="Ziff" className="h-11 w-11 rounded-2xl object-cover" />
                  <div>
                    <div className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>Ziff</div>
                    <div className="text-[11px] text-primary">tu vendedor en WhatsApp</div>
                  </div>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Recomendado</span>
              </div>

              <ul className="flex flex-col gap-3">
                {veraWins.map((w) => (
                  <li key={w.t} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <w.Icon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="text-[15px] font-medium text-foreground">{w.t}</span>
                    <Check className="ml-auto h-4 w-4 flex-shrink-0 text-primary" strokeWidth={3} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tarjeta BOT — apagada */}
          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/20 p-7 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
                <MessagesSquare className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <div className="text-lg font-bold text-muted-foreground" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>Bot común</div>
                <div className="text-[11px] text-muted-foreground/60">menús y respuestas fijas</div>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {botFails.map((t) => (
                <li key={t} className="flex items-center gap-3 opacity-70">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground/50">
                    <X className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] font-medium text-muted-foreground line-through decoration-muted-foreground/30">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ — pregúntale a Ziff (chat interactivo) ──────────────────────── */
const faqs = [
  { q: "¿Funciona con mi número actual?", a: "Sí 🙌 opero sobre tu WhatsApp Business sin que pierdas tu historial ni tu identidad." },
  { q: "¿De dónde saca mis productos?", a: "Lo conectamos a tu catálogo. Así muestra los precios y lo que tienes disponible, siempre al día 📦" },
  { q: "¿Y si no puedes resolver algo?", a: "Le paso la charla a tu equipo con todo el contexto. El cliente nunca tiene que repetir nada 👌" },
  { q: "¿Mis datos están seguros?", a: "Totalmente 🔒 las conversaciones van protegidas y son solo tuyas. Nadie más las usa." },
  { q: "¿Cuánto tardo en tenerte?", a: "Unas dos semanas desde nuestra primera llamada hasta que salgo en vivo 🚀" },
]

function Faq() {
  const [asked, setAsked] = useState<number[]>([0])
  const [pending, setPending] = useState<number | null>(null)

  const ask = (i: number) => {
    if (asked.includes(i) || pending !== null) return
    setPending(i)
    setTimeout(() => {
      setAsked((prev) => [...prev, i])
      setPending(null)
    }, 1100)
  }

  return (
    <section className="relative overflow-hidden bg-background py-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,77,0,0.06) 0%, transparent 45%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader center kicker="Dudas frecuentes" title={<>Pregúntale a <span className="text-primary">Ziff.</span></>} />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          {/* Chat dinámico */}
          <div className="order-2 lg:order-1">
            <WaScreen className="shadow-2xl" status="siempre disponible">
              <WaDay>FAQ</WaDay>
              {faqs.map((f, i) =>
                asked.includes(i) ? (
                  <div key={i} className="contents">
                    <Out time={`9:4${i}`}>{f.q}</Out>
                    <In time={`9:4${i}`}>{f.a}</In>
                  </div>
                ) : null
              )}
              {pending !== null && (
                <>
                  <Out>{faqs[pending].q}</Out>
                  <div className="relative max-w-[60%] self-start">
                    <span className="absolute -left-[6px] top-0 h-2 w-2 bg-[#202c33]" style={TAIL_IN} />
                    <div className="flex w-fit items-center gap-1 rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2.5">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/60 animate-typing-dot" style={{ animationDelay: `${d * 0.18}s` }} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </WaScreen>
          </div>

          {/* Preguntas como "respuestas rápidas" de WhatsApp */}
          <div className="order-1 flex flex-col gap-2.5 lg:order-2 lg:pt-4">
            <p className="mb-1 text-sm text-muted-foreground">Toca una pregunta y mira cómo responde 👇</p>
            {faqs.map((f, i) => {
              const done = asked.includes(i)
              return (
                <button
                  key={i}
                  onClick={() => ask(i)}
                  disabled={done || pending !== null}
                  className={`group flex items-center justify-between gap-3 rounded-2xl border px-5 py-3.5 text-left transition-all duration-300 ${
                    done
                      ? "cursor-default border-primary/30 bg-primary/[0.06] text-muted-foreground"
                      : "border-border/50 bg-card/30 text-foreground hover:-translate-y-0.5 hover:border-primary/40 active:scale-[0.99]"
                  }`}
                >
                  <span className="text-[15px] font-medium" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                    {f.q}
                  </span>
                  {done ? (
                    <CheckCheck className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={2.5} />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA FINAL ───────────────────────────────────────────────────────── */
const ctaStats = [
  { v: "< 5 s", l: "en responder" },
  { v: "24/7", l: "sin turnos" },
  { v: "+38 %", l: "más cierres" },
]

function FinalCta() {
  const { ref, isVisible } = useScrollReveal(0.2)
  return (
    <section id="contacto" className="relative overflow-hidden bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-[2rem] border border-primary/25 transition-all duration-700 sm:rounded-[2.5rem] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ background: "linear-gradient(160deg, #14110d 0%, #0d1117 60%, #0a0e14 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 75% 0%, rgba(255,77,0,0.22) 0%, transparent 55%), radial-gradient(circle at 5% 100%, rgba(255,77,0,0.08) 0%, transparent 50%)" }} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase text-primary" style={KICKER}>
                <Clock className="h-3.5 w-3.5" /> Primera demo gratis
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-[1.04] text-foreground text-balance sm:text-4xl lg:text-6xl" style={DISPLAY}>
                Deja que Ziff atienda.
                <br />
                <span className="text-primary">Tú dedícate a crecer.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Te mostramos a Ziff atendiendo a tus propios clientes. Sin compromiso.
              </p>

              {/* métricas */}
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6">
                {ctaStats.map((s) => (
                  <div key={s.l}>
                    <div className="text-3xl font-bold text-primary tabular-nums lg:text-4xl" style={DISPLAY}>{s.v}</div>
                    <div className="mt-0.5 text-[13px] text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/#contacto"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-9 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]"
                >
                  Agenda tu demo
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-card/30 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                >
                  Volver al demo
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[300px]">
              <WaScreen withInput className="shadow-2xl">
                <WaDay>HOY</WaDay>
                <Out>¿Cuándo quieres a Ziff en vivo? 😄</Out>
                <In>¡Ya mismo!</In>
                <Out>Hecho 🙌 te escribimos hoy mismo.</Out>
                <In>Increíble, gracias 🔥</In>
              </WaScreen>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PÁGINA COMPLETA ─────────────────────────────────────────────────── */
export function VeraLanding() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <DemoBlock />
      <Capabilities />
      <UseCases />
      <HowItWorks />
      <Comparison />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  )
}
