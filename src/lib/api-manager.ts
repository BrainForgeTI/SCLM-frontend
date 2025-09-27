import axios from "axios";

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE,
  timeout: 30000,
})

export const apiAdventure = axios.create({
  baseURL: import.meta.env.VITE_ADVENTURE_SERVICE,
  timeout: 30000,
})

export const apiCharacter = axios.create({
  baseURL: import.meta.env.VITE_CHARACTER_SERVICE,
  timeout: 30000,
})
