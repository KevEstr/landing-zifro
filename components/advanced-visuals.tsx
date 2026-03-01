"use client"

import { useEffect, useRef } from "react"

// Visual avanzado de procesamiento de IA con múltiples capas
export function AIProcessingVisual({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 1200
    canvas.height = 800

    let frame = 0
    
    // Capas de procesamiento
    const layers = [
      { y: 150, nodes: 8, color: "#E8654A", label: "Input Layer" },
      { y: 300, nodes: 12, color: "#4A7C6F", label: "Hidden Layer 1" },
      { y: 450, nodes: 12, color: "#D4A853", label: "Hidden Layer 2" },
      { y: 600, nodes: 6, color: "#E8654A", label: "Output Layer" },
    ]

    const animate = () => {
      ctx.fillStyle = "rgba(251, 247, 242, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar conexiones entre capas
      layers.forEach((layer, layerIndex) => {
        if (layerIndex < layers.length - 1) {
          const nextLayer = layers[layerIndex + 1]
          const spacing = canvas.width / (layer.nodes + 1)
          const nextSpacing = canvas.width / (nextLayer.nodes + 1)

          for (let i = 0; i < layer.nodes; i++) {
            for (let j = 0; j < nextLayer.nodes; j++) {
              const x1 = spacing * (i + 1)
              const y1 = layer.y
              const x2 = nextSpacing * (j + 1)
              const y2 = nextLayer.y

              // Animación de pulso en las conexiones
              const pulsePhase = (frame * 0.02 + i * 0.1 + j * 0.1) % (Math.PI * 2)
              const opacity = 0.1 + Math.sin(pulsePhase) * 0.1

              ctx.strokeStyle = `rgba(74, 124, 111, ${opacity})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
              ctx.stroke()
            }
          }
        }
      })

      // Dibujar nodos
      layers.forEach((layer, layerIndex) => {
        const spacing = canvas.width / (layer.nodes + 1)
        
        for (let i = 0; i < layer.nodes; i++) {
          const x = spacing * (i + 1)
          const y = layer.y
          
          // Activación animada
          const activation = Math.sin(frame * 0.03 + i * 0.5 + layerIndex) * 0.5 + 0.5
          
          // Glow exterior
          ctx.fillStyle = `${layer.color}20`
          ctx.beginPath()
          ctx.arc(x, y, 15 + activation * 5, 0, Math.PI * 2)
          ctx.fill()
          
          // Nodo principal
          ctx.fillStyle = layer.color
          ctx.globalAlpha = 0.6 + activation * 0.4
          ctx.beginPath()
          ctx.arc(x, y, 8, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
        }

        // Labels
        ctx.fillStyle = layer.color
        ctx.font = "12px sans-serif"
        ctx.globalAlpha = 0.6
        ctx.fillText(layer.label, 20, layer.y + 5)
        ctx.globalAlpha = 1
      })

      // Partículas de datos fluyendo
      for (let i = 0; i < 5; i++) {
        const progress = ((frame * 0.01 + i * 0.2) % 1)
        const layerIndex = Math.floor(progress * (layers.length - 1))
        const nextLayerIndex = layerIndex + 1
        
        if (nextLayerIndex < layers.length) {
          const layer = layers[layerIndex]
          const nextLayer = layers[nextLayerIndex]
          const localProgress = (progress * (layers.length - 1)) % 1
          
          const spacing = canvas.width / (layer.nodes + 1)
          const nextSpacing = canvas.width / (nextLayer.nodes + 1)
          
          const nodeIndex = i % layer.nodes
          const nextNodeIndex = i % nextLayer.nodes
          
          const x1 = spacing * (nodeIndex + 1)
          const y1 = layer.y
          const x2 = nextSpacing * (nextNodeIndex + 1)
          const y2 = nextLayer.y
          
          const x = x1 + (x2 - x1) * localProgress
          const y = y1 + (y2 - y1) * localProgress
          
          ctx.fillStyle = "#E8654A"
          ctx.globalAlpha = 0.8
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }

      frame++
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}

// Visual de código generándose en tiempo real
export function CodeGenerationVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A7C6F" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4A853" stopOpacity="0.6" />
        </linearGradient>
        <filter id="codeGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Terminal window */}
      <rect x="50" y="50" width="700" height="500" rx="12" fill="#1A1A1A" opacity="0.9" />
      <rect x="50" y="50" width="700" height="40" rx="12" fill="#2A2A2A" />
      
      {/* Terminal dots */}
      <circle cx="75" cy="70" r="6" fill="#E8654A" opacity="0.8" />
      <circle cx="100" cy="70" r="6" fill="#D4A853" opacity="0.8" />
      <circle cx="125" cy="70" r="6" fill="#4A7C6F" opacity="0.8" />

      {/* Code lines appearing */}
      {[
        { y: 120, width: 400, delay: 0, color: "#4A7C6F" },
        { y: 150, width: 350, delay: 0.5, color: "#D4A853" },
        { y: 180, width: 450, delay: 1, color: "#4A7C6F" },
        { y: 210, width: 300, delay: 1.5, color: "#E8654A" },
        { y: 240, width: 420, delay: 2, color: "#4A7C6F" },
        { y: 270, width: 380, delay: 2.5, color: "#D4A853" },
        { y: 300, width: 400, delay: 3, color: "#4A7C6F" },
        { y: 330, width: 350, delay: 3.5, color: "#E8654A" },
        { y: 360, width: 450, delay: 4, color: "#4A7C6F" },
        { y: 390, width: 320, delay: 4.5, color: "#D4A853" },
      ].map((line, i) => (
        <g key={i}>
          <rect
            x="80"
            y={line.y}
            width="0"
            height="4"
            rx="2"
            fill={line.color}
            opacity="0.6"
            filter="url(#codeGlow)"
          >
            <animate
              attributeName="width"
              from="0"
              to={line.width}
              dur="0.8s"
              begin={`${line.delay}s`}
              fill="freeze"
            />
          </rect>
          {/* Cursor */}
          <rect
            x={80 + line.width}
            y={line.y - 2}
            width="2"
            height="8"
            fill={line.color}
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;1;1;0"
              dur="1s"
              begin={`${line.delay}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}

      {/* Syntax highlighting dots */}
      {[
        { x: 100, y: 125, delay: 0.2 },
        { x: 120, y: 155, delay: 0.7 },
        { x: 140, y: 185, delay: 1.2 },
        { x: 110, y: 215, delay: 1.7 },
      ].map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r="3"
          fill="#E8654A"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.8;0.8"
            dur="0.5s"
            begin={`${dot.delay}s`}
            fill="freeze"
          />
        </circle>
      ))}

      {/* Success checkmark */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin="5s" fill="freeze" />
        <circle cx="700" cy="520" r="20" fill="#4A7C6F" opacity="0.2" />
        <path
          d="M 690 520 L 697 527 L 710 514"
          stroke="#4A7C6F"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

// Visual de dashboard con métricas en tiempo real
export function DashboardMetricsVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metricGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8654A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E8654A" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="metricGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A7C6F" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="metricGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4A853" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4A853" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Cards de métricas */}
      {[
        { x: 50, y: 50, grad: "metricGrad1", value: "98%", label: "Uptime" },
        { x: 300, y: 50, grad: "metricGrad2", value: "2.3s", label: "Response" },
        { x: 550, y: 50, grad: "metricGrad3", value: "1.2M", label: "Requests" },
      ].map((card, i) => (
        <g key={i}>
          <rect
            x={card.x}
            y={card.y}
            width="200"
            height="120"
            rx="12"
            fill={`url(#${card.grad})`}
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.5s"
              begin={`${i * 0.3}s`}
              fill="freeze"
            />
          </rect>
          <text
            x={card.x + 100}
            y={card.y + 60}
            textAnchor="middle"
            fill="#1A1A1A"
            fontSize="32"
            fontWeight="bold"
            opacity="0"
          >
            {card.value}
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.5s"
              begin={`${i * 0.3 + 0.2}s`}
              fill="freeze"
            />
          </text>
          <text
            x={card.x + 100}
            y={card.y + 95}
            textAnchor="middle"
            fill="#1A1A1A"
            fontSize="14"
            opacity="0"
          >
            {card.label}
            <animate
              attributeName="opacity"
              values="0;0.6"
              dur="0.5s"
              begin={`${i * 0.3 + 0.3}s`}
              fill="freeze"
            />
          </text>
        </g>
      ))}

      {/* Gráfico de línea animado */}
      <polyline
        points="50,450 150,420 250,380 350,400 450,350 550,370 650,320 750,340"
        fill="none"
        stroke="#4A7C6F"
        strokeWidth="3"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        opacity="0.6"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1000"
          to="0"
          dur="3s"
          begin="1s"
          fill="freeze"
        />
      </polyline>

      {/* Área bajo la curva */}
      <path
        d="M 50 450 L 150 420 L 250 380 L 350 400 L 450 350 L 550 370 L 650 320 L 750 340 L 750 500 L 50 500 Z"
        fill="url(#metricGrad2)"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;0.3"
          dur="1s"
          begin="2s"
          fill="freeze"
        />
      </path>

      {/* Puntos de datos */}
      {[
        { x: 50, y: 450 },
        { x: 150, y: 420 },
        { x: 250, y: 380 },
        { x: 350, y: 400 },
        { x: 450, y: 350 },
        { x: 550, y: 370 },
        { x: 650, y: 320 },
        { x: 750, y: 340 },
      ].map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="5"
          fill="#4A7C6F"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;1"
            dur="0.3s"
            begin={`${2 + i * 0.2}s`}
            fill="freeze"
          />
          <animate
            attributeName="r"
            values="5;7;5"
            dur="2s"
            begin={`${2 + i * 0.2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}
