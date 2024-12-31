'use client'

import { motion } from 'framer-motion'
import { playfair } from '../layout'

const age = new Date().getFullYear() - 2007 - (new Date().getMonth() + 1 < 7 ? 1 : 0);

const QatarFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 75 18"
    preserveAspectRatio="none"
    className="inline-block mb-0.5 ml-0 align-middle max-h-4"
    style={{ borderRadius: "2px", opacity: 0.4 }}
  >
    <path d="M0,0H75V18H0" fill="#8a1538"/>
    <path d="M22,18H0V0H22l6,1-6,1 6,1-6,1 6,1-6,1 6,1-6,1 6,1-6,1 6,1-6,1 6,1-6,1 6,1-6,1 6,1z" fill="#fff"/>
  </svg>
)


export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 sm:py-16 bg-gradient-to-tr from-background"
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`${playfair.className} relative mb-12 text-center text-2xl font-bold leading-tight sm:text-3xl md:text-4xl`}
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
            className="absolute -left-16 top-1/2 hidden h-px bg-primary md:block"
          />
          About <span className="text-primary">me</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl space-y-6 text-justify"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            Im a {age}-year-old CS student from Qatar <QatarFlag /> focused on creating useful tools and exploring innovative tech solutions. With expertise in both design and development, I bring a unique perspective to every project.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
