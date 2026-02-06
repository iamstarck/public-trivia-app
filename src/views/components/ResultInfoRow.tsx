import type { ReactNode } from "react";

const ResultInfoRow = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => {
  return (
    <div className="flex justify-between border-b-2 pb-2 text-base font-bold">
      <p>{label.toUpperCase()}:</p>
      <span>{value}</span>
    </div>
  );
};

export default ResultInfoRow;
