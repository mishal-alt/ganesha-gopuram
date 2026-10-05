import { CalendarPlus, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { invite as F } from '../data'
import { downloadIcs, googleCalendarUrl, mapDirectionsUrl, mapEmbedUrl, whatsappUrl } from '../calendar'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const goldBtn =
  'flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold-antique/40 bg-gold-antique/10 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-gold-antique transition-colors hover:bg-gold-antique/20'

export default function Venue() {
  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Where & When" title="The Venue" />
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-temple-ink">{F.venue.name}</h3>
          <p className="flex items-center gap-2 text-[13px] text-temple-bronze/70">
            <MapPin size={14} className="text-gold-antique" />
            {F.venue.address}
          </p>
          <p className="font-display mt-1 text-sm tracking-wide text-temple-bronze/60">
            {F.dateLabel} · {F.timeLabel}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[1.75rem] border border-gold-antique/30 shadow-soft">
            <iframe title="Wedding venue map" src={mapEmbedUrl} className="h-64 w-full sm:h-72" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Reveal>
        <Reveal delay={0.14} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className={goldBtn}>
            <CalendarPlus size={14} /> Google Calendar
          </a>
          <button type="button" onClick={downloadIcs} className={goldBtn}>
            <CalendarPlus size={14} /> Download .ics
          </button>
          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-temple-bronze/20 bg-white/50 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-temple-ink/85 transition-colors hover:border-gold-antique/40 hover:text-gold-antique sm:col-span-2"
          >
            <Navigation size={14} /> Open in Maps
          </a>
        </Reveal>
        <Reveal delay={0.2} className="rounded-[1.75rem] border border-gold-antique/25 bg-ivory-soft/80 p-6 text-center shadow-soft">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold-antique">RSVP</p>
          <p className="mt-3 text-sm leading-relaxed text-temple-bronze/70">{F.rsvp.note}</p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-leaf-bright/30 bg-leaf-bright/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-leaf-deep transition hover:bg-leaf-bright/20"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a
              href={`tel:${F.rsvp.phone.replace(/\s/g, '')}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-temple-bronze/20 bg-white/50 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-temple-ink transition hover:border-gold-antique/40"
            >
              <Phone size={14} /> Call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
