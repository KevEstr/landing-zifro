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

export const metadata: Metadata = {
  title: 'Zifro | Agentes IA, Desarrollo Web y Automatizacion',
  description: 'Zifro transforma tu negocio con agentes de inteligencia artificial, desarrollo web de alta calidad y automatizacion inteligente. La tecnologia que impulsa el futuro.',
  keywords: ['agentes IA', 'desarrollo web', 'automatizacion', 'inteligencia artificial', 'software', 'Zifro'],
  authors: [{ name: 'Zifro' }],
  openGraph: {
    title: 'Zifro | Agentes IA, Desarrollo Web y Automatizacion',
    description: 'Transformamos tu negocio con inteligencia artificial y automatizacion.',
    type: 'website',
  },
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
