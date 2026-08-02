import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/common/Loading";
import { stationMessagesQueryOptions } from "@/lib/queries/queryOptions";
import { formatDateTime } from "@/lib/utils/dateUtils";
import { removeAsema } from "@/lib/utils/stringUtils";

export const Route = createFileRoute("/station-messages/$id")({
    loader: ({ context: { queryClient }, params }) => {
        return queryClient.ensureQueryData(stationMessagesQueryOptions(params.id));
    },
    pendingComponent: Loading,
    component: StationMessagesRoute,
});

function StationMessagesRoute() {
    const { id } = Route.useParams();
    const { data } = useSuspenseQuery(stationMessagesQueryOptions(id));
    const { stationId, messages, status } = data;

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
                            Valid until {formatDateTime(message.endValidity)}
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
