import { CharacterEvolution } from "./character-evolution";

export interface CharacterSprite {
  base: string;
  evolutions: Record<number, CharacterEvolution>;
  eyes: Record<string, string>;
  hair: Record<number, React.FC<{ className?: string }>>;
}
