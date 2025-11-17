import { JSX, PropsWithChildren, useEffect, useState } from "react";
import { SideMenu } from "../SideMenu";
import { LayoutHeader, MainContent } from "../PageLayout";
import KaiserReadingGif from "@/assets/kaiser/kaiser_reading.gif"
import KaiserKingGif from "@/assets/kaiser/kaiser_king.gif"
import KaiserSleepingGif from "@/assets/kaiser/kaiser_sleeping.gif"
import clsx from "clsx";

interface Props extends PropsWithChildren {
  children: JSX.Element;
  isLoadingContent?: boolean;
}

const kaiserLoading = [
  KaiserKingGif,
  KaiserReadingGif,
  KaiserSleepingGif,
]

const loadingTexts = [
  "Preparando missão",
  "Carregando energia",
  "Equipando itens",
  "Puxando stats",
  "Invocando dados",
  "Subindo de nível",
  "Destravando recompensas"
]

const PageLayout = (props: Props) => {
  const [dot, setDot] = useState("")
  const [textIndex, setTextIndex] = useState(generatRandomTextIndex())
  const [kaiserIndex] = useState(Math.floor(Math.random()*3))


  function generatRandomTextIndex() {
    return Math.floor(Math.random()*loadingTexts.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDot((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500)

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(generatRandomTextIndex())
    }, 3000)

    return () => {
      clearInterval(interval)
    };
  }, [])

  return (
    <div className="md:h-screen w-screen min-h-dvh font-poppins bg-base100 flex">
      <div className="h-full">
        <SideMenu />
      </div>
      <div className="md:overflow-y-hidden md:overflow-x-hidden relative w-full flex flex-col overflow-y-hidden overflow-x-hidden">
        <div className="w-full absolute">
          <LayoutHeader />
        </div>
        <div className="h-[60px]"></div>

        <MainContent>
          {props.isLoadingContent ? (
            <div className="w-full min-h-[calc(100dvh-120px)] flex justify-center items-center flex flex-col gap-3">
              <img src={kaiserLoading[kaiserIndex]} className="mt-[-100px]"/>
              <p className={clsx("transition-all duration-300")}>{loadingTexts[textIndex]}{dot}</p>
            </div>
          ) : (
            props.children
          )}
        </MainContent>
      </div>
    </div>
  );
};

export default PageLayout;
