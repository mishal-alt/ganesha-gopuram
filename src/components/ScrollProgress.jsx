import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-soft via-gold-bright to-vermilion-mute"
      style={{ scaleX }}
    />
  )
}
