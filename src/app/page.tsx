// import { fetchTrainData } from "@/lib/graphql";
// import { basicQuery } from "@/lib/queries/trainQueries";
import { trainQuery } from "@/lib/queries/trainQueries";
import Image from "next/image";

export default async function Home() {
    const trainData = await trainQuery();
    const cancelledTrains = trainData.filter((train) => train.cancelled);

    return (
        <div className=" flex flex-col items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-mono)]">
            <Image
                aria-hidden
                src="/hcbull.png"
                alt="File icon"
                className="p-20"
                width={500}
                height={250}
            />
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <div className="">Is Your Train late ?</div>
                    <div>
                        Write down the number of your train or choose from the
                        list
                    </div>
                </div>

                <div className="grid grid-cols-8 gap-2 p-8">
                    {trainData.length > 0 ? (
                        trainData.map((train, i) => (
                            <div
                                key={`train-${train.trainNumber}`}
                                className=""
                            >
                                <div>IC{train.trainNumber} </div>
                                {/* {train.trainLocations.map((location) => (
                                    <p
                                        key={`train-${train.trainNumber}-location-${location.location}`}
                                    >
                                        {" "}
                                        {location.speed}km/h
                                    </p>
                                ))} */}
                            </div>
                        ))
                    ) : (
                        <div className="">no trains</div>
                    )}
                </div>
                <div>
                    {cancelledTrains.length > 0 ? (
                        cancelledTrains.map((train) => (
                            <div key={`train---${train.trainNumber}`}>
                                cancelled: {train.trainNumber}
                            </div>
                        ))
                    ) : (
                        <div className="">no cancelled trains</div>
                    )}
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 p-8 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
