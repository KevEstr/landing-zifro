"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

/*
  Robot Assembly Line – Pure Three.js
  ───────────────────────────────────
  v3 changes:
  • All green (#00ff66) replaced with Zifro orange (#FF4D00)
  • Station arms never descend below the robot top → no clipping
  • Assembly is organic: parts scale-in from 0 at their final position
    instead of flying in from far away
  • Sparks are warm orange
*/

// ── Constants ───────────────────────────────────────────────────────────
const BELT_START = -15
const BELT_END   = 15
const FADE_IN_Z  = -13
const FADE_OUT_Z = 12
const ZONE_DROP  = -13
const ZONE_TOP   = -8
const ZONE_FACE  = -3
const ZONE_EYES  = 1
const ACCENT     = "#FF4D00"
const ACCENT_HEX = 0xFF4D00

// ── Helpers ─────────────────────────────────────────────────────────────
function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }
function easeOutBack(t: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
function easeOutElastic(t: number) {
  if (t === 0 || t === 1) return t
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
}
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

// ── IA Badge Texture (Canvas2D → Three.js texture) ──────────────────────
function createIABadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, 256, 128)

  // Rounded badge background
  const bx = 12, by = 8, bw = 232, bh = 112, br = 14
  ctx.beginPath()
  ctx.moveTo(bx + br, by)
  ctx.lineTo(bx + bw - br, by)
  ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + br)
  ctx.lineTo(bx + bw, by + bh - br)
  ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - br, by + bh)
  ctx.lineTo(bx + br, by + bh)
  ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - br)
  ctx.lineTo(bx, by + br)
  ctx.quadraticCurveTo(bx, by, bx + br, by)
  ctx.closePath()
  ctx.fillStyle = 'rgba(10, 10, 10, 0.95)'
  ctx.fill()
  ctx.strokeStyle = '#FF4D00'
  ctx.lineWidth = 3
  ctx.stroke()

  // Glow pass
  ctx.save()
  ctx.shadowColor = '#FF4D00'
  ctx.shadowBlur = 25
  ctx.fillStyle = '#FF4D00'
  ctx.font = 'bold 72px "Segoe UI", "Arial Black", Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('IA', 128, 68)
  ctx.restore()

  // Crisp text on top
  ctx.fillStyle = '#FF4D00'
  ctx.font = 'bold 72px "Segoe UI", "Arial Black", Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('IA', 128, 68)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function createIAFaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 48
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, 128, 48)

  // Glow pass
  ctx.save()
  ctx.shadowColor = '#FF4D00'
  ctx.shadowBlur = 10
  ctx.fillStyle = '#FF4D00'
  ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('IA', 64, 25)
  ctx.restore()

  // Crisp text
  ctx.fillStyle = '#FF4D00'
  ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('IA', 64, 25)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// ── Robot Head Builder (using sprite image with depth layers) ────────────────────────
function createAssemblyRobot(scene: THREE.Scene) {
  const root = new THREE.Group()

  // ═══════ BODY GROUP (using the pre-rendered 3D image) ═══════
  const bodyGroup = new THREE.Group()

  // Load robot head texture (already has 3D depth baked in)
  const textureLoader = new THREE.TextureLoader()
  const robotTexture = textureLoader.load('/cabeza.png')
  robotTexture.colorSpace = THREE.SRGBColorSpace
  
  // Single plane with the full 3D image
  const planeGeo = new THREE.PlaneGeometry(2.2, 2.2)
  const planeMat = new THREE.MeshBasicMaterial({
    map: robotTexture,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  })
  
  const body = new THREE.Mesh(planeGeo, planeMat)
  body.castShadow = true
  body.receiveShadow = true
  bodyGroup.add(body)
  
  // Slight rotation for dynamic look
  bodyGroup.rotation.y = Math.PI * 0.08

  root.add(bodyGroup)

  // ═══════ DUMMY ELEMENTS (for compatibility with animation system) ═══════
  const topGroup = new THREE.Group()
  const topPanel = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.01), new THREE.MeshBasicMaterial({transparent: true, opacity: 0}))
  topGroup.add(topPanel)
  topGroup.position.set(0, 0.51, 0)
  root.add(topGroup)

  const faceGroup = new THREE.Group()
  const facePlate = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.01), new THREE.MeshBasicMaterial({transparent: true, opacity: 0}))
  faceGroup.add(facePlate)
  faceGroup.position.set(0, -0.02, 0.47)
  root.add(faceGroup)

  // Dummy meshes for animation compatibility
  const dummyMat = new THREE.MeshBasicMaterial({transparent: true, opacity: 0})
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const ringL = new THREE.Mesh(new THREE.RingGeometry(0.01, 0.02), dummyMat.clone())
  const ringR = new THREE.Mesh(new THREE.RingGeometry(0.01, 0.02), dummyMat.clone())
  const outerRingL = new THREE.Mesh(new THREE.RingGeometry(0.01, 0.02), dummyMat.clone())
  const outerRingR = new THREE.Mesh(new THREE.RingGeometry(0.01, 0.02), dummyMat.clone())
  
  root.add(eyeL, eyeR, pupilL, pupilR, ringL, ringR, outerRingL, outerRingR)

  // Eye light (subtle glow)
  const eyeLight = new THREE.PointLight(ACCENT_HEX, 0, 3, 2)
  eyeLight.position.set(0, 0.15, 0.8)
  root.add(eyeLight)

  // More dummy elements for animation compatibility
  const stripL = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const stripR = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const circL = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const circR = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const btmLine = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.01), dummyMat.clone())
  const topAccent = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.01), dummyMat.clone())
  const bottomRail = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.01), dummyMat.clone())
  const iaBadge = new THREE.Mesh(new THREE.PlaneGeometry(0.01, 0.01), dummyMat.clone())
  
  root.add(stripL, stripR, circL, circR, btmLine, antennaTip, topAccent, bottomRail, iaBadge)

  scene.add(root)
  return {
    root, body, bodyGroup, topPanel, topGroup, faceGroup,
    eyeL, eyeR, pupilL, pupilR,
    ringL, ringR, outerRingL, outerRingR,
    eyeLight, stripL, stripR, circL, circR, btmLine,
    antennaTip, topAccent, bottomRail, iaBadge,
  }
}

