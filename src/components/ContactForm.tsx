'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { portfolioConfig } from '@/config/portfolio'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function ContactForm() {
  const { contact } = portfolioConfig
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Initiating...' })

    try {
      const response = await fetch(contact.form.actionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Transmission from ${formData.name}: ${formData.subject}`,
          _gotcha: ""
        })
      })

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Transmission secured. Standing by.' 
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Transmission failure')
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Signal lost. Please try alternative channels.' 
      })
    }
  }

  if (!contact.form.enabled) return null

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{contact.form.title}</h3>
        <p className="text-zinc-400 font-light">{contact.form.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-400">
              Designation
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 font-light"
              placeholder="Identifier"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-400">
              Comms Link
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 font-light"
              placeholder="address@domain.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-zinc-400">
            Directive
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 font-light"
            placeholder="Topic of inquiry"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-400">
            Payload
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-zinc-900/50 text-white placeholder-zinc-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 resize-none font-light"
            placeholder="Enter transmission data..."
          />
        </div>

        {/* Honeypot field */}
        <div style={{ display: 'none' }}>
          <label htmlFor="_gotcha">Leave this empty:</label>
          <input type="text" name="_gotcha" id="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Status Message */}
        {status.type !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 p-4 rounded-2xl border ${
              status.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : status.type === 'error'
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}
          >
            {status.type === 'success' && <CheckCircle size={18} />}
            {status.type === 'error' && <AlertCircle size={18} />}
            {status.type === 'loading' && (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            <span className="text-sm font-medium tracking-wide">{status.message}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full py-4 rounded-2xl bg-white text-black font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileTap={{ scale: status.type === 'loading' ? 1 : 0.98 }}
        >
          {status.type === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Execute
              <Send size={16} />
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-10 pt-8 border-t border-white/5">
        <p className="text-center text-sm text-zinc-500 font-light tracking-wide">
          Direct Line:{' '}
          <a 
            href={`mailto:${contact.form.emailTo}`}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {contact.form.emailTo}
          </a>
        </p>
      </div>
    </div>
  )
}