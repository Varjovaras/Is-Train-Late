"use client";
import { useEffect } from "react";
import { useError } from "@/components/providers/ErrorProvider";

const ErrorPopup = () => {
	const { error, clearError } = useError();

	// Close on ESC key press
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				clearError();
			}
		};

		window.addEventListener("keydown", handleEsc);
		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [clearError]);

	if (!error) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm transition-opacity">
			<div className="relative bg-background border border-red-500 rounded-lg shadow-lg w-full max-w-md p-6 animate-in fade-in slide-in-from-bottom-10 duration-300">
				<button
					type="button"
					onClick={clearError}
					className="absolute top-3 right-3 text-foreground/60 hover:text-foreground"
					aria-label="Close"
				>
					✕
				</button>

				<div className="flex items-start gap-4">
					<div className="flex-shrink-0 bg-red-100 rounded-full p-2">
						<svg
							role="img"
							focusable="false"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-red-600"
						>
							<title>Error icon</title>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
					</div>

					<div className="flex-1">
						<h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
						<p className="text-foreground/80">{error}</p>

						<div className="mt-4">
							<button
								type="button"
								onClick={clearError}
								className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
							>
								Dismiss
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorPopup;
