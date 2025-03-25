import { zodResolver } from "@hookform/resolvers/zod"
import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm } from "react-hook-form"
import * as zod from "zod"
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles"
import { NewCycleForm } from "./Components/NewCycleForm"
import { useCycles } from "../../hooks/useCycles"
import { CountDown } from "./Components/CountDown"
import { useEffect } from "react"
import { Cycle } from "../../contexts/CyclesContext"
import { differenceInSeconds } from "date-fns"

const newCycleFromValidationScheme = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "Informe um valor entre 5 e 60")
    .max(60, "Informe um valor entre 5 e 60"),
})

type NewCycleFormData = zod.infer<typeof newCycleFromValidationScheme>

export function Home() {
  const {
    activeCycle,
    setActiveCycleId,
    setCycles,
    setAmountSecondsPassed,
    amountSecondsPassed,
    activeCycleId,
  } = useCycles()

  function handleInterruptCycle() {
    setCycles((prevCycles) =>
      prevCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      }),
    )

    setActiveCycleId(null)
  }

  const useNewCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFromValidationScheme),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = useNewCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = new Date().getTime().toString()
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((prevCycles) => [...prevCycles, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  const hasActiveCycle = !!activeCycle
  const totalSeconds = hasActiveCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = hasActiveCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  const task = watch("task")
  const isSubmitDisabled = !task

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        const isFinashedCycle = secondsDifference >= totalSeconds
        if (isFinashedCycle) {
          setCycles((prevCycles) =>
            prevCycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              }

              return cycle
            }),
          )
          clearInterval(interval)

          setActiveCycleId(null)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCycle, totalSeconds, activeCycleId])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
    document.title = `${document.title} Pomodoro `
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...useNewCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="submit">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Iniciar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
