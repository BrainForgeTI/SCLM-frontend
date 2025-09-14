/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageLayout, PageTitle } from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RogueImage from "@/assets/images/rogue.png";
import MartialArtistImage from "@/assets/images/martial-artist.png";
import WarriorImage from "@/assets/images/warrior.png";
import WizardImage from "@/assets/images/wizard.png";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectValue } from "@radix-ui/react-select";
import { PropsWithChildren } from "react";
import { ColorPicker } from "@/components/V2/inputs/color-picker";
import { InView } from "react-intersection-observer";
import { femaleHair } from "@/components/V2/characters/generic-character/config/female";
import { maleHair } from "@/components/V2/characters/generic-character/config/male";
import { useCreateCharacter } from "./hooks/use-create-character";
import { Controller } from "react-hook-form";
import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";
import { Character } from "@/components/V2/characters/character";

interface CharacterClasses {
  characterId: CharacterClass;
  label: string;
  icon: string;
  description: string;
  genders: {
    female: {
      hair: {
        id: number;
        image: string;
      }[];
    };
    male: {
      hair: {
        id: number;
        image: string;
      }[];
    };
  };
}

const character: CharacterClasses[] = [
  {
    characterId: CharacterClass.WARRIOR,
    label: "Guerreiro",
    icon: WarriorImage,
    description:
      "Nascido para a batalha, o Guerreiro carrega o peso da honra e da lâmina. Sua força é moldada pelo treino incansável, e sua coragem, temperada pelo fogo da guerra. Ele se ergue como muralha diante dos inimigos, protegendo aliados e esmagando aqueles que ousam desafiá-lo.",
    genders: {
      female: {
        hair: femaleHair,
      },
      male: {
        hair: maleHair,
      },
    },
  },
  {
    characterId: CharacterClass.WIZARD,
    label: "Mago",
    icon: WizardImage,
    description:
      "O Mago é um buscador do oculto, um erudito que enxerga além do véu do mundo comum. Das páginas empoeiradas de grimórios às constelações do céu, ele extrai poder para curvar a realidade à sua vontade. Onde outros veem mistério, o Mago encontra ordem… e perigo.",
    genders: {
      female: {
        hair: femaleHair,
      },
      male: {
        hair: maleHair,
      },
    },
  },
  {
    characterId: CharacterClass.ROGUE,
    label: "Ladino",
    icon: RogueImage,
    description:
      "O Ladino é a sombra entre as tochas, o sussurro que antecede a lâmina. Ágil e astuto, prefere astúcia à força bruta, ilusão à imposição. Seja em becos escuros ou salões luxuosos, ele dança entre a confiança e a traição, sempre à procura de uma vantagem.",
    genders: {
      female: {
        hair: femaleHair,
      },
      male: {
        hair: maleHair,
      },
    },
  },
  {
    characterId: CharacterClass.MARTIAL_ARTIST,
    label: "Artista Marcial",
    icon: MartialArtistImage,
    description:
      "O Artista Marcial encontra nas próprias mãos a sua espada, e no próprio corpo, o templo. Seus golpes são frutos de disciplina férrea e de uma mente serena, capazes de derrubar muralhas ou cessar conflitos sem derramar sangue. Sua força não é apenas física, mas espiritual.",
    genders: {
      female: {
        hair: femaleHair,
      },
      male: {
        hair: maleHair,
      },
    },
  },
];

interface CarouselItemProps extends PropsWithChildren {
  onInView: () => void;
}

const CarouselView = ({ children, onInView }: CarouselItemProps) => (
  <InView as="div" onChange={(inView) => inView && onInView()} threshold={0.95}>
    {children}
  </InView>
);

export const CreateCharacterPage = () => {
  const {
    states: { control, errors },
    actions: { register, watch },
  } = useCreateCharacter();

  const gender = watch('gender') || CharacterGender.MALE
  const characterClass = watch('characterClass') || CharacterClass.WARRIOR
  const characterHair = watch('hairIndex') || 0

  const hairColor = watch('hairColor')
  const availableHair = character.find((char) => char.characterId === 'warrior')?.genders[gender]?.hair || []

  return (
    <PageLayout>
      <div className="w-full">
        <PageTitle title="Criação de Personagem" />
        <form className="w-full flex flex-col-reverse items-center gap-5 py-10 2xl:flex-row 2xl:items-start">
          <div className="flex flex-col gap-5 items-center w-2/5">
            <div className="w-60 md:w-70">
              <Controller
                name={"characterClass"}
                control={control}
                render={({ field }) => (
                  <Carousel>
                    <CarouselContent>
                      {character.map((char, index) => (
                        <CarouselItem key={index}>
                          <Card className="h-60 flex justify-center items-center">
                            <CarouselView
                              onInView={() => field.onChange(character[index].characterId)}
                            >
                              <CardContent className="flex flex-col gap-5 items-center justify-center">
                                <div className="w-25 h-25">
                                  <img src={char.icon} />
                                </div>
                                <p className="text-2xl uppercase font-semibold text-center">
                                  {char.label}
                                </p>
                              </CardContent>
                            </CarouselView>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious type="button" />
                    <CarouselNext type="button" />
                  </Carousel>
                )}
              />
            </div>
            <div className="w-60 md:w-70 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Input
                  error={errors.characterName}
                  placeholder="Nome do personagem"
                  {...register("characterName")}
                />

                <Controller
                  name="adventure"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma Aventura"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teste">Aventura de React</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um Estilo"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Homem</SelectItem>
                        <SelectItem value="female">Mulher</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <Button type="submit" className="cursor-pointer">
                  Criar
                </Button>
                <Button
                  type="button"
                  className="cursor-pointer"
                  variant={"outline"}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
          <div className="w-60 md:w-3/5 flex justify-center">
            <Card className="w-full flex-grow== flex flex-col items-center">
              <div className="w-full flex flex-col gap-5 2xl:flex-row">
                <div className="w-full flex flex-col items-center">
                  <div className="w-30 md:w-40">
                    <div className="flex flex-col gap-3">
                      <Controller
                        name="hairIndex"
                        control={control}
                        render={({ field }) => (
                          <Carousel>
                            <CarouselContent>
                              {availableHair.map((current, index) => {
                                const HairImage = current.image;
                                return (
                                  <CarouselItem key={index}>
                                    <CarouselView
                                      onInView={() => field.onChange(index)}
                                    >
                                      <Card className="flex justify-center items-center select-none">
                                        <CardContent className="flex flex-col gap-5 items-center justify-center">
                                          <img src={HairImage} />
                                        </CardContent>
                                      </Card>
                                    </CarouselView>
                                  </CarouselItem>
                                );
                              })}
                            </CarouselContent>
                            <CarouselPrevious type="button" />
                            <CarouselNext type="button" />
                          </Carousel>
                        )}
                      />
                    </div>
                  </div>
                  <Card className="w-53 md:w-60 py-5 mt-5">
                    <CardContent className="flex flex-col gap-3">
                      <Controller
                        name="hairColor"
                        control={control}
                        render={({ field }) => (
                          <ColorPicker
                            label="Cor do cabelo"
                            id="hair-color"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <Controller name="eyeColor" control={control} render={({ field }) => (
                        <ColorPicker
                          label="Cor dos Olhos"
                          id="eye-color"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )} />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex justify-center">
                  <Character
                    character={characterClass}
                    gender={gender}
                    hair={availableHair[characterHair].id}
                    hairColor={hairColor}
                    level={0}
                    className="w-50 h-50  2xl:w-[320px] 2xl:h-[320px]"
                  />
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};
