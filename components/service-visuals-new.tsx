"use client"

export function AgentVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="agentGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
        <filter id="glowNew">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background grid */}
      <g opacity="0.05">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="600" stroke="#0A0A0A" strokeWidth="1" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="#0A0A0A" strokeWidth="1" />
        ))}
      </g>

      {/* Central AI core - hexagonal */}
      <g>
        <polygon
          points="400,180 480,230 480,330 400,380 320,330 320,230"
          fill="none"
          stroke="url(#agentGradNew)"
          strokeWidth="4"
          opacity="0.6"
          filter="url(#glowNew)"
        >
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </polygon>
        
        <polygon
          points="400,200 460,240 460,320 400,360 340,320 340,240"
          fill="url(#agentGradNew)"
          opacity="0.1"
        >
          <animate attributeName="opacity" values="0.05;0.2;0.05" dur="2.5s" repeatCount="indefinite" />
        </polygon>
        
        {/* Core pulse */}
        <circle cx="400" cy="280" r="60" fill="none" stroke="#FF6B35" strokeWidth="3" opacity="0.8">
          <animate attributeName="r" values="50;70;50" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="400" cy="280" r="40" fill="#FF6B35" opacity="0.2">
          <animate attributeName="r" values="35;45;35" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* AI symbol */}
        <text x="400" y="295" fontSize="48" fontWeight="bold" fill="#FF6B35" textAnchor="middle" opacity="0.9">
          AI
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </text>
      </g>

      {/* Neural connections - 8 nodes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const outerX = 400 + Math.cos((angle * Math.PI) / 180) * 180;
        const outerY = 280 + Math.sin((angle * Math.PI) / 180) * 180;
        const midX = 400 + Math.cos((angle * Math.PI) / 180) * 100;
        const midY = 280 + Math.sin((angle * Math.PI) / 180) * 100;
        
        return (
          <g key={i}>
            {/* Connection line */}
            <line
              x1={midX}
              y1={midY}
              x2={outerX}
              y2={outerY}
              stroke="url(#agentGradNew)"
              strokeWidth="2"
              opacity="0.3"
              strokeDasharray="5 5"
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
                path={`M ${midX} ${midY} L ${outerX} ${outerY}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${i * 0.25}s`}
              />
            </circle>
            
            {/* Outer processing nodes */}
            <circle
              cx={outerX}
              cy={outerY}
              r="20"
              fill="none"
              stroke="#00D9FF"
              strokeWidth="2"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                values="18;24;18"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
            <circle
              cx={outerX}
              cy={outerY}
              r="12"
              fill="#00D9FF"
              opacity="0.4"
            />
            
            {/* Activity pulse */}
            <circle
              cx={outerX}
              cy={outerY}
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

      {/* Data streams */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`stream${i}`} opacity="0.4">
          <path
            d={`M ${100 + i * 200} 50 Q ${150 + i * 200} 100 ${100 + i * 200} 150`}
            fill="none"
            stroke="#FF6B35"
            strokeWidth="2"
            opacity="0"
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

      {/* Processing indicators */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x={280 + i * 40}
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

      {/* Status badges */}
      {[
        { x: 120, y: 150, text: "24/7", color: "#FF6B35", type: "text" },
        { x: 680, y: 180, text: "∞", color: "#00D9FF", type: "text" },
        { x: 140, y: 450, icon: "zap", color: "#8B5CF6", type: "icon" },
        { x: 660, y: 420, icon: "check", color: "#10B981", type: "icon" },
      ].map((badge, i) => {
        const icons = {
          zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
          check: "M20 6L9 17l-5-5",
        }
        
        return (
          <g key={i}>
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
            ) : (
              <g transform={`translate(${badge.x - 16}, ${badge.y - 16})`}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={badge.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                  <path d={icons[badge.icon as keyof typeof icons]} />
                  <animate
                    attributeName="opacity"
                    values="0.5;0.9;0.5"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.6}s`}
                  />
                </svg>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function WebVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="webGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="webGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Browser window - modern */}
      <rect x="80" y="80" width="640" height="440" rx="24" fill="#FFFFFF" opacity="0.05" stroke="#00D9FF" strokeWidth="3" />
      
      {/* Browser bar */}
      <rect x="80" y="80" width="640" height="60" rx="24" fill="#00D9FF" opacity="0.15" />
      <circle cx="120" cy="110" r="10" fill="#FF6B35" opacity="0.7">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="110" r="10" fill="#10B981" opacity="0.7">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="200" cy="110" r="10" fill="#8B5CF6" opacity="0.7">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </circle>

      {/* URL bar */}
      <rect x="250" y="95" width="420" height="30" rx="15" fill="#FFFFFF" opacity="0.1" />
      <text x="270" y="115" fontSize="14" fill="#00D9FF" opacity="0.6" fontFamily="monospace">
        https://zifro.dev
      </text>

      {/* Content blocks - building animation */}
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

      {/* Code transformation */}
      {["<div>", "<header>", "<main>", "<footer>"].map((tag, i) => (
        <text
          key={tag}
          x={120 + i * 140}
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
      {[
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
      <g>
        <path d="M 0 0 L 0 24 L 6 18 L 12 30 L 16 28 L 10 16 L 18 16 Z" fill="#FF6B35" opacity="0.9" filter="url(#webGlow)">
          <animateMotion
            path="M 200 200 Q 400 280 600 350 T 650 450"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        {/* Click ripple */}
        <circle r="0" fill="none" stroke="#FF6B35" strokeWidth="2" opacity="0.6">
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

      {/* Responsive indicators */}
      {[
        { x: 600, y: 200, w: 60, h: 100, icon: "smartphone" },
        { x: 620, y: 320, w: 80, h: 60, icon: "laptop" },
        { x: 600, y: 400, w: 100, h: 70, icon: "monitor" },
      ].map((device, i) => {
        const icons = {
          smartphone: "M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z M12 18h.01",
          laptop: "M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16",
          monitor: "M20 3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z M8 21h8 M12 17v4",
        }
        
        return (
          <g key={i}>
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
  return (
    <svg viewBox="0 0 800 600" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="autoGradNew" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
        <filter id="autoGlow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Workflow nodes */}
      {[
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
          <g key={i}>
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
      {[
        { x1: 210, y1: 200, x2: 290, y2: 170 },
        { x1: 210, y1: 200, x2: 290, y2: 280 },
        { x1: 410, y1: 150, x2: 490, y2: 190 },
        { x1: 410, y1: 300, x2: 490, y2: 210 },
        { x1: 610, y1: 200, x2: 640, y2: 200 },
      ].map((conn, i) => (
        <g key={i}>
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
      <g transform="translate(100, 380)">
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

      {/* Time saved indicator */}
      <g transform="translate(480, 350)">
        <circle cx="80" cy="80" r="70" fill="none" stroke="#8B5CF6" strokeWidth="4" opacity="0.2" />
        <circle cx="80" cy="80" r="70" fill="none" stroke="#10B981" strokeWidth="6" strokeDasharray="440" strokeDashoffset="110" opacity="0.8">
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
    </svg>
  )
}
