import type { VariantProps } from "class-variance-authority";
import { forwardRef, useState } from "react";
import { TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface AnimatedStatItem {
  id: string;
  label: string;
  value: string | number;
  hoverValue?: string | number;
  hoverLabel?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  color?: string;
  description?: string;
}

// ============================================
// AnimatedStats - Stats with hover animation
// ============================================

export interface AnimatedStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  stats: AnimatedStatItem[];
  columns?: 2 | 3 | 4;
  action?: React.ReactNode;
}

export const AnimatedStats = forwardRef<HTMLDivElement, AnimatedStatsProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      stats,
      columns = 3,
      action,
      ...props
    },
    ref,
  ) => {
    const columnClasses = {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    };

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            <div>
              {title && (
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Stats Grid */}
        <div
          className={cn("grid divide-x divide-border", columnClasses[columns])}
        >
          {stats.map((stat) => (
            <AnimatedStatCell key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    );
  },
);
AnimatedStats.displayName = "AnimatedStats";

// Individual animated stat cell
function AnimatedStatCell({ stat }: { stat: AnimatedStatItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-4 cursor-pointer transition-colors duration-200 hover:bg-muted/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {/* Default State */}
        <div
          className={cn(
            "transition-all duration-300 transform",
            isHovered && stat.hoverValue !== undefined
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100",
          )}
        >
          {stat.icon && (
            <span
              className="text-muted-foreground mb-2 block"
              style={stat.color ? { color: stat.color } : undefined}
            >
              {stat.icon}
            </span>
          )}
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <div className="flex items-center gap-x-2 mt-1">
            <span
              className="text-xl font-bold text-foreground tabular-nums"
              style={stat.color ? { color: stat.color } : undefined}
            >
              {stat.value}
            </span>
            {stat.trend && (
              <TrendIndicator
                value={stat.trend.value}
                direction={stat.trend.direction}
                variant={stat.trend.variant}
                size="xs"
              />
            )}
          </div>
        </div>

        {/* Hover State */}
        {stat.hoverValue !== undefined && (
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300 transform",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0",
            )}
          >
            <p className="text-xs text-muted-foreground">
              {stat.hoverLabel || stat.label}
            </p>
            <span
              className="text-xl font-bold text-foreground tabular-nums mt-1 block"
              style={stat.color ? { color: stat.color } : undefined}
            >
              {stat.hoverValue}
            </span>
            {stat.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// PulseAnimatedStats - Stats with pulse animation
// ============================================

export interface PulseAnimatedStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  stats: AnimatedStatItem[];
  showPulse?: boolean;
  action?: React.ReactNode;
}

export const PulseAnimatedStats = forwardRef<
  HTMLDivElement,
  PulseAnimatedStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      stats,
      showPulse = true,
      action,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Stats */}
        <div className="p-4 space-y-4">
          {stats.map((stat, index) => {
            const barColor =
              stat.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div
                key={stat.id}
                className="flex items-center gap-x-4 group cursor-pointer"
              >
                {/* Pulse Indicator */}
                <div className="relative">
                  <span
                    className={cn(
                      "size-3 rounded-full block",
                      showPulse && "animate-pulse",
                    )}
                    style={{ backgroundColor: barColor }}
                  />
                  {showPulse && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: barColor }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {stat.label}
                    </span>
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        {stat.value}
                      </span>
                      {stat.trend && (
                        <TrendIndicator
                          value={stat.trend.value}
                          direction={stat.trend.direction}
                          variant={stat.trend.variant}
                          size="xs"
                        />
                      )}
                    </div>
                  </div>
                  {stat.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
PulseAnimatedStats.displayName = "PulseAnimatedStats";

// ============================================
// CountUpStats - Stats with count-up animation effect
// ============================================

export interface CountUpStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  stats: {
    id: string;
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    icon?: React.ReactNode;
    color?: string;
  }[];
  columns?: 2 | 3 | 4;
  action?: React.ReactNode;
}

export const CountUpStats = forwardRef<HTMLDivElement, CountUpStatsProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      stats,
      columns = 3,
      action,
      ...props
    },
    ref,
  ) => {
    const columnClasses = {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    };

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Stats Grid */}
        <div
          className={cn("grid divide-x divide-border", columnClasses[columns])}
        >
          {stats.map((stat, index) => {
            const statColor =
              stat.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={stat.id} className="p-4 text-center">
                {stat.icon && (
                  <span
                    className="mb-2 inline-block"
                    style={{ color: statColor }}
                  >
                    {stat.icon}
                  </span>
                )}
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p
                  className="text-2xl font-bold tabular-nums mt-1"
                  style={{ color: statColor }}
                >
                  {stat.prefix}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
CountUpStats.displayName = "CountUpStats";

// ============================================
// GlowAnimatedStats - Stats with glow effect on hover
// ============================================

export interface GlowAnimatedStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  stats: AnimatedStatItem[];
  action?: React.ReactNode;
}

export const GlowAnimatedStats = forwardRef<
  HTMLDivElement,
  GlowAnimatedStatsProps
>(
  (
    { className, variant = "bordered", title, stats, action, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Stats */}
        <div className="p-4 flex flex-wrap gap-4">
          {stats.map((stat, index) => {
            const glowColor =
              stat.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div
                key={stat.id}
                className={cn(
                  "flex-1 min-w-[140px] p-4 rounded-lg border border-border",
                  "transition-all duration-300",
                  "hover:shadow-lg hover:scale-[1.02]",
                )}
                style={{
                  boxShadow: `0 0 0 0 ${glowColor}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px 0 ${glowColor}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 0 ${glowColor}40`;
                }}
              >
                {stat.icon && (
                  <span className="mb-2 block" style={{ color: glowColor }}>
                    {stat.icon}
                  </span>
                )}
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p
                  className="text-xl font-bold tabular-nums mt-1"
                  style={{ color: glowColor }}
                >
                  {stat.value}
                </p>
                {stat.trend && (
                  <TrendIndicator
                    value={stat.trend.value}
                    direction={stat.trend.direction}
                    variant={stat.trend.variant}
                    size="xs"
                    className="mt-1"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
GlowAnimatedStats.displayName = "GlowAnimatedStats";
