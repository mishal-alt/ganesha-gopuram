import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import Intro from './components/Intro'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Verse from './components/Verse'
import Couple from './components/Couple'
import FamilyCard from './components/FamilyCard'
import Events from './components/Events'
import Venue from './components/Venue'
import Footer from './components/Footer'

export default function App() {
  const [opened, setOpened] = useState(false)
  const reduce = useReducedMotion()
  const onOpen = useCallback(() => setOpened(true), [])

  // Smooth scrolling once the invitation is open.
  useEffect(() => {
    if (!opened || reduce) return
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
    let raf = 0
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [opened, reduce])

  return (
    <>
      <Intro onOpen={onOpen} />
      {opened ? (
        <main className="relative min-h-svh overflow-x-hidden bg-ivory-paper">
          <ScrollProgress />
          <Hero />
          <Verse />
          <Couple />
          <FamilyCard />
          <Events />
          <Venue />
          <Footer />
        </main>
      ) : (
        <main className="sr-only" aria-hidden>
          Loading invitation
        </main>
      )}
    </>
  )
}
