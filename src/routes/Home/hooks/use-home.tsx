import { getAllAdventure } from "@/services/adventure/get-all-adventures-service";
import { useAdventureStore } from "@/store/adventure-store";
import { Adventure } from "@/types/adventure/adventure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useHome = () => {
  const { setAdventure } = useAdventureStore();
  const navigate = useNavigate();

  const startAdventure = (adventure: Adventure) => {
    setAdventure(adventure);
    navigate(`/adventure/${adventure.id}/home`);
  };

  const { data: adventures } = useQuery({
    queryKey: ["aaa"],
    queryFn: getAllAdventure,
  });

  return {
    states: {
      adventures,
    },
    actions: {
      startAdventure,
    },
  };
};
