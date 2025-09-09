import { cn } from "@/lib/utils";
import { CharacterSprite } from "@/types/character/character-sprite";

interface GenericCharacterProps {
  sprites: CharacterSprite;
  characterLevel: number;
  className?: string;
  hairColor: string
  hair: number
}

export const GenericCharacter = ({
  sprites,
  characterLevel,
  className,
  hairColor,
  hair
}: GenericCharacterProps) => {
  const sprite = sprites.evolutions[characterLevel];
  const Hair = sprites.hair[hair]
  return (
    <div className={cn("w-[320px] h-[320px] relative", className)}>
      <div className="absolute w-full h-full z-30" style={{ color: hairColor }}>
        <Hair />
      </div>

      <div className="absolute w-full h-full">
        <img src={sprites.base} />
      </div>

      <div className="absolute w-full h-full z-20">
        <img src={sprites.eyes[0]} />
      </div>

      <div className="absolute w-full h-full z-40">
        <img src={sprite.clothe} />
      </div>
    </div>
  );
};
