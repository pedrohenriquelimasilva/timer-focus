import { CountDownContainer, Separator } from './style'
import { useEffect, useContext } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../../../context/CycleContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecundsPassed,
    setSecundsPassed,
  } = useContext(CycleContext)

  const totalSecunds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    // lembrar que o useEffect pode ser substituido por uma renderização padrão do usestate
    // listagem de itens ao vivo pode ser feita com um filter e selecionando com incluide ou id
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secundsAmountDiferrence = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secundsAmountDiferrence >= totalSecunds) {
          markCurrentCycleAsFinished()
          setSecundsPassed(totalSecunds)
          clearInterval(interval)
        } else {
          setSecundsPassed(secundsAmountDiferrence)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSecunds,
    activeCycleId,
    setSecundsPassed,
    markCurrentCycleAsFinished,
  ])

  const currentSecunds = activeCycle ? totalSecunds - amountSecundsPassed : 0

  const minutesAmount = Math.floor(currentSecunds / 60)
  const secundsAmount = currentSecunds % 60

  const minuts = String(minutesAmount).padStart(2, '0')
  const secunds = String(secundsAmount).padStart(2, '0')

  // coundwon no title da aplicação
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minuts}:${secunds}`
    } else {
      document.title = 'Timer Focus'
    }
  }, [minuts, secunds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minuts[0]}</span>
      <span>{minuts[1]}</span>
      <Separator>:</Separator>
      <span>{secunds[0]}</span>
      <span>{secunds[1]}</span>
    </CountDownContainer>
  )
}
