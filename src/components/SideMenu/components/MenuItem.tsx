import { Button } from "@/components/ui/button"

interface Props {
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  active: boolean
  action: () => void
}

const MenuItem = (props: Props) => {
  return (
    <Button onClick={props.action} className={`select-none relative w-full h-15 rounded-[15px] flex gap-8 items-center text-secondary-content border cursor-pointer ${props.active ? 'font-semibold bg-primary/50 border-primary' : 'border-neutral/26 bg-transparent'}`}>
      <div className="w-full flex items-center gap-5">
        <div className="w-[19px] px-[23px]"><props.icon /></div>
        <span className="md:text-md overflow-hidden pe-4 text-nowrap text-ellipsis text-[12px]">{props.label}</span>
        <span className={`${props.active ? 'visible' : 'invisible'} w-[6px] h-[19px] bg-primary rounded-full absolute left-[-4px]`}></span>
      </div>
    </Button>
  )
}

export default MenuItem;
