import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface DeleteAdventureConfirmDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CantDeleteAdventureWithCharacter({
  open,
  setOpen,
}: DeleteAdventureConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-90">
        <DialogHeader>
          <DialogTitle>Não foi posssível excluir!</DialogTitle>
          <DialogDescription>
            A aventura possui um personagem associado, é necessário desassociar antes de deletar a aventura.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <div className="flex justify-end gap-5">
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Confirmar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
