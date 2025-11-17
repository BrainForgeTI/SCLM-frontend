export function getCharacterClassLabel(value: "rogue" | "warrior" | "martial-artist" | "wizard") {
  const characterClass = {
    "rogue": "Ladino",
    "warrior": "Guerreiro",
    "martial-artist": "Artista Marcial",
    "wizard": "Mago",
  }

  return characterClass[value]
}
