"use client";
import { useRouter } from "next/navigation";

function FindTrain() {
	const router = useRouter();

	const handleClick = () => {
		router.push("/");
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="top-4 left-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
		>
			123
		</button>
	);
}

export default FindTrain;
