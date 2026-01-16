"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
} from "react";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";

// Form context for sharing form state
interface FormContextValue {
  disabled?: boolean;
}

const FormContext = createContext<FormContextValue>({});

export const useFormContext = () => useContext(FormContext);

// Variant types
type FormVariant = "default" | "card" | "inline";
type FormLayout = "vertical" | "horizontal";

// Main Form component
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  variant?: FormVariant;
  layout?: FormLayout;
  disabled?: boolean;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const formVariants: Record<FormVariant, string> = {
  default: "",
  card: "rounded-xl border border-border bg-card overflow-hidden",
  inline: "flex flex-wrap items-end gap-4",
};

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      className,
      variant = "default",
      layout = "vertical",
      disabled,
      children,
      onSubmit,
      ...props
    },
    ref,
  ) => {
    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        if (onSubmit) {
          event.preventDefault();
          onSubmit(event);
        }
      },
      [onSubmit],
    );

    return (
      <FormContext.Provider value={{ disabled }}>
        <form
          ref={ref}
          className={cn(
            formVariants[variant],
            layout === "horizontal" && "space-y-0",
            className,
          )}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  },
);
Form.displayName = "Form";

// FormHeader component - for card variant forms
export interface FormHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const FormHeader = forwardRef<HTMLDivElement, FormHeaderProps>(
  ({ className, title, description, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-x-4 border-b border-border p-4 sm:p-5",
          className,
        )}
        {...props}
      >
        {children || (
          <>
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </>
        )}
      </div>
    );
  },
);
FormHeader.displayName = "FormHeader";

// FormBody component - main content area
export interface FormBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const columnsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gapClasses = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

export const FormBody = forwardRef<HTMLDivElement, FormBodyProps>(
  ({ className, columns, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-4 sm:p-5",
          columns
            ? cn("grid", columnsClasses[columns], gapClasses[gap])
            : "space-y-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FormBody.displayName = "FormBody";

// FormSection component - for grouping related fields
export interface FormSectionProps
  extends React.HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export const FormSection = forwardRef<HTMLFieldSetElement, FormSectionProps>(
  (
    { className, title, description, columns, gap = "md", children, ...props },
    ref,
  ) => {
    const id = useId();

    return (
      <fieldset
        ref={ref}
        className={cn("border-0 p-0 m-0", className)}
        aria-describedby={description ? `${id}-description` : undefined}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <legend className="text-base font-medium text-foreground">
                {title}
              </legend>
            )}
            {description && (
              <p
                id={`${id}-description`}
                className="mt-1 text-sm text-muted-foreground"
              >
                {description}
              </p>
            )}
          </div>
        )}
        <div
          className={cn(
            columns
              ? cn("grid", columnsClasses[columns], gapClasses[gap])
              : "space-y-4",
          )}
        >
          {children}
        </div>
      </fieldset>
    );
  },
);
FormSection.displayName = "FormSection";

// FormRow component - for horizontal field layouts
export interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export const FormRow = forwardRef<HTMLDivElement, FormRowProps>(
  ({ className, columns = 2, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columnsClasses[columns],
          gapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FormRow.displayName = "FormRow";

// FormActions component - for submit/cancel buttons
export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "between";
  bordered?: boolean;
}

const alignClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align = "end", bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-2 p-4 sm:p-5",
          bordered && "border-t border-border",
          alignClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FormActions.displayName = "FormActions";

// FormDivider component
export interface FormDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  label?: string;
}

export const FormDivider = forwardRef<HTMLHRElement, FormDividerProps>(
  ({ className, label, ...props }, ref) => {
    if (label) {
      return (
        <div className={cn("relative my-6", className)}>
          <div className="absolute inset-0 flex items-center">
            <hr
              ref={ref}
              className="w-full border-t border-border"
              {...props}
            />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-sm text-muted-foreground">
              {label}
            </span>
          </div>
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={cn("my-6 border-t border-border", className)}
        {...props}
      />
    );
  },
);
FormDivider.displayName = "FormDivider";

// Convenience component: SubmitButton
export interface SubmitButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "type"> {
  loading?: boolean;
  loadingText?: string;
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    { loading, loadingText = "Submitting...", disabled, children, ...props },
    ref,
  ) => {
    const { disabled: formDisabled } = useFormContext();

    return (
      <Button
        ref={ref}
        type="submit"
        disabled={disabled || formDisabled || loading}
        {...props}
      >
        {loading ? loadingText : children}
      </Button>
    );
  },
);
SubmitButton.displayName = "SubmitButton";
