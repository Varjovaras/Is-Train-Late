"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ErrorContextType = {
	error: string | null;
	showError: (message: string) => void;
	clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
	const [error, setError] = useState<string | null>(null);

	const showError = (message: string) => {
		setError(message);
		setTimeout(() => {
			setError(null);
		}, 5000);
	};

	const clearError = () => {
		setError(null);
	};

	return (
		<ErrorContext.Provider value={{ error, showError, clearError }}>
			{children}
		</ErrorContext.Provider>
	);
};

export const useError = () => {
	const context = useContext(ErrorContext);
	if (context === undefined) {
		throw new Error("useError must be used within an ErrorProvider");
	}
	return context;
};
