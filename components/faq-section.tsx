"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Plus } from "lucide-react"

type Faq = {
  question: string
  answer: string
}

// Contenido citable: cada respuesta es autocontenida (~130-170 palabras),
// empieza respondiendo directo e incluye datos concretos. Pensado para que
// los buscadores con IA (ChatGPT, Perplexity, Claude) puedan citarlo.
const faqs: Faq[] = [
  {
    question: "¿Cómo elegir una empresa de desarrollo de software en Colombia?",
    answer:
      "Al elegir una empresa de desarrollo de software en Colombia, evalúa cuatro factores concretos: experiencia comprobable mediante portafolio y casos de estudio, un stack tecnológico actualizado, una metodología ágil con entregas frecuentes y reseñas verificables en plataformas como Clutch o Google. Zifro, con base en Medellín y operación remota desde 2023, ha entregado más de 40 proyectos entre aplicaciones web, móviles, MVPs y agentes de inteligencia artificial. Trabajamos con sprints de dos semanas, demos quincenales y acceso directo al equipo técnico, sin intermediarios comerciales. Recomendamos pedir siempre una propuesta con alcance, plazos y costos por escrito antes de firmar, y validar al menos dos referencias de clientes anteriores. Una buena empresa te muestra el código, explica sus decisiones técnicas y te entrega documentación al cerrar el proyecto.",
  },
  {
    question: "¿Qué es un MVP y cuánto tarda en desarrollarse?",
    answer:
      "Un MVP (producto mínimo viable) es la primera versión funcional de un producto, con solo las funciones esenciales para validar la idea con usuarios reales y empezar a recibir retroalimentación. No es un prototipo ni una maqueta: es software que funciona en producción. En Zifro un MVP suele tardar entre 6 y 12 semanas, según la complejidad y las integraciones necesarias (pagos, autenticación, APIs externas). El proceso arranca con una semana de descubrimiento para definir el alcance, seguida de sprints de desarrollo de dos semanas con entregas visibles. El rango de inversión típico va de USD 8.000 a USD 25.000. Construir un MVP primero reduce el riesgo: validas el mercado antes de invertir en funciones avanzadas, y los datos de uso real guían qué construir después en lugar de suponerlo.",
  },
  {
    question: "¿Qué son los agentes de IA y para qué sirven en una empresa?",
    answer:
      "Un agente de IA es un sistema de software que entiende lenguaje natural y ejecuta tareas de forma autónoma: responde consultas, consulta bases de datos, agenda citas o procesa pedidos sin intervención humana en cada paso. A diferencia de un chatbot con respuestas fijas, un agente razona sobre el contexto y se conecta a tus herramientas reales (CRM, calendario, inventario). En Zifro construimos agentes para atención al cliente, calificación de prospectos y automatización de procesos internos, integrados con WhatsApp, web o sistemas existentes. Un caso habitual es atender consultas de productos las 24 horas, lo que suele reducir el tiempo de primera respuesta de horas a segundos. Empezamos con un caso de uso acotado y medible, lo ponemos en producción y luego ampliamos según los resultados.",
  },
  {
    question: "¿Cuánto cuesta desarrollar una aplicación web o móvil a medida?",
    answer:
      "El costo de una aplicación a medida depende del alcance, las integraciones y las plataformas (web, iOS, Android). Como referencia, en Zifro un sitio web profesional parte de USD 2.500, un MVP funcional va de USD 8.000 a USD 25.000, y una aplicación completa con backend, panel de administración y app móvil suele superar los USD 30.000. Cobramos por proyecto con alcance cerrado, no por hora, para que sepas el total desde el inicio. Antes de cotizar hacemos una llamada de diagnóstico sin costo para entender el problema y proponer la solución más simple que funcione. Evitamos sobredimensionar: muchas veces conviene lanzar una versión acotada, validarla con usuarios y reinvertir según los resultados, en lugar de gastar todo el presupuesto en la primera versión.",
  },
  {
    question: "¿Qué tecnologías usa Zifro para desarrollar?",
    answer:
      "En Zifro trabajamos con un stack moderno y mantenido a largo plazo. Para el frontend usamos React, Next.js y TypeScript; para el backend, Node.js y Python, con bases de datos PostgreSQL y servicios en la nube. En aplicaciones móviles empleamos React Native para cubrir iOS y Android con una sola base de código. Para los agentes de IA integramos modelos de lenguaje líderes (como los de OpenAI y Anthropic) mediante APIs, con orquestación propia y conexión a tus sistemas. Elegimos cada tecnología según el problema, no por moda: priorizamos herramientas con comunidad activa y soporte sólido para que tu producto siga siendo mantenible en el futuro. Entregamos el código fuente y la documentación al cierre, sin dependencias ocultas ni licencias atadas a nosotros.",
  },
]

export function FaqSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: listRef, isVisible: listVisible } = useScrollReveal(0.1)

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="preguntas" className="relative bg-background py-16 lg:py-28 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Top editorial line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left: sticky header */}
          <div
            ref={titleRef}
            className={`lg:sticky lg:top-28 lg:self-start transition-all duration-700 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-primary" />
              <span
                className="text-[11px] font-semibold uppercase text-primary"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.3em" }}
              >
                Preguntas frecuentes
              </span>
            </div>
            <h2
              className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Lo que más nos <span className="text-primary">preguntan.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base text-muted-foreground leading-relaxed text-pretty">
              Respuestas directas sobre costos, plazos y tecnología. Si te queda algo en el
              tintero, escríbenos a{" "}
              <a
                href="mailto:hola@zifro.app"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                hola@zifro.app
              </a>
              .
            </p>
          </div>

          {/* Right: questions */}
          <div
            ref={listRef}
            className={`transition-all duration-1000 ${
              listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <ul className="flex flex-col">
              {faqs.map((faq, i) => (
                <li key={faq.question} className="border-b border-border/40">
                  <details className="group py-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm">
                      <span className="flex items-start gap-4">
                        <span
                          className="mt-0.5 text-sm font-semibold tabular-nums text-primary/60"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-lg font-semibold text-foreground leading-snug"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {faq.question}
                        </span>
                      </span>
                      <Plus
                        size={20}
                        className="mt-1 flex-shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                      />
                    </summary>
                    <p className="mt-4 pl-9 pr-8 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                      {faq.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
