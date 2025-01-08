import Image from "next/image";

export const Footer = () => {
	return (
		<footer className="row-start-3 flex gap-6 p-8 flex-wrap items-center justify-center">
			<a
				className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm"
				href="https://soundcloud.com/hardcore-bull"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					aria-hidden
					src="/hcbull_naama.png"
					alt="Globe icon"
					width={40}
					height={40}
				/>
				https://soundcloud.com/hardcore-bull {">"}
			</a>
		</footer>
	);
};
