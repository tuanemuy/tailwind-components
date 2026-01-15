import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import {
  descriptionListVariants,
  descriptionListItemVariants,
  descriptionTermVariants,
  descriptionDetailsVariants,
} from "@/lib/variants/descriptionList";
import type { VariantProps } from "class-variance-authority";

type DescriptionListVariant = "default" | "grid" | "inline" | "card";
type DescriptionListSize = "sm" | "md" | "lg";

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement>,
    VariantProps<typeof descriptionListVariants> {
  items?: Array<{
    term: React.ReactNode;
    details: React.ReactNode;
    icon?: React.ReactNode;
  }>;
  size?: DescriptionListSize;
}

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  (
    {
      className,
      variant = "default",
      columns = 1,
      items,
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const isGrid = variant === "grid";

    return (
      <dl
        ref={ref}
        className={cn(
          descriptionListVariants({ variant, columns: isGrid ? columns : undefined }),
          className
        )}
        {...props}
      >
        {items
          ? items.map((item, index) => (
              <DescriptionListItem
                key={index}
                variant={variant as DescriptionListVariant}
                size={size}
              >
                {item.icon && (
                  <DescriptionListIcon size={size}>{item.icon}</DescriptionListIcon>
                )}
                <DescriptionTerm variant={variant as DescriptionListVariant} size={size}>
                  {item.term}
                </DescriptionTerm>
                <DescriptionDetails size={size}>{item.details}</DescriptionDetails>
              </DescriptionListItem>
            ))
          : children}
      </dl>
    );
  }
);
DescriptionList.displayName = "DescriptionList";

// DescriptionListItem
export interface DescriptionListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DescriptionListVariant;
  size?: DescriptionListSize;
}

export const DescriptionListItem = forwardRef<HTMLDivElement, DescriptionListItemProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(descriptionListItemVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DescriptionListItem.displayName = "DescriptionListItem";

// DescriptionListIcon
export interface DescriptionListIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: DescriptionListSize;
}

export const DescriptionListIcon = forwardRef<HTMLDivElement, DescriptionListIconProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 text-muted-foreground",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DescriptionListIcon.displayName = "DescriptionListIcon";

// DescriptionTerm
export interface DescriptionTermProps extends React.HTMLAttributes<HTMLElement> {
  variant?: DescriptionListVariant;
  size?: DescriptionListSize;
}

export const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={cn(descriptionTermVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </dt>
    );
  }
);
DescriptionTerm.displayName = "DescriptionTerm";

// DescriptionDetails
export interface DescriptionDetailsProps extends React.HTMLAttributes<HTMLElement> {
  size?: DescriptionListSize;
}

export const DescriptionDetails = forwardRef<HTMLElement, DescriptionDetailsProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        className={cn(descriptionDetailsVariants({ size }), className)}
        {...props}
      >
        {children}
      </dd>
    );
  }
);
DescriptionDetails.displayName = "DescriptionDetails";

// Horizontal Description List with striped rows
export interface HorizontalDescriptionListProps extends DescriptionListProps {
  striped?: boolean;
}

export const HorizontalDescriptionList = forwardRef<HTMLDListElement, HorizontalDescriptionListProps>(
  ({ className, items, size = "md", striped = false, ...props }, ref) => {
    return (
      <dl
        ref={ref}
        className={cn("divide-y divide-border", className)}
        {...props}
      >
        {items?.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between py-3",
              striped && index % 2 === 0 && "bg-muted/30"
            )}
          >
            <div className="flex items-center gap-x-3">
              {item.icon && (
                <div className={cn("shrink-0 text-muted-foreground", size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5")}>
                  {item.icon}
                </div>
              )}
              <dt className={cn(descriptionTermVariants({ size }), "sm:w-auto")}>
                {item.term}
              </dt>
            </div>
            <dd className={cn(descriptionDetailsVariants({ size }))}>
              {item.details}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
);
HorizontalDescriptionList.displayName = "HorizontalDescriptionList";

// Card style description list
export interface CardDescriptionListProps extends DescriptionListProps {
  title?: string;
  description?: string;
}

export const CardDescriptionList = forwardRef<HTMLDListElement, CardDescriptionListProps>(
  ({ className, title, description, items, size = "md", ...props }, ref) => {
    return (
      <div className={cn("rounded-lg border border-border bg-card overflow-hidden", className)}>
        {(title || description) && (
          <div className="border-b border-border p-4">
            {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <dl ref={ref} className="divide-y divide-border" {...props}>
          {items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-x-3">
                {item.icon && (
                  <div className={cn("shrink-0 text-muted-foreground", size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5")}>
                    {item.icon}
                  </div>
                )}
                <dt className={cn(descriptionTermVariants({ size }), "sm:w-auto")}>
                  {item.term}
                </dt>
              </div>
              <dd className={cn(descriptionDetailsVariants({ size }))}>
                {item.details}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
);
CardDescriptionList.displayName = "CardDescriptionList";
