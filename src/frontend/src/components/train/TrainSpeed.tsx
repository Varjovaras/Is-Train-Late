import type { TrainType } from "@/lib/types/trainTypes";

type TrainSpeedProps = {
	train: TrainType;
};

const TrainSpeed = ({ train }: TrainSpeedProps) => {
	const currentSpeed =
		train.trainLocations && train.trainLocations.length > 0
			? train.trainLocations[train.trainLocations.length - 1].speed
			: null;

	return (
		<div>
			{currentSpeed !== null && currentSpeed > 0 && (
				<p className="text-xs text-foreground/70">{currentSpeed} km/h</p>
			)}
		</div>
	);
};

export default TrainSpeed;
