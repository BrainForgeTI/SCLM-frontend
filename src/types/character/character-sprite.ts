import { CharacterEvolution } from "./character-evolution";
import { HairSprite } from "./hair-sprite";

export interface CharacterSprite {
  base: string;
  evolutions: Record<number, CharacterEvolution>;
  eyes: Record<string, string>;
  hair: HairSprite;
}
