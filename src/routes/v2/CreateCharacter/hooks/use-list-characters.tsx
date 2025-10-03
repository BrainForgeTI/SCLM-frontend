import { updateCharacterSchema } from "@/schemas/update-character-schema";
import { getAllCharactersInfo } from "@/services/character/get-all-characters-info";
import { updateCharacter } from "@/services/character/update-character";
import { CharacterInfoUptade } from "@/types/character/character-update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useListInfoCharacter = () => {
    const queryClient = useQueryClient()

    const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(updateCharacterSchema),
    defaultValues: {
      eyeIrisIndex: 0,
      },
    });


    const { data: characters, isLoading, isError} = useQuery({
    queryKey: ['characters'],
    queryFn: getAllCharactersInfo
    })
    
    const { mutate } = useMutation({
      mutationFn: (data: CharacterInfoUptade) => updateCharacter(data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey:['characters']})
        console.log(data)
      }    });

    const handleSubmitForm = handleSubmit((data) => mutate(data));
    return {
    states: {
      characters,
      isLoading,
      isError,
    },
    actions: {
      register,
      handleSubmitForm,
      setValue,
      updateCharacter: mutate,
    },
  };
}