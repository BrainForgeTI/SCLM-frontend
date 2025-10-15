import { Menu } from "../../components/PagelayoutAuth";
import { BannerComponent } from "./components/BannerComponent";
import { BannerFuncComponent } from "./components/BannerFuncComponent";

export const LandingPage = () => {
    return (
        <div className="flex flex-col h-full w-full font-poppins">
             <Menu></Menu>
             <BannerComponent></BannerComponent>
             <BannerFuncComponent></BannerFuncComponent>
        </div>
    )
}