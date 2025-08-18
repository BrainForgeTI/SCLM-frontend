import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.email("Preencha um Email válido"),
  password: z.string().min(1, 'Preencha uma senha válida')
})


export type SignInType = z.infer<typeof SignInSchema>
