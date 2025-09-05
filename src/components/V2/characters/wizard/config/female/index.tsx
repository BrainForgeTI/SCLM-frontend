import BaseImage from "@/assets/characters/generics/female/base/Sprite_Feminino_Base.png";
import Clothe0 from "@/assets/characters/wizard/female/evolution/Sprite_Feminino_Wizard_Class_Base.png";
import Clothe5 from "@/assets/characters/wizard/female/evolution/Sprite_Feminino_Wizard_Class_Lvl5.png";
import Clothe10 from "@/assets/characters/wizard/female/evolution/Sprite_Feminino_Wizard_Class_Lvl10.png";
import Clothe15 from "@/assets/characters/wizard/female/evolution/Sprite_Feminino_Wizard_Class_Lvl15.png";
import Clothe20 from "@/assets/characters/wizard/female/evolution/Sprite_Feminino_Wizard_Class_Lvl20.png";
import Eye0 from "@/assets/characters/generics/male/eye/Sprite_Masculino_Eyes.png";
import { CharacterSprite } from "@/types/character/character-sprite";

export const FemaleSprite: CharacterSprite = {
  base: BaseImage,
  evolutions: {
    0: {
      clothe: Clothe0,
    },
    5: {
      clothe: Clothe5,
    },
    10: {
      clothe: Clothe10,
    },
    15: {
      clothe: Clothe15,
    },
    20: {
      clothe: Clothe20,
    },
  },
  eyes: {
    0: Eye0,
  },
};
