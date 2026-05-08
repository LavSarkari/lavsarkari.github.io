'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { portfolioConfig } from '@/config/portfolio'

interface Hobby {
  name: string
  description: string
  icon: string
  link: string | null
}

export default function Hobbies() {
  const hobbies: Hobby[] = portfolioConfig.hobbies || []

  if (!hobbies.length) return null

  return (
    <div className="mt-24 pt-16 border-t border-white/5">
      <motion.h3 
        className="text-2xl font-bold mb-10 text-white tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Interests
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            whileTap={{ y: 0 }}
            className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 backdrop-blur-sm group cursor-pointer relative overflow-hidden transition-colors hover:bg-zinc-900/40"
            {...(hobby.link && {
              onClick: () => window.open(hobby.link!, '_blank', 'noopener,noreferrer')
            })}
          >
            {/* Subtle Hover Glow */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex-shrink-0 w-12 h-12 mb-6 flex items-center justify-center text-2xl bg-white/5 border border-white/10 text-zinc-300 rounded-2xl group-hover:scale-110 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
              {hobby.icon}
            </div>
            
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
                  {hobby.name}
                </h4>
                {hobby.link && (
                  <ExternalLink 
                    size={16} 
                    className="text-zinc-600 group-hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1" 
                  />
                )}
              </div>
              <p className="text-zinc-400 font-light leading-relaxed">
                {hobby.description}
              </p>
              {hobby.link && (
                <div className="mt-4 text-sm font-medium tracking-wide text-blue-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
