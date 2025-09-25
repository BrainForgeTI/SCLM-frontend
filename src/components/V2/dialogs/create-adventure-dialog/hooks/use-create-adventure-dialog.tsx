import { createAdventureSchema } from "@/schemas/create-adventure-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreateAdventureDialog = () => {
  const forms = useForm({
    defaultValues: {
      bgPrimaryColor: "#ffffff",
      bgSecundaryColor: "#ffffff",
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
