import type { Train as TrainType } from "../../../types/trainTypes";

type TrainProps = {
	train: TrainType;
};

const Train = ({ train }: TrainProps) => {
	const timeTableRows = train.timeTableRows.filter((row) => {
		return row.actualTime !== null;
	});
	const currentTimeDiff =
		timeTableRows[timeTableRows.length - 1].differenceInMinutes;

	if (currentTimeDiff < 5) {
		return <></>;
	}

	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;

	const firstCauses = train.timeTableRows.find((row) => row.causes !== null)
		?.causes?.[0];

	return (
		<div
			key={`train-${train.trainNumber}`}
			className="border border-dashed border-red-600 p-4"
		>
			<div>
				<button type="button" className="">
					{train.trainType.name}
					{train.trainNumber}{" "}
				</button>
				<p>Lähtöasema: {train.timeTableRows[0].station.name}</p>
				<p>Pääteasema: {endStation}</p>
				{train.trainLocations.map((location) => (
					<p key={location.speed + location.timestamp}>
						Tämän hetkinen nopeus: {location.speed}km/h
					</p>
				))}
				<p>{currentTimeDiff} minuuttia myöhässä</p>
				<p>____</p>
				{firstCauses?.categoryCode && (
					<p>categoryCode: {firstCauses.categoryCode.name}</p>
				)}
				{firstCauses?.detailedCategoryCode && (
					<p>detailedCategoryCode: {firstCauses.detailedCategoryCode.name}</p>
				)}
				{firstCauses?.thirdCategoryCode && (
					<p>thirdCategoryCode: {firstCauses.thirdCategoryCode.name}</p>
				)}
			</div>
		</div>
	);
};

export default Train;
