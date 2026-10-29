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
  alternates: {
    canonical: "/privacidad",
  },
}

const toc: TocItem[] = [
  { id: "responsable", title: "Responsable del tratamiento" },
  { id: "alcance", title: "A quién aplica esta política" },
  { id: "datos", title: "Datos que recolectamos" },
  { id: "finalidades", title: "Para qué los usamos" },
  { id: "bases", title: "Base legal y consentimiento" },
  { id: "ia", title: "Datos en agentes de IA" },
  { id: "google-calendar", title: "Integración con Google Calendar" },
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
      lastUpdated="29 de octubre de 2026"
      readingTime="11 min de lectura"
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
              description: "privacidad@zifro.app",
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
            "Visitantes del sitio web zifro.app y sus subdominios.",
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
            {
              term: "Datos de Google Calendar",
              description:
                "Cuando conectas tu cuenta de Google, accedemos a la lista de calendarios autorizados y a sus eventos, junto con los datos de identificación básicos de la cuenta que otorga el consentimiento. Ver sección 7 para más detalle.",
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
            "Sincronizar agendas y crear, actualizar o eliminar eventos en Google Calendar, cuando el usuario conecta voluntariamente su cuenta. Ver sección 7.",
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
        id="google-calendar"
        index={7}
        title="Integración con Google Calendar y uso de datos de Google"
      >
        <LegalLead>
          La integración con Google Calendar es una función opcional de Zifro.
          Solo se activa cuando el usuario autoriza expresamente el acceso
          desde su cuenta de Google. Si no conectas tu calendario, no accedemos
          a ningún dato de Google.
        </LegalLead>
        <p>
          Esta sección explica de forma específica qué permisos solicitamos,
          qué hacemos con los datos de Google, cuánto tiempo los conservamos,
          con quién los compartimos y cómo puedes revocar el acceso o solicitar
          su eliminación. Zifro cumple con la Política de Datos de Usuario de
          los Servicios API de Google y con los requisitos de Uso Limitado
          (Limited Use) aplicables a los datos de Google.
        </p>

        <h3 className="pt-2 text-base font-semibold text-foreground">
          7.1. Qué permisos de Google solicitamos
        </h3>
        <p>
          Para brindar el servicio, Zifro solicita a través de OAuth 2.0 los
          siguientes permisos, siempre limitados a los calendarios que tú
          autorizas:
        </p>
        <LegalList
          variant="definition"
          items={[
            {
              term: "Lectura de calendarios y eventos",
              description:
                "Permite consultar la lista de calendarios de tu cuenta y los eventos disponibles en ellos. Lo usamos para conocer tu disponibilidad, evitar cruces de horarios y programar correctamente las reservas.",
            },
            {
              term: "Creación, edición y eliminación de eventos",
              description:
                "Permite crear eventos nuevos, modificarlos y eliminarlos. Lo usamos para sincronizar en tu calendario las reuniones de Google Meet agendadas desde Zifro, tanto para el asesor como para el cliente final, y para reflejar cambios o cancelaciones.",
            },
            {
              term: "Identificación básica de la cuenta",
              description:
                "Nombre y correo electrónico asociados a la cuenta de Google, usados únicamente para identificar la conexión, asociarla a tu usuario de Zifro y mostrar qué cuenta está vinculada.",
            },
            {
              term: "Acceso continuo (refresh token)",
              description:
                "Almacenamos un token de actualización cifrado que permite mantener la sincronización activa sin que tengas que volver a autorizar cada vez. Este token se revoca cuando desconectas la cuenta.",
            },
          ]}
        />
        <p>
          No solicitamos acceso a Gmail, Google Drive, Google Contacts,
          YouTube ni a ningún otro servicio de Google distinto de Calendar. No
          solicitamos permisos de administración sobre tu cuenta ni sobre
          usuarios de Google Workspace.
        </p>

        <h3 className="pt-2 text-base font-semibold text-foreground">
          7.2. Qué hacemos con los datos de Google Calendar
        </h3>
        <p>
          Zifro utiliza el calendario para que la agenda del asesor y la del
          cliente final se mantengan sincronizadas con las reuniones y reservas
          gestionadas en el SaaS, incluidas las reservas que se originan por
          WhatsApp. Concretamente:
        </p>
        <LegalList
          items={[
            "Consultar la disponibilidad de los calendarios autorizados para ofrecer horarios libres y evitar dobles reservas.",
            "Crear eventos de Google Meet para las reuniones agendadas a través de Zifro, invitando al asesor y al cliente final.",
            "Actualizar la fecha, la hora, la descripción o los invitados de un evento cuando la reserva cambia en la aplicación.",
            "Cancelar o eliminar el evento cuando una reserva se cancela, se reprograma o se elimina en el SaaS.",
            "Leer los eventos existentes para reflejar en Zifro los cambios que el asesor o el cliente hagan directamente en Google Calendar.",
          ]}
        />
        <p>
          Los eventos sincronizados pueden ser editados y eliminados tanto
          desde Google Calendar como desde Zifro, ya que ambas herramientas
          operan sobre la misma agenda. Esta doble vía es precisamente lo que
          garantiza una sincronización confiable.
        </p>

        <h3 className="pt-2 text-base font-semibold text-foreground">
          7.3. Datos de Google que almacenamos
        </h3>
        <LegalList
          variant="definition"
          items={[
            {
              term: "Tokens de acceso y actualización",
              description:
                "Almacenados cifrados en nuestro servidor. Son necesarios para mantener la conexión y se eliminan al desconectar la cuenta o al terminar el contrato.",
            },
            {
              term: "Identificadores de calendario y de evento",
              description:
                "Guardamos el identificador del calendario y del evento para poder crear, actualizar o eliminar el evento correspondiente y evitar duplicados.",
            },
            {
              term: "Metadatos del evento",
              description:
                "Título, fecha, hora, zona horaria, duración, enlace de Google Meet, descripción e invitados de los eventos que Zifro crea o sincroniza.",
            },
            {
              term: "Correo de la cuenta conectada",
              description:
                "Para identificar qué cuenta de Google está vinculada a cada usuario de Zifro.",
            },
          ]}
        />
        <p>
          No almacenamos copias completas de tu calendario ni el contenido de
          eventos que no estén relacionados con reservas o reuniones gestionadas
          a través de Zifro. No utilizamos los datos de Google Calendar para
          publicidad, perfilamiento comercial, venta a terceros ni para
          entrenar modelos de inteligencia artificial propios o de terceros.
        </p>

        <h3 className="pt-2 text-base font-semibold text-foreground">
          7.4. Cuánto tiempo conservamos los datos de Google
        </h3>
        <p>
          Conservamos los tokens y los metadatos de sincronización mientras la
          cuenta de Google permanezca conectada y el servicio esté activo. Una
          vez desconectas la cuenta, revocamos el acceso, eliminamos los tokens
          de forma segura y dejamos de acceder a Google Calendar de inmediato.
        </p>
        <p>
          Los metadatos de eventos se conservan únicamente mientras sean
          necesarios para mantener el historial de reservas del usuario o
          mientras exista una obligación legal o contractual. Cuando dejan de
          ser necesarios, se eliminan o anonimizan conforme a la sección 9 de
          esta política.
        </p>

        <h3 className="pt-2 text-base font-semibold text-foreground">
          7.5. Con quién compartimos los datos de Google
        </h3>
        <p>
          No vendemos, no alquilamos ni compartimos datos de Google Calendar con
          terceros para fines publicitarios. Solo los tratamos nosotros y, en la
          medida estrictamente necesaria para operar el servicio, con los
          encargados descritos en la sección 8:
        </p>
        <LegalList
          items={[
            "Proveedores de infraestructura y hosting en la nube, que almacenan los datos cifrados bajo nuestras instrucciones.",
            "Proveedores de modelos de IA, únicamente cuando una función del agente requiera interpretar el contexto de una reunión o reserva. En ese caso se envían datos mínimos, no se usan para entrenamiento y aplican cláusulas de confidencialidad.",
            "Proveedores de comunicación y CRM utilizados para enviar confirmaciones y recordatorios de las reuniones.",
          ]}
        />
        <p>
          Cualquier transferencia se realiza bajo contratos que obligan al
          encargado a proteger los datos con un nivel equivalente al nuestro y
          a usarlos solo para las finalidades aquí descritas.
        </p>

        <h3 className="pt-2 text-base font-semibold text-foreground">
          7.6. Cómo desconectar tu cuenta y eliminar los datos de Google
        </h3>
        <p>Puedes revocar el acceso en cualquier momento por cualquiera de estas vías:</p>
        <LegalList
          items={[
            "Desde Zifro: entra a la configuración de tu cuenta, sección de integraciones, y selecciona “Desconectar Google Calendar”. El acceso se revoca y los tokens se eliminan de inmediato.",
            "Desde tu cuenta de Google: visita https://myaccount.google.com/permissions, busca Zifro y selecciona “Quitar acceso”. Al hacerlo, Zifro deja de poder acceder a tu calendario.",
            "Por correo: escríbenos a privacidad@zifro.app y solicitamos la desconexión y eliminación de los datos de Google asociados a tu cuenta.",
          ]}
        />
        <p>
          Al desconectar la cuenta, Zifro deja de leer y de escribir en tu Google
          Calendar y elimina los tokens de acceso. Los metadatos de eventos ya
          sincronizados se eliminan dentro de los treinta (30) días siguientes,
          salvo que exista una obligación legal o contractual que exija
          conservarlos por más tiempo. Los eventos que ya fueron creados en tu
          calendario de Google permanecen allí, bajo tu control, y puedes
          eliminarlos directamente desde Google Calendar.
        </p>
        <p>
          Para solicitar la eliminación total de los datos de Google asociados a
          tu cuenta, escríbenos a{" "}
          <a
            href="mailto:privacidad@zifro.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            privacidad@zifro.app
          </a>
          . Atenderemos la solicitud en los plazos establecidos por la Ley 1581
          de 2012 y el Decreto 1377 de 2013.
        </p>
      </LegalSection>

      <LegalSection
        id="transferencias"
        index={8}
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

      <LegalSection id="retencion" index={9} title="Tiempo de almacenamiento">
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

      <LegalSection id="seguridad" index={10} title="Seguridad de la información">
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

      <LegalSection id="derechos" index={11} title="Tus derechos como titular">
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
        index={12}
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

      <LegalSection id="menores" index={13} title="Datos de menores de edad">
        <p>
          Nuestros servicios están dirigidos a empresas y profesionales
          mayores de edad. No recolectamos conscientemente datos de menores de
          18 años. Si identificamos datos de un menor, los eliminamos. Si
          eres padre o tutor y crees que recolectamos datos de un menor a tu
          cargo, escríbenos para proceder.
        </p>
      </LegalSection>

      <LegalSection id="cambios" index={14} title="Cambios a esta política">
        <p>
          Actualizamos esta política cuando cambian nuestras prácticas, aparece
          nueva regulación o lanzamos servicios nuevos. La versión vigente
          siempre estará publicada en esta página con su fecha de última
          actualización. Los cambios materiales se notifican por correo a
          clientes activos con la antelación que la ley exija.
        </p>
      </LegalSection>

      <LegalSection id="contacto" index={15} title="Cómo ejercer tus derechos">
        <p>
          Para ejercer cualquier derecho, presentar consultas o reclamos sobre
          el tratamiento de tus datos, escríbenos a{" "}
          <a
            href="mailto:privacidad@zifro.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            privacidad@zifro.app
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
