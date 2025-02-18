"use client";
import dynamic from "next/dynamic";
import Loading from "@/components/ui/Loading";

// Dynamically import the Map component to avoid SSR issues
const TrainMap = dynamic(() => import("@/components/map/TrainMap"), {
  ssr: false,
  loading: () => <Loading />,
});

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-200px)] min-h-[400px]">
      <TrainMap />
    </div>
  );
};

export default Page;
