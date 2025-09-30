import { GenericCharacter } from "../generic-character";
import { CharacterSprite } from "@/types/character/character-sprite";
import { FemaleSprite } from "./config/female";
import { MaleSprite } from "./config/male";

interface RogueProps {
  gender: "female" | "male";
  level: number;
  className?: string;
  hairColor: string;
  hair: number;
  eyeIris: number;
  eyeIrisColor: string;
}

const variants: Record<string, CharacterSprite> = {
  female: FemaleSprite,
  male: MaleSprite,
};

export const Rogue = ({
  gender,
  level,
  className,
  hairColor,
  hair,
  eyeIris,
  eyeIrisColor,
}: RogueProps) => {
  const sprite = variants[gender];
  return (
    <GenericCharacter
      hair={hair}
      sprites={sprite}
      characterLevel={level}
      className={className}
      hairColor={hairColor}
      eyeIris={eyeIris}
      eyeIrisColor={eyeIrisColor}
    />
  );
};
