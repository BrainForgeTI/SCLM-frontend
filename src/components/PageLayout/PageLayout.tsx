import { JSX, PropsWithChildren } from "react";
import { SideMenu } from "../SideMenu";
import { LayoutHeader, MainContent } from "../PageLayout";
import { LoaderCircle } from "lucide-react";

interface Props extends PropsWithChildren {
  children: JSX.Element;
  isLoadingContent?: boolean;
}

const PageLayout = (props: Props) => {
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
            <div className="w-full min-h-[calc(100dvh-120px)] flex justify-center items-center">
              <LoaderCircle
                className="text-primary animate-spin duration-300"
                size={50}
                strokeWidth={1}
              />
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
