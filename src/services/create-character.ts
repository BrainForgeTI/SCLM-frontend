import { CreateCharacterFormType } from "@/schemas/create-character-schema";


export async function createCharacter(characterData: CreateCharacterFormType) {
  const token = localStorage.getItem("token");
  fetch("http://localhost:3002/characters", {
    method: "POST",
    body: JSON.stringify(characterData),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });
  return true;
}
