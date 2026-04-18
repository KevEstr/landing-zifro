"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState, useEffect, useMemo } from "react"

// Pre-calculate particle positions to avoid Math.cos/sin in render
const particlePositions = [
  { x: 60, y: 0 },   // 0°
  { x: 30, y: 52 },  // 60°
  { x: -30, y: 52 }, // 120°
  { x: -60, y: 0 },  // 180°
  { x: -30, y: -52 },// 240°
  { x: 30, y: -52 }, // 300°
]

const steps = [
  {
    number: "01",
    title: "Te escuchamos",
    shortDesc: "Entendemos tu negocio",
    color: "#FF6B35",
    visual: (isActive: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isActive ? 'transform' : 'auto' }}>
        {/* Sound waves - solo si está activo */}
        {isActive && [60, 100, 140].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="#E8654A"
            strokeWidth="2"
            opacity="0"
            vectorEffect="non-scaling-stroke"
          >
            <animate
              attributeName="r"
              values={`${40 + i * 20};${60 + i * 30};${80 + i * 40}`}
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.2;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Central microphone - static */}
        <circle cx="100" cy="100" r="30" fill="#E8654A" opacity="0.2" />
        <path
          d="M 85 100 Q 85 80 100 80 Q 115 80 115 100 L 115 110 Q 115 125 100 125 Q 85 125 85 110 Z"
          fill="none"
          stroke="#E8654A"
          strokeWidth="3"
          opacity="0.8"
          vectorEffect="non-scaling-stroke"
        />
        <line x1="100" y1="125" x2="100" y2="140" stroke="#E8654A" strokeWidth="3" opacity="0.8" vectorEffect="non-scaling-stroke" />
        <line x1="90" y1="140" x2="110" y2="140" stroke="#E8654A" strokeWidth="3" opacity="0.8" vectorEffect="non-scaling-stroke" />

        {/* Data particles - solo 3 en lugar de 6 */}
        {isActive && [0, 2, 4].map((idx, i) => {
          const pos = particlePositions[idx]
          return (
            <circle
              key={idx}
              cx="100"
              cy="100"
              r="4"
              fill="#E8654A"
              opacity="0.6"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0,0; ${pos.x},${pos.y}`}
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
              <animate
                attributeName="opacity"
                values="0.8;0;0.8"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
            </circle>
          )
        })}
      </svg>
    ),
  },
  {
    number: "02",
    title: "Diseñamos la solucion",
    shortDesc: "Plan personalizado",
    color: "#00D9FF",
    visual: (isActive: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isActive ? 'transform' : 'auto' }}>
        {/* Grid pattern - reducido */}
        {[70, 100, 130].map((x, xi) =>
          [70, 100, 130].map((y, yi) => (
            <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" rx="1" fill="#4A7C6F" opacity="0.15">
              {isActive && <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" begin={`${(xi + yi) * 0.3}s`} />}
            </rect>
          ))
        )}
        {/* Connection lines */}
        <line x1="70" y1="70" x2="130" y2="70" stroke="#4A7C6F" strokeWidth="2" opacity="0.4" vectorEffect="non-scaling-stroke">
          {isActive && <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />}
        </line>
        <line x1="130" y1="70" x2="130" y2="130" stroke="#4A7C6F" strokeWidth="2" opacity="0.4" vectorEffect="non-scaling-stroke">
          {isActive && <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />}
        </line>
        {/* Highlighted nodes */}
        <circle cx="70" cy="70" r="8" fill="#4A7C6F" opacity="0.3">
          {isActive && <animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" />}
        </circle>
        <circle cx="130" cy="130" r="8" fill="#4A7C6F" opacity="0.3">
          {isActive && <animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" begin="2s" />}
        </circle>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Desarrollamos",
    shortDesc: "Convertimos ideas en realidad",
    color: "#8B5CF6",
    visual: (isActive: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isActive ? 'transform' : 'auto' }}>
        {/* Code brackets */}
        <text x="30" y="60" fill="#D4A853" fontSize="40" opacity="0.4" fontFamily="monospace">
          {"<"}
          {isActive && <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />}
        </text>
        <text x="150" y="60" fill="#D4A853" fontSize="40" opacity="0.4" fontFamily="monospace">
          {"/>"}
          {isActive && <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" begin="0.5s" />}
        </text>

        {/* Building blocks - reducido a 2 */}
        {isActive && [
          { x: 85, y: 100, w: 30, h: 30, delay: 0 },
          { x: 60, y: 140, w: 80, h: 10, delay: 0.5 },
        ].map((block, i) => (
          <rect
            key={i}
            x={block.x}
            y="200"
            width={block.w}
            height={block.h}
            rx="4"
            fill="#D4A853"
            opacity="0.3"
          >
            <animate
              attributeName="y"
              values={`200;${block.y};${block.y}`}
              dur="2s"
              repeatCount="indefinite"
              begin={`${block.delay}s`}
            />
            <animate
              attributeName="opacity"
              values="0;0.6;0.6"
              dur="2s"
              repeatCount="indefinite"
              begin={`${block.delay}s`}
            />
          </rect>
        ))}

        {/* Progress bar */}
        <rect x="40" y="180" width="120" height="8" rx="4" fill="#D4A853" opacity="0.2" />
        {isActive && (
          <rect x="40" y="180" width="0" height="8" rx="4" fill="#D4A853" opacity="0.6">
            <animate attributeName="width" values="0;120;120;0" dur="4s" repeatCount="indefinite" />
          </rect>
        )}
      </svg>
    ),
  },
  {
    number: "04",
    title: "Crecemos juntos",
    shortDesc: "Soporte y mejora continua",
    color: "#10B981",
    visual: (isActive: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ willChange: isActive ? 'transform' : 'auto' }}>
        {/* Growth chart */}
        <polyline
          points="20,160 50,140 80,120 110,90 140,70 170,40"
          fill="none"
          stroke="#E8654A"
          strokeWidth="3"
          strokeDasharray="300"
          strokeDashoffset={isActive ? "0" : "300"}
          opacity="0.6"
          vectorEffect="non-scaling-stroke"
        >
          {isActive && <animate attributeName="stroke-dashoffset" from="300" to="0" dur="3s" repeatCount="indefinite" />}
        </polyline>

        {/* Data points - reducido a 3 */}
        {isActive && [
          { x: 50, y: 140 },
          { x: 110, y: 90 },
          { x: 170, y: 40 },
        ].map((point, i) => (
          <circle key={i} cx={point.x} cy={point.y} r="5" fill="#E8654A" opacity="0">
            <animate
              attributeName="opacity"
              values="0;0.8;0.8"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 1}s`}
            />
          </circle>
        ))}

        {/* Upward arrow */}
        <path
          d="M 180 35 L 170 45 M 180 35 L 190 45"
          stroke="#E8654A"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={isActive ? "0.8" : "0"}
          vectorEffect="non-scaling-stroke"
        />

        {/* Base line */}
        <line x1="10" y1="170" x2="190" y2="170" stroke="#E8654A" strokeWidth="2" opacity="0.2" vectorEffect="non-scaling-stroke" />
      </svg>
    ),
  },
]