// ── Assembly Station (arch over belt) ───────────────────────────────────
function createStation(scene: THREE.Scene, z: number) {
  const g = new THREE.Group()
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.92, roughness: 0.08 })

  // pillars – placed OUTSIDE the belt width so they never overlap robots
  const pGeo = new THREE.CylinderGeometry(0.08, 0.11, 3, 8)
  const pL = new THREE.Mesh(pGeo, darkMetal)
  pL.position.set(-2.6, 1.0, 0)
  g.add(pL)
  const pR = new THREE.Mesh(pGeo, darkMetal)
  pR.position.set(2.6, 1.0, 0)
  g.add(pR)

  // pillar bases
  const baseGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 12)
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.1 })
  const bL = new THREE.Mesh(baseGeo, baseMat)
  bL.position.set(-2.6, -0.47, 0)
  g.add(bL)
  const bR = new THREE.Mesh(baseGeo, baseMat)
  bR.position.set(2.6, -0.47, 0)
  g.add(bR)

  // crossbeam
  const beamGeo = new THREE.BoxGeometry(5.4, 0.10, 0.10)
  const beam = new THREE.Mesh(beamGeo, darkMetal)
  beam.position.set(0, 2.55, 0)
  g.add(beam)

  // neon strip on crossbeam
  const nsGeo = new THREE.BoxGeometry(5.2, 0.035, 0.035)
  const nsMat = new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 1.2, toneMapped: false })
  const neon = new THREE.Mesh(nsGeo, nsMat)
  neon.position.set(0, 2.62, 0)
  g.add(neon)

  // Dummy elements for compatibility (no visible arms)
  const armGroup = new THREE.Group()
  armGroup.position.set(0, 2.3, 0)
  armGroup.visible = false
  g.add(armGroup)
  
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.01), new THREE.MeshBasicMaterial({transparent: true, opacity: 0}))
  const tLight = new THREE.PointLight(ACCENT_HEX, 0, 0)
  armGroup.add(tip)
  armGroup.add(tLight)

  // subtle ground ring glow
  const grGeo = new THREE.RingGeometry(0.5, 0.8, 32)
  const grMat = new THREE.MeshBasicMaterial({ color: ACCENT_HEX, transparent: true, opacity: 0.03, side: THREE.DoubleSide })
  const groundRing = new THREE.Mesh(grGeo, grMat)
  groundRing.rotation.x = -Math.PI / 2
  groundRing.position.y = -0.41
  g.add(groundRing)

  g.position.set(0, -0.5, z)
  scene.add(g)
  return { group: g, armGroup, tip, tLight, ring: groundRing }
}

// ── Spark Particles (warm orange) ───────────────────────────────────────
class SparkSystem {
  pts: THREE.Points
  pos: Float32Array
  vel: Float32Array
  life: Float32Array
  max: number

