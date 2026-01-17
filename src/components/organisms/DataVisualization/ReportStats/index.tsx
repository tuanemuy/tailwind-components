import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Badge, ProgressBar } from "@/components/atoms";
import { TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";

// ============================================
// Common Types
// ============================================

export interface ReportMetric {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  icon?: React.ReactNode;
  description?: string;
}

export interface TimeSeriesData {
  label: string;
  value: number;
}

// ============================================
// ChatReportsStats - Chat/Messaging report statistics
// ============================================

export interface ChatReportData {
  totalConversations: number;
  resolvedConversations: number;
  avgResponseTime: string;
  satisfactionScore: number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface ChatReportsStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  data: ChatReportData;
  period?: string;
  action?: React.ReactNode;
}

export const ChatReportsStats = forwardRef<
  HTMLDivElement,
  ChatReportsStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Chat Reports",
      data,
      period,
      action,
      ...props
    },
    ref,
  ) => {
    const resolutionRate = Math.round(
      (data.resolvedConversations / data.totalConversations) * 100,
    );

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
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

        {/* Main Metric */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-xs text-muted-foreground">Total Conversations</p>
          <div className="flex items-end gap-x-2">
            <span className="text-3xl font-bold text-foreground tabular-nums">
              {data.totalConversations.toLocaleString()}
            </span>
            {data.trend && (
              <TrendIndicator
                value={data.trend.value}
                direction={data.trend.direction}
                variant={data.trend.variant}
                size="sm"
              />
            )}
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Resolved</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">
              {resolutionRate}%
            </p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Avg Response</p>
            <p className="text-lg font-semibold text-foreground">
              {data.avgResponseTime}
            </p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Satisfaction</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">
              {data.satisfactionScore}/5
            </p>
          </div>
        </div>
      </div>
    );
  },
);
ChatReportsStats.displayName = "ChatReportsStats";

// ============================================
// InboxContactsStats - Contact statistics
// ============================================

export interface InboxContactsData {
  totalContacts: number;
  newContacts: number;
  activeContacts: number;
  groups?: number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface InboxContactsStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  data: InboxContactsData;
  period?: string;
  action?: React.ReactNode;
}

export const InboxContactsStats = forwardRef<
  HTMLDivElement,
  InboxContactsStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Contacts Overview",
      data,
      period,
      action,
      ...props
    },
    ref,
  ) => {
    const activePercentage = Math.round(
      (data.activeContacts / data.totalContacts) * 100,
    );

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
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

        {/* Main Content */}
        <div className="p-4">
          {/* Total Contacts */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Contacts</p>
              <div className="flex items-end gap-x-2">
                <span className="text-2xl font-bold text-foreground tabular-nums">
                  {data.totalContacts.toLocaleString()}
                </span>
                {data.trend && (
                  <TrendIndicator
                    value={data.trend.value}
                    direction={data.trend.direction}
                    variant={data.trend.variant}
                    size="xs"
                  />
                )}
              </div>
            </div>
            {data.groups !== undefined && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Groups</p>
                <p className="text-lg font-semibold text-foreground tabular-nums">
                  {data.groups}
                </p>
              </div>
            )}
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">New contacts</span>
                <span className="font-medium text-foreground tabular-nums">
                  {data.newContacts.toLocaleString()}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Active contacts</span>
                <span className="font-medium text-foreground tabular-nums">
                  {data.activeContacts.toLocaleString()} ({activePercentage}%)
                </span>
              </div>
              <ProgressBar value={activePercentage} size="sm" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
InboxContactsStats.displayName = "InboxContactsStats";

// ============================================
// InboxReportsStats - Inbox/Email report statistics
// ============================================

export interface InboxReportsData {
  totalEmails: number;
  unreadEmails: number;
  sentEmails: number;
  avgReadTime?: string;
  openRate?: number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface InboxReportsStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  data: InboxReportsData;
  period?: string;
  action?: React.ReactNode;
}

export const InboxReportsStats = forwardRef<
  HTMLDivElement,
  InboxReportsStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Inbox Reports",
      data,
      period,
      action,
      ...props
    },
    ref,
  ) => {
    const readRate = Math.round(
      ((data.totalEmails - data.unreadEmails) / data.totalEmails) * 100,
    );

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
          <div className="p-4">
            <p className="text-xs text-muted-foreground">Total Received</p>
            <div className="flex items-end gap-x-2">
              <span className="text-xl font-bold text-foreground tabular-nums">
                {data.totalEmails.toLocaleString()}
              </span>
              {data.trend && (
                <TrendIndicator
                  value={data.trend.value}
                  direction={data.trend.direction}
                  variant={data.trend.variant}
                  size="xs"
                />
              )}
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground">Sent</p>
            <p className="text-xl font-bold text-foreground tabular-nums">
              {data.sentEmails.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Read Rate */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Read Rate</span>
            <span className="text-sm font-medium text-foreground">
              {readRate}%
            </span>
          </div>
          <ProgressBar value={readRate} size="md" variant="success" />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{data.unreadEmails.toLocaleString()} unread</span>
            {data.openRate !== undefined && (
              <span>Open rate: {data.openRate}%</span>
            )}
          </div>
        </div>
      </div>
    );
  },
);
InboxReportsStats.displayName = "InboxReportsStats";

// ============================================
// BrandSalesStats - Brand/Product sales statistics
// ============================================

export interface BrandSalesData {
  totalSales: number;
  revenue: number;
  avgOrderValue: number;
  topProduct?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  currency?: string;
}

export interface BrandSalesStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  data: BrandSalesData;
  period?: string;
  action?: React.ReactNode;
  formatAmount?: (amount: number) => string;
}

export const BrandSalesStats = forwardRef<HTMLDivElement, BrandSalesStatsProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Sales Overview",
      data,
      period,
      action,
      formatAmount,
      ...props
    },
    ref,
  ) => {
    const currency = data.currency || "$";
    const format =
      formatAmount ??
      ((amount: number) => `${currency}${amount.toLocaleString()}`);

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
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

        {/* Revenue */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <div className="flex items-end gap-x-2">
            <span className="text-3xl font-bold text-foreground tabular-nums">
              {format(data.revenue)}
            </span>
            {data.trend && (
              <TrendIndicator
                value={data.trend.value}
                direction={data.trend.direction}
                variant={data.trend.variant}
                size="sm"
              />
            )}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="p-4">
            <p className="text-xs text-muted-foreground">Total Sales</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">
              {data.totalSales.toLocaleString()}
            </p>
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground">Avg Order Value</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">
              {format(data.avgOrderValue)}
            </p>
          </div>
        </div>

        {/* Top Product */}
        {data.topProduct && (
          <div className="border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">Top Product</p>
            <p className="text-sm font-medium text-foreground truncate">
              {data.topProduct}
            </p>
          </div>
        )}
      </div>
    );
  },
);
BrandSalesStats.displayName = "BrandSalesStats";

// ============================================
// ProjectReportsStats - Project report statistics
// ============================================

export interface ProjectReportsData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onHoldProjects?: number;
  completionRate: number;
  avgDuration?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface ProjectReportsStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  data: ProjectReportsData;
  period?: string;
  action?: React.ReactNode;
}

export const ProjectReportsStats = forwardRef<
  HTMLDivElement,
  ProjectReportsStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Project Reports",
      data,
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
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
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

        {/* Main Metric */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-xs text-muted-foreground">Total Projects</p>
          <div className="flex items-end gap-x-2">
            <span className="text-3xl font-bold text-foreground tabular-nums">
              {data.totalProjects}
            </span>
            {data.trend && (
              <TrendIndicator
                value={data.trend.value}
                direction={data.trend.direction}
                variant={data.trend.variant}
                size="sm"
              />
            )}
          </div>
        </div>

        {/* Completion Rate */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Completion Rate
            </span>
            <span className="text-sm font-medium text-foreground">
              {data.completionRate}%
            </span>
          </div>
          <ProgressBar
            value={data.completionRate}
            size="md"
            variant={
              data.completionRate >= 80
                ? "success"
                : data.completionRate >= 50
                  ? "warning"
                  : "error"
            }
          />
        </div>

        {/* Status Breakdown */}
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="text-lg font-semibold text-primary tabular-nums">
              {data.activeProjects}
            </p>
          </div>
          <div className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-lg font-semibold text-success tabular-nums">
              {data.completedProjects}
            </p>
          </div>
          <div className="p-3 text-center">
            <p className="text-xs text-muted-foreground">On Hold</p>
            <p className="text-lg font-semibold text-warning tabular-nums">
              {data.onHoldProjects ?? 0}
            </p>
          </div>
        </div>

        {/* Average Duration */}
        {data.avgDuration && (
          <div className="border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">Average Duration</p>
            <p className="text-sm font-medium text-foreground">
              {data.avgDuration}
            </p>
          </div>
        )}
      </div>
    );
  },
);
ProjectReportsStats.displayName = "ProjectReportsStats";

// ============================================
// CompactReportStats - Compact report view
// ============================================

export interface CompactReportStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title: string;
  metrics: ReportMetric[];
  columns?: 2 | 3 | 4;
  action?: React.ReactNode;
}

export const CompactReportStats = forwardRef<
  HTMLDivElement,
  CompactReportStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      metrics,
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
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Metrics Grid */}
        <div
          className={cn("grid divide-x divide-border", columnClasses[columns])}
        >
          {metrics.map((metric) => (
            <div key={metric.id} className="p-4 text-center">
              {metric.icon && (
                <span className="text-muted-foreground mb-1 block">
                  {metric.icon}
                </span>
              )}
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <div className="flex items-center justify-center gap-x-1.5 mt-1">
                <span className="text-lg font-semibold text-foreground">
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
            </div>
          ))}
        </div>
      </div>
    );
  },
);
CompactReportStats.displayName = "CompactReportStats";
