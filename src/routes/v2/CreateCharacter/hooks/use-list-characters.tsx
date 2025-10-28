import { updateCharacterSchema } from "@/schemas/update-character-schema";
import { deleteCharacter } from "@/services/character/delete-character";
import { getAllCharactersInfo } from "@/services/character/get-all-characters-info";
import { updateCharacter } from "@/services/character/update-character";
import { CharacterDelete } from "@/types/character/character-delete";
import { CharacterInfo } from "@/types/character/character-info";
import { CharacterInfoUptade } from "@/types/character/character-update";
import { trackEvent } from "@/utils/track-event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useListInfoCharacter = () => {
  const queryClient = useQueryClient();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterInfo>();
  const [selectedCharacterDelete, setSelectedCharacterDelete] =
    useState<CharacterInfo>();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(updateCharacterSchema),
    defaultValues: {
      eyeIrisIndex: 0,
      characterName: "",
      eyeIrisColor: "#ffffff",
      hairColor: "#ffffff",
      hairIndex: 0,
    },
  });

  const {
    data: characters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["characters"],
    queryFn: getAllCharactersInfo,
  });

  const { mutate } = useMutation({
    mutationFn: (data: CharacterInfoUptade) => updateCharacter(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      setSelectedCharacter(undefined);
      console.log(data);
    },
  });

  const { mutate: deleteCharacterMutate } = useMutation({
    mutationFn: (data: CharacterDelete) => deleteCharacter(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      setSelectedCharacterDelete(undefined);
      return console.log(data);
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    mutate(data);
    if (data.id) {
      trackEvent("personagem_editado", {
        personagem_id: data.id,
      });
    }
  });
  return {
    states: {
      characters,
      isLoading,
      isError,
      control,
      selectedCharacter,
      selectedCharacterDelete,
    },
    actions: {
      register,
      handleSubmitForm,
      setValue,
      updateCharacter: mutate,
      deleteCharacterMutate,
      watch,
      reset,
      setSelectedCharacter,
      setSelectedCharacterDelete,
    },
  };
};
