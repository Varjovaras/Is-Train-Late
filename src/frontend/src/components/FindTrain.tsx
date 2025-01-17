"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState } from "react";

function FindTrain() {
	const router = useRouter();
	const [trainNumber, setTrainNumber] = useState("");
	const [error, setError] = useState("");
	const { translations } = useTranslations();
	const findTrainText = translations.findTrain;
	const trainNumberText = translations.trainNumber;
	const trainNumberFormPlaceHolder = translations.trainNumberFormPlaceHolder;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Basic validation
		if (!trainNumber.trim()) {
			setError("Please enter a train number");
			return;
		}

		if (Number.isNaN(Number(trainNumber))) {
			setError("Please enter a valid train number (digits only)");
			return;
		}

		setError("");

		router.push(`/train/${trainNumber}`);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="flex flex-col space-y-2">
				<label htmlFor="trainNumber" className="text-sm font-medium">
					{trainNumberText}
				</label>
				<input
					id="trainNumber"
					type="text"
					value={trainNumber}
					onChange={(e) => setTrainNumber(e.target.value)}
					placeholder={trainNumberFormPlaceHolder}
					className="px-4 py-2 border border-foreground rounded-md
                             focus:outline-none focus:ring-2 focus:ring-offset-2
                             focus:ring-blue-500"
				/>
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>

			<button
				type="submit"
				className="w-full px-4 py-2 text-sm border border-foreground
                         rounded-md hover:bg-foreground hover:text-background
                         transition-colors disabled:opacity-50
                         disabled:cursor-not-allowed"
				disabled={!trainNumber.trim()}
			>
				{findTrainText}
			</button>
		</form>
	);
}

export default FindTrain;
