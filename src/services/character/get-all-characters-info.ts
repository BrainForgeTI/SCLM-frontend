import { apiCharacter } from "@/lib/api-manager";
import { CharacterInfo } from "@/types/character/character-info";

export async function getAllCharactersInfo (){
    // return (await apiCharacter.get("/characters")).data.data as CharacterInfo[]
    return [{id: "2#5",
            owner: "player1",
            characterName: "Arthas",
            characterClass: "warrior", 
            gender: "male",             
            hairColor: "#a52a2a",
            hairIndex: 1,
            eyeIrisColor: "#00ff00",
            eyeIrisIndex: 0,
            adventure: "Dragon Quest",
            level: 5,
            experience: 350,
            xpToNextLvl: 500,},
        {
            id: "3#5",
            owner: "player1",
            characterName: "Arthas",
            characterClass: "rogue", 
            gender: "male",             
            hairColor: "#a52a2a",
            hairIndex: 0,
            eyeIrisColor: "#00ff00",
            eyeIrisIndex: 0,
            adventure: "Dragon Quest",
            level: 20,
            experience: 350,
            xpToNextLvl: 500,},
        {
            id: "4#5",
            owner: "player1",
            characterName: "Arthas",
            characterClass: "rogue", 
            gender: "male",             
            hairColor: "#a52a2a",
            hairIndex: 0,
            eyeIrisColor: "#00ff00",
            eyeIrisIndex: 0,
            adventure: "Dragon Quest",
            level: 20,
            experience: 350,
            xpToNextLvl: 500,},
        {
            id: "5#5",
            owner: "player1",
            characterName: "Arthas",
            characterClass: "rogue", 
            gender: "female",             
            hairColor: "#a52a2a",
            hairIndex: 0,
            eyeIrisColor: "#00ff00",
            eyeIrisIndex: 0,
            adventure: "Dragon Quest",
            level: 20,
            experience: 350,
            xpToNextLvl: 500,}
            
        ] as  CharacterInfo[]
}