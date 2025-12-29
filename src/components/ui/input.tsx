import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-2 border-foreground p-4 shadow-[2px_2px_0_0_#070707] transition-all hover:translate-x-px hover:translate-y-1px dark:hover:shadow-none hover:shadow-none dark:border-background dark:bg-zinc-800 dark:shadow-[2px_2px_0_0_#e8e9e1]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
