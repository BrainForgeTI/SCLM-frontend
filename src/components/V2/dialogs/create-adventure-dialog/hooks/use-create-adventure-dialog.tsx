import { createAdventureSchema } from "@/schemas/create-adventure-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreateAdventureDialog = () => {
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

  return {
    states: {
      forms,
    },
  };
};
