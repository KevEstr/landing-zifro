"use client"

export function AIBrainVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brainGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8654A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="brainGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A7C6F" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4A853" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Central core */}
      <circle cx="200" cy="200" r="40" fill="url(#brainGrad1)" opacity="0.3">
        <animate attributeName="r" values="35;45;35" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="25" fill="#E8654A" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Neural pathways - Layer 1 */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 200 + Math.cos(rad) * 50
        const y1 = 200 + Math.sin(rad) * 50
        const x2 = 200 + Math.cos(rad) * 120
        const y2 = 200 + Math.sin(rad) * 120
        
        return (
          <g key={`layer1-${i}`}>
            <line 
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke="url(#brainGrad1)" 
              strokeWidth="2" 
              opacity="0.4"
              filter="url(#glow)"
            >
              <animate 
                attributeName="opacity" 
                values="0.2;0.6;0.2" 
                dur={`${3 + i * 0.5}s`} 
                repeatCount="indefinite" 
              />
            </line>
            <circle cx={x2} cy={y2} r="8" fill="#4A7C6F" opacity="0.7">
              <animate 
                attributeName="r" 
                values="6;10;6" 
                dur={`${3 + i * 0.3}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          </g>
        )
      })}

      {/* Neural pathways - Layer 2 */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 200 + Math.cos(rad) * 50
        const y1 = 200 + Math.sin(rad) * 50
        const x2 = 200 + Math.cos(rad) * 160
        const y2 = 200 + Math.sin(rad) * 160
        
        return (
          <g key={`layer2-${i}`}>
            <line 
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke="url(#brainGrad2)" 
              strokeWidth="1.5" 
              opacity="0.3"
              strokeDasharray="5 5"
            >
              <animate 
                attributeName="stroke-dashoffset" 
                from="0" 
                to="10" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </line>
            <circle cx={x2} cy={y2} r="6" fill="#D4A853" opacity="0.6">
              <animate 
                attributeName="opacity" 
                values="0.3;0.8;0.3" 
                dur={`${4 + i * 0.4}s`} 
                repeatCount="indefinite" 
                begin={`${i * 0.3}s`}
              />
            </circle>
          </g>
        )
      })}

      {/* Outer connections */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 200 + Math.cos(rad) * 180
        const y = 200 + Math.sin(rad) * 180
        
        return (
          <g key={`outer-${i}`}>
            <circle cx={x} cy={y} r="12" fill="none" stroke="#E8654A" strokeWidth="2" opacity="0.4">
              <animate 
                attributeName="r" 
                values="10;16;10" 
                dur={`${5 + i * 0.5}s`} 
                repeatCount="indefinite" 
              />
            </circle>
            <circle cx={x} cy={y} r="4" fill="#E8654A" opacity="0.8" />
          </g>
        )
      })}

      {/* Data pulses */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle 
          key={`pulse-${i}`}
          cx="200" 
          cy="200" 
          r="5" 
          fill="#E8654A" 
          opacity="0"
        >
          <animate 
            attributeName="opacity" 
            values="0;1;0" 
            dur="3s" 
            repeatCount="indefinite" 
            begin={`${i * 0.5}s`}
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`0,0; ${Math.cos((angle * Math.PI) / 180) * 120},${Math.sin((angle * Math.PI) / 180) * 120}`}
            dur="3s"
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          />
        </circle>
      ))}
    </svg>
  )
}
