"use client";

import { type ReactNode, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import {
  BarChartIcon,
  CalendarIcon,
  ChevronDownIcon,
  DownloadIcon,
  GlobeIcon,
  MailIcon,
  RefreshIcon,
  SettingsIcon,
  TicketIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================

export interface ReportMetric {
  id: string;
  name: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  unit?: string;
  icon?: ReactNode;
}

export interface ReportCategory {
  id: string;
  name: string;
  icon?: ReactNode;
  isActive?: boolean;
  count?: number;
}

export interface ReportFilter {
  id: string;
  name: string;
  type: "date" | "select" | "checkbox";
  value?: string;
  options?: { label: string; value: string }[];
}

export interface ReportChartData {
  id: string;
  title: string;
  type: "line" | "bar" | "pie" | "donut";
  data: { label: string; value: number; color?: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  metrics?: {
    resolved?: number;
    responseTime?: string;
    satisfaction?: number;
  };
}

// ============================================
// ReportsLayout Component
// ============================================

export interface ReportsLayoutProps {
  title?: string;
  metrics?: ReportMetric[];
  categories?: ReportCategory[];
  activeCategory?: string;
  dateRange?: string;
  lastUpdated?: string;
  teamMembers?: TeamMember[];
  charts?: ReportChartData[];
  isLoading?: boolean;
  onCategoryChange?: (id: string) => void;
  onDateRangeChange?: (range: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  header?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const ReportsLayout = ({
  title = "Reports",
  metrics = [],
  categories,
  activeCategory = "overview",
  dateRange = "Last 30 days",
  lastUpdated,
  teamMembers = [],
  charts = [],
  isLoading = false,
  onCategoryChange,
  onDateRangeChange,
  onRefresh,
  onExport,
  header,
  sidebar,
  children,
  className,
}: ReportsLayoutProps) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  const defaultCategories: ReportCategory[] = categories || [
    {
      id: "overview",
      name: "Overview",
      icon: <BarChartIcon className="size-4" />,
      isActive: selectedCategory === "overview",
    },
    {
      id: "inbox",
      name: "Inbox",
      icon: <MailIcon className="size-4" />,
      isActive: selectedCategory === "inbox",
    },
    {
      id: "tickets",
      name: "Tickets",
      icon: <TicketIcon className="size-4" />,
      isActive: selectedCategory === "tickets",
    },
    {
      id: "visitors",
      name: "Visitors",
      icon: <GlobeIcon className="size-4" />,
      isActive: selectedCategory === "visitors",
    },
    {
      id: "team",
      name: "Team",
      icon: <UsersIcon className="size-4" />,
      isActive: selectedCategory === "team",
    },
  ];

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    onCategoryChange?.(id);
  };

  return (
    <div className={cn("flex h-full bg-background", className)}>
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card shrink-0">
        {sidebar || (
          <ReportsSidebar
            categories={defaultCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        {header || (
          <ReportsHeader
            title={title}
            dateRange={dateRange}
            lastUpdated={lastUpdated}
            isLoading={isLoading}
            onDateRangeChange={onDateRangeChange}
            onRefresh={onRefresh}
            onExport={onExport}
          />
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children || (
            <div className="space-y-6">
              {/* Metrics Grid */}
              {metrics.length > 0 && (
                <MetricsGrid metrics={metrics} isLoading={isLoading} />
              )}

              {/* Charts */}
              {charts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {charts.map((chart) => (
                    <ChartCard
                      key={chart.id}
                      chart={chart}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              )}

              {/* Team Performance */}
              {selectedCategory === "team" && teamMembers.length > 0 && (
                <TeamPerformanceTable
                  members={teamMembers}
                  isLoading={isLoading}
                />
              )}

              {/* Empty State */}
              {metrics.length === 0 && charts.length === 0 && !children && (
                <EmptyReportsState />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// ReportsSidebar Component
// ============================================

interface ReportsSidebarProps {
  categories: ReportCategory[];
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
}

const ReportsSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: ReportsSidebarProps) => (
  <div className="h-full flex flex-col">
    {/* Header */}
    <div className="p-4 border-b border-border">
      <h2 className="text-lg font-semibold">Reports</h2>
      <p className="text-sm text-muted-foreground">Analytics & Insights</p>
    </div>

    {/* Navigation */}
    <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
      {categories.map((category) => (
        <button
          type="button"
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "w-full flex items-center gap-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted",
          )}
        >
          {category.icon}
          <span className="flex-1 text-left">{category.name}</span>
          {category.count !== undefined && (
            <Badge variant="secondary" size="sm">
              {category.count}
            </Badge>
          )}
        </button>
      ))}
    </nav>

    {/* Footer */}
    <div className="p-4 border-t border-border">
      <Button variant="outline" size="sm" className="w-full">
        <SettingsIcon className="size-4 mr-2" />
        Settings
      </Button>
    </div>
  </div>
);

// ============================================
// ReportsHeader Component
// ============================================

interface ReportsHeaderProps {
  title: string;
  dateRange: string;
  lastUpdated?: string;
  isLoading: boolean;
  onDateRangeChange?: (range: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
}

const ReportsHeader = ({
  title,
  dateRange,
  lastUpdated,
  isLoading,
  onDateRangeChange: _onDateRangeChange,
  onRefresh,
  onExport,
}: ReportsHeaderProps) => (
  <div className="border-b border-border bg-card px-4 md:px-6 py-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {lastUpdated && (
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>

      <div className="flex items-center gap-x-2">
        {/* Date Range Selector */}
        <Button variant="outline" size="sm" className="gap-x-2">
          <CalendarIcon className="size-4" />
          {dateRange}
          <ChevronDownIcon className="size-4" />
        </Button>

        {/* Refresh */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshIcon className={cn("size-4", isLoading && "animate-spin")} />
        </Button>

        {/* Export */}
        <Button variant="outline" size="sm" onClick={onExport}>
          <DownloadIcon className="size-4" />
          <span className="hidden sm:inline ml-2">Export</span>
        </Button>
      </div>
    </div>
  </div>
);

// ============================================
// MetricsGrid Component
// ============================================

interface MetricsGridProps {
  metrics: ReportMetric[];
  isLoading: boolean;
}

const MetricsGrid = ({ metrics, isLoading }: MetricsGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {metrics.map((metric) => (
      <MetricCard key={metric.id} metric={metric} isLoading={isLoading} />
    ))}
  </div>
);

// ============================================
// MetricCard Component
// ============================================

interface MetricCardProps {
  metric: ReportMetric;
  isLoading: boolean;
}

const MetricCard = ({ metric, isLoading }: MetricCardProps) => (
  <div className="bg-card border border-border rounded-lg p-4">
    {isLoading ? (
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-1/2 bg-muted rounded" />
        <div className="h-8 w-3/4 bg-muted rounded" />
        <div className="h-3 w-1/3 bg-muted rounded" />
      </div>
    ) : (
      <>
        <div className="flex items-center gap-x-2 mb-2">
          {metric.icon && (
            <span className="text-muted-foreground">{metric.icon}</span>
          )}
          <span className="text-sm text-muted-foreground">{metric.name}</span>
        </div>
        <p className="text-2xl font-bold">
          {metric.value}
          {metric.unit && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {metric.unit}
            </span>
          )}
        </p>
        {metric.change !== undefined && (
          <div className="flex items-center gap-x-1 mt-2">
            {metric.changeType === "increase" ? (
              <TrendingUpIcon className="size-4 text-green-500" />
            ) : metric.changeType === "decrease" ? (
              <TrendingDownIcon className="size-4 text-red-500" />
            ) : null}
            <span
              className={cn(
                "text-sm",
                metric.changeType === "increase" && "text-green-500",
                metric.changeType === "decrease" && "text-red-500",
                metric.changeType === "neutral" && "text-muted-foreground",
              )}
            >
              {metric.change > 0 ? "+" : ""}
              {metric.change}%
            </span>
            <span className="text-sm text-muted-foreground">vs previous</span>
          </div>
        )}
      </>
    )}
  </div>
);

// ============================================
// ChartCard Component
// ============================================

interface ChartCardProps {
  chart: ReportChartData;
  isLoading: boolean;
}

const ChartCard = ({ chart, isLoading }: ChartCardProps) => (
  <div className="bg-card border border-border rounded-lg p-4">
    <h3 className="text-sm font-medium mb-4">{chart.title}</h3>
    {isLoading ? (
      <div className="animate-pulse h-48 bg-muted rounded" />
    ) : (
      <div className="h-48">
        {/* Simple bar chart visualization */}
        {chart.type === "bar" && (
          <div className="flex items-end justify-around h-full gap-2">
            {chart.data.map((item) => {
              const maxValue = Math.max(...chart.data.map((d) => d.value));
              const height = (item.value / maxValue) * 100;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-y-2 flex-1"
                >
                  <div
                    className={cn(
                      "w-full rounded-t transition-all",
                      item.color || "bg-primary",
                    )}
                    style={{
                      height: `${height}%`,
                      backgroundColor: item.color,
                    }}
                  />
                  <span className="text-xs text-muted-foreground truncate max-w-full">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Simple donut chart placeholder */}
        {(chart.type === "pie" || chart.type === "donut") && (
          <div className="flex items-center justify-center h-full">
            <div className="relative size-32">
              <div className="absolute inset-0 rounded-full border-8 border-primary" />
              {chart.type === "donut" && (
                <div className="absolute inset-4 rounded-full bg-card" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">
                  {chart.data.reduce((acc, d) => acc + d.value, 0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Line chart placeholder */}
        {chart.type === "line" && (
          <div className="flex items-end justify-around h-full gap-1 border-b border-l border-border">
            {chart.data.map((item) => {
              const maxValue = Math.max(...chart.data.map((d) => d.value));
              const height = (item.value / maxValue) * 100;
              return (
                <div
                  key={item.label}
                  className="flex-1 flex items-end justify-center"
                  style={{ height: "100%" }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-primary"
                    style={{ marginBottom: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    )}
  </div>
);

// ============================================
// TeamPerformanceTable Component
// ============================================

interface TeamPerformanceTableProps {
  members: TeamMember[];
  isLoading: boolean;
}

const TeamPerformanceTable = ({
  members,
  isLoading,
}: TeamPerformanceTableProps) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden">
    <div className="p-4 border-b border-border">
      <h3 className="font-medium">Team Performance</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left text-sm font-medium text-muted-foreground p-4">
              Team Member
            </th>
            <th className="text-left text-sm font-medium text-muted-foreground p-4">
              Resolved
            </th>
            <th className="text-left text-sm font-medium text-muted-foreground p-4">
              Response Time
            </th>
            <th className="text-left text-sm font-medium text-muted-foreground p-4">
              Satisfaction
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <tr
                  // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton rows are positional placeholders
                  key={`skeleton-${i}`}
                  className="border-b border-border"
                >
                  <td className="p-4">
                    <div className="animate-pulse flex items-center gap-x-3">
                      <div className="size-8 rounded-full bg-muted" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="animate-pulse h-4 w-12 bg-muted rounded" />
                  </td>
                  <td className="p-4">
                    <div className="animate-pulse h-4 w-16 bg-muted rounded" />
                  </td>
                  <td className="p-4">
                    <div className="animate-pulse h-4 w-20 bg-muted rounded" />
                  </td>
                </tr>
              ))
            : members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-x-3">
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        fallback={member.name.charAt(0)}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">
                      {member.metrics?.resolved || 0}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground">
                      {member.metrics?.responseTime || "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-x-2">
                      <ProgressBar
                        value={member.metrics?.satisfaction || 0}
                        max={100}
                        size="sm"
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        {member.metrics?.satisfaction || 0}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================
// EmptyReportsState Component
// ============================================

const EmptyReportsState = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <div className="size-16 flex items-center justify-center bg-muted rounded-full mb-4">
      <BarChartIcon className="size-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-1">No reports available</h3>
    <p className="text-sm text-muted-foreground max-w-sm">
      Start collecting data to see your reports and analytics here.
    </p>
  </div>
);

// ============================================
// QuickStatsCard Component (for Overview)
// ============================================

export interface QuickStatsCardProps {
  title: string;
  stats: { label: string; value: string | number; color?: string }[];
  className?: string;
}

export const QuickStatsCard = ({
  title,
  stats,
  className,
}: QuickStatsCardProps) => (
  <div className={cn("bg-card border border-border rounded-lg p-4", className)}>
    <h3 className="text-sm font-medium mb-4">{title}</h3>
    <div className="space-y-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{stat.label}</span>
          <span
            className="font-medium"
            style={stat.color ? { color: stat.color } : undefined}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);
