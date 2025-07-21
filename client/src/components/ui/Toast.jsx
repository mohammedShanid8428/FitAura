import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../components/lib/utils";
import { motion } from "framer-motion";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full max-w-sm items-center justify-between space-x-4 rounded-2xl border p-4 pr-6 shadow-2xl backdrop-blur-lg transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white/70 text-black border-white/30",
        destructive: "bg-red-600/80 text-white border-white",
        success: "bg-green-500/60 text-white border-orange-600",
        info: "bg-blue-500/60 text-white border-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Toast = React.forwardRef(
  ({ className, title, description, action, variant, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-col py-2">
          {title && (
            <p className="font-semibold text-lg drop-shadow-sm">{title}</p>
          )}
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
        </div>

        {action ? <div>{action}</div> : null}

        {/* Animated bottom border */}
        <motion.div
          className={cn(
            "absolute bottom-0 left-0 h-[4px] bg-lime-400",
            variant === "destructive" && "bg-red-400",
            variant === "success" && "bg-green-600",
            variant === "info" && "bg-blue-400"
          )}
          initial={{ width: "100%" }}
          animate={{ width: 0 }}
          transition={{ duration: 2.5, ease: "linear" }}
        />
      </motion.div>
    );
  }
);

Toast.displayName = "Toast";
