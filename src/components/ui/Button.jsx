import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../components/lib/utils"; // use relative path if no alias

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:ring-0 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white hover:bg-green-700 rounded-[140px] px-6",
        outline: "border border-gray-500  hover:bg-gray-100 text-gray-800 rounded-[140px] px-6",
        // ghost: "bg-transparent hover:bg-gray-100",
      },
      size: {
        sm: "h-10 px-3 text-sm",
        default: "md:h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
