"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function FindTrain() {
	const router = useRouter();
	const [trainNumber, setTrainNumber] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Basic validation
		if (!trainNumber.trim()) {
			setError("Please enter a train number");
			return;
		}

		// You can add more validation here (e.g., number format)
		if (!/^\d+$/.test(trainNumber)) {
			setError("Please enter a valid train number (digits only)");
			return;
		}

		// Clear any previous errors
		setError("");

		// Navigate to train details page with the train number
		router.push(`/train/${trainNumber}`);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="flex flex-col space-y-2">
				<label htmlFor="trainNumber" className="text-sm font-medium">
					Train Number
				</label>
				<input
					id="trainNumber"
					type="text"
					value={trainNumber}
					onChange={(e) => setTrainNumber(e.target.value)}
					placeholder="Enter train number"
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
				Find Train
			</button>
		</form>
	);
}

export default FindTrain;
