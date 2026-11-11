"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { FormEvent, KeyboardEvent, ReactNode } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Database,
  Headset,
  Menu,
  Minus,
  MessageCircle,
  Pause,
  Play,
  PlugZap,
  Plus,
  Send,
  ShieldCheck,
  ShoppingBag,
  Table2,
  X,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { NodeMap, ZifroLockup, ZifroMark, ZifroWordmark } from "./brand"
import {
  AudioBubble,
  ChatBody,
  ChatComposer,
  ChatHead,
  Day,
  In,
  Out,
  PhoneFrame,
  PhotoBubble,
  ProductCard,
  Sparkline,
  SystemNote,
  Typing,
} from "./chat"

const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "")
const CONTACT_EMAIL = "hola@zifro.app"

function whatsappLink(message: string) {
  const text = encodeURIComponent(message)
  if (WHATSAPP_NUMBER) return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Quiero mi agente de WhatsApp")}&body=${text}`
}

function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.12,
}: {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}) {
  const { ref, isVisible } = useScrollReveal(threshold)
  return (
    <div
      ref={ref}
      className={`v-reveal ${isVisible ? "is-visible" : ""} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const navItems = [
  { label: "El problema", href: "#problema" },
  { label: "El agente", href: "#agente" },
  { label: "La conversación", href: "#demo" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Preguntas", href: "#preguntas" },
]

function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const height = document.documentElement.scrollHeight - window.innerHeight
      const value = height > 0 ? Math.min(window.scrollY / height, 1) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${value})`
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className="v-announce">
        <div className="v-wrap v-announce__in">
          <span className="v-announce__dot" aria-hidden="true" />
          <p>4 cupos de implementación este mes.</p>
          <a href="#contacto">
            Reservar cupo <ArrowRight size={13} strokeWidth={2.2} />
          </a>
        </div>
      </div>

      <header className={`v-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="v-wrap v-nav__in">
          <a href="#top" className="v-brand" aria-label="Zifro, inicio">
            <ZifroLockup />
          </a>

          <nav className="v-nav__links" aria-label="Secciones">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="v-nav__actions">
            <a href="#demo" className="v-textlink">
              Ver demo
            </a>
            <a href="#empezar" className="v-btn v-btn--ink v-btn--sm">
              Quiero mi agente
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </a>
          </div>

          <button
            type="button"
            className="v-nav__toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="v-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>

        <div className={`v-mobile ${open ? "is-open" : ""}`}>
          <nav aria-label="Secciones">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            ))}
          </nav>
          <a
            href="#empezar"
            className="v-btn v-btn--ink"
            onClick={() => setOpen(false)}
          >
            Quiero mi agente
            <ArrowRight size={16} strokeWidth={2.2} />
          </a>
          <a className="v-mobile__mail" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </header>
    </>
  )
}

function Hero() {
  return (
    <section id="top" className="v-hero">
      <div className="v-wrap v-hero__in">
        <div className="v-hero__copy">
          <span className="v-eyebrow">
            <span className="v-eyebrow__dot" aria-hidden="true" />
            Zifro · Agentes de IA para WhatsApp
          </span>

          <h1 className="v-display">
            Tu WhatsApp
            <br />
            <span className="v-underline">
              no debería
              <svg viewBox="0 0 260 14" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M3 10 C 64 3, 182 3, 257 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            cerrar a las 6.
          </h1>

          <p className="v-lead">
            Zifro entrena un agente de IA que contesta por ti: entiende audios y
            fotos, consulta tu catálogo, agenda citas y cierra ventas. Con el
            tono de tu negocio y una persona real al otro lado cuando hace falta.
          </p>

          <div className="v-hero__actions">
            <a href="#empezar" className="v-btn v-btn--ink">
              Quiero mi agente
              <ArrowRight size={16} strokeWidth={2.2} />
            </a>
            <a href="#demo" className="v-btn v-btn--outline">
              <Play size={13} strokeWidth={2.4} />
              Ver una conversación
            </a>
          </div>

          <ul className="v-trust">
            <li>
              <Clock3 size={15} strokeWidth={1.8} /> En vivo en 14 días
            </li>
            <li>
              <MessageCircle size={15} strokeWidth={1.8} /> Tu número de siempre
            </li>
            <li>
              <Headset size={15} strokeWidth={1.8} /> Soporte humano
            </li>
          </ul>

          <span className="v-hand v-hero__hand">
            abierto 24/7, incluso cuando no lo estás.
          </span>
        </div>

        <div className="v-hero__art" aria-hidden="true">
          <NodeMap className="v-hero__map" />

          <PhoneFrame className="v-hero__phone">
            <ChatHead name="Tienda Aurora" status="Zifro atendiendo · en línea" />
            <ChatBody>
              <Day>HOY</Day>
              <In time="9:38">
                Hola, ¿les queda el bolso Aurora en café? Es para un regalo.
              </In>
              <Out time="9:38">
                Sí. Quedan 3 en café. Está en $189.000 e incluye envío a Medellín.
              </Out>
              <div className="v-productmsg">
                <ProductCard
                  label="En stock"
                  name="Bolso Aurora"
                  meta="Cuero café · envío incluido"
                  price="$189.000"
                  stock="Quedan 3"
                />
              </div>
              <In time="9:39">¿Llega mañana?</In>
              <Out time="9:39">
                Sí, si confirmas antes de las 5:00 p.m. ¿Te lo reservo?
              </Out>
              <SystemNote>Pedido #1042 creado · $189.000</SystemNote>
              <div className="v-bubble v-bubble--in v-bubble--typing">
                <Typing />
              </div>
            </ChatBody>
            <ChatComposer />
          </PhoneFrame>

          <div className="v-float v-float--response">
            <span className="v-float__eyebrow">Primera respuesta</span>
            <strong>3.2 s</strong>
            <Sparkline className="v-float__spark" />
            <span className="v-float__note">promedio esta semana</span>
          </div>

          <div className="v-float v-float--order">
            <span className="v-float__icon">
              <Check size={14} strokeWidth={2.6} />
            </span>
            <span className="v-float__copy">
              <strong>Pedido #1042</strong>
              <span>$189.000 · confirmado</span>
            </span>
          </div>

          <span className="v-hero__coords">6.2442° N · 75.5812° O</span>
        </div>
      </div>

      <div className="v-wrap v-strip">
        <div className="v-strip__head">
          <span className="v-kicker">Se conecta con lo que ya usas</span>
          <p>Tu información, donde ya vive. Sin migraciones eternas.</p>
        </div>
        <ul className="v-strip__cells">
          {[
            { icon: MessageCircle, label: "WhatsApp Business" },
            { icon: CalendarDays, label: "Google Calendar" },
            { icon: ShoppingBag, label: "Shopify" },
            { icon: Database, label: "HubSpot" },
            { icon: Table2, label: "Google Sheets" },
            { icon: PlugZap, label: "Tu sistema" },
          ].map((item) => (
            <li key={item.label}>
              <item.icon size={17} strokeWidth={1.6} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <p className="v-strip__note">
          Si usas otra herramienta, la revisamos en el diagnóstico.
        </p>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section id="problema" className="v-section v-problem">
      <div className="v-wrap v-problem__grid">
        <Reveal className="v-problem__copy">
          <span className="v-eyebrow">01 / El costo invisible</span>
          <h2 className="v-h2">
            El mensaje que no contestaste sigue costando.
          </h2>
          <p className="v-lead">
            No es solo una conversación perdida. Es un cliente que ya estaba
            listo para comprar y encontró a alguien más despierto.
          </p>

          <div className="v-window">
            <span className="v-window__num">5 min</span>
            <p>
              La ventana en la que un cliente caliente todavía te espera antes
              de escribirle a otro.
            </p>
          </div>
        </Reveal>

        <Reveal className="v-problem__body" delay={80}>
          <div className="v-ledger">
            <div className="v-ledger__top">
              <span>Conversación #0381</span>
              <span className="v-tag v-tag--lost">Perdida</span>
            </div>

            <div className="v-ledger__row">
              <time>21:14</time>
              <div>
                <b>Camila</b>
                <p>¿Les queda la talla 42?</p>
              </div>
            </div>

            <div className="v-ledger__gap">
              <span aria-hidden="true" />
              9 h 49 min sin respuesta
            </div>

            <div className="v-ledger__row">
              <time>08:03</time>
              <div>
                <b>Tú</b>
                <p>Sí, buenos días. Sí nos queda.</p>
              </div>
            </div>

            <div className="v-ledger__row v-ledger__row--lost">
              <time>08:04</time>
              <div>
                <b>Camila</b>
                <p>Ya compré, gracias.</p>
              </div>
            </div>

            <div className="v-ledger__foot">
              Mientras dormías, alguien más contestó.
            </div>
          </div>

          <div className="v-costs">
            {[
              {
                n: "01",
                title: "Tiempo",
                text: "Responder a mano no escala con la temporada.",
              },
              {
                n: "02",
                title: "Consistencia",
                text: "Cada persona de tu equipo responde distinto.",
              },
              {
                n: "03",
                title: "Contexto",
                text: "El historial se pierde entre chats, notas y llamadas.",
              },
            ].map((cost) => (
              <div className="v-cost" key={cost.n}>
                <span className="v-cost__n">{cost.n}</span>
                <div>
                  <b>{cost.title}</b>
                  <p>{cost.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function UnderstandVisual() {
  return (
    <div className="v-stage">
      <div className="v-mini">
        <div className="v-mini__head">
          <span className="v-mini__dot" />
          <b>Cliente</b>
          <span>9:41</span>
        </div>
        <div className="v-bubble v-bubble--in">
          <span>¿Tienen este modelo? Es para mañana.</span>
        </div>
        <PhotoBubble caption="foto de referencia" />
        <AudioBubble duration="0:07" />
      </div>

      <div className="v-reading">
        <div className="v-reading__head">
          <span>Lectura del agente</span>
          <i>en vivo</i>
        </div>
        <div className="v-reading__row">
          <span>Intención</span>
          <b>Compra</b>
        </div>
        <div className="v-reading__row">
          <span>Producto</span>
          <b>Bolso Aurora</b>
        </div>
        <div className="v-reading__row">
          <span>Urgencia</span>
          <b>Alta · para mañana</b>
        </div>
        <div className="v-reading__row">
          <span>Canal</span>
          <b>WhatsApp</b>
        </div>
      </div>
    </div>
  )
}

function SellVisual() {
  const rows = [
    { name: "Bolso Aurora", meta: "Cuero café", price: "$189.000", stock: "3", tone: "ok" },
    { name: "Bolso Aurora", meta: "Cuero negro", price: "$189.000", stock: "0", tone: "out" },
    { name: "Billetera Sur", meta: "Miel", price: "$74.000", stock: "8", tone: "ok" },
    { name: "Correa Norte", meta: "Café oscuro", price: "$58.000", stock: "12", tone: "ok" },
  ]

  return (
    <div className="v-stage">
      <div className="v-catalog">
        <div className="v-catalog__head">
          <span>Catálogo · Tienda Aurora</span>
          <span className="v-live">
            <i /> sincronizado
          </span>
        </div>
        {rows.map((row, i) => (
          <div className={`v-catalog__row ${i === 0 ? "is-hot" : ""}`} key={`${row.name}-${row.meta}`}>
            <div>
              <b>{row.name}</b>
              <span>{row.meta}</span>
            </div>
            <span className="v-catalog__price">{row.price}</span>
            <span className={`v-stock v-stock--${row.tone}`}>
              {row.tone === "out" ? "Agotado" : row.stock}
            </span>
          </div>
        ))}
        <div className="v-catalog__foot">
          <MessageCircle size={14} strokeWidth={1.8} />
          <span>El agente cotiza con el precio y el stock reales.</span>
        </div>
      </div>
    </div>
  )
}

function CloseVisual() {
  return (
    <div className="v-stage">
      <div className="v-order">
        <div className="v-order__head">
          <span>Pedido #1042</span>
          <span className="v-tag v-tag--ok">Confirmado</span>
        </div>
        <div className="v-order__line">
          <span>Bolso Aurora · café</span>
          <b>$189.000</b>
        </div>
        <div className="v-order__line">
          <span>Envío a Medellín</span>
          <b>Incluido</b>
        </div>
        <div className="v-order__timeline">
          <span className="is-done">
            <i /> Creado
          </span>
          <span className="is-done">
            <i /> Pago
          </span>
          <span className="is-done">
            <i /> Confirmado
          </span>
        </div>
        <div className="v-order__foot">
          <CalendarDays size={15} strokeWidth={1.8} />
          Entrega mañana · 9:00 a.m. – 12:00 p.m.
        </div>
      </div>
      <span className="v-stage__note">registrado en tu sistema</span>
    </div>
  )
}

function HandoffVisual() {
  return (
    <div className="v-stage">
      <div className="v-handoff">
        <div className="v-handoff__head">
          <span className="v-avatar">L</span>
          <div>
            <b>Laura R.</b>
            <span>Ventas · tomó la conversación</span>
          </div>
          <span className="v-tag">hace 2 min</span>
        </div>

        <div className="v-handoff__summary">
          <span>Resumen para Laura</span>
          <p>
            Cliente quiere factura electrónica y pago contra entrega. Pedido
            #1042 listo para confirmar.
          </p>
        </div>

        <ul className="v-handoff__list">
          <li>
            <Check size={13} strokeWidth={2.4} /> Historial completo
          </li>
          <li>
            <Check size={13} strokeWidth={2.4} /> Producto y precio
          </li>
          <li>
            <Check size={13} strokeWidth={2.4} /> Próximo paso acordado
          </li>
        </ul>

        <div className="v-handoff__actions">
          <span>Ver conversación</span>
          <span className="is-solid">Tomar</span>
        </div>
      </div>
    </div>
  )
}

const agentTabs = [
  {
    id: "entiende",
    nav: "Entiende",
    sub: "Lee, escucha y mira",
    index: "01",
    title: "Lee el mensaje, no solo el texto.",
    body: "Interpreta audios, fotos y links. Detecta si el cliente pregunta por precio, disponibilidad o una cita, y responde con la información correcta.",
    points: [
      "Transcribe notas de voz y las entiende en contexto.",
      "Reconoce productos en una foto o un catálogo.",
      "Detecta urgencia, intención y objeciones.",
    ],
    visual: <UnderstandVisual />,
  },
  {
    id: "vende",
    nav: "Vende",
    sub: "Cotiza con datos reales",
    index: "02",
    title: "Sabe qué tienes y a cuánto.",
    body: "Se conecta a tu catálogo, inventario o sistema. Cotiza con precios reales y ofrece alternativas cuando algo no está disponible.",
    points: [
      "Consulta stock y precios en tiempo real.",
      "Ofrece variantes, combos y alternativas.",
      "Nunca promete algo que no puedes cumplir.",
    ],
    visual: <SellVisual />,
  },
  {
    id: "cierra",
    nav: "Cierra",
    sub: "Reserva, agenda, registra",
    index: "03",
    title: "No deja la venta en “te aviso”.",
    body: "Toma los datos, reserva el pedido o agenda la cita y lo registra en tu sistema. Si hace falta un pago, envía el link y confirma.",
    points: [
      "Cierra pedidos y citas dentro del chat.",
      "Envía links de pago y confirma la transacción.",
      "Deja todo registrado para tu equipo.",
    ],
    visual: <CloseVisual />,
  },
  {
    id: "escala",
    nav: "Escala",
    sub: "Pasa a una persona",
    index: "04",
    title: "Sabe cuándo llamar a una persona.",
    body: "Cuando la conversación lo amerita, la transfiere a tu equipo con el resumen y el contexto completo. El cliente no tiene que repetir nada.",
    points: [
      "Reglas claras para transferir a un humano.",
      "Resumen automático antes de la entrega.",
      "El historial completo viaja con la conversación.",
    ],
    visual: <HandoffVisual />,
  },
]

function AgentSection() {
  const [active, setActive] = useState(0)
  const tab = agentTabs[active]

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % agentTabs.length
    else if (event.key === "ArrowLeft") next = (index - 1 + agentTabs.length) % agentTabs.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = agentTabs.length - 1
    else return
    event.preventDefault()
    setActive(next)
    const target = document.getElementById(`v-tab-${agentTabs[next].id}`)
    target?.focus()
  }

  return (
    <section id="agente" className="v-section v-agent">
      <div className="v-wrap">
        <Reveal className="v-sectionhead">
          <div>
            <span className="v-eyebrow">02 / El agente</span>
            <h2 className="v-h2">No es un menú. Es una conversación que sabe a dónde va.</h2>
          </div>
          <p className="v-sectionhead__note">
            La diferencia entre un bot que estorba y un vendedor que ayuda está
            en lo que entiende antes de responder.
          </p>
        </Reveal>

        <div className="v-tabstrip" role="tablist" aria-label="Qué hace el agente">
          {agentTabs.map((item, index) => (
            <button
              key={item.id}
              id={`v-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`v-panel-${item.id}`}
              tabIndex={active === index ? 0 : -1}
              className={`v-tab ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className="v-tab__dot" aria-hidden="true" />
              <span className="v-tab__name">{item.nav}</span>
              <span className="v-tab__sub">{item.sub}</span>
            </button>
          ))}
        </div>

        <div
          className="v-panel"
          role="tabpanel"
          id={`v-panel-${tab.id}`}
          aria-labelledby={`v-tab-${tab.id}`}
          key={tab.id}
        >
          <div className="v-panel__copy">
            <span className="v-panel__index">
              {tab.index} <i>/</i> 04
            </span>
            <h3>{tab.title}</h3>
            <p>{tab.body}</p>
            <ul className="v-ticks">
              {tab.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="v-panel__visual">{tab.visual}</div>
        </div>
      </div>
    </section>
  )
}

type DemoMessage =
  | { kind: "in"; text: string; step: number }
  | { kind: "out"; text: string; step: number }
  | { kind: "product"; step: number }
  | { kind: "system"; text: string; step: number }

const demoMessages: DemoMessage[] = [
  {
    kind: "in",
    text: "Hola, ¿tienen el bolso Aurora en café? Es para un regalo.",
    step: 0,
  },
  {
    kind: "out",
    text: "Sí. Quedan 3 en café. Está en $189.000 e incluye envío a Medellín.",
    step: 1,
  },
  { kind: "product", step: 1 },
  { kind: "in", text: "¿Llega mañana?", step: 2 },
  {
    kind: "out",
    text: "Sí, si confirmas antes de las 5:00 p.m. ¿Te lo reservo?",
    step: 2,
  },
  { kind: "in", text: "Sí, por favor.", step: 3 },
  { kind: "system", text: "Pedido #1042 creado · $189.000", step: 3 },
  {
    kind: "out",
    text: "Listo. Te envío el link de pago. Al confirmarse, llega mañana entre 9:00 a.m. y 12:00 p.m.",
    step: 3,
  },
  { kind: "system", text: "Pago confirmado · pedido en preparación", step: 3 },
]

const demoSteps = [
  {
    n: "01",
    title: "Lee la intención",
    text: "Producto, talla, urgencia y para quién es.",
  },
  {
    n: "02",
    title: "Consulta tu inventario",
    text: "Precio y stock reales, no una plantilla.",
  },
  {
    n: "03",
    title: "Propone el siguiente paso",
    text: "Reserva antes de que la conversación se enfríe.",
  },
  {
    n: "04",
    title: "Registra y confirma",
    text: "Pedido, pago y entrega en tu sistema.",
  },
]

function DemoSection() {
  const { ref, isVisible } = useScrollReveal(0.18)
  const [visible, setVisible] = useState(3)
  const [playing, setPlaying] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(query.matches)
    const onChange = () => setReduceMotion(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setVisible(demoMessages.length)
      setPlaying(false)
      return
    }
    if (isVisible) setPlaying(true)
  }, [isVisible, reduceMotion])

  useEffect(() => {
    if (!playing) return
    if (visible >= demoMessages.length) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => {
      setVisible((value) => Math.min(value + 1, demoMessages.length))
    }, 1250)
    return () => window.clearTimeout(timer)
  }, [playing, visible])

  const activeStep = useMemo(() => {
    if (visible >= demoMessages.length) return 3
    return demoMessages[Math.max(visible - 1, 0)]?.step ?? 0
  }, [visible])

  const atEnd = visible >= demoMessages.length

  const replay = () => {
    setVisible(3)
    setPlaying(true)
  }

  return (
    <section id="demo" className="v-demo">
      <div className="v-wrap v-demo__grid" ref={ref}>
        <div className="v-demo__copy">
          <span className="v-eyebrow v-eyebrow--light">03 / La conversación</span>
          <h2 className="v-h2 v-h2--light">
            Así se ve una venta a las <span>11:48 p.m.</span>
          </h2>
          <p className="v-demo__lead">
            Sin formularios, sin “presiona 1”. Una conversación normal que
            termina en un pedido, una cita o una persona real.
          </p>

          <ol className="v-demo__steps">
            {demoSteps.map((step, index) => (
              <li key={step.n} className={activeStep === index ? "is-active" : ""}>
                <span className="v-demo__stepn">{step.n}</span>
                <div>
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="v-demo__controls">
            <button type="button" onClick={() => (atEnd ? replay() : setPlaying((v) => !v))}>
              {atEnd ? (
                <>
                  <Play size={13} strokeWidth={2.4} /> Reproducir de nuevo
                </>
              ) : playing ? (
                <>
                  <Pause size={13} strokeWidth={2.4} /> Pausar
                </>
              ) : (
                <>
                  <Play size={13} strokeWidth={2.4} /> Continuar
                </>
              )}
            </button>
            <span>
              {atEnd ? "Fin de la conversación" : `${Math.min(visible, demoMessages.length)} de ${demoMessages.length} mensajes`}
            </span>
          </div>

          <span className="v-hand v-demo__hand">
            a las 11:48 p.m. nadie más está despierto.
          </span>
        </div>

        <div className="v-demo__art" aria-hidden="true">
          <NodeMap className="v-demo__map" />
          <PhoneFrame className="v-demo__phone">
            <ChatHead name="Tienda Aurora" status="Zifro atendiendo · en línea" />
            <ChatBody>
              <Day>HOY · 11:48 P.M.</Day>
              {demoMessages.slice(0, visible).map((message, index) => {
                if (message.kind === "in") return <In key={index}>{message.text}</In>
                if (message.kind === "out") return <Out key={index}>{message.text}</Out>
                if (message.kind === "system")
                  return <SystemNote key={index}>{message.text}</SystemNote>
                return (
                  <div className="v-productmsg" key={index}>
                    <ProductCard
                      label="En stock"
                      name="Bolso Aurora"
                      meta="Cuero café · envío incluido"
                      price="$189.000"
                      stock="Quedan 3"
                    />
                  </div>
                )
              })}
              {!atEnd && playing && (
                <div className="v-bubble v-bubble--in v-bubble--typing">
                  <Typing />
                </div>
              )}
            </ChatBody>
            <ChatComposer />
          </PhoneFrame>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="nosotros" className="v-section v-about">
      <div className="v-wrap v-about__grid">
        <Reveal className="v-about__copy">
          <span className="v-eyebrow">04 / Quiénes somos</span>
          <h2 className="v-h2">
            Somos Zifro. Un equipo pequeño que construye agentes para negocios
            reales.
          </h2>
          <p className="v-lead">
            Nacimos en Medellín construyendo software a la medida. Hoy hacemos
            tres cosas: agentes de IA para WhatsApp, recordatorios que confirman
            solos y desarrollo cuando la herramienta que necesitas no existe.
          </p>
          <p className="v-body">
            No vendemos una licencia y desaparecemos. Nos quedamos ajustando el
            agente con conversaciones reales hasta que funciona como tu mejor
            vendedor: el que conoce el catálogo, no inventa y sabe cuándo pasar
            la conversación.
          </p>

          <div className="v-signature">
            <span className="v-signature__node" aria-hidden="true" />
            <div>
              <b>Equipo Zifro</b>
              <span>Medellín, Colombia · desde 2023</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="v-about__dossierwrap" delay={80}>
          <aside className="v-dossier">
            <div className="v-dossier__top">
              <span>ZIFRO / FICHA DE EQUIPO</span>
              <ZifroMark className="v-dossier__mark" />
            </div>

            <NodeMap className="v-dossier__map" />

            <dl className="v-dossier__list">
              <div>
                <dt>Base</dt>
                <dd>Medellín, Colombia</dd>
              </div>
              <div>
                <dt>Enfoque</dt>
                <dd>WhatsApp, agentes, recordatorios y software a medida</dd>
              </div>
              <div>
                <dt>Modo</dt>
                <dd>Diagnóstico, prototipo, vivo y ajustes con uso real</dd>
              </div>
              <div>
                <dt>Compromiso</dt>
                <dd>Una persona real detrás de cada agente</dd>
              </div>
            </dl>

            <div className="v-dossier__foot">
              <span className="v-stamp">Z</span>
              <p className="v-hand">
                hecho en Medellín, para negocios que no duermen.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}

function ActivityChart() {
  const bars = [
    4, 3, 2, 2, 1, 2, 5, 9, 14, 18, 22, 26, 31, 28, 24, 27, 33, 38, 41, 36, 30, 24, 18, 12,
  ]
  return (
    <svg
      viewBox="0 0 480 132"
      className="v-chart"
      role="img"
      aria-label="Volumen de mensajes por hora, con actividad durante todo el día"
    >
      <line x1="0" y1="112" x2="480" y2="112" stroke="currentColor" strokeOpacity="0.22" />
      {bars.map((value, index) => {
        const height = (value / 41) * 92
        const night = index >= 21 || index <= 5
        return (
          <rect
            key={index}
            x={index * 20 + 3}
            y={112 - height}
            width="13"
            height={height}
            rx="2"
            fill={night ? "#FF7A2B" : "currentColor"}
            opacity={night ? 0.9 : 0.82}
          />
        )
      })}
      {[
        { x: 3, label: "00" },
        { x: 123, label: "06" },
        { x: 243, label: "12" },
        { x: 363, label: "18" },
        { x: 459, label: "23" },
      ].map((tick) => (
        <text
          key={tick.label}
          x={tick.x}
          y="128"
          fill="currentColor"
          fontSize="9"
          opacity="0.55"
          letterSpacing="0.08em"
        >
          {tick.label}
        </text>
      ))}
    </svg>
  )
}

function WeekSection() {
  return (
    <section className="v-section v-week">
      <div className="v-wrap v-week__grid">
        <Reveal className="v-week__copy">
          <span className="v-eyebrow">05 / Lo que cambia</span>
          <h2 className="v-h2">Menos mensajes repetidos. Más conversaciones cerradas.</h2>
          <p className="v-lead">
            No se trata de contestar por contestar. Se trata de que cada
            conversación avance mientras tu equipo hace lo que sí necesita
            criterio humano.
          </p>

          <div className="v-outcomes">
            {[
              {
                title: "Respondes en segundos.",
                text: "El agente contesta en el primer minuto, incluso a las 2 a.m.",
              },
              {
                title: "Tu equipo entra cuando hace falta.",
                text: "Lo repetido se resuelve solo; lo importante llega con contexto.",
              },
              {
                title: "Todo queda registrado.",
                text: "Pedidos, citas y objeciones en un solo lugar, sin notas sueltas.",
              },
            ].map((item, index) => (
              <div className="v-outcome" key={item.title}>
                <span>{`0${index + 1}`}</span>
                <div>
                  <b>{item.title}</b>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="v-week__dashwrap" delay={80}>
          <div className="v-dash">
            <div className="v-dash__top">
              <div>
                <span className="v-dash__label">SEMANA 07</span>
                <b>Tienda Aurora</b>
              </div>
              <span className="v-tag">Ejemplo de operación</span>
            </div>

            <div className="v-dash__metrics">
              <div>
                <span>Primera respuesta</span>
                <strong>3.2 s</strong>
                <small>promedio</small>
              </div>
              <div>
                <span>Conversaciones</span>
                <strong>214</strong>
                <small>en 7 días</small>
              </div>
              <div>
                <span>Pedidos y citas</span>
                <strong>38</strong>
                <small>confirmados</small>
              </div>
              <div>
                <span>Transferencias</span>
                <strong>6</strong>
                <small>a una persona</small>
              </div>
            </div>

            <div className="v-dash__chart">
              <div className="v-dash__charthead">
                <span>Mensajes por hora</span>
                <span className="v-dash__legend">
                  <i /> actividad del agente
                </span>
              </div>
              <ActivityChart />
            </div>

            <p className="v-dash__note">
              Cifras ilustrativas. Tus números se definen contigo en el
              diagnóstico.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function OfferSection() {
  const steps = [
    {
      n: "01",
      label: "Día 1",
      title: "Diagnóstico",
      text: "20 minutos para entender qué vendes, qué preguntas repites y qué información tienes a mano.",
    },
    {
      n: "02",
      label: "Día 2 – 10",
      title: "Construcción",
      text: "Entrenamos al agente con tu catálogo, tu tono, tus reglas y las integraciones que necesitas.",
    },
    {
      n: "03",
      label: "Día 14",
      title: "En vivo",
      text: "Lo probamos con tus clientes reales. Revisamos, ajustamos y dejamos todo documentado.",
    },
  ]

  return (
    <section id="empezar" className="v-section v-offer">
      <div className="v-wrap">
        <Reveal className="v-sectionhead">
          <div>
            <span className="v-eyebrow">06 / Empezar</span>
            <h2 className="v-h2">En 14 días, tu WhatsApp atiende solo.</h2>
          </div>
          <p className="v-sectionhead__note">
            Abrimos 4 implementaciones por mes para poder acompañar cada una de
            cerca. La propuesta es cerrada y se define después del diagnóstico.
          </p>
        </Reveal>

        <div className="v-offer__grid">
          <Reveal className="v-offer__steps">
            <ol className="v-steps">
              {steps.map((step) => (
                <li key={step.n}>
                  <span className="v-steps__node" aria-hidden="true" />
                  <span className="v-steps__meta">
                    {step.n} · {step.label}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="v-offer__cardwrap" delay={80}>
            <div className="v-includes">
              <span className="v-includes__watermark" aria-hidden="true">
                14
              </span>
              <div className="v-includes__top">
                <span className="v-kicker">Qué incluye</span>
                <h3>Una implementación completa, no un experimento.</h3>
              </div>

              <ul className="v-includes__list">
                {[
                  "Agente entrenado con tu información y tu tono",
                  "Conexión a tu WhatsApp Business actual",
                  "Catálogo, agenda, CRM o la herramienta que uses",
                  "Transferencia a personas con contexto completo",
                  "Panel para revisar conversaciones y resultados",
                  "30 días de ajustes después de salir en vivo",
                ].map((item) => (
                  <li key={item}>
                    <Check size={14} strokeWidth={2.6} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="v-includes__cta">
                <a href="#contacto" className="v-btn v-btn--ink">
                  Reservar diagnóstico
                  <ArrowRight size={16} strokeWidth={2.2} />
                </a>
                <span>Sin costo · 20 minutos · sin compromiso</span>
              </div>

              <div className="v-includes__foot">
                <ShieldCheck size={15} strokeWidth={1.8} />
                <span>Firmamos acuerdo de confidencialidad si lo necesitas.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const faqs = [
  {
    q: "¿Tengo que cambiar mi número de WhatsApp?",
    a: "No. Trabajamos sobre tu WhatsApp Business actual. Tus clientes siguen escribiendo al mismo número y conservas tu historial y tu identidad.",
  },
  {
    q: "¿El agente puede equivocarse?",
    a: "Puede. Por eso lo entrenamos con tu información y le ponemos límites: si no está seguro, no inventa; pregunta o pasa la conversación a una persona. Cada respuesta queda registrada para revisarla.",
  },
  {
    q: "¿Qué pasa cuando no sabe responder?",
    a: "La conversación se transfiere a alguien de tu equipo con el resumen completo: qué quiere el cliente, qué se habló y cuál es el siguiente paso. El cliente no tiene que repetir nada.",
  },
  {
    q: "¿Se conecta a mi catálogo y a mi agenda?",
    a: "Sí. Podemos leer tu inventario, tus precios, tu calendario o tu CRM. Si la herramienta no tiene una integración directa, buscamos la forma de conectarla.",
  },
  {
    q: "¿Reemplaza a mi equipo?",
    a: "No. Lo libera de lo repetitivo. El agente atiende lo que ya sabes responder; tu equipo se queda con lo que requiere criterio, negociación o una conversación más humana.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "La implementación se cotiza después del diagnóstico, según el alcance y las integraciones. No hay una tarifa única porque no hay dos negocios iguales. La propuesta es cerrada: sabes qué incluye antes de empezar.",
  },
  {
    q: "¿Qué pasa con los datos de mis clientes?",
    a: "Son tuyos. Las conversaciones se tratan con protocolos de seguridad y no se usan para entrenar modelos de terceros. Podemos firmar un acuerdo de confidencialidad antes de empezar.",
  },
]

function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="preguntas" className="v-section v-faq">
      <div className="v-wrap v-faq__grid">
        <Reveal className="v-faq__head">
          <span className="v-eyebrow">07 / Preguntas</span>
          <h2 className="v-h2">Lo que suelen preguntarnos antes de empezar.</h2>
          <p className="v-lead">
            Si falta algo, escríbenos. Respondemos con una persona, no con un
            formulario.
          </p>
          <a className="v-textlink v-textlink--mail" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </a>
        </Reveal>

        <Reveal className="v-faq__list" delay={80}>
          {faqs.map((faq, index) => {
            const isOpen = open === index
            return (
              <div className={`v-faq__item ${isOpen ? "is-open" : ""}`} key={faq.q}>
                <button
                  type="button"
                  id={`v-faq-q-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`v-faq-a-${index}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="v-faq__num">{`0${index + 1}`}</span>
                  <span className="v-faq__q">{faq.q}</span>
                  <span className="v-faq__icon" aria-hidden="true">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <div
                    className="v-faq__a"
                    id={`v-faq-a-${index}`}
                    role="region"
                    aria-labelledby={`v-faq-q-${index}`}
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

function FinalCta() {
  const [business, setBusiness] = useState("")
  const [sector, setSector] = useState("")
  const [message, setMessage] = useState("")

  const composedMessage = useMemo(() => {
    const lines = ["Hola Zifro, quiero mi agente de WhatsApp con IA."]
    if (business.trim()) lines.push(`Mi negocio: ${business.trim()}.`)
    if (sector) lines.push(`Sector: ${sector}.`)
    if (message.trim()) lines.push(`Lo que más repito: ${message.trim()}`)
    return lines.join(" ")
  }, [business, sector, message])

  const href = whatsappLink(composedMessage)
  const viaWhatsApp = Boolean(WHATSAPP_NUMBER)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (href.startsWith("https")) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    window.location.href = href
  }

  return (
    <section id="contacto" className="v-final">
      <div className="v-wrap v-final__grid">
        <Reveal className="v-final__copy">
          <span className="v-eyebrow v-eyebrow--light">08 / Hablemos</span>
          <h2 className="v-h2 v-h2--light">
            Deja de contestar lo mismo. Empieza a cerrar más.
          </h2>
          <p className="v-final__lead">
            Cuéntanos qué vendes y te mostramos cómo se vería tu agente en una
            conversación real. 20 minutos, sin presentación de PowerPoint.
          </p>

          <ul className="v-final__trust">
            <li>
              <Check size={14} strokeWidth={2.6} /> Diagnóstico sin costo
            </li>
            <li>
              <Check size={14} strokeWidth={2.6} /> Propuesta cerrada
            </li>
            <li>
              <Check size={14} strokeWidth={2.6} /> Respuesta en un día hábil
            </li>
          </ul>

          <span className="v-hand v-final__hand">
            te responde una persona, no un bot.
          </span>
        </Reveal>

        <Reveal className="v-final__formwrap" delay={80}>
          <form className="v-compose" onSubmit={handleSubmit}>
            <div className="v-compose__top">
              <span className="v-compose__dot" aria-hidden="true" />
              <span>Nuevo mensaje · Zifro</span>
              <span className="v-compose__live">en línea</span>
            </div>

            <label className="v-field">
              <span>Tu negocio</span>
              <input
                type="text"
                value={business}
                onChange={(event) => setBusiness(event.target.value)}
                placeholder="Ej. Tienda Aurora"
              />
            </label>

            <fieldset className="v-field v-field--chips">
              <legend>¿Qué tipo de negocio es?</legend>
              <div className="v-chips">
                {["Tienda", "Servicios", "Restaurante", "Clínica", "Otro"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={sector === item}
                    className={sector === item ? "is-active" : ""}
                    onClick={() => setSector(sector === item ? "" : item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="v-field">
              <span>¿Qué preguntas repites todos los días?</span>
              <textarea
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ej. Pregunto precios, tallas y si llega mañana."
              />
            </label>

            <button type="submit" className="v-btn v-btn--ink v-compose__send">
              {viaWhatsApp ? "Enviar por WhatsApp" : "Enviar por correo"}
              <Send size={15} strokeWidth={2.2} />
            </button>

            <p className="v-compose__note">
              {viaWhatsApp
                ? "Se abre WhatsApp con tu mensaje listo."
                : "Se abre tu correo con el mensaje listo."}{" "}
              Si prefieres, escríbenos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="v-footer">
      <div className="v-wrap">
        <div className="v-footer__top">
          <div className="v-footer__brand">
            <ZifroLockup tone="cream" />
            <p>
              Agentes de IA para WhatsApp, recordatorios y software a la medida.
              Construido en Medellín para negocios que no duermen.
            </p>
            <a href="/" className="v-footer__back">
              Ir al sitio principal <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>

          <div className="v-footer__col">
            <h3>Producto</h3>
            <a href="/ventas">WhatsApp con IA</a>
            <a href="/ziff">Ziff</a>
            <a href="/#servicios">Agentes de IA</a>
            <a href="/#servicios">Recordatorios</a>
          </div>

          <div className="v-footer__col">
            <h3>Zifro</h3>
            <a href="#nosotros">Nosotros</a>
            <a href="#empezar">Cómo funciona</a>
            <a href="#preguntas">Preguntas</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Contacto</a>
          </div>

          <div className="v-footer__col">
            <h3>Legal</h3>
            <a href="/privacidad">Privacidad</a>
            <a href="/terminos">Términos</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>

        <div className="v-footer__bottom">
          <span>© 2026 Zifro · Medellín, Colombia</span>
          <span>Hecho con conversaciones reales.</span>
        </div>

        <ZifroWordmark className="v-footer__ghost" />
      </div>
    </footer>
  )
}

export function VentasLanding() {
  return (
    <div className="v-root">
      <TopBar />
      <main>
        <Hero />
        <ProblemSection />
        <AgentSection />
        <DemoSection />
        <AboutSection />
        <WeekSection />
        <OfferSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
