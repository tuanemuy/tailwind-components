"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Button } from "@/components/atoms/Button";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  setupFlowIndicatorVariants,
  setupFlowStepVariants,
  setupFlowVariants,
} from "@/components/variants/setupFlow";

type SetupFlowVariant = "list" | "timeline" | "accordion" | "card";
type StepStatus = "pending" | "current" | "completed";

export interface SetupStep {
  id: string;
  title: string;
  description?: string;
  status: StepStatus;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  optional?: boolean;
}

export interface SetupFlowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof setupFlowVariants> {
  steps: SetupStep[];
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

export const SetupFlow = forwardRef<HTMLDivElement, SetupFlowProps>(
  (
    {
      className,
      variant = "list",
      columns = 1,
      steps,
      title,
      description,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const isCardVariant = variant === "card";

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {/* Header */}
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Steps */}
        <div
          className={cn(
            setupFlowVariants({
              variant,
              columns: isCardVariant ? columns : undefined,
            }),
          )}
        >
          {steps.map((step, index) => (
            <SetupFlowStep
              key={step.id}
              step={step}
              variant={variant as SetupFlowVariant}
              size={size}
              stepNumber={index + 1}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    );
  },
);
SetupFlow.displayName = "SetupFlow";

// Setup Flow Step
interface SetupFlowStepProps {
  step: SetupStep;
  variant: SetupFlowVariant;
  size: "sm" | "md" | "lg";
  stepNumber: number;
  isLast?: boolean;
}

export const SetupFlowStep = forwardRef<
  HTMLDivElement,
  SetupFlowStepProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    { className, step, variant, size, stepNumber, isLast = false, ...props },
    ref,
  ) => {
    const showConnector = variant === "timeline" && !isLast;

    return (
      <div
        ref={ref}
        className={cn(
          setupFlowStepVariants({ variant, status: step.status }),
          className,
        )}
        {...props}
      >
        {/* Timeline connector */}
        {showConnector && (
          <div className="absolute left-4 top-8 bottom-0 w-px -translate-x-1/2 bg-border" />
        )}

        {/* Indicator */}
        <SetupFlowIndicator
          status={step.status}
          size={size}
          stepNumber={stepNumber}
          icon={step.icon}
        />

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-2">
            <h4
              className={cn(
                "font-medium",
                step.status === "completed"
                  ? "text-muted-foreground"
                  : "text-foreground",
                size === "sm" ? "text-sm" : "text-base",
              )}
            >
              {step.title}
            </h4>
            {step.optional && (
              <span className="text-xs text-muted-foreground">(Optional)</span>
            )}
          </div>

          {step.description && (
            <p
              className={cn(
                "text-muted-foreground",
                size === "sm" ? "text-xs" : "text-sm",
              )}
            >
              {step.description}
            </p>
          )}

          {step.content && <div className="mt-2">{step.content}</div>}

          {step.action && step.status !== "completed" && (
            <Button
              variant={step.status === "current" ? "primary" : "outline"}
              size={size}
              onClick={step.action.onClick}
              className="mt-2"
            >
              {step.action.label}
            </Button>
          )}
        </div>
      </div>
    );
  },
);
SetupFlowStep.displayName = "SetupFlowStep";

// Indicator component
interface SetupFlowIndicatorProps
  extends VariantProps<typeof setupFlowIndicatorVariants> {
  stepNumber: number;
  icon?: React.ReactNode;
}

export const SetupFlowIndicator = forwardRef<
  HTMLDivElement,
  SetupFlowIndicatorProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    { className, status = "pending", size = "md", stepNumber, icon, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(setupFlowIndicatorVariants({ status, size }), className)}
        {...props}
      >
        {status === "completed" ? (
          <CheckIcon
            className={cn(
              size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4",
            )}
          />
        ) : icon ? (
          <span
            className={cn(
              size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4",
            )}
          >
            {icon}
          </span>
        ) : (
          stepNumber
        )}
      </div>
    );
  },
);
SetupFlowIndicator.displayName = "SetupFlowIndicator";

// Progress indicator for setup flow
export interface SetupProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: SetupStep[];
  currentStep?: number;
}

export const SetupProgress = forwardRef<HTMLDivElement, SetupProgressProps>(
  ({ className, steps, currentStep, ...props }, ref) => {
    const completedCount = steps.filter((s) => s.status === "completed").length;
    const progress = (completedCount / steps.length) * 100;

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {completedCount} of {steps.length} completed
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  },
);
SetupProgress.displayName = "SetupProgress";
