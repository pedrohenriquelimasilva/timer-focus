import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cycleReducer(stage: CycleState, action: any) {
  // lembrar que o segundo parametro vai depender de quantos estados você está alterando
  switch (action.type) {
    case ActionTypes.CREAT_CYCLE:
      return produce(stage, (draft) => {
        console.log(draft)
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPED_CYCLE: {
      const currentCycleId = stage.cycles.findIndex((cycle) => {
        return cycle.id === stage.activeCycleId
      })

      if (currentCycleId < 0) {
        return stage
      }
      return produce(stage, (draft) => {
        draft.cycles[currentCycleId].interrupedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleId = stage.cycles.findIndex((cycle) => {
        return cycle.id === stage.activeCycleId
      })

      if (currentCycleId < 0) {
        return stage
      }
      return produce(stage, (draft) => {
        draft.cycles[currentCycleId].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return stage
  }
}
