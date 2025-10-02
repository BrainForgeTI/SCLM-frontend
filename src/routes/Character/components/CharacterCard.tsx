import EditIcon from "@/assets/icons/edit.svg"
import TrashIcon from "@/assets/icons/trash.svg"
import { Character } from "@/components/V2/characters/character";
import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";

import RogueClassImg from "@/assets/images/rogue.png"
import WarriorClassImg from "@/assets/images/warrior.png"
import WizzardClassImg from "@/assets/images/wizard.png"
import MartialClassImg from "@/assets/images/martial-artist.png"

interface Props {
        id: string,
        characterName: string,
        characterClass: CharacterClass,
        gender: CharacterGender,
        hairColor: string,
        hairIndex: number,
        eyeIrisColor: string,
        eyeIrisIndex: number,
        adventure?: string,
        level: number,
        currentExperience?: number,
        maxExperience?:number
}

export const CharacterCard = (props: Props) => {

    const maxExp = props.maxExperience ?? 0
    const atualExp = props.currentExperience ?? 0
    const percent = (atualExp / maxExp) * 100

    

    return (
        <div className="flex flex-col w-[350px] h-[474px] bg-neutral/5 rounded-xl bg-white/3  border border-white/20 items-center relative">
            <div className="flex flex-col items-center absolute -top-2 ">
                <div className="w-[250px] h-[50px] bg-background rounded-b-lg border border-white/20 text-center content-center">
                    {props.characterName ?? "-"}
                </div>
                <div className="flex w-[200px] h-[50px] bg-background rounded-b-lg border border-white/20 justify-center items-center gap-2">
                    <div className="w-[35px]">{props.characterClass === "rogue" ? (
                        <img src={RogueClassImg} alt="class rogue"  />
                        ) : props.characterClass === "warrior" ? (
                        <img src={WarriorClassImg} alt="warrior class"  />
                        ) : props.characterClass === "wizard" ? (
                        <img src={WizzardClassImg} alt="wizard class"  />
                        ) : props.characterClass === "martial-artist" ? (
                        <img src={MartialClassImg} alt="martial-artist class"  />
                        ) : null}
                    </div>
                    
                    {props.characterClass ?? "- -"}
                </div>
            </div>

            
            <div className="flex-1  w-[200px] h-[80px] flex items-center justify-center">
                <Character
                    character={props.characterClass}
                    gender={props.gender}
                    hair={props.hairIndex}
                    hairColor={props.hairColor}
                    eyeIris={props.eyeIrisIndex}
                    level={props.level ?? 0}
                    eyeIrisColor={props.eyeIrisColor}
                    className="w-50 h-50  2xl:w-60 2xl:h-60"
                />
            </div>

            <div className="flex flex-col bg-background w-[300px] h-[100px] flex items-center justify-center border rounded-t-lg border-white/20 absolute -bottom-2 gap-2">
                <div className="text-[18px] font">LVL. {props.level ?? 1}</div>
                <div className="relative w-[250px] h-[30px]">
                    <div className="absolute inset-0 bg-primary/20 rounded-sm"></div>
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-sm" style={{width: `${percent}%`}}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm">{atualExp ?? 0} / {maxExp ?? 0}</div>
                </div>
            </div>
            <div className="flex flex-col gap-2 absolute top-3 right-3">
                <button className="flex w-[30px] h-[30px] rounded-[5px] bg-primary border rounded-sm border-white/20 justify-center items-center hover:bg-background cursor-pointer" ><EditIcon></EditIcon></button>
                <button className="flex w-[30px] h-[30px] rounded-[5px] bg-background border rounded-sm border-white/20 justify-center items-center hover:bg-red-500 cursor-pointer"><TrashIcon></TrashIcon></button>
            </div>
        </div>
    )
}