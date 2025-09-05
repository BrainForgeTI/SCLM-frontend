import { GenericCharacter } from "../generic-character";
import { CharacterSprite } from "@/types/character/character-sprite";
import { MaleSprite } from "./config/male";
import { FemaleSprite } from "./config/female";

interface WizardProps {
  gender: "female" | "male";
  level: number;
  className?: string;
}

const variants: Record<string, CharacterSprite> = {
  female: FemaleSprite,
  male: MaleSprite,
};

export const Wizard = ({ gender, level, className }: WizardProps) => {
  const sprite = variants[gender];
  return (
    <GenericCharacter
      sprites={sprite}
      characterLevel={level}
      className={className}
    />
  );
};
