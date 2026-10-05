import { useEffect, useState } from 'react'
import { invite as F } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const remaining = (iso) => {
  const ms = Math.max(0, new Date(iso).getTime() - Date.now())
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor((ms % 864e5) / 36e5),
    mins: Math.floor((ms % 36e5) / 6e4),
    secs: Math.floor((ms % 6e4) / 1e3),
  }
}

export default function Events() {
  const [t, setT] = useState(() => remaining(F.dateISO))
  useEffect(() => {
    const id = window.setInterval(() => setT(remaining(F.dateISO)), 1000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Save the Date" title="Celebrations" />
      <div className="mx-auto flex max-w-md flex-col gap-6">
        {F.events.map((ev, i) => (
          <Reveal key={ev.name} delay={i * 0.08}>
            <article className="rounded-[1.75rem] border border-gold-antique/30 bg-ivory-soft/80 p-8 text-center shadow-soft">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold-antique/90">{ev.name}</p>
              <p className="font-display mt-3 text-5xl font-semibold text-temple-ink">{ev.dayNum}</p>
              <p className="font-display mt-1 text-lg tracking-[0.12em] text-temple-bronze/85">{ev.monthLabel}</p>
              <div className="hairline-gold mx-auto my-5 w-24" />
              <p className="font-display text-xl text-temple-ink">{ev.time}</p>
              <p className="mt-2 text-sm text-temple-bronze/65">{ev.venue}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-temple-bronze/55">{ev.note}</p>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-4 gap-3">
            {[['Days', t.days], ['Hours', t.hours], ['Mins', t.mins], ['Secs', t.secs]].map(([label, v]) => (
              <div key={label} className="rounded-2xl border border-gold-antique/20 bg-white/50 py-4 text-center">
                <p className="font-display text-2xl text-gold-antique sm:text-3xl">{String(v).padStart(2, '0')}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-temple-bronze/50">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.18} className="flex flex-col gap-3">
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-gold-antique/80">Ceremony flow</p>
          <ul className="space-y-2">
            {F.program.map((p) => (
              <li key={p.name} className="flex items-center justify-between rounded-full border border-gold-antique/15 bg-white/40 px-5 py-3 text-sm">
                <span className="text-temple-ink/85">{p.name}</span>
                <span className="font-display tracking-wide text-gold-antique">{p.time}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
