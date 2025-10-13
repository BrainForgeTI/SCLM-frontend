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
  action: () => void;
  isPendingDelete: boolean;
}

export function DeleteAdventureConfirmDialog({
  open,
  setOpen,
  action,
  isPendingDelete,
}: DeleteAdventureConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-90">
        <DialogHeader>
          <DialogTitle>Excluir Aventura</DialogTitle>
          <DialogDescription>
            Essa ação irá excluir permanentemente esta aventura
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <div className="flex justify-end gap-5">
            <Button
              onClick={() => setOpen(false)}
              variant={"outline"}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              isLoading={isPendingDelete}
              onClick={() => {
                action();
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
