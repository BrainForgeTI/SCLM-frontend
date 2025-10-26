import { useNavigate } from "react-router";
import LogoSm from "../../../assets/images/logo_sm.png";

const Menu = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between py-[15px] px-5 lg:px-[80px] 2xl:px-[150px] text-foreground absolute w-full">
      <div className="flex items-center justify-around gap-[10px] cursor-pointer" onClick={() => {navigate("/signin")}}>
        <img src={LogoSm} alt="logo pequena Scholarium" />
        <p className="font-normal">Scholarium</p>
      </div>
      <div className="hidden lg:flex gap-[70px]">
        <button className="cursor-pointer hover:text-white/80 font-normal" onClick={() => navigate("/")}>Por que nós?</button>
        <button className="cursor-pointer hover:text-white/80 font-normal" onClick={() => navigate("/")}>Gamificação</button>
        <button className="cursor-pointer hover:text-white/80 font-normal" onClick={() => navigate("/")}>Planos</button>
      </div>
      <div className="flex w-[150px] md:w-[200px] h-[50px] bg-gradient-to-r from-[#E39EF7]/80 to-[#776EE8]/80 rounded-xl justify-center items-center p-0.5 shadow shadow-lg font-normal" onClick={() => navigate("/signup")}>
          <div className="flex w-[150px] md:w-[200px] h-[45px] bg-background hover:bg-transparent justify-center items-center rounded-xl cursor-pointer">
            Cadastrar
          </div>
      </div>
    </div>
  );
}

export default Menu;