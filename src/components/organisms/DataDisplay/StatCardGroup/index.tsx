import { forwardRef } from "react";
import type { StatCardProps } from "@/components/molecules";
import { StatCard } from "@/components/molecules";
import { cn } from "@/components/utils";

export interface StatCardGroupItem extends StatCardProps {
  id: string;
}

export interface StatCardGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: StatCardGroupItem[];
  columns?: 1 | 2 | 3 | 4 | "auto";
  gap?: "sm" | "md" | "lg";
}

const gapClasses = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const StatCardGroup = forwardRef<HTMLDivElement, StatCardGroupProps>(
  ({ className, stats, columns = "auto", gap = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columnClasses[columns],
          gapClasses[gap],
          className,
        )}
        {...props}
      >
        {stats.map(({ id, ...stat }) => (
          <StatCard key={id} {...stat} />
        ))}
      </div>
    );
  },
);
StatCardGroup.displayName = "StatCardGroup";
