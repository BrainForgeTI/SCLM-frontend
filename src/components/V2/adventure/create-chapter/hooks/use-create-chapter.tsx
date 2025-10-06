import {
  createChapterSchema,
  CreateChapterType,
} from "@/schemas/create-chapter-schema";
import { createChapterService } from "@/services/adventure/create-chapter-service";
import { getAdventureById } from "@/services/adventure/get-adventure-by-id-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";

export const useCreateChapter = () => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "Novo Capítulo",
      missions: [
        {
          title: "Nova Missão",
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "missions",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateChapterType) => {
      return createChapterService(data, id);
    },
    onSuccess: () => {
      setOpen(false);
      form.reset();
    },
  });

  const handleSubmit = form.handleSubmit((data: CreateChapterType) => {
    mutate(data);
  });

  const addField = () => {
    fieldArray.append({ title: "" });
  };

  const removeField = (index: number) => {
    if (fieldArray.fields.length > 1) {
      fieldArray.remove(index);
    }
  };

  return {
    states: {
      form,
      fieldArray,
      isPending,
      open,
    },
    actions: {
      handleSubmit,
      addField,
      removeField,
      setOpen,
    },
  };
};
