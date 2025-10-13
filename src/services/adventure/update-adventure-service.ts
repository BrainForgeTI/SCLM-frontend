import { apiAdventure } from "@/lib/api-manager";
import { CreateAdventureFormType } from "@/schemas/create-adventure-schema";

export async function updateAdventureService(
  data: CreateAdventureFormType,
  adventureId?: string,
) {
  return await apiAdventure.put(`/adventure/${adventureId}`, data);
}
