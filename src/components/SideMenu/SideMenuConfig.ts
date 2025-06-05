import AdventureIcon from "../../assets/icons/adventure.svg";
import DailyTasksIcon from "../../assets/icons/daily_task.svg";
import ProgressIcon from "../../assets/icons/progress.svg";
import StudyIcon from "../../assets/icons/study.svg";
import CharacterIcon from "../../assets/icons/character.svg";
import HomeIcon from "../../assets/icons/home.svg";
import AdventureFullIcon from "../../assets/icons/adventure_full.svg";
import { SideMenuRoutes } from "../../types/side_menu/SideMenuRoutes";

export const sideMenuGlobalRoutes: SideMenuRoutes = {
    label: 'Quadro das Atividades',
    type: 'global',
    routes:
        [
            { path: '/home', label: 'Minhas aventuras', icon: AdventureIcon },
            { path: '/tasks', label: 'Missões diárias', icon: DailyTasksIcon },
            { path: '/progress', label: 'Meu progresso', icon: ProgressIcon },
            { path: '/methods', label: 'Métodos de estudo', icon: StudyIcon },
            { path: '/character', label: 'Meus personagens', icon: CharacterIcon },
        ]
}

export const sideMenuAdventureRoutes: SideMenuRoutes = {
    label: 'Esta Aventura',
    type: 'adventure',
    routes:
        [
            { path: '/adventure', label: 'Home', icon: HomeIcon },
            { path: '/my_adventure', label: 'Aventura', icon: AdventureFullIcon },
        ]
}