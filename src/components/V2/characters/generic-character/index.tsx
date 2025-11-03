import { cn } from "@/lib/utils";
import { CharacterSprite } from "@/types/character/character-sprite";

interface GenericCharacterProps {
  sprites: CharacterSprite;
  characterLevel: number;
  className?: string;
  hairColor: string;
  hair: number;
  eyeIris: number;
  eyeIrisColor: string;
}

function calculateLevel(level: number) {
  return Math.floor(level / 5) * 5;
}

export const GenericCharacter = ({
  sprites,
  characterLevel,
  className,
  hairColor,
  hair,
  eyeIris,
  eyeIrisColor,
}: GenericCharacterProps) => {
  const sprite = sprites.evolutions[calculateLevel(characterLevel)];
  const Hair = sprites.hair[hair] ?? sprites.hair[0];
  const EyeIris = sprites.eyeIris[eyeIris];

  return (
    <div className={cn("w-[320px] h-[320px] relative", className)}>
      <div
        className="will-change-transform absolute w-full h-full z-50"
        style={{ color: hairColor }}
      >
        <Hair />
      </div>

      <div className="will-change-transform absolute w-full h-full">
        <img src={sprites.base} />
      </div>

      <div
        className="will-change-transform absolute w-full h-full z-40"
        style={{ color: eyeIrisColor }}
      >
        <EyeIris />
      </div>

      <div className="will-change-transform absolute w-full h-full z-30">
        <img src={sprites.eyes[0]} />
      </div>

      <div className="will-change-transform absolute w-full h-full z-60">
        <img src={sprite.clothe} />
      </div>
    </div>
  );
};
