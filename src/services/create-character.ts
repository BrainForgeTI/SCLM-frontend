import { CreateCharacterFormType } from "@/schemas/create-character-schema";

export async function createCharacter(characterData: CreateCharacterFormType) {
  fetch("http://localhost:3000/api", {
    method: "post",
    body: JSON.stringify(characterData),
  });
  return true;
}
