type DelayDetailRowProps = {
	label: string;
	value: string;
};

const DelayDetailRow = ({ label, value }: DelayDetailRowProps) => {
	return (
		<div className="grid grid-cols-[160px_1fr] gap-2 text-sm items-start">
			<span className="text-yellow-500">{label}:</span>
			<span className="text-red-600">{value}</span>
		</div>
	);
};

export default DelayDetailRow;
