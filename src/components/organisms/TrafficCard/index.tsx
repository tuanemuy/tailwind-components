import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";
import { TrendIndicator } from "@/components/molecules";
import { Badge } from "@/components/atoms";
import type { VariantProps } from "class-variance-authority";
import type { TrendDirection, TrendVariant } from "@/lib/types";

// ============================================
// Types
// ============================================

export interface TrafficSource {
  id: string;
  name: string;
  sessions: number;
  percentage?: number;
  color?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface TrafficMetric {
  id: string;
  label: string;
  value: string | number;
  previousValue?: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  icon?: React.ReactNode;
}

// ============================================
// TrafficCard
// ============================================

export interface TrafficCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  sources: TrafficSource[];
  totalSessions?: number;
  showPercentage?: boolean;
  showProgress?: boolean;
  period?: string;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const TrafficCard = forwardRef<HTMLDivElement, TrafficCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Traffic Sources",
      subtitle,
      sources,
      totalSessions,
      showPercentage = true,
      showProgress = true,
      period,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const total = totalSessions ?? sources.reduce((sum, s) => sum + s.sessions, 0);
    const maxSessions = Math.max(...sources.map((s) => s.sessions));

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
                <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-x-2">
              {period && (
                <Badge variant="secondary" size="sm">
                  {period}
                </Badge>
              )}
              {action}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-xs text-muted-foreground">Total Sessions</p>
          <p className="text-2xl font-bold text-foreground tabular-nums">
            {formatValue(total)}
          </p>
        </div>

