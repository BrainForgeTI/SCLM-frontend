import { Character } from "./CharacterType"

export type CreateAdventureType = {
    image: File | null
    colorFrom: string
    colorTo: string
    title: string
    character?: Character
    progress: number
}