import { userRefreshTokenService } from "@/services/user-refresh-token-service"
import { useQuery } from "@tanstack/react-query"
import { PropsWithChildren } from "react"


export const UserWrapper = ({ children }: PropsWithChildren) => {

  const { } = useQuery({
    queryKey: ["get_user_data"],
    queryFn: userRefreshTokenService
  })

  return children
}
