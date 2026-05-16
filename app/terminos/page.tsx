import type { Metadata } from "next"
import {
  LegalShell,
  LegalSection,
  LegalLead,
  LegalList,
  type TocItem,
} from "@/components/legal-shell"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Zifro",
  description:
    "Condiciones generales que rigen la prestación de servicios de desarrollo de software, agentes de inteligencia artificial y automatización por parte de Zifro.",
}

const toc: TocItem[] = [
  { id: "objeto", title: "Objeto y aceptación" },
  { id: "definiciones", title: "Definiciones clave" },
  { id: "servicios", title: "Servicios que prestamos" },
  { id: "propuesta", title: "La propuesta manda" },
  { id: "propiedad", title: "Propiedad intelectual" },
  { id: "ia", title: "Uso de inteligencia artificial" },
  { id: "responsabilidades", title: "Lo que esperamos del cliente" },
  { id: "garantias", title: "Garantías y limitación de responsabilidad" },
  { id: "confidencialidad", title: "Confidencialidad" },
  { id: "ley", title: "Ley aplicable y disputas" },
  { id: "contacto", title: "Contacto" },
]

export default function TermsPage() {
  return (
    <LegalShell
      kicker="Documento legal"
      title={
        <>
          Términos y <span className="text-primary">condiciones.</span>
        </>
      }
      subtitle="Estas son las reglas generales que rigen la relación entre tú y Zifro cuando contratas nuestros servicios. Las condiciones comerciales específicas (precio, plazos, alcance) se acuerdan en la propuesta firmada de cada proyecto."
      lastUpdated="15 de mayo de 2026"
      readingTime="6 min de lectura"
      toc={toc}
    >
      <LegalSection id="objeto" index={1} title="Objeto y aceptación">
        <LegalLead>
          Este documento regula la contratación de los servicios prestados por
          Zifro, sociedad domiciliada en Medellín, Colombia.
        </LegalLead>
        <p>
          Cuando aceptas una propuesta comercial, firmas un contrato derivado o
          comienzas un proyecto con nosotros, declaras haber leído y aceptado
          estos Términos. Si no estás de acuerdo con alguna cláusula, no
          contrates el servicio.
        </p>
        <p>
          En caso de conflicto entre la propuesta firmada y este documento,
          prevalece lo pactado en la propuesta.
        </p>
      </LegalSection>

      <LegalSection id="definiciones" index={2} title="Definiciones clave">
        <p>
          Para evitar ambigüedades, usamos los siguientes términos a lo largo
          del documento:
        </p>
        <LegalList
          variant="definition"
          items={[
            {
              term: "Cliente",
              description:
                "Persona natural o jurídica que contrata los servicios de Zifro.",
            },
            {
              term: "Entregable",
              description:
                "Producto, código fuente, documentación, agente o automatización que Zifro produce y entrega como resultado del proyecto.",
            },
            {
              term: "Agente de IA",
              description:
                "Software autónomo basado en modelos de lenguaje o aprendizaje automático, configurado para ejecutar tareas específicas en nombre del Cliente.",
            },
            {
              term: "Servicios de terceros",
              description:
                "Plataformas externas cuyo uso es necesario para operar los Entregables, como infraestructura en la nube o proveedores de modelos de IA.",
            },
            {
              term: "Propuesta",
              description:
                "Documento comercial firmado donde se detalla el alcance, las condiciones económicas, los plazos y demás términos específicos del proyecto.",
            },
          ]}
        />
      </LegalSection>

      <LegalSection id="servicios" index={3} title="Servicios que prestamos">
        <p>
          Zifro presta servicios profesionales de tecnología. El alcance
          concreto de cada contratación se define en la Propuesta:
        </p>
        <LegalList
          items={[
            "Desarrollo de aplicaciones web, sitios institucionales y plataformas a medida.",
            "Diseño, configuración e implementación de agentes de inteligencia artificial.",
            "Automatización de procesos internos, integraciones con APIs y flujos de trabajo.",
            "Consultoría técnica, auditorías de código y arquitectura de software.",
            "Mantenimiento, soporte y evolución de los productos entregados.",
          ]}
        />
        <p>
          Los servicios se prestan bajo modalidad remota, salvo pacto distinto
          en la Propuesta.
        </p>
      </LegalSection>

      <LegalSection id="propuesta" index={4} title="La propuesta manda">
        <p>
          Cada proyecto se rige por su propia Propuesta firmada, que define el
          alcance funcional, los entregables, el cronograma, las condiciones
          económicas y cualquier cláusula particular que acordemos con el
          Cliente.
        </p>
        <p>
          Estos Términos cubren lo general y aplicable a toda relación
          comercial. Lo que sea específico de un proyecto, incluyendo precios,
          formas y plazos de pago, hitos, rondas de revisión y obligaciones
          puntuales, vive en la Propuesta y no acá.
        </p>
        <p>
          Cualquier modificación al alcance original se gestiona por escrito y
          puede implicar ajustes que se documentan en una orden de cambio
          firmada por ambas partes.
        </p>
      </LegalSection>

      <LegalSection id="propiedad" index={5} title="Propiedad intelectual">
        <p>
          Una vez recibido el pago total acordado en la Propuesta, el Cliente
          adquiere la titularidad sobre el código fuente, el diseño visual y
          los Entregables específicamente desarrollados para él.
        </p>
        <p>Zifro conserva la titularidad sobre:</p>
        <LegalList
          items={[
            "Componentes, librerías y código de uso general desarrollados previamente o reutilizados entre clientes.",
            "Metodologías, plantillas internas, prompts base y arquitecturas propias.",
            "Conocimiento técnico y experiencia adquirida durante el proyecto.",
          ]}
        />
        <p>
          Salvo solicitud expresa de confidencialidad por escrito, el Cliente
          concede a Zifro una licencia no exclusiva para mostrar el proyecto
          entregado en su portafolio comercial.
        </p>
      </LegalSection>

      <LegalSection id="ia" index={6} title="Uso de inteligencia artificial">
        <p>
          En proyectos que involucran agentes de IA, el Cliente debe entender
          y aceptar lo siguiente:
        </p>
        <LegalList
          items={[
            "Los modelos de IA pueden generar respuestas incorrectas, sesgadas o inesperadas. La supervisión humana del agente en producción es responsabilidad del Cliente.",
            "El comportamiento de los modelos puede cambiar cuando los proveedores actualizan sus versiones, lo que puede requerir ajustes posteriores.",
            "Las consultas y datos enviados a modelos de terceros se procesan según las políticas de cada proveedor.",
            "No garantizamos resultados específicos en métricas de negocio (conversión, ahorro, productividad), aunque trabajamos para optimizarlos.",
            "El Cliente es responsable del uso ético y legal del agente, incluyendo informar a usuarios finales que están interactuando con un sistema automatizado cuando corresponda.",
          ]}
        />
      </LegalSection>

      <LegalSection
        id="responsabilidades"
        index={7}
        title="Lo que esperamos del cliente"
      >
        <p>Para que el proyecto avance bien, el Cliente se compromete a:</p>
        <LegalList
          items={[
            "Designar un punto de contacto único con autoridad para tomar decisiones.",
            "Entregar contenidos, accesos, credenciales e información requerida en los plazos acordados.",
            "Responder a las solicitudes de feedback dentro del plazo definido en la Propuesta.",
            "Garantizar que los contenidos provistos no infringen derechos de terceros.",
            "Cumplir con las condiciones económicas pactadas en la Propuesta.",
          ]}
        />
      </LegalSection>

      <LegalSection
        id="garantias"
        index={8}
        title="Garantías y limitación de responsabilidad"
      >
        <p>
          Los Entregables incluyen el período de garantía contra defectos
          funcionales que se establezca en la Propuesta. La garantía no cubre
          fallas derivadas de uso indebido, modificaciones realizadas por
          terceros o cambios en servicios externos fuera de nuestro control.
        </p>
        <p>
          La responsabilidad total de Zifro frente al Cliente, por cualquier
          causa, está limitada al valor efectivamente pagado por el servicio
          que originó el reclamo.
        </p>
        <p>Zifro no responde por:</p>
        <LegalList
          items={[
            "Lucro cesante, daño emergente o perjuicios indirectos.",
            "Interrupciones, fallas o cambios de los servicios de terceros.",
            "Pérdida de datos cuando el Cliente no implementa políticas de respaldo recomendadas.",
            "Uso del producto fuera de los parámetros documentados.",
          ]}
        />
      </LegalSection>

      <LegalSection id="confidencialidad" index={9} title="Confidencialidad">
        <p>
          Toda información que las partes intercambien durante el proyecto se
          considera confidencial y solo puede usarse para los fines del
          contrato. La obligación de confidencialidad se mantiene durante el
          tiempo establecido en la Propuesta o, en su defecto, mientras la
          información conserve su carácter reservado.
        </p>
        <p>
          No se considera confidencial la información que ya era pública, que
          se obtuvo de fuentes legítimas independientes o cuya divulgación es
          requerida por autoridad competente.
        </p>
      </LegalSection>

      <LegalSection id="ley" index={10} title="Ley aplicable y disputas">
        <p>
          Estos Términos se rigen por la legislación de la República de
          Colombia. Las partes acuerdan resolver las disputas por mecanismos
          alternativos antes de acudir a la jurisdicción ordinaria:
        </p>
        <LegalList
          items={[
            "Arreglo directo desde la notificación de la controversia.",
            "Mediación o conciliación ante un centro reconocido en caso de no haber acuerdo directo.",
            "Jurisdicción ordinaria en Medellín como última instancia.",
          ]}
        />
      </LegalSection>

      <LegalSection id="contacto" index={11} title="Contacto">
        <p>
          Notificaciones formales sobre este documento deben enviarse a{" "}
          <a
            href="mailto:legal@zifro.dev"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            legal@zifro.dev
          </a>
          . Recibimos solicitudes durante días hábiles y respondemos en los
          plazos legales aplicables.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
