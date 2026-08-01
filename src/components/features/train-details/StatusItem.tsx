type StatusItemProps = {
    label: string;
    value: string | number;
    valueClassName?: string;
};

const StatusItem = ({ label, value, valueClassName = "" }: StatusItemProps) => {
    return (
        <div className="text-center p-2">
            <div className="text-sm text-foreground/60 mb-1">{label}</div>
            <div className={`font-semibold ${valueClassName}`}>{value}</div>
        </div>
    );
};

export default StatusItem;
