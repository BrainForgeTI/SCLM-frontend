import { getAllCharactersInfo } from "@/services/character/get-all-characters-info";
import { useQuery } from "@tanstack/react-query";

export const useListInfoCharacter = () => {

    const { data: characters} = useQuery({
    queryKey: ['aaa'],
    queryFn: getAllCharactersInfo
    }) 
    return {
    states: {
      characters
    },
    actions: {
   
    },
  };
}