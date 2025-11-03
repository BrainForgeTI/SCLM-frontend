import { useSessionStore } from "@/store/session-store";
import axios, { AxiosInstance } from "axios";



function addAccessTokenInterceptorToInstance(
  api: AxiosInstance
) {
  const interceptTokenHeader = api.interceptors.request.use(async (config) => {
    const { accessToken } = useSessionStore.getState()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  })

  return () => {
    api.interceptors.request.eject(interceptTokenHeader)
  }
}


export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE,
  timeout: 30000,
})
addAccessTokenInterceptorToInstance(apiAuth)

export const apiAdventure = axios.create({
  baseURL: import.meta.env.VITE_ADVENTURE_SERVICE,
  timeout: 30000,
})
addAccessTokenInterceptorToInstance(apiAdventure)

export const apiCharacter = axios.create({
  baseURL: import.meta.env.VITE_CHARACTER_SERVICE,
  timeout: 30000,
})
addAccessTokenInterceptorToInstance(apiCharacter)
