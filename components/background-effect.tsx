'use client'

import { useEffect, useRef, memo } from 'react'

const BackgroundEffect = memo(function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Configuration for easy tweaking
    const config = {
      particleCountFactor: 20, // Lower factor -> more particles
      maxParticles: 300, // Maximum number of particles
      sizeRange: [1, 20], // Min and max size of particles
      movementSpeed: 3.0, // Multiplier for velocity
      rotationSpeed: 0.1, // Rotation speed multiplier
      connectionMaxDistance: 200, // Maximum distance for particle connections
      Alpha: 0.2,
      connectionAlpha: 0.3, // Alpha for connections
      fps: 30 // Target FPS
    }

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      angle: number
      rotationSpeed: number
      hue: number
    }[] = []

    const particleCount = Math.min(
      window.innerWidth / config.particleCountFactor,
      config.maxParticles
    )
    let animationFrameId: number
    let lastTime = 0

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3 * config.movementSpeed,
          vy: (Math.random() - 0.5) * 0.3 * config.movementSpeed,
          size: Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0],
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * config.rotationSpeed,
          hue: Math.random() * 60 - 30 // Variation in purple hue
        })
      }
    }

    const drawParticles = (timestamp: number) => {
      if (timestamp - lastTime < 1000 / config.fps) {
        animationFrameId = requestAnimationFrame(drawParticles)
        return
      }
      lastTime = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = timestamp / 2000
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.05)')
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.02)')
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.05)')
      ctx.fillStyle = gradient
      
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 50) {
        const y = Math.sin(x / 200 + time) * 20
        ctx.rect(x, y + canvas.height / 2, 2, 2)
      }
      ctx.fill()

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.angle += particle.rotationSpeed

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.angle)
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 5)
        gradient.addColorStop(0, `hsla(${270 + particle.hue}, 70%, 60%, ${config.Alpha})`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        if (i % 3 === 0) {
          ctx.moveTo(-particle.size * 3, particle.size * 3)
          ctx.lineTo(particle.size * 3, particle.size * 3)
          ctx.lineTo(0, -particle.size * 3)
        } else if (i % 3 === 1) {
          ctx.rect(-particle.size * 1.5, -particle.size * 1.5, particle.size * 3, particle.size * 3)
        } else {
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
            const x = Math.cos(angle) * particle.size * 3
            const y = Math.sin(angle) * particle.size * 3
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.restore()

        particles.slice(i + 1).forEach(other => {
          const dx = other.x - particle.x
          const dy = other.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < config.connectionMaxDistance) {
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, other.x, other.y
            )
            const alpha = (1 - distance / config.connectionMaxDistance) * config.connectionAlpha
            gradient.addColorStop(0, `hsla(${270 + particle.hue}, 70%, 60%, ${alpha})`)
            gradient.addColorStop(1, `hsla(${270 + other.hue}, 70%, 60%, ${alpha})`)

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = gradient
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    const handleResize = () => {
      resizeCanvas()
      particles.length = 0
      createParticles()
    }

    resizeCanvas()
    createParticles()
    drawParticles(0)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-background via-background to-background/50" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 h-screen w-screen backdrop-blur-[100px]"
      />
    </>
  )
})

export { BackgroundEffect }
