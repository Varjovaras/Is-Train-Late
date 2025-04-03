"use client";
import dynamic from "next/dynamic";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TrainMap = dynamic(() => import("@/components/map/TrainMap"), {
    ssr: false,
    loading: () => <Loading />,
});

const MapContent = () => {
    const searchParams = useSearchParams();
    const trainNumber = searchParams.get("train");

    return (
        <div className="w-full h-[calc(100vh-200px)] min-h-[500px] border border-foreground/20 rounded-lg overflow-hidden">
            <TrainMap trainNumber={trainNumber || undefined} />
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <MapContent />
        </Suspense>
    );
};

export default Page;