  constructor(scene: THREE.Scene, max = 350) {
    this.max = max
    this.pos = new Float32Array(max * 3)
    this.vel = new Float32Array(max * 3)
    this.life = new Float32Array(max * 2)
    for (let i = 0; i < max; i++) {
      this.pos[i * 3 + 1] = -100
      this.life[i * 2] = 1
      this.life[i * 2 + 1] = 1
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3))
    const mat = new THREE.PointsMaterial({
      color: 0xffaa66,  // warm orange sparks
      size: 0.05,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    this.pts = new THREE.Points(geo, mat)
    scene.add(this.pts)
  }

  emit(x: number, y: number, z: number, count: number) {
    for (let n = 0; n < count; n++) {
      let best = -1, bestAge = -1
      for (let i = 0; i < this.max; i++) {
        const ratio = this.life[i * 2] / Math.max(this.life[i * 2 + 1], 0.01)
        if (ratio >= 1 && ratio > bestAge) { bestAge = ratio; best = i }
      }
      if (best === -1) best = Math.floor(Math.random() * this.max)
      const i3 = best * 3, i2 = best * 2
      this.pos[i3]     = x + (Math.random() - 0.5) * 0.25
      this.pos[i3 + 1] = y + (Math.random() - 0.5) * 0.15
      this.pos[i3 + 2] = z + (Math.random() - 0.5) * 0.25
      this.vel[i3]     = (Math.random() - 0.5) * 2.5
      this.vel[i3 + 1] = 1.0 + Math.random() * 2.0
      this.vel[i3 + 2] = (Math.random() - 0.5) * 2.5
      this.life[i2]     = 0
      this.life[i2 + 1] = 0.15 + Math.random() * 0.35
    }
  }

  update(dt: number) {
    for (let i = 0; i < this.max; i++) {
      const i3 = i * 3, i2 = i * 2
      if (this.life[i2] < this.life[i2 + 1]) {
        this.life[i2] += dt
        this.pos[i3]     += this.vel[i3] * dt
        this.pos[i3 + 1] += this.vel[i3 + 1] * dt
        this.pos[i3 + 2] += this.vel[i3 + 2] * dt
        this.vel[i3 + 1] -= 6 * dt
      } else {
        this.pos[i3 + 1] = -100
      }
    }
    this.pts.geometry.attributes.position.needsUpdate = true
  }
}

// ── Material helpers ────────────────────────────────────────────────────
function setEI(m: THREE.Mesh, v: number) {
  (m.material as THREE.MeshStandardMaterial).emissiveIntensity = v
}
function setOp(m: THREE.Mesh, v: number) {
  (m.material as THREE.MeshStandardMaterial).opacity = v
}

// ── Reset robot to hidden ───────────────────────────────────────────────
// ── Reset robot to hidden ───────────────────────────────────────────────
function resetRobot(obj: ReturnType<typeof createAssemblyRobot>) {
  obj.bodyGroup.position.set(0, 0, 0)
  obj.bodyGroup.scale.setScalar(1)
  ;(obj.body.material as THREE.MeshBasicMaterial).opacity = 0
  obj.topGroup.position.set(0, 0.51, 0)
  obj.topGroup.scale.setScalar(1)
  ;(obj.topPanel.material as THREE.MeshBasicMaterial).opacity = 0
  obj.topGroup.rotation.z = 0
  obj.faceGroup.position.set(0, -0.02, 0.47)
  obj.faceGroup.scale.setScalar(1)
  obj.faceGroup.children.forEach(child => {
    if ((child as THREE.Mesh).material && 'opacity' in ((child as THREE.Mesh).material as any)) {
      ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0
    }
  })
  obj.faceGroup.rotation.y = 0
  obj.bodyGroup.visible = false
  obj.topGroup.visible = false
  obj.faceGroup.visible = false
  obj.eyeL.visible = false
  obj.eyeR.visible = false
  obj.pupilL.visible = false
  obj.pupilR.visible = false
  obj.ringL.visible = false
  obj.ringR.visible = false
  obj.outerRingL.visible = false
  obj.outerRingR.visible = false
  obj.eyeLight.intensity = 0
  setEI(obj.stripL, 0); setEI(obj.stripR, 0)
  setEI(obj.circL, 0); setEI(obj.circR, 0)
  setEI(obj.btmLine, 0)
  setEI(obj.antennaTip, 0)
  setEI(obj.topAccent, 0)
  setEI(obj.bottomRail, 0)
  setOp(obj.iaBadge, 0)
}

// =====================================================================
// MAIN COMPONENT
// =====================================================================
export function RobotConveyor3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true
    const container = containerRef.current
    if (!container) return

    // ── Responsive helpers ─────────────────────────────────
    const isMobile = () => container!.clientWidth < 768
    const getAspect = () => container!.clientWidth / container!.clientHeight

    // Camera params that change with viewport
    const getCameraParams = () => {
      const mobile = isMobile()
      if (mobile) {
        // Portrait: wider FOV, pull camera back further & aim higher so robots
        // visually sit in the upper half of the viewport, leaving the
        // bottom half clear for the text overlay without heavy gradients.
        return { fov: 42, pos: [4.5, 6.5, 9.0] as const, lookAt: [0, 0.3, 0] as const }
      }
      // Desktop
      return { fov: 32, pos: [8, 6.0, 10] as const, lookAt: [-3, 0.0, 0] as const }
    }

