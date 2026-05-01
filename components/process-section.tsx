"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState, useEffect, useRef, forwardRef, useCallback } from "react"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Te escuchamos",
    shortDesc: "Entendemos tu negocio",
    color: "#FF6B35",
    image: "/primera.png",
  },
  {
    number: "02",
    title: "Diseñamos la solucion",
    shortDesc: "Plan personalizado",
    color: "#00D9FF",
    image: "/segunda.png",
  },
  {
    number: "03",
    title: "Desarrollamos",
    shortDesc: "Convertimos ideas en realidad",
    color: "#8B5CF6",
    image: "/tercera.png",
  },
  {
    number: "04",
    title: "Crecemos juntos",
    shortDesc: "Soporte y mejora continua",
    color: "#10B981",
    image: "/cuarta.png",
  },
]

const ProcessStep = forwardRef<HTMLDivElement, {
  step: (typeof steps)[number]
  index: number
  isActive: boolean
  onClick: () => void
}>(function ProcessStep({ step, index, isActive, onClick }, forwardedRef) {
  const { ref: revealRef, isVisible } = useScrollReveal(0.1)
  
  // Combine refs
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    // Set the reveal ref
    if (revealRef && typeof revealRef === 'object' && 'current' in revealRef) {
      (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    }
    
    // Set the forwarded ref
    if (typeof forwardedRef === 'function') {
      forwardedRef(node)
    } else if (forwardedRef) {
      forwardedRef.current = node
    }
  }, [forwardedRef, revealRef])

  return (
    <div
      ref={setRefs}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ willChange: isVisible ? 'transform, opacity' : 'auto' }}
    >
      <button
        onClick={onClick}
        className={`group relative w-full h-full text-left rounded-2xl border-2 p-4 lg:p-5 transition-all duration-500 flex flex-col ${isActive
          ? "border-current shadow-2xl scale-[1.02] bg-card"
          : "border-border bg-card/50 hover:border-border hover:bg-card hover:shadow-lg"
          }`}
        style={{ color: isActive ? step.color : undefined, willChange: 'transform' }}
      >
        {/* Robot Image */}
        <div
          className={`w-full flex items-center justify-center mb-2 lg:mb-3 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"
            }`}
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-56 md:h-56 lg:w-48 lg:h-48">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 224px, 192px"
            />
          </div>
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
})

export function ProcessSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-cycle through steps
  useEffect(() => {
    if (!isAutoPlaying) return

    autoPlayRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000) // Change every 3 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  // Pause auto-play when user manually clicks
  const handleStepClick = (index: number) => {
    setActiveStep(index)
    setIsAutoPlaying(false)
    
    // Resume auto-play after 5 seconds of inactivity
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  // Auto-select step based on scroll position (only when not auto-playing)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isAutoPlaying) return
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top
      const sectionHeight = sectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      
      // Only activate when section is in view
      if (sectionTop > viewportHeight || sectionTop + sectionHeight < 0) return
      
      // Find which step is most visible
      let maxVisibility = 0
      let mostVisibleIndex = 0
      
      stepRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const visibility = visibleHeight / rect.height
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility
          mostVisibleIndex = index
        }
      })
      
      if (maxVisibility > 0.3) { // At least 30% visible
        setActiveStep(mostVisibleIndex)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isAutoPlaying])

  return (
    <section ref={sectionRef} className="relative bg-background py-8 lg:py-16 overflow-hidden">
      {/* Top wave */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rotate-180">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="var(--background)" />
        </svg>
      </div>

      {/* Decorative - reducido */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={titleRef}
          className={`mb-8 lg:mb-16 text-center transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
            Como trabajamos
          </span>
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-7xl text-balance leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            De tu idea a{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">resultados medibles.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={i}
              isActive={activeStep === i}
              onClick={() => handleStepClick(i)}
              ref={(el) => (stepRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
