import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";
import z from "zod";

export const createCharacterSchema = z.object({
  characterName: z.string().min(1, "Nome obrigatório"),
  adventure: z.string().optional(),
  characterClass: z.enum(CharacterClass),
  gender: z.enum(CharacterGender, "Selecione um gênero"),
  hairIndex: z.number(),
  hairColor: z.string(),
  eyeIrisIndex: z.number(),
  eyeIrisColor: z.string(),
});

export type CreateCharacterFormType = z.infer<typeof createCharacterSchema>;
