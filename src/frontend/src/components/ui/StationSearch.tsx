"use client";
import { useState } from "react";
import StationSearchInput from "./StationSearchInput";

const StationSearch = () => {
	const [error, _setError] = useState("");

	return (
		<div className="space-y-4">
			<StationSearchInput />
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
};

export default StationSearch;
