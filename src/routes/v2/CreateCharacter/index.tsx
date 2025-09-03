import { PageLayout, PageTitle } from "@/components/PageLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import RogueImage from '@/assets/images/rogue.png'
import MartialArtistImage from '@/assets/images/martial-artist.png'
import WarriorImage from '@/assets/images/warrior.png'
import WizardImage from '@/assets/images/wizard.png'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const character = [
  {
    label: 'Guerreiro',
    icon: WarriorImage,
    description: 'Nascido para a batalha, o Guerreiro carrega o peso da honra e da lâmina. Sua força é moldada pelo treino incansável, e sua coragem, temperada pelo fogo da guerra. Ele se ergue como muralha diante dos inimigos, protegendo aliados e esmagando aqueles que ousam desafiá-lo.'
  },
  {
    label: 'Mago',
    icon: WizardImage,
    description: 'O Mago é um buscador do oculto, um erudito que enxerga além do véu do mundo comum. Das páginas empoeiradas de grimórios às constelações do céu, ele extrai poder para curvar a realidade à sua vontade. Onde outros veem mistério, o Mago encontra ordem… e perigo.'
  },
  {
    label: 'Ladino',
    icon: RogueImage,
    description: 'O Ladino é a sombra entre as tochas, o sussurro que antecede a lâmina. Ágil e astuto, prefere astúcia à força bruta, ilusão à imposição. Seja em becos escuros ou salões luxuosos, ele dança entre a confiança e a traição, sempre à procura de uma vantagem.'
  },
  {
    label: 'Artista Marcial',
    icon: MartialArtistImage,
    description: 'O Artista Marcial encontra nas próprias mãos a sua espada, e no próprio corpo, o templo. Seus golpes são frutos de disciplina férrea e de uma mente serena, capazes de derrubar muralhas ou cessar conflitos sem derramar sangue. Sua força não é apenas física, mas espiritual.'
  },
]

export const CreateCharacterPage = () => {
  return (
    <PageLayout>
      <div className="w-full">
        <PageTitle title="Criação de Personagem" />
        <div className="w-full flex gap-5">
          <div className="flex flex-col gap-5 items-center w-1/2">
            <div className="w-70">
              <Carousel>
                <CarouselContent>
                  {character.map((character) => (
                    <CarouselItem>
                      <Card className="h-60 flex justify-center items-center">
                        <CardContent className="flex flex-col gap-5 items-center justify-center">
                          <div className="w-25 h-25">
                            <img src={character.icon} />
                          </div>
                          <p className="text-2xl uppercase font-semibold text-center">{character.label}</p>
                        </CardContent>
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
                    Selecione uma Aventura
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teste">Aventura de React</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full flex flex-col gap-3">
                <Button className="cursor-pointer">Criar</Button>
                <Button className="cursor-pointer" variant={'outline'}>Cancelar</Button>
              </div>
            </div>
          </div>
          <div className="w-1/2">

          </div>
        </div>
      </div>
    </PageLayout>
  )
}
