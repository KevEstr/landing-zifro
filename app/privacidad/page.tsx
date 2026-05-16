import type { Metadata } from "next"
import {
  LegalShell,
  LegalSection,
  LegalLead,
  LegalList,
  type TocItem,
} from "@/components/legal-shell"

export const metadata: Metadata = {
  title: "Política de Privacidad | Zifro",
  description:
    "Cómo Zifro recolecta, usa, almacena y protege los datos personales de sus clientes y usuarios, en cumplimiento de la Ley 1581 de 2012 de Colombia.",
}

const toc: TocItem[] = [
  { id: "responsable", title: "Responsable del tratamiento" },
  { id: "alcance", title: "A quién aplica esta política" },
  { id: "datos", title: "Datos que recolectamos" },
  { id: "finalidades", title: "Para qué los usamos" },
  { id: "bases", title: "Base legal y consentimiento" },
  { id: "ia", title: "Datos en agentes de IA" },
  { id: "transferencias", title: "Compartir y encargados" },
  { id: "retencion", title: "Tiempo de almacenamiento" },
  { id: "seguridad", title: "Seguridad de la información" },
  { id: "derechos", title: "Tus derechos como titular" },
  { id: "cookies", title: "Cookies y tecnologías similares" },
  { id: "menores", title: "Datos de menores de edad" },
  { id: "cambios", title: "Cambios a esta política" },
  { id: "contacto", title: "Cómo ejercer tus derechos" },
]