function ProcessStep({
  step,
  index,
  isActive,
  onClick,
}: {
  step: (typeof steps)[number]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  
  // Memoize el visual para evitar re-renders
  const visual = useMemo(() => step.visual(isActive), [step, isActive])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ willChange: isVisible ? 'transform, opacity' : 'auto' }}
    >
      <button
        onClick={onClick}
        className={`group relative w-full h-full text-left rounded-[2rem] border-2 p-8 transition-all duration-500 flex flex-col ${isActive
          ? "border-current shadow-2xl scale-[1.02] bg-card"
          : "border-border bg-card/50 hover:border-border hover:bg-card hover:shadow-lg"
          }`}
        style={{ color: isActive ? step.color : undefined, willChange: 'transform' }}
      >
        {/* SVG Visual */}
        <div
          className={`w-full aspect-square mb-6 rounded-2xl overflow-hidden transition-all duration-500 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
            }`}
          style={{ 
            backgroundColor: `${step.color}08`,
            willChange: isActive ? 'opacity' : 'auto',
          }}
        >
          {visual}
        </div>

        {/* Number and title */}
        <div className="flex items-end justify-between gap-4 flex-1">
          <div className="flex-1">
            <span
              className="block text-xs font-bold uppercase tracking-[0.3em] mb-2 transition-colors duration-300"
              style={{ color: step.color }}
            >
              Paso {step.number}
            </span>
            <h3 className="text-xl font-bold text-foreground leading-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.shortDesc}</p>
          </div>
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-125 flex-shrink-0"
            style={{ backgroundColor: `${step.color}20`, willChange: 'transform' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        {/* Active indicator */}
        {isActive && (
          <div
            className="absolute -bottom-1 left-8 right-8 h-1 rounded-full"
            style={{ backgroundColor: step.color }}
          />
        )}
      </button>
    </div>
  )
}

export function ProcessSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const [activeStep, setActiveStep] = useState(0)

  // Auto-cycle through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative bg-background py-12 lg:py-16 overflow-hidden">
      {/* Top wave */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rotate-180">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="var(--background)" />
        </svg>
      </div>

      {/* Decorative - reducido */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl" style={{ willChange: 'auto' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={titleRef}
          className={`mb-12 lg:mb-16 text-center transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
            Como trabajamos
          </span>
          <h2 className="text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            De tu idea a{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">resultados medibles.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={i}
              isActive={activeStep === i}
              onClick={() => setActiveStep(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
