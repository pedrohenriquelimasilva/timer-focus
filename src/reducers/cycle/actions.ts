import { Cycle } from './reducer'

export enum ActionTypes {
  CREAT_CYCLE = 'CREAT_CYCLE',
  INTERRUPED_CYCLE = 'INTERRUPED_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function interrupedCycleAction() {
  return {
    type: ActionTypes.INTERRUPED_CYCLE,
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function addCreatNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREAT_CYCLE,
    payload: {
      newCycle,
    },
  }
}
