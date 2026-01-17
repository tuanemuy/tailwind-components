import { Children, cloneElement, forwardRef, isValidElement } from "react";
import type { ButtonProps } from "@/components/atoms";
import { cn } from "@/components/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "attached" | "separated";
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      variant = "attached",
      orientation = "horizontal",
      children,
      ...props
    },
    ref,
  ) => {
    const isAttached = variant === "attached";
    const isHorizontal = orientation === "horizontal";

    const childArray = Children.toArray(children).filter(isValidElement);
    const childCount = childArray.length;

    return (
      // biome-ignore lint/a11y/useSemanticElements: ButtonGroup is not a form control, fieldset is not appropriate
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          isHorizontal ? "flex-row" : "flex-col",
          !isAttached && (isHorizontal ? "gap-x-2" : "gap-y-2"),
          className,
        )}
        role="group"
        {...props}
      >
        {childArray.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === childCount - 1;

          if (!isAttached) {
            return child;
          }

          // attached モードの場合、角丸とボーダーを調整
          const attachedClasses = cn(
            // 角丸の調整
            isHorizontal
              ? {
                  "rounded-r-none": !isLast,
                  "rounded-l-none": !isFirst,
                }
              : {
                  "rounded-b-none": !isLast,
                  "rounded-t-none": !isFirst,
                },
            // ボーダーの重複防止
            !isFirst && (isHorizontal ? "-ms-px" : "-mt-px"),
            // フォーカス時のz-index
            "focus:z-10 focus:relative",
          );

          return cloneElement(child as React.ReactElement<ButtonProps>, {
            className: cn(
              (child as React.ReactElement<ButtonProps>).props.className,
              attachedClasses,
            ),
          });
        })}
      </div>
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";
