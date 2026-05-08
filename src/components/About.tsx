'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { portfolioConfig } from '@/config/portfolio'

export default function About() {
  const { personal, skills, currentFocus } = portfolioConfig
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Subtle ambient parallax
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-black" ref={containerRef}>
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: y1, opacity: opacity1 }}
      >
        <div className="absolute top-1/4 right-0 w-[40rem] h-[40rem] bg-zinc-900/40 rounded-full blur-[100px] opacity-30 translate-x-1/2"></div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs text-zinc-300 font-medium tracking-widest uppercase">
              About
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Who I Am
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
            {personal.bio.intro}
            <br/><br/>
            {personal.bio.philosophy}
          </p>
        </motion.div>

        {/* Skills Abstract Layer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-32"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white">Core Capabilities</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="py-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-zinc-300 hover:bg-white/10 transition-colors cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white">Current Focus</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFocus.map((focus, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-zinc-400 font-light text-lg">{focus}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}