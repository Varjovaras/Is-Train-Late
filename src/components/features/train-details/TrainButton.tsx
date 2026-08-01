import { Link } from "@tanstack/react-router";
import type { TrainType } from "@/lib/types/trainTypes";
import { getTrainDisplayName, getTrainLink } from "@/lib/utils/trainDataUtils";

type TrainButtonProps = {
    train: TrainType;
};

const TrainButton = ({ train }: TrainButtonProps) => {
    return (
        <Link
            to={getTrainLink(train)}
            className="w-full text-left flex bg-foreground/10 justify-between items-center hover:bg-red-600/10 p-2 rounded-sm transition-colors duration-200"
        >
            <span className="font-bold text-xl text-left">{getTrainDisplayName(train)}</span>
            <span className="">▶</span>
        </Link>
    );
};

export default TrainButton;
