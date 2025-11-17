import { getMetrics } from "@/services/adventure/get-metrics";
import { useAdventureStore } from "@/store/adventure-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAdventure = () => {
  const adventure = useAdventureStore((state) => state.adventure);

  const { data } = useQuery({
    queryKey: ['get_metrics'],
    queryFn: () => getMetrics()
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  return {
    states: {
      adventure,
      data
    },
    actions: {}
  }
}
