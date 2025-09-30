import { apiAdventure } from "@/lib/api-manager";
import { Adventure } from "@/types/adventure/adventure";

export async function getAllAdventure() {
  return (await apiAdventure.get('/adventure')).data.data as Adventure[]
}
