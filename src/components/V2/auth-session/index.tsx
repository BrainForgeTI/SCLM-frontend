import { PropsWithChildren, useEffect, useState } from "react"
import { useSessionStore } from "../../../store/session-store"
import { useApi } from "../../../hooks/useApi"

export const AuthSession = ({ children }: PropsWithChildren) => {
  const [validSession, setValidSession] = useState(false)
  const api = useApi()
  const sessionStore = useSessionStore()

  const handleRefreshToken = async () => {
    const result = await api.refreshToken()
    console.log(result)
  }

  const loading = () => {
    return <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-50 h-50 rounded-full bg-blue-600 blur-2xl animate-pulse"></div>
    </div>
  }

  useEffect(() => {
    handleRefreshToken()
  }, [])
  
  return validSession ? <>{children}</> : loading()
}