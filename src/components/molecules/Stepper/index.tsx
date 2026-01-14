"use client";

import { forwardRef, createContext, useContext, Children, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";
import {
  stepperVariants,
  stepVariants,
  stepIndicatorVariants,
  stepConnectorVariants,
} from "@/lib/variants/stepper";
import { CheckIcon } from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

type Orientation = "horizontal" | "vertical";
type StepStatus = "completed" | "current" | "upcoming" | "error";
type StepSize = "sm" | "md" | "lg";

interface StepperContextValue {
  orientation: Orientation;
  size: StepSize;
  currentStep: number;
  totalSteps: number;
}

const StepperContext = createContext<StepperContextValue | null>(null);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  return context ?? {
    orientation: "horizontal" as Orientation,
    size: "md" as StepSize,
    currentStep: 0,
    totalSteps: 0,
  };
};

// Stepper Root
export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  currentStep?: number;
  size?: StepSize;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      orientation = "horizontal",
      currentStep = 0,
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const childrenArray = Children.toArray(children);
    const totalSteps = childrenArray.length;

    const stepsWithIndex = childrenArray.map((child, index) => {
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<{ index?: number; isLast?: boolean }>, {
          index,
          isLast: index === totalSteps - 1,
        });
      }
      return child;
    });

    return (
      <StepperContext.Provider
        value={{ orientation: orientation ?? "horizontal", size, currentStep, totalSteps }}
      >
        <div
          ref={ref}
          className={cn(stepperVariants({ orientation }), className)}
          {...props}
        >
          {stepsWithIndex}
        </div>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = "Stepper";

// Step
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  isLast?: boolean;
  status?: StepStatus;
  icon?: React.ReactNode;
  label: string;
  description?: string;
}

export const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ className, index = 0, isLast = false, status, icon, label, description, ...props }, ref) => {
    const { orientation, size, currentStep } = useStepperContext();

    const derivedStatus =
      status ??
      (index < currentStep
        ? "completed"
        : index === currentStep
          ? "current"
          : "upcoming");

    const isCompleted = derivedStatus === "completed";

    return (
      <div
        ref={ref}
        className={cn(
          stepVariants({ orientation }),
          orientation === "vertical" && "pb-6 last:pb-0",
          className
        )}
        {...props}
      >
        <div className={cn(
          "flex",
          orientation === "horizontal" ? "flex-col items-center" : "items-start gap-x-3"
        )}>
          {/* Indicator */}
          <StepIndicator status={derivedStatus} size={size} icon={icon} index={index} />

          {/* Content */}
          <div className={cn(
            orientation === "horizontal" ? "mt-2 text-center" : "",
          )}>
            <div className={cn(
              "font-medium",
              size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
              derivedStatus === "current"
                ? "text-foreground"
                : derivedStatus === "completed"
                  ? "text-foreground"
                  : "text-muted-foreground"
            )}>
              {label}
            </div>
            {description && (
              <div className={cn(
                "text-muted-foreground",
                size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
              )}>
                {description}
              </div>
            )}
          </div>
        </div>

        {/* Connector */}
        {!isLast && (
          <div className={cn(
            stepConnectorVariants({ orientation, completed: isCompleted }),
            orientation === "horizontal" && "mx-2",
            orientation === "vertical" && "ms-4 mt-2"
          )} />
        )}
      </div>
    );
  }
);
Step.displayName = "Step";

// StepIndicator
interface StepIndicatorProps
  extends VariantProps<typeof stepIndicatorVariants> {
  icon?: React.ReactNode;
  index?: number;
}

const StepIndicator = ({
  status = "upcoming",
  size = "md",
  icon,
  index = 0,
}: StepIndicatorProps) => {
  const iconSize = size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4";

  return (
    <div className={cn(stepIndicatorVariants({ size, status }))}>
      {status === "completed" ? (
        <CheckIcon className={iconSize} />
      ) : icon ? (
        <span className={iconSize}>{icon}</span>
      ) : (
        index + 1
      )}
    </div>
  );
};
StepIndicator.displayName = "StepIndicator";