    // ── Renderer ──────────────────────────────────────────
    const mobile = isMobile()
    const renderer = new THREE.WebGLRenderer({
      antialias: !mobile,            // skip AA on mobile for perf
      alpha: false,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = mobile ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    renderer.setClearColor(0x030303, 1)
    container.appendChild(renderer.domElement)

    // ── Scene ─────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020202, 0.04)

    // ── Camera ────────────────────────────────────────────
    const initCam = getCameraParams()
    const camera = new THREE.PerspectiveCamera(
      initCam.fov,
      getAspect(),
      0.1,
      80
    )
    camera.position.set(initCam.pos[0], initCam.pos[1], initCam.pos[2])
    camera.lookAt(initCam.lookAt[0], initCam.lookAt[1], initCam.lookAt[2])

    // ── Lighting ──────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.28))

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.4)
    keyLight.position.set(6, 12, 6)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048)
    keyLight.shadow.camera.near = 0.5
    keyLight.shadow.camera.far = 35
    keyLight.shadow.camera.left = -12
    keyLight.shadow.camera.right = 12
    keyLight.shadow.camera.top = 12
    keyLight.shadow.camera.bottom = -12
    scene.add(keyLight)

    const fill = new THREE.DirectionalLight(0xaaccff, 0.2)
    fill.position.set(-5, 5, 3)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xffffff, 0.3)
    rim.position.set(-3, 4, -5)
    scene.add(rim)

    // Orange accent lights (low intensity, contained range)
    const al1 = new THREE.PointLight(ACCENT_HEX, 1.2, 10)
    al1.position.set(2, 3, 2)
    scene.add(al1)
    const al2 = new THREE.PointLight(ACCENT_HEX, 0.8, 8)
    al2.position.set(-2, 3, -3)
    scene.add(al2)

    // ── Environment map for polished reflections ──────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const envScene = new THREE.Scene()
    envScene.background = new THREE.Color(0x080808)
    const envFill = new THREE.AmbientLight(0x222222, 1)
    envScene.add(envFill)
    const envAccent = new THREE.PointLight(ACCENT_HEX, 0.6, 40)
    envAccent.position.set(5, 5, 5)
    envScene.add(envAccent)
    const envCool = new THREE.PointLight(0x334466, 0.3, 40)
    envCool.position.set(-5, 3, -5)
    envScene.add(envCool)
    const envWarm = new THREE.PointLight(0xfff0e0, 0.4, 40)
    envWarm.position.set(0, 10, 0)
    envScene.add(envWarm)
    scene.environment = pmremGenerator.fromScene(envScene, 0.04).texture
    pmremGenerator.dispose()

    // ── Conveyor Belt ─────────────────────────────────────
    const beltLen = 34
    const beltW = 3.8

    const platGeo = new THREE.BoxGeometry(beltW, 0.18, beltLen)
    const platMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.85, roughness: 0.15 })
    const plat = new THREE.Mesh(platGeo, platMat)
    plat.position.set(0, -0.5, 0)
    plat.receiveShadow = true
    scene.add(plat)

    const bsGeo = new THREE.BoxGeometry(beltW - 0.35, 0.025, beltLen)
    const bsMat = new THREE.MeshStandardMaterial({ color: 0x080808, metalness: 0.5, roughness: 0.6 })
    const beltSurf = new THREE.Mesh(bsGeo, bsMat)
    beltSurf.position.set(0, -0.41, 0)
    beltSurf.receiveShadow = true
    scene.add(beltSurf)

    // Side lips
    const lipGeo = new THREE.BoxGeometry(0.12, 0.22, beltLen)
    const lipMat = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.85, roughness: 0.15 })
    const lipL = new THREE.Mesh(lipGeo, lipMat)
    lipL.position.set(-beltW / 2 + 0.06, -0.41, 0)
    scene.add(lipL)
    const lipR = new THREE.Mesh(lipGeo, lipMat)
    lipR.position.set(beltW / 2 - 0.06, -0.41, 0)
    scene.add(lipR)

    // Orange neon rails
    const railGeo = new THREE.BoxGeometry(0.06, 0.1, beltLen)
    const railMatT = new THREE.MeshStandardMaterial({
      color: ACCENT_HEX, emissive: ACCENT_HEX, emissiveIntensity: 1.5, toneMapped: false,
    })
    const railL = new THREE.Mesh(railGeo, railMatT.clone())
    railL.position.set(-beltW / 2 + 0.06, -0.37, 0)
    scene.add(railL)
    const railR = new THREE.Mesh(railGeo, railMatT.clone())
    railR.position.set(beltW / 2 - 0.06, -0.37, 0)
    scene.add(railR)

    // Soft glow along rails
    const glowGeo = new THREE.PlaneGeometry(0.4, beltLen)
    const glowMatT = new THREE.MeshBasicMaterial({
      color: ACCENT_HEX, transparent: true, opacity: 0.04, side: THREE.DoubleSide,
    })
    const glowL = new THREE.Mesh(glowGeo, glowMatT.clone())
    glowL.rotation.x = -Math.PI / 2
    glowL.position.set(-beltW / 2 + 0.1, -0.39, 0)
    scene.add(glowL)
    const glowR = new THREE.Mesh(glowGeo, glowMatT.clone())
    glowR.rotation.x = -Math.PI / 2
    glowR.position.set(beltW / 2 - 0.1, -0.39, 0)
    scene.add(glowR)

    // Belt cross-lines
    const CROSS_SPACING = 1.6
    const CROSS_COUNT = 22
    const crossLines: THREE.Mesh[] = []
    for (let i = 0; i < CROSS_COUNT; i++) {
      const clGeo = new THREE.BoxGeometry(beltW - 0.5, 0.012, 0.025)
      const clMat = new THREE.MeshStandardMaterial({
        color: ACCENT_HEX, emissive: ACCENT_HEX, emissiveIntensity: 0.12,
        transparent: true, opacity: 0.08, toneMapped: false,
      })
      const cl = new THREE.Mesh(clGeo, clMat)
      cl.position.set(0, -0.395, -beltLen / 2 + i * CROSS_SPACING)
      scene.add(cl)
      crossLines.push(cl)
    }

    // ── Floor ─────────────────────────────────────────────
    const floorGeo = new THREE.PlaneGeometry(60, 60)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x030303, metalness: 0.95, roughness: 0.18,
      envMapIntensity: 0.5,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.59
    floor.receiveShadow = true
    scene.add(floor)

    // ── Assembly Stations ─────────────────────────────────
    const stations = [
      createStation(scene, ZONE_TOP),
      createStation(scene, ZONE_FACE),
      createStation(scene, ZONE_EYES),
    ]

    // ── Sparks ────────────────────────────────────────────
    const sparks = new SparkSystem(scene, 350)

    // ── Robots ────────────────────────────────────────────
    interface RCfg {
      z: number; speed: number; lane: number; scale: number; phase: number
      sparkCD: number[]; wasInZone: boolean[]
    }

    // 5 robots, evenly spaced 6 units apart, ALL same speed → never bunch up
    const ROBOT_SPEED = 1.6
    const ROBOT_SPACING = 6.0
    const cfgs: RCfg[] = [
      { z: -12,                    speed: ROBOT_SPEED, lane:  0.0,  scale: 1.10, phase: 0,   sparkCD: [0,0,0], wasInZone: [false,false,false] },
      { z: -12 + ROBOT_SPACING,    speed: ROBOT_SPEED, lane:  0.0,  scale: 1.08, phase: 2.0, sparkCD: [0,0,0], wasInZone: [false,false,false] },
      { z: -12 + ROBOT_SPACING * 2, speed: ROBOT_SPEED, lane:  0.0,  scale: 1.12, phase: 4.0, sparkCD: [0,0,0], wasInZone: [false,false,false] },
      { z: -12 + ROBOT_SPACING * 3, speed: ROBOT_SPEED, lane:  0.0,  scale: 1.06, phase: 6.0, sparkCD: [0,0,0], wasInZone: [false,false,false] },
      { z: -12 + ROBOT_SPACING * 4, speed: ROBOT_SPEED, lane:  0.0,  scale: 1.10, phase: 8.0, sparkCD: [0,0,0], wasInZone: [false,false,false] },
    ]

    const robots = cfgs.map((c) => {
      const obj = createAssemblyRobot(scene)
      obj.root.position.set(c.lane, 0.5, c.z)
      // Scale down on mobile (45% of original size)
      const mobileScale = isMobile() ? c.scale * 0.45 : c.scale
      obj.root.scale.setScalar(mobileScale)
      obj.root.rotation.y = Math.PI * 0.05
      return { obj, c }
    })

    // ── Resize ────────────────────────────────────────────
    let prevMobile = isMobile()
    const camParams = getCameraParams()        // store base for sway
    let baseCamPos = [...camParams.pos] as [number, number, number]
    let baseLookAt = [...camParams.lookAt] as [number, number, number]

    const handleResize = () => {
      if (!container) return
      const nowMobile = isMobile()
      camera.aspect = getAspect()

      // Recalculate camera when crossing breakpoint
      if (nowMobile !== prevMobile) {
        const p = getCameraParams()
        camera.fov = p.fov
        baseCamPos = [...p.pos]
        baseLookAt = [...p.lookAt]
        prevMobile = nowMobile
        
        // Update robot scale based on viewport
        robots.forEach(({ obj, c }) => {
          const mobileScale = nowMobile ? c.scale * 0.45 : c.scale
          obj.root.scale.setScalar(mobileScale)
        })
      }
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // ── Animation Loop ────────────────────────────────────
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.04)
      const t = clock.elapsedTime

      // Camera micro-sway (uses responsive base values)
      camera.position.x = baseCamPos[0] + Math.sin(t * 0.08) * 0.12
      camera.position.y = baseCamPos[1] + Math.sin(t * 0.06) * 0.06
      camera.position.z = baseCamPos[2]
      camera.lookAt(baseLookAt[0], baseLookAt[1], baseLookAt[2])

      // Cross-lines scroll
      const totalSpan = CROSS_COUNT * CROSS_SPACING
      for (const cl of crossLines) {
        cl.position.z += dt * 2.5
        if (cl.position.z > beltLen / 2) cl.position.z -= totalSpan
      }

      // Rail glow pulse
      const rp = 0.035 + Math.sin(t * 2) * 0.015
      ;(glowL.material as THREE.MeshBasicMaterial).opacity = rp
      ;(glowR.material as THREE.MeshBasicMaterial).opacity = rp

      // Accent light micro-drift
      al1.position.x = 2 + Math.sin(t * 0.15) * 0.3
      al2.position.z = -3 + Math.cos(t * 0.12) * 0.3

      // ── Update each robot ──────────────────────────────
      for (const { obj, c } of robots) {
        c.z += c.speed * dt

        if (c.z > BELT_END) {
          c.z = BELT_START
          c.sparkCD = [0, 0, 0]
          c.wasInZone = [false, false, false]
          resetRobot(obj)
        }

        const z = c.z

        // Fade at belt edges
        let fadeAlpha = 1
        if (z < FADE_IN_Z) {
          fadeAlpha = clamp((z - BELT_START) / (FADE_IN_Z - BELT_START), 0, 1)
        } else if (z > FADE_OUT_Z) {
          fadeAlpha = clamp(1 - (z - FADE_OUT_Z) / (BELT_END - FADE_OUT_Z), 0, 1)
        }
        // Apply mobile scale multiplier
        const baseScale = isMobile() ? c.scale * 0.45 : c.scale
        const fadeScale = baseScale * (0.3 + 0.7 * fadeAlpha)
        obj.root.scale.setScalar(fadeScale)

        // Position
        const isFullyBuilt = z >= ZONE_EYES
        const bob = isFullyBuilt ? Math.sin(t * 1.0 + c.phase) * 0.01 : 0
        obj.root.position.set(c.lane, 0.5 + bob, z)
        obj.root.rotation.y = Math.PI * 0.05 + (isFullyBuilt ? Math.sin(t * 0.4 + c.phase) * 0.01 : 0)

        // ─────────────────────────────────────────────────
        // STAGE 1: BODY FADES IN (rises gently from below belt)
        // Smooth opacity fade + tiny rise from -0.3 → 0
        // ─────────────────────────────────────────────────
        if (z < ZONE_DROP) {
          const p = smoothstep(BELT_START, ZONE_DROP, z)
          const ep = easeOutCubic(clamp(p, 0, 1))

          obj.bodyGroup.visible = true
          obj.bodyGroup.position.y = (1 - ep) * -0.3 // rises gently from just below
          obj.bodyGroup.scale.setScalar(0.85 + ep * 0.15) // subtle 85%→100%, not 0→100%
          ;(obj.body.material as THREE.MeshBasicMaterial).opacity = ep
          setOp(obj.iaBadge, ep)

          obj.topGroup.visible = false
          obj.faceGroup.visible = false
          obj.eyeL.visible = false
          obj.eyeR.visible = false
          obj.pupilL.visible = false
          obj.pupilR.visible = false
          obj.ringL.visible = false
          obj.ringR.visible = false
          obj.outerRingL.visible = false
          obj.outerRingR.visible = false
          obj.eyeLight.intensity = 0
          setEI(obj.stripL, 0); setEI(obj.stripR, 0)
          setEI(obj.circL, 0); setEI(obj.circR, 0)
          setEI(obj.btmLine, 0)
          setEI(obj.bottomRail, ep * 0.2)

          if (p > 0.85 && !c.wasInZone[0]) {
            sparks.emit(obj.root.position.x, 0, z, 12)
            c.wasInZone[0] = true
          }

        // ─────────────────────────────────────────────────
        // STAGE 2: TOP PANEL MATERIALIZES (scales in at its position)
        // ─────────────────────────────────────────────────
        } else if (z < ZONE_TOP) {
          // Body done – ensure fully solid
          obj.bodyGroup.position.y = 0
          obj.bodyGroup.scale.setScalar(1)
          ;(obj.body.material as THREE.MeshBasicMaterial).opacity = 1
          obj.bodyGroup.visible = true
          obj.topGroup.visible = true
          obj.faceGroup.visible = false
          obj.eyeL.visible = false
          obj.eyeR.visible = false
          obj.pupilL.visible = false
          obj.pupilR.visible = false
          obj.ringL.visible = false
          obj.ringR.visible = false
          obj.outerRingL.visible = false
          obj.outerRingR.visible = false
          obj.eyeLight.intensity = 0

          const p = smoothstep(ZONE_DROP, ZONE_TOP, z)
          const ep = easeOutCubic(clamp(p, 0, 1))

          // Top panel descends gently from 0.5 above its seat
          obj.topGroup.position.set(0, 0.51 + (1 - ep) * 0.5, 0)
          obj.topGroup.scale.setScalar(1)
          ;(obj.topPanel.material as THREE.MeshBasicMaterial).opacity = ep
          obj.topGroup.rotation.z = 0

          const glow = p * 0.4
          setEI(obj.stripL, glow); setEI(obj.stripR, glow)
          setEI(obj.bottomRail, glow * 0.5)
          setEI(obj.antennaTip, ep * 0.3)
          setEI(obj.topAccent, ep * 0.3)

          if (p > 0.8 && c.sparkCD[0] < t) {
            sparks.emit(obj.root.position.x, 0.51, z, 8)
            c.sparkCD[0] = t + 0.18
          }

        // ─────────────────────────────────────────────────
        // STAGE 3: FACE PLATE MATERIALIZES (scales in)
        // ─────────────────────────────────────────────────
        } else if (z < ZONE_FACE) {
          obj.bodyGroup.position.y = 0
          obj.bodyGroup.scale.setScalar(1)
          ;(obj.body.material as THREE.MeshBasicMaterial).opacity = 1
          obj.topGroup.position.set(0, 0.51, 0)
          obj.topGroup.scale.setScalar(1)
          ;(obj.topPanel.material as THREE.MeshBasicMaterial).opacity = 1
          obj.topGroup.rotation.z = 0
          obj.bodyGroup.visible = true
          obj.topGroup.visible = true
          obj.faceGroup.visible = true
          obj.eyeL.visible = false
          obj.eyeR.visible = false
          obj.pupilL.visible = false
          obj.pupilR.visible = false
          obj.ringL.visible = false
          obj.ringR.visible = false
          obj.outerRingL.visible = false
          obj.outerRingR.visible = false
          obj.eyeLight.intensity = 0

          const p = smoothstep(ZONE_TOP, ZONE_FACE, z)
          const ep = easeOutCubic(clamp(p, 0, 1))

          // Face slides in gently from slightly in front, with opacity fade
          obj.faceGroup.position.set(0, -0.02, 0.47 + (1 - ep) * 0.25)
          obj.faceGroup.scale.setScalar(1)
          obj.faceGroup.children.forEach(child => {
            if ((child as THREE.Mesh).material && 'opacity' in ((child as THREE.Mesh).material as any)) {
              ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = ep
            }
          })
          obj.faceGroup.rotation.y = 0

          const glow = 0.4 + p * 0.4
          setEI(obj.stripL, glow); setEI(obj.stripR, glow)
          setEI(obj.circL, p * 0.6); setEI(obj.circR, p * 0.6)
          setEI(obj.btmLine, p * 0.5)
          setEI(obj.bottomRail, glow * 0.6)
          setEI(obj.antennaTip, 0.5 + p * 0.3)
          setEI(obj.topAccent, 0.5 + p * 0.3)

          if (p > 0.8 && c.sparkCD[1] < t) {
            sparks.emit(obj.root.position.x, 0, z + 0.5, 10)
            c.sparkCD[1] = t + 0.15
          }

        // ─────────────────────────────────────────────────
        // STAGE 4: EYES ACTIVATE (glow ramp, no geometry movement)
        // ─────────────────────────────────────────────────
        } else if (z < ZONE_EYES) {
          obj.bodyGroup.position.y = 0
          obj.bodyGroup.scale.setScalar(1)
          ;(obj.body.material as THREE.MeshBasicMaterial).opacity = 1
          obj.topGroup.position.set(0, 0.51, 0)
          obj.topGroup.scale.setScalar(1)
          ;(obj.topPanel.material as THREE.MeshBasicMaterial).opacity = 1
          obj.topGroup.rotation.z = 0
          obj.faceGroup.position.set(0, -0.02, 0.47)
          obj.faceGroup.scale.setScalar(1)
          obj.faceGroup.children.forEach(child => {
            if ((child as THREE.Mesh).material && 'opacity' in ((child as THREE.Mesh).material as any)) {
              ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 1
            }
          })
          obj.faceGroup.rotation.y = 0
          obj.bodyGroup.visible = true
          obj.topGroup.visible = true
          obj.faceGroup.visible = true
          obj.eyeL.visible = true
          obj.eyeR.visible = true
          obj.pupilL.visible = true
          obj.pupilR.visible = true
          obj.ringL.visible = true
          obj.ringR.visible = true
          obj.outerRingL.visible = true
          obj.outerRingR.visible = true

          const p = smoothstep(ZONE_FACE, ZONE_EYES, z)
          const ep = easeOutCubic(clamp(p, 0, 1))

          const intensity = ep * 3
          const flash = p > 0.85 ? (1 + Math.sin(t * 12) * 0.25) : 1.0
          setEI(obj.eyeL, intensity * flash)
          setEI(obj.eyeR, intensity * flash)
          setEI(obj.pupilL, intensity * 0.5 * flash)
          setEI(obj.pupilR, intensity * 0.5 * flash)
          setEI(obj.ringL, intensity * 0.3 * flash)
          setOp(obj.ringL, ep * 0.6)
          setEI(obj.ringR, intensity * 0.3 * flash)
          setOp(obj.ringR, ep * 0.6)
          setEI(obj.outerRingL, intensity * 0.15 * flash)
          setOp(obj.outerRingL, ep * 0.35)
          setEI(obj.outerRingR, intensity * 0.15 * flash)
          setOp(obj.outerRingR, ep * 0.35)
          obj.eyeLight.intensity = intensity * 0.25 * flash

          const sg = 0.8 + ep * 0.8
          setEI(obj.stripL, sg); setEI(obj.stripR, sg)
          setEI(obj.circL, sg); setEI(obj.circR, sg)
          setEI(obj.btmLine, sg)
          setEI(obj.bottomRail, sg * 0.8)
          setEI(obj.antennaTip, sg)
          setEI(obj.topAccent, sg * 0.9)

          if (p > 0.65 && c.sparkCD[2] < t) {
            sparks.emit(obj.root.position.x, 0, z + 0.5, 14)
            c.sparkCD[2] = t + 0.12
          }

        // ─────────────────────────────────────────────────
        // FULLY ASSEMBLED – idle pulse
        // ─────────────────────────────────────────────────
        } else {
          obj.bodyGroup.position.y = 0
          obj.bodyGroup.scale.setScalar(1)
          ;(obj.body.material as THREE.MeshBasicMaterial).opacity = 1
          obj.topGroup.position.set(0, 0.51, 0)
          obj.topGroup.scale.setScalar(1)
          ;(obj.topPanel.material as THREE.MeshBasicMaterial).opacity = 1
          obj.topGroup.rotation.z = 0
          obj.faceGroup.position.set(0, -0.02, 0.47)
          obj.faceGroup.scale.setScalar(1)
          obj.faceGroup.children.forEach(child => {
            if ((child as THREE.Mesh).material && 'opacity' in ((child as THREE.Mesh).material as any)) {
              ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 1
            }
          })
          obj.faceGroup.rotation.y = 0
          obj.bodyGroup.visible = true
          obj.topGroup.visible = true
          obj.faceGroup.visible = true
          obj.eyeL.visible = true
          obj.eyeR.visible = true
          obj.pupilL.visible = true
          obj.pupilR.visible = true
          obj.ringL.visible = true
          obj.ringR.visible = true
          obj.outerRingL.visible = true
          obj.outerRingR.visible = true

          const pulse = 0.85 + Math.sin(t * 2 + c.phase) * 0.15
          setEI(obj.eyeL, 2.2 * pulse)
          setEI(obj.eyeR, 2.2 * pulse)
          setEI(obj.pupilL, 1.2 * pulse)
          setEI(obj.pupilR, 1.2 * pulse)
          setEI(obj.ringL, 0.8 * pulse)
          setOp(obj.ringL, 0.5)
          setEI(obj.ringR, 0.8 * pulse)
          setOp(obj.ringR, 0.5)
          setEI(obj.outerRingL, 0.4 * pulse)
          setOp(obj.outerRingL, 0.3)
          setEI(obj.outerRingR, 0.4 * pulse)
          setOp(obj.outerRingR, 0.3)
          obj.eyeLight.intensity = 1.2 * pulse

          setEI(obj.stripL, 1.4); setEI(obj.stripR, 1.4)
          setEI(obj.circL, 1.4); setEI(obj.circR, 1.4)
          setEI(obj.btmLine, 1.4)
          setEI(obj.bottomRail, 1.2)
          setEI(obj.antennaTip, 1.0 + Math.sin(t * 3 + c.phase) * 0.4)
          setEI(obj.topAccent, 1.2)
        }
      }

      // ── Station arms ───────────────────────────────────
      // Arms lower toward robot level but NEVER below 1.6
      // (robot top is ~0.8 above belt, belt is at -0.5 in station local space,
      //  so robot top ≈ 0.3 – arm at 1.6 stays well above)
      const stationZones = [ZONE_TOP, ZONE_FACE, ZONE_EYES]
      stations.forEach((st, si) => {
        const sZ = stationZones[si]
        let minDist = Infinity
        for (const { c } of robots) {
          const d = Math.abs(c.z - sZ)
          if (d < minDist) minDist = d
        }
        const active = minDist < 2.0
        // NEVER go below 1.6 – this prevents ANY clipping with boxes
        const targetY = active ? 1.6 : 2.3
        st.armGroup.position.y = lerp(st.armGroup.position.y, targetY, 0.05)
        st.armGroup.rotation.z = active ? Math.sin(t * 4) * 0.02 : 0

        const tipI = active ? 2.5 : 0.6
        ;(st.tip.material as THREE.MeshStandardMaterial).emissiveIntensity = tipI
        st.tLight.intensity = active ? 1.2 : 0.1
        ;(st.ring.material as THREE.MeshBasicMaterial).opacity = active ? 0.06 + Math.sin(t * 3) * 0.03 : 0.015
      })

      // Sparks
      sparks.update(dt)

      // Render
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      mountedRef.current = false
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#030303",
      }}
    />
  )
}
