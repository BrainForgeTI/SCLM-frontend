import BaseMaleImage from "@/assets/characters/generics/male/base/sprite_masculino_base.png";
import Clothe0Male from "@/assets/characters/rogue/male/evolution/sprite_masculino_rogue_class_base.png";
import Clothe5Male from "@/assets/characters/rogue/male/evolution/sprite_masculino_rogue_class_lvl5.png";
import Clothe10Male from "@/assets/characters/rogue/male/evolution/sprite_masculino_rogue_class_lvl10.png";
import Clothe15Male from "@/assets/characters/rogue/male/evolution/sprite_masculino_rogue_class_lvl15.png";
import Clothe20Male from "@/assets/characters/rogue/male/evolution/sprite_masculino_rogue_class_lvl20.png";
import Eye0Male from "@/assets/characters/generics/male/eye/sprite_masculino_eyes.png";
import { CharacterSprite } from "@/types/character/character-sprite";
import { Hair0 } from "@/assets/characters/generics/male/hair/tsx/hair0";
import { Hair1 } from "@/assets/characters/generics/male/hair/tsx/hair1";
import { Hair2 } from "@/assets/characters/generics/male/hair/tsx/hair2";
import { Hair3 } from "@/assets/characters/generics/male/hair/tsx/hair3";
import { Hair4 } from "@/assets/characters/generics/male/hair/tsx/hair4";
import { Hair5 } from "@/assets/characters/generics/male/hair/tsx/hair5";
import { EyeIris0 } from "@/assets/characters/generics/male/eye/EyeIris0";

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
  eyeIris: {
    0: EyeIris0,
  },
  hair: {
    0: Hair0,
    1: Hair1,
    2: Hair2,
    3: Hair3,
    4: Hair4,
    5: Hair5,
  },
};
