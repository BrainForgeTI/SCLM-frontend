import { getAdventureById } from "@/services/adventure/get-adventure-by-id-service"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

export const useMyAdventure = () => {
  const { id } = useParams()

  const { data: adventure } = useQuery({
    queryKey: ['kdjfd'],
    queryFn: () => getAdventureById(id ?? ''),
    enabled: !!id,
  })

  console.log(id)
}
