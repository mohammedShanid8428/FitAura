import React from "react";
import classNames from "classnames";

export const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={classNames(
          "w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
