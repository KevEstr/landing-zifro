import type { Metadata } from "next"
import { VeraLanding } from "@/components/vera-landing"

export const metadata: Metadata = {
  title: "Ziff | Agente de IA para WhatsApp que vende por ti — Zifro",
  description:
    "Ziff es el agente de inteligencia artificial de Zifro para WhatsApp: lee mensajes, ve fotos, escucha audios, responde con voz propia y consulta tu inventario en tiempo real. Atiende y vende 24/7.",
  openGraph: {
    title: "Ziff | Tu mejor vendedor vive en WhatsApp",
    description:
      "Agente de IA multimodal para WhatsApp. Ve, escucha, habla y consulta tu inventario. Atiende y vende sin descanso.",
    type: "website",
  },
}

export default function VeraPage() {
  return <VeraLanding />
}
