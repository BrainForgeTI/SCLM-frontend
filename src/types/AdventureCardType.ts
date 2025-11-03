import { ChapterType } from "./adventure/ChapterType"
import { Character } from "./CharacterType"

export type AdventureCardType = {
    id?: string
    image: File | string | null
    colorFrom: string
    colorTo: string
    title: string
    character: Character | null
    progress: number
    chapters: ChapterType[]
}