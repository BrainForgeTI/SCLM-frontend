import { apiAdventure } from "@/lib/api-manager";

export async function getNotAssociatedAdventures() {
  return (await apiAdventure.get("/adventure/no-associated")).data.data
}
