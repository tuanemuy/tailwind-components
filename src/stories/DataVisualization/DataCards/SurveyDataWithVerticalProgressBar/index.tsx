import type { ReactNode } from "react";

export interface ScaleOption {
  value: number;
  responseCount: number;
  percentage: number;
}

export interface SurveyDataWithVerticalProgressBarProps {
  icon?: ReactNode;
  question?: string;
  questionType?: string;
  totalResponses?: number;
  average?: number;
  options?: ScaleOption[];
  leftLabel?: string;
  rightLabel?: string;
}

const StarIcon = () => (
  <svg
    className="shrink-0 size-4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

const defaultOptions: ScaleOption[] = [
  { value: 1, responseCount: 0, percentage: 0 },
  { value: 2, responseCount: 24, percentage: 72 },
  { value: 3, responseCount: 4, percentage: 30 },
  { value: 4, responseCount: 17, percentage: 52 },
  { value: 5, responseCount: 2, percentage: 17 },
];

export const SurveyDataWithVerticalProgressBar = ({
  icon = <StarIcon />,
  question = "How easy or difficult do you find setting up a modern web project from scratch?",
  questionType = "Opinion scale",
  totalResponses = 50,
  average = 3.75,
  options = defaultOptions,
  leftLabel = "Difficult",
  rightLabel = "Easy",
}: SurveyDataWithVerticalProgressBarProps) => {
  return (
    <div className="p-5 flex flex-col justify-between bg-card border border-border shadow-xs rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex gap-3">
        <div className="mt-0.5 flex shrink-0 justify-center items-center size-8 bg-muted text-card-foreground rounded-md">
          {icon}
        </div>

        <div className="grow">
          <h2 className="font-medium text-sm sm:text-base text-card-foreground">
            {question}
          </h2>

          {/* List */}
          <ul className="flex flex-wrap items-center whitespace-nowrap gap-1.5">
            <li className="inline-flex items-center relative text-xs text-muted-foreground pe-2 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-muted-foreground/60 after:rounded-full after:-translate-y-1/2">
              <p className="text-xs text-muted-foreground">{questionType}</p>
            </li>
            <li className="inline-flex items-center relative text-xs text-muted-foreground pe-2 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-muted-foreground/60 after:rounded-full after:-translate-y-1/2">
              <p className="text-xs text-muted-foreground">
                {totalResponses} responses
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Body */}
      <div className="mt-5">
        <div className="mb-5 flex justify-center">
          <span className="py-1 px-2.5 inline-flex items-center bg-accent text-accent-foreground text-start text-[13px] rounded-full">
            Avg. {average.toFixed(2)}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-5">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center"
            >
              <div className="mb-2">
                <span className="block text-xs text-muted-foreground">
                  {option.responseCount}
                </span>
                <span className="block text-xs text-muted-foreground">
                  resp.
                </span>
              </div>
              <div className="relative w-full sm:w-2/3">
                <div className="absolute size-full">
                  <div className="size-full inline-flex justify-center items-center">
                    <span className="py-0.5 px-1.5 inline-block font-semibold text-xs bg-card text-card-foreground rounded-full">
                      {option.percentage}%
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-col flex-nowrap justify-end w-full h-60 bg-muted rounded-md inset-shadow-sm overflow-hidden"
                  role="progressbar"
                  aria-valuenow={option.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="overflow-hidden bg-chart-4"
                    style={{ height: `${option.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-card-foreground">
                  {option.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{leftLabel}</span>
        <span className="text-xs text-muted-foreground">{rightLabel}</span>
      </div>
    </div>
  );
};
