import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-base bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "text-base bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "text-base border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "text-base bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-base hover:bg-accent hover:text-accent-foreground",
        link: "text-base text-primary underline-offset-4 hover:underline",
        brutal:
          "text-base rounded-sm border-2 border-border bg-accent px-8 py-4 text-background shadow-[4px_4px_0_0_#070707] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:hover:shadow-none dark:border-background dark:shadow-[4px_4px_0_0_#e8e9e1]",
        "brutal-normal":
          "text-base rounded-sm border-2 border-border bg-background px-8 py-4 shadow-[4px_4px_0_0_#070707] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:hover:shadow-none dark:border-background dark:bg-zinc-800 dark:text-background dark:shadow-[4px_4px_0_0_#e8e9e1]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
