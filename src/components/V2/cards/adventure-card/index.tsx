import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Character } from "../../characters/character";
import { CharacterClass } from "@/enums/class";
import { CharacterGender } from "@/enums/character-gender";
import { ColorPicker } from "../../inputs/color-picker";
import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Edit, Play, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import AdventureBackgroundImage from "@/assets/images/adventure-background.jpg";
import { CreateAdventureDialog } from "../../dialogs/create-adventure-dialog";
import { Adventure } from "@/types/adventure/adventure";

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
  adventure?: Adventure;
  editable?: boolean;
  className?: string;
  onPlayClick?: () => void;
  playDisabled?: boolean;
}

export const AdventureCard = ({
  form,
  adventure,
  className,
  onPlayClick,
  playDisabled,
  editable,
}: AdventureCardProps) => {
  const randomColor = () => {
    const randomColor =
      defaultColors[Math.floor(Math.random() * defaultColors.length)];
    form?.setValue?.("bgPrimaryColor" as any, randomColor.primary);
    form?.setValue?.("bgSecundaryColor" as any, randomColor.secondary);
  };

  return (
    <Card className={cn("relative w-70 p-0 bg-card gap-0", className)}>
      <CardHeader className="relative rounded-t-xl px-0 overflow-hidden">
        {editable && (
          <div className="absolute px-4 py-4">
            <CreateAdventureDialog adventure={adventure}>
              <Button
                variant={"ghost"}
                className="important z-90 cursor-pointer"
              >
                <Edit />
              </Button>
            </CreateAdventureDialog>
          </div>
        )}
        <div
          className="absolute w-60 h-60 -top-20 -right-20 bg-center rounded-full"
          style={{ backgroundImage: `url(${AdventureBackgroundImage})` }}
        >
          <div
            className="w-full rounded-full h-full flex justify-center py-2 flex-col items-center gap-5"
            style={{
              background: `linear-gradient(45deg, ${(adventure?.bgPrimaryColor ?? "#ffffff") + "E6"}, ${(adventure?.bgSecundaryColor ?? "#ffffff") + "E6"})`,
            }}
          ></div>
        </div>

        <div className="w-full h-full py-5 flex justify-center items-center">
          {adventure?.character && (
            <Character
              character={adventure.character.characterClass}
              gender={adventure.character.gender}
              hair={adventure.character.hairIndex}
              hairColor={adventure.character.hairColor}
              eyeIris={adventure.character.eyeIrisIndex}
              level={adventure.character.level}
              eyeIrisColor={adventure.character.eyeIrisColor}
              className="w-30 h-30"
            />
          )}

          {!adventure?.character && (
            <div className="w-30 h-30 text-[40px]">
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="py-6 mx-2 flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <p
            className={cn(
              "px-3 line-clamp-2 text-center font-bold uppercase text-card-foreground min-h-[1.5rem]",
            )}
          >
            {adventure?.nameAdventure} {"\u00A0"}
          </p>
          {adventure?.description?.trim() !== "" && (
            <div
              className="w-30 h-[1px] bg-pink-600"
              style={{ background: adventure?.bgPrimaryColor }}
            ></div>
          )}
          <p className="text-xs text-center">{adventure?.description}</p>
        </div>

        <div className="absolute flex gap-2 flex-row top-[-50px] lg:top-0 lg:right-[-50px] lg:flex-col">
          {form && (
            <>
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
                className="w-8 h-8 rounded-sm cursor-pointer"
                variant={"outline"}
              >
                <RefreshCcw />
              </Button>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-1 flex items-end pb-6">
        <div
          className="w-full p-[2px] rounded-lg"
          style={{
            background: `linear-gradient(45deg, ${(adventure?.bgPrimaryColor ?? "#ffffff") + "E6"}, ${(adventure?.bgSecundaryColor ?? "#ffffff") + "E6"})`,
          }}
        >
          <Button
            type="button"
            variant={"secondary"}
            disabled={!onPlayClick || playDisabled}
            className="w-full cursor-pointer"
            onClick={onPlayClick}
          >
            <Play />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
