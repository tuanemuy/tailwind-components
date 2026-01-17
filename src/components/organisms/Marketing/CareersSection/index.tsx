import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/atoms";
import {
  ChevronRightIcon,
  ClockIcon,
  DollarSignIcon,
  MapPinIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "remote";
  salary?: string;
  description?: string;
  requirements?: string[];
  posted?: string;
  href?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  icon?: ReactNode;
  positions: JobPosition[];
}

// CareersSection component
export interface CareersSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
};

export const CareersSection = forwardRef<HTMLElement, CareersSectionProps>(
  (
    {
      className,
      padding = "lg",
      backgroundColor = "default",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[backgroundColor],
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
CareersSection.displayName = "CareersSection";

// CareersSectionHeader component
export interface CareersSectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const CareersSectionHeader = forwardRef<
  HTMLDivElement,
  CareersSectionHeaderProps
>(({ className, align = "center", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-2xl text-left",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CareersSectionHeader.displayName = "CareersSectionHeader";

// CareersSectionTitle component
export interface CareersSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
}

export const CareersSectionTitle = forwardRef<
  HTMLHeadingElement,
  CareersSectionTitleProps
>(({ className, as: Component = "h2", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-3xl font-bold text-foreground md:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
CareersSectionTitle.displayName = "CareersSectionTitle";

// CareersSectionSubtitle component
export interface CareersSectionSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CareersSectionSubtitle = forwardRef<
  HTMLParagraphElement,
  CareersSectionSubtitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-4 text-lg text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});
CareersSectionSubtitle.displayName = "CareersSectionSubtitle";

// JobTypeLabel mapping
const jobTypeLabels: Record<JobPosition["type"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};

const jobTypeColors: Record<JobPosition["type"], string> = {
  "full-time":
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "part-time":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  contract:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  internship:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  remote: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

// JobCard component
export interface JobCardProps extends React.HTMLAttributes<HTMLDivElement> {
  job: JobPosition;
  variant?: "default" | "compact" | "detailed";
  onApply?: (job: JobPosition) => void;
}

export const JobCard = forwardRef<HTMLDivElement, JobCardProps>(
  ({ className, job, variant = "default", onApply, ...props }, ref) => {
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50",
            className,
          )}
          {...props}
        >
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground">{job.title}</h4>
            <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPinIcon className="size-3.5" />
                {job.location}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  jobTypeColors[job.type],
                )}
              >
                {jobTypeLabels[job.type]}
              </span>
            </div>
          </div>
          {job.href ? (
            <a
              href={job.href}
              className="ml-4 shrink-0 text-primary hover:underline"
            >
              <ChevronRightIcon className="size-5" />
            </a>
          ) : onApply ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onApply(job)}
              className="ml-4 shrink-0"
            >
              Apply
            </Button>
          ) : null}
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md",
            className,
          )}
          {...props}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.department}
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                jobTypeColors[job.type],
              )}
            >
              {jobTypeLabels[job.type]}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPinIcon className="size-4" />
              {job.location}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1.5">
                <DollarSignIcon className="size-4" />
                {job.salary}
              </span>
            )}
            {job.posted && (
              <span className="flex items-center gap-1.5">
                <ClockIcon className="size-4" />
                Posted {job.posted}
              </span>
            )}
          </div>

          {job.description && (
            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
              {job.description}
            </p>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground">
                Requirements:
              </p>
              <ul className="mt-2 space-y-1">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: Requirements are strings without unique IDs
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            {job.href ? (
              <Button as="a" href={job.href} variant="primary" size="sm">
                View Details
              </Button>
            ) : onApply ? (
              <Button variant="primary" size="sm" onClick={() => onApply(job)}>
                Apply Now
              </Button>
            ) : null}
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{job.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {job.department}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
              jobTypeColors[job.type],
            )}
          >
            {jobTypeLabels[job.type]}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="size-4" />
            {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1.5">
              <DollarSignIcon className="size-4" />
              {job.salary}
            </span>
          )}
        </div>

        {job.description && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          {job.posted && (
            <span className="text-xs text-muted-foreground">
              Posted {job.posted}
            </span>
          )}
          {job.href ? (
            <a
              href={job.href}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Apply Now
              <ChevronRightIcon className="ml-1 size-4" />
            </a>
          ) : onApply ? (
            <button
              type="button"
              onClick={() => onApply(job)}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Apply Now
              <ChevronRightIcon className="ml-1 size-4" />
            </button>
          ) : null}
        </div>
      </div>
    );
  },
);
JobCard.displayName = "JobCard";

// JobGrid component
export interface JobGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
  gap?: "sm" | "md" | "lg";
}

const gridColumnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

const gridGapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const JobGrid = forwardRef<HTMLDivElement, JobGridProps>(
  ({ className, columns = 2, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          gridColumnClasses[columns],
          gridGapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
JobGrid.displayName = "JobGrid";

// JobList component
export interface JobListProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const listGapClasses = {
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-6",
};

export const JobList = forwardRef<HTMLDivElement, JobListProps>(
  ({ className, gap = "md", children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(listGapClasses[gap], className)} {...props}>
        {children}
      </div>
    );
  },
);
JobList.displayName = "JobList";

// DepartmentGroup component
export interface DepartmentGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  department: Department;
  cardVariant?: JobCardProps["variant"];
  onApply?: (job: JobPosition) => void;
}

export const DepartmentGroup = forwardRef<HTMLDivElement, DepartmentGroupProps>(
  (
    { className, department, cardVariant = "default", onApply, ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        <div className="mb-6 flex items-center gap-3">
          {department.icon && (
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {department.icon}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {department.name}
            </h3>
            {department.description && (
              <p className="text-sm text-muted-foreground">
                {department.description}
              </p>
            )}
            <span className="text-xs text-muted-foreground">
              {department.positions.length} open position
              {department.positions.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <JobList>
          {department.positions.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              variant={cardVariant}
              onApply={onApply}
            />
          ))}
        </JobList>
      </div>
    );
  },
);
DepartmentGroup.displayName = "DepartmentGroup";

// DepartmentFilter component
export interface DepartmentFilterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  departments: string[];
  selectedDepartment?: string;
  onSelect?: (department: string | undefined) => void;
}

export const DepartmentFilter = forwardRef<
  HTMLDivElement,
  DepartmentFilterProps
>(({ className, departments, selectedDepartment, onSelect, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-wrap gap-2", className)} {...props}>
      <button
        type="button"
        onClick={() => onSelect?.(undefined)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
          selectedDepartment === undefined
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80",
        )}
      >
        All Departments
      </button>
      {departments.map((dept) => (
        <button
          type="button"
          key={dept}
          onClick={() => onSelect?.(dept)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            selectedDepartment === dept
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          {dept}
        </button>
      ))}
    </div>
  );
});
DepartmentFilter.displayName = "DepartmentFilter";

// CompleteCareersSection - pre-composed full section
export interface CompleteCareersSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  jobs: JobPosition[];
  cardVariant?: JobCardProps["variant"];
  columns?: JobGridProps["columns"];
  showDepartmentFilter?: boolean;
  onApply?: (job: JobPosition) => void;
}

export const CompleteCareersSection = forwardRef<
  HTMLElement,
  CompleteCareersSectionProps
>(
  (
    {
      className,
      title,
      subtitle,
      jobs,
      cardVariant = "default",
      columns = 2,
      showDepartmentFilter = false,
      onApply,
      ...props
    },
    ref,
  ) => {
    const departments = [...new Set(jobs.map((job) => job.department))];

    return (
      <CareersSection ref={ref} className={className} {...props}>
        <CareersSectionHeader>
          <CareersSectionTitle>{title}</CareersSectionTitle>
          {subtitle && (
            <CareersSectionSubtitle>{subtitle}</CareersSectionSubtitle>
          )}
        </CareersSectionHeader>

        {showDepartmentFilter && departments.length > 1 && (
          <div className="mb-8 flex justify-center">
            <DepartmentFilter departments={departments} />
          </div>
        )}

        <JobGrid columns={columns}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              variant={cardVariant}
              onApply={onApply}
            />
          ))}
        </JobGrid>
      </CareersSection>
    );
  },
);
CompleteCareersSection.displayName = "CompleteCareersSection";

// CareersHero - hero section for careers page
export interface CareersHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  cta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export const CareersHero = forwardRef<HTMLDivElement, CareersHeroProps>(
  ({ className, title, subtitle, stats, cta, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12 text-center",
          className,
        )}
        {...props}
      >
        <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-8">
            {stats.map((stat, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Stats don't have unique IDs
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {cta && (
          <div className="mt-8">
            {cta.href ? (
              <Button as="a" href={cta.href} variant="primary" size="lg">
                {cta.text}
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={cta.onClick}>
                {cta.text}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
CareersHero.displayName = "CareersHero";

// PerksGrid - benefits and perks section
export interface PerkItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface PerksGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  perks: PerkItem[];
  columns?: 2 | 3 | 4;
}

export const PerksGrid = forwardRef<HTMLDivElement, PerksGridProps>(
  ({ className, title, subtitle, perks, columns = 3, ...props }, ref) => {
    const colClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    };

    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h3 className="text-2xl font-bold text-foreground">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        <div className={cn("grid gap-6", colClasses[columns])}>
          {perks.map((perk) => (
            <div
              key={perk.id}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {perk.icon}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{perk.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
PerksGrid.displayName = "PerksGrid";
