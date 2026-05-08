'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink, ArrowRight } from 'lucide-react'
import { PinnedRepository, Repository } from '@/lib/github'

export default function PinnedProjects() {
  const [repos, setRepos] = useState<PinnedRepository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/github/pinned')
        let fetchedRepos = await response.json()
        
        // Fallback if pinned repos API fails (e.g., no GitHub Token)
        if (!fetchedRepos || fetchedRepos.length === 0) {
          const fallbackResponse = await fetch('/api/github/repos')
          const allRepos: Repository[] = await fallbackResponse.json()
          
          if (allRepos && allRepos.length > 0) {
            // Sort by stars and take top 6
            fetchedRepos = allRepos
              .sort((a, b) => b.stargazerCount - a.stargazerCount)
              .slice(0, 6)
          }
        }
        
        setRepos(fetchedRepos || [])
      } catch (error) {
        console.error('Error fetching repositories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs text-zinc-300 font-medium tracking-widest uppercase">
              Projects
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Featured Work
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            A curated collection of impactful builds.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1, 
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
                className="group cursor-pointer break-inside-avoid mb-6"
                onClick={() => window.open(repo.url, '_blank')}
              >
                <div className="relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-md hover:bg-zinc-800/40 transition-all duration-500 overflow-hidden">
                  
                  {/* Subtle Hover Glow */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors max-w-[80%]">
                      {repo.name}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-colors flex-shrink-0">
                      <ArrowRight size={18} className="-rotate-45" />
                    </div>
                  </div>

                  <p className="text-zinc-400 leading-relaxed font-light mb-8 relative z-10">
                    {repo.description || 'No description available'}
                  </p>

                  <div className="flex justify-between items-center relative z-10">
                    {repo.primaryLanguage && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: repo.primaryLanguage.color }}
                        />
                        <span className="text-sm font-medium tracking-wide text-zinc-300">
                          {repo.primaryLanguage.name}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-zinc-500 font-medium tracking-wide">
                      <Star size={14} />
                      <span className="text-sm">{repo.stargazerCount}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {repos.length === 0 && !loading && (
          <div className="text-center text-zinc-500 font-light mt-12">
            <p>No pinned repositories found.</p>
          </div>
        )}
      </div>
    </section>
  )
}