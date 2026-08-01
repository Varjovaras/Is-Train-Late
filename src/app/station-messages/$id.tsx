import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/common/Loading";
import type { StationMessage } from "@/lib/types/stationMessageTypes";
import { removeAsema } from "@/lib/utils/stringUtils";

const REST_ENDPOINT = "https://rata.digitraffic.fi/api/v1/passenger-information/active?station=";

export const Route = createFileRoute("/station-messages/$id")({
    loader: async ({ params }) => {
        const stationId = params.id.toUpperCase();
        const response = await fetch(`${REST_ENDPOINT}${stationId}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return { stationId, messages: null, status: response.status };
        }

        return {
            stationId,
            messages: (await response.json()) as StationMessage[],
            status: response.status,
        };
    },
    pendingComponent: Loading,
    component: StationMessagesRoute,
});

function StationMessagesRoute() {
    const { stationId, messages, status } = Route.useLoaderData();

    if (!messages) {
        return (
            <div className="flex flex-col items-center p-8">
                <h1 className="text-xl text-red-500">
                    Station data not available. HTTP error! status: {status}
                </h1>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center p-8">
                <h1 className="text-xl">No active messages for station {stationId}</h1>
            </div>
        );
    }

    return (
        <div className="mx-auto flex flex-col max-w-4xl p-4 gap-8">
            <h1 className="text-2xl font-bold">Messages for station {removeAsema(stationId)}</h1>

            {messages.map((message) => (
                <div
                    key={message.id}
                    className="border border-foreground/20 rounded-lg p-4 space-y-4"
                >
                    <div className="flex justify-between items-start gap-4">
                        {message.trainNumber && (
                            <p className="font-bold">Train {message.trainNumber}</p>
                        )}
                        <p className="text-sm text-foreground/60">
                            Valid until {new Date(message.endValidity).toLocaleString()}
                        </p>
                    </div>

                    {message.audio && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Audio announcement:</h3>
                            <p className="text-foreground/80">{message.audio.text.en}</p>
                        </div>
                    )}

                    {message.video && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Display message:</h3>
                            <p className="text-foreground/80">{message.video.text.en}</p>
                        </div>
                    )}

                    {message.stations.length > 1 && (
                        <div className="text-sm text-foreground/60">
                            Also displayed at:{" "}
                            {message.stations.filter((s) => s !== stationId).join(", ")}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
