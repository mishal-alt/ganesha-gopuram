import { invite as F } from './data'

const eventTimes = () => {
  const start = new Date(F.dateISO)
  return [start, new Date(start.getTime() + 300 * 60 * 1000)]
}
const fmt = (d) => d.toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\.\d{3}/, '').slice(0, 15) + 'Z'

export const googleCalendarUrl = () => {
  const [start, end] = eventTimes()
  return `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: 'TEMPLATE',
    text: `${F.groom} weds ${F.bride}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${F.venue.name} — ${F.venue.address}. ${F.hashtag}`,
    location: `${F.venue.name}, ${F.venue.address}`,
  }).toString()}`
}

export const downloadIcs = () => {
  const [start, end] = eventTimes()
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zetron Tech//Wedding//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@zetron.tech`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${F.groom} weds ${F.bride}`,
    `DESCRIPTION:${F.venue.name} — ${F.venue.address}`,
    `LOCATION:${F.venue.name}\\, ${F.venue.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${F.groom}-${F.bride}-wedding.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(F.venue.mapsQuery)}&output=embed`
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(F.venue.mapsQuery)}`
export const whatsappUrl = `https://wa.me/${F.rsvp.whatsapp}?text=${encodeURIComponent(`Namaste! Confirming attendance for ${F.groom} & ${F.bride}'s wedding.`)}`
