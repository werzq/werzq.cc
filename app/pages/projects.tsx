'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { playfair } from '../layout'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const projects = [
  {
    title: 'WebEdit',
    description: 'A Minimal Web-based Text Editor',
    image: '/projects/webedit.png',
    tech: ['NextJS', 'Typescript', 'Web'],
    demo: 'https://webedit.werzq.cc/',
    github: 'https://github.com/werzq/WebEdit',
    details: 'WebEdit is a simple and powerful web-based text editor that allows users to write and manage their text files. It features a clean interface with options for theme toggling, font customization, undo/redo functionality, file saving, and uploading text files.',
  },
  {
    title: 'Personality Test',
    description: 'Web-based Personality Test',
    image: '/projects/personalitytest.png',
    tech: ['NextJS', 'Typescript', 'Web'],
    demo: 'https://personalitytest.werzq.cc/',
    github: 'https://github.com/werzq/personality-test',
    details: 'This personality test is designed to help you explore and understand the key aspects of your personality. By answering a series of thought-provoking questions, you will gain insights into your preferences, behaviors, and tendencies across various dimensions',
  },
  {
    title: 'Calendar App',
    description: 'A modern desktop calendar application',
    image: '/projects/calendarapp.png',
    tech: ['Python', 'PyQt5', 'SqLite'],
    demo: null,
    github: 'https://github.com/werzq/calendar-app-python',
    details: 'The Calendar App is a feature-rich desktop application for organizing and managing your events effectively. Built using Python, PyQt5, and SQLite, it allows users to add, edit, and remove events with ease. The app includes advanced search functionality, categorized event organization, and a clean, user-friendly interface. Whether for work, personal use, or education, this tool simplifies event scheduling and tracking.',
  },
  {
    title: 'Willi Style',
    description: 'A nice cozy orange styled theme',
    image: '/projects/willistyle.png',
    tech: ['Visual Studio Code extension'],
    demo: 'https://marketplace.visualstudio.com/items?itemName=wq.willi-style',
    github: 'https://github.com/werzq/willi-style',
    details: 'A warm and inviting orange-themed Visual Studio Code color scheme, designed to create a cozy and visually pleasing coding environment. Its harmonious tones provide excellent contrast, reducing eye strain and enhancing focus for a more comfortable and enjoyable coding experience. Available in 3 flavours - dark, darker & darkest.',
  },
  {
    title: 'pyTeX',
    description: 'a console-based text editor',
    image: '/projects/pytex.png',
    tech: ['Python', 'Console-based'],
    demo: null,
    github: 'https://github.com/werzq/pyTeX',
    details: 'pyTeX is a lightweight, console-based text editor written in Python, designed for simplicity and efficiency. Built with a focus on minimalism, pyTeX provides essential text editing features using a set of easy to learn commands.',
  },
]

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:py-16"
    >
      <div className="w-full max-w-6xl space-y-8 sm:space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${playfair.className} relative text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl`}
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -left-16 top-1/2 hidden h-0.5 bg-primary md:block"
          />
          Featured<br />
          <span className="text-primary">projects</span>
        </motion.h2>

        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Dialog key={project.title}>
              <DialogTrigger asChild>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-lg border bg-card transition-colors hover:bg-card/80">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-fill transition-transform duration-300 opacity-55 group-hover:opacity-100"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="font-bold text-2xl">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                  <DialogDescription className="text-base">{project.details}</DialogDescription>
                </DialogHeader>
                <div className="mt-4 grid gap-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-fill"
                    />
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button asChild variant="outline" className="flex-1">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View Source
                      </a>
                    </Button>
                    {project.demo && (
                      <Button asChild className="flex-1">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

