import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './ImmersiveScene.css'

const NODE_DATA = [
  { label: 'UK', color: 0xd7e0ea, orbit: 2.7, speed: 0.55, phase: 0.2 },
  { label: 'US', color: 0x4cc9a7, orbit: 3.35, speed: 0.36, phase: 1.5 },
  { label: 'AE', color: 0x57d6ff, orbit: 3.05, speed: 0.47, phase: 2.8 },
  { label: 'SG', color: 0x8db7d8, orbit: 3.8, speed: 0.28, phase: 4.1 },
]

function createRing(radius, color, opacity, rotation) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2)
  const points = curve.getPoints(160).map(p => new THREE.Vector3(p.x, p.y, 0))
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  })
  const ring = new THREE.LineLoop(geometry, material)
  ring.rotation.set(rotation.x, rotation.y, rotation.z)
  return ring
}

export default function ImmersiveScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x090d13, 6, 16)

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80)
    camera.position.set(0, 0.35, 9.8)

    const rig = new THREE.Group()
    scene.add(rig)

    const globeGeometry = new THREE.IcosahedronGeometry(1.62, 5)
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0x174ea6,
      metalness: 0.34,
      roughness: 0.42,
      emissive: 0x0a2d56,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.92,
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    rig.add(globe)

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(1.66, 48, 24),
      new THREE.MeshBasicMaterial({
        color: 0x9dfcff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      }),
    )
    rig.add(wire)

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 64, 32),
      new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    )
    rig.add(halo)

    const rings = [
      createRing(2.55, 0x4cc9a7, 0.3, { x: 1.15, y: 0.16, z: 0.2 }),
      createRing(3.22, 0x8db7d8, 0.14, { x: 1.32, y: -0.42, z: -0.45 }),
      createRing(3.75, 0x57d6ff, 0.12, { x: 1.05, y: 0.55, z: 0.62 }),
    ]
    rings.forEach(ring => rig.add(ring))

    const nodes = NODE_DATA.map((node) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 20, 20),
        new THREE.MeshStandardMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 1.4,
          roughness: 0.28,
        }),
      )
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 20, 20),
        new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
        }),
      )
      const group = new THREE.Group()
      group.add(marker, glow)
      group.userData = node
      rig.add(group)
      return group
    })

    const starGeometry = new THREE.BufferGeometry()
    const starCount = 520
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 18
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 11
      starPositions[i * 3 + 2] = -3 - Math.random() * 15
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xdffcff,
        size: 0.018,
        transparent: true,
        opacity: 0.48,
      }),
    )
    scene.add(stars)

    const keyLight = new THREE.PointLight(0x73d2de, 3.2, 18)
    keyLight.position.set(-3.8, 3.5, 4.2)
    scene.add(keyLight)

    const warmLight = new THREE.PointLight(0xffb86b, 2.2, 15)
    warmLight.position.set(4.2, -1.3, 3.5)
    scene.add(warmLight)

    const ambient = new THREE.AmbientLight(0xffffff, 0.62)
    scene.add(ambient)

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
    }

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height, true)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', resize)
    resize()

    let frameId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsed = clock.getElapsedTime()
      rig.rotation.y += ((pointer.x * 0.34) - rig.rotation.y) * 0.035
      rig.rotation.x += ((-pointer.y * 0.2) - rig.rotation.x) * 0.035
      rig.position.y = Math.sin(elapsed * 0.7) * 0.08

      globe.rotation.y = elapsed * 0.1
      globe.rotation.x = Math.sin(elapsed * 0.26) * 0.08
      wire.rotation.y = -elapsed * 0.16
      halo.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.025)

      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0015 + index * 0.0008
      })

      nodes.forEach((node) => {
        const data = node.userData
        const angle = elapsed * data.speed + data.phase
        node.position.set(
          Math.cos(angle) * data.orbit,
          Math.sin(angle * 0.82) * 0.48,
          Math.sin(angle) * data.orbit * 0.35,
        )
        node.scale.setScalar(1 + Math.sin(elapsed * 3 + data.phase) * 0.08)
      })

      stars.rotation.y = elapsed * 0.012
      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(tick)
    }

    tick()

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      globeGeometry.dispose()
      globeMaterial.dispose()
      wire.geometry.dispose()
      wire.material.dispose()
      halo.geometry.dispose()
      halo.material.dispose()
      rings.forEach((ring) => {
        ring.geometry.dispose()
        ring.material.dispose()
      })
      nodes.forEach((node) => {
        node.children.forEach((child) => {
          child.geometry.dispose()
          child.material.dispose()
        })
      })
      starGeometry.dispose()
      stars.material.dispose()
    }
  }, [])

  return (
    <div className="launch-scene" aria-hidden="true">
      <canvas ref={canvasRef} className="launch-scene__canvas" />
      <div className="launch-scene__vignette" />
    </div>
  )
}
