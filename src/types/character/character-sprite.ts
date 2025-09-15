import { CharacterEvolution } from "./character-evolution";

export interface CharacterSprite {
  base: string;
  evolutions: Record<number, CharacterEvolution>;
  eyes: Record<string, string>;
  eyeIris: Record<string, React.FC<{ className?: string }>>;
  hair: Record<number, React.FC<{ className?: string }>>;
}
