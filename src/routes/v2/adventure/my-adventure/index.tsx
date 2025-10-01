import { PageLayout, PageTitle } from "@/components/PageLayout"
import { useMyAdventure } from "./hooks/use-my-adventure"

export const MyAdventurePage = () => {
  useMyAdventure()
  return (
    <PageLayout>
      <div className="w-full">
        <PageTitle title="Minha Aventura" />
      </div>
    </PageLayout>
  )
}
