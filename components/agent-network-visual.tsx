"use client"

import { useEffect, useRef } from "react"

export function AgentNetworkVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener("resize", resize)

    // Reducir agentes de 12 a 6 para mejor rendimiento
    const agents = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 4 + Math.random() * 3,
      activity: Math.random(),
      pulsePhase: Math.random() * Math.PI * 2,
      type: i % 3,
    }))

    let frame = 0
    let lastTime = 0
    const fps = 30 // Limitar a 30 FPS para mejor rendimiento
    const fpsInterval = 1000 / fps

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastTime
      
      if (elapsed < fpsInterval) {
        requestAnimationFrame(animate)
        return
      }
      
      lastTime = currentTime - (elapsed % fpsInterval)

      ctx.fillStyle = "rgba(10, 10, 10, 0.15)"
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update and draw connections - optimizado
      agents.forEach((agent, i) => {
        agents.slice(i + 1).forEach((other) => {
          const dx = other.x - agent.x
          const dy = other.y - agent.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.2
            ctx.strokeStyle = `rgba(255, 77, 0, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(agent.x, agent.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()

            // Data packets - reducir frecuencia
            if (frame % 60 === 0 && Math.random() > 0.7) {
              const t = Math.random()
              const px = agent.x + dx * t
              const py = agent.y + dy * t
              ctx.fillStyle = "rgba(14, 165, 233, 0.7)"
              ctx.beginPath()
              ctx.arc(px, py, 2.5, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        })
      })

      // Update and draw agents
      agents.forEach((agent) => {
        // Movement
        agent.x += agent.vx
        agent.y += agent.vy

        // Bounce off edges
        if (agent.x < 0 || agent.x > canvas.offsetWidth) agent.vx *= -1
        if (agent.y < 0 || agent.y > canvas.offsetHeight) agent.vy *= -1

        // Keep in bounds
        agent.x = Math.max(0, Math.min(canvas.offsetWidth, agent.x))
        agent.y = Math.max(0, Math.min(canvas.offsetHeight, agent.y))

        // Pulse
        agent.pulsePhase += 0.03
        const pulse = Math.sin(agent.pulsePhase) * 0.5 + 0.5

        // Outer glow
        const gradient = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, agent.radius * 4)
        const colors = [
          { r: 255, g: 77, b: 0 }, // primary orange
          { r: 14, g: 165, b: 233 }, // accent blue
          { r: 139, g: 92, b: 246 }, // purple
        ]
        const color = colors[agent.type]
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.4 * pulse})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, agent.radius * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.8 + pulse * 0.2})`
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, agent.radius, 0, Math.PI * 2)
        ctx.fill()

        // Inner highlight
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * pulse})`
        ctx.beginPath()
        ctx.arc(agent.x - agent.radius * 0.3, agent.y - agent.radius * 0.3, agent.radius * 0.5, 0, Math.PI * 2)
        ctx.fill()
      })

      frame++
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: "normal" }}
    />
  )
}
