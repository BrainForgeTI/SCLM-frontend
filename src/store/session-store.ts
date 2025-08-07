import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TypeSessionStore = {
  id: string | null
  accessToken: string | null
  firstName: string | null
  setSession: (
    userName: string,
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
      setSession: (firstName, id, accessToken) =>
        set({ firstName, accessToken, id, }),
      clearSession: () =>
        set({
          firstName: null,
          id: null,
        }),
    }),
    {
      name: 'auth-token',
      partialize: (state) => ({ id: state.id, firstName: state.firstName })
    },
  ),
)
