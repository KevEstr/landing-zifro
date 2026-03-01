import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
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
  themeColor: '#FBF7F2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
