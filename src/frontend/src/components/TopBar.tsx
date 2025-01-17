"use client";
import { useEffect, useState } from "react";
import { BackHome } from "./BackHome";
import { LanguageSwitcher } from "./LanguageSwitcher";

function TopBar() {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Hide when scrolling down, show when scrolling up
			if (currentScrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<div
			className={`fixed top-0 w-full z-50 p-2 backdrop-blur-sm transition-transform duration-300 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 gap-4 flex justify-between items-center">
				<BackHome />
				<LanguageSwitcher />
			</div>
		</div>
	);
}

export default TopBar;
