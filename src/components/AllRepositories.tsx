'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Search, ArrowRight } from 'lucide-react'
import { Repository } from '@/lib/github'

export default function AllRepositories() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('/api/github/repos')
        const allRepos = await response.json()
        setRepos(allRepos)
        setFilteredRepos(allRepos)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  useEffect(() => {
    let filtered = repos

    if (searchTerm) {
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedLanguage) {
      filtered = filtered.filter(repo =>
        repo.primaryLanguage?.name === selectedLanguage
      )
    }

    setFilteredRepos(filtered)
  }, [repos, searchTerm, selectedLanguage])

  const languages = Array.from(
    new Set(repos.map(repo => repo.primaryLanguage?.name).filter(Boolean))
  ).sort()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  if (loading) {
    return (
      <section className="py-32 bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              All Repositories
            </h2>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="break-inside-avoid mb-6 p-8 rounded-3xl bg-zinc-900/20 border border-white/5 animate-pulse">
                <div className="h-5 bg-zinc-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-zinc-800 rounded w-2/3 mb-8"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-zinc-800 rounded w-20"></div>
                  <div className="flex gap-3">
                    <div className="h-4 bg-zinc-800 rounded w-10"></div>
                    <div className="h-4 bg-zinc-800 rounded w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs text-zinc-300 font-medium tracking-widest uppercase">
              Archive
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            All Repositories
          </h2>
        </motion.div>

        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 font-light"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-6 py-4 rounded-2xl border border-white/10 bg-zinc-900/50 text-zinc-300 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 font-light cursor-pointer appearance-none md:w-64"
          >
            <option value="">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredRepos.map((repo) => (
            <motion.div
              key={repo.id}
              className="break-inside-avoid mb-6 group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => window.open(repo.url, '_blank')}
            >
              <div className="relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-md hover:bg-zinc-800/40 transition-all duration-500 overflow-hidden">
                
                {/* Subtle Hover Glow */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors truncate max-w-[80%]">
                    {repo.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-colors flex-shrink-0">
                    <ArrowRight size={14} className="-rotate-45" />
                  </div>
                </div>

                <p className="text-zinc-400 leading-relaxed font-light mb-8 relative z-10 text-sm">
                  {repo.description || 'No description available'}
                </p>

                <div className="flex justify-between items-center relative z-10">
                  {repo.primaryLanguage ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: repo.primaryLanguage.color }}
                      />
                      <span className="text-xs font-medium tracking-wide text-zinc-300">
                        {repo.primaryLanguage.name}
                      </span>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center gap-4 text-zinc-500 font-medium tracking-wide">
                    <div className="flex items-center gap-1.5">
                      <Star size={14} />
                      <span className="text-xs">{repo.stargazerCount}</span>
                    </div>
                    {repo.forkCount > 0 && (
                      <div className="flex items-center gap-1.5">
                        <GitFork size={14} />
                        <span className="text-xs">{repo.forkCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredRepos.length === 0 && !loading && (
          <div className="text-center text-zinc-500 font-light mt-16">
            <p>No repositories found matching your criteria.</p>
          </div>
        )}

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-zinc-500 font-light text-sm tracking-wide">
            Showing {filteredRepos.length} of {repos.length} repositories
          </p>
        </motion.div>
      </div>
    </section>
  )
}