import { cn } from "@/lib/utils";
import { CharacterSprite } from "@/types/character/character-sprite";

interface GenericCharacterProps {
  sprites: CharacterSprite;
  characterLevel: number;
  className?: string;
}

export const GenericCharacter = ({
  sprites,
  characterLevel,
  className,
}: GenericCharacterProps) => {
  const sprite = sprites.evolutions[characterLevel];
  return (
    <div className={cn("w-[320px] h-[320px] relative", className)}>
      <div className="absolute w-full h-full">
        <img src={sprites.base} />
      </div>

      <div className="absolute w-full h-full">
        <img src={sprites.eyes[0]} />
      </div>

      <div className="absolute w-full h-full">
        <img src={sprite.clothe} />
      </div>
    </div>
  );
};
