import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";
import { createCharacterSchema } from "@/schemas/create-character-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreateCharacter = () => {
  const {
    register,
    control,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(createCharacterSchema),
    defaultValues: {
      adventure: '',
      characterClass: CharacterClass.WARRIOR,
      characterName: '',
      eyeColor: '#000000',
      eyeIndex: 0,
      gender: CharacterGender.MALE,
      hairColor: '#ffffff',
      hairIndex: 0
    }
  });

  return {
    states: {
      control,
      errors,
    },
    actions: {
      register,
      watch
    },
  };
};
