import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";
import { ProgressBar } from "@/components/atoms";
import type { VariantProps } from "class-variance-authority";

// ============================================
// Types
// ============================================

export interface BrowserData {
  id: string;
  name: string;
  icon?: React.ReactNode;
  value: number;
  percentage: number;
  color?: string;
}

// ============================================
// BrowsersCard
// ============================================

export interface BrowsersCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  browsers: BrowserData[];
  showPercentage?: boolean;
  showBar?: boolean;
  action?: React.ReactNode;
}

export const BrowsersCard = forwardRef<HTMLDivElement, BrowsersCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Browsers",
      subtitle,
      browsers,
      showPercentage = true,
      showBar = true,
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
              {subtitle && (
                <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Browser List */}
        <div className="divide-y divide-border">
          {browsers.map((browser) => (
            <div key={browser.id} className="px-4 py-3">
              <div className="flex items-center justify-between gap-x-3">
                <div className="flex items-center gap-x-3 min-w-0">
                  {browser.icon && (
                    <span className="shrink-0 text-muted-foreground">
                      {browser.icon}
                    </span>
                  )}
                  <span className="text-sm font-medium text-foreground truncate">
                    {browser.name}
                  </span>
                </div>
                <div className="flex items-center gap-x-3 shrink-0">
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {browser.value.toLocaleString()}
                  </span>
                  {showPercentage && (
                    <span className="text-sm font-medium text-foreground w-12 text-right tabular-nums">
                      {browser.percentage}%
                    </span>
                  )}
                </div>
              </div>
              {showBar && (
                <div className="mt-2">
                  <ProgressBar
                    value={browser.percentage}
                    size="sm"
                    color={browser.color}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
BrowsersCard.displayName = "BrowsersCard";

// ============================================
// CompactBrowsersCard - Horizontal bars
// ============================================

export interface CompactBrowsersCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  browsers: BrowserData[];
  action?: React.ReactNode;
}

export const CompactBrowsersCard = forwardRef<HTMLDivElement, CompactBrowsersCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Browsers",
      browsers,
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
          <div className="flex items-center justify-between gap-x-4 px-4 py-3">
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Horizontal Stack */}
        <div className="px-4 pb-4">
          <div className="flex h-3 rounded-full overflow-hidden bg-muted">
            {browsers.map((browser, index) => (
              <div
                key={browser.id}
                className={cn(
                  "h-full transition-all",
                  index > 0 && "border-l border-background"
                )}
                style={{
                  width: `${browser.percentage}%`,
                  backgroundColor: browser.color || `hsl(var(--chart-${(index % 5) + 1}))`,
                }}
                title={`${browser.name}: ${browser.percentage}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {browsers.map((browser, index) => (
              <div key={browser.id} className="flex items-center gap-x-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{
                    backgroundColor: browser.color || `hsl(var(--chart-${(index % 5) + 1}))`,
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {browser.name}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {browser.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
CompactBrowsersCard.displayName = "CompactBrowsersCard";
