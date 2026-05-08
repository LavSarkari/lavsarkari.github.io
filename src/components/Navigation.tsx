'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Code, Mail, ExternalLink, Menu, X } from 'lucide-react'
import { portfolioConfig } from '@/config/portfolio'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { navigation } = portfolioConfig

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      {/* Desktop Floating Pill */}
      <div className={`hidden md:flex items-center gap-8 px-8 py-4 rounded-full transition-all duration-500 pointer-events-auto ${
        scrolled 
          ? 'bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide"
          >
            {item.label}
          </button>
        ))}

        <div className="w-px h-4 bg-zinc-800"></div>

        <div className="flex items-center gap-4">
          <a
            href={navigation.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide group"
          >
            {navigation.blogName}
            <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
          
          {navigation.bytesUrl && (
            <a
              href={navigation.bytesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide group"
            >
              {navigation.bytesName}
              <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full flex justify-end pointer-events-auto">
        <MobileMenu navItems={navItems} navigation={navigation} />
      </div>
    </motion.nav>
  )
}

function MobileMenu({ navItems, navigation }: { navItems: any[], navigation: any }) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full text-white shadow-xl"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/10 rounded-full text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-3xl font-light tracking-wide text-zinc-300 hover:text-white transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8 pt-8 border-t border-white/10 w-full flex flex-col items-center gap-6"
              >
                <a
                  href={navigation.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xl font-light text-zinc-400 hover:text-white transition-colors"
                >
                  {navigation.blogName} <ExternalLink size={18} />
                </a>
                
                {navigation.bytesUrl && (
                  <a
                    href={navigation.bytesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xl font-light text-zinc-400 hover:text-white transition-colors"
                  >
                    {navigation.bytesName} <ExternalLink size={18} />
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}