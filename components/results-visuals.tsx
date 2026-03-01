"use client"

import { useEffect, useRef } from "react"

export function DataVisualizationBg({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    let frame = 0
    const bars = Array.from({ length: 40 }, (_, i) => ({
      x: (i / 40) * 100,
      baseHeight: 20 + (i % 6) * 10,
      speed: 0.02 + (i % 5) * 0.006,
      phase: (i / 40) * Math.PI * 2,
    }))

    const animate = () => {
      ctx.fillStyle = "rgba(251, 247, 242, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / bars.length

      bars.forEach((bar, i) => {
        const height = bar.baseHeight + Math.sin(frame * bar.speed + bar.phase) * 20
        const normalizedHeight = height / 100
        
        // Gradient based on height
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - (height / 100) * canvas.height)
        gradient.addColorStop(0, `rgba(232, 101, 74, ${0.3 + normalizedHeight * 0.4})`)
        gradient.addColorStop(0.5, `rgba(74, 124, 111, ${0.2 + normalizedHeight * 0.3})`)
        gradient.addColorStop(1, `rgba(212, 168, 83, ${0.1 + normalizedHeight * 0.2})`)
        
        ctx.fillStyle = gradient
        ctx.fillRect(
          bar.x * barWidth / 100,
          canvas.height - (height / 100) * canvas.height,
          barWidth * 0.8,
          (height / 100) * canvas.height
        )
      })

      frame++
      requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}

export function CaseVisual({ 
  type,
  className = "" 
}: { 
  type: "ecommerce" | "health" | "logistics"
  className?: string 
}) {
  if (type === "ecommerce") {
    return (
      <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8654A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4A853" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Chat bubbles */}
        <g>
          {[
            { x: 50, y: 50, delay: 0 },
            { x: 250, y: 80, delay: 0.5 },
            { x: 80, y: 150, delay: 1 },
            { x: 280, y: 180, delay: 1.5 },
          ].map((bubble, i) => (
            <g key={i}>
              <rect
                x={bubble.x}
                y={bubble.y}
                width="100"
                height="40"
                rx="20"
                fill="url(#ecomGrad)"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.6;0.6;0"
                  dur="4s"
                  repeatCount="indefinite"
                  begin={`${bubble.delay}s`}
                />
              </rect>
              <circle cx={bubble.x + 20} cy={bubble.y + 20} r="3" fill="#FFFFFF" opacity="0.8" />
              <circle cx={bubble.x + 35} cy={bubble.y + 20} r="3" fill="#FFFFFF" opacity="0.8" />
              <circle cx={bubble.x + 50} cy={bubble.y + 20} r="3" fill="#FFFFFF" opacity="0.8" />
            </g>
          ))}
        </g>

        {/* Bot icon */}
        <circle cx="200" cy="220" r="40" fill="#E8654A" opacity="0.3">
          <animate attributeName="r" values="35;45;35" dur="3s" repeatCount="indefinite" />
        </circle>
        <rect x="185" y="210" width="30" height="20" rx="5" fill="#E8654A" opacity="0.8" />
        <circle cx="192" cy="218" r="3" fill="#FFFFFF" />
        <circle cx="208" cy="218" r="3" fill="#FFFFFF" />
      </svg>
    )
  }

  if (type === "health") {
    return (
      <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="healthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A7C6F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E8654A" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Calendar grid */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => {
            const seed = row * 7 + col
            const isBooked = seed % 3 !== 0
            const dur = 2 + (seed % 4) * 0.5
            return (
              <rect
                key={`${row}-${col}`}
                x={50 + col * 45}
                y={30 + row * 45}
                width="40"
                height="40"
                rx="8"
                fill={isBooked ? "url(#healthGrad)" : "none"}
                stroke="#4A7C6F"
                strokeWidth="2"
                opacity={isBooked ? 0.6 : 0.2}
              >
                {isBooked && (
                  <animate
                    attributeName="opacity"
                    values="0.4;0.8;0.4"
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                  />
                )}
              </rect>
            )
          })
        )}

        {/* Checkmarks */}
        {[
          { x: 70, y: 60 },
          { x: 160, y: 105 },
          { x: 250, y: 150 },
        ].map((check, i) => (
          <path
            key={i}
            d={`M ${check.x} ${check.y} L ${check.x + 8} ${check.y + 8} L ${check.x + 18} ${check.y - 8}`}
            stroke="#FFFFFF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="4s"
              repeatCount="indefinite"
              begin={`${i * 0.8}s`}
            />
          </path>
        ))}
      </svg>
    )
  }

  // logistics
  return (
    <svg viewBox="0 0 400 300" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A853" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Route path */}
      <path
        d="M 50 150 Q 150 50 250 150 T 450 150"
        stroke="url(#logGrad)"
        strokeWidth="4"
        fill="none"
        strokeDasharray="10 5"
        opacity="0.4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="15"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>

      {/* Location pins */}
      {[
        { x: 50, y: 150 },
        { x: 200, y: 100 },
        { x: 350, y: 150 },
      ].map((pin, i) => (
        <g key={i}>
          <path
            d={`M ${pin.x} ${pin.y - 20} Q ${pin.x} ${pin.y - 35} ${pin.x + 10} ${pin.y - 35} Q ${pin.x + 20} ${pin.y - 35} ${pin.x + 20} ${pin.y - 20} Q ${pin.x + 20} ${pin.y - 10} ${pin.x + 10} ${pin.y} Q ${pin.x} ${pin.y - 10} ${pin.x} ${pin.y - 20}`}
            fill="#D4A853"
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.6}s`}
            />
          </path>
          <circle cx={pin.x + 10} cy={pin.y - 25} r="4" fill="#FFFFFF" />
        </g>
      ))}

      {/* Moving package */}
      <rect x="0" y="0" width="20" height="20" rx="3" fill="#E8654A" opacity="0.8">
        <animateMotion
          path="M 50 150 Q 150 50 250 150 T 450 150"
          dur="6s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Growth arrow */}
      <path
        d="M 100 250 L 300 250 L 300 200"
        stroke="#D4A853"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <polygon points="300,200 290,215 310,215" fill="#D4A853" opacity="0.6" />
    </svg>
  )
}
