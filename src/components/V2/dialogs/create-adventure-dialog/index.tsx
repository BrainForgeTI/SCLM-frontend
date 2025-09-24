import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdventureCard } from "../../cards/adventure-card"

export const CreateAdventureDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Criar uma nova Aventura</DialogTitle>
          </DialogHeader>
          <div className="py-10">
            <AdventureCard />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
