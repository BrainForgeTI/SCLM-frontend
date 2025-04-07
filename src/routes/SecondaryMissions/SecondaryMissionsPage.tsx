import { PageLayout } from "../../components/PageLayout";
import WatchIcon from "../../assets/icons/watch.svg";
import CoatArmsOneIcon from "../../assets/icons/coat_arms_one.svg";
import CoatArmsTwoIcon from "../../assets/icons/coat_arms_two.svg";
import CoatArmsThreeeIcon from "../../assets/icons/coat_arms_three.svg";

export const SecondaryMissionsPage = () => {
    return (
        <PageLayout>
            <div>
                <div className="text-white">
                    <h1 className="text-[36px]">Missões secundárias</h1>
                    <div className="flex gap-[10px] items-center">
                        <div className="bg-[#FF8800]/20 flex items-center justify-items-center p-[7px] rounded-sm">
                            <WatchIcon />
                        </div>
                        <p className="text-neutral/40 text-[20px]">Novas missões em 23:15:30</p>
                    </div>
                </div>
                <div>
                    <div className="text-white">
                        <CoatArmsOneIcon />
                        <p>Clique para revelar</p>
                    </div>
                    <div className="text-white">
                        <CoatArmsTwoIcon />
                        <p>Clique para revelar</p>
                    </div>
                    <div className="text-white">
                        <CoatArmsThreeeIcon />
                        <p>Clique para revelar</p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}