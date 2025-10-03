import { PageLayout, PageTitle } from "../../components/PageLayout"
import CreateIcon from '../../assets/icons/create.svg'
import ActionButton from "../../components/ActionButton/ActionButton"
import { ButtonStyleType } from "../../components/ActionButton/enum/ButtonStyleType"
import { CharacterCard } from "./components/CharacterCard"
import { useListInfoCharacter } from "../v2/CreateCharacter/hooks/use-list-characters"
import { useState, useEffect } from "react"
import { CharacterInfo } from "@/types/character/character-info"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Character } from "@/components/V2/characters/character"
import { CharacterGender } from "@/enums/character-gender"
import { CharacterClass } from "@/enums/class"
import { femaleHair } from "@/components/V2/characters/generic-character/config/female"
import { maleHair } from "@/components/V2/characters/generic-character/config/male"

export const CharacterPage = () => {
    const { states: { characters , isLoading, isError} , 
    actions: { register, handleSubmitForm, setValue}} = useListInfoCharacter();

    const [selectedCharacter, setSelectedCharacter] = useState<CharacterInfo>();
    const [hairIndex, setHairIndex] = useState(0);
    const [hairColor, setHairColor] = useState("#000000");
    const [eyeIrisColor, setEyeIrisColor] = useState("#0000ff");
    const [nome, setNome] = useState(selectedCharacter?.characterName)
    const listHairFemale = femaleHair
    const listHairMale = maleHair
    
    
    useEffect(() => {
        if (selectedCharacter) {
            setNome(selectedCharacter.characterName ?? "");
            setHairIndex(selectedCharacter.hairIndex ?? 0);
            setHairColor(selectedCharacter.hairColor ?? "#000000");
            setEyeIrisColor(selectedCharacter.eyeIrisColor ?? "#0000ff");
        }
    }, [selectedCharacter]);

    return (
        <PageLayout>
            <div className="flex flex-col w-full font-poppis" >
                <PageTitle title="Meus personagens" />
                <div className="w-full mt-10 flex justify-end">
                    <div className="w-[100px] md:min-w-[137px]">
                        <ActionButton
                            Icon={CreateIcon}
                            buttonStyle={ButtonStyleType.NORMAL}
                            action={() => { }}
                            label="Criar"
                            style={`bg-primary gap-5 text-primary-content`}
                        />
                    </div>
                </div>

                <div
                    className="grid w-full justify-items-center gap-10 mt-10"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}
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
                            currentExperience={character.currentExperience}
                            maxExperience={character.maxExperience}
                            onEdit={() => setSelectedCharacter(character)}
                        />
                    ))}
                </div>

                <Dialog open={!!selectedCharacter} onOpenChange={(open) => !open && setSelectedCharacter(undefined)}>
                    <DialogContent className="w-[500px] h-[450px] z-100 font-poppis">
                        <DialogHeader className="m-0">
                            <DialogTitle className="text-[24px] m-0 p-0">Editar personagem</DialogTitle>
                            <DialogDescription className="m-0 p-0">{selectedCharacter?.gender == "male" ? "Mr. " : "Mrs. " }{nome}</DialogDescription>
                        </DialogHeader>
                        <form  onSubmit={handleSubmitForm} className="">
                            <div className="grid grid-cols-2 items-center justify-items-center">
                            <div className="flex flex-col items-center justify-center gap-5">
                                <input type="hidden" value={selectedCharacter?.id} {...register("id")} />
                                <div className="flex w-[150px] h-[150px]"> 

                                {selectedCharacter && (
                                    <Character
                                        character={selectedCharacter?.characterClass ?? CharacterClass.MARTIAL_ARTIST}
                                        gender={selectedCharacter?.gender ?? CharacterGender.MALE}
                                        hair={hairIndex} 
                                        hairColor={hairColor} 
                                        eyeIris={selectedCharacter?.eyeIrisIndex ?? 0}
                                        level={selectedCharacter?.level ?? 0}
                                        eyeIrisColor={eyeIrisColor} 
                                        className="w-[150px] h-[150px]"
                                    />
                                )}
                                </div>
                                <input type="text" defaultValue={selectedCharacter?.characterName}  onChange={(e) => {
                                   setValue("characterName", e.target.value)
                                   setNome(e.target.value)
                                }} className="flex p-4 h-[20px] w-full rounded-sm border border-white/20 text-start justify-start"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                
                                <div className="grid grid-cols-4 h-[100px] justify-items-center gap-2">
                                    {(selectedCharacter?.gender === CharacterGender.FEMALE ? listHairFemale : listHairMale).map((hair, index) => {
                                        return (
                                            <button type="button"
                                                key={index}
                                                className={`flex w-[40px] h-[40px] rounded-sm border 
                                                ${hairIndex === index ? "border-blue-500" : "border-white/20"} 
                                                items-center justify-center cursor-pointer`}
                                                onClick={() => {
                                                    setHairIndex(index);  
                                                    setValue("hairIndex", index); 
                                                }}
                                            >
                                                <img src={hair.image} alt="cabelo" />
                                                
                                            </button>
                                            
                                        )
                                    })}
                                </div>

                                <div className="flex flex-col h-[100px] justify-center items-center rounded-sm border border-white/20">
                                    <div className="flex h-[40px] gap-2 items-center  items-center justify-center">
                                    <label>Cor dos Olhos:</label>
                                    <input
                                        type="color"
                                        className="cursor-pointer"
                                        defaultValue={selectedCharacter?.eyeIrisColor ?? "#0000ff"}
                                        onChange={(e) => {
                                            setEyeIrisColor(e.target.value)
                                            setValue("eyeIrisColor", e.target.value)
                                        }}
                                        
                                    />
                                    </div>

        
                                    <div className="flex h-[40px] gap-2 items-center  items-center justify-center">
                                        <label>Cor do Cabelo:</label>
                                        <input
                                            type="color"
                                            className="cursor-pointer"
                                            defaultValue={selectedCharacter?.hairColor ?? "#000000"}
                                            onChange={(e) => {
                                                setHairColor(e.target.value)
                                                setValue("hairColor", e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>    
                            </div>
                        </div> 
                        <DialogFooter className="flex flex-row mt-12 mr-6 items-center justify-end">
                            <DialogClose asChild>
                                <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" className="cursor-pointer" isLoading={isLoading}>Atualizar mudanças</Button>
                        </DialogFooter>
                    </form>    
                    </DialogContent>
                </Dialog>
            </div>
        </PageLayout>
    )
}
