"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  speed: number
  size: number
  opacity: number
  color: string
}

export function DataStreamVisual({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const colors = ["#E8654A", "#4A7C6F", "#D4A853"]

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    const animate = () => {
      ctx.fillStyle = "rgba(251, 247, 242, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Move particle
        particle.y -= particle.speed
        particle.opacity -= 0.002

        // Reset if out of bounds
        if (particle.y < -10 || particle.opacity <= 0) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
          particle.opacity = 0.3 + Math.random() * 0.7
        }

        // Draw particle
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity})`)
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size * 3)

        // Draw trail
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity * 0.3})`)
        ctx.fillRect(particle.x, particle.y + particle.size * 3, particle.size, particle.size * 6)
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
