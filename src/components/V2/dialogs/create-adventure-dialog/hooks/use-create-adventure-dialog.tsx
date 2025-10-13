import {
  CreateAdventureFormType,
  createAdventureSchema,
} from "@/schemas/create-adventure-schema";
import { createAdventureService } from "@/services/adventure/create-adventure-service";
import { deleteAdventureService } from "@/services/adventure/delete-adventure-service";
import { updateAdventureService } from "@/services/adventure/update-adventure-service";
import { Adventure } from "@/types/adventure/adventure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UseCreateAdventureDialog {
  adventure?: Adventure;
}

export const useCreateAdventureDialog = ({
  adventure,
}: UseCreateAdventureDialog) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  const forms = useForm({
    defaultValues: {
      bgPrimaryColor: adventure?.bgPrimaryColor ?? "#EC4899",
      bgSecundaryColor: adventure?.bgSecundaryColor ?? "#8B5CF6",
      characterId: "",
      description: adventure?.description ?? "",
      nameAdventure: adventure?.nameAdventure ?? "Nova Aventura",
    },
    resolver: zodResolver(createAdventureSchema),
  });

  const { mutate: mutateCreateAdventure, isPending: isPendingCreateAdventure } =
    useMutation({
      mutationFn: createAdventureService,
      onSuccess: () => {
        setModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["QUERY_GET_ADVENTURES"] });
      },
    });

  const { mutate: mutateUpdateAdventure, isPending: isPendingUpdateAdventure } =
    useMutation({
      mutationFn: (data: CreateAdventureFormType) =>
        updateAdventureService(data, adventure?.id),
      onSuccess: () => {
        setModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["QUERY_GET_ADVENTURES"] });
      },
    });

  const { mutate: mutateDeleteAdventure, isPending: isPendingDeleteAdventure } =
    useMutation({
      mutationFn: (adventureId?: string) => deleteAdventureService(adventureId),
      onSuccess: () => {
        setModalConfirmOpen(false);
        setModalOpen(false);
      },
    });

  const handleSubmit = forms.handleSubmit((data: CreateAdventureFormType) => {
    if (adventure?.id) {
      mutateUpdateAdventure(data);
    } else {
      mutateCreateAdventure(data);
    }
  });

  const handleDeleteAdventure = () => {
    mutateDeleteAdventure(adventure?.id);
  };

  function handleModal(value: boolean) {
    if (value) {
      forms.clearErrors();
    }
    setModalOpen(value);
  }

  const isPending = isPendingCreateAdventure || isPendingUpdateAdventure;

  return {
    states: {
      forms,
      modalOpen,
      isPending,
      modalConfirmOpen,
      isPendingDeleteAdventure,
    },
    actions: {
      handleModal,
      handleSubmit,
      setModalConfirmOpen,
      handleDeleteAdventure,
    },
  };
};
