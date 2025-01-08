"use client";
import { useRouter } from "next/navigation";

export const BackHome = () => {
	const router = useRouter();

	const handleClick = () => {
		router.refresh(); // Refresh the current route's data
		router.push("/"); // Navigate to home
	};

	return (
		<button
			onClick={handleClick}
			className="absolute top-4 left-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
		>
			← Back to Home
		</button>
	);
};
