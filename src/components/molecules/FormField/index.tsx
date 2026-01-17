import { forwardRef, useId } from "react";
import {
  Input,
  type InputProps,
  Label,
  Textarea,
  type TextareaProps,
} from "@/components/atoms";
import { AlertCircleIcon } from "@/components/icons";
import { cn } from "@/components/utils";

type InputType = "text" | "email" | "password" | "number" | "tel" | "url";

export interface FormFieldProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  type?: InputType;
  inputProps?: Omit<InputProps, "error"> | TextareaProps;
  multiline?: boolean;
  children?: React.ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      error,
      helpText,
      required,
      optional,
      className,
      type = "text",
      inputProps,
      multiline = false,
      children,
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = inputProps?.id || generatedId;
    const errorId = `${inputId}-error`;
    const helpId = `${inputId}-help`;

    const hasError = !!error;

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={inputId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        {children ? (
          children
        ) : multiline ? (
          <Textarea
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={
              [hasError && errorId, helpText && helpId]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...(inputProps as TextareaProps)}
            variant={
              hasError ? "error" : (inputProps as TextareaProps)?.variant
            }
          />
        ) : (
          <Input
            id={inputId}
            type={type}
            error={hasError}
            aria-invalid={hasError}
            aria-describedby={
              [hasError && errorId, helpText && helpId]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...(inputProps as InputProps)}
          />
        )}
        {error && (
          <p
            id={errorId}
            className="flex items-center gap-x-1.5 text-sm text-destructive"
            role="alert"
          >
            <AlertCircleIcon className="size-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
        {helpText && !error && (
          <p id={helpId} className="text-sm text-muted-foreground">
            {helpText}
          </p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";
