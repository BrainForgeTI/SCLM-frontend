import {
  createChapterSchema,
  CreateChapterType,
} from "@/schemas/create-chapter-schema";
import { createChapterService } from "@/services/adventure/create-chapter-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";

export const useCreateChapter = () => {
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      missions: [],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "missions",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateChapterType) => {
      console.log("oi");
      return createChapterService(data, id);
    },
  });

  const handleSubmit = form.handleSubmit((data: CreateChapterType) => {
    mutate(data);
  });

  const addField = () => {
    fieldArray.append({ title: "" });
  };

  const removeField = (index: number) => {
    fieldArray.remove(index);
  };

  return {
    states: {
      form,
      fieldArray,
      isPending,
    },
    actions: {
      handleSubmit,
      addField,
      removeField,
    },
  };
};
