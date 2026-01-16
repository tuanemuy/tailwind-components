import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Badge, ProgressBar } from "@/components/atoms";
import { TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  dataCardVariants,
  getRankingBadgeStyle,
} from "@/lib/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface CountryData {
  id: string;
  name: string;
  code: string;
  flag?: string;
  value: number;
  percentage?: number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  color?: string;
}

// ============================================
// TopCountriesCard
// ============================================

export interface TopCountriesCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  countries: CountryData[];
  showFlag?: boolean;
  showPercentage?: boolean;
  showProgress?: boolean;
  limit?: number;
  valueLabel?: string;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const TopCountriesCard = forwardRef<
  HTMLDivElement,
  TopCountriesCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Top Countries",
      subtitle,
      countries,
      showFlag = true,
      showPercentage = true,
      showProgress = true,
      limit = 5,
      valueLabel,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const displayCountries = countries.slice(0, limit);
    const total = countries.reduce((sum, c) => sum + c.value, 0);
    const maxValue = Math.max(...displayCountries.map((c) => c.value));

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

        {/* Countries List */}
        <div className="divide-y divide-border">
          {displayCountries.map((country, index) => {
            const percentage =
              country.percentage ?? (country.value / total) * 100;
            const progressWidth = (country.value / maxValue) * 100;
            const barColor =
              country.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={country.id} className="px-4 py-3">
                <div className="flex items-center gap-x-3">
                  {/* Rank */}
                  <span
                    className={cn(
                      "size-5 shrink-0 flex items-center justify-center rounded text-xs font-semibold",
                      getRankingBadgeStyle(index + 1),
                    )}
                  >
                    {index + 1}
                  </span>

                  {/* Flag */}
                  {showFlag &&
                    (country.flag ? (
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="size-5 rounded object-cover shrink-0"
                      />
                    ) : (
                      <span className="text-lg shrink-0">
                        {getFlagEmoji(country.code)}
                      </span>
                    ))}

                  {/* Country Name */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate block">
                      {country.name}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase">
                      {country.code}
                    </span>
                  </div>

                  {/* Value & Trend */}
                  <div className="flex items-center gap-x-2 shrink-0">
                    {country.trend && (
                      <TrendIndicator
                        value={country.trend.value}
                        direction={country.trend.direction}
                        variant={country.trend.variant}
                        size="xs"
                      />
                    )}
                    <div className="text-right">
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        {formatValue(country.value)}
                      </span>
                      {valueLabel && (
                        <p className="text-xs text-muted-foreground">
                          {valueLabel}
                        </p>
                      )}
                    </div>
                    {showPercentage && (
                      <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                        {Math.round(percentage)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {showProgress && (
                  <div className="mt-2 ml-8">
                    <ProgressBar
                      value={progressWidth}
                      size="sm"
                      color={barColor}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {countries.length > limit && (
          <div className="border-t border-border px-4 py-2 text-center">
            <span className="text-xs text-muted-foreground">
              +{countries.length - limit} more countries
            </span>
          </div>
        )}
      </div>
    );
  },
);
TopCountriesCard.displayName = "TopCountriesCard";

// Helper function to get flag emoji from country code
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// ============================================
// CountryMapCard - Map-style country display
// ============================================

export interface CountryMapCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  countries: CountryData[];
  total?: number;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const CountryMapCard = forwardRef<HTMLDivElement, CountryMapCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Geographic Distribution",
      countries,
      total,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const calculatedTotal =
      total ?? countries.reduce((sum, c) => sum + c.value, 0);

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

        {/* Map Placeholder */}
        <div className="p-4">
          <div className="aspect-[16/9] rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Map visualization</span>
          </div>
        </div>

        {/* Legend */}
        <div className="border-t border-border px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            {countries.slice(0, 6).map((country, index) => {
              const percentage =
                country.percentage ?? (country.value / calculatedTotal) * 100;
              const barColor =
                country.color || `hsl(var(--chart-${(index % 5) + 1}))`;

              return (
                <div key={country.id} className="flex items-center gap-x-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: barColor }}
                  />
                  <span className="text-xs text-muted-foreground truncate flex-1">
                    {country.name}
                  </span>
                  <span className="text-xs font-medium text-foreground tabular-nums">
                    {Math.round(percentage)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
CountryMapCard.displayName = "CountryMapCard";

// ============================================
// RegionBreakdownCard - Region-based breakdown
// ============================================

export interface RegionData {
  id: string;
  name: string;
  countries: CountryData[];
  totalValue?: number;
}

export interface RegionBreakdownCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  regions: RegionData[];
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const RegionBreakdownCard = forwardRef<
  HTMLDivElement,
  RegionBreakdownCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Regional Breakdown",
      regions,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const grandTotal = regions.reduce(
      (sum, region) =>
        sum +
        (region.totalValue ??
          region.countries.reduce((s, c) => s + c.value, 0)),
      0,
    );

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

        {/* Regions */}
        {regions.map((region, regionIndex) => {
          const regionTotal =
            region.totalValue ??
            region.countries.reduce((s, c) => s + c.value, 0);
          const regionPercentage = (regionTotal / grandTotal) * 100;
          const regionColor = `hsl(var(--chart-${(regionIndex % 5) + 1}))`;

          return (
            <div key={region.id}>
              {/* Region Header */}
              <div className="flex items-center justify-between gap-x-4 bg-muted/50 px-4 py-2">
                <div className="flex items-center gap-x-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: regionColor }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {region.name}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {formatValue(regionTotal)}
                  </span>
                  <Badge variant="secondary" size="sm">
                    {Math.round(regionPercentage)}%
                  </Badge>
                </div>
              </div>

              {/* Region Countries */}
              <div className="divide-y divide-border">
                {region.countries.slice(0, 3).map((country) => (
                  <div
                    key={country.id}
                    className="flex items-center justify-between gap-x-3 px-4 py-2 pl-8"
                  >
                    <div className="flex items-center gap-x-2 min-w-0">
                      <span className="text-base shrink-0">
                        {getFlagEmoji(country.code)}
                      </span>
                      <span className="text-sm text-muted-foreground truncate">
                        {country.name}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {formatValue(country.value)}
                    </span>
                  </div>
                ))}
                {region.countries.length > 3 && (
                  <div className="px-4 py-1.5 pl-8">
                    <span className="text-xs text-muted-foreground">
                      +{region.countries.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
RegionBreakdownCard.displayName = "RegionBreakdownCard";
