import type { ReactNode } from "react"
import {
  ArrowLeft,
  CheckCheck,
  Image as ImageIcon,
  Mic,
  Phone,
  Plus,
  Smile,
  Video,
} from "lucide-react"
import { ZifroMark } from "./brand"

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`v-phone ${className ?? ""}`}>
      <div className="v-phone__notch" aria-hidden="true" />
      {children}
    </div>
  )
}

export function ChatHead({
  name,
  status,
  initial,
}: {
  name: string
  status: string
  initial?: string
}) {
  return (
    <div className="v-chathead">
      <span className="v-chathead__back" aria-hidden="true">
        <ArrowLeft size={15} strokeWidth={2} />
      </span>
      <span className="v-chathead__avatar" aria-hidden="true">
        {initial ? <b>{initial}</b> : <ZifroMark className="v-chathead__mark" />}
        <i />
      </span>
      <span className="v-chathead__id">
        <strong>{name}</strong>
        <small>{status}</small>
      </span>
      <span className="v-chathead__actions" aria-hidden="true">
        <Video size={15} strokeWidth={1.8} />
        <Phone size={14} strokeWidth={1.8} />
      </span>
    </div>
  )
}

export function ChatBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`v-chatbody ${className ?? ""}`}>{children}</div>
}

export function Day({ children = "HOY" }: { children?: ReactNode }) {
  return <div className="v-day">{children}</div>
}

export function In({
  children,
  time,
  className,
}: {
  children: ReactNode
  time?: string
  className?: string
}) {
  return (
    <div className={`v-bubble v-bubble--in ${className ?? ""}`}>
      <span>{children}</span>
      {time && <time>{time}</time>}
    </div>
  )
}

export function Out({
  children,
  time,
  className,
}: {
  children: ReactNode
  time?: string
  className?: string
}) {
  return (
    <div className={`v-bubble v-bubble--out ${className ?? ""}`}>
      <span>{children}</span>
      <time>
        {time}
        <CheckCheck size={12} strokeWidth={2.4} aria-hidden="true" />
      </time>
    </div>
  )
}

export function SystemNote({ children }: { children: ReactNode }) {
  return <div className="v-systemnote">{children}</div>
}

export function ProductCard({
  label,
  name,
  meta,
  price,
  stock,
}: {
  label?: string
  name: string
  meta: string
  price: string
  stock?: string
}) {
  return (
    <div className="v-product">
      <div className="v-product__visual" aria-hidden="true">
        <span />
      </div>
      <div className="v-product__copy">
        {label && <small>{label}</small>}
        <strong>{name}</strong>
        <span>{meta}</span>
        <div className="v-product__row">
          <b>{price}</b>
          {stock && <em>{stock}</em>}
        </div>
      </div>
    </div>
  )
}

export function AudioBubble({
  duration = "0:08",
  bot = false,
}: {
  duration?: string
  bot?: boolean
}) {
  const bars = [0.35, 0.7, 0.45, 0.9, 0.6, 0.3, 0.8, 0.5, 1, 0.42, 0.72, 0.5]
  return (
    <div className={`v-audio ${bot ? "v-audio--bot" : ""}`}>
      <span className="v-audio__play" aria-hidden="true">
        <svg viewBox="0 0 12 12" width="9" height="9">
          <path d="M3 1.8 10 6 3 10.2z" fill="currentColor" />
        </svg>
      </span>
      <span className="v-audio__wave" aria-hidden="true">
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${Math.round(h * 22)}px` }} />
        ))}
      </span>
      <span className="v-audio__time">{duration}</span>
      {!bot && <Mic size={12} strokeWidth={2} aria-hidden="true" />}
    </div>
  )
}

export function PhotoBubble({ caption }: { caption?: string }) {
  return (
    <div className="v-photo">
      <div className="v-photo__frame" aria-hidden="true">
        <ImageIcon size={22} strokeWidth={1.4} />
        <span>foto del cliente</span>
      </div>
      {caption && <p>{caption}</p>}
    </div>
  )
}

export function Typing() {
  return (
    <div className="v-typing" aria-label="Escribiendo">
      <i />
      <i />
      <i />
    </div>
  )
}

export function ChatComposer() {
  return (
    <div className="v-composer" aria-hidden="true">
      <span className="v-composer__field">
        <Plus size={17} strokeWidth={2} />
        <span>Escribe un mensaje</span>
        <Smile size={16} strokeWidth={1.8} />
      </span>
      <span className="v-composer__mic">
        <Mic size={15} strokeWidth={2} />
      </span>
    </div>
  )
}

export function Sparkline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 30"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 24 L14 22 L24 23 L34 16 L46 18 L58 11 L70 13 L82 6 L94 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="94" cy="4" r="2.4" fill="currentColor" />
    </svg>
  )
}
