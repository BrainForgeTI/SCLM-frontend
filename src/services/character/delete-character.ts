import { apiCharacter } from "@/lib/api-manager";
import { CharacterDelete } from "@/types/character/character-delete";

export async function deleteCharacter(character: CharacterDelete) {
  return await apiCharacter.delete(`characters/${character.id}`);
}
