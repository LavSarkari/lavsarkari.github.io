'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Github, Linkedin, ExternalLink } from 'lucide-react'
import { portfolioConfig } from '@/config/portfolio'
import ContactForm from './ContactForm'

const iconMap = {
  github: Github,
  twitter: MessageCircle,
  linkedin: Linkedin,
  discord: Mail,
}

export default function Contact() {
  const { contact } = portfolioConfig

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-black">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs text-zinc-300 font-medium tracking-widest uppercase">
              Contact
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            {contact.description}
          </p>
        </motion.div>

        {contact.form.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-24"
          >
            <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12">
              <ContactForm />
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {contact.methods.map((method, index) => {
            const Icon = iconMap[method.icon as keyof typeof iconMap] || Mail
            return (
              <motion.a
                key={method.name}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative block"
                whileHover={{ y: -5 }}
              >
                <div className="relative p-8 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-sm group-hover:bg-zinc-800/40 transition-colors duration-500">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-medium text-white transition-colors">
                          {method.name}
                        </h3>
                        <ExternalLink 
                          size={16} 
                          className="text-zinc-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 duration-300" 
                        />
                      </div>
                      
                      <p className="text-blue-400 font-medium tracking-wide mb-3">
                        {method.value}
                      </p>
                      
                      <p className="text-zinc-500 font-light leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full text-zinc-300 font-medium text-sm tracking-wide">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
            {contact.availability}
          </div>
        </motion.div>

        <motion.div 
          className="mt-32 pt-8 border-t border-zinc-900 text-center flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-sm text-zinc-600 font-light tracking-wide">
            Designed & Built minimal.
          </p>
          <p className="text-sm text-zinc-600 font-light tracking-wide">
            © {new Date().getFullYear()} Lav Sarkari
          </p>
        </motion.div>
      </div>
    </section>
  )
}