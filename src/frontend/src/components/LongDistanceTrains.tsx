import type { Train as TrainType } from "../../../types/trainTypes";
import Train from "./Train";

type TrainProps = {
	trains: TrainType[];
};

const LongDistanceTrains = ({ trains }: TrainProps) => {
	return (
		<div className="p-8 mx-4">
			<h2 className="pb-4 text-left text-xl">
				Tällä hetkellä yli 5 minuuttia myöhässä olevat kaukojunat:{" "}
			</h2>
			<div className="grid sm:grid-cols-3 gap-4">
				{trains.length > 0 ? (
					trains.map((train) => <Train train={train} key={train.trainNumber} />)
				) : (
					<div className="text-green-500">No trains late</div>
				)}
			</div>
		</div>
	);
};

export default LongDistanceTrains;
