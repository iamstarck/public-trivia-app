import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

const TriviaCardLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center min-h-screen justify-center">
    <Card className="m-4 w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      {children}
    </Card>
  </div>
);

export default TriviaCardLayout;
