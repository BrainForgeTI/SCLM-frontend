import {
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import MenuItem from "./components/MenuItem";
import {
  sideMenuGlobalRoutes,
  sideMenuAdventureRoutes,
} from "./SideMenuConfig";
import LogoSM from "../../assets/images/logo_sm.png";
import MenuIcon from "../../assets/icons/menu.svg";
import GoldImg from "../../assets/images/gold.png";
import { useContext, useEffect, useState } from "react";
import { AdventureContext } from "../../context/adventure/AdventureContext";
import { SideMenuRoutes } from "../../types/side_menu/SideMenuRoutes";
import AdventureProgress from "../AdventureProgress/AdventureProgress";
import FireIcon from "../../assets/icons/fire.svg";
import { useSessionStore } from "@/store/session-store";
import DefaultUserImage from "@/assets/images/default-user.webp"
import { Button } from "../ui/button";
import { LogOut, WalletMinimal } from "lucide-react";

export const SideMenu = () => {
  const globalRoutes = sideMenuGlobalRoutes;
  const adventureRoutes = sideMenuAdventureRoutes;
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigation = useNavigate();

  const adventureContext = useContext(AdventureContext);
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate()

  const user = useSessionStore()

  function toggleMenu() {
    setMenuActive(!menuActive);
  }

  function navigateTo(routeType: string, path: string) {
    if (routeType === "global") {
      adventureContext.setAdventure(null);
      navigation(path);
    } else {
      const pathWithId = generatePath(path, { id });
      navigation(pathWithId);
    }
  }

  function renderRoutes(routes: SideMenuRoutes) {
    return routes.routes.map((route) => {
      const currentPath = location.pathname;
      const routeActive = !!matchPath(route.path, currentPath);
      return (
        <li key={route.path}>
          <MenuItem
            action={() => {
              navigateTo(routes.type, route.path);
            }}
            label={route.label}
            icon={route.icon}
            active={routeActive}
          />
        </li>
      );
    });
  }

  useEffect(() => {
    const html = document.documentElement;
    if (menuActive) {
      html.style.overflowY = "hidden";
    } else {
      html.style.overflowY = "auto";
    }
  }, [menuActive]);

  // <const exists = globalRoutes.routes.some(route => route.label === 'Trocar de trilha');
  // if (location.pathname === '/tasks') {

  //     if (!exists) {
  //         globalRoutes.routes.push({
  //             path: '/home',
  //             label: 'Trocar de trilha',
  //             icon: SwitchIcon,
  //         });
  //     }
  // } else {

  //     if (exists) {
  //         globalRoutes.routes = globalRoutes.routes.filter(
  //             route => route.label !== 'Trocar de trilha'
  //         );
  //     }
  // }>

  return (
    <>
      <aside
        className={`fixed lg:static h-full flex gap-[15px] z-90 transition-all duration-350 ${menuActive ? "left-[0px]" : "md:left-[-350px] left-[-300px]"}`}
      >
        <div className="md:w-[320px] bg-sidebar border-r w-[300px] h-full flex p-4 flex-col items-center border-e border-base-content/20 overflow-y-auto">
          <div className="flex gap-3 text-base-content/80 font-bold text-[20px] items-center h-[45px]">
            <img src={LogoSM}></img>
            <span className="uppercase">Atenium</span>
          </div>

          <div className="w-full flex flex-col items-center mt-10 gap-2">
            {adventureContext.adventure ? (
              <>
                <div
                  className={`w-24 h-24 bg-cover bg-center rounded-[10px] border-solid border-white`}
                  style={{
                    backgroundImage: `url('${adventureContext.adventure.image}')`,
                  }}
                ></div>

                <span className="text-white">
                  {adventureContext.adventure.title}
                </span>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-[5px] text-white">
                    <div className="text-[#FFB60B]">
                      <FireIcon></FireIcon>
                    </div>
                    <div>{adventureContext.adventure.progress}</div>
                  </div>
                  {<AdventureProgress progress="80"></AdventureProgress>}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <nav className="w-full pt-10 flex flex-col gap-6">
            {id ? (
              <div>
                <div className="text-base-content/54 uppercase text-[15px] ps-3 pb-2 font-semibold">
                  {adventureRoutes.label}
                </div>
                <ul className="w-full flex flex-col gap-4">
                  {renderRoutes(adventureRoutes)}
                </ul>
              </div>
            ) : (
              ""
            )}
            <div className="w-full">
              <div className="text-base-content/54 uppercase text-[15px] ps-3 pb-2 font-semibold">
                {globalRoutes.label}
              </div>
              <ul className="w-full flex flex-col gap-4">
                {renderRoutes(globalRoutes)}
              </ul>
            </div>
          </nav>

          <div className="lg:hidden w-full border border-base-content/20 rounded-[15px] p-2 mt-10 ">
            <div className="flex gap-5 items-center px-2 py-2">
              <div className="w-[70px] h-[70px] rounded-[15px] bg-white bg-cover overflow-hidden" style={{ backgroundImage: `url("${DefaultUserImage}")` }}>
                <img src={user.profilePic || ""} className="w-full h-full object-cover flex items-center justify-center"></img>
              </div>
              <div className="flex flex-col text-base-content">
                <span className="text-[12px]">Olá</span>
                <span className="font-medium">{user.firstName}</span>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-4 px-2">
              <img src={GoldImg} className="w-6 h-6"></img>
              <span className="font-semibold text-[20px] text-base-content">
                {user.money}
              </span>
            </div>
            <div className="mt-5 flex gap-2 justify-between">
              <Button variant={"ghost"} onClick={() => navigate("/plans")}>
                <WalletMinimal/>
                Planos
              </Button>

              <Button variant={"ghost"} onClick={() => navigate("/signin")}>
                <LogOut />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </aside>
      <button
        onClick={toggleMenu}
        className={`fixed z-40 lg:hidden w-[40px] h-[40px] mt-[10px] bg-background border transition-all duration-350 border-base-content/40 rounded-[10px] flex justify-center items-center text-base-content/30 ${menuActive ? "left-[320px]" : "md:left-[15px] left-[15px]"}`}
      >
        <MenuIcon />
      </button>
    </>
  );
};

export default SideMenu;
