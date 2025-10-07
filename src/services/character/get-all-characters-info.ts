import { apiCharacter } from "@/lib/api-manager";
import { CharacterInfo } from "@/types/character/character-info";

export async function getAllCharactersInfo() {
  const data = (await apiCharacter.get("/characters")).data
    .data as CharacterInfo[];
  return data;
}
