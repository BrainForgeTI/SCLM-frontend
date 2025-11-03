import { PageLayout } from "../../components/PageLayout";
import { AdventureNotice } from "./index";

const AdventurePage = () => {
  return (
    <PageLayout>
      <div className="w-full">
        <div className="w-full h-full flex justify-center items-center">
          <AdventureNotice></AdventureNotice>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdventurePage;
