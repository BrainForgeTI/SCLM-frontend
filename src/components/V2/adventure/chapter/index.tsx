import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapse } from "react-collapse";
import { MissionCheck } from "../../inputs/mission-check";
import clsx from "clsx";

export const Chapter = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full flex gap-2 flex-col">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-start"
      >
        <Card className="px-4 py-4 cursor-pointer">
          <div className="flex items-center">
            <p className="font-bold text-lg truncate flex-1">
              1. Estudar conceitos básicos sobre react hooks
            </p>
            <div className="w-10 flex justify-center transition-all">
              <ChevronDown
                className={clsx(
                  `transition-transform duration-300`,
                  {
                    "rotate-180": expanded,
                  },
                  { "rotate-0": !expanded },
                )}
              />
            </div>
          </div>
        </Card>
      </button>

      <Collapse
        isOpened={expanded}
        className="transition-all duration-200"
        theme={{
          collapse: "transiton-all duration-200",
        }}
      >
        <Card className="px-4">
          <div className="w-full h-full">
            <MissionCheck checked={false} name="Estudar os conceitos" />
          </div>
        </Card>
      </Collapse>
    </div>
  );
};
