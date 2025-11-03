
import z from "zod";

export const updateCharacterSchema = z.object({
  id:z.string(),
  characterName: z.string().min(1, "Nome obrigatório"),
  hairIndex: z.number(),
  hairColor: z.string(),
  eyeIrisIndex: z.number(),
  eyeIrisColor: z.string(),
});

export type UpdateCharacterFormType = z.infer<typeof updateCharacterSchema>;
