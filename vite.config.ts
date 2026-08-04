import { defineConfig } from "vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
    server: {
        port: 5173,
    },
    build: {
        chunkSizeWarningLimit: 1100,
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        tailwindcss(),
        tanstackStart({
            srcDirectory: "src",
            router: {
                routesDirectory: "app",
            },
        }),
        viteReact(),
        babel({ presets: [reactCompilerPreset()] }),
        nitro({
            compressPublicAssets: {
                gzip: true,
                brotli: true,
            },
        }),
    ],
});
