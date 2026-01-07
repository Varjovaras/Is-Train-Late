import { Suspense } from "react";
import TrainData from "@/components/features/train-lists/TrainData";
import Loading from "@/components/common/Loading";

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
