const ScoreBox = ({
  icon,
  value,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  color: "green" | "red";
}) => (
  <div className={`border-4 py-2 px-4 bg-${color}-500`}>
    <p className="text-lg flex items-center gap-2 font-medium">
      {icon} <span>{value}</span>
    </p>
  </div>
);

export default ScoreBox;
