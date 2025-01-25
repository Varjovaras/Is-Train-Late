type StationIndicatorProps = {
	isCurrentStation: boolean;
	isNextStation: boolean;
};

const StationIndicator = ({
	isCurrentStation,
	isNextStation,
}: StationIndicatorProps) => (
	<div className="w-6 text-center flex-shrink-0">
		{isCurrentStation && "→"}
		{isNextStation && "⟶"}
	</div>
);

export default StationIndicator;
