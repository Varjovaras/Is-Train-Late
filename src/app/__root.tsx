import { QueryClientProvider } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import appCss from "@/app/globals.css?url";
import favicon from "@/favicon.ico?url";
import ErrorPopup from "@/components/common/ErrorPopup";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import RootErrorComponent from "@/components/common/RootErrorComponent";
import Footer from "@/components/layout/Footer";
import Title from "@/components/layout/Title";
import TopBar from "@/components/layout/TopBar";
import { ErrorProvider } from "@/components/providers/ErrorProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: "Is Your Train Late" },
            { name: "description", content: "Is VR late? (yes)" },
            { name: "style-src-elem", content: "self" },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {
                rel: "icon",
                href: favicon,
            },
        ],
    }),
    errorComponent: RootErrorComponent,
    notFoundComponent: NotFoundComponent,
    component: RootLayout,
});

function RootLayout() {
    console.log("Tanstack :)");

    const { queryClient } = Route.useRouteContext();

    return (
        <QueryClientProvider client={queryClient}>
            <html lang="en" className="dark">
                <head>
                    <HeadContent />
                </head>
                <body className="antialiased min-h-screen">
                    <ThemeProvider>
                        <ErrorProvider>
                            <div className="font-(family-name:--font-geist-mono) min-h-screen flex flex-col">
                                <TopBar />
                                <div className="flex-1 py-20 px-4 mt-4 flex flex-col items-center max-w-7xl mx-auto w-full">
                                    <Title />
                                    <main className="flex-1 w-full">
                                        <Outlet />
                                    </main>
                                    <Footer />
                                </div>
                            </div>
                            <ErrorPopup />
                        </ErrorProvider>
                    </ThemeProvider>
                    <Scripts />
                </body>
            </html>
        </QueryClientProvider>
    );
}
