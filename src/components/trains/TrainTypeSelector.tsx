import { useTranslations } from "@/lib/i18n/useTranslations";

type TrainTypeSelectorProps = {
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
};

const TrainTypeSelector = ({
	selectedCategory,
	onCategoryChange,
}: TrainTypeSelectorProps) => {
	const { translations } = useTranslations();

	return (
		<div className="flex justify-center my-4 px-2">
			<div className="inline-flex flex-wrap justify-center gap-2 md:gap-0 md:flex-nowrap rounded-md border border-foreground/20 overflow-hidden">
				<button
					type="button"
					onClick={() => onCategoryChange("all")}
					className={`px-3 py-2 text-sm md:text-base ${
						selectedCategory === "all"
							? "bg-foreground text-background"
							: "hover:bg-foreground/10"
					}`}
				>
					{translations.allTrains}
				</button>
				<button
					type="button"
					onClick={() => onCategoryChange("longDistance")}
					className={`px-3 py-2 text-sm md:text-base md:border-l border-foreground/20 ${
						selectedCategory === "longDistance"
							? "bg-foreground text-background"
							: "hover:bg-foreground/10"
					}`}
				>
					{translations.longDistanceTrains}
				</button>
				<button
					type="button"
					onClick={() => onCategoryChange("commuter")}
					className={`px-3 py-2 text-sm md:text-base md:border-l border-foreground/20 ${
						selectedCategory === "commuter"
							? "bg-foreground text-background"
							: "hover:bg-foreground/10"
					}`}
				>
					{translations.commuterTrains}
				</button>
				<button
					type="button"
					onClick={() => onCategoryChange("freight")}
					className={`px-3 py-2 text-sm md:text-base md:border-l border-foreground/20 ${
						selectedCategory === "freight"
							? "bg-foreground text-background"
							: "hover:bg-foreground/10"
					}`}
				>
					{translations.freightTrains}
				</button>
			</div>
		</div>
	);
};

export default TrainTypeSelector;
