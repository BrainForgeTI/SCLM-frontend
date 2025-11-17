
import GoldImg from '../../../assets/images/gold.png';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSessionStore } from '@/store/session-store';
import { LogOut, WalletMinimal } from 'lucide-react';
import { useNavigate } from "react-router";
import DefaultUserImage from "@/assets/images/default-user.webp"



const LayoutHeader = () => {
  const user = useSessionStore()

  const navigate = useNavigate()
  return (
    <div className="h-[60px] w-full bg-card border-b border-neutral/20">
      <div className='w-full h-full flex justify-end px-8'>
        <ul className='flex items-center gap-10'>
          <li className='lg:flex hidden items-center gap-4'>
            <span className='font-semibold text-[16px] text-base-content'>{user.money}</span>
            <img src={GoldImg}></img>
          </li>

          <li className='lg:block hidden'>
            <div className='w-[2px] h-[21px] rounded-full bg-neutral/50'></div>
          </li>

          <li className='lg:flex gap-10 hidden'>
            <div className='flex flex-col text-base-content justify-between'>
              <span className='text-end text-sm'>Bem-vindo</span>
              <span className='font-semibold text-md'>{user.firstName}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='w-[43px] h-[43px] bg-neutral/20 rounded-[10px] bg-cover bg-center' style={{ backgroundImage: `url('${DefaultUserImage}')` }}>
                  <img className='w-ful h-full' src={user.profilePic || ''} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuGroup>
                  <DropdownMenuItem  onClick={() =>{navigate("/plans")}}>
                    <WalletMinimal></WalletMinimal>
                    Planos
                  </DropdownMenuItem>
                  <DropdownMenuItem  onClick={() =>{navigate("/signin")}}>
                    <LogOut></LogOut>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </li>

        </ul>
      </div>
    </div>
  )
}

export default LayoutHeader;
