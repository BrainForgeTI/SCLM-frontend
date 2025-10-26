import { Menu } from "../../components/PagelayoutAuth";
import { BannerComponent } from "./components/BannerComponent";
import { BannerFeedback } from "./components/BannerFeedback";
import { BannerFuncComponent } from "./components/BannerFuncComponent";
import { BannerPlansComponent } from "./components/BannerPlansComponent";
import { BannerWhyGameComponent } from "./components/BannerWhyGameComponent";
import { FooterComponent } from "./components/Footercomponent";

export const LandingPage = () => {
    return (
        <div className="flex flex-col h-full w-full font-poppins font-bold gap-10">
             <Menu></Menu>
             <BannerComponent></BannerComponent>
             <BannerFuncComponent></BannerFuncComponent>
             <BannerWhyGameComponent></BannerWhyGameComponent>
             <BannerPlansComponent></BannerPlansComponent>
             {/* <BannerFeedback></BannerFeedback> */}
             <FooterComponent></FooterComponent>
        </div>
    )
}