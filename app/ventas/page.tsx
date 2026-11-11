import type { Metadata, Viewport } from "next"
import { VentasLanding } from "@/components/ventas/ventas-landing"
import "./ventas-base.css"
import "./ventas-sections.css"
import "./ventas-chat.css"
import "./ventas-responsive.css"

const siteUrl = "https://zifro.app"

export const viewport: Viewport = {
  themeColor: "#f5f2eb",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Ventas por WhatsApp con IA",
  description:
    "Zifro construye tu agente de ventas para WhatsApp: contesta, cotiza, agenda y cierra con el tono de tu negocio. Implementación en 14 días y diagnóstico sin costo.",
  alternates: {
    canonical: "/ventas",
  },
  openGraph: {
    title: "Tu WhatsApp no debería cerrar a las 6 | Zifro",
    description:
      "Agentes de IA que atienden, cotizan y cierran por WhatsApp. Con el tono de tu negocio y una persona real cuando hace falta.",
    url: `${siteUrl}/ventas`,
    siteName: "Zifro",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-ventas.png",
        width: 1200,
        height: 630,
        alt: "Zifro — agentes de IA para WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu WhatsApp no debería cerrar a las 6 | Zifro",
    description:
      "Agentes de IA que atienden, cotizan y cierran por WhatsApp. Diagnóstico sin costo.",
    images: ["/og-ventas.png"],
  },
}

const ventasJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Agente de ventas por WhatsApp con IA",
      serviceType: "Agente de inteligencia artificial para atención y ventas por WhatsApp",
      description:
        "Zifro diseña e implementa un agente de IA que atiende, cotiza, agenda y cierra ventas por WhatsApp, conectado al catálogo, la agenda y los sistemas del negocio.",
      provider: {
        "@type": "Organization",
        name: "Zifro",
        url: siteUrl,
      },
      areaServed: [
        { "@type": "Country", name: "Colombia" },
        { "@type": "Place", name: "Latinoamérica" },
      ],
      url: `${siteUrl}/ventas`,
      offers: {
        "@type": "Offer",
        name: "Diagnóstico de implementación",
        price: "0",
        priceCurrency: "COP",
        description:
          "Diagnóstico de 20 minutos para definir el alcance del agente de WhatsApp y recibir una propuesta cerrada.",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ventas por WhatsApp con IA",
          item: `${siteUrl}/ventas`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Tengo que cambiar mi número de WhatsApp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Trabajamos sobre tu WhatsApp Business actual. Tus clientes siguen escribiendo al mismo número y conservas tu historial y tu identidad.",
          },
        },
        {
          "@type": "Question",
          name: "¿El agente puede equivocarse?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Puede. Por eso lo entrenamos con tu información y le ponemos límites: si no está seguro, no inventa; pregunta o pasa la conversación a una persona.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué pasa cuando no sabe responder?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La conversación se transfiere a alguien de tu equipo con el resumen completo: qué quiere el cliente, qué se habló y cuál es el siguiente paso.",
          },
        },
        {
          "@type": "Question",
          name: "¿Se conecta a mi catálogo y a mi agenda?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Podemos leer inventario, precios, calendario o CRM. Si la herramienta no tiene integración directa, buscamos la forma de conectarla.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La implementación se cotiza después del diagnóstico, según el alcance y las integraciones. La propuesta es cerrada y se conoce antes de empezar.",
          },
        },
        {
          "@type": "Question",
          name: "¿Reemplaza a mi equipo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Lo libera de lo repetitivo. El agente atiende lo que ya sabes responder; tu equipo se queda con lo que requiere criterio, negociación o una conversación más humana.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué pasa con los datos de mis clientes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Son tuyos. Las conversaciones se tratan con protocolos de seguridad y no se usan para entrenar modelos de terceros. Podemos firmar un acuerdo de confidencialidad antes de empezar.",
          },
        },
      ],
    },
  ],
}

export default function VentasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ventasJsonLd) }}
      />
      <VentasLanding />
    </>
  )
}
