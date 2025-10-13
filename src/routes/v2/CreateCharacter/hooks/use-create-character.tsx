import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";
import {
  CreateCharacterFormType,
  createCharacterSchema,
} from "@/schemas/create-character-schema";
import { getAllAdventure } from "@/services/adventure/get-all-adventures-service";
import { createCharacter } from "@/services/character/create-character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const useCreateCharacter = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    register,
    control,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
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

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateCharacterFormType) => createCharacter(data),
    onSuccess: () => {
      navigate("/character");
    },
    onError: () => {
      setOpen(true);
    },
  });
  const { data: adventures } = useQuery({
    queryKey: ["aaa"],
    queryFn: getAllAdventure,
  });
  const handleSubmitForm = handleSubmit((data) => mutate(data));

  return {
    states: {
      control,
      errors,
      isPending,
      open,
      adventures,
    },
    actions: {
      register,
      watch,
      handleSubmitForm,
      setValue,
      setOpen,
    },
  };
};
