import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
	},
	async redirects() {
		return [
			{
				source: "/live-trains/:id",
				destination: "/trains/:id",
				permanent: true,
			},
			{
				source: "/train-by-date/:id",
				destination: "/trains/:id",
				permanent: true,
			},
		];
	},
};
export default nextConfig;
