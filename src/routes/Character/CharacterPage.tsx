import { PageLayout, PageTitle } from "../../components/PageLayout"
import CreateIcon from '../../assets/icons/create.svg'
import ActionButton from "../../components/ActionButton/ActionButton"
import { ButtonStyleType } from "../../components/ActionButton/enum/ButtonStyleType"
import { CharacterCard } from "./components/CharacterCard"

export const CharacterPage = () => {

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
                    <CharacterCard />
                </div>
            </div>
        </PageLayout>
    )
}