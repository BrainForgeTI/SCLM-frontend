import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import clsx from "clsx";
import { ChapterType } from "@/types/adventure/chapter";
import { Mission } from "../mission";
import { CreateMission } from "../create-mission";
import { Button } from "@/components/ui/button";
import { useChapter } from "./hooks/use-chapter";
import { MISSION_TYPE } from "@/constants/mission-type";

interface ChapterProps {
  chapter: ChapterType;
  number?: number;
}

export const Chapter = ({ chapter, number }: ChapterProps) => {
  const {
    states: { mutateChallenge, isPendingChallenge },
  } = useChapter();

  const [expanded, setExpanded] = useState(false);
  const [allMissionsCompleted, setAllMissionsCompleted] = useState(false);
  const [challengeGenerated, setChallengeGenerated] = useState(false);

  function handleMissionsCompleted() {
    if (
      !chapter.missions.find((mission) => mission.isFinished === false) &&
      !chapter.missions.find(
        (mission) => mission.type === MISSION_TYPE.CHALLENGE,
      )
    ) {
      setAllMissionsCompleted(true);
    } else {
      setAllMissionsCompleted(false);
    }
  }

  function handleChanllengeGenerated() {
    if (
      chapter.missions.find(
        (mission) => mission.type === MISSION_TYPE.CHALLENGE,
      )
    ) {
      setChallengeGenerated(true);
    }
  }

  useEffect(() => {
    if (chapter.missions) {
      handleMissionsCompleted();
      handleChanllengeGenerated();
    }
  }, [chapter.missions]);

  return (
    <div className="w-full flex gap-2 flex-col">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-start"
      >
        <Card className="px-4 py-4 cursor-pointer">
          <div className="flex items-center">
            <p className="font-bold text-lg truncate flex-1">{`${number ? number + ". " : ""}${chapter.title}`}</p>
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
        <Card>
          <CardContent className="flex flex-col gap-2">
            {chapter.missions.map((mission) => (
              <Mission
                key={mission.id}
                chapterId={chapter.id}
                mission={mission}
              />
            ))}
            <div className="flex mt-5 gap-2">
              <CreateMission disabledCreate={challengeGenerated} />
              {allMissionsCompleted && !challengeGenerated && (
                <Button
                  onClick={() => mutateChallenge(chapter.id)}
                  variant={"challenge"}
                  className="w-36 cursor-pointer"
                  isLoading={isPendingChallenge}
                >
                  Desafio
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Collapse>
    </div>
  );
};
