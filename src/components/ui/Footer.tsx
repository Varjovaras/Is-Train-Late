import Image from "next/image";

const Footer = () => {
	return (
		<footer className="w-full flex gap-4 flex-col sm:flex-row justify-center items-center mt-auto pt-6 px-4">
			<a
				className="flex items-center gap-4 hover:underline hover:underline-offset-4 text-sm"
				href="https://soundcloud.com/hardcore-bull"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					src="/hcbull_naama.png"
					alt="Hardcore Bull Soundcloud icon"
					width={40}
					height={40}
					loading="lazy"
					priority={false}
					placeholder="blur"
					// Base64 blur
					blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."
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
					className="w-10 h-10"
					loading="lazy"
					priority={false}
					placeholder="blur"
					// Base64 blur
					blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."
				/>
				Github →
			</a>
		</footer>
	);
};

export default Footer;
