import { getAllCharactersInfo } from "@/services/character/get-all-characters-info";
import { updateCharacter } from "@/services/character/update-character";
import { CharacterInfoUptade } from "@/types/character/character-update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useListInfoCharacter = () => {
    const queryClient = useQueryClient()
    const { data: characters, isLoading, isError} = useQuery({
    queryKey: ['characters'],
    queryFn: getAllCharactersInfo
    })
    
    const { mutate } = useMutation({
      mutationFn: (data: CharacterInfoUptade) => updateCharacter(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey:[characters]})
      }    });

    
    return {
    states: {
      characters,
      isLoading,
      isError
    },
    actions: {
      updateCharacter: mutate,
    },
  };
}