import type { TrainType } from "@/lib/types/trainTypes";

type TrainProgressBarProps = {
	train: TrainType;
};

const TrainProgressBar = ({ train }: TrainProgressBarProps) => {
	const commercialStops = train.timeTableRows.filter(
		(row) => row.trainStopping && row.commercialStop && row.type === "ARRIVAL",
	);

	const completedStops = commercialStops.filter(
		(row) => row.actualTime !== null,
	).length;
	const totalStops = commercialStops.length;
	const progressPercentage =
		totalStops > 0 ? (completedStops / totalStops) * 100 : 0;

	// Find current and next stations
	const lastCompletedStop = commercialStops
		.filter((row) => row.actualTime !== null)
		.sort(
			(a, b) =>
				new Date(b.actualTime).getTime() - new Date(a.actualTime).getTime(),
		)[0];

	const nextStop = commercialStops.find((row) => row.actualTime === null);

	// const isMoving = train.runningCurrently;
	// const currentSpeed =
	// 	train.trainLocations?.[train.trainLocations.length - 1]?.speed || 0;

	return (
		<div className="bg-foreground/5 rounded-lg my-4 p-8 ">
			{/* Header with status */}
			{/*<div className="flex justify-between items-center mb-4">*/}
			{/*<div className="flex items-center gap-3">*/}
			{/*<h3 className="font-semibold">Journey Progress</h3>*/}
			{/*<div className="flex items-center gap-2">
						<div
							className={`w-2 h-2 rounded-full ${isMoving ? "bg-green-500" : "bg-foreground/40"}`}
						/>*/}
			{/*<span className="text-sm">
							{isMoving ? `${currentSpeed} km/h` : "Stopped"}
						</span>*/}
			{/*</div>*/}
			{/*</div>*/}
			{/*<span className="text-sm font-semibold">
					{completedStops}/{totalStops}
				</span>*/}
			{/*</div>*/}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 bg-red-600 rounded-full" />
					<div>
						<p className="text-sm opacity-70">Current/Last</p>
						<p className="font-semibold">
							{lastCompletedStop
								? lastCompletedStop.station.name
								: "Not started"}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 bg-green-500 rounded-full" />
					<div>
						<p className="text-sm opacity-70">Next Stop</p>
						<p className="font-semibold">
							{nextStop ? nextStop.station.name : "Journey complete"}
						</p>
					</div>
				</div>
			</div>

			<div
				className="relative
				mb-3"
			>
				{/* Progress bar background */}
				<div className="w-full bg-foreground/20 rounded-full h-3">
					<div
						className="bg-red-600 h-3 rounded-full transition-all duration-500 relative"
						style={{ width: `${progressPercentage}%` }}
					>
						{progressPercentage > 0 && (
							<div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2">
								<div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
									🚂
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Start train icon if no progress */}
				{progressPercentage === 0 && (
					<div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2">
						<div className="w-5 h-5 bg-foreground/40 rounded-full flex items-center justify-center text-white text-xs">
							🚂
						</div>
					</div>
				)}
			</div>

			{commercialStops.length > 0 && (
				<div className="flex justify-between text-xs opacity-70 mb-2">
					<span>{commercialStops[0]?.station.name}</span>
					<span>
						{commercialStops[commercialStops.length - 1]?.station.name}
					</span>
				</div>
			)}

			{/* Timing info */}
			{nextStop && (
				<div className="text-sm">
					Next arrival:{" "}
					<span className="font-semibold">
						{new Date(
							nextStop.liveEstimateTime || nextStop.scheduledTime,
						).toLocaleTimeString()}
					</span>
					{nextStop.differenceInMinutes > 0 && (
						<span className="text-red-500 font-bold ml-2">
							+{nextStop.differenceInMinutes} min
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default TrainProgressBar;
