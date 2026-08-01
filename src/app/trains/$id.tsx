import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/common/Loading";
import LiveTrainPage from "@/components/features/train-details/LiveTrainPage";
import NoTrainFound from "@/components/features/train-details/NoTrainFound";
import { getDifferentDateTrain } from "@/lib/queries/differentDateQuery";
import { getSingleTrainData } from "@/lib/queries/getSingleTrainData";
import type { DifferentDayTrainResponse, TrainType } from "@/lib/types/trainTypes";
import { formatDateForUrl } from "@/lib/utils/dateUtils";
import { isValidTrainId } from "@/lib/utils/urlUtils";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

type TodayCacheEntry = {
    expiresAt: number;
    train: TrainType | null;
};

const todayTrainCache = new Map<string, TodayCacheEntry>();

const getLiveTrainData = async (trainNumber: string): Promise<TrainType | null> => {
    try {
        const response = await getSingleTrainData(trainNumber);
        return response.data.currentlyRunningTrains[0];
    } catch {
        return null;
    }
};

const getTodayTrainData = async (trainNumber: string): Promise<TrainType | null> => {
    const today = new Date();
    const formattedDate = formatDateForUrl(today.toISOString().split("T")[0]);
    const todayTrainId = `${trainNumber}-${formattedDate}`;
    const cached = todayTrainCache.get(todayTrainId);

    if (cached && cached.expiresAt > Date.now()) {
        return cached.train;
    }

    let train: TrainType | null = null;

    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip",
            },
            body: JSON.stringify({
                query: getDifferentDateTrain(todayTrainId),
            }),
            cache: "no-store",
        });

        if (response.ok) {
            const data = (await response.json()) as DifferentDayTrainResponse;
            train = data.data.train[0] ?? null;
        }
    } catch (error) {
        console.warn(`Error fetching today's data for train ${trainNumber}:`, error);
    }

    todayTrainCache.set(todayTrainId, {
        expiresAt: Date.now() + 300_000,
        train,
    });

    return train;
};

const getDateSpecificTrain = async (id: string): Promise<TrainType | null> => {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
        },
        body: JSON.stringify({
            query: getDifferentDateTrain(id),
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as DifferentDayTrainResponse;
    return data.data.train[0] ?? null;
};

export const Route = createFileRoute("/trains/$id")({
    loader: async ({ params }) => {
        const { id } = params;

        if (id.includes("-")) {
            try {
                isValidTrainId(id);
            } catch {
                return { kind: "invalid" as const, train: null };
            }

            return {
                kind: "date" as const,
                train: await getDateSpecificTrain(id),
            };
        }

        const liveTrain = await getLiveTrainData(id);
        const train = liveTrain ?? (await getTodayTrainData(id));

        return { kind: "live" as const, train };
    },
    pendingComponent: Loading,
    component: TrainRoute,
});

function TrainRoute() {
    const { kind, train } = Route.useLoaderData();
    const { id } = Route.useParams();

    if (kind === "invalid") {
        return <div>Not a valid train id</div>;
    }

    if (train) {
        return <LiveTrainPage train={train} />;
    }

    if (kind === "date") {
        const [trainNumber, year, month, day] = id.split("-");
        const date = new Date(`${year}-${month}-${day}`);

        return (
            <div className="flex flex-col items-center">
                <h1 className="px-2 py-8 text-xl text-red-500">
                    No train found with number {trainNumber} for date {date.toLocaleDateString()}
                </h1>
                <p className="mt-4 text-sm text-foreground/60">
                    Try searching for a different date or train number.
                </p>
            </div>
        );
    }

    return <NoTrainFound trainNumber={id} />;
}
