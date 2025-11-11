import InstagramIcon from "../../../assets/icons/instagram.png"
import LinkedinIcon from "../../../assets/icons/linkedin.png"
import YoutubeIcon from "../../../assets/icons/youtube.png"
import LogoSm from "../../../assets/images/logo_sm.png"
export const FooterComponent = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-5 m-5">
            <div className="w-[350px] md:w-[1200px] h-[1px] bg-white/10"></div>
            <div className="flex flex-col justify-center items-center gap-5">
                <div ><img className="w-[50px]" src={LogoSm} alt="Scholarium logo image" /></div>
                <div className="text-[16px] font-normal">Sigam-nos</div>
                <div className="flex justify-center gap-10">
                    <div className="w-[40px]"><img src={InstagramIcon} alt="Instagram icon" /></div>
                    <div className="w-[40px]"><img src={LinkedinIcon} alt="LinkedinIcon icon" /></div>
                    <div className="w-[40px]"><img src={YoutubeIcon} alt="Youtube icon" /></div>
                </div>
            </div>
            <div className="w-[350px] md:w-[1200px] h-[1px] bg-white/10"></div>
            <div className="text-[16px] md:text-[20px] font-normal">Copyright © 2025 Scholarium</div>
        </div>
    )
}