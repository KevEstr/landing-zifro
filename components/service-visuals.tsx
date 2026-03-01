"use client"

import { useEffect, useRef } from "react"

export function AgentVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8654A" />
          <stop offset="100%" stopColor="#D4A853" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A7C6F" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E8654A" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background glow circles */}
      <circle cx="400" cy="300" r="200" fill="url(#agentGrad)" opacity="0.05">
        <animate attributeName="r" values="180;220;180" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="300" r="150" fill="url(#glowGrad)" opacity="0.08">
        <animate attributeName="r" values="140;160;140" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Main AI brain/core - geometric and modern */}
      <g>
        {/* Outer hexagon ring */}
        <polygon
          points="400,150 480,200 480,300 400,350 320,300 320,200"
          fill="none"
          stroke="url(#agentGrad)"
          strokeWidth="3"
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </polygon>
        
        {/* Middle hexagon */}
        <polygon
          points="400,180 460,215 460,285 400,320 340,285 340,215"
          fill="url(#agentGrad)"
          opacity="0.15"
        >
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2.5s" repeatCount="indefinite" />
        </polygon>
        
        {/* Inner core circle */}
        <circle cx="400" cy="250" r="50" fill="url(#glowGrad)" opacity="0.3" filter="url(#glow)">
          <animate attributeName="r" values="45;55;45" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Central AI symbol */}
        <circle cx="400" cy="250" r="35" fill="none" stroke="#E8654A" strokeWidth="3" opacity="0.8" />
        <circle cx="400" cy="250" r="25" fill="none" stroke="#4A7C6F" strokeWidth="2" opacity="0.6">
          <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* AI "eye" in center */}
        <circle cx="400" cy="250" r="12" fill="#E8654A" opacity="0.9">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Neural network connections - 6 nodes around hexagon */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const outerX = 400 + Math.cos((angle * Math.PI) / 180) * 130;
        const outerY = 250 + Math.sin((angle * Math.PI) / 180) * 130;
        const midX = 400 + Math.cos((angle * Math.PI) / 180) * 80;
        const midY = 250 + Math.sin((angle * Math.PI) / 180) * 80;
        
        return (
          <g key={i}>
            {/* Connection line */}
            <line
              x1="400"
              y1="250"
              x2={outerX}
              y2={outerY}
              stroke="url(#agentGrad)"
              strokeWidth="2"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.6;0.2"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </line>
            
            {/* Data pulse traveling on line */}
            <circle r="4" fill="#D4A853" opacity="0.8">
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
                path={`M 400 250 L ${outerX} ${outerY}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
            </circle>
            
            {/* Outer node */}
            <circle
              cx={outerX}
              cy={outerY}
              r="15"
              fill="url(#glowGrad)"
              opacity="0.4"
            >
              <animate
                attributeName="r"
                values="12;18;12"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
            <circle
              cx={outerX}
              cy={outerY}
              r="8"
              fill="#4A7C6F"
              opacity="0.8"
            />
            
            {/* Activity indicator */}
            <circle
              cx={outerX}
              cy={outerY}
              r="4"
              fill="#E8654A"
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

      {/* Orbiting data particles */}
      {[0, 90, 180, 270].map((startAngle, i) => (
        <circle key={i} cx="400" cy="250" r="6" fill="#E8654A" opacity="0.7" filter="url(#glow)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${startAngle} 400 250`}
            to={`${startAngle + 360} 400 250`}
            dur="6s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 100,0; 0,0"
            dur="6s"
            repeatCount="indefinite"
            additive="sum"
          />
        </circle>
      ))}

      {/* Signal waves emanating from top */}
      {[0, 1, 2].map((i) => (
        <g key={i} opacity="0.4">
          <path
            d="M 350 150 Q 400 120 450 150"
            fill="none"
            stroke="#E8654A"
            strokeWidth="2"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.6;0"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 1}s`}
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-30; 0,-60"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 1}s`}
            />
          </path>
        </g>
      ))}

      {/* Bottom processing indicators */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={340 + i * 30}
            y="420"
            width="20"
            height="60"
            rx="4"
            fill="url(#agentGrad)"
            opacity="0.3"
          >
            <animate
              attributeName="height"
              values="20;60;20"
              dur="1.5s"
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
            <animate
              attributeName="y"
              values="460;420;460"
              dur="1.5s"
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="1.5s"
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </rect>
        ))}
      </g>

      {/* Floating capability badges */}
      {[
        { x: 150, y: 180, text: "24/7", color: "#E8654A" },
        { x: 650, y: 200, text: "AI", color: "#4A7C6F" },
        { x: 180, y: 400, text: "∞", color: "#D4A853" },
        { x: 620, y: 380, text: "⚡", color: "#E8654A" },
      ].map((badge, i) => (
        <g key={i}>
          <circle
            cx={badge.x}
            cy={badge.y}
            r="35"
            fill={badge.color}
            opacity="0.15"
          >
            <animate
              attributeName="r"
              values="30;40;30"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
            />
          </circle>
          <text
            x={badge.x}
            y={badge.y + 8}
            fontSize="28"
            fontWeight="bold"
            fill={badge.color}
            opacity="0.6"
            textAnchor="middle"
          >
            {badge.text}
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
            />
          </text>
        </g>
      ))}

      {/* Decorative corner elements */}
      <g opacity="0.2">
        <circle cx="100" cy="100" r="3" fill="#E8654A" />
        <circle cx="700" cy="100" r="3" fill="#4A7C6F" />
        <circle cx="100" cy="500" r="3" fill="#D4A853" />
        <circle cx="700" cy="500" r="3" fill="#E8654A" />
      </g>
    </svg>
  )
}

export function WebVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A7C6F" />
          <stop offset="100%" stopColor="#D4A853" />
        </linearGradient>
      </defs>

      {/* Browser window */}
      <rect x="100" y="100" width="600" height="400" rx="20" fill="#FFFFFF" opacity="0.1" stroke="#4A7C6F" strokeWidth="3" />
      
      {/* Browser bar */}
      <rect x="100" y="100" width="600" height="50" rx="20" fill="#4A7C6F" opacity="0.3" />
      <circle cx="130" cy="125" r="8" fill="#E8654A" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="125" r="8" fill="#D4A853" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="190" cy="125" r="8" fill="#4A7C6F" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </circle>

      {/* Content blocks */}
      <rect x="130" y="180" width="540" height="40" rx="8" fill="url(#webGrad)" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="130" y="240" width="250" height="200" rx="8" fill="url(#webGrad)" opacity="0.15">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite" begin="0.5s" />
      </rect>
      <rect x="400" y="240" width="270" height="95" rx="8" fill="url(#webGrad)" opacity="0.15">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite" begin="1s" />
      </rect>
      <rect x="400" y="345" width="270" height="95" rx="8" fill="url(#webGrad)" opacity="0.15">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite" begin="1.5s" />
      </rect>

      {/* Floating code symbols */}
      {["</>", "{}", "[]", "()"].map((symbol, i) => (
        <text
          key={symbol}
          x={150 + i * 150}
          y={550}
          fill="#4A7C6F"
          fontSize="24"
          fontFamily="monospace"
          opacity="0.4"
        >
          {symbol}
          <animate attributeName="y" values="550;530;550" dur={`${3 + i}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + i}s`} repeatCount="indefinite" />
        </text>
      ))}

      {/* Cursor */}
      <g>
        <path d="M 0 0 L 0 20 L 5 15 L 10 25 L 13 23 L 8 13 L 15 13 Z" fill="#E8654A" opacity="0.8">
          <animateMotion
            path="M 200 200 Q 400 250 600 300 T 650 450"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  )
}

