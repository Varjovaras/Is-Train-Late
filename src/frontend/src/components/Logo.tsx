import React from "react";
import Image from "next/image";

export const Logo = () => {
	return (
		<Image
			aria-hidden
			src="/hcbull.png"
			alt="File icon"
			className="p-20"
			width={500}
			height={250}
		/>
	);
};

export default Logo;
