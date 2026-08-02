import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";

type ErrorContextType = {
    error: string | null;
    showError: (message: string) => void;
    clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);

    const showError = useCallback((message: string) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 5000);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const value = useMemo(() => ({ error, showError, clearError }), [error, showError, clearError]);

    return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (context === undefined) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};
