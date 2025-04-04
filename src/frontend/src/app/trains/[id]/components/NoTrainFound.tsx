const NoTrainFound = ({ trainNumber }: { trainNumber: string }) => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="px-2 py-8 text-xl text-red-500">
                No train found with number {trainNumber}
            </h1>
            <p>
                This train may not be running today or has already completed its
                journey.
            </p>
            <p className="mt-4 text-sm text-foreground/60">
                Try searching for this train with a specific date.
            </p>
        </div>
    );
};

export default NoTrainFound;
