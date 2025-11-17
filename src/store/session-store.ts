import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TypeSessionStore = {
  id: string | null
  accessToken: string | null
  firstName: string | null
  money: number | null,
  profilePic: string | null
  setSession: (
    firstName: string,
    accessToken: string,
    id: string,
    money: number,
    profilePic: string
  ) => void
  clearSession: () => void
}

export const useSessionStore = create<TypeSessionStore>()(
  persist(
    (set) => ({
      id: null,
      accessToken: null,
      firstName: null,
      money: null,
      profilePic: null,
      setSession: (firstName, accessToken, id, money, profilePic) =>
        set({ firstName, accessToken, id, money, profilePic }),
      clearSession: () =>
        set({
          firstName: null,
          id: null,
          accessToken: null
        }),
    }),
    {
      name: 'Atenium-user-auth-session',
      partialize: (state) => ({ id: state.id, firstName: state.firstName, accessToken: state.accessToken, money: state.money, profilePic: state.profilePic })
    },
  ),
)
