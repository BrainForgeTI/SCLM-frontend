import { apiAdventure } from "@/lib/api-manager";

export async function getAdventureById(advenutreId: string) {
  return (await apiAdventure.get(`/adventure/${advenutreId}`)).data
}
