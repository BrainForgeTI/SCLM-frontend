import { Checkbox } from "@/components/ui/checkbox";

interface MissionCheckProps {
  name: string;
  checked: boolean;
}

export const MissionCheck = ({ name, checked }: MissionCheckProps) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="h-7 w-7 flex items-center justify-center">
        <Checkbox checked={checked} className="w-6 h-6 cursor-pointer" />
      </div>
      <p className="truncate">{name}</p>
    </label>
  );
};
