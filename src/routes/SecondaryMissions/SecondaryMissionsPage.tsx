import { PageLayout } from "../../components/PageLayout";
import WatchIcon from "../../assets/icons/watch.svg";
import CoatArmsOneIcon from "../../assets/images/coat_arms_one.png";
import CoatArmsTwoIcon from "../../assets/images/coat_arms_two.png";
import CoatArmsThreeIcon from "../../assets/images/coat_arms_three.png";
import { useState } from "react";

export const SecondaryMissionsPage = () => {

    
    const [reveal1,setReveal1] = useState(false);
    const [reveal2,setReveal2] = useState(false);
    const [reveal3,setReveal3] = useState(false);
        
    const switchEstilo1 = () =>{
        setReveal1(!reveal1);
    }
    
    const switchEstilo2 = () =>{
        setReveal2(!reveal2);
    }

    const switchEstilo3 = () =>{
        setReveal3(!reveal3);
    }

    return (
        <PageLayout>
            <div className="flex flex-col gap-[50px]">
                <div className="text-white">
                    <h1 className="text-[36px]">Missões secundárias</h1>
                    <div className="flex gap-[10px] items-center">
                        <div className="bg-[#FF8800]/20 flex items-center justify-items-center p-[7px] rounded-sm">
                            <WatchIcon />
                        </div>
                        <p className="text-neutral/40 text-[20px]">Novas missões em 23:15:30</p>
                    </div>
                </div>
                <div className="flex gap-[20px] justify-evenly">
                    <div className={`flex flex-col  justify-center text-center py-[20px] px-[40px] ${reveal1 ? "bg-white text-black":"bg-[#082349]/[.40] text-white" } duration-700 rounded-[40px]`}>
                        <img className={`w-[200px] ${reveal1 ? "hidden":""}`} src={CoatArmsOneIcon} alt="" />
                        <p className={reveal1 ? "":"hidden"}>texto aleatorio</p>
                        <button onClick={switchEstilo1} >Clique para revelar</button>
                    </div>
                    <div className={`flex flex-col  justify-center text-center py-[20px] px-[40px] ${reveal2 ? "bg-white text-black":"bg-[#b26e0f]/[.40] text-white" } duration-700 rounded-[40px]`}>
                        <img className={`w-[200px] ${reveal2 ? "hidden":""}`} src={CoatArmsTwoIcon} alt="" />
                        <p className={reveal2 ? "":"hidden"}>texto aleatorio</p>
                        <button onClick={switchEstilo2} >Clique para revelar</button>
                    </div>
                    <div className={`flex flex-col  justify-center text-center py-[20px] px-[40px] ${reveal3 ? "bg-white text-black":"bg-[#4f1a63]/[.40] text-white" } duration-700 rounded-[40px]`}>
                        <img className={`w-[200px] ${reveal3 ? "hidden":""}`} src={CoatArmsThreeIcon} alt="" />
                        <p className={reveal3 ? "":"hidden"}>texto aleatorio</p>
                        <button onClick={switchEstilo3} >Clique para revelar</button>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="" alt="" />
                        <div>
                            <p>icon</p>
                            <p>numero</p>
                        </div>
                        <p>texto</p>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </PageLayout>
    );
}