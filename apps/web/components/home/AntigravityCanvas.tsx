'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  angle: number
  baseRadius: number
  speed: number
  size: number
  baseOpacity: number
  waveOffset: number
  ringIndex: number
}

const ACCENT  = [224, 80, 112]   // #e05070
const GOLD    = [212, 160, 96]   // #d4a060

export function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mouse  = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    // Two rings
    const COUNTS  = [52, 28]
    const RADII   = [130, 72]
    const TILT_Y  = [0.52, 0.45]   // ellipse y-scale

    const particles: Particle[] = []
    COUNTS.forEach((count, ri) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          angle:       (i / count) * Math.PI * 2,
          baseRadius:  RADII[ri],
          speed:       (ri === 0 ? 1 : -1.4) * (0.18 + Math.random() * 0.12),
          size:        (ri === 0 ? 1.8 : 1.2) + Math.random() * 1.2,
          baseOpacity: 0.35 + Math.random() * 0.55,
          waveOffset:  (i / count) * Math.PI * 2,
          ringIndex:   ri,
        })
      }
    })

    let raf = 0
    let t   = 0

    function resize() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
      mouse.x  = target.x  = canvas!.width  / 2
      mouse.y  = target.y  = canvas!.height * 0.55
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      target.x = e.clientX - rect.left
      target.y = e.clientY - rect.top
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('mousemove', onMouseMove)

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      // Smooth cursor follow
      mouse.x += (target.x - mouse.x) * 0.06
      mouse.y += (target.y - mouse.y) * 0.06
      t += 0.016

      // Soft ambient glow at ring center
      const grd = ctx!.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 180,
      )
      grd.addColorStop(0,   `rgba(${ACCENT.join(',')}, 0.06)`)
      grd.addColorStop(0.6, `rgba(${ACCENT.join(',')}, 0.02)`)
      grd.addColorStop(1,   'transparent')
      ctx!.fillStyle = grd
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      particles.forEach((p) => {
        p.angle += p.speed * 0.01

        const wave  = Math.sin(t * 2.2 + p.waveOffset) * 9
        const r     = p.baseRadius + wave
        const ty    = TILT_Y[p.ringIndex]

        const x = mouse.x + Math.cos(p.angle) * r
        const y = mouse.y + Math.sin(p.angle) * r * ty

        const pulse   = 0.5 + 0.5 * Math.sin(t * 1.8 + p.waveOffset)
        const opacity = p.baseOpacity * pulse

        const [cr, cg, cb] = p.ringIndex === 0 ? ACCENT : GOLD

        // Glow halo
        ctx!.beginPath()
        ctx!.arc(x, y, p.size * 2.6, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${cr},${cg},${cb},${opacity * 0.18})`
        ctx!.fill()

        // Core dot
        ctx!.beginPath()
        ctx!.arc(x, y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${cr},${cg},${cb},${opacity})`
        ctx!.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  )
}
