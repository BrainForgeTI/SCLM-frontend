import { createNotebook } from "@/services/adventure/create-notebook";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useNotebook = () => {
  const [notebookData, setNotebookData] = useState("");

  const { missionId } = useParams();

  const { mutate } = useMutation({
    mutationFn: (missionId: string) => createNotebook(missionId),
    onSuccess: (data) => {
      setNotebookData(data.content);
    },
  });

  useEffect(() => {
    if (missionId) {
      mutate(missionId);
    }
  }, [missionId, mutate]);

  return {
    states: {
      notebookData,
    },
  };
};
