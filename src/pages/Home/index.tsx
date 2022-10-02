import { Play, HandPalm } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  StartButtonSubmitted,
  StopButtonSubmitted,
} from './style'
import { FormProvider, useForm } from 'react-hook-form'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CycleContext } from '../../context/CycleContext'

// Ambientes de formularos podem ser por base de controlled e uncontrolled, tendo em vista que cada um tem suia caracteristica e motivo para uso. Controlled é quando monitoramos os valores em tempo real no código, isso é, usando o useState, useEffect ou algo parecido, com isso ganhamos dinamismo em mostrar algo na tela, mas podemos perder performace se tiver varios campos. Já o uncrotrolled é mais usado para campos que não precisamos manter um controle ideal, ou seja, são coisas que apenas precisamos pegar a informação, com ele temos um ganho de performace

// possivel validação de erro com o zod
const validatedFormSubmitSchema = zod.object({
  task: zod.string().min(1, 'Insira uma tarefa.'), // setando validação para string
  minutesAmount: zod
    .number()
    .min(5, 'No mínimo 5 minustos')
    .max(60, 'O máximo de tempo é 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof validatedFormSubmitSchema> // função typescript que tipa as variaveis normais de um código.

export function Home() {
  const { creatNewCycle, activeCycle, interrupedCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(validatedFormSubmitSchema), // biblioteca de validação dos campos
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreatNewCycle(data: NewCycleFormData) {
    creatNewCycle(data)
    reset()
  }

  // criar variaveis auxiliares é bom para legibilidade do codigo
  const task = watch('task') // usa o useState por baixo dos panos
  const isSubmitDisabled = !task

  // prop drilling é o conceito onde um component recebe muitas propriedades herdadas do pai, fazendo uma chamada muito massante
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopButtonSubmitted onClick={interrupedCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopButtonSubmitted>
        ) : (
          <StartButtonSubmitted disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButtonSubmitted>
        )}
      </form>
    </HomeContainer>
  )
}
