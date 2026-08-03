type TrainIconProps = {
    type: "commuter" | "longDistance" | "freight";
    label: string | number;
    ariaLabel: string;
    heading?: number;
};

const colors = {
    commuter: { bg: "#22c55e", border: "#16a34a" }, // green
    longDistance: { bg: "#ef4444", border: "#dc2626" }, // red
    freight: { bg: "#eab308", border: "#ca8a04" }, // yellow
};

const TrainIcon = ({ type, label, ariaLabel, heading = 0 }: TrainIconProps) => {
    const { bg, border } = colors[type];

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className="relative cursor-pointer rounded-full border-0 bg-transparent p-0 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            style={{ transform: `rotate(${heading}deg)` }}
        >
            <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
                {/* Outer glow */}
                <circle cx="18" cy="18" r="16" fill={bg} opacity="0.3" />
                {/* Main circle */}
                <circle cx="18" cy="18" r="14" fill={bg} stroke={border} strokeWidth="2" />
                {/* Direction indicator */}
                <path d="M18 6 L22 14 L18 12 L14 14 Z" fill="white" opacity="0.9" />
            </svg>
            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center pt-1">
                <span className="text-white font-bold text-xs drop-shadow-sm">{label}</span>
            </div>
        </button>
    );
};

export default TrainIcon;
