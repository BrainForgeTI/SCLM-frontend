import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AdventurePicture } from "./components/adventure-picture";
import { Character } from "../../characters/character";
import { CharacterClass } from "@/enums/class";
import { CharacterGender } from "@/enums/character-gender";
import { ColorPicker } from "../../inputs/color-picker";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Color from "color";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const defaultColors = [
  {
    primary: "#FF6B6B",
    secondary: "#4D96FF",
  },
  {
    primary: "#1E3A8A",
    secondary: "#8B5CF6",
  },
  {
    primary: "#FF8C42",
    secondary: "#FFD700",
  },
  {
    primary: "#10B981",
    secondary: "#3B82F6",
  },
  {
    primary: "#EC4899",
    secondary: "#8B5CF6",
  },
];

interface AdventureCardProps {
  form?: UseFormReturn<any>;
  bgPrimary?: string;
  bgSecondary?: string;
  name?: string;
}

export const AdventureCard = ({
  form,
  bgPrimary,
  bgSecondary,
  name,
}: AdventureCardProps) => {
  const randomColor = () => {
    const randomColor =
      defaultColors[Math.floor(Math.random() * defaultColors.length)];
    form?.setValue?.("bgPrimaryColor" as any, randomColor.primary);
    form?.setValue?.("bgSecundaryColor" as any, randomColor.secondary);
  };

  const [nameAdventure] =
    useWatch({
      control: form?.control,
      name: ["nameAdventure"],
    }) ?? [];

  const nameColor = useMemo(() => {
    return Color(bgPrimary).isLight() ? "#000000" : "#ffffff";
  }, [bgPrimary]);

  return (
    <Card className="w-70 p-0 bg-card">
      <CardHeader className="px-0">
        <div
          className="relative w-full rounded-t-xl flex justify-center py-7 flex-col items-center gap-5"
          style={{
            background: `linear-gradient(45deg, ${bgPrimary}, ${bgSecondary})`,
          }}
        >
          <AdventurePicture />
          <p
            className={cn(
              "px-3 line-clamp-2 text-center text-black font-medium text-xl min-h-[1.5rem]",
            )}
            style={{ color: nameColor }}
          >
            {nameAdventure ?? name} {"\u00A0"}
          </p>

          <div className="absolute flex gap-2 flex-col right-[-50px]">
            <Controller
              control={form?.control}
              name={"bgPrimaryColor"}
              render={({ field }) => (
                <ColorPicker
                  id="bg-primary"
                  value={field.value}
                  onChange={field.onChange}
                  className="w-8 h-8 rounded-sm border"
                />
              )}
            />

            <Controller
              control={form?.control}
              name={"bgSecundaryColor"}
              render={({ field }) => (
                <ColorPicker
                  id="bg-secondary"
                  value={field.value}
                  onChange={field.onChange}
                  className="w-8 h-8 rounded-sm border"
                />
              )}
            />

            <Button
              onClick={() => randomColor()}
              type="button"
              className="w-8 h-8 rounded-sm"
            >
              <RefreshCcw />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-5 flex flex-col items-center justify-center">
        <Character
          character={CharacterClass.MARTIAL_ARTIST}
          gender={CharacterGender.MALE}
          hair={0}
          hairColor={"#ffffff"}
          eyeIris={0}
          level={0}
          eyeIrisColor={"#000000"}
          className="w-40 h-40"
        />
      </CardContent>
    </Card>
  );
};
