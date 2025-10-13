import { apiAdventure } from "@/lib/api-manager";
import { Adventure } from "@/types/adventure/adventure";

export async function getAdventureById(advenutreId?: string) {
  const data = (await apiAdventure.get(`/adventure/${advenutreId}`)).data.data;
  return data as Adventure;
}
