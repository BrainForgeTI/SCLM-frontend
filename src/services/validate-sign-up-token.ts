import { apiAuth } from "@/lib/api-manager";

export const validateSignUpToken = async (email: string, token: string) => {
  return await apiAuth.post('auth/validate-token', { email, token })
}
