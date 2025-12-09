"use client";
import { useEffect } from "react";
import { useError } from "@/components/providers/ErrorProvider";

const GlobalErrorHandler = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	const { showError } = useError();

	useEffect(() => {
		console.error(error);
		showError(error.message || "An unexpected error occurred");
	}, [error, showError]);

	return (
		<div className="flex flex-col items-center gap-4 p-8">
			<h2 className="text-xl text-red-500">{error.message}</h2>
			<button
				type="button"
				onClick={() => reset()}
				className="px-4 py-2 text-sm border border-foreground rounded-md
          hover:bg-foreground hover:text-background transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
			>
				Try again
			</button>
		</div>
	);
};

export default GlobalErrorHandler;
