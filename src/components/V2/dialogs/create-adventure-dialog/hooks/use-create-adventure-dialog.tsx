import { CreateAdventureFormType, createAdventureSchema } from "@/schemas/create-adventure-schema";
import { createAdventureService } from "@/services/adventure/create-adventure-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useCreateAdventureDialog = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const forms = useForm({
    defaultValues: {
      bgPrimaryColor: "#EC4899",
      bgSecundaryColor: "#8B5CF6",
      characterId: "",
      description: "",
      nameAdventure: "Nova Aventura",
    },
    resolver: zodResolver(createAdventureSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAdventureService,
    onSuccess: () => {
      setModalOpen(false)
    }
  })

  const handleSubmit = forms.handleSubmit((data: CreateAdventureFormType) => {
    mutate(data)
  })

  function handleModal(value: boolean) {
    if (value) {
      forms.clearErrors();
    }
    setModalOpen(value)
  }

  return {
    states: {
      forms,
      modalOpen,
      isPending
    },
    actions: {
      handleModal,
      handleSubmit
    }
  };
};
