import { apiAuth } from "@/lib/api-manager"

export const validateEmail = async (email: string) => {
  return await apiAuth.post('/auth/validate-email', { email })
}
