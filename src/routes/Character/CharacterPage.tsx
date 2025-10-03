import { PageLayout, PageTitle } from "../../components/PageLayout"
import CreateIcon from '../../assets/icons/create.svg'
import ActionButton from "../../components/ActionButton/ActionButton"
import { ButtonStyleType } from "../../components/ActionButton/enum/ButtonStyleType"
import { CharacterCard } from "./components/CharacterCard"
import { useListInfoCharacter } from "../v2/CreateCharacter/hooks/use-list-characters"
import { useState } from "react"
import { CharacterInfo } from "@/types/character/character-info"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Character } from "@/components/V2/characters/character"
import { CharacterGender } from "@/enums/character-gender"
import { CharacterClass } from "@/enums/class"

export const CharacterPage = () => {
    const {states: {characters}} = useListInfoCharacter()
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterInfo>();
    
    const [hairIndex, setHairIndex] = useState(0);
    const [hairColor, setHairColor] = useState("#000000");
    const [eyeIrisColor, setEyeIrisColor] = useState("#0000ff"); 

    return (
        <PageLayout>
            <div className="flex flex-col w-full font-poppis">
                <PageTitle title="Meus personagens" />
                <div className="w-full mt-10 flex justify-end">
                    <div className="w-[100px] md:min-w-[137px]">
                        <ActionButton Icon={CreateIcon} buttonStyle={ButtonStyleType.NORMAL} action={() => {

                        }} label="Criar" style={`bg-primary gap-5 text-primary-content`} />
                    </div>
                </div>

                <div className="grid  w-full justify-items-center gap-10 mt-10" style={{gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",}}>
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
                            currentExperience={character.currentExperience}
                            maxExperience={character.maxExperience}
                            onEdit={() => setSelectedCharacter(character)}
                        />
                        
                    ))}
                </div>
                <Dialog open={!!selectedCharacter} onOpenChange={(open) => !open && setSelectedCharacter(undefined)}>
                <DialogContent className="w-[500px] h-[450px] z-100 font-poppis">
                    <DialogHeader>
                    <DialogTitle>Editar personagem :</DialogTitle>
                    <DialogDescription>{selectedCharacter?.characterName}</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2">
                        <div>
                            {selectedCharacter && (
                                <Character
                                    character={selectedCharacter?.characterClass ?? CharacterClass.MARTIAL_ARTIST}
                                    gender={selectedCharacter?.gender ?? CharacterGender.MALE}
                                    hair={selectedCharacter?.hairIndex ?? 0 }
                                    hairColor={selectedCharacter?.hairColor ?? "#000000"}
                                    eyeIris={selectedCharacter?.eyeIrisIndex ??  0}
                                    level={selectedCharacter?.level ?? 0}
                                    eyeIrisColor={selectedCharacter?.eyeIrisColor ?? "#000000"}
                                    className="w-[150px] h-[150px]"
                                    />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <label>Cor dos Olhos:</label>
                                <input
                                type="color"
                                value={eyeIrisColor}
                                onChange={(e) => setEyeIrisColor(e.target.value)}/>
                            </div>
                            <div className="flex gap-2">
                               <label>Cor do Cabelo:</label>
                                <input
                                type="color"
                                value={hairColor}
                                onChange={(e) => setHairColor(e.target.value)}/> 
                            </div>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Atualizar mudanças</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
        </PageLayout>
    )
}
