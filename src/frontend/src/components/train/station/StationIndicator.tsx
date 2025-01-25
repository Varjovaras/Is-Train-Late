type StationIndicatorProps = {
	isCurrentStation: boolean;
	isNextStation: boolean;
	isDepartureStation: boolean;
};

const StationIndicator = ({
	isCurrentStation,
	isNextStation,
	isDepartureStation,
}: StationIndicatorProps) => (
	<div className="w-6 text-center flex-shrink-0">
		{isDepartureStation && "↑"}
		{isCurrentStation && !isDepartureStation && "→"}
		{isNextStation && !isDepartureStation && "⟶"}
	</div>
);

export default StationIndicator;
