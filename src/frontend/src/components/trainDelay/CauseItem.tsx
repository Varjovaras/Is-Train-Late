type CauseItemProps = {
	label: string;
	value: string;
};

const CauseItem = ({ label, value }: CauseItemProps) => {
	return (
		<div className="flex gap-2 text-sm">
			<span className="text-foreground/60">{label}:</span>
			<span>{value}</span>
		</div>
	);
};

export default CauseItem;
