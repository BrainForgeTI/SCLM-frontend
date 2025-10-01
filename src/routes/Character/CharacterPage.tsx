import { PageLayout, PageTitle } from "../../components/PageLayout"
import CreateIcon from '../../assets/icons/create.svg'
import ActionButton from "../../components/ActionButton/ActionButton"
import { ButtonStyleType } from "../../components/ActionButton/enum/ButtonStyleType"
import { CharacterCard } from "./components/CharacterCard"
import { useListInfoCharacter } from "../v2/CreateCharacter/hooks/use-list-characters"

export const CharacterPage = () => {
    const {states: {characters}} = useListInfoCharacter()
    console.log(characters)
    return (
        <PageLayout>
            <div className="w-full">
                <PageTitle title="Meus personagens" />
                <div className="w-full mt-10 flex justify-end">
                    <div className="w-[100px] md:min-w-[137px]">
                        <ActionButton Icon={CreateIcon} buttonStyle={ButtonStyleType.NORMAL} action={() => {

                        }} label="Criar" style={`bg-primary gap-5 text-primary-content`} />
                    </div>
                </div>

                <div className="w-full flex justify-between mt-10">
                    {characters?.map((character) => (
                        <CharacterCard
                            key={character.id}
                            characterClass={character.characterClass}
                            characterName={character.characterName}
                            eyeIrisColor={character.eyeIrisColor}
                            eyeIrisIndex={character.eyeIrisIndex}
                            gender={character.gender}
                            hairColor={character.hairColor}
                            hairIndex={character.hairIndex}
                            id={character.id}
                            level={character.level}
                            currentExperience={character.currentExperience}
                            maxExperience={character.maxExperience}
                        />
                    ))}
                </div>
            </div>
        </PageLayout>
    )
}