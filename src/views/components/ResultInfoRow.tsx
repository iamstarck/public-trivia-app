import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ResultInfoRowProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  bgColor: "chart-5" | "cyan-500" | "green-500" | "red-500";
  textColor?: string;
}

const bgMap = {
  "chart-5": "bg-chart-5",
  "cyan-500": "bg-cyan-500",
  "green-500": "bg-green-500",
  "red-500": "bg-red-500",
} as const;

const ResultInfoRow = ({
  icon,
  label,
  value,
  bgColor,
  textColor,
}: ResultInfoRowProps) => {
  return (
    <div
      className={cn(
        "flex items-center border-4 py-2 px-4 space-x-2",
        bgMap[bgColor],
      )}
    >
      <div className="flex items-center h-fit p-1 border-3 bg-primary-foreground ">
        {icon}
      </div>
      <p className={cn("text-lg font-medium", textColor)}>
        {label}: <span>{value}</span>
      </p>
    </div>
  );
};

export default ResultInfoRow;
