import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TypeSessionStore = {
  id: string | null
  accessToken: string | null
  firstName: string | null
  setSession: (
    firstName: string,
    accessToken: string,
    id: string,
  ) => void
  clearSession: () => void
}

export const useSessionStore = create<TypeSessionStore>()(
  persist(
    (set) => ({
      id: null,
      accessToken: null,
      firstName: null,
      setSession: (firstName, accessToken, id) =>
        set({ firstName, accessToken, id }),
      clearSession: () =>
        set({
          firstName: null,
          id: null,
          accessToken: null
        }),
    }),
    {
      name: 'athenium-user-auth-session',
      partialize: (state) => ({ id: state.id, firstName: state.firstName, access_token: state.accessToken })
    },
  ),
)
