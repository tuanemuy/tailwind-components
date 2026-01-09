import type { ReactNode } from "react";

export interface SurveyOption {
  label: string;
  percentage: number;
  responseCount: number;
}

export interface SurveyDataWithProgressProps {
  icon?: ReactNode;
  question?: string;
  questionType?: string;
  totalResponses?: number;
  options?: SurveyOption[];
}

const ChecklistIcon = () => (
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
    <rect x="3" y="5" width="6" height="6" rx="1" />
    <path d="m3 17 2 2 4-4" />
    <path d="M13 6h8" />
    <path d="M13 12h8" />
    <path d="M13 18h8" />
  </svg>
);

const defaultOptions: SurveyOption[] = [
  { label: "React", percentage: 48, responseCount: 25 },
  { label: "Vue", percentage: 22, responseCount: 20 },
  { label: "Angular", percentage: 15, responseCount: 13 },
  { label: "Svelte", percentage: 8, responseCount: 7 },
  { label: "Others", percentage: 7, responseCount: 3 },
];

export const SurveyDataWithProgress = ({
  icon = <ChecklistIcon />,
  question = "What frontend framework do you primarily use?",
  questionType = "Multiple choice",
  totalResponses = 75,
  options = defaultOptions,
}: SurveyDataWithProgressProps) => {
  return (
    <div className="p-5 flex flex-col bg-card border border-border shadow-xs rounded-xl overflow-hidden">
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

      <div className="mt-5">
        {/* List of Horizontal Progress Group */}
        <div className="flex flex-col gap-y-3">
          {options.map((option, index) => (
            <div key={index}>
              {/* Header */}
              <div className="mb-2 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-sm text-card-foreground">
                    {option.percentage}%
                  </span>
                  <span className="text-sm text-card-foreground">
                    {" "}
                    - {option.label}
                  </span>
                </div>

                <span className="text-xs text-muted-foreground">
                  {option.responseCount} response
                  {option.responseCount !== 1 ? "s" : ""}
                </span>
              </div>

              <div
                className="flex w-full h-3 bg-muted rounded-sm overflow-hidden"
                role="progressbar"
                aria-valuenow={option.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="flex flex-col justify-center rounded-sm overflow-hidden bg-chart-4 text-xs text-white text-center whitespace-nowrap transition duration-500"
                  style={{ width: `${option.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
