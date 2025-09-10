import { MartialArtist } from "../martial-artist"
import { Rogue } from "../rogue"
import { Warrior } from "../warrior"
import { Wizard } from "../wizard"

const characters = {
  'rogue': Rogue,
  'warrior': Warrior,
  'martial-artist': MartialArtist,
  'wizard': Wizard
}

interface CharacterProps {
  character: 'rogue' | 'warrior' | 'martial-artist' | 'wizard',
  className?: string
  gender: 'male' | 'female'
  hairColor: string
  hair: number
  level: number
}

export const Character = ({ character, gender, hair, hairColor, className, level }: CharacterProps) => {
  const CurrentCharacter = characters[character]

  return <CurrentCharacter gender={gender} hair={hair} hairColor={hairColor} level={level} className={className} />
}
