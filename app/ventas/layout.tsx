import type { ReactNode } from "react"
import { Bricolage_Grotesque, Reenie_Beanie } from "next/font/google"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["system-ui", "arial"],
})

const reenie = Reenie_Beanie({
  subsets: ["latin"],
  variable: "--font-reenie",
  display: "swap",
  weight: "400",
  fallback: ["cursive"],
})

export default function VentasLayout({ children }: { children: ReactNode }) {
  return <div className={`${bricolage.variable} ${reenie.variable}`}>{children}</div>
}
