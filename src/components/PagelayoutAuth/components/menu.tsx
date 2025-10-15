import { Button } from "@/components/ui/button";
import LogoSm from "../../../assets/images/logo_sm.png";
import { NavLink } from "react-router";

const Menu = () => {
  return (
    <div className="flex items-center justify-between py-[15px] px-5 lg:px-[80px] 2xl:px-[150px] text-foreground absolute w-full">
      <div className="flex items-center justify-around gap-[10px]">
        <img src={LogoSm} alt="logo pequena Scholarium" />
        <p>Scholarium</p>
      </div>
      <div className="hidden lg:flex gap-[10px]">
        <NavLink className="" to="/landing">Por que nós?</NavLink>
        <NavLink className="" to="/landing">Gamificação</NavLink>
        <NavLink className="" to="/landing">Planos</NavLink>
      </div>
      <NavLink className="p-[10px] border border-primary rounded-[15px] w-[150px] text-center" to="/signup">Cadastrar</NavLink>
    </div>
  );
}

export default Menu;
