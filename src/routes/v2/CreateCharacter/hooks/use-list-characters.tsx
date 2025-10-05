import { updateCharacterSchema } from "@/schemas/update-character-schema";
import { deleteCharacter } from "@/services/character/delete-character";
import { getAllCharactersInfo } from "@/services/character/get-all-characters-info";
import { updateCharacter } from "@/services/character/update-character";
import { CharacterDelete } from "@/types/character/character-delete";
import { CharacterInfoUptade } from "@/types/character/character-update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useListInfoCharacter = () => {
    const queryClient = useQueryClient()

    const { register, handleSubmit, setValue, control, watch ,reset, formState:{errors}, trigger} = useForm({
    resolver: zodResolver(updateCharacterSchema),
    defaultValues: {
      eyeIrisIndex: 0,
      characterName: "",
      eyeIrisColor: "#ffffff",
      hairColor: "#ffffff",
      hairIndex: 0,
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
    
      const { mutate: deleteCharacterMutate } = useMutation({
        mutationFn: (data: CharacterDelete) => deleteCharacter(data),
        onSuccess: () => {
          return console.log("Seu personagem foi deleteado.")
        }
      }) 

    const handleSubmitForm = handleSubmit((data) => {mutate(data)})
    return {
    states: {
      characters,
      isLoading,
      isError,
      control,
    },
    actions: {
      register,
      handleSubmitForm,
      setValue,
      updateCharacter: mutate,
      deleteCharacterMutate,
      watch,
      reset,
    },
  };
}