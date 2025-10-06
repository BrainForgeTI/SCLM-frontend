import { PageLayout, PageTitle } from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Chapter } from "@/components/V2/adventure/chapter";
import { CreateChapter } from "@/components/V2/adventure/create-chapter";
import { useMyAdventure } from "./hooks/use-my-adventure";

interface MyAdventurePageProps {
  isLoading?: boolean;
}

export const MyAdventurePage = ({ isLoading }: MyAdventurePageProps) => {
  const {
    states: { adventure },
  } = useMyAdventure();

  return (
    <PageLayout isLoadingContent={isLoading}>
      <div className="w-full">
        <PageTitle title={adventure.nameAdventure ?? ""} />
        <div className="w-full flex gap-10 justify-between">
          <div className="flex gap-3">
            <Input className="w-80" placeholder="Pesquisar Capítulo" />
            <Button variant={"outline"} className="cursor-pointer">
              <Search />
            </Button>
          </div>
          <CreateChapter />
        </div>
        <div className="w-full mt-5 flex flex-col gap-3">
          {adventure?.chapters?.map((chapter, index) => (
            <Chapter key={index} chapter={chapter} number={index + 1}></Chapter>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
