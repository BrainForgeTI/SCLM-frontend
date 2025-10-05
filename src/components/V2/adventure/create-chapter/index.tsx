import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LineChart, Plus, Trash } from "lucide-react";
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
      <DialogContent aria-describedby="Criar capítulo">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Criar Novo Capítulo</DialogTitle>
            </DialogHeader>
            <div className="w-full py-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Capítulo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Título" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full">
                <div className="py-3">
                  {fieldArray.fields.map((missionField, index) => (
                    <div className="flex gap-3">
                      <FormField
                        key={missionField.id}
                        control={form.control}
                        name={`missions.${index}.title`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Título da missão"
                                className=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant={"secondary"}
                        onClick={() => removeField(index)}
                      >
                        <Trash className="text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  disabled={isPending}
                  variant={"outline"}
                  onClick={addField}
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
