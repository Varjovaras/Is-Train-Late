import type { Causes } from "@/lib/types/trainTypes";

type DelayCausesProps = {
	causes: Causes;
};

const DelayCauses = ({ causes }: DelayCausesProps) => {
	if (!causes || causes.length === 0) return null;

	return (
		<div className="text-sm text-red-500 mt-2">
			{causes.map((cause, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: cause can be basically anything digitraffic api returns
				<div key={index} className="ml-2">
					• {cause.categoryCode.name}
				</div>
			))}
		</div>
	);
};

export default DelayCauses;
