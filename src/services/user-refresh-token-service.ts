import { apiAuth } from "@/lib/api-manager"

export const userRefreshTokenService= async () => {
  return await apiAuth.get("/auth/refresh-token")
}
