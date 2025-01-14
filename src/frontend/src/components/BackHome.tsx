"use client";
import { usePathname, useRouter } from "next/navigation";

export const BackHome = () => {
	const router = useRouter();
	const pathname = usePathname();

	const text = pathname !== "/" ? "← Back to Home" : "Refresh train data";

	const handleClick = () => {
		if (pathname === "/") {
			console.log("Refresh data");
			window.location.reload();
		} else {
			console.log("Go to home page");

			router.push("/"); // Navigate to home for other pages
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="top-4 left-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
		>
			{text}
		</button>
	);
};