        {/* Sources */}
        <div className="divide-y divide-border">
          {sources.map((source, index) => {
            const percentage = source.percentage ?? (source.sessions / total) * 100;
            const progressWidth = (source.sessions / maxSessions) * 100;
            const barColor = source.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={source.id} className="px-4 py-3">
                <div className="flex items-center gap-x-3">
                  {/* Icon */}
                  {source.icon && (
                    <span
                      className="shrink-0 size-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${barColor}20`, color: barColor }}
                    >
                      {source.icon}
                    </span>
                  )}

                  {/* Source Name */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate block">
                      {source.name}
                    </span>
                  </div>

                  {/* Value & Trend */}
                  <div className="flex items-center gap-x-2 shrink-0">
                    {source.trend && (
                      <TrendIndicator
                        value={source.trend.value}
                        direction={source.trend.direction}
                        variant={source.trend.variant}
                        size="xs"
                      />
                    )}
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      {formatValue(source.sessions)}
                    </span>
                    {showPercentage && (
                      <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                        {Math.round(percentage)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {showProgress && (
                  <div className={cn("mt-2 h-1.5 rounded-full bg-muted overflow-hidden", source.icon && "ml-11")}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progressWidth}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
TrafficCard.displayName = "TrafficCard";

// ============================================
// TrafficOverviewCard - Key metrics overview
// ============================================

export interface TrafficOverviewCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  metrics: TrafficMetric[];
  period?: string;
  action?: React.ReactNode;
}

export const TrafficOverviewCard = forwardRef<HTMLDivElement, TrafficOverviewCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Traffic Overview",
      metrics,
      period,
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
            <div>
              {title && (
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
              )}
            </div>
            <div className="flex items-center gap-x-2">
              {period && (
                <Badge variant="secondary" size="sm">
                  {period}
                </Badge>
              )}
              {action}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 divide-x divide-border">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className={cn(
                "p-4",
                index >= 2 && "border-t border-border"
              )}
            >
              <div className="flex items-center gap-x-2 mb-1">
                {metric.icon && (
                  <span className="text-muted-foreground">{metric.icon}</span>
                )}
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className="flex items-end gap-x-2">
                <span className="text-xl font-bold text-foreground tabular-nums">
                  {metric.value}
                </span>
                {metric.trend && (
                  <TrendIndicator
                    value={metric.trend.value}
                    direction={metric.trend.direction}
                    variant={metric.trend.variant}
                    size="xs"
                  />
                )}
              </div>
              {metric.previousValue !== undefined && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Previous: {metric.previousValue}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
TrafficOverviewCard.displayName = "TrafficOverviewCard";

// ============================================
// ReferrersCard - Top referrers display
// ============================================

export interface ReferrerData {
  id: string;
  domain: string;
  favicon?: string;
  sessions: number;
  percentage?: number;
}

export interface ReferrersCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  referrers: ReferrerData[];
  limit?: number;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const ReferrersCard = forwardRef<HTMLDivElement, ReferrersCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Top Referrers",
      referrers,
      limit = 5,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const displayReferrers = referrers.slice(0, limit);
    const total = referrers.reduce((sum, r) => sum + r.sessions, 0);
    const maxSessions = Math.max(...displayReferrers.map((r) => r.sessions));

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

        {/* Referrers */}
        <div className="divide-y divide-border">
          {displayReferrers.map((referrer, index) => {
            const percentage = referrer.percentage ?? (referrer.sessions / total) * 100;
            const progressWidth = (referrer.sessions / maxSessions) * 100;
            const barColor = `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={referrer.id} className="px-4 py-3">
                <div className="flex items-center gap-x-3">
                  {/* Favicon */}
                  {referrer.favicon ? (
                    <img
                      src={referrer.favicon}
                      alt={referrer.domain}
                      className="size-4 rounded shrink-0"
                    />
                  ) : (
                    <span
                      className="size-4 rounded shrink-0 flex items-center justify-center text-xs font-medium text-white uppercase"
                      style={{ backgroundColor: barColor }}
                    >
                      {referrer.domain[0]}
                    </span>
                  )}

                  {/* Domain */}
                  <span className="text-sm text-foreground truncate flex-1">
                    {referrer.domain}
                  </span>

                  {/* Value */}
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {formatValue(referrer.sessions)}
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                    {Math.round(percentage)}%
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-2 ml-7 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progressWidth}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {referrers.length > limit && (
          <div className="border-t border-border px-4 py-2 text-center">
            <span className="text-xs text-muted-foreground">
              +{referrers.length - limit} more referrers
            </span>
          </div>
        )}
      </div>
    );
  },
);
ReferrersCard.displayName = "ReferrersCard";

// ============================================
// DeviceBreakdownCard - Device type breakdown
// ============================================

export interface DeviceData {
  id: string;
  type: "desktop" | "mobile" | "tablet" | "other";
  label: string;
  sessions: number;
  percentage?: number;
  icon?: React.ReactNode;
}

export interface DeviceBreakdownCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  devices: DeviceData[];
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const DeviceBreakdownCard = forwardRef<HTMLDivElement, DeviceBreakdownCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Device Breakdown",
      devices,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const total = devices.reduce((sum, d) => sum + d.sessions, 0);

    const deviceColors: Record<string, string> = {
      desktop: "hsl(var(--chart-1))",
      mobile: "hsl(var(--chart-2))",
      tablet: "hsl(var(--chart-3))",
      other: "hsl(var(--chart-4))",
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

        {/* Stacked Bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="h-8 rounded-full overflow-hidden flex bg-muted">
            {devices.map((device) => {
              const percentage = device.percentage ?? (device.sessions / total) * 100;
              const color = deviceColors[device.type] || deviceColors.other;

              return (
                <div
                  key={device.id}
                  className="h-full flex items-center justify-center text-xs font-medium text-white"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                >
                  {percentage >= 15 && `${Math.round(percentage)}%`}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          {devices.map((device) => {
            const color = deviceColors[device.type] || deviceColors.other;

            return (
              <div key={device.id} className="flex items-center gap-x-2">
                {device.icon ? (
                  <span style={{ color }}>{device.icon}</span>
                ) : (
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                )}
                <span className="text-xs text-muted-foreground flex-1">
                  {device.label}
                </span>
                <span className="text-xs font-medium text-foreground tabular-nums">
                  {formatValue(device.sessions)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
DeviceBreakdownCard.displayName = "DeviceBreakdownCard";
