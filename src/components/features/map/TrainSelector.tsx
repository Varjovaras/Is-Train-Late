"use client";
import type { Dispatch, SetStateAction } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainCategory } from "@/lib/types/trainTypes";

type TrainSelectorProps = {
	category: TrainCategory;
	setCategory: Dispatch<SetStateAction<TrainCategory>>;
};

const categories = [
	{ name: "longDistance", icon: "🚄" },
	{ name: "commuter", icon: "🚃" },
	{ name: "freight", icon: "🚛" },
	{ name: "all", icon: "🗺️" },
] as const;

const TrainSelector = ({ category, setCategory }: TrainSelectorProps) => {
	const { translations } = useTranslations();

	const labels: Record<string, string> = {
		longDistance: translations.longDistanceTrains,
		commuter: translations.commuterTrains,
		freight: translations.freightTrains,
		all: translations.allTrains,
	};

	return (
		<div className="absolute top-4 left-4 z-10">
			<div className="flex gap-1 bg-background/90 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-foreground/10">
				{categories.map((cat) => (
					<button
						key={cat.name}
						type="button"
						onClick={() => setCategory({ name: cat.name })}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
							${
								category.name === cat.name
									? "bg-foreground text-background shadow-sm"
									: "text-foreground/70 hover:text-foreground hover:bg-foreground/10"
							}
						`}
						aria-pressed={category.name === cat.name}
					>
						<span className="mr-1">{cat.icon}</span>
						<span className="hidden sm:inline">
							{labels[cat.name]}
						</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default TrainSelector;
