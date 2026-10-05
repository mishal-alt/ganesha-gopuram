import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { invite as F, layers } from '../data'
import Reveal from './Reveal'
import Credit from './Credit'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(F.hashtag)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  const marquee = Array(6).fill(`${F.hashtag} · ${F.dateLabel} · `).join('')
  return (
    <footer className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-paper via-ivory-warm to-[#E6D5B8]" />
      <img src={layers.backdrop} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#E6D5B8] via-[#E6D5B8]/75 to-transparent" />
      <div className="relative z-10 mb-6 overflow-hidden border-y border-gold-antique/25 py-3">
        <div className="flex w-max whitespace-nowrap" style={reduce ? undefined : { animation: 'marquee 22s linear infinite' }}>
          {[0, 1].map((i) => (
            <span key={i} className="font-display px-4 text-sm uppercase tracking-[0.4em] text-gold-antique">{marquee}</span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none relative z-0 -mb-6 flex select-none justify-center overflow-hidden">
        <span className="font-display whitespace-nowrap text-[10vw] font-semibold uppercase leading-none tracking-tight text-gold-antique/20 sm:text-[7vw]">
          {F.groom} &amp; {F.bride}
        </span>
      </div>
      <Reveal className="relative z-10 mx-auto mb-14 mt-4 flex max-w-sm flex-col items-center gap-4 px-6 text-center">
        <p className="font-script text-bronze text-4xl leading-snug">We can't wait to celebrate with you</p>
        <p className="text-[11px] uppercase tracking-[0.35em] text-temple-bronze/55">With love, the {F.familyName} family</p>
        <div className="hairline-gold mt-2 w-32" />
        <motion.button
          type="button"
          onClick={copy}
          whileTap={{ scale: 0.94 }}
          className={`min-h-11 rounded-full border px-5 py-2 text-[10px] tracking-[0.2em] transition-colors ${
            copied
              ? 'border-gold-bright/60 bg-gold-bright/10 text-gold-antique'
              : 'border-gold-antique/25 text-temple-bronze/45 hover:border-gold-antique/50 hover:text-temple-bronze/75'
          }`}
        >
          {copied ? 'Copied' : `${F.hashtag} · tap to copy`}
        </motion.button>
        <Credit />
      </Reveal>
    </footer>
  )
}
