import { createContext, Dispatch, SetStateAction } from "react"
import { AdventureCardType } from "../../types/AdventureCardType"

export type AdventureContextType = {
    adventure: AdventureCardType | null
    setAdventure: Dispatch<SetStateAction<AdventureCardType | null>>
    leaveAdventure: () => void
    joinAdventure: (adventure: AdventureCardType) => void
}

export const AdventureContext = createContext<AdventureContextType>(null!);