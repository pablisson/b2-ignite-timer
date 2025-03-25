import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  setCycles: Dispatch<SetStateAction<Cycle[]>>
  activeCycleId: string | null
  setActiveCycleId: Dispatch<SetStateAction<string | null>>
  amountSecondsPassed: number
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>
  activeCycle: Cycle | undefined
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
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        setCycles,
        activeCycleId,
        setActiveCycleId,
        amountSecondsPassed,
        setAmountSecondsPassed,
        activeCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
