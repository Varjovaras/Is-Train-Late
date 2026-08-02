import type { Causes } from "@/lib/types/trainTypes";
import { getCauseKey } from "@/lib/utils/causeUtils";

type DelayCausesProps = {
    causes: Causes;
};

const DelayCauses = ({ causes }: DelayCausesProps) => {
    if (!causes || causes.length === 0) return null;

    return (
        <div className="text-sm text-red-500 mt-2">
            {causes.map((cause) => (
                <div key={getCauseKey(cause)} className="ml-2">
                    • {cause.categoryCode.name}
                </div>
            ))}
        </div>
    );
};

export default DelayCauses;
