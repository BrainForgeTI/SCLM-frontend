import { getAllAdventure } from "@/services/adventure/get-all-adventures-service"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

export const useHome = () => {
  const navigate = useNavigate()

  function goToAdventure(adventureId: string) {
    navigate(`/adventure/${adventureId}`)
  }

  const { data: adventures } = useQuery({
    queryKey: ['aaa'],
    queryFn: getAllAdventure
  })

  return {
    states: {
      adventures
    },
    actions: {
      goToAdventure
    }
  }
}
