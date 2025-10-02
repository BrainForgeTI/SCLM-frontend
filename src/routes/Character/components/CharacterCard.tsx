import EditIcon from "@/assets/icons/edit.svg"
import TrashIcon from "@/assets/icons/trash.svg"
import { Character } from "@/components/V2/characters/character";
import { CharacterGender } from "@/enums/character-gender";
import { CharacterClass } from "@/enums/class";

import RogueClassImg from "@/assets/images/rogue.png"
import WarriorClassImg from "@/assets/images/warrior.png"
import WizzardClassImg from "@/assets/images/wizard.png"
import MartialClassImg from "@/assets/images/martial-artist.png"
import KnifeImg from "@/assets/images/knife.png"
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
        <div className="grid grid-rows-2 w-[350px] h-[450px] bg-neutral/5 rounded-xl   border border-white/15 items-center relative font-poppis">
            <div className="flex flex-col  w-full h-full items-center justify-center gap-3 ">
                <div className="flex text-center text-[20px] text-white w-[150px] justify-center font-medium">{props.characterName ?? "-"}</div>
                <div className="flex items-center justify-center w-[150px]">
                    <Character
                    character={props.characterClass}
                    gender={props.gender}
                    hair={props.hairIndex}
                    hairColor={props.hairColor}
                    eyeIris={props.eyeIrisIndex}
                    level={props.level ?? 0}
                    eyeIrisColor={props.eyeIrisColor}
                    className="w-[150px] h-[150px]"
                    />
                </div>
            </div>
            <div className="flex flex-col bg-white/5 w-full h-full rounded-b-xl items-center justify-center gap-2">
                <div className="flex w-[300px]  items-center justify-between">
                    <div className="flex items-center gap-3 h-10">
                        <div className="w-[40px] h-full bg-background rounded-[50%] p-2" >{props.characterClass === "rogue" ? (
                            <img src={RogueClassImg} alt="class rogue"  />
                            ) : props.characterClass === "warrior" ? (
                            <img src={WarriorClassImg} alt="warrior class"  />
                            ) : props.characterClass === "wizard" ? (
                            <img src={WizzardClassImg} alt="wizard class"  />
                            ) : props.characterClass === "martial-artist" ? (
                            <img src={MartialClassImg} alt="martial-artist class"  />
                            ) : null}
                        </div>
                        <div className="flex text-[18px] font-bold">
                            {props.characterClass ?? "- -"}
                        </div>
                    </div>
                    <div className="flex ">
                        <div className="text-[20px]">Nível. {props.level ?? 0}</div>
                    </div>
                </div>
                <div className="flex items-center w-[300px] gap-3 h-10">
                        <div className="w-[40px] h-full bg-background rounded-[50%] p-2">
                            <img src={KnifeImg} alt="knife adventure" />
                        </div>
                        <div className="flex text-[18px]">
                            {props.adventure ?? "- -"}
                        </div>
                </div>
                <div className="w-[300px]">
                    <div className="flex items-center justify-between">
                            <div className="border-x-white/0 border-l-8">{atualExp} XP</div>
                            <div className="border-x-white/0 border-r-8">{maxExp} XP</div>
                    </div>
                    <div className="relative">
                            <div className="absolute w-full h-[20px] rounded-xl bg-background"></div>
                            <div className="absolute h-[20px] rounded-xl bg-primary" style={{width: `${percent}%`}}></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 absolute top-3 right-3">
                <button className="flex w-[30px] h-[30px] rounded-[5px] bg-primary border rounded-sm border-white/20 justify-center items-center hover:bg-background cursor-pointer" ><EditIcon></EditIcon></button>
                <button className="flex w-[30px] h-[30px] rounded-[5px] bg-background border rounded-sm border-white/20 justify-center items-center hover:bg-red-500 cursor-pointer"><TrashIcon></TrashIcon></button>
            </div>
            </div>
        </div>
    )
}