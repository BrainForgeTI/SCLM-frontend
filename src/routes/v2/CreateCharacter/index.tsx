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
import { Wizard } from "@/components/V2/characters/wizard";
import { PropsWithChildren, useState } from "react";
import { ColorPicker } from "@/components/V2/inputs/color-picker";
import { InView } from "react-intersection-observer";
import { femaleHair } from "@/components/V2/characters/generic-character/config/female";
import useDebounce from "@/hooks/use-debounce";

const hairConfig = {
  female: femaleHair,
  male: []
}

const character = [
  {
    label: "Guerreiro",
    icon: WarriorImage,
    description:
      "Nascido para a batalha, o Guerreiro carrega o peso da honra e da lâmina. Sua força é moldada pelo treino incansável, e sua coragem, temperada pelo fogo da guerra. Ele se ergue como muralha diante dos inimigos, protegendo aliados e esmagando aqueles que ousam desafiá-lo.",
  },
  {
    label: "Mago",
    icon: WizardImage,
    description:
      "O Mago é um buscador do oculto, um erudito que enxerga além do véu do mundo comum. Das páginas empoeiradas de grimórios às constelações do céu, ele extrai poder para curvar a realidade à sua vontade. Onde outros veem mistério, o Mago encontra ordem… e perigo.",
  },
  {
    label: "Ladino",
    icon: RogueImage,
    description:
      "O Ladino é a sombra entre as tochas, o sussurro que antecede a lâmina. Ágil e astuto, prefere astúcia à força bruta, ilusão à imposição. Seja em becos escuros ou salões luxuosos, ele dança entre a confiança e a traição, sempre à procura de uma vantagem.",
  },
  {
    label: "Artista Marcial",
    icon: MartialArtistImage,
    description:
      "O Artista Marcial encontra nas próprias mãos a sua espada, e no próprio corpo, o templo. Seus golpes são frutos de disciplina férrea e de uma mente serena, capazes de derrubar muralhas ou cessar conflitos sem derramar sangue. Sua força não é apenas física, mas espiritual.",
  },
];

interface CarouselItemProps extends PropsWithChildren {
  onInView: () => void
}

const CarouselView = ({ children, onInView }: CarouselItemProps) => (
  <InView
    as="div"
    onChange={(inView) => inView && onInView()}
    threshold={0.95}
  >
    {children}
  </InView>
);

export const CreateCharacterPage = () => {
  const [gender, setGender] = useState<"male" | "female">("female");

  const [hairColor, setHairColor] = useState("#ffffff")
  const [currentHair, setCurrentHair] = useState(0)
  const debouncedHair = useDebounce(currentHair, 200)

  const hair = hairConfig[gender]

  return (
    <PageLayout>
      <div className="w-full">
        <PageTitle title="Criação de Personagem" />
        <div className="w-full flex gap-5 py-10">
          <div className="flex flex-col gap-5 items-center w-2/5">
            <div className="w-70">
              <Carousel>
                <CarouselContent>
                  {character.map((character, index) => (
                    <CarouselItem key={index}>
                      <Card className="h-60 flex justify-center items-center">
                        <CarouselView onInView={() => { }}>
                          <CardContent className="flex flex-col gap-5 items-center justify-center">
                            <div className="w-25 h-25">
                              <img src={character.icon} />
                            </div>
                            <p className="text-2xl uppercase font-semibold text-center">
                              {character.label}
                            </p>
                          </CardContent>
                        </CarouselView>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="w-70 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Input placeholder="Nome do personagem" />

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma Aventura"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teste">Aventura de React</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => setGender(value as any)}
                  value={gender}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um Estilo"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Homem</SelectItem>
                    <SelectItem value="female">Mulher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full flex flex-col gap-3">
                <Button className="cursor-pointer">Criar</Button>
                <Button className="cursor-pointer" variant={"outline"}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
          <div className="w-3/5 flex justify-center">
            <Card className="w-full flex flex-col items-center">
              <div className="w-full flex gap-5">
                <div className="w-full flex flex-col items-center">
                  <div className="w-40">
                    <div className="flex flex-col gap-3">
                      <Carousel>
                        <CarouselContent>
                          {hair.map((current, index) => {
                            const HairImage = current.image
                            return (
                              <CarouselItem>
                                <CarouselView onInView={() => {
                                  setTimeout(() => {
                                    setCurrentHair(index)
                                  }, 200)
                                }}>
                                  <Card className="flex justify-center items-center select-none">
                                    <CardContent className="flex flex-col gap-5 items-center justify-center">
                                      <img src={HairImage} />
                                    </CardContent>
                                  </Card>
                                </CarouselView>
                              </CarouselItem>
                            )
                          })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>

                  </div>
                  <Card className="w-60 py-5 mt-5">
                    <CardContent className="flex flex-col gap-3">
                      <ColorPicker label="Cor do cabelo" id="hair-color" value={hairColor} onChange={setHairColor} />
                      <ColorPicker label="Cor dos Olhos" id="eye-color" value={hairColor} onChange={setHairColor} />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex justify-center">
                  <Wizard hair={debouncedHair} hairColor={hairColor} gender={gender} level={0} className="w-40 h-40" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div >
    </PageLayout >
  );
};
