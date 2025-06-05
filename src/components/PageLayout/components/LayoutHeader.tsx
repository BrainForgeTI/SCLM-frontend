import BellIcon from '../../../assets/icons/bell.svg';
import GoldImg from '../../../assets/images/gold.png';

const LayoutHeader = () => {
    return (
        <div className="h-[60px] w-full bg-neutral/6 border-b border-neutral/20">
            <div className='w-full h-full flex justify-end px-8'>
                <ul className='flex items-center gap-10'>
                    <li className='lg:flex hidden items-center gap-4'>
                        <span className='font-semibold text-[16px] text-base-content'>500</span>
                        <img src={GoldImg}></img>
                    </li>

                    <li className='lg:block hidden'>
                        <div className='w-[2px] h-[21px] rounded-full bg-neutral/50'></div>
                    </li>

                    <li className='lg:flex gap-4 hidden'>
                        <div className='flex flex-col text-base-content justify-between'>
                            <span className='text-end text-[10px]'>Bem-vindo</span>
                            <span className='font-semibold text-[13px]'>Emerson Tanno</span>
                        </div>
                        <div className='w-[43px] h-[43px] bg-neutral/20 rounded-[10px] bg-cover bg-center' style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC3UJfPCCe0kUhLbGxfOhzwHpPspsSnvALTA&s")' }}>

                        </div>
                    </li>

                    <li className='lg:block hidden'>
                        <div className='w-[2px] h-[21px] rounded-full bg-neutral/50'></div>
                    </li>

                    <li>
                        <button className="w-[37px] h-[37px] cursor-pointer hover:border-neutral border border-transparent rounded-[10px] bg-neutral/30 flex justify-center items-center text-neutral">
                            <BellIcon />
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default LayoutHeader;