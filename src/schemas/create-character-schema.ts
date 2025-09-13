import { CharacterClass } from "@/enums/class";
import { Gender } from "@/enums/gender";
import z from "zod";

export const createCharacterSchema = z.object({
  characterName: z.string().min(1, "Nome obrigatório"),
  adventure: z.uuid().optional(),
  characterClass: z.enum(CharacterClass),
  gender: z.enum(Gender, "Selecione um gênero"),
  hairIndex: z.number(),
  hairColor: z.string(),
  eyeIndex: z.string(),
  eyeColor: z.string(),
});

export type CreateCharacterFormType = z.infer<typeof createCharacterSchema>;
