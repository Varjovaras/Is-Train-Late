// "use client";
// import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";

type TrainSpeedProps = {
  train: TrainType;
};

const TrainSpeed = ({ train }: TrainSpeedProps) => {
  // const { translations } = useTranslations();

  return (
    <div>
      {train.trainLocations ? (
        train.trainLocations.map((location) => (
          <p className="" key={location.speed + location.timestamp}>
            {location.speed}km/h
          </p>
        ))
      ) : (
        <p />
        // <p className="text-red-500">{translations.noCurrentSpeed}</p>
      )}
    </div>
  );
};

export default TrainSpeed;
