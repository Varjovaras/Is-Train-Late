import TrainData from "@/components/trains/TrainData";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

const Home = async () => {
  return (
    <div className="flex flex-col items-center justify-items-center">
      <Suspense fallback={<Loading />}>
        <TrainData />
      </Suspense>
    </div>
  );
};

export default Home;
