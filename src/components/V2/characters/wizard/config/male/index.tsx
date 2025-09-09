import BaseMaleImage from "@/assets/characters/generics/male/base/Sprite_Masculino_Base.png";
import Clothe0Male from "@/assets/characters/wizard/male/evolution/Sprite_Masculino_Wizard_Class_Base.png";
import Clothe5Male from "@/assets/characters/wizard/male/evolution/Sprite_Masculino_Wizard_Class_Lvl5.png";
import Clothe10Male from "@/assets/characters/wizard/male/evolution/Sprite_Masculino_Wizard_Class_Lvl10.png";
import Clothe15Male from "@/assets/characters/wizard/male/evolution/Sprite_Masculino_Wizard_Class_Lvl15.png";
import Clothe20Male from "@/assets/characters/wizard/male/evolution/Sprite_Masculino_Wizard_Class_Lvl20.png";
import Eye0Male from "@/assets/characters/generics/male/eye/Sprite_Masculino_Eyes.png";
import { CharacterSprite } from "@/types/character/character-sprite";


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
    0: 'Hair0',
    1: '',
    2: '',
    3: '',
  }
};
