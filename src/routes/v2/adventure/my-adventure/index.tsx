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
    states: {
      adventure,
      allAdventureCompleted,
      isPendingFinalChallenge,
      search,
      localChapters,
    },
    actions: { mutateFinalChallenge, handleSearchValue },
  } = useMyAdventure();

  return (
    <PageLayout isLoadingContent={isLoading}>
      <div className="w-full">
        <PageTitle title={adventure.nameAdventure ?? ""} />
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-10 justify-between">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={search}
                onChange={handleSearchValue}
                className="w-full sm:w-80"
                placeholder="Pesquisar Capítulo"
              />
            </div>
          </div>
          <CreateChapter />
        </div>
        <div className="w-full mt-5 flex flex-col gap-3">
          {localChapters?.map((chapter, index) => (
            <Chapter key={index} chapter={chapter} number={index + 1}></Chapter>
          ))}

          {allAdventureCompleted && (
            <Button
              onClick={() => mutateFinalChallenge()}
              variant={"challenge"}
              className="cursor-pointer"
              isLoading={isPendingFinalChallenge}
            >
              Desafio Final
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
