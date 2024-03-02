import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, passwordVisible, type, ...props }, ref) => {
    return (
      <input
        type={
          type === "password"
            ? passwordVisible
              ? "text"
              : "password"
            : type === "email"
            ? "email"
            : type
            ? type
            : "text"
        }
        className={cn(
          "h-10 w-full rounded-md border border-none px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring  disabled:cursor-not-allowed disabled:bg-input/50 bg-input focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-ring",
          !props.hidden && "flex",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
