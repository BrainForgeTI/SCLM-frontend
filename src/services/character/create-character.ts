import { apiCharacter } from "@/lib/api-manager";
import { CreateCharacterFormType } from "@/schemas/create-character-schema";

export async function createCharacter(characterData: CreateCharacterFormType) {
  // const perCreated = {data:{data: {...characterData, id: "875"}}}
  return apiCharacter.post("/characters/", characterData);
}
