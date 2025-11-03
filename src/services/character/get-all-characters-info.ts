import { apiCharacter } from "@/lib/api-manager";
import { CharacterInfo } from "@/types/character/character-info";

export async function getAllCharactersInfo (){
    return (await apiCharacter.get("/characters")).data.data as CharacterInfo[]
   
}