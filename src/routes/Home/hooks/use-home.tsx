import { getAllAdventure } from "@/services/adventure/get-all-adventures-service"
import { useQuery } from "@tanstack/react-query"

export const useHome = () => {
  const { data: adventures } = useQuery({
    queryKey: ['aaa'],
    queryFn: getAllAdventure
  })

  return {
    states: {
      adventures
    }
  }
}
