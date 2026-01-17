import { forwardRef, type ReactNode } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export interface StatItem {
  id: string;
  value: string | number;
  label: string;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down";
    label?: string;
  };
  prefix?: string;
  suffix?: string;
}

// StatsSection component
export interface StatsSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted" | "primary" | "gradient";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
  primary: "bg-primary text-primary-foreground",
  gradient:
    "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground",
};

export const StatsSection = forwardRef<HTMLElement, StatsSectionProps>(
  (
    {
      className,
      padding = "md",
      backgroundColor = "default",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[backgroundColor],
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
StatsSection.displayName = "StatsSection";

// StatsSectionHeader component
export interface StatsSectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const StatsSectionHeader = forwardRef<
  HTMLDivElement,
  StatsSectionHeaderProps
>(({ className, align = "center", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-2xl text-left",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
StatsSectionHeader.displayName = "StatsSectionHeader";

// StatsSectionTitle component
export interface StatsSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
}

export const StatsSectionTitle = forwardRef<
  HTMLHeadingElement,
  StatsSectionTitleProps
>(({ className, as: Component = "h2", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn("text-3xl font-bold md:text-4xl", className)}
      {...props}
    >
      {children}
    </Component>
  );
});
StatsSectionTitle.displayName = "StatsSectionTitle";

// StatsSectionSubtitle component
export interface StatsSectionSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const StatsSectionSubtitle = forwardRef<
  HTMLParagraphElement,
  StatsSectionSubtitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-4 text-lg opacity-80", className)}
      {...props}
    >
      {children}
    </p>
  );
});
StatsSectionSubtitle.displayName = "StatsSectionSubtitle";

// StatsGrid component
export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  variant?: "simple" | "divided" | "cards";
}

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6 md:gap-8",
  lg: "gap-8 md:gap-12",
};

export const StatsGrid = forwardRef<HTMLDivElement, StatsGridProps>(
  (
    {
      className,
      columns = 4,
      gap = "md",
      variant = "simple",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columnClasses[columns],
          variant === "divided" &&
            "divide-y sm:divide-x sm:divide-y-0 divide-border",
          variant !== "divided" && gapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
StatsGrid.displayName = "StatsGrid";

// StatCard component
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stat: StatItem;
  variant?: "simple" | "card" | "bordered" | "icon";
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  showTrend?: boolean;
}

const cardVariants = {
  simple: "",
  card: "rounded-xl bg-card p-6 shadow-sm",
  bordered: "rounded-xl border border-border p-6",
  icon: "rounded-xl bg-card p-6",
};

const valueSizes = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
};

const labelSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      stat,
      variant = "simple",
      size = "md",
      align = "center",
      showTrend = true,
      ...props
    },
    ref,
  ) => {
    const formatValue = (
      value: string | number,
      prefix?: string,
      suffix?: string,
    ) => {
      return `${prefix || ""}${value}${suffix || ""}`;
    };

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants[variant],
          align === "center" ? "text-center" : "text-left",
          variant === "simple" && "py-4",
          className,
        )}
        {...props}
      >
        {/* Icon */}
        {variant === "icon" && stat.icon && (
          <div
            className={cn("mb-4", align === "center" && "flex justify-center")}
          >
            <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {stat.icon}
            </div>
          </div>
        )}

        {/* Value */}
        <div className={cn("font-bold tracking-tight", valueSizes[size])}>
          {formatValue(stat.value, stat.prefix, stat.suffix)}
        </div>

        {/* Label */}
        <div className={cn("mt-1 font-medium opacity-75", labelSizes[size])}>
          {stat.label}
        </div>

        {/* Description */}
        {stat.description && (
          <p className="mt-2 text-sm opacity-60">{stat.description}</p>
        )}

        {/* Trend */}
        {showTrend && stat.trend && (
          <div
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-sm",
              stat.trend.direction === "up"
                ? "text-success"
                : "text-destructive",
            )}
          >
            {stat.trend.direction === "up" ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
            <span className="font-medium">{stat.trend.value}</span>
            {stat.trend.label && (
              <span className="opacity-75">{stat.trend.label}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);
StatCard.displayName = "StatCard";

// StatsRow component (inline stats)
export interface StatsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: StatItem[];
  separator?: boolean;
}

export const StatsRow = forwardRef<HTMLDivElement, StatsRowProps>(
  ({ className, stats, separator = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-center gap-8 md:gap-12",
          className,
        )}
        {...props}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={cn(
              "text-center",
              separator &&
                index !== stats.length - 1 &&
                "border-r border-border pr-8 md:pr-12",
            )}
          >
            <div className="text-3xl font-bold md:text-4xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            <div className="mt-1 text-sm opacity-75">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  },
);
StatsRow.displayName = "StatsRow";

// AnimatedStatValue component
export interface AnimatedStatValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedStatValue = forwardRef<
  HTMLSpanElement,
  AnimatedStatValueProps
>(
  (
    { className, value, prefix = "", suffix = "", duration = 2000, ...props },
    ref,
  ) => {
    // Note: Animation would typically be implemented with a counter animation library
    // For simplicity, we're just showing the final value
    return (
      <span ref={ref} className={className} {...props}>
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </span>
    );
  },
);
AnimatedStatValue.displayName = "AnimatedStatValue";

// CompleteStatsSection component - pre-composed full stats section
export interface CompleteStatsSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
  variant?: StatCardProps["variant"];
  columns?: StatsGridProps["columns"];
  backgroundColor?: StatsSectionProps["backgroundColor"];
  showTrend?: boolean;
}

export const CompleteStatsSection = forwardRef<
  HTMLElement,
  CompleteStatsSectionProps
>(
  (
    {
      className,
      title,
      subtitle,
      stats,
      variant = "simple",
      columns,
      backgroundColor = "default",
      showTrend = true,
      ...props
    },
    ref,
  ) => {
    const effectiveColumns =
      columns || (stats.length <= 3 ? (stats.length as 2 | 3) : 4);

    return (
      <StatsSection
        ref={ref}
        backgroundColor={backgroundColor}
        className={className}
        {...props}
      >
        {(title || subtitle) && (
          <StatsSectionHeader>
            {title && <StatsSectionTitle>{title}</StatsSectionTitle>}
            {subtitle && (
              <StatsSectionSubtitle>{subtitle}</StatsSectionSubtitle>
            )}
          </StatsSectionHeader>
        )}

        <StatsGrid
          columns={effectiveColumns}
          variant={variant === "simple" ? "divided" : "simple"}
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
              variant={variant}
              showTrend={showTrend}
            />
          ))}
        </StatsGrid>
      </StatsSection>
    );
  },
);
CompleteStatsSection.displayName = "CompleteStatsSection";

// SimpleStatsBar component - compact inline stats bar
export interface SimpleStatsBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: { value: string; label: string }[];
}

export const SimpleStatsBar = forwardRef<HTMLDivElement, SimpleStatsBarProps>(
  ({ className, stats, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-16",
          className,
        )}
        {...props}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
            <div className="text-sm opacity-75">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  },
);
SimpleStatsBar.displayName = "SimpleStatsBar";
