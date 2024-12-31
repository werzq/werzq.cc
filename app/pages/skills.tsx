'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { playfair } from '../layout'
import { Layout, Database, Palette, Server, Cpu, Code, Braces, Paintbrush, Table, GitGraphIcon as Network, Box, FileJson, Figma, Users, PenTool, TableProperties, DatabaseBackup, Blocks, Scale, Workflow, ChevronUp, ChevronDown } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const skills = [
  { 
    name: 'Frontend Development', 
    level: 90,
    icon: Layout,
    description: 'React, Next.js, TypeScript, and modern CSS',
    sections: [
      { name: 'React & Next.js', level: 95, icon: Code },
      { name: 'TypeScript', level: 90, icon: Braces },
      { name: 'Modern CSS', level: 85, icon: Paintbrush }
    ]
  },
  { 
    name: 'Backend Development', 
    level: 85,
    icon: Server,
    description: 'Node.js, Express, REST APIs, and GraphQL',
    sections: [
      { name: 'Node.js', level: 90, icon: Box },
      { name: 'REST APIs', level: 85, icon: Network },
      { name: 'GraphQL', level: 80, icon: FileJson }
    ]
  },
  { 
    name: 'UI/UX Design', 
    level: 80,
    icon: Palette,
    description: 'Figma, user research, and design systems',
    sections: [
      { name: 'Design Tools', level: 85, icon: Figma },
      { name: 'User Research', level: 80, icon: Users },
      { name: 'Design Systems', level: 75, icon: PenTool }
    ]
  },
  { 
    name: 'Database Design', 
    level: 85,
    icon: Database,
    description: 'SQL, NoSQL, data modeling, and optimization',
    sections: [
      { name: 'SQL', level: 90, icon: Table },
      { name: 'NoSQL', level: 85, icon: DatabaseBackup },
      { name: 'Data Modeling', level: 80, icon: TableProperties }
    ]
  },
  { 
    name: 'System Architecture', 
    level: 80,
    icon: Cpu,
    description: 'Microservices, scalability, and best practices',
    sections: [
      { name: 'Microservices', level: 85, icon: Blocks },
      { name: 'Scalability', level: 80, icon: Scale },
      { name: 'System Design', level: 75, icon: Workflow }
    ]
  },
]

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const smoothScroll = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex(index)

    const targetPosition = index * window.innerHeight
    const startPosition = containerRef.current?.scrollTop || 0
    const distance = targetPosition - startPosition
    const duration = 1000
    let start: number | null = null

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)

      // Easing function for smoother animation
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

      const currentPosition = startPosition + distance * ease(progress)
      if (containerRef.current) {
        containerRef.current.scrollTop = currentPosition
      }

      if (progress < 1) {
        requestAnimationFrame(animation)
      } else {
        setIsTransitioning(false)
      }
    }

    requestAnimationFrame(animation)
  }, [isTransitioning])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isTransitioning) return

      const delta = e.deltaY
      if (delta > 0 && activeIndex < skills.length - 1) {
        smoothScroll(activeIndex + 1)
      } else if (delta < 0 && activeIndex > 0) {
        smoothScroll(activeIndex - 1)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [activeIndex, isTransitioning, smoothScroll])

  const handleNav = (direction: 'prev' | 'next') => {
    if (isTransitioning) return

    if (direction === 'next' && activeIndex < skills.length - 1) {
      smoothScroll(activeIndex + 1)
    } else if (direction === 'prev' && activeIndex > 0) {
      smoothScroll(activeIndex - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background to-background/80">
      <div className="relative flex h-full items-center justify-center">
        {/* Navigation dots */}
        <div className="fixed left-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {skills.map((_, index) => (
            <button
              key={index}
              onClick={() => !isTransitioning && smoothScroll(index)}
              className={cn(
                "group relative h-3 w-3 rounded-full transition-all duration-300",
                activeIndex === index ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to skill ${index + 1}`}
            >
              <span className="absolute left-full ml-4 hidden whitespace-nowrap text-sm opacity-0 transition-opacity group-hover:opacity-100 lg:block">
                {skills[index].name}
              </span>
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNav('prev')}
            disabled={activeIndex === 0 || isTransitioning}
            className="rounded-full opacity-70 hover:opacity-100 disabled:opacity-30"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNav('next')}
            disabled={activeIndex === skills.length - 1 || isTransitioning}
            className="rounded-full opacity-70 hover:opacity-100 disabled:opacity-30"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        {/* Skills container */}
        <div 
          ref={containerRef}
          className="hide-scrollbar h-screen overflow-hidden"
        >
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className="flex h-screen w-full items-center justify-center px-6"
            >
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-5xl"
                  >
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className={`${playfair.className} mb-12 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl`}
                    >
                      <span className="text-primary">{skill.name}</span>
                      <br />
                      <span className="text-xl font-normal text-muted-foreground sm:text-2xl md:text-3xl">
                        {skill.description}
                      </span>
                    </motion.h2>
                    
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {skill.sections.map((section, sectionIndex) => (
                        <motion.div
                          key={section.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + sectionIndex * 0.1, duration: 0.5 }}
                          className="group relative space-y-4 rounded-2xl bg-muted/5 p-6 transition-all duration-300 hover:bg-muted/10"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/20 transition-colors group-hover:bg-primary/20">
                              <section.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-lg font-medium">{section.name}</span>
                              <span className="text-sm font-medium text-primary">
                                {section.level}%
                              </span>
                            </div>
                          </div>
                          <div className="relative h-2 overflow-hidden rounded-full bg-muted/30">
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-950 to-purple-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${section.level}%` }}
                              transition={{
                                duration: 1.5,
                                delay: 0.6 + sectionIndex * 0.1,
                                ease: "easeInOut",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent dark:from-white/10" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        html, body {
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
