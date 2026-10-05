import { useReducedMotion } from 'framer-motion'
import { invite as F, layers } from '../data'
import Reveal from './Reveal'

export default function FamilyCard() {
  const reduce = useReducedMotion()
  return (
    <section className="relative px-6 py-16">
      <Reveal className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-gold-antique/30 shadow-soft">
        <img src={layers.familyCard} alt={`${F.familyName} family welcomes you`} className="h-auto w-full object-cover" loading="lazy" />
        {!reduce && (
          <img
            src={layers.butterflies}
            alt=""
            className="pointer-events-none absolute left-[12%] top-[38%] w-20 opacity-70 butterfly-drift sm:w-28"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
          <p className="font-display text-2xl uppercase tracking-[0.18em] text-temple-ink drop-shadow-[0_1px_6px_rgba(253,248,238,0.9)]">{F.familyName}</p>
          <p className="font-script text-bronze mt-1 text-3xl drop-shadow-[0_1px_6px_rgba(253,248,238,0.9)]">family welcomes you</p>
        </div>
      </Reveal>
    </section>
  )
}
