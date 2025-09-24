import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AdventurePicture } from "./components/adventure-picture"
import { Character } from "../../characters/character"
import { CharacterClass } from "@/enums/class"
import { CharacterGender } from "@/enums/character-gender"

export const AdventureCard = () => {
  return (
    <Card className="w-76 p-0">
      <CardHeader className="px-0">
        <div className="w-full bg-blue-600 rounded-t-xl flex justify-center py-7 flex-col items-center gap-5">
          <AdventurePicture />
          <p className="text-black font-bold text-xl">Nome da Aventura</p>
        </div>
      </CardHeader>
      <CardContent className="pb-5">
        <Character
          character={CharacterClass.MARTIAL_ARTIST}
          gender={CharacterGender.MALE}
          hair={0}
          hairColor={'#ffffff'}
          eyeIris={0}
          level={0}
          eyeIrisColor={'#000000'}
          className="w-40 h-40"
        />
      </CardContent>
    </Card>
  )
}
