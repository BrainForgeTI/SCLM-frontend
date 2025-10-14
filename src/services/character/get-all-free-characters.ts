import { apiCharacter } from "@/lib/api-manager";
import { CharacterInfo } from "@/types/character/character-info";

export async function getAllFreeCharacters() {
  return (await apiCharacter.get("/characters/no-associated")).data
    .data as CharacterInfo[];
}
