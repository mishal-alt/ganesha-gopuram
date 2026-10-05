import { useCallback, useEffect, useReducer } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { initialIntro, introReducer } from '../introReducer'
import CoverGate from './CoverGate'
import IntroVideo from './IntroVideo'
import AwaitTap from './AwaitTap'
import OpenReveal from './OpenReveal'

// Orchestrates the opening sequence; calls onOpen once the invitation is revealed.
export default function Intro({ onOpen }) {
  const reduce = useReducedMotion()
  const [state, dispatch] = useReducer(introReducer, initialIntro)

  useEffect(() => {
    if (reduce) dispatch({ type: 'SKIP_MOTION' })
  }, [reduce])

  // Page scroll is locked until the invitation is open.
  useEffect(() => {
    const locked = state.stage !== 'open'
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [state.stage])

  useEffect(() => {
    if (state.stage === 'open') onOpen()
  }, [state.stage, onOpen])

  const begin = useCallback(() => dispatch({ type: 'BEGIN' }), [])
  const skip = useCallback(() => dispatch({ type: 'SKIP_MOTION' }), [])
  const ended = useCallback(() => dispatch({ type: 'VIDEO_ENDED' }), [])
  const failed = useCallback((reason) => dispatch({ type: 'VIDEO_FAILED', reason }), [])
  const enter = useCallback(() => dispatch({ type: 'ENTER' }), [])
  const replay = useCallback(() => dispatch({ type: 'REPLAY' }), [])
  const revealed = useCallback(() => dispatch({ type: 'REVEAL_FINISHED' }), [])

  if (state.stage === 'open') return null
  return (
    <>
      <AnimatePresence>{state.stage === 'cover' && <CoverGate onBegin={begin} onSkip={skip} />}</AnimatePresence>
      <IntroVideo active={state.stage === 'playing'} onEnded={ended} onFailed={failed} onSkip={skip} />
      <AnimatePresence>
        {state.stage === 'awaitTap' && <AwaitTap videoError={state.videoError} onEnter={enter} onReplay={replay} />}
      </AnimatePresence>
      <OpenReveal active={state.stage === 'revealing'} onFinished={revealed} />
    </>
  )
}
