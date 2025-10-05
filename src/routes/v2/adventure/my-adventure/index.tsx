import { PageLayout, PageTitle } from "@/components/PageLayout";
import { useMyAdventure } from "./hooks/use-my-adventure";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Chapter } from "@/components/V2/adventure/chapter";
import { CreateChapter } from "@/components/V2/adventure/create-chapter";

export const MyAdventurePage = () => {
  useMyAdventure();
  return (
    <PageLayout>
      <div className="w-full">
        <PageTitle title="Minha Aventura" />
        <div className="w-full flex gap-10 justify-between">
          <div className="flex gap-3">
            <Input className="w-80" placeholder="Pesquisar Capítulo" />
            <Button variant={"outline"} className="cursor-pointer">
              <Search />
            </Button>
          </div>
          <CreateChapter />
        </div>
        <div className="w-full mt-5">
          <Chapter></Chapter>
        </div>
      </div>
    </PageLayout>
  );
};
