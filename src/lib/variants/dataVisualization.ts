import { cva } from "class-variance-authority";

// Ranking badge styles for leaderboards and top lists
export const rankingBadgeStyles = {
  1: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", // Gold
  2: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300", // Silver
  3: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", // Bronze
  default: "bg-muted text-muted-foreground",
} as const;

export function getRankingBadgeStyle(rank: number): string {
  if (rank === 1) return rankingBadgeStyles[1];
  if (rank === 2) return rankingBadgeStyles[2];
  if (rank === 3) return rankingBadgeStyles[3];
  return rankingBadgeStyles.default;
}

export const dataCardVariants = cva("rounded-xl overflow-hidden", {
  variants: {
    variant: {
      default: "bg-card",
      bordered: "bg-card border border-border",
      elevated: "bg-card shadow-md",
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

export const statBlockVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-y-1 p-3",
      md: "gap-y-1.5 p-4",
      lg: "gap-y-2 p-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const dataListItemVariants = cva("flex items-center justify-between", {
  variants: {
    size: {
      sm: "py-2",
      md: "py-3",
      lg: "py-4",
    },
    bordered: {
      true: "border-b border-border last:border-b-0",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    bordered: true,
  },
});
