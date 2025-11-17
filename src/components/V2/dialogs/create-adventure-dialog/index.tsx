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
import { Textarea } from "@/components/ui/textarea";
import { PropsWithChildren } from "react";
import { useWatch } from "react-hook-form";
import { Adventure } from "@/types/adventure/adventure";
import { DeleteAdventureConfirmDialog } from "../delete-adventure-confirm";
import { CantDeleteAdventureWithCharacter } from "../cant-delete-adventure-with-character";

interface CreateAdventureDialogProps extends PropsWithChildren {
  adventure?: Adventure;
}

export const CreateAdventureDialog = ({
  children,
  adventure,
}: CreateAdventureDialogProps) => {
  const {
    states: {
      forms,
      modalOpen,
      isPending,
      modalConfirmOpen,
      isPendingDeleteAdventure,
      allFreeCharacters,
      cantOpen
    },
    actions: {
      handleModal,
      handleSubmit,
      setModalConfirmOpen,
      handleDeleteAdventure,
      setCantOpen
    },
  } = useCreateAdventureDialog({ adventure });

  const [nameAdventure, description] =
    useWatch({
      control: forms.control,
      name: ["nameAdventure", "description"],
    }) ?? [];

  const adventureData: Adventure = {
    bgPrimaryColor: forms.watch("bgPrimaryColor"),
    bgSecundaryColor: forms.watch("bgSecundaryColor"),
    chapters: adventure?.chapters ?? [],
    characterId: adventure?.characterId ?? "",
    description: adventure?.description ?? description,
    id: adventure?.id ?? "",
    nameAdventure: adventure?.nameAdventure ?? nameAdventure,
    owner: adventure?.owner ?? "",
    progress: adventure?.progress ?? 0,
    projectId: adventure?.projectId ?? "",
  };

  return (
    <>
      <Dialog onOpenChange={handleModal} open={modalOpen}>
        <Form {...forms}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent
            aria-describedby={undefined}
            className="z-90 sm:max-w-[800px] h-[calc(100dvh-100px)] lg:h-auto p-0 overflow-y-auto scrollbar-none"
          >
            <form onSubmit={handleSubmit}>
              <DialogHeader className="bg-background border-b rounded-t-md h-12 flex items-center justify-center">
                <DialogTitle>Criar uma nova Aventura</DialogTitle>
              </DialogHeader>
              <div className="px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-15 content-center place-items-center lg:place-items-start">
                <AdventureCard
                  form={forms}
                  adventure={adventureData}
                  className="mt-10 lg:mt-0"
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

                  {!adventure?.id && (
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
                              <SelectContent className="z-[9999]">
                                {allFreeCharacters?.map((character) => {
                                  return (
                                    <SelectItem
                                      key={character.id}
                                      value={character.id}
                                    >
                                      {character.characterName}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

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
              <DialogFooter className="pb-5 px-8 flex justify-between">
                {/* {adventure?.id && (
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() => {
                      if (adventure.characterId) {
                        setCantOpen(true);
                        return;
                      } else {
                        setModalConfirmOpen(true);
                      }
                    }}
                  >
                    Excluir
                  </Button>
                )} */}
                <div className="w-full flex-1 flex justify-end gap-5">
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isPending}>
                    {adventure?.id ? "Editar" : "Criar"}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>
      <CantDeleteAdventureWithCharacter
        open={cantOpen}
        setOpen={setCantOpen}
      />
      <DeleteAdventureConfirmDialog
        open={modalConfirmOpen}
        isPendingDelete={isPendingDeleteAdventure}
        setOpen={setModalConfirmOpen}
        action={handleDeleteAdventure}
      />
    </>
  );
};
