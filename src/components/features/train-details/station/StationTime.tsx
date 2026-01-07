type StationTimeProps = {
	label: string;
	time: string;
	colorClassName?: string;
};

const StationTime = ({
	label,
	time,
	colorClassName = "",
}: StationTimeProps) => (
	<div className={`w-full flex justify-between ${colorClassName}`}>
		<span className="hidden sm:inline">{label}</span>
		<span>{time}</span>
	</div>
);

export default StationTime;
