import type { Metadata } from "next"
import { VeraLanding } from "@/components/vera-landing"

export const metadata: Metadata = {
  title: "Ziff | Agente de IA para WhatsApp que vende por ti — Zifro",
  description:
    "Ziff es el agente de inteligencia artificial de Zifro para WhatsApp: lee mensajes, ve fotos, escucha audios, responde con voz propia y consulta tu inventario en tiempo real. Atiende y vende 24/7.",
  alternates: {
    canonical: "/ziff",
  },
  openGraph: {
    title: "Ziff | Tu mejor vendedor vive en WhatsApp",
    description:
      "Agente de IA multimodal para WhatsApp. Ve, escucha, habla y consulta tu inventario. Atiende y vende sin descanso.",
    type: "website",
  },
}

export default function VeraPage() {
  const ziffJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Ziff — Agente de IA para WhatsApp",
        serviceType: "Agente de inteligencia artificial para atención y ventas",
        description:
          "Ziff es el agente de IA multimodal de Zifro para WhatsApp: lee mensajes, interpreta fotos, escucha audios, responde con voz y consulta el inventario en tiempo real para atender y vender 24/7.",
        provider: {
          "@type": "Organization",
          name: "Zifro",
          url: "https://zifro.app",
        },
        areaServed: {
          "@type": "Country",
          name: "Colombia",
        },
        url: "https://zifro.app/ziff",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://zifro.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Ziff",
            item: "https://zifro.app/ziff",
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ziffJsonLd) }}
      />
      <VeraLanding />
    </>
  )
}
