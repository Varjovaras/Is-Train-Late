import type { Train as TrainType } from "../../../types/trainTypes";
import Train from "./Train";

type TrainProps = {
	trains: TrainType[];
};

const CommuterTrains = ({ trains }: TrainProps) => {
	return (
		<div className="p-8 mx-4">
			<h2 className="pb-4 text-left text-xl">
				Tällä hetkellä yli 5 minuuttia myöhässä olevat lähijunat:{" "}
			</h2>
			<div className="grid sm:grid-cols-3 gap-4">
				{trains.length > 0 ? (
					trains.map((train) => <Train train={train} key={train.trainNumber} />)
				) : (
					// biome-ignore lint/style/useSelfClosingElements: <explanation>
					<div className="text-green-500"></div>
				)}
			</div>
		</div>
	);
};

export default CommuterTrains;
