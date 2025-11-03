import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { useCreateChapter } from "./hooks/use-create-chapter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const CreateChapter = () => {
  const {
    states: { fieldArray, form, isPending, open },
    actions: { handleSubmit, addField, removeField, setOpen },
  } = useCreateChapter();

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
        <Button className="cursor-pointer">
          <Plus /> Criar Capítulo
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Criar capítulo"
        className="max-h-[calc(100dvh-150px)] overflow-y-auto scrollbar-none"
      >
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Criar capítulo</DialogTitle>
              <DialogDescription>
                Crie um novo capítulo e adicione até 15 missões
              </DialogDescription>
            </DialogHeader>
            <div className="w-full py-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Capítulo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full">
                <p className="mb-3 mt-5 text-md font-semibold">Missões</p>
                <div className="py-3 flex flex-col gap-2">
                  {fieldArray.fields.map((missionField, index) => (
                    <div key={index}>
                      <FormField
                        key={missionField.id}
                        control={form.control}
                        name={`missions.${index}.title`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <div className="flex gap-3">
                                <div className="flex-1">
                                  <Input className="" {...field} />
                                </div>
                                <Button
                                  type="button"
                                  variant={"secondary"}
                                  onClick={() => removeField(index)}
                                  disabled={fieldArray.fields.length === 1}
                                  className="cursor-pointer"
                                >
                                  <Trash className="text-muted-foreground" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  disabled={isPending}
                  variant={"outline"}
                  onClick={addField}
                  className="cursor-pointer"
                >
                  <Plus />
                  <p>Criar Missão</p>
                </Button>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" isLoading={isPending}>
                Criar Capítulo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
