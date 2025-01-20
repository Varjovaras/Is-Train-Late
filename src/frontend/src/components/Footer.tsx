"use client";
import Image from "next/image";

export const Footer = () => {
	return (
		<footer className="w-full flex gap-4 flex-col sm:flex-row justify-center items-center mt-auto pt-6">
			<a
				className="flex items-center gap-4 hover:underline hover:underline-offset-4 text-sm"
				href="https://soundcloud.com/hardcore-bull"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					aria-hidden
					src="/hcbull_naama.png"
					alt="Hardcore Bull Soundcloud icon"
					width={40}
					height={40}
					className="w-[40px] h-[40px]"
				/>
				Soundcloud →
			</a>

			<a
				className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm"
				href="https://github.com/Varjovaras/Is-Train-Late"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					aria-hidden
					src="/github-mark.svg"
					alt="Github icon"
					width={40}
					height={40}
					className="w-[40px] h-[40px]"
				/>
				Github →
			</a>
		</footer>
	);
};
