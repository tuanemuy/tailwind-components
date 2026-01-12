import type { ReactNode } from "react";

export interface DetailItem {
  label: string;
  value: string;
}

export interface ProjectReportCard {
  label: string;
  value: string;
  details?: DetailItem[];
  footerText?: string;
  actionButton?: ReactNode;
}

export interface ProjectReportsProps {
  cards?: ProjectReportCard[];
}

const defaultCards: ProjectReportCard[] = [
  {
    label: "Total hours",
    value: "93.00",
    details: [
      { label: "Billable:", value: "91.00" },
      { label: "Non-billable:", value: "2.00" },
    ],
  },
  {
    label: "Budget remaining (5%)",
    value: "$7,658.24",
    details: [{ label: "Total budget:", value: "$105,545.00" }],
  },
  {
    label: "Internal costs",
    value: "$28,490.00",
    details: [
      { label: "Time:", value: "$28,490.00" },
      { label: "Expenses:", value: "0.00" },
    ],
  },
  {
    label: "Uninvoiced amount",
    value: "$29,501.00",
    footerText: "3 out of 5 tasks had product costs.",
    actionButton: (
      <button
        type="button"
        className="text-[13px] text-primary hover:decoration-2 underline underline-offset-4 focus:outline-hidden focus:decoration-2"
      >
        Create invoice
      </button>
    ),
  },
];

export const ProjectReports = ({
  cards = defaultCards,
}: ProjectReportsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-5 flex flex-col bg-card border border-border shadow-xs rounded-xl"
        >
          <div>
            <h2 className="text-sm text-muted-foreground">{card.label}</h2>
            <span className="block font-semibold text-xl text-foreground">
              {card.value}
            </span>
          </div>

          {card.details && card.details.length > 0 && (
            <div className="mt-3 flex flex-col gap-y-0.5">
              {card.details.map((detail, detailIndex) => (
                <div
                  key={detailIndex}
                  className="flex flex-wrap justify-between items-center gap-3"
                >
                  <span className="text-[13px] text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="font-medium text-sm text-foreground">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {(card.footerText || card.actionButton) && (
            <div className="mt-auto pt-2">
              {card.footerText && (
                <div className="mb-1">
                  <p className="text-[13px] leading-2 text-muted-foreground">
                    {card.footerText}
                  </p>
                </div>
              )}
              {card.actionButton}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
