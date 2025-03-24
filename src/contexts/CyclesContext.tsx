import { createContext, ReactNode, useState } from "react"

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  markCycleAsFinished: () => void
  handleFinishCycle: () => Cycle | undefined
  handleInterruptCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext<CycleContextType>(
  {} as CycleContextType,
)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCycleAsFinished() {
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
  }

  function handleFinishCycle(): Cycle | undefined {
    let finishedCycle: Cycle | undefined

    setCycles((prevCycles) =>
      prevCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          finishedCycle = {
            ...cycle,
            finishedDate: new Date(),
          }
          return finishedCycle
        }

        return cycle
      }),
    )

    setActiveCycleId(null)
    return finishedCycle
  }

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

  /*
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
  }
*/

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycleId,
        activeCycle,
        handleFinishCycle,
        markCycleAsFinished,
        handleInterruptCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
