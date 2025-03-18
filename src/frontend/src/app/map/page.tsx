"use client";
import dynamic from "next/dynamic";
import Loading from "@/components/ui/Loading";

const TrainMap = dynamic(() => import("@/components/map/TrainMap"), {
  ssr: false,
  loading: () => <Loading />,
});

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-200px)] min-h-[500px] border border-foreground/20 rounded-lg overflow-hidden">
      <TrainMap />
    </div>
  );
};

export default Page;
