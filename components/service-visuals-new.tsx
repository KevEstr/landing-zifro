"use client"

import { useEffect, useRef, useState } from "react"

export function AgentVisual({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        // Solo animar si está visible Y no está en scroll rápido
        setShouldAnimate(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <svg 
      ref={ref}
      viewBox="0 0 800 600" 
      className={`w-full h-full ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        willChange: isVisible ? 'transform' : 'auto',
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
      }}
    >
      <defs>
        <linearGradient id="agentGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
        <filter id="glowNew" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Reusable circle definition */}
        <circle id="nodeCircle" r="12" />
      </defs>

      {/* Background grid - simplificado MÁS */}
      <g opacity="0.03">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="600" stroke="#0A0A0A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} stroke="#0A0A0A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Central AI core - hexagonal - optimized */}
      <g style={{ willChange: shouldAnimate ? 'opacity' : 'auto' }}>
        <polygon
          points="400,180 480,230 480,330 400,380 320,330 320,230"
          fill="none"
          stroke="url(#agentGradNew)"
          strokeWidth="4"
          opacity="0.6"
          filter="url(#glowNew)"
          vectorEffect="non-scaling-stroke"
        >
          {shouldAnimate && <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />}
        </polygon>
        
        <polygon
          points="400,200 460,240 460,320 400,360 340,320 340,240"
          fill="url(#agentGradNew)"
          opacity="0.1"
        >
          {shouldAnimate && <animate attributeName="opacity" values="0.05;0.2;0.05" dur="2.5s" repeatCount="indefinite" />}
        </polygon>
        
        {/* Core pulse */}
        <circle cx="400" cy="280" r="60" fill="none" stroke="#FF6B35" strokeWidth="3" opacity="0.8" vectorEffect="non-scaling-stroke">
          {shouldAnimate && (
            <>
              <animate attributeName="r" values="50;70;50" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
            </>
          )}
        </circle>
        
        <circle cx="400" cy="280" r="40" fill="#FF6B35" opacity="0.2">
          {shouldAnimate && <animate attributeName="r" values="35;45;35" dur="1.5s" repeatCount="indefinite" />}
        </circle>
        
        {/* AI symbol */}
        <text x="400" y="295" fontSize="48" fontWeight="bold" fill="#FF6B35" textAnchor="middle" opacity="0.9">
          AI
          {shouldAnimate && <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />}
        </text>
      </g>

      {/* Neural connections - pre-calculated positions */}
      {shouldAnimate && [
        { angle: 0, outerX: 580, outerY: 280, midX: 500, midY: 280 },
        { angle: 60, outerX: 490, outerY: 436, midX: 450, midY: 367 },
        { angle: 120, outerX: 310, outerY: 436, midX: 350, midY: 367 },
        { angle: 180, outerX: 220, outerY: 280, midX: 300, midY: 280 },
        { angle: 240, outerX: 310, outerY: 124, midX: 350, midY: 193 },
        { angle: 300, outerX: 490, outerY: 124, midX: 450, midY: 193 },
      ].map((node, i) => {
        return (
          <g key={i} style={{ willChange: 'opacity' }}>
            {/* Connection line */}
            <line
              x1={node.midX}
              y1={node.midY}
              x2={node.outerX}
              y2={node.outerY}
              stroke="url(#agentGradNew)"
              strokeWidth="2"
              opacity="0.3"
              strokeDasharray="5 5"
              vectorEffect="non-scaling-stroke"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.5;0.1"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="10"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
            
            {/* Data packets */}
            <circle r="5" fill="#00D9FF" opacity="0.8" filter="url(#glowNew)">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${i * 0.25}s`}
                path={`M ${node.midX} ${node.midY} L ${node.outerX} ${node.outerY}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${i * 0.25}s`}
              />
            </circle>
            
            {/* Outer processing nodes - usando <use> */}
            <circle
              cx={node.outerX}
              cy={node.outerY}
              r="20"
              fill="none"
              stroke="#00D9FF"
              strokeWidth="2"
              opacity="0.6"
              vectorEffect="non-scaling-stroke"
            >
              <animate
                attributeName="r"
                values="18;24;18"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
            <use href="#nodeCircle" x={node.outerX - 12} y={node.outerY - 12} fill="#00D9FF" opacity="0.4" />
            
            {/* Activity pulse */}
            <circle
              cx={node.outerX}
              cy={node.outerY}
              r="6"
              fill="#FFFFFF"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </circle>
          </g>
        );
      })}

      {/* Data streams - reducido */}
      {shouldAnimate && [0, 1].map((i) => (
        <g key={`stream${i}`} opacity="0.4" style={{ willChange: 'transform, opacity' }}>
          <path
            d={`M ${100 + i * 400} 50 Q ${150 + i * 400} 100 ${100 + i * 400} 150`}
            fill="none"
            stroke="#FF6B35"
            strokeWidth="2"
            opacity="0"
            vectorEffect="non-scaling-stroke"
          >
            <animate
              attributeName="opacity"
              values="0;0.6;0"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.7}s`}
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,50; 0,100"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.7}s`}
            />
          </path>
        </g>
      ))}

      {/* Processing indicators - reducido */}
      <g style={{ willChange: 'transform' }}>
        {shouldAnimate && [0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={300 + i * 50}
            y="500"
            width="30"
            height="80"
            rx="6"
            fill="url(#agentGradNew)"
            opacity="0.3"
          >
            <animate
              attributeName="height"
              values={`${30 + i * 8};${80 + i * 10};${30 + i * 8}`}
              dur="1.8s"
              repeatCount="indefinite"
              begin={`${i * 0.15}s`}
            />
            <animate
              attributeName="y"
              values={`${550 - i * 8};${500 - i * 10};${550 - i * 8}`}
              dur="1.8s"
              repeatCount="indefinite"
              begin={`${i * 0.15}s`}
            />
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur="1.8s"
              repeatCount="indefinite"
              begin={`${i * 0.15}s`}
            />
          </rect>
        ))}
      </g>

      {/* Status badges - reducido */}
      {shouldAnimate && [
        { x: 120, y: 150, text: "24/7", color: "#FF6B35", type: "text" },
        { x: 680, y: 180, text: "∞", color: "#00D9FF", type: "text" },
      ].map((badge, i) => {
        const icons = {
          zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
          check: "M20 6L9 17l-5-5",
        }
        
        return (
          <g key={i} style={{ willChange: 'transform' }}>
            <circle
              cx={badge.x}
              cy={badge.y}
              r="40"
              fill={badge.color}
              opacity="0.1"
            >
              <animate
                attributeName="r"
                values="35;45;35"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
            </circle>
            {badge.type === "text" ? (
              <text
                x={badge.x}
                y={badge.y + 10}
                fontSize="32"
                fontWeight="bold"
                fill={badge.color}
                opacity="0.7"
                textAnchor="middle"
              >
                {badge.text}
                <animate
                  attributeName="opacity"
                  values="0.5;0.9;0.5"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                />
              </text>
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}

export function WebVisual({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <svg 
      ref={ref}
      viewBox="0 0 800 600" 
      className={`w-full h-full ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        willChange: isVisible ? 'transform' : 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <defs>
        <linearGradient id="webGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="webGlow" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Browser window - modern */}
      <rect x="80" y="80" width="640" height="440" rx="24" fill="#FFFFFF" opacity="0.05" stroke="#00D9FF" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      
      {/* Browser bar */}
      <rect x="80" y="80" width="640" height="60" rx="24" fill="#00D9FF" opacity="0.15" />
      <circle cx="120" cy="110" r="10" fill="#FF6B35" opacity="0.7">
        {isVisible && <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />}
      </circle>
      <circle cx="160" cy="110" r="10" fill="#10B981" opacity="0.7">
        {isVisible && <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.3s" />}
      </circle>
      <circle cx="200" cy="110" r="10" fill="#8B5CF6" opacity="0.7">
        {isVisible && <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.6s" />}
      </circle>

      {/* URL bar */}
      <rect x="250" y="95" width="420" height="30" rx="15" fill="#FFFFFF" opacity="0.1" />
      <text x="270" y="115" fontSize="14" fill="#00D9FF" opacity="0.6" fontFamily="monospace">
        https://zifro.dev
      </text>

      {/* Content blocks - building animation */}
      {isVisible && (
        <>
          <rect x="120" y="180" width="560" height="50" rx="12" fill="url(#webGradNew)" opacity="0">
            <animate attributeName="opacity" values="0;0.3;0.3" dur="0.5s" fill="freeze" begin="0.2s" />
            <animate attributeName="width" values="0;560" dur="0.8s" fill="freeze" begin="0.2s" />
          </rect>
          
          <rect x="120" y="250" width="270" height="220" rx="12" fill="url(#webGradNew)" opacity="0">
            <animate attributeName="opacity" values="0;0.25;0.25" dur="0.5s" fill="freeze" begin="0.6s" />
            <animate attributeName="height" values="0;220" dur="0.8s" fill="freeze" begin="0.6s" />
          </rect>
          
          <rect x="410" y="250" width="270" height="105" rx="12" fill="url(#webGradNew)" opacity="0">
            <animate attributeName="opacity" values="0;0.25;0.25" dur="0.5s" fill="freeze" begin="1s" />
            <animate attributeName="height" values="0;105" dur="0.8s" fill="freeze" begin="1s" />
          </rect>
          
          <rect x="410" y="365" width="270" height="105" rx="12" fill="url(#webGradNew)" opacity="0">
            <animate attributeName="opacity" values="0;0.25;0.25" dur="0.5s" fill="freeze" begin="1.4s" />
            <animate attributeName="height" values="0;105" dur="0.8s" fill="freeze" begin="1.4s" />
          </rect>
        </>
      )}

      {/* Code transformation - reducido */}
      {isVisible && ["<div>", "<main>"].map((tag, i) => (
        <text
          key={tag}
          x={200 + i * 300}
          y={550}
          fill="#00D9FF"
          fontSize="20"
          fontFamily="monospace"
          opacity="0.5"
        >
          {tag}
          <animate attributeName="y" values="550;530;550" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
        </text>
      ))}

      {/* Performance metrics */}
      {isVisible && [
        { x: 150, y: 300, label: "98", unit: "%" },
        { x: 250, y: 350, label: "< 1s", unit: "" },
        { x: 150, y: 400, label: "A+", unit: "" },
      ].map((metric, i) => (
        <g key={i} opacity="0">
          <animate attributeName="opacity" values="0;0.8;0.8" dur="0.5s" fill="freeze" begin={`${1.8 + i * 0.3}s`} />
          <circle cx={metric.x} cy={metric.y} r="25" fill="#10B981" opacity="0.2" />
          <text x={metric.x} y={metric.y + 6} fontSize="16" fontWeight="bold" fill="#10B981" textAnchor="middle">
            {metric.label}
          </text>
        </g>
      ))}

      {/* Cursor with click effect */}
      {isVisible && (
        <g style={{ willChange: 'transform' }}>
          <path d="M 0 0 L 0 24 L 6 18 L 12 30 L 16 28 L 10 16 L 18 16 Z" fill="#FF6B35" opacity="0.9" filter="url(#webGlow)">
            <animateMotion
              path="M 200 200 Q 400 280 600 350 T 650 450"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          {/* Click ripple */}
          <circle r="0" fill="none" stroke="#FF6B35" strokeWidth="2" opacity="0.6" vectorEffect="non-scaling-stroke">
            <animateMotion
              path="M 200 200 Q 400 280 600 350 T 650 450"
              dur="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="0;20;0"
              dur="0.6s"
              repeatCount="indefinite"
              begin="0;3s;6s"
            />
            <animate
              attributeName="opacity"
              values="0.8;0;0"
              dur="0.6s"
              repeatCount="indefinite"
              begin="0;3s;6s"
            />
          </circle>
        </g>
      )}

      {/* Responsive indicators - reducido */}
      {isVisible && [
        { x: 620, y: 200, w: 60, h: 100, icon: "smartphone" },
        { x: 620, y: 320, w: 100, h: 70, icon: "monitor" },
      ].map((device, i) => {
        const icons = {
          smartphone: "M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z M12 18h.01",
          laptop: "M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16",
          monitor: "M20 3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z M8 21h8 M12 17v4",
        }
        
        return (
          <g key={i} style={{ willChange: 'opacity' }}>
            <rect
              x={device.x}
              y={device.y}
              width={device.w}
              height={device.h}
              rx="8"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
              opacity="0.5"
              vectorEffect="non-scaling-stroke"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.8}s`}
              />
            </rect>
            <g transform={`translate(${device.x + device.w / 2 - 12}, ${device.y + device.h / 2 - 12})`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                <path d={icons[device.icon as keyof typeof icons]} />
              </svg>
            </g>
          </g>
        )
      })}
    </svg>
  )
}

export function AutomationVisual({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <svg 
      ref={ref}
      viewBox="0 0 800 600" 
      className={`w-full h-full ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        willChange: isVisible ? 'transform' : 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <defs>
        <linearGradient id="autoGradNew" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
        <filter id="autoGlow" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Workflow nodes */}
      {isVisible && [
        { x: 150, y: 200, label: "Input", icon: "inbox" },
        { x: 350, y: 150, label: "Process", icon: "settings" },
        { x: 350, y: 300, label: "Filter", icon: "filter" },
        { x: 550, y: 200, label: "Transform", icon: "zap" },
        { x: 700, y: 200, label: "Output", icon: "send" },
      ].map((node, i) => {
        // Icon paths
        const icons = {
          inbox: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
          settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
          filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
          zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
          send: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
        }
        
        return (
          <g key={i} style={{ willChange: 'opacity' }}>
            {/* Node container */}
            <rect
              x={node.x - 60}
              y={node.y - 40}
              width="120"
              height="80"
              rx="16"
              fill="url(#autoGradNew)"
              opacity="0.15"
              stroke="#8B5CF6"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            >
              <animate
                attributeName="opacity"
                values="0.1;0.25;0.1"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </rect>
            
            {/* Icon SVG */}
            <g transform={`translate(${node.x - 12}, ${node.y - 20})`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={icons[node.icon as keyof typeof icons]} />
              </svg>
            </g>
            
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 25}
              fontSize="14"
              fontWeight="bold"
              fill="#8B5CF6"
              textAnchor="middle"
              opacity="0.8"
            >
              {node.label}
            </text>
            
            {/* Activity pulse */}
            <circle
              cx={node.x + 50}
              cy={node.y - 30}
              r="6"
              fill="#10B981"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
              <animate
                attributeName="r"
                values="4;8;4"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </circle>
          </g>
        )
      })}

      {/* Connections with data flow */}
      {isVisible && [
        { x1: 210, y1: 200, x2: 290, y2: 170 },
        { x1: 210, y1: 200, x2: 290, y2: 280 },
        { x1: 410, y1: 150, x2: 490, y2: 190 },
        { x1: 410, y1: 300, x2: 490, y2: 210 },
        { x1: 610, y1: 200, x2: 640, y2: 200 },
      ].map((conn, i) => (
        <g key={i} style={{ willChange: 'transform' }}>
          {/* Connection line */}
          <line
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#autoGradNew)"
            strokeWidth="3"
            strokeDasharray="8 4"
            opacity="0.4"
            vectorEffect="non-scaling-stroke"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="12"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
          
          {/* Arrow */}
          <polygon
            points={`${conn.x2},${conn.y2} ${conn.x2 - 10},${conn.y2 - 6} ${conn.x2 - 10},${conn.y2 + 6}`}
            fill="#8B5CF6"
            opacity="0.6"
          />
          
          {/* Data packets */}
          <circle r="6" fill="#00D9FF" opacity="0.8" filter="url(#autoGlow)">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.4}s`}
              path={`M ${conn.x1} ${conn.y1} L ${conn.x2} ${conn.y2}`}
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0"
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.4}s`}
            />
          </circle>
        </g>
      ))}

      {/* Efficiency chart */}
      {isVisible && (
        <g transform="translate(100, 380)" style={{ willChange: 'transform' }}>
          <text x="0" y="-10" fontSize="16" fontWeight="bold" fill="#8B5CF6" opacity="0.8">
            Eficiencia
          </text>
          {[
            { x: 0, h: 40, label: "Manual" },
            { x: 100, h: 120, label: "Automatizado" },
          ].map((bar, i) => (
            <g key={i}>
              <rect
                x={bar.x}
                y={150 - bar.h}
                width="80"
                height="0"
                rx="8"
                fill="url(#autoGradNew)"
                opacity="0.6"
              >
                <animate
                  attributeName="height"
                  from="0"
                  to={bar.h}
                  dur="1.5s"
                  fill="freeze"
                  begin={`${i * 0.5}s`}
                />
              </rect>
              <text
                x={bar.x + 40}
                y="170"
                fontSize="12"
                fill="#8B5CF6"
                textAnchor="middle"
                opacity="0.7"
              >
                {bar.label}
              </text>
            </g>
          ))}
          
          {/* Improvement arrow - SUBIDA MÁS */}
          <path
            d="M 90 45 L 90 5 L 110 25 M 90 5 L 70 25"
            stroke="#10B981"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
            vectorEffect="non-scaling-stroke"
          >
            <animate
              attributeName="opacity"
              values="0;0.8;0.8"
              dur="0.5s"
              fill="freeze"
              begin="1.5s"
            />
          </path>
          <text x="120" y="20" fontSize="24" fontWeight="bold" fill="#10B981" opacity="0">
            +200%
            <animate
              attributeName="opacity"
              values="0;0.9;0.9"
              dur="0.5s"
              fill="freeze"
              begin="1.5s"
            />
          </text>
        </g>
      )}

      {/* Time saved indicator */}
      {isVisible && (
        <g transform="translate(480, 350)" style={{ willChange: 'transform' }}>
          <circle cx="80" cy="80" r="70" fill="none" stroke="#8B5CF6" strokeWidth="4" opacity="0.2" vectorEffect="non-scaling-stroke" />
          <circle cx="80" cy="80" r="70" fill="none" stroke="#10B981" strokeWidth="6" strokeDasharray="440" strokeDashoffset="110" opacity="0.8" vectorEffect="non-scaling-stroke">
            <animate
              attributeName="stroke-dashoffset"
              from="440"
              to="110"
              dur="2s"
              fill="freeze"
              begin="0.5s"
            />
          </circle>
          <text x="80" y="75" fontSize="32" fontWeight="bold" fill="#10B981" textAnchor="middle">
            75%
          </text>
          <text x="80" y="100" fontSize="12" fill="#8B5CF6" textAnchor="middle" opacity="0.7">
            Tiempo ahorrado
          </text>
        </g>
      )}
    </svg>
  )
}
