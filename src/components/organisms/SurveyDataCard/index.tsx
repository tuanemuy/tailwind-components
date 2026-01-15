import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";
import { Badge } from "@/components/atoms";
import type { VariantProps } from "class-variance-authority";

// ============================================
// Types
// ============================================

export interface SurveyOption {
  id: string;
  label: string;
  votes: number;
  percentage?: number;
  color?: string;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  options: SurveyOption[];
  totalResponses?: number;
}

// ============================================
// SurveyDataCard
// ============================================

export interface SurveyDataCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  question: string;
  options: SurveyOption[];
  totalResponses?: number;
  showPercentage?: boolean;
  showVotes?: boolean;
  orientation?: "vertical" | "horizontal";
  action?: React.ReactNode;
}

export const SurveyDataCard = forwardRef<HTMLDivElement, SurveyDataCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      question,
      options,
      totalResponses,
      showPercentage = true,
      showVotes = true,
      orientation = "vertical",
      action,
      ...props
    },
    ref,
  ) => {
    const total = totalResponses ?? options.reduce((sum, opt) => sum + opt.votes, 0);

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

        {/* Question */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-sm font-medium text-foreground">{question}</p>
          {totalResponses !== undefined && (
            <p className="mt-1 text-xs text-muted-foreground">
              {total.toLocaleString()} responses
            </p>
          )}
        </div>

        {/* Options */}
        {orientation === "vertical" ? (
          <div className="px-4 pb-4 space-y-3">
            {options.map((option, index) => {
              const percentage = option.percentage ?? (option.votes / total) * 100;
              const barColor = option.color || `hsl(var(--chart-${(index % 5) + 1}))`;

              return (
                <div key={option.id}>
                  <div className="flex items-center justify-between gap-x-2 mb-1.5">
                    <span className="text-sm text-foreground truncate">
                      {option.label}
                    </span>
                    <div className="flex items-center gap-x-2 shrink-0">
                      {showVotes && (
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {option.votes.toLocaleString()}
                        </span>
                      )}
                      {showPercentage && (
                        <span className="text-sm font-medium text-foreground tabular-nums w-12 text-right">
                          {Math.round(percentage)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
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
        ) : (
          <div className="px-4 pb-4">
            {/* Horizontal Stacked Bar */}
            <div className="h-8 rounded-full overflow-hidden flex bg-muted">
              {options.map((option, index) => {
                const percentage = option.percentage ?? (option.votes / total) * 100;
                const barColor = option.color || `hsl(var(--chart-${(index % 5) + 1}))`;

                return (
                  <div
                    key={option.id}
                    className="h-full flex items-center justify-center text-xs font-medium text-white transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                    }}
                  >
                    {percentage >= 10 && `${Math.round(percentage)}%`}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {options.map((option, index) => {
                const percentage = option.percentage ?? (option.votes / total) * 100;
                const barColor = option.color || `hsl(var(--chart-${(index % 5) + 1}))`;

                return (
                  <div key={option.id} className="flex items-center gap-x-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: barColor }}
                    />
                    <span className="text-xs text-muted-foreground truncate">
                      {option.label}
                    </span>
                    <span className="text-xs font-medium text-foreground ml-auto tabular-nums">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);
SurveyDataCard.displayName = "SurveyDataCard";

// ============================================
// MultiQuestionSurveyCard - Multiple questions
// ============================================

export interface MultiQuestionSurveyCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  questions: SurveyQuestion[];
  action?: React.ReactNode;
}

export const MultiQuestionSurveyCard = forwardRef<HTMLDivElement, MultiQuestionSurveyCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      questions,
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

        {/* Questions */}
        <div className="divide-y divide-border">
          {questions.map((q, qIndex) => {
            const total = q.totalResponses ?? q.options.reduce((sum, opt) => sum + opt.votes, 0);

            return (
              <div key={q.id} className="p-4">
                <p className="text-sm font-medium text-foreground mb-3">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => {
                    const percentage = option.percentage ?? (option.votes / total) * 100;
                    const barColor = option.color || `hsl(var(--chart-${((qIndex + oIndex) % 5) + 1}))`;

                    return (
                      <div key={option.id} className="flex items-center gap-x-3">
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: barColor }}
                        />
                        <span className="text-sm text-muted-foreground flex-1 truncate">
                          {option.label}
                        </span>
                        <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: barColor,
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground w-10 text-right tabular-nums">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
MultiQuestionSurveyCard.displayName = "MultiQuestionSurveyCard";

// ============================================
// NPSSurveyCard - Net Promoter Score display
// ============================================

export interface NPSSurveyCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  score: number;
  detractors: number;
  passives: number;
  promoters: number;
  totalResponses?: number;
  action?: React.ReactNode;
}

export const NPSSurveyCard = forwardRef<HTMLDivElement, NPSSurveyCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Net Promoter Score",
      score,
      detractors,
      passives,
      promoters,
      totalResponses,
      action,
      ...props
    },
    ref,
  ) => {
    const total = totalResponses ?? (detractors + passives + promoters);
    const detractorsPerc = (detractors / total) * 100;
    const passivesPerc = (passives / total) * 100;
    const promotersPerc = (promoters / total) * 100;

    const getScoreColor = (s: number) => {
      if (s >= 50) return "text-success";
      if (s >= 0) return "text-warning";
      return "text-error";
    };

    const getScoreLabel = (s: number) => {
      if (s >= 50) return "Excellent";
      if (s >= 30) return "Great";
      if (s >= 0) return "Good";
      return "Needs Improvement";
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

        {/* Score */}
        <div className="p-4 text-center">
          <div className={cn("text-5xl font-bold tabular-nums", getScoreColor(score))}>
            {score > 0 ? "+" : ""}{score}
          </div>
          <Badge
            variant={score >= 50 ? "success" : score >= 0 ? "warning" : "destructive"}
            className="mt-2"
          >
            {getScoreLabel(score)}
          </Badge>
          {totalResponses !== undefined && (
            <p className="mt-2 text-xs text-muted-foreground">
              Based on {total.toLocaleString()} responses
            </p>
          )}
        </div>

        {/* Breakdown */}
        <div className="px-4 pb-4">
          <div className="h-3 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-error"
              style={{ width: `${detractorsPerc}%` }}
              title={`Detractors: ${Math.round(detractorsPerc)}%`}
            />
            <div
              className="h-full bg-warning"
              style={{ width: `${passivesPerc}%` }}
              title={`Passives: ${Math.round(passivesPerc)}%`}
            />
            <div
              className="h-full bg-success"
              style={{ width: `${promotersPerc}%` }}
              title={`Promoters: ${Math.round(promotersPerc)}%`}
            />
          </div>

          {/* Legend */}
          <div className="mt-3 flex justify-between text-xs">
            <div className="flex items-center gap-x-1">
              <span className="size-2 rounded-full bg-error" />
              <span className="text-muted-foreground">Detractors</span>
              <span className="font-medium text-foreground ml-1">
                {Math.round(detractorsPerc)}%
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="size-2 rounded-full bg-warning" />
              <span className="text-muted-foreground">Passives</span>
              <span className="font-medium text-foreground ml-1">
                {Math.round(passivesPerc)}%
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="size-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Promoters</span>
              <span className="font-medium text-foreground ml-1">
                {Math.round(promotersPerc)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
NPSSurveyCard.displayName = "NPSSurveyCard";
