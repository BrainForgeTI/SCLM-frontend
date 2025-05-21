import AdventureIcon from "../../assets/icons/adventure.svg";
import DailyTasksIcon from "../../assets/icons/daily_task.svg";
import ProgressIcon from "../../assets/icons/progress.svg";
import StudyIcon from "../../assets/icons/study.svg";
import CharacterIcon from "../../assets/icons/character.svg";
import SwitchIcon from "../../assets/icons/switch.svg";

interface ISideMenuRoutes {
    label: string
    routes: {
        path: string
        label: string
        icon: any
    }[]
}

export const sideMenuGlobalRoutes: ISideMenuRoutes = {
    label: 'Quadro das Atividades',
    routes:
        [
            { path: '/home', label: 'Minhas aventuras', icon: AdventureIcon },
            { path: '/tasks', label: 'Missões diárias', icon: DailyTasksIcon },
            { path: '/progress', label: 'Meu progresso', icon: ProgressIcon },
            { path: '/methods', label: 'Métodos de estudo', icon: StudyIcon },
            { path: '/character', label: 'Meus personagens', icon: CharacterIcon },
        ]
}

export const sideMenuAdventureRoutes: ISideMenuRoutes = {
    label: 'Esta Aventura',
    routes:
        [
            {path: '/home',label: 'Trocar de trilha', icon: SwitchIcon}
        ]
}