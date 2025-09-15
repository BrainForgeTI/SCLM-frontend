import { CharacterClass } from "@/enums/class";
import { MartialArtist } from "../martial-artist";
import { Rogue } from "../rogue";
import { Warrior } from "../warrior";
import { Wizard } from "../wizard";
import { CharacterGender } from "@/enums/character-gender";
import useDebounce from "@/hooks/use-debounce";

const characters = {
  rogue: Rogue,
  warrior: Warrior,
  "martial-artist": MartialArtist,
  wizard: Wizard,
};

interface CharacterProps {
  character: CharacterClass;
  className?: string;
  gender: CharacterGender;
  hairColor: string;
  hair: number;
  level: number;
  eyeIris: number;
  eyeIrisColor: string;
}

export const Character = ({
  character,
  gender,
  hair,
  hairColor,
  className,
  level,
  eyeIris,
  eyeIrisColor,
}: CharacterProps) => {
  const debouncedHair = useDebounce(hair, 500);
  const debouncedHairColor = useDebounce(hairColor, 500);
  const debouncedCharacter: CharacterClass = useDebounce(character, 500);
  const debouncedEyeIrisColor = useDebounce(eyeIrisColor, 500);

  const CurrentCharacter = characters[debouncedCharacter];

  return (
    <CurrentCharacter
      eyeIris={eyeIris}
      gender={gender}
      hair={debouncedHair}
      hairColor={debouncedHairColor}
      level={level}
      className={className}
      eyeIrisColor={debouncedEyeIrisColor}
    />
  );
};
