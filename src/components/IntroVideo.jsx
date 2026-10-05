import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { invite as F } from '../data'

const pill =
  'min-h-11 rounded-full border border-white/25 bg-black/25 px-4 text-[10px] uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition hover:bg-black/40'

// Step 2: blessing video (autoplays muted, tap to unmute).
export default function IntroVideo({ active, onEnded, onFailed, onSkip }) {
  const video = useRef(null)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!active) return
    const v = video.current
    if (!v) return
    ;(async () => {
      try {
        v.currentTime = 0
        v.muted = true
        setMuted(true)
        await v.play()
      } catch {
        onFailed('autoplay-blocked')
      }
    })()
  }, [active, onFailed])

  useEffect(() => {
    const v = video.current
    if (v) v.muted = muted
  }, [muted])

  if (!active) return null
  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Wedding blessing video"
        className="fixed inset-0 z-[80] flex items-center justify-center bg-temple-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          src={F.intro.videoSrc}
          poster={F.intro.posterSrc}
          playsInline
          muted={muted}
          preload="auto"
          onTimeUpdate={(e) => {
            const v = e.currentTarget
            if (v.duration) setProgress(v.currentTime / v.duration)
          }}
          onEnded={onEnded}
          onError={() => onFailed('decode')}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-temple-ink/55 via-transparent to-temple-ink/25" />
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
          <button type="button" onClick={onSkip} className={pill}>{F.intro.skipLabel}</button>
          <button type="button" onClick={() => setMuted((m) => !m)} className={pill} aria-label={muted ? 'Unmute video' : 'Mute video'}>
            {muted ? 'Sound off' : 'Sound on'}
          </button>
        </div>
        <div className="absolute inset-x-8 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10">
          <div className="h-[2px] overflow-hidden rounded-full bg-white/20">
            <motion.div className="h-full origin-left bg-gradient-to-r from-gold-soft to-gold-bright" style={{ scaleX: progress }} />
          </div>
          {!reduce && <p className="mt-3 text-center text-[10px] uppercase tracking-[0.32em] text-white/70">An auspicious beginning</p>}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
