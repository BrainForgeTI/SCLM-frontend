import { Gender } from "@/enums/gender";
import z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10 // 10mb - confirmar com pedro
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg'];

export const SignUpSchema = z.object({
  firstStep: z.object({
    firstName: z.string().min(1, "Preencha seu nome"),
    lastName: z.string().min(1, "Preencha seu nome"),
    userName: z.string().min(1, "Preencha seu usuário")
  }),
  secondStep: z.object({
    image: z.instanceof(File, { message: "Selecione uma imagem" })
      .refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
      }, 'A imagem precisa ter até 10MB')
      .refine((file) => {
        return ACCEPTED_FILE_TYPES.includes(file.type)
      }, 'A imagem precisa ser PNG ou JPG'),
    birthDate: z.date("Selecione uma data válida"),
    gender: z.string().nonempty("Selecione um gênero")
  }),
  thirdStep: z.object({
    email: z.email("Preencha um e-mail válido"),
    password: z.string(),
    confirmPassword: z.string()
  })
})
  .superRefine(({ thirdStep }, ctx) => {
    if (thirdStep.password !== thirdStep.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["thirdStep", "password"],
      })
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["thirdStep", "confirmPassword"],
      })
    }
  })

export type SignUpType = z.infer<typeof SignUpSchema>
