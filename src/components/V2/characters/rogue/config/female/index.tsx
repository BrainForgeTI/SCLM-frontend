import BaseImage from "@/assets/characters/generics/female/base/Sprite_Feminino_Base.png";
import Clothe0 from "@/assets/characters/Rogue/female/evolution/Sprite_Feminino_Rogue_Class_Base.png";
import Clothe5 from "@/assets/characters/Rogue/female/evolution/Sprite_Feminino_Rogue_Class_Lvl5.png";
import Clothe10 from "@/assets/characters/Rogue/female/evolution/Sprite_Feminino_Rogue_Class_Lvl10.png";
import Clothe15 from "@/assets/characters/Rogue/female/evolution/Sprite_Feminino_Rogue_Class_Lvl15.png";
import Clothe20 from "@/assets/characters/Rogue/female/evolution/Sprite_Feminino_Rogue_Class_Lvl20.png";
import Eye0 from "@/assets/characters/generics/male/eye/Sprite_Masculino_Eyes.png";
import { CharacterSprite } from "@/types/character/character-sprite";
import { Hair0 } from "@/assets/characters/generics/female/hair/tsx/Hair0";
import { Hair1 } from "@/assets/characters/generics/female/hair/tsx/Hair1";
import { Hair2 } from "@/assets/characters/generics/female/hair/tsx/Hair2";
import { Hair3 } from "@/assets/characters/generics/female/hair/tsx/Hair3";

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
  hair: {
    0: Hair0,
    1: Hair1,
    2: Hair2,
    3: Hair3
  }
};
