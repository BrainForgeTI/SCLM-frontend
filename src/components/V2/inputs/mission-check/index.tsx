import { Checkbox } from "@/components/ui/checkbox";

interface MissionCheckProps {
  name: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const MissionCheck = ({
  name,
  checked,
  onChange,
  disabled,
}: MissionCheckProps) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="h-7 w-7 flex items-center justify-center">
        <Checkbox
          disabled={disabled}
          onCheckedChange={onChange}
          checked={checked}
          className="w-6 h-6 cursor-pointer"
        />
      </div>
      <p className="truncate hover:underline">{name}</p>
    </div>
  );
};
