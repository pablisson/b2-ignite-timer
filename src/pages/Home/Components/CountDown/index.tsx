import { CountdownContainer, Separator } from "./styles"
import { useCycles } from "../../../../hooks/useCycles"

export function CountDown() {
  const { activeCycle, amountSecondsPassed } = useCycles()
  const hasActiveCycle = !!activeCycle
  const totalSeconds = hasActiveCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = hasActiveCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
