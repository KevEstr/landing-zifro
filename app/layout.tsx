import type { Metadata, Viewport } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const siteUrl = 'https://zifro.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Zifro — Desarrollo de software a medida, agentes IA y automatización',
    template: '%s | Zifro',
  },
  description:
    'Zifro desarrolla software a medida: agentes de IA, aplicaciones web y móviles, MVPs y automatización para startups y empresas. Equipo remoto con base en Colombia.',
  keywords: [
    'desarrollo de software a medida',
    'agentes de IA',
    'desarrollo web',
    'aplicaciones móviles',
    'automatización',
    'MVP para startups',
    'inteligencia artificial',
    'Zifro',
    'software Colombia',
  ],
  authors: [{ name: 'Zifro' }],
  creator: 'Zifro',
  publisher: 'Zifro',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zifro — Desarrollo de software a medida, agentes IA y automatización',
    description:
      'Software a medida, agentes de IA, apps web y móviles, MVPs y automatización para startups y empresas.',
    url: siteUrl,
    siteName: 'Zifro',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Zifro — desarrollo de software a medida y agentes de IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zifro — Desarrollo de software a medida, agentes IA y automatización',
    description:
      'Software a medida, agentes de IA, apps web y móviles, MVPs y automatización para startups y empresas.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Zifro',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description:
        'Empresa de desarrollo de software a medida: agentes de IA, aplicaciones web y móviles, MVPs y automatización para startups y empresas.',
      foundingDate: '2023',
      email: 'hola@zifro.app',
      founders: [
        {
          '@type': 'Person',
          name: 'Kevin Estrada',
          jobTitle: 'Fundador y CEO',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Medellín',
        addressRegion: 'Antioquia',
        addressCountry: 'CO',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hola@zifro.app',
        availableLanguage: ['es', 'en'],
      },
      knowsAbout: [
        'Desarrollo de software a medida',
        'Agentes de inteligencia artificial',
        'Desarrollo web',
        'Aplicaciones móviles',
        'Automatización de procesos',
        'MVP para startups',
      ],
      // Añade aquí TODOS los perfiles a medida que los crees (Clutch, GitHub, etc.)
      sameAs: [
        'https://www.linkedin.com/company/zifro',
        'https://github.com/zifro',
        'https://www.instagram.com/zifro.app',
        'https://clutch.co/profile/zifro',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Zifro',
      description:
        'Desarrollo de software a medida, agentes de IA, apps web y móviles, MVPs y automatización.',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'es',
    },
  ],
}

export const viewport: Viewport = {
  themeColor: '#0a0e14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
