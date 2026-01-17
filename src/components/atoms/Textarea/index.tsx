import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/components/utils";
import { textareaVariants } from "@/components/variants/input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
  resize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant, textareaSize, error, resize = false, ...props },
    ref,
  ) => (
    <textarea
      ref={ref}
      className={cn(
        textareaVariants({ variant: error ? "error" : variant, textareaSize }),
        resize && "resize-y",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
