"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import {
  paginationItemVariants,
  paginationVariants,
} from "@/components/variants/pagination";

// Pagination Root
export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="Pagination" {...props}>
        <ul className={cn(paginationVariants({ size }), className)}>
          {children}
        </ul>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";

// PaginationItem
export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {}

export const PaginationItem = forwardRef<
  HTMLButtonElement,
  PaginationItemProps
>(
  (
    { className, variant = "default", size = "md", active, children, ...props },
    ref,
  ) => {
    return (
      <li>
        <button
          ref={ref}
          type="button"
          className={cn(
            paginationItemVariants({ variant, size, active }),
            className,
          )}
          aria-current={active ? "page" : undefined}
          {...props}
        >
          {children}
        </button>
      </li>
    );
  },
);
PaginationItem.displayName = "PaginationItem";

// PaginationPrevious
export interface PaginationPreviousProps
  extends Omit<PaginationItemProps, "children"> {
  label?: string;
}

export const PaginationPrevious = forwardRef<
  HTMLButtonElement,
  PaginationPreviousProps
>(
  (
    {
      className,
      label = "Previous",
      size = "md",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

    return (
      <PaginationItem
        ref={ref}
        className={cn("w-auto gap-x-1 px-2.5", className)}
        size={size}
        variant={variant}
        {...props}
      >
        <ChevronLeftIcon className={iconSize} />
        <span className="sr-only sm:not-sr-only">{label}</span>
      </PaginationItem>
    );
  },
);
PaginationPrevious.displayName = "PaginationPrevious";

// PaginationNext
export interface PaginationNextProps
  extends Omit<PaginationItemProps, "children"> {
  label?: string;
}

export const PaginationNext = forwardRef<
  HTMLButtonElement,
  PaginationNextProps
>(
  (
    { className, label = "Next", size = "md", variant = "default", ...props },
    ref,
  ) => {
    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

    return (
      <PaginationItem
        ref={ref}
        className={cn("w-auto gap-x-1 px-2.5", className)}
        size={size}
        variant={variant}
        {...props}
      >
        <span className="sr-only sm:not-sr-only">{label}</span>
        <ChevronRightIcon className={iconSize} />
      </PaginationItem>
    );
  },
);
PaginationNext.displayName = "PaginationNext";

// PaginationEllipsis
export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
}

export const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  return (
    <li>
      <span
        ref={ref}
        className={cn(
          "flex items-center justify-center text-muted-foreground",
          sizeClasses[size],
          className,
        )}
        aria-hidden="true"
        {...props}
      >
        <MoreHorizontalIcon className="size-4" />
      </span>
    </li>
  );
});
PaginationEllipsis.displayName = "PaginationEllipsis";

// Helper component for a complete pagination
export interface PaginationNumbersProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  siblingCount?: number;
}

export const PaginationNumbers = ({
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
  variant = "default",
  siblingCount = 1,
}: PaginationNumbersProps) => {
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const generatePages = () => {
    const totalPageNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalPageNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "ellipsis", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "ellipsis", ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
  };

  const pages = generatePages();

  return (
    <Pagination size={size}>
      <PaginationPrevious
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size={size}
        variant={variant}
      />
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: Ellipsis elements need index for unique keys
          <PaginationEllipsis key={`ellipsis-${index}`} size={size} />
        ) : (
          <PaginationItem
            key={page}
            onClick={() => onPageChange(page as number)}
            active={currentPage === page}
            size={size}
            variant={variant}
          >
            {page}
          </PaginationItem>
        ),
      )}
      <PaginationNext
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        size={size}
        variant={variant}
      />
    </Pagination>
  );
};
PaginationNumbers.displayName = "PaginationNumbers";
