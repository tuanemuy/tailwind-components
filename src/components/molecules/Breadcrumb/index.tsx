"use client";

import { forwardRef, createContext, useContext, Children, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";
import { breadcrumbVariants, breadcrumbItemVariants } from "@/lib/variants/breadcrumb";
import { ChevronRightIcon } from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

type BreadcrumbSize = "sm" | "md" | "lg";

interface BreadcrumbContextValue {
  size: BreadcrumbSize;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

const useBreadcrumbContext = () => {
  const context = useContext(BreadcrumbContext);
  return context ?? { size: "md" as BreadcrumbSize };
};

// Breadcrumb Root
export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, size = "md", separator, children, ...props }, ref) => {
    const childrenArray = Children.toArray(children);

    const separatorElement = separator ?? (
      <ChevronRightIcon className={cn(
        "text-muted-foreground",
        size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4"
      )} />
    );

    const itemsWithSeparators = childrenArray.map((child, index) => {
      const isLast = index === childrenArray.length - 1;

      return (
        <li key={index} className="flex items-center">
          {isValidElement(child) ? cloneElement(child as React.ReactElement<{ isCurrent?: boolean }>, { isCurrent: isLast }) : child}
          {!isLast && (
            <span className="mx-2 flex-shrink-0" aria-hidden="true">
              {separatorElement}
            </span>
          )}
        </li>
      );
    });

    return (
      <BreadcrumbContext.Provider value={{ size: size ?? "md" }}>
        <nav ref={ref} aria-label="Breadcrumb" {...props}>
          <ol className={cn(breadcrumbVariants({ size }), className)}>
            {itemsWithSeparators}
          </ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

// BreadcrumbItem
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof breadcrumbItemVariants> {
  href?: string;
  isCurrent?: boolean;
  icon?: React.ReactNode;
}

export const BreadcrumbItem = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  ({ className, href, isCurrent, icon, children, ...props }, ref) => {
    const { size } = useBreadcrumbContext();

    const iconSize = size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4";

    const content = (
      <>
        {icon && <span className={cn(iconSize, "me-1.5")}>{icon}</span>}
        {children}
      </>
    );

    if (isCurrent) {
      return (
        <span
          ref={ref}
          className={cn(breadcrumbItemVariants({ variant: "current" }), className)}
          aria-current="page"
          {...props}
        >
          {content}
        </span>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          className={cn(breadcrumbItemVariants({ variant: "default" }), className)}
        >
          {content}
        </a>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(breadcrumbItemVariants({ variant: "default" }), className)}
        {...props}
      >
        {content}
      </span>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

// BreadcrumbEllipsis
export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-muted-foreground", className)}
        aria-hidden="true"
        {...props}
      >
        &hellip;
      </span>
    );
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
