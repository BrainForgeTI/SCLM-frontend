import { PageLayout, PageTitle } from "../../components/PageLayout";
import CreateIcon from "../../assets/icons/create.svg";
import ActionButton from "../../components/ActionButton/ActionButton";
import { ButtonStyleType } from "../../components/ActionButton/enum/ButtonStyleType";
import { CharacterCard } from "./components/CharacterCard";
import { useListInfoCharacter } from "../v2/CreateCharacter/hooks/use-list-characters";
import { useState, useEffect } from "react";
import { CharacterInfo } from "@/types/character/character-info";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Character } from "@/components/V2/characters/character";
import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";
import { femaleHair } from "@/components/V2/characters/generic-character/config/female";
import { maleHair } from "@/components/V2/characters/generic-character/config/male";
import { ColorPicker } from "@/components/V2/inputs/color-picker";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CharacterDelete } from "@/types/character/character-delete";

export const CharacterPage = () => {
  const {
    states: {
      characters,
      isLoading,
      isError,
      control,
      selectedCharacter,
      selectedCharacterDelete,
    },
    actions: {
      register,
      handleSubmitForm,
      setValue,
      watch,
      reset,
      deleteCharacterMutate,
      setSelectedCharacter,
      setSelectedCharacterDelete,
    },
  } = useListInfoCharacter();

  const listHairFemale = femaleHair;
  const listHairMale = maleHair;

  useEffect(() => {
    if (selectedCharacter) {
      reset({
        characterName: selectedCharacter.characterName,
        hairColor: selectedCharacter.hairColor,
        hairIndex: selectedCharacter.hairIndex,
        eyeIrisColor: selectedCharacter.eyeIrisColor,
        id: selectedCharacter.id,
        eyeIrisIndex: selectedCharacter.eyeIrisIndex,
      });
    }
  }, [selectedCharacter, reset]);

  return (
    <PageLayout>
      <div className="flex flex-col w-full font-poppis justify-center">
        <PageTitle title="Meus personagens" />
        <div className="w-full mt-10 flex justify-end">
          <div className="w-[100px] md:min-w-[137px]">
            <ActionButton
              Icon={CreateIcon}
              buttonStyle={ButtonStyleType.NORMAL}
              action={() => {}}
              label="Criar"
              style={`bg-primary gap-5 text-primary-content`}
            />
          </div>
        </div>

        <div
          className="grid w-full justify-center justify-items-center gap-10 mt-10"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(375px, 1fr))",
          }}
        >
          {characters?.map((character) => (
            <CharacterCard
              key={character.id}
              characterClass={character.characterClass}
              characterName={character.characterName}
              adventure={character.adventure}
              eyeIrisColor={character.eyeIrisColor}
              eyeIrisIndex={character.eyeIrisIndex}
              gender={character.gender}
              hairColor={character.hairColor}
              hairIndex={character.hairIndex}
              id={character.id}
              level={character.level}
              currentExperience={character.experience}
              maxExperience={character.xpToNextLvl}
              onEdit={() => setSelectedCharacter(character)}
              onDelete={() => setSelectedCharacterDelete(character)}
            />
          ))}
        </div>

        <Dialog
          open={!!selectedCharacter}
          onOpenChange={(open) => !open && setSelectedCharacter(undefined)}
        >
          <DialogContent className="w-[375px] md:w-[500px] h-[450px] z-100 font-poppis">
            <DialogHeader className="m-0 ">
              <DialogTitle className="text-[24px] text-start m-0 p-0">
                Editar personagem
              </DialogTitle>
              <DialogDescription className=" text-[18px] text-start m-0 p-0 w-50 truncate">
                {selectedCharacter?.gender == "male" ? "Mr. " : "Mrs. "}
                {watch("characterName")}
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitForm();
              }}
              className=""
            >
              <div className="grid grid-cols-2 items-center justify-items-center gap-4">
                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="flex w-[150px] h-[150px]">
                    {selectedCharacter && (
                      <Character
                        character={
                          selectedCharacter?.characterClass ??
                          CharacterClass.MARTIAL_ARTIST
                        }
                        gender={
                          selectedCharacter?.gender ?? CharacterGender.MALE
                        }
                        hair={watch("hairIndex")}
                        hairColor={watch("hairColor")}
                        eyeIris={selectedCharacter?.eyeIrisIndex ?? 0}
                        level={selectedCharacter?.level ?? 0}
                        eyeIrisColor={watch("eyeIrisColor")}
                        className="w-[150px] h-[150px]"
                      />
                    )}
                  </div>
                  <Input {...register("characterName")} />
                </div>

                <div className="flex flex-col gap-2">
                  <Controller
                    name="hairIndex"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-3 md:grid-cols-4 h-[100px] justify-items-center gap-2">
                        {(selectedCharacter?.gender === CharacterGender.FEMALE
                          ? listHairFemale
                          : listHairMale
                        ).map((hair, index) => {
                          return (
                            <button
                              type="button"
                              key={index}
                              className={`flex w-[40px] h-[40px] rounded-sm border 
                                                        ${field.value === index ? "border-blue-500" : "border-white/20"} 
                                                        items-center justify-center cursor-pointer`}
                              onClick={() => field.onChange(index)}
                            >
                              <img src={hair.image} alt="cabelo" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />

                  <div className="flex flex-col h-[100px] justify-center items-center p-2 rounded-sm border border-white/20 text-[12px] md:text-[16px] gap-2">
                    <Controller
                      name="eyeIrisColor"
                      control={control}
                      render={({ field }) => (
                        <ColorPicker
                          id="eyeIrisColor"
                          label="Cor dos Olhos"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      name="hairColor"
                      control={control}
                      render={({ field }) => (
                        <ColorPicker
                          id="hairColor"
                          label="Cor do Cabelo"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-row mt-12 mr-0 md:mr-6 items-center justify-end">
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  Atualizar mudanças
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog
          open={!!selectedCharacterDelete}
          onOpenChange={(open) =>
            !open && setSelectedCharacterDelete(undefined)
          }
        >
          <DialogContent className="w-[375px] md:w-[500px] h-[200px] md:h-[120px]  z-100 font-poppis">
            <DialogTitle className="leading-snug">
              Deseja Excluir o personagem{" "}
              <strong>{selectedCharacterDelete?.characterName}?</strong>{" "}
            </DialogTitle>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                deleteCharacterMutate({
                  id: selectedCharacterDelete?.id,
                } as CharacterDelete);
              }}
            >
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer border hover:bg-red-500 hover:border-red-500"
                >
                  Excluir
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};
