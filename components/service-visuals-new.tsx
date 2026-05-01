"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function AgentVisual({ className = "" }: { className?: string }) {
  const messages = [
    { text: "Claro, te ayudo con eso", delay: 0 },
    { text: "Tu pedido llegará mañana", delay: 1.8 },
    { text: "¿Necesitas algo más?", delay: 3.6 },
    { text: "Perfecto, ya está listo", delay: 5.4 },
  ]

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src="/robot.png"
        alt="Asistente virtual inteligente"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 60vw"
        priority={false}
      />
      
      {/* Chat bubbles animadas - estilo mensajería moderna */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="absolute animate-chat-bubble"
            style={{
              left: `${10 + (i % 2) * 3}%`,
              top: `${30 + i * 4}%`,
              animationDelay: `${msg.delay}s`,
              animationDuration: '7s',
            }}
          >
            <div className="relative">
              {/* Burbuja de chat con estilo moderno - responsive */}
              <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF4D00] text-white px-3 py-1.5 md:px-5 md:py-3 rounded-[16px] md:rounded-[20px] rounded-bl-[3px] md:rounded-bl-[4px] text-[10px] md:text-sm font-medium shadow-[0_4px_15px_rgba(255,107,53,0.3)] md:shadow-[0_8px_30px_rgba(255,107,53,0.4)] backdrop-blur-sm border border-[#FF8C5A]/20">
                {msg.text}
              </div>
              {/* Pequeña cola de la burbuja - responsive */}
              <div className="absolute -bottom-[1.5px] md:-bottom-[2px] left-0 w-0 h-0 border-l-[6px] md:border-l-[8px] border-l-transparent border-t-[6px] md:border-t-[8px] border-t-[#FF4D00]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WebVisual({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const sales = [
    { name: "Ana Martínez", amount: "$342", product: "Pack Premium", delay: 0 },
    { name: "Carlos Ruiz", amount: "$127", product: "Consultoría", delay: 2.2 },
    { name: "Laura Gómez", amount: "$89", product: "Servicio básico", delay: 4.4 },
    { name: "Miguel Torres", amount: "$215", product: "Plan anual", delay: 6.6 },
  ]

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      <Image
        src="/venta.png"
        alt="Diseño web moderno"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 60vw"
        priority={false}
      />
      
      {/* Notificaciones de ventas en tiempo real */}
      {isVisible && (
        <div className="absolute right-[1%] md:right-[3%] -top-[7%] md:-top-[5%] w-[45%] md:w-[35%] pointer-events-none">
          {sales.map((sale, i) => (
            <div
              key={i}
              className="absolute top-0 right-0 w-full animate-sale-notification opacity-0"
              style={{
                animationDelay: `${sale.delay}s`,
                animationDuration: '8.8s',
              }}
            >
              <div className="bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-xl rounded-lg md:rounded-xl border border-cyan-400/40 shadow-xl p-2.5 md:p-3.5">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <span className="text-white text-xs md:text-sm font-bold truncate">{sale.name}</span>
                      <span className="text-cyan-400 text-sm md:text-lg font-bold flex-shrink-0">{sale.amount}</span>
                    </div>
                    <div className="text-white/60 text-[9px] md:text-xs truncate">{sale.product}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[8px] md:text-[10px] font-semibold">Venta completada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function AutomationVisual({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      <Image
        src="/automatizacion.png"
        alt="Automatización de procesos"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 60vw"
        priority={false}
      />
      
      {/* Historia de automatización por módulos - UNO A LA VEZ */}
      {isVisible && (
        <div className="absolute left-[3%] md:left-[5%] top-[15%] md:top-[18%] w-[32%] md:w-[25%] pointer-events-none">
          
          {/* MÓDULO 1: Recepción del pedido */}
          <div className="absolute inset-0 animate-module-1 opacity-0">
            {/* Título del módulo */}
            <div className="mb-1.5 md:mb-3">
              <h3 className="text-purple-300 text-[8px] md:text-xs font-bold uppercase tracking-wider">
                1. Recepción del pedido
              </h3>
            </div>
            
            <div className="space-y-1">
              <div className="bg-gradient-to-r from-purple-500/95 to-purple-600/95 backdrop-blur-xl rounded-md md:rounded-lg border border-purple-400/30 shadow-lg p-1.5 md:p-3">
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[7px] md:text-xs font-bold">Nuevo pedido</span>
                </div>
                <div className="text-white text-xs md:text-xl font-bold mt-0.5 md:mt-1">#1847</div>
              </div>
              
              <div className="flex justify-center py-0.5 md:py-1">
                <svg width="10" height="10" viewBox="0 0 16 16" className="text-purple-400 md:w-5 md:h-5">
                  <path d="M8 2v10M8 12l-3-3M8 12l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/95 to-purple-600/95 backdrop-blur-xl rounded-md md:rounded-lg border border-purple-400/30 shadow-lg p-1.5 md:p-3">
                <div className="text-[6px] md:text-[10px] text-purple-100 font-semibold mb-0.5 md:mb-1">INVENTARIO</div>
                <div className="text-white text-[10px] md:text-lg font-bold">-3 unidades</div>
                <div className="text-purple-100 text-[6px] md:text-[9px] mt-0.5">Stock: 47 disponibles</div>
              </div>
            </div>
          </div>

          {/* MÓDULO 2: Notificación al cliente */}
          <div className="absolute inset-0 animate-module-2 opacity-0">
            {/* Título del módulo */}
            <div className="mb-1.5 md:mb-3">
              <h3 className="text-purple-300 text-[8px] md:text-xs font-bold uppercase tracking-wider">
                2. Notificación al cliente
              </h3>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/95 to-purple-600/95 backdrop-blur-xl rounded-md md:rounded-lg border border-purple-400/30 shadow-lg p-2 md:p-3.5">
              <div className="text-[6px] md:text-[10px] text-purple-100 font-semibold mb-1 md:mb-1.5">EMAIL ENVIADO</div>
              <div className="text-white text-[10px] md:text-lg font-bold mb-0.5 md:mb-1">user@email.com</div>
              <div className="text-purple-100 text-[6px] md:text-[9px]">Confirmación + tracking</div>
            </div>
          </div>

          {/* MÓDULO 3: Facturación */}
          <div className="absolute inset-0 animate-module-3 opacity-0">
            {/* Título del módulo */}
            <div className="mb-1.5 md:mb-3">
              <h3 className="text-purple-300 text-[8px] md:text-xs font-bold uppercase tracking-wider">
                3. Facturación y equipo
              </h3>
            </div>
            
            <div className="space-y-1">
              <div className="bg-gradient-to-r from-purple-500/95 to-purple-600/95 backdrop-blur-xl rounded-md md:rounded-lg border border-purple-400/30 shadow-lg p-1.5 md:p-3">
                <div className="text-[6px] md:text-[10px] text-purple-100 font-semibold mb-0.5 md:mb-1">FACTURA</div>
                <div className="text-white text-sm md:text-2xl font-bold">$127.50</div>
                <div className="text-purple-100 text-[6px] md:text-[9px] mt-0.5">PDF generado y enviado</div>
              </div>
              
              <div className="flex justify-center py-0.5 md:py-1">
                <svg width="10" height="10" viewBox="0 0 16 16" className="text-purple-400 md:w-5 md:h-5">
                  <path d="M8 2v10M8 12l-3-3M8 12l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/95 to-purple-600/95 backdrop-blur-xl rounded-md md:rounded-lg border border-purple-400/30 shadow-lg p-1.5 md:p-3">
                <div className="text-[6px] md:text-[10px] text-purple-100 font-semibold mb-0.5 md:mb-1">EQUIPO ALERTADO</div>
                <div className="text-white text-[10px] md:text-lg font-bold">3 personas notificadas</div>
                <div className="text-purple-100 text-[6px] md:text-[9px] mt-0.5">Slack + WhatsApp + Email</div>
              </div>
            </div>
          </div>

          {/* MÓDULO 4: Resultado final */}
          <div className="absolute inset-0 animate-module-4 opacity-0">
            {/* Título del módulo */}
            <div className="mb-1.5 md:mb-3">
              <h3 className="text-green-300 text-[8px] md:text-xs font-bold uppercase tracking-wider">
                ✓ Proceso completado
              </h3>
            </div>
            
            <div className="bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-xl rounded-md md:rounded-lg border border-green-400/40 shadow-xl p-1.5 md:p-3">
              <div className="flex items-center gap-1 md:gap-2 mb-1.5 md:mb-3">
                <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[7px] md:text-xs font-bold">COMPLETADO</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 md:gap-3">
                <div>
                  <div className="text-white text-xs md:text-xl font-bold">2.3s</div>
                  <div className="text-white/60 text-[6px] md:text-[10px] mt-0.5">Tiempo total</div>
                </div>
                <div>
                  <div className="text-white text-xs md:text-xl font-bold">100%</div>
                  <div className="text-white/60 text-[6px] md:text-[10px] mt-0.5">Automático</div>
                </div>
              </div>
              <div className="mt-1.5 md:mt-3 pt-1.5 md:pt-3 border-t border-white/10">
                <div className="text-green-400 text-[7px] md:text-xs font-semibold">0 intervención humana</div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
