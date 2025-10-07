import {
  createMissionSchema,
  CreateMissionType,
} from "@/schemas/create-mission-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useCreateMission = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createMissionSchema),
    defaultValues: {
      title: "Nova Missão",
    },
  });

  const handleSubmit = form.handleSubmit((data: CreateMissionType) =>
    console.log(data),
  );

  return {
    states: { open, form },
    actions: { setOpen, handleSubmit },
  };
};
