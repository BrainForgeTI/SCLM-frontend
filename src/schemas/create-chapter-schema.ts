import z from "zod";
import { createMissionSchema } from "./create-mission-schema";

export const createChapterSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  missions: z
    .array(createMissionSchema)
    .min(1, "Crie uma ou mais missões (Limite de 15)"),
});

export type CreateChapterType = z.infer<typeof createChapterSchema>;
