import { PageLayout, PageTitle } from "../../components/PageLayout";
import { NewAdventureCard } from "../../components/NewAdventureCard";
import { CreateAdventureDialog } from "@/components/V2/dialogs/create-adventure-dialog";
import { AdventureCard } from "@/components/V2/cards/adventure-card";
import { useHome } from "./hooks/use-home";

export const HomePage = () => {
  const { states: { adventures }, actions: { goToAdventure } } = useHome()

  return (
    <PageLayout>
      <>
        <PageTitle title="Minhas Aventuras" />
        <div className="w-full mt-10">
          <ul className="lg:mt-5 w-full gap-5 grid gird-cols-1 sm:grid-cols-2 md:gap-15 xl:grid-cols-3 xl:gap-5 2xl:gap-15">
            {adventures?.map((adventure) => {
              console.log(adventure)
              return (
                <li key={adventure.id} className="">
                  <AdventureCard
                    bgPrimary={adventure.bgPrimaryColor}
                    bgSecondary={adventure.bgSecondaryColo}
                    description={adventure.description}
                    nameAdventure={adventure.nameAdventure}
                    className="h-full w-full"
                    onPlayClick={() => goToAdventure(adventure.id)}
                  />
                </li>
              )
            })}

            <CreateAdventureDialog>
              <button type="button"><NewAdventureCard /></button>
            </CreateAdventureDialog>

          </ul>
        </div>
      </>
    </PageLayout>
  )
}
