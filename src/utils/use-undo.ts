import { useCallback, useReducer } from 'react'

interface UndoStateProps<T> {
  past: T[]
  present: T
  future: T[]
}

type ActionType = 'UNDO' | 'REDO' | 'SET' | 'RESET'
interface ActionProps<T> {
  type: ActionType
  newPresent?: T
}

const undoReducer = <T>(state: UndoStateProps<T>, action: ActionProps<T>) => {
  const { past, present, future } = state
  const { type, newPresent } = action

  switch (type) {
    case 'UNDO': {
      if (past.length === 0) return state

      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      const newPresent = previous

      return {
        past: newPast,
        present: newPresent,
        future: [present, ...future]
      }
    }

    case 'REDO': {
      if (future.length === 0) return state

      const next = future[0]
      const newFuture = future.slice(1)
      const newPast = [...past, present]

      return {
        past: [...newPast],
        present: next,
        future: [...newFuture]
      }
    }

    case 'SET': {
      if (newPresent === present) return state

      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    }

    case 'RESET': {
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    }
  }
  return state
}

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as UndoStateProps<T>)

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), [])

  const redo = useCallback(() => dispatch({ type: 'REDO' }), [])

  const set = useCallback(
    (newPresent: T) => dispatch({ type: 'SET', newPresent }),
    []
  )

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: 'SET', newPresent }),
    []
  )

  return [state, { canUndo, canRedo, set, reset, undo, redo }] as const
}
