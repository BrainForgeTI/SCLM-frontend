import { Checkbox } from "@/components/ui/checkbox";
import { useAdventureStore } from "@/store/adventure-store";
import { MissionType } from "@/types/adventure/mission";
import { useNavigate } from "react-router";

interface MissionCheckProps {
  mission: MissionType;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  checked: boolean;
}

export const MissionCheck = ({
  mission,
  checked,
  onChange,
  disabled,
}: MissionCheckProps) => {
  const navigate = useNavigate();
  const adventureId = useAdventureStore((state) => state.adventure.id);

  function goToNotebook() {
    console.log(mission);
    navigate(`/adventure/${adventureId}/notebook/${mission.id}`);
  }

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
      <button onClick={goToNotebook} type="button" className="text-md truncate">
        <p className="truncate hover:underline">{mission.title}</p>
      </button>
    </div>
  );
};
