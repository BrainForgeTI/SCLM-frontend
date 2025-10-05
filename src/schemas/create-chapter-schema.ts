import z from "zod";

export const createMissionSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
});

export const createChapterSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  missions: z.array(createMissionSchema),
});

export type CreateChapterType = z.infer<typeof createChapterSchema>;
export type CreateMissionType = z.infer<typeof createMissionSchema>;
