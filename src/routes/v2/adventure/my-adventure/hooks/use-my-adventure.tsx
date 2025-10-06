import { useAdventureStore } from "@/store/adventure-store";

export const useMyAdventure = () => {
  const adventure = useAdventureStore((state) => state.adventure);

  return { states: { adventure } };
};
