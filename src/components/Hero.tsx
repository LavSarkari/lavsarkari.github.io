'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Download, Instagram } from 'lucide-react'
import ThreeBackground from './ThreeBackground'
import { portfolioConfig } from '@/config/portfolio'

export default function Hero() {
  const { personal, social } = portfolioConfig

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background ambient layer for elegant depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black z-0"></div>
      
      <ThreeBackground />
      
      <motion.div 
        className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col items-center justify-center h-full w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-xs text-zinc-300 font-medium tracking-widest uppercase">
            Portfolio
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 md:mb-6 tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          {personal.name}
        </motion.h1>
        
        <motion.h2 
          className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-6 md:mb-8 font-light tracking-wide px-4"
          variants={itemVariants}
        >
          {personal.title}
        </motion.h2>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed px-4 font-light"
          variants={itemVariants}
        >
          {personal.tagline}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4"
          variants={itemVariants}
        >
          <motion.a
            href="/resume.pdf"
            download
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors inline-flex justify-center items-center gap-2 text-sm tracking-wide"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={18} />
            View Resume
          </motion.a>
          
          <div className="flex gap-4">
            <SocialLink href={social.github} icon={<Github size={20} />} />
            <SocialLink href={social.linkedin} icon={<Linkedin size={20} />} />
            <SocialLink href={social.instagram} icon={<Instagram size={20} />} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white backdrop-blur-sm flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  )
}