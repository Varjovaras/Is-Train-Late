import type { Train } from "@/types/trainTypes";

type TrainProps = {
	passengerTrainData: Train[];
};

export const TrainList = ({ passengerTrainData }: TrainProps) => {
	return (
		<div className="p-8">
			<p className="pb-4 text-left">Currently running passenger trains: </p>
			<div className="flex flex-wrap gap-4 ">
				{passengerTrainData.length > 0 ? (
					passengerTrainData.map((train) => (
						<div key={`train-${train.trainNumber}`} className="">
							<div>
								{train.trainType.name}
								{train.trainNumber}
							</div>
						</div>
					))
				) : (
					<div className="">no trains</div>
				)}
			</div>
		</div>
	);
};
