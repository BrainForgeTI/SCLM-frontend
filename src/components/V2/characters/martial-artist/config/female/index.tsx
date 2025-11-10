import BaseImage from "@/assets/characters/generics/female/base/sprite_feminino_base.png";
import Clothe0 from "@/assets/characters/martial-Artist/female/evolution/sprite_feminino_martial-artist_class_base.png";
import Clothe5 from "@/assets/characters/martial-Artist/female/evolution/sprite_feminino_martial-artist_class_lvl5.png";
import Clothe10 from "@/assets/characters/martial-Artist/female/evolution/sprite_feminino_martial-artist_class_lvl10.png";
import Clothe15 from "@/assets/characters/martial-Artist/female/evolution/sprite_feminino_martial-artist_class_lvl15.png";
import Clothe20 from "@/assets/characters/martial-Artist/female/evolution/sprite_feminino_martial-artist_class_lvl20.png";
import Eye0 from "@/assets/characters/generics/male/eye/sprite_masculino_eyes.png";
import { EyeIris0 } from "@/assets/characters/generics/female/eye/EyeIris0";
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
  eyeIris: {
    0: EyeIris0,
  },
  hair: {
    0: Hair0,
    1: Hair1,
    2: Hair2,
    3: Hair3,
  },
};
