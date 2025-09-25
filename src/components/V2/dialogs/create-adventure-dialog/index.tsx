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
import { AdventureCard } from "../../cards/adventure-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateAdventureDialog } from "./hooks/use-create-adventure-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateAdventureFormType } from "@/schemas/create-adventure-schema";
import { Textarea } from "@/components/ui/textarea";

export const CreateAdventureDialog = () => {
  const {
    states: { forms },
  } = useCreateAdventureDialog();

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (isOpen) {
          forms.clearErrors();
        }
      }}
    >
      <Form {...forms}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] p-0">
          <form
            onSubmit={forms.handleSubmit((data: CreateAdventureFormType) => {
              console.log(data);
            })}
          >
            <DialogHeader className="bg-background border-b rounded-t-md h-12 flex items-center justify-center">
              <DialogTitle>Criar uma nova Aventura</DialogTitle>
            </DialogHeader>
            <div className="px-10 py-10 grid grid-cols-2 gap-15 content-center">
              <AdventureCard
                form={forms}
                bgPrimary={forms.watch("bgPrimaryColor")}
                bgSecondary={forms.watch("bgSecundaryColor")}
              />
              <div className="w-full flex flex-col gap-3">
                <FormField
                  control={forms.control}
                  name="nameAdventure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Nome da Aventura</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          placeholder="Digite"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={forms.control}
                  name="characterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">
                        Selecione um Personagem
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oi">Teste</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={forms.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel className="mb-1">
                        Descrição da Aventura
                      </FormLabel>
                      <FormControl className="flex-1 flex">
                        <Textarea
                          {...field}
                          placeholder="Digite"
                          className="flex-1 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="pb-5 px-10">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Criar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
