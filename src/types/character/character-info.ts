import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";

export interface CharacterInfo { 
    id: string,
    owner: string,
    characterName: string,
    characterClass: CharacterClass,
    gender: CharacterGender,
    hairColor: string,
    hairIndex: number,
    eyeIrisColor: string,
    eyeIrisIndex: number,
    adventure?: string,
    level: number,
    experience?: number,
    currentExperience?:number,
    maxExperience?:number,
}
