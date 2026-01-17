import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Badge } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface TimeEntry {
  id: string;
  project: string;
  task?: string;
  hours: number;
  color?: string;
  status?: "completed" | "in-progress" | "pending";
}

export interface DailyTimesheet {
  date: string;
  dayLabel?: string;
  entries: TimeEntry[];
  totalHours?: number;
}

export interface WeeklyTimesheetData {
  week: string;
  days: DailyTimesheet[];
  totalHours: number;
}

// ============================================
// TimeSheetCard
// ============================================

export interface TimeSheetCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  entries: TimeEntry[];
  totalHours?: number;
  targetHours?: number;
  period?: string;
  showStatus?: boolean;
  action?: React.ReactNode;
  formatHours?: (hours: number) => string;
}

export const TimeSheetCard = forwardRef<HTMLDivElement, TimeSheetCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Time Tracking",
      subtitle,
      entries,
      totalHours,
      targetHours,
      period,
      showStatus = true,
      action,
      formatHours = (h) => `${h}h`,
      ...props
    },
    ref,
  ) => {
    const calculatedTotal =
      totalHours ?? entries.reduce((sum, e) => sum + e.hours, 0);
    const maxHours = Math.max(...entries.map((e) => e.hours));

    const getStatusBadge = (status?: string) => {
      switch (status) {
        case "completed":
          return (
            <Badge variant="success" size="sm">
              Completed
            </Badge>
          );
        case "in-progress":
          return (
            <Badge variant="warning" size="sm">
              In Progress
            </Badge>
          );
        case "pending":
          return (
            <Badge variant="secondary" size="sm">
              Pending
            </Badge>
          );
        default:
          return null;
      }
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

        {/* Summary */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-end justify-between gap-x-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Hours</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {formatHours(calculatedTotal)}
              </p>
            </div>
            {targetHours && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Target</p>
                <p className="text-sm text-muted-foreground tabular-nums">
                  {formatHours(targetHours)}
                </p>
              </div>
            )}
          </div>
          {targetHours && (
            <div className="mt-3">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    calculatedTotal >= targetHours
                      ? "bg-success"
                      : "bg-primary",
                  )}
                  style={{
                    width: `${Math.min((calculatedTotal / targetHours) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground text-right">
                {Math.round((calculatedTotal / targetHours) * 100)}% of target
              </p>
            </div>
          )}
        </div>

        {/* Time Entries */}
        <div className="divide-y divide-border">
          {entries.map((entry, index) => {
            const barColor =
              entry.color || `hsl(var(--chart-${(index % 5) + 1}))`;
            const percentage = (entry.hours / maxHours) * 100;

            return (
              <div key={entry.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-x-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-x-2">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: barColor }}
                      />
                      <span className="text-sm font-medium text-foreground truncate">
                        {entry.project}
                      </span>
                    </div>
                    {entry.task && (
                      <p className="mt-0.5 ml-4 text-xs text-muted-foreground truncate">
                        {entry.task}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-x-2 shrink-0">
                    {showStatus && getStatusBadge(entry.status)}
                    <span className="text-sm font-medium text-foreground tabular-nums">
                      {formatHours(entry.hours)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 ml-4 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
TimeSheetCard.displayName = "TimeSheetCard";

// ============================================
// WeeklyTimeSheetCard - Weekly view
// ============================================

export interface WeeklyTimeSheetCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  weekData: WeeklyTimesheetData;
  targetHoursPerDay?: number;
  action?: React.ReactNode;
  formatHours?: (hours: number) => string;
}

export const WeeklyTimeSheetCard = forwardRef<
  HTMLDivElement,
  WeeklyTimeSheetCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Weekly Timesheet",
      weekData,
      targetHoursPerDay = 8,
      action,
      formatHours = (h) => `${h}h`,
      ...props
    },
    ref,
  ) => {
    const weeklyTarget = targetHoursPerDay * weekData.days.length;

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
              <p className="text-xs text-muted-foreground">{weekData.week}</p>
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Week Summary */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total This Week</p>
            <p className="text-xl font-bold text-foreground tabular-nums">
              {formatHours(weekData.totalHours)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="text-sm text-muted-foreground tabular-nums">
              {formatHours(weeklyTarget)}
            </p>
          </div>
        </div>

        {/* Daily Breakdown */}
        <div className="p-4">
          <div className="flex items-end justify-around gap-x-2 h-32">
            {weekData.days.map((day) => {
              const dayTotal =
                day.totalHours ??
                day.entries.reduce((sum, e) => sum + e.hours, 0);
              const heightPercent = (dayTotal / targetHoursPerDay) * 100;
              const isOverTarget = dayTotal > targetHoursPerDay;

              return (
                <div
                  key={day.date}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className="w-full max-w-8 rounded-t transition-all relative"
                    style={{
                      height: `${Math.min(heightPercent, 100)}%`,
                      minHeight: dayTotal > 0 ? "4px" : "0",
                    }}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 rounded-t",
                        isOverTarget ? "bg-success" : "bg-primary",
                      )}
                    />
                    {isOverTarget && (
                      <div
                        className="absolute -top-1 left-0 right-0 h-1 bg-success/50 rounded"
                        style={{ height: `${(heightPercent - 100) * 0.5}%` }}
                      />
                    )}
                  </div>
                  {/* Target line */}
                  <div className="w-full border-t-2 border-dashed border-muted-foreground/30" />
                </div>
              );
            })}
          </div>

          {/* Day Labels */}
          <div className="flex justify-around mt-2">
            {weekData.days.map((day) => {
              const dayTotal =
                day.totalHours ??
                day.entries.reduce((sum, e) => sum + e.hours, 0);

              return (
                <div
                  key={day.date}
                  className="flex flex-col items-center flex-1"
                >
                  <span className="text-xs font-medium text-foreground">
                    {day.dayLabel || day.date}
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {formatHours(dayTotal)}
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
WeeklyTimeSheetCard.displayName = "WeeklyTimeSheetCard";

// ============================================
// CompactTimesheetList - Minimal time list
// ============================================

export interface CompactTimesheetListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  entries: TimeEntry[];
  action?: React.ReactNode;
  formatHours?: (hours: number) => string;
}

export const CompactTimesheetList = forwardRef<
  HTMLDivElement,
  CompactTimesheetListProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      entries,
      action,
      formatHours = (h) => `${h}h`,
      ...props
    },
    ref,
  ) => {
    const total = entries.reduce((sum, e) => sum + e.hours, 0);

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

        {/* Entries */}
        <div className="divide-y divide-border">
          {entries.map((entry, index) => {
            const percentage = (entry.hours / total) * 100;
            const barColor =
              entry.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div
                key={entry.id}
                className="flex items-center gap-x-3 px-4 py-2.5"
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: barColor }}
                />
                <span className="text-sm text-foreground truncate flex-1">
                  {entry.project}
                </span>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {formatHours(entry.hours)}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                  {Math.round(percentage)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/30">
          <span className="text-sm font-medium text-foreground">Total</span>
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {formatHours(total)}
          </span>
        </div>
      </div>
    );
  },
);
CompactTimesheetList.displayName = "CompactTimesheetList";