export function AutomationVisual({ className = "" }: { className?: string }) {
  // Pre-calcular todas las posiciones para evitar diferencias de hidratación
  const gears = [
    { cx: 250, cy: 300, r: 80, teeth: 12, speed: 4 },
    { cx: 450, cy: 300, r: 60, teeth: 10, speed: -5 },
    { cx: 600, cy: 300, r: 70, teeth: 11, speed: 4.5 },
  ]

  const getTeethPositions = (gear: typeof gears[0]) => {
    return Array.from({ length: gear.teeth }, (_, i) => {
      const angle = (i / gear.teeth) * Math.PI * 2
      return {
        x1: Math.round((gear.cx + Math.cos(angle) * gear.r) * 100) / 100,
        y1: Math.round((gear.cy + Math.sin(angle) * gear.r) * 100) / 100,
        x2: Math.round((gear.cx + Math.cos(angle) * (gear.r + 15)) * 100) / 100,
        y2: Math.round((gear.cy + Math.sin(angle) * (gear.r + 15)) * 100) / 100,
      }
    })
  }

  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A853" />
          <stop offset="100%" stopColor="#E8654A" />
        </linearGradient>
      </defs>

      {/* Gear system */}
      {gears.map((gear, gi) => {
        const teethPositions = getTeethPositions(gear)
        return (
          <g key={gi}>
            <circle cx={gear.cx} cy={gear.cy} r={gear.r} fill="none" stroke="url(#autoGrad)" strokeWidth="8" opacity="0.3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${gear.cx} ${gear.cy}`}
                to={`${gear.speed > 0 ? 360 : -360} ${gear.cx} ${gear.cy}`}
                dur={`${Math.abs(gear.speed)}s`}
                repeatCount="indefinite"
              />
            </circle>
            {teethPositions.map((tooth, i) => (
              <line
                key={i}
                x1={tooth.x1}
                y1={tooth.y1}
                x2={tooth.x2}
                y2={tooth.y2}
                stroke="#D4A853"
                strokeWidth="6"
                opacity="0.5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${gear.cx} ${gear.cy}`}
                  to={`${gear.speed > 0 ? 360 : -360} ${gear.cx} ${gear.cy}`}
                  dur={`${Math.abs(gear.speed)}s`}
                  repeatCount="indefinite"
                />
              </line>
            ))}
            <circle cx={gear.cx} cy={gear.cy} r={20} fill="#D4A853" opacity="0.6" />
          </g>
        )
      })}

      {/* Data flow arrows */}
      {[
        { x1: 330, y1: 280, x2: 390, y2: 280 },
        { x1: 510, y1: 280, x2: 540, y2: 280 },
      ].map((arrow, i) => (
        <g key={i}>
          <line
            x1={arrow.x1}
            y1={arrow.y1}
            x2={arrow.x2}
            y2={arrow.y2}
            stroke="#E8654A"
            strokeWidth="4"
            strokeDasharray="10 5"
            opacity="0.6"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="15"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
          <polygon
            points={`${arrow.x2},${arrow.y2} ${arrow.x2 - 10},${arrow.y2 - 6} ${arrow.x2 - 10},${arrow.y2 + 6}`}
            fill="#E8654A"
            opacity="0.6"
          />
        </g>
      ))}

      {/* Efficiency indicators */}
      {[150, 400, 650].map((x, i) => (
        <g key={i}>
          <rect x={x - 40} y={450} width="80" height="100" rx="8" fill="url(#autoGrad)" opacity="0.2" />
          <rect x={x - 35} y={460 + (2 - i) * 30} width="70" height={90 - (2 - i) * 30} rx="6" fill="#D4A853" opacity="0.5">
            <animate
              attributeName="height"
              values={`${90 - (2 - i) * 30};${100 - (2 - i) * 30};${90 - (2 - i) * 30}`}
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
            />
          </rect>
        </g>
      ))}
    </svg>
  )
}
