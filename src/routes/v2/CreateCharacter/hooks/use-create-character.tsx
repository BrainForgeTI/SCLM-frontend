import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";
import {
  CreateCharacterFormType,
  createCharacterSchema,
} from "@/schemas/create-character-schema";
import { createCharacter } from "@/services/create-character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useCreateCharacter = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createCharacterSchema),
    defaultValues: {
      adventure: "",
      characterClass: CharacterClass.WARRIOR,
      characterName: "",
      eyeIrisColor: "#000000",
      eyeIrisIndex: 0,
      gender: CharacterGender.MALE,
      hairColor: "#ffffff",
      hairIndex: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: CreateCharacterFormType) => createCharacter(data),
  });

  const handleSubmitForm = handleSubmit((data) => mutate(data));

  return {
    states: {
      control,
      errors,
    },
    actions: {
      register,
      watch,
      handleSubmitForm,
    },
  };
};
