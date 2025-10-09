import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateMission } from "./hooks/use-create-mission";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const CreateMission = () => {
  const {
    states: { open, form },
    actions: { setOpen, handleSubmit },
  } = useCreateMission();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          form.clearErrors();
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"secondary"}
          className="w-36 cursor-pointer"
        >
          <Plus /> Nova Missão
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Missão</DialogTitle>
          <DialogDescription>
            Crie uma nova missão para o seu capítulo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 mt-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={false}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" isLoading={false}>
                Criar Missão
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
