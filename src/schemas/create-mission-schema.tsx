import z from "zod";

export const createMissionSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
});

export type CreateMissionType = z.infer<typeof createMissionSchema>;
