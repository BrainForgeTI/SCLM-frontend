import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ColorPickerProps = {
  id: string;
  onChange?: (value: string) => void;
  value?: string;
  label?: string;
  className?: string;
};

export const ColorPicker = ({
  id,
  onChange,
  value,
  label,
  className,
}: ColorPickerProps) => {
  const [color, setColor] = useState(value);
  const debounced = useDebounce(color, 150);

  useEffect(() => {
    onChange?.(debounced);
  }, [debounced]);

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn("w-5 h-5 rounded-xs", className)}
        style={{ backgroundColor: value }}
      >
        <input
          onChange={(event) => {
            setColor(event.target.value);
          }}
          id={id}
          type="color"
          className="opacity-0 w-full h-full"
          value={value}
        />
      </div>
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};
