import { createCharacterSchema } from "@/schemas/create-character-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreateCharacter = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCharacterSchema),
  });

  return {
    states: {
      control,
      errors,
    },
    actions: {
      register,
    },
  };
};
