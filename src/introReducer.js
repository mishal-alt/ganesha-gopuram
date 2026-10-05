// Opening sequence: cover -> playing (blessing video) -> awaitTap -> revealing -> open
export const initialIntro = { stage: 'cover' }

export function introReducer(state, action) {
  if (action.type === 'SKIP_MOTION') return { stage: 'open' }
  switch (state.stage) {
    case 'cover':
      return action.type === 'BEGIN' ? { stage: 'playing' } : state
    case 'playing':
      return action.type === 'VIDEO_ENDED'
        ? { stage: 'awaitTap' }
        : action.type === 'VIDEO_FAILED'
          ? { stage: 'awaitTap', videoError: action.reason }
          : state
    case 'awaitTap':
      return action.type === 'ENTER'
        ? { ...state, stage: 'revealing' }
        : action.type === 'REPLAY'
          ? { stage: 'playing', videoError: undefined }
          : state
    case 'revealing':
      return action.type === 'REVEAL_FINISHED' ? { ...state, stage: 'open' } : state
    case 'open':
      return action.type === 'REPLAY' ? { stage: 'cover' } : state
    default:
      return state
  }
}
