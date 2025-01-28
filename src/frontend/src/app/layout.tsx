import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FindTrain from "@/components/ui/FindTrain";
import Footer from "@/components/ui/Footer";
import Title from "@/components/ui/Title";
import TopBar from "@/components/ui/TopBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Is Your Train Late",
	description: "Is VR late? (yes)",
	other: {
		"style-src-elem": "self",
	},
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<div className="font-[family-name:var(--font-geist-mono)] min-h-screen flex flex-col">
						<TopBar />
						<div className="flex-1 py-20 px-4 mt-4 flex flex-col items-center max-w-7xl mx-auto w-full">
							<Title />
							<main className="flex-1 w-full">{children}</main>
							<FindTrain />
							<Footer />
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
