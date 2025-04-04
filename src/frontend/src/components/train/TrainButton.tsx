import type { TrainType } from "@/lib/types/trainTypes";
import Link from "next/link";

type TrainButtonProps = {
    train: TrainType;
};

const TrainButton = ({ train }: TrainButtonProps) => {
    return (
        <Link
            href={`/trains/${train.trainNumber}`}
            className="w-full text-left flex bg-foreground/10 justify-between items-center hover:bg-red-600/10 p-2 rounded-sm transition-colors duration-200"
        >
            <span className="font-bold text-xl text-left">
                {train.commuterLineid !== ""
                    ? train.commuterLineid
                    : train.trainType.name + train.trainNumber}
            </span>
            <span className="">▶</span>
        </Link>
    );
};

export default TrainButton;
