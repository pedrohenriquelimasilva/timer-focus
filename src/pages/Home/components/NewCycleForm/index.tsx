import { FormContainer, TaskInput, MinutesAmountInput } from './style'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../../context/CycleContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="To-do list" />
        <option value="Timer" />
        <option value="Hello, Wolrd" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        step={5}
        min={5}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
