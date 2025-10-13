import { apiAdventure } from "@/lib/api-manager";

export async function deleteAdventureService(adventureId?: string) {
  return await apiAdventure.delete(`/adventure/${adventureId}`);
}
