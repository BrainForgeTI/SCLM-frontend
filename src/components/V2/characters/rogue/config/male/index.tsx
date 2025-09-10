import BaseMaleImage from "@/assets/characters/generics/male/base/Sprite_Masculino_Base.png";
import Clothe0Male from "@/assets/characters/Rogue/male/evolution/Sprite_Masculino_Rogue_Class_Base.png";
import Clothe5Male from "@/assets/characters/Rogue/male/evolution/Sprite_Masculino_Rogue_Class_Lvl5.png";
import Clothe10Male from "@/assets/characters/Rogue/male/evolution/Sprite_Masculino_Rogue_Class_Lvl10.png";
import Clothe15Male from "@/assets/characters/Rogue/male/evolution/Sprite_Masculino_Rogue_Class_Lvl15.png";
import Clothe20Male from "@/assets/characters/Rogue/male/evolution/Sprite_Masculino_Rogue_Class_Lvl20.png";
import Eye0Male from "@/assets/characters/generics/male/eye/Sprite_Masculino_Eyes.png";
import { CharacterSprite } from "@/types/character/character-sprite";
import { Hair0 } from "@/assets/characters/generics/male/hair/tsx/hair0";
import { Hair1 } from "@/assets/characters/generics/male/hair/tsx/hair1";
import { Hair2 } from "@/assets/characters/generics/male/hair/tsx/hair2";
import { Hair3 } from "@/assets/characters/generics/male/hair/tsx/hair3";
import { Hair4 } from "@/assets/characters/generics/male/hair/tsx/hair4";
import { Hair5 } from "@/assets/characters/generics/male/hair/tsx/hair5";


export const MaleSprite: CharacterSprite = {
  base: BaseMaleImage,
  evolutions: {
    0: {
      clothe: Clothe0Male,
    },
    5: {
      clothe: Clothe5Male,
    },
    10: {
      clothe: Clothe10Male,
    },
    15: {
      clothe: Clothe15Male,
    },
    20: {
      clothe: Clothe20Male,
    },
  },
  eyes: {
    0: Eye0Male,
  },
  hair: {
    0: Hair0,
    1: Hair1,
    2: Hair2,
    3: Hair3,
    4: Hair4,
    5: Hair5
  }
};
