import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // ou outro tema escuro que curtir

import { useNotebook } from "./hooks/use-notebook";
import { PageLayout } from "@/components/PageLayout";

export const NotebookPage = () => {
  const {
    states: { notebookData },
  } = useNotebook();

  return (
    <PageLayout>
      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {notebookData || ""}
        </ReactMarkdown>
      </div>
    </PageLayout>
  );
};
