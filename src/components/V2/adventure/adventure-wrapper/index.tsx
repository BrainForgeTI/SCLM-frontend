import { getAdventureById } from "@/services/adventure/get-adventure-by-id-service";
import { useAdventureStore } from "@/store/adventure-store";
import { useQuery } from "@tanstack/react-query";
import { cloneElement, ReactElement, useEffect } from "react";
import { useParams } from "react-router";

interface AdventureChildrenProps {
  isLoading: boolean;
}

interface AdventureWrapperProps {
  children: ReactElement<AdventureChildrenProps>;
}

export const AdventureWrapper = ({ children }: AdventureWrapperProps) => {
  const setAdventure = useAdventureStore((state) => state.setAdventure);
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["QUERY_GET_CHAPTERS"],
    queryFn: () => getAdventureById(id),
  });

  useEffect(() => {
    if (data) {
      console.log("wrapper");
      console.log(data);
      setAdventure(data);
    }
  }, [data, setAdventure]);

  return cloneElement(children, { isLoading });
};
