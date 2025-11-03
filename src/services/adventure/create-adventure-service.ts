import { apiAdventure } from "@/lib/api-manager";
import { CreateAdventureFormType } from "@/schemas/create-adventure-schema";

export async function createAdventureService(adventureData: CreateAdventureFormType) {
  return await apiAdventure.post('adventure', adventureData)
}
