'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Github, ArrowRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { BackgroundEffect } from '@/components/background-effect'
import About from './pages/about'
import Skills from './pages/skills'
import Projects from './pages/projects'

export default function Home() {
  const { currentPage, isLoading, setIsLoading, setCurrentPage } = useStore()
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const duration = 2000
    const interval = 10
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setLoadingProgress(Math.min((currentStep / steps) * 100, 100))

      if (currentStep >= steps) {
        clearInterval(timer)
        setIsLoading(false)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [setIsLoading])

  const pages = {
    home: (
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-[80vh] flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12 size-32 rounded-full border-2 border-primary p-6"
        >
          <Terminal className="size-full" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <div className="text-center font-mono">
          <h1 className="text-2xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-gray-400 italic'
            >
              {'<'}code{'>'}
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-primary"
            >
              with purpose
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='text-gray-400 italic'
            >
              {'</'}code{'>'}
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 sm:text-lg text-xs text-muted-foreground"
          >
            crafting digital experiences that make a difference
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="https://github.com/werzq"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3 text-primary transition-colors hover:bg-primary/10"
            >
              <Github className="size-5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => {
                window.location.href = "mailto:inbox@werzq.cc";
              }}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground transition-transform hover:scale-105"
            >
              <span>Contact Me</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="size-5" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </motion.div>
    ),
    about: <About />,
    skills: <Skills />,
    projects: <Projects />,
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundEffect />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-2xl"
          >
            <div className="relative size-16">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {Math.round(loadingProgress)}%
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen font-mono"
          >
            <header className="fixed top-0 z-50 w-full">
              <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`w-full flex h-16 items-center justify-center transition-all duration-300 ${isScrolled
                    ? 'backdrop-blur-md shadow-lg transform translate-y-0'
                    : 'backdrop-blur-sm shadow-none transform -translate-y-2'
                  }`}
              >

                <div className="flex gap-12">
                  {['home', 'about', 'skills', 'projects'].map((page) => (
                    <motion.button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="group relative py-2 text-sm font-medium"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <span className={`${currentPage === page ? 'text-primary' : 'text-muted-foreground'
                        } transition-colors group-hover:text-primary`}>
                        {page}
                      </span>
                      {currentPage === page && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute -bottom-px left-0 right-0 h-px bg-primary"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.nav>
            </header>
            <main className="pt-24">
              <AnimatePresence mode="wait">
                {pages[currentPage as keyof typeof pages]}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

