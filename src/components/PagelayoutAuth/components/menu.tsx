import { NavLink } from "react-router";
import LogoSm from "../../../assets/images/logo_sm.png";

const Menu = () => {
  return (
    <div className="flex items-center justify-between py-[15px] px-5 lg:px-[80px] 2xl:px-[150px] text-foreground absolute w-full">
      <div className="flex items-center justify-around gap-[10px]">
        <img src={LogoSm} alt="logo pequena Scholarium" />
        <p>Scholarium</p>
      </div>
      <div className="hidden lg:flex gap-[10px]">
        <NavLink className={"underline"} to={"/landing"}>Por que nós?</NavLink>
        <NavLink className={"underline"} to={"/signin"}>Gamificação</NavLink>
        <NavLink className={"underline"} to={"/signin"}>Planos</NavLink>
      </div>
      <NavLink className="flex justify-center p-[10px] rounded-[15px] w-[150px] border-[3px] [border-image:linear-gradient(to_right,var(--primary),var(--brand-pink))_1]" to={"/signup"}>Cadastrar</NavLink>
    </div>
  );
}

export default Menu;
