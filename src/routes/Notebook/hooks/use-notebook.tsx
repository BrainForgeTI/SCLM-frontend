import { createNotebook } from "@/services/adventure/create-notebook";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useNotebook = () => {
  const [notebookData, setNotebookData] = useState("");

  const { mutate } = useMutation({
    mutationFn: (missionId: string) => createNotebook(missionId),
    onSuccess: (data) => {
      console.log(data.content);
      setNotebookData(data.content);
    },
  });

  return {
    states: {
      notebookData,
    },
    actions: {
      mutate,
    },
  };
};
