import { apiCharacter } from "@/lib/api-manager";
import { CharacterInfoUptade } from "@/types/character/character-update";

export async function updateCharacter(data: CharacterInfoUptade) {
  return await apiCharacter.put(`characters/${data.id}/appearance`, {
    characterName: data.characterName,
    hairColor: data.hairColor,
    hairIndex: data.hairIndex,
    eyeIrisColor: data.eyeIrisColor,
    eyeIrisIndex: data.eyeIrisIndex,
  });
}
