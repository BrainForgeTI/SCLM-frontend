import { useContext } from 'react';
import NoticeIcon from '../../../assets/icons/notice.svg';
import ActionButton from '../../../components/ActionButton/ActionButton';
import { AdventureContext } from '../../../context/adventure/AdventureContext';

const AdventureNotice = () => {
    const adventureContext = useContext(AdventureContext);

    const buttons = [
        {
            label: 'Atribuir ou criar Personagem',
            visible: !(adventureContext.adventure !== null && adventureContext.adventure.character !== null)
        },
        {
            label: 'Criar Capítulos',
            visible: adventureContext.adventure && adventureContext.adventure.chapters.length === 0
        }
    ]

    let buttonCount = 0;


    return (
        <div className="mt-5 md:mt-20 w-full 2xl:w-1/2 bg-base-content/3 rounded-[20px] flex flex-col items-center p-10 gap-10">
            <div className="w-[187px] h-[172px] bg-base-content/7 rounded-[20px] text-base-content/21 flex justify-center items-center">
                <NoticeIcon />
            </div>

            <p className='text-[20px] md:text-[24px] font-medium max-w-[540px] text-center text-base-content/62'>
                Você precisa realizar os seguinte passos para iniciar sua aventura:
            </p>

            <div className='w-full flex flex-col items-center gap-5'>

                {
                    buttons.map((item, index) => {
                        if (item.visible == true) {
                            buttonCount += 1;
                            return (
                                <div key={`notice-${index}]`} className='w-full md:w-[377px] flex gap-4 items-center'>
                                    <span className='hidden md:block text-[40px] font-bold text-base-content/25 w-[50px]'>{`${buttonCount}.`}</span>
                                    <ActionButton action={() => { }} label={`${item.label}`} style='bg-primary text-primary-content' />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default AdventureNotice;