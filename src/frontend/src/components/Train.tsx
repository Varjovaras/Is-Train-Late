import type { Train as TrainType } from "../../../types/trainTypes";

type TrainProps = {
	train: TrainType;
};

const Train = ({ train }: TrainProps) => {
	const firstCauses = train.timeTableRows.find(
		(row) => row.causes !== null,
	)?.causes;
	console.log(firstCauses);

	return (
		<div key={`train-${train.trainNumber}`} className="">
			<div>
				<button type="button" className="">
					{train.trainType.name}
					{train.trainNumber}{" "}
				</button>
				<p>Lähtöasema: {train.timeTableRows[0].station.name}</p>
				{train.runningCurrently}
				{train.trainLocations.map((location) => (
					<p key={location.speed + location.timestamp}>{location.speed}km/h</p>
				))}
				<p>
					{
						train.timeTableRows[train.timeTableRows.length - 1]
							.differenceInMinutes
					}{" "}
					minutes late
				</p>
			</div>
		</div>
	);
};

export default Train;
