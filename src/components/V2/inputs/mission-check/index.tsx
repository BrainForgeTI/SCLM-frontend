import { Checkbox } from "@/components/ui/checkbox";

interface MissionCheckProps {
  name: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const MissionCheck = ({
  name,
  checked,
  onChange,
}: MissionCheckProps) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="h-7 w-7 flex items-center justify-center">
        <Checkbox
          onCheckedChange={onChange}
          checked={checked}
          className="w-6 h-6 cursor-pointer"
        />
      </div>
      <p className="truncate hover:underline">{name}</p>
    </div>
  );
};
