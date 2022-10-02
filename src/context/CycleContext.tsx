import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addCreatNewCycleAction,
  interrupedCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycle/actions'
import { Cycle, cycleReducer } from '../reducers/cycle/reducer'

interface CreatNewCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextProps {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecundsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecundsPassed: (secunds: number) => void
  interrupedCycle: () => void
  creatNewCycle: (data: CreatNewCycleData) => void
}

export const CycleContext = createContext({} as CycleContextProps)

interface CycleContextProviderProps {
  children: ReactNode
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@timer-focus:cycle-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )
  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecundsPassed, setAmountSecundsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stageJSON = JSON.stringify(cycleState)

    localStorage.setItem('@timer-focus:cycle-state-1.0.0', stageJSON)
  }, [cycleState])
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSecundsPassed(secunds: number) {
    setAmountSecundsPassed(secunds)
  }

  function creatNewCycle(data: CreatNewCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addCreatNewCycleAction(newCycle))

    setAmountSecundsPassed(0)
  }

  function interrupedCycle() {
    dispatch(interrupedCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecundsPassed,
        setSecundsPassed,
        interrupedCycle,
        creatNewCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
