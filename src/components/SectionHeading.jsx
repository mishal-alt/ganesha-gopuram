import Reveal from './Reveal'

export default function SectionHeading({ kicker, title }) {
  return (
    <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
      <span className="text-[11px] uppercase tracking-[0.4em] text-gold-antique/90">{kicker}</span>
      <h2 className="font-script text-bronze text-5xl sm:text-6xl">{title}</h2>
      <div className="hairline-gold w-40" />
    </Reveal>
  )
}
