import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { invite as F, layers } from '../data'

// Pointer-driven parallax: eased offset in [-10, 10] x [-7, 7].
function useParallax() {
  const reduce = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (reduce) return
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.07
      current.current.y += (target.current.y - current.current.y) * 0.07
      const { x, y } = current.current
      setOffset((o) => (Math.abs(o.x - x) < 0.05 && Math.abs(o.y - y) < 0.05 ? o : { x, y }))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [reduce])

  const onMove = useCallback(
    (e) => {
      if (reduce) return
      const r = e.currentTarget.getBoundingClientRect()
      target.current = {
        x: ((e.clientX - r.left) / r.width - 0.5) * 2 * 10,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2 * 7,
      }
    },
    [reduce],
  )
  const onLeave = useCallback(() => {
    target.current = { x: 0, y: 0 }
  }, [])
  return { offset, onMove, onLeave, reduce }
}

const shift = (o, k) => ({ transform: `translate3d(${o.x * k}px, ${o.y * k}px, 0)` })

export default function Hero({ mode = 'hero' }) {
  const { offset, onMove, onLeave, reduce } = useParallax()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section
      className={`relative isolate w-full overflow-hidden bg-ivory-paper ${mode === 'hero' ? 'min-h-[100dvh]' : 'min-h-[70dvh]'}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="absolute inset-[-3%] z-0 will-change-transform" style={shift(offset, 0.15)}>
        <img src={layers.backdrop} alt="" className="h-full w-full object-cover object-center" draggable={false} />
        <div className="paper-grain absolute inset-0 opacity-60" />
      </div>
      <div
        className={`absolute inset-x-[-2%] top-[-1%] z-[2] will-change-transform ${reduce ? '' : 'garland-sway'}`}
        style={shift(offset, 0.4)}
      >
        <img src={layers.toran} alt="" className="h-auto w-full object-contain object-top opacity-95" draggable={false} />
      </div>
      <div className="pointer-events-none absolute inset-6 z-[3] opacity-70 sm:inset-10" style={shift(offset, 0.25)}>
        <img src={layers.frame} alt="" className="h-full w-full object-fill" draggable={false} />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[4] will-change-transform" style={shift(offset, 0.75)}>
        <img src={layers.props} alt="" className="h-auto w-full object-contain object-bottom" draggable={false} />
        <div className="pointer-events-none absolute bottom-[18%] left-[12%] h-20 w-20 rounded-full bg-gold-bright/35 blur-2xl lamp-flicker" />
        <div
          className="pointer-events-none absolute bottom-[16%] right-[18%] h-16 w-16 rounded-full bg-gold-soft/30 blur-2xl lamp-flicker"
          style={{ animationDelay: '0.9s' }}
        />
      </div>
      {!reduce && (
        <div className="pointer-events-none absolute left-[18%] top-[42%] z-[5] w-24 butterfly-drift sm:w-32" style={shift(offset, 0.9)}>
          <img src={layers.butterflies} alt="" className="h-auto w-full opacity-80" draggable={false} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 z-[6] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(243,232,212,0.55)_100%)]" />

      <div className="relative z-[20] flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-[26vh] pt-[12vh] text-center">
        <motion.div
          className="flex w-full max-w-sm flex-col items-center gap-3 rounded-[2rem] bg-ivory-soft/55 px-5 py-7 shadow-soft backdrop-blur-[2px]"
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={layers.ganesha} alt="" className="mb-1 h-14 w-14 object-contain opacity-90 sm:h-16 sm:w-16" draggable={false} />
          <p className="w-full text-[10px] uppercase leading-relaxed tracking-[0.3em] text-gold-antique sm:text-[11px]">Together with their families</p>
          <p className="font-display w-full text-[11px] uppercase leading-relaxed tracking-[0.18em] text-temple-bronze/80 sm:text-xs">
            We joyfully invite you to celebrate the wedding of
          </p>
          <h1 className="font-script text-bronze mt-1 text-[3.2rem] leading-none sm:text-6xl">
            {F.groom} &amp; {F.bride}
          </h1>
          <div className="mt-3 flex items-center gap-4 text-gold-antique">
            <span className="h-px w-10 bg-gold-antique/45" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="font-display flex items-baseline gap-3 text-sm uppercase tracking-[0.24em] sm:text-base">
                <span>{F.dayLabel}</span>
                <span className="text-2xl font-semibold tracking-normal sm:text-3xl">{F.dayNum}</span>
                <span>{F.monthLabel}</span>
              </div>
              <span className="font-display text-lg tracking-[0.18em]">{F.yearLabel}</span>
            </div>
            <span className="h-px w-10 bg-gold-antique/45" />
          </div>
          <p className="font-display mt-2 text-[11px] uppercase tracking-[0.28em] text-temple-bronze/70">{F.timeLabel}</p>
          <p className="font-display mt-3 text-base uppercase tracking-[0.2em] text-gold-antique sm:text-lg">{F.venue.name}</p>
          <p className="font-display text-sm italic text-temple-bronze/65">{F.venue.address}</p>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gold-antique/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em]">Scroll</span>
          <motion.span
            className="block h-8 w-px bg-gradient-to-b from-gold-antique to-transparent"
            animate={reduce ? undefined : { scaleY: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
