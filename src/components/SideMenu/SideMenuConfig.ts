import AdventureIcon from "../../assets/icons/adventure.svg";
import DailyTasksIcon from "../../assets/icons/daily_task.svg";
import CharacterIcon from "../../assets/icons/character.svg";
import HomeIcon from "../../assets/icons/home.svg";
import AdventureFullIcon from "../../assets/icons/adventure_full.svg";
import { SideMenuRoutes } from "../../types/side_menu/SideMenuRoutes";

export const sideMenuGlobalRoutes: SideMenuRoutes = {
  label: "Quadro das Atividades",
  type: "global",
  routes: [
    { path: "/home", label: "Minhas aventuras", icon: AdventureIcon },
    { path: "/tasks", label: "Missões diárias", icon: DailyTasksIcon },
    { path: "/character", label: "Meus personagens", icon: CharacterIcon },
  ],
};

export const sideMenuAdventureRoutes: SideMenuRoutes = {
  label: "Esta Aventura",
  type: "adventure",
  routes: [
    { path: "/adventure/:id/home", label: "Home", icon: HomeIcon },
    {
      path: "/adventure/:id/content",
      label: "Aventura",
      icon: AdventureFullIcon,
    },
  ],
};
