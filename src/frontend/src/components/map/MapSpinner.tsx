const MapSpinner = () => {
	return (
		<div className="absolute top-2 right-2 z-[1000] bg-background/80 rounded-full p-2">
			<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-foreground" />
		</div>
	);
};

export default MapSpinner;
