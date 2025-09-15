import { GenericCharacter } from "../generic-character";
import { CharacterSprite } from "@/types/character/character-sprite";
import { MaleSprite } from "./config/male";
import { FemaleSprite } from "./config/female";

interface WizardProps {
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

export const Wizard = ({
  gender,
  level,
  className,
  hairColor,
  hair,
  eyeIris,
  eyeIrisColor,
}: WizardProps) => {
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
