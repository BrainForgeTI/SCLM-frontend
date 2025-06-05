import { ChangeEvent, useEffect } from 'react';
import FireIcon from '../../assets/icons/fire.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import AddIcon from '../../assets/icons/add.svg';
import LogoImg from '../../assets/images/logo_sm.png';
import { getInvertedColorConstrast, getTextConstrastColorGradient } from '../../utils/getColorContrastGradient.ts';
import { AdventureCardType } from '../../types/AdventureCardType.ts';
import { getDominantColorFromImage } from '../../utils/getDominantColorFromImage.ts';
import { rgbToHex } from '../../utils/rgbToHex.ts';
import { useNavigation } from 'react-router';

interface Props {
    adventure: AdventureCardType;
    joinAdventure?: (adventure: AdventureCardType) => void
    setAdventures?: React.Dispatch<React.SetStateAction<AdventureCardType[]>>;
    setNewAdventure?: React.Dispatch<React.SetStateAction<AdventureCardType>>;
    addingNewAdventure?: boolean;
    cancelAddNewAdventure?: () => void;
    createAdventure?: () => void;
}

const AdventureCard = (props: Props) => {

    function handleNewAdventureTitleInput(event: ChangeEvent<HTMLInputElement>) {
        if (props.setNewAdventure) {
            props.setNewAdventure((prev) => ({
                ...prev,
                title: event.target.value
            }))
        }
    }

    function handleColorPicker(event: ChangeEvent<HTMLInputElement>, field: string) {
        const value = event.target.value;

        if (props.setAdventures) {
            props.setAdventures((prev) =>
                prev.map((card) => card.id === props.adventure.id ? { ...card, [field]: value } : card)
            )
        } else if (props.setNewAdventure) {
            props.setNewAdventure((prev) => ({
                ...prev,
                [field]: value
            }))
        }
    }

    function handleInputImage(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];


        if (file) {
            let imageUrl = URL.createObjectURL(file);
            let image = new Image();
            image.src = imageUrl;

            image.onload = function () {
                let color = getDominantColorFromImage(image);
                if (props.setNewAdventure && color) {
                    let colorHex = rgbToHex(color);
                    props.setNewAdventure((prev) => ({
                        ...prev,
                        image: image.src,
                        colorFrom: colorHex,
                        colorTo: colorHex
                    }))
                }
            }

        }
    }

    function generateImgUrlToAdventure(image: File | string | null) {
        if (image instanceof File) {
            return `url("${URL.createObjectURL(image)}")`
        } else if (typeof image === 'string') {
            return `url("${image}"`
        }

        return LogoImg
    }

    function getCardLabel() {
        if (props.adventure.progress > 0) {
            return 'Começar';
        }

        if (props.addingNewAdventure) {
            return "Criar aventura";
        }

        return "Continuar";
    }

    return (
        <div className='relative flex flex-col'>
            {
                props.addingNewAdventure ?
                    <>
                        {/* <div className='h-7'></div> */}
                        <div className='lg:gap-4 absolute top-[-60px] right-0 flex gap-4 mt-2 justify-end'>
                            <div>
                                <label htmlFor='addingnewadventureinput1' className='w-[35px] h-[35px] rounded-[5px] block flex justify-center items-center' style={{ color: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo), backgroundColor: props.adventure.colorFrom }}>
                                    <EditIcon />
                                </label>
                                <input onChange={(event: ChangeEvent<HTMLInputElement>) => { handleColorPicker(event, 'colorFrom') }} id='addingnewadventureinput1' type='color' className='h-1 opacity-0' />
                            </div>

                            <div>
                                <label htmlFor='addingnewadventureinput2' className='w-[35px] h-[35px] rounded-[5px] block flex justify-center items-center' style={{ color: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo), backgroundColor: props.adventure.colorTo }}>
                                    <EditIcon />
                                </label>
                                <input onChange={(event: ChangeEvent<HTMLInputElement>) => { handleColorPicker(event, 'colorTo') }} id='addingnewadventureinput2' type='color' className='h-1 opacity-0' />
                            </div>
                        </div>
                    </>
                    :
                    ''
            }

            <div className='relative w-[306px] h-[474px] bg-base300 rounded-[20px] p-3 pt-5 pb-10 flex flex-col items-center justify-between'>
                <button onClick={() => { props.addingNewAdventure ? props.cancelAddNewAdventure!() : '' }} className='cursor-pointer absolute text-base-content/60 w-[28px] border border-neutral-content/50  h-[28px] bg-base300/74 rounded-[5px] flex justify-center items-center right-[35px] top-[30px] hover:scale-[1.1] transition-all duration-150'>
                    {
                        props.addingNewAdventure ?
                            <TrashIcon />
                            :
                            <EditIcon />
                    }
                </button>

                <svg width="281" height="217" viewBox="0 0 281 217" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20C0 8.95428 8.9543 0 20 0H261C272.046 0 281 8.95431 281 20V170.347C281 173.063 280.445 175.83 279.259 178.273C242.899 253.158 136.273 200.433 16.714 177.454C7.09941 175.606 0 167.281 0 157.49V20Z" fill={`url(#${props.adventure.id})`} />
                    <defs>
                        <linearGradient id={`${props.adventure.id}`} x1="6.5" y1="171.5" x2="276" y2="4.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor={props.adventure.colorFrom} />
                            <stop offset="1" stopColor={props.adventure.colorTo} />
                        </linearGradient>
                    </defs>
                    <foreignObject x="0" y="0" width="281" height="175">
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            {
                                props.addingNewAdventure ?
                                    <>
                                        <div className='relative w-[80px] h-[80px] rounded-[10px] border bg-cover bg-center' style={{ backgroundColor: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo), backgroundImage: generateImgUrlToAdventure(props.adventure.image), borderColor: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo) }}>
                                            <div className='absolute bottom-[-10px] right-[-10px] w-[30px] h-[30px]'>
                                                <label htmlFor='adventureimageinput' className='w-full h-full text-base-content bg-base300 border rounded-[5px] flex justify-center items-center cursor-pointer hover:scale-[1.1] transition duration-150' style={{ borderColor: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo) }}>
                                                    <EditIcon />
                                                </label>
                                                <input onChange={handleInputImage} id='adventureimageinput' type='file' className='invisible' />
                                            </div>

                                            {
                                                props.adventure.image ?
                                                    ''
                                                    :
                                                    <div className='w-full h-full bg-base300 rounded-[10px] flex justify-center items-center'>
                                                        <img src={generateImgUrlToAdventure(props.adventure.image)} />
                                                    </div>
                                            }

                                        </div>
                                        <input onChange={handleNewAdventureTitleInput} autoFocus type='text' value={props.adventure.title} className='mt-5 border rounded-[10px] outline-none py-1 px-2 text-center font-bold w-[200px]' style={{ borderColor: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo), color: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo) }} />

                                    </>
                                    :
                                    <>
                                        <div className='w-[80px] h-[80px] bg-cover bg-center rounded-[10px]' style={{ backgroundImage: `url("${props.adventure.image}")` }}></div>
                                        <span className={`font-bold pt-5`} style={{ color: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo) }}>{props.adventure.title}</span>
                                    </>
                            }
                        </div>
                    </foreignObject>
                </svg>

                {
                    props.addingNewAdventure ?
                        <>
                            <button className='w-[96px] h-[96px] cursor-pointer bg-neutral-content/2 border border-base-content/20 hover:scale-[1.05] transition-all duration-150 rounded-[10px] flex justify-center items-center flex-col gap-2 text-base-content/30'>
                                <AddIcon />
                                <span className='text-[12px]'>Personagem</span>
                            </button>
                        </>
                        :
                        <>
                            <div className='w-[90px] h-[90px] mt-2 flex justify-center items-center'>
                                <img src={props.adventure.character?.imageUrl}></img>
                            </div>

                            <div className='w-full flex gap-3 justify-center items-center pt-2'>
                                <span className='font-bold font-[12px] text-base-content'>{props.adventure.character?.name}</span>
                                <div className='flex gap-2 text-[#FFB60B] items-center'>
                                    <FireIcon />
                                    <span className='font-bold'>{props.adventure.character?.level}</span>
                                </div>
                            </div>

                            <div className='relative w-[181px] p-1 rounded-full bg-base-content/10 mt-2 flex items-center'>
                                <div className={`w-full h-[10px] rounded-full opacity-50`} style={{ backgroundImage: `linear-gradient(to right, ${props.adventure.colorFrom}, ${props.adventure.colorTo})`, width: `${props.adventure.progress}%` }}></div>
                                <span className='absolute text-[12px] font-bold' style={{ left: '50%', transform: 'translateX(-50%)', color: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo) }}>{props.adventure.progress}%</span>
                            </div>
                        </>
                }

                <button onClick={() => {
                    if (props.addingNewAdventure && props.createAdventure) {
                        props.createAdventure();
                    }

                    if (props.joinAdventure) {
                        props.joinAdventure(props.adventure);
                    }
                }} className='cursor-pointer hover:scale-[1.01] transiion-all duration-150 w-[188px] h-[43px] text-[12px] font-semibold rounded-[10px] mt-6 text-[13px]' style={{ backgroundImage: `linear-gradient(to right, ${props.adventure.colorFrom}, ${props.adventure.colorTo})`, color: getTextConstrastColorGradient(props.adventure.colorFrom, props.adventure.colorTo) }}>{getCardLabel()}</button>
            </div >
        </div>
    )
}

export default AdventureCard;
