"use client"

import { useEffect, useRef, useCallback } from "react"

// ── Types ────────────────────────────────────────────────────────────────────
interface Robot {
  x: number
  y: number
  z: number // depth layer (0 = far, 1 = close)
  speed: number
  variant: number
  falling: boolean
  fallY: number
  fallSpeed: number
  bobOffset: number
  opacity: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

// ── Colors ───────────────────────────────────────────────────────────────────
const ROBOT_COLORS = [
  { body: "#2a2a2a", panel: "#333", eye: "#FF4D00", glow: "rgba(255,77,0," },
  { body: "#303030", panel: "#3a3a3a", eye: "#FF6B2B", glow: "rgba(255,107,43," },
  { body: "#252525", panel: "#2e2e2e", eye: "#FF4D00", glow: "rgba(255,77,0," },
  { body: "#2c2c2c", panel: "#353535", eye: "#FF8C00", glow: "rgba(255,140,0," },
]

// ── Seeded random ────────────────────────────────────────────────────────────
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// ── Draw a single robot head ─────────────────────────────────────────────────
function drawRobot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  variant: number,
  time: number,
  alpha: number
) {
  const c = ROBOT_COLORS[variant % ROBOT_COLORS.length]
  const w = 90 * scale
  const h = 70 * scale

  ctx.save()
  ctx.translate(x, y)
  ctx.globalAlpha = alpha

  // Shadow under robot
  ctx.fillStyle = "rgba(0,0,0,0.4)"
  ctx.beginPath()
  ctx.ellipse(0, h * 0.55, w * 0.45, h * 0.1, 0, 0, Math.PI * 2)
  ctx.fill()

  // Main body
  const radius = 12 * scale
  ctx.fillStyle = c.body
  ctx.strokeStyle = c.panel
  ctx.lineWidth = 1.5 * scale
  roundRect(ctx, -w / 2, -h / 2, w, h, radius)
  ctx.fill()
  ctx.stroke()

  // Top panel
  ctx.fillStyle = c.panel
  roundRect(ctx, -w * 0.38, -h / 2, w * 0.76, h * 0.32, 8 * scale)
  ctx.fill()

  // Screen/visor
  ctx.fillStyle = "#0a0a0a"
  roundRect(ctx, -w * 0.36, -h * 0.05, w * 0.72, h * 0.48, 5 * scale)
  ctx.fill()

  // Eye glow pulse
  const pulse = 0.6 + Math.sin(time * 3 + variant) * 0.4

  // Left eye
  const eyeR = 10 * scale
  const eyeY = h * 0.12
  const eyeLX = -w * 0.17

  // Eye glow
  const glowGrad = ctx.createRadialGradient(eyeLX, eyeY, 0, eyeLX, eyeY, eyeR * 2.5)
  glowGrad.addColorStop(0, c.glow + (0.5 * pulse) + ")")
  glowGrad.addColorStop(1, c.glow + "0)")
  ctx.fillStyle = glowGrad
  ctx.beginPath()
  ctx.arc(eyeLX, eyeY, eyeR * 2.5, 0, Math.PI * 2)
  ctx.fill()

  // Eye circle
  ctx.fillStyle = c.eye
  ctx.globalAlpha = alpha * (0.7 + 0.3 * pulse)
  ctx.beginPath()
  ctx.arc(eyeLX, eyeY, eyeR, 0, Math.PI * 2)
  ctx.fill()

  // Eye highlight
  ctx.fillStyle = "rgba(255,255,255,0.35)"
  ctx.beginPath()
  ctx.arc(eyeLX - eyeR * 0.2, eyeY - eyeR * 0.2, eyeR * 0.45, 0, Math.PI * 2)
  ctx.fill()

  ctx.globalAlpha = alpha

  // Right eye
  const eyeRX = w * 0.17
  const glowGrad2 = ctx.createRadialGradient(eyeRX, eyeY, 0, eyeRX, eyeY, eyeR * 2.5)
  glowGrad2.addColorStop(0, c.glow + (0.5 * pulse) + ")")
  glowGrad2.addColorStop(1, c.glow + "0)")
  ctx.fillStyle = glowGrad2
  ctx.beginPath()
  ctx.arc(eyeRX, eyeY, eyeR * 2.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = c.eye
  ctx.globalAlpha = alpha * (0.7 + 0.3 * pulse)
  ctx.beginPath()
  ctx.arc(eyeRX, eyeY, eyeR, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "rgba(255,255,255,0.35)"
  ctx.beginPath()
  ctx.arc(eyeRX - eyeR * 0.2, eyeY - eyeR * 0.2, eyeR * 0.45, 0, Math.PI * 2)
  ctx.fill()

  ctx.globalAlpha = alpha

  // Side accent strips
  ctx.fillStyle = c.eye
  ctx.globalAlpha = alpha * 0.6
  roundRect(ctx, -w / 2 - 2 * scale, -h * 0.15, 3 * scale, h * 0.4, 1.5 * scale)
  ctx.fill()
  roundRect(ctx, w / 2 - 1 * scale, -h * 0.15, 3 * scale, h * 0.4, 1.5 * scale)
  ctx.fill()
  ctx.globalAlpha = alpha

  // Antenna
  ctx.fillStyle = "#444"
  roundRect(ctx, -2.5 * scale, -h / 2 - 14 * scale, 5 * scale, 14 * scale, 2.5 * scale)
  ctx.fill()

  // Antenna tip
  ctx.fillStyle = c.eye
  ctx.globalAlpha = alpha * (0.5 + 0.5 * pulse)
  ctx.beginPath()
  ctx.arc(0, -h / 2 - 14 * scale, 4 * scale, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ── Main Component ───────────────────────────────────────────────────────────
export function RobotConveyorAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const robotsRef = useRef<Robot[]>([])
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const beltOffsetRef = useRef(0)

  const initRobots = useCallback((width: number, height: number) => {
    const rng = seededRandom(42)
    const robots: Robot[] = []

    // Pre-placed robots on the belt (already there)
    const presets = [
      { xPct: 0.25, yPct: 0.15, z: 0.4, speed: 55 },
      { xPct: 0.50, yPct: 0.28, z: 0.6, speed: 50 },
      { xPct: 0.72, yPct: 0.40, z: 0.8, speed: 45 },
      { xPct: 0.38, yPct: 0.55, z: 0.9, speed: 42 },
      { xPct: 0.60, yPct: 0.10, z: 0.35, speed: 58 },
    ]

    presets.forEach((p, i) => {
      robots.push({
        x: width * p.xPct,
        y: height * p.yPct,
        z: p.z,
        speed: p.speed,
        variant: i % 4,
        falling: false,
        fallY: 0,
        fallSpeed: 0,
        bobOffset: i * 1.3,
        opacity: 1,
      })
    })

    // Robots that will drop from above (staggered)
    for (let i = 0; i < 5; i++) {
      robots.push({
        x: width * (0.2 + rng() * 0.6),
        y: -100 - i * 300,  // staggered above the screen
        z: 0.5 + rng() * 0.4,
        speed: 40 + rng() * 20,
        variant: (i + 2) % 4,
        falling: true,
        fallY: -100 - i * 300,
        fallSpeed: 80 + rng() * 60,
        bobOffset: i * 2,
        opacity: 1,
      })
    }

    return robots
  }, [])

  const initParticles = useCallback((width: number, height: number) => {
    const rng = seededRandom(123)
    const particles: Particle[] = []
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: rng() * width,
        y: rng() * height,
        vx: (rng() - 0.5) * 0.4,
        vy: -0.3 - rng() * 0.6,
        life: rng() * 200,
        maxLife: 200 + rng() * 200,
        size: 1 + rng() * 2.5,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)

      robotsRef.current = initRobots(rect.width, rect.height)
      particlesRef.current = initParticles(rect.width, rect.height)
    }

    resize()
    window.addEventListener("resize", resize)

    // ── Animation loop ────────────────────────────────────────────────────
    let lastTime = performance.now()

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05) // delta in seconds, capped
      lastTime = now
      timeRef.current += dt
      beltOffsetRef.current += dt * 40

      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) {
        animRef.current = requestAnimationFrame(animate)
        return
      }

      const W = rect.width
      const H = rect.height
      const time = timeRef.current

      // Clear
      ctx.clearRect(0, 0, W, H)

      // ── Background ─────────────────────────────────────────
      const bgGrad = ctx.createRadialGradient(W * 0.4, H * 0.3, 0, W * 0.5, H * 0.5, W * 0.8)
      bgGrad.addColorStop(0, "#150a00")
      bgGrad.addColorStop(0.5, "#0a0505")
      bgGrad.addColorStop(1, "#050505")
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      // ── Draw conveyor platform (isometric view) ────────────
      ctx.save()

      // Platform shape - trapezoidal to give perspective
      const pTop = H * 0.08
      const pBot = H * 0.85
      const pLeftTop = W * 0.15
      const pRightTop = W * 0.85
      const pLeftBot = W * -0.1
      const pRightBot = W * 1.1

      // Platform dark surface
      ctx.fillStyle = "#0d0d0d"
      ctx.beginPath()
      ctx.moveTo(pLeftTop, pTop)
      ctx.lineTo(pRightTop, pTop)
      ctx.lineTo(pRightBot, pBot)
      ctx.lineTo(pLeftBot, pBot)
      ctx.closePath()
      ctx.fill()

      // Belt line pattern (scrolling)
      ctx.save()
      ctx.clip() // clip to platform shape

      const lineSpacing = 35
      const offset = beltOffsetRef.current % lineSpacing
      for (let i = -2; i < H / lineSpacing + 3; i++) {
        const yy = pTop + i * lineSpacing + offset
        const progress = (yy - pTop) / (pBot - pTop)
        if (progress < 0 || progress > 1) continue
        const lx = pLeftTop + (pLeftBot - pLeftTop) * progress
        const rx = pRightTop + (pRightBot - pRightTop) * progress

        ctx.strokeStyle = `rgba(255, 77, 0, ${0.04 + progress * 0.06})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(lx, yy)
        ctx.lineTo(rx, yy)
        ctx.stroke()
      }

      // Vertical belt division lines
      for (let j = 0; j < 5; j++) {
        const frac = 0.15 + j * 0.175
        ctx.strokeStyle = "rgba(255, 77, 0, 0.03)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(W * frac, pTop)
        ctx.lineTo(W * (frac - 0.05), pBot)
        ctx.stroke()
      }

      ctx.restore()

      // Glowing side rails
      const railWidth = 4

      // Left rail
      const railGradL = ctx.createLinearGradient(pLeftTop, pTop, pLeftBot, pBot)
      railGradL.addColorStop(0, "rgba(255,77,0,0.1)")
      railGradL.addColorStop(0.3, "rgba(255,77,0,0.9)")
      railGradL.addColorStop(0.7, "rgba(255,77,0,0.9)")
      railGradL.addColorStop(1, "rgba(255,77,0,0.2)")
      ctx.strokeStyle = railGradL
      ctx.lineWidth = railWidth
      ctx.beginPath()
      ctx.moveTo(pLeftTop, pTop)
      ctx.lineTo(pLeftBot, pBot)
      ctx.stroke()

      // Left rail glow
      ctx.strokeStyle = `rgba(255,77,0,${0.15 + Math.sin(time * 2) * 0.1})`
      ctx.lineWidth = 15
      ctx.beginPath()
      ctx.moveTo(pLeftTop, pTop)
      ctx.lineTo(pLeftBot, pBot)
      ctx.stroke()

      // Right rail
      const railGradR = ctx.createLinearGradient(pRightTop, pTop, pRightBot, pBot)
      railGradR.addColorStop(0, "rgba(255,77,0,0.1)")
      railGradR.addColorStop(0.3, "rgba(255,77,0,0.9)")
      railGradR.addColorStop(0.7, "rgba(255,77,0,0.9)")
      railGradR.addColorStop(1, "rgba(255,77,0,0.2)")
      ctx.strokeStyle = railGradR
      ctx.lineWidth = railWidth
      ctx.beginPath()
      ctx.moveTo(pRightTop, pTop)
      ctx.lineTo(pRightBot, pBot)
      ctx.stroke()

      // Right rail glow
      ctx.strokeStyle = `rgba(255,77,0,${0.15 + Math.sin(time * 2 + 1) * 0.1})`
      ctx.lineWidth = 15
      ctx.beginPath()
      ctx.moveTo(pRightTop, pTop)
      ctx.lineTo(pRightBot, pBot)
      ctx.stroke()

      ctx.restore()

      // ── Sort robots by depth (far first) ───────────────────
      const robots = robotsRef.current
      robots.sort((a, b) => a.z - b.z)

      // ── Update and draw robots ─────────────────────────────
      for (const robot of robots) {
        if (robot.falling) {
          // Falling from above
          robot.fallSpeed += 350 * dt
          robot.y += robot.fallSpeed * dt

          // Landing target: a y position on the belt based on z
          const landingY = H * (0.15 + robot.z * 0.55)
          if (robot.y >= landingY) {
            robot.y = landingY
            robot.falling = false
            robot.fallSpeed = 0
          }
        } else {
          // Moving along belt (downward = toward viewer)
          robot.y += robot.speed * dt

          // Bob effect
          robot.y += Math.sin(time * 2 + robot.bobOffset) * 0.3

          // If gone past bottom, respawn from top
          if (robot.y > H * 0.9) {
            robot.y = -80
            robot.falling = true
            robot.fallSpeed = 80 + (robot.variant * 20)
            robot.x = W * (0.2 + (robot.variant * 0.15 + robot.bobOffset * 0.05) % 0.6)
          }
        }

        // Scale based on position (perspective effect)
        const progress = Math.max(0, Math.min(1, (robot.y - pTop) / (pBot - pTop)))
        const scale = 0.45 + progress * 0.7
        const robotAlpha = progress < 0.05 ? progress / 0.05 : progress > 0.85 ? (1 - progress) / 0.15 : 1

        // X drift toward edges as they move down (perspective)
        const centerX = W * 0.5
        const driftFactor = 0.15 * progress
        const driftedX = robot.x + (robot.x - centerX) * driftFactor

        drawRobot(ctx, driftedX, robot.y, scale * robot.z, robot.variant, time, robotAlpha * robot.opacity)
      }

      // ── Particles ──────────────────────────────────────────
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.life += dt * 60

        if (p.life > p.maxLife) {
          p.life = 0
          p.x = Math.random() * W
          p.y = H * 0.3 + Math.random() * H * 0.6
        }

        const lifeProgress = p.life / p.maxLife
        const pAlpha = lifeProgress < 0.1
          ? lifeProgress / 0.1
          : lifeProgress > 0.8
          ? (1 - lifeProgress) / 0.2
          : 1

        ctx.fillStyle = `rgba(255, 77, 0, ${pAlpha * 0.35})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Vignette overlay ───────────────────────────────────
      const vignette = ctx.createRadialGradient(W * 0.5, H * 0.4, W * 0.2, W * 0.5, H * 0.5, W * 0.9)
      vignette.addColorStop(0, "rgba(5,5,5,0)")
      vignette.addColorStop(1, "rgba(5,5,5,0.6)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [initRobots, initParticles])

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#050505",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}