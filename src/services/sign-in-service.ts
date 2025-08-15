
import { apiAuth } from "@/lib/api-manager"
import { SignInType } from "@/schemas/sign-in-schema"

export const signInService = async (signInData: SignInType) => {
  return await apiAuth.post('auth/login', signInData)
}
