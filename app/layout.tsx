import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
