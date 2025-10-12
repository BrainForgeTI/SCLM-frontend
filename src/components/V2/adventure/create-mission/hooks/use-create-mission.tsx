import {
  createMissionSchema,
  CreateMissionType,
} from "@/schemas/create-mission-schema";
import { createMissionService } from "@/services/adventure/create-mission-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UseCreateMissionProps {
  chapterId: string;
}

export const useCreateMission = ({ chapterId }: UseCreateMissionProps) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(createMissionSchema),
    defaultValues: {
      title: "Nova Missão",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateMissionType) =>
      createMissionService(data, chapterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["QUERY_GET_CHAPTERS"] });
      setOpen(false);
    },
  });

  const handleSubmit = form.handleSubmit((data: CreateMissionType) =>
    mutate(data),
  );

  return {
    states: { open, form, isPending },
    actions: { setOpen, handleSubmit },
  };
};
