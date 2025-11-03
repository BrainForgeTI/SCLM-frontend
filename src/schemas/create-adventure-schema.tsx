import z from "zod";

export const createAdventureSchema = z.object({
  nameAdventure: z.string().min(1, "Nome é obrigatório"),
  characterId: z.string().optional(),
  description: z.string().min(1, "Descrição é obrigatória"),
  bgPrimaryColor: z.string(),
  bgSecundaryColor: z.string(),
});

export type CreateAdventureFormType = z.infer<typeof createAdventureSchema>;
