import { cn } from "@/lib/utils";

const bgMap = {
  green: "bg-green-500",
  red: "bg-red-500",
} as const;

const ScoreBox = ({
  icon,
  value,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  color: "green" | "red";
}) => (
  <div className={cn("border-4 py-2 px-4", bgMap[color])}>
    <p className="text-lg flex items-center gap-2 font-medium">
      {icon} <span>{value}</span>
    </p>
  </div>
);

export default ScoreBox;