export default function PrivacyPage() {
  return (
    <LegalShell
      kicker="Documento legal · Habeas Data"
      title={
        <>
          Política de <span className="text-primary">privacidad.</span>
        </>
      }
      subtitle="Acá te contamos qué datos manejamos, para qué los usamos y cómo los protegemos. Está alineada con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia."
      lastUpdated="15 de mayo de 2026"
      readingTime="8 min de lectura"
      toc={toc}
    >
      <LegalSection
        id="responsable"
        index={1}
        title="Responsable del tratamiento"
      >
        <LegalLead>
          Zifro es la responsable del tratamiento de los datos personales que
          recibe a través de su sitio web, formularios, productos y servicios.
        </LegalLead>
        <LegalList
          variant="definition"
          items={[
            { term: "Razón social", description: "Zifro" },
            { term: "Domicilio", description: "Medellín, Colombia" },
            {
              term: "Correo de contacto",
              description: "privacidad@zifro.dev",
            },
          ]}
        />
      </LegalSection>

      <LegalSection id="alcance" index={2} title="A quién aplica esta política">
        <p>
          Esta política aplica a cualquier persona cuyos datos personales sean
          tratados por Zifro, incluyendo:
        </p>
        <LegalList
          items={[
            "Visitantes del sitio web zifro.dev y sus subdominios.",
            "Clientes actuales, prospectos y personas que solicitan información comercial.",
            "Usuarios finales de los productos que desarrollamos para nuestros clientes, cuando Zifro actúa como encargado del tratamiento.",
            "Proveedores, aliados comerciales y candidatos a posiciones laborales.",
          ]}
        />
      </LegalSection>

      <LegalSection id="datos" index={3} title="Datos que recolectamos">
        <p>Los datos que recolectamos dependen del tipo de interacción:</p>

        <LegalList
          variant="definition"
          items={[
            {
              term: "Datos de contacto",
              description:
                "Nombre, correo electrónico, teléfono, empresa y cargo. Los recibimos cuando llenas un formulario, nos escribes o iniciamos una conversación comercial.",
            },
            {
              term: "Datos de navegación",
              description:
                "Dirección IP, tipo de dispositivo, navegador, páginas visitadas y tiempo de permanencia. Los obtenemos por cookies y herramientas de analítica.",
            },
            {
              term: "Datos comerciales",
              description:
                "Información de facturación, identificación tributaria y registros de comunicación durante la relación contractual.",
            },
            {
              term: "Datos técnicos del proyecto",
              description:
                "Credenciales, accesos a plataformas y contenidos que el cliente entrega para ejecutar el proyecto. Se manejan bajo medidas estrictas de seguridad.",
            },
            {
              term: "Datos en agentes de IA",
              description:
                "Conversaciones, instrucciones y contenidos procesados por los agentes que desarrollamos. Ver sección 6 para más detalle.",
            },
          ]}
        />
        <p className="text-sm">
          No recolectamos datos sensibles (salud, orientación sexual,
          biométricos, ideológicos) salvo que sean estrictamente necesarios
          para el servicio y medie consentimiento expreso por separado.
        </p>
      </LegalSection>

      <LegalSection id="finalidades" index={4} title="Para qué los usamos">
        <p>Tratamos tus datos únicamente para las siguientes finalidades:</p>
        <LegalList
          items={[
            "Atender solicitudes de información y enviarte propuestas comerciales.",
            "Ejecutar los proyectos contratados, facturar y gestionar la relación contractual.",
            "Enviar comunicaciones operativas relacionadas con servicios activos.",
            "Mejorar el sitio web y entender cómo se usa, mediante datos agregados de analítica.",
            "Cumplir obligaciones legales, contables y tributarias.",
            "Protegernos frente a fraude, abuso o uso no autorizado de nuestros servicios.",
          ]}
        />
        <p>
          No vendemos tus datos. No los compartimos con terceros para fines
          publicitarios distintos a los descritos en esta política.
        </p>
      </LegalSection>

      <LegalSection id="bases" index={5} title="Base legal y consentimiento">
        <p>El tratamiento de tus datos se ampara en al menos una de estas bases:</p>
        <LegalList
          items={[
            "Tu consentimiento expreso al diligenciar formularios o aceptar esta política.",
            "La ejecución del contrato que tienes vigente con Zifro.",
            "El cumplimiento de una obligación legal aplicable.",
            "El interés legítimo de Zifro en operar y proteger sus servicios, cuando no afecte tus derechos fundamentales.",
          ]}
        />
        <p>
          Puedes retirar tu consentimiento en cualquier momento, salvo cuando
          exista una obligación legal o contractual que lo impida.
        </p>
      </LegalSection>

      <LegalSection id="ia" index={6} title="Datos en agentes de IA">
        <LegalLead>
          Como construimos agentes de inteligencia artificial, este punto
          merece transparencia adicional.
        </LegalLead>
        <p>
          Cuando un agente que desarrollamos para un cliente procesa datos
          personales, Zifro actúa como encargado del tratamiento bajo
          instrucciones documentadas de ese cliente. En ese rol:
        </p>
        <LegalList
          items={[
            "No usamos los datos del cliente para entrenar modelos propios ni de terceros.",
            "Aplicamos los modelos en modo no-entrenamiento cuando el proveedor lo permite, mediante planes empresariales.",
            "Cifrado en tránsito y en reposo para todas las conversaciones almacenadas.",
            "Acceso a los datos restringido al equipo técnico estrictamente necesario.",
            "Eliminación de datos al terminar el contrato, conforme a lo pactado en la propuesta y a las obligaciones legales aplicables.",
          ]}
        />
        <p>
          Si interactúas con un agente que desarrollamos para un cliente, el
          responsable del tratamiento de tus datos es ese cliente, no Zifro.
          Solicita su política de privacidad directamente.
        </p>
      </LegalSection>

      <LegalSection
        id="transferencias"
        index={7}
        title="Compartir y encargados"
      >
        <p>
          Para operar, dependemos de proveedores tecnológicos que tratan datos
          en nuestro nombre. Solo trabajamos con proveedores que ofrecen
          garantías de seguridad y privacidad equivalentes a las nuestras.
          Algunas categorías:
        </p>
        <LegalList
          variant="definition"
          items={[
            {
              term: "Infraestructura y hosting",
              description:
                "Proveedores de nube y CDN para alojar el sitio y los servicios desarrollados.",
            },
            {
              term: "Modelos de IA",
              description:
                "Plataformas que prestan los modelos de lenguaje y aprendizaje automático que usan los agentes, bajo planes empresariales con cláusulas de privacidad.",
            },
            {
              term: "Analítica",
              description:
                "Herramientas que procesan datos de navegación de forma agregada y anonimizada.",
            },
            {
              term: "Comunicación y CRM",
              description:
                "Plataformas de correo, calendario y gestión de relación con el cliente.",
            },
            {
              term: "Pasarelas de pago",
              description:
                "Procesadores certificados para facturación y cobros.",
            },
          ]}
        />
        <p>
          Algunas transferencias internacionales se realizan a países que la
          Superintendencia de Industria y Comercio considera adecuados o bajo
          cláusulas contractuales tipo. Si deseas conocer el listado de
          encargados aplicable a un servicio específico, lo enviamos previa
          solicitud.
        </p>
      </LegalSection>

      <LegalSection id="retencion" index={8} title="Tiempo de almacenamiento">
        <p>
          Conservamos los datos solo el tiempo necesario para cumplir las
          finalidades para las que fueron recolectados o, cuando aplique,
          durante el plazo que exija la ley colombiana en materia contable,
          tributaria, contractual o de protección de datos.
        </p>
        <p>
          Una vez se cumplen los plazos aplicables, los datos se eliminan o
          anonimizan de forma segura.
        </p>
      </LegalSection>

      <LegalSection id="seguridad" index={9} title="Seguridad de la información">
        <p>
          Aplicamos medidas técnicas, administrativas y organizacionales para
          proteger los datos personales:
        </p>
        <LegalList
          items={[
            "Cifrado en tránsito y en reposo.",
            "Autenticación multifactor en los sistemas internos.",
            "Principio de mínimo privilegio: cada miembro del equipo accede solo a lo necesario.",
            "Revisión periódica de accesos y rotación de credenciales.",
            "Acuerdos de confidencialidad con todo colaborador que tenga acceso a datos.",
            "Plan de respuesta ante incidentes con notificación a titulares y autoridades cuando aplique.",
          ]}
        />
        <p>
          Ningún sistema es invulnerable. En caso de un incidente que afecte
          tus datos, te lo comunicamos sin demora indebida.
        </p>
      </LegalSection>

      <LegalSection id="derechos" index={10} title="Tus derechos como titular">
        <p>
          La Ley 1581 de 2012 te reconoce derechos que puedes ejercer en
          cualquier momento:
        </p>
        <LegalList
          variant="definition"
          items={[
            {
              term: "Conocer",
              description: "Saber qué datos tuyos tenemos y cómo los tratamos.",
            },
            {
              term: "Actualizar y rectificar",
              description:
                "Pedir que corrijamos información inexacta o incompleta.",
            },
            {
              term: "Suprimir",
              description:
                "Solicitar la eliminación cuando el tratamiento ya no sea necesario o legítimo.",
            },
            {
              term: "Revocar el consentimiento",
              description:
                "Retirar la autorización cuando no sea obligatorio mantener el dato.",
            },
            {
              term: "Acceder gratuitamente",
              description:
                "Obtener una copia de tus datos sin costo, en los términos de la ley.",
            },
            {
              term: "Presentar queja",
              description:
                "Acudir a la Superintendencia de Industria y Comercio si consideras vulnerados tus derechos.",
            },
          ]}
        />
      </LegalSection>

      <LegalSection
        id="cookies"
        index={11}
        title="Cookies y tecnologías similares"
      >
        <p>Usamos cookies para tres fines, claramente diferenciados:</p>
        <LegalList
          variant="definition"
          items={[
            {
              term: "Cookies esenciales",
              description:
                "Permiten que el sitio funcione (sesión, preferencias). No requieren consentimiento.",
            },
            {
              term: "Cookies de analítica",
              description:
                "Miden el uso del sitio de forma agregada y anónima para mejorarlo.",
            },
            {
              term: "Cookies funcionales",
              description:
                "Recuerdan elecciones que hiciste, como idioma o tema visual.",
            },
          ]}
        />
        <p>
          No usamos cookies de publicidad de terceros ni rastreo cross-site.
          Puedes desactivar las cookies desde la configuración de tu navegador,
          aunque algunas funciones pueden dejar de operar.
        </p>
      </LegalSection>

      <LegalSection id="menores" index={12} title="Datos de menores de edad">
        <p>
          Nuestros servicios están dirigidos a empresas y profesionales
          mayores de edad. No recolectamos conscientemente datos de menores de
          18 años. Si identificamos datos de un menor, los eliminamos. Si
          eres padre o tutor y crees que recolectamos datos de un menor a tu
          cargo, escríbenos para proceder.
        </p>
      </LegalSection>

      <LegalSection id="cambios" index={13} title="Cambios a esta política">
        <p>
          Actualizamos esta política cuando cambian nuestras prácticas, aparece
          nueva regulación o lanzamos servicios nuevos. La versión vigente
          siempre estará publicada en esta página con su fecha de última
          actualización. Los cambios materiales se notifican por correo a
          clientes activos con la antelación que la ley exija.
        </p>
      </LegalSection>

      <LegalSection id="contacto" index={14} title="Cómo ejercer tus derechos">
        <p>
          Para ejercer cualquier derecho, presentar consultas o reclamos sobre
          el tratamiento de tus datos, escríbenos a{" "}
          <a
            href="mailto:privacidad@zifro.dev"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            privacidad@zifro.dev
          </a>{" "}
          con la siguiente información:
        </p>
        <LegalList
          items={[
            "Nombre completo y documento de identificación.",
            "Descripción clara del derecho que quieres ejercer.",
            "Datos de contacto para responderte.",
            "Documentos que soporten tu solicitud, si aplica.",
          ]}
        />
        <p>
          Atendemos consultas y reclamos dentro de los plazos establecidos por
          el Decreto 1377 de 2013. Si la respuesta no te satisface, puedes
          acudir a la Superintendencia de Industria y Comercio (SIC), autoridad
          de protección de datos en Colombia.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
