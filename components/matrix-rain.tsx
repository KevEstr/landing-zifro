"use client"

import { useEffect, useRef } from "react"

export function MatrixRain({ 
  className = "",
  density = 0.95 
}: { 
  className?: string
  density?: number 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let columns: number[] = []
    const fontSize = 14
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const cols = Math.floor(canvas.width / fontSize)
      columns = Array(cols).fill(1)
    }

    const animate = () => {
      ctx.fillStyle = `rgba(251, 247, 242, ${density})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#4A7C6F"
      ctx.font = `${fontSize}px monospace`

      columns.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize

        ctx.fillStyle = `rgba(74, 124, 111, ${Math.random() * 0.5 + 0.3})`
        ctx.fillText(char, x, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i]++
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
