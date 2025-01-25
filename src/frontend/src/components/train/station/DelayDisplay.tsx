type DelayDisplayProps = {
	delay: number;
	minShortened: string;
};

const DelayDisplay = ({ delay, minShortened }: DelayDisplayProps) => (
	<div className="w-full flex justify-end text-red-500">
		+{delay} {minShortened}
	</div>
);

export default DelayDisplay;
