import { PageLayout } from "@/components/PageLayout";
import ReactMarkdown from "react-markdown";
import { useNotebook } from "./hooks/use-notebook";

export const NotebookPage = () => {
  const {
    states: { notebookData },
  } = useNotebook();

  return (
    <PageLayout>
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-[32px] font-bold mb-4 text" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-[24px] font-semibold mt-6 mb-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-[20px] font-semibold mt-6 mb-2" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="text-[16px] mt-6 mb-2" {...props} />
          ),
          ul: ({ ...props }) => <ul className="list-disc ml-6" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal ml-6" {...props} />,
        }}
      >
        {notebookData}
      </ReactMarkdown>
    </PageLayout>
  );
};
