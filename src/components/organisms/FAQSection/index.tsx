import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, PlusIcon, MinusIcon } from "@/lib/icons";

// Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string | ReactNode;
  category?: string;
}

// FAQSection component
export interface FAQSectionProps extends React.HTMLAttributes<HTMLElement> {
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

export const FAQSection = forwardRef<HTMLElement, FAQSectionProps>(
  ({ className, padding = "lg", backgroundColor = "default", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(paddingClasses[padding], backgroundClasses[backgroundColor], className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
FAQSection.displayName = "FAQSection";

// FAQSectionHeader component
export interface FAQSectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const FAQSectionHeader = forwardRef<HTMLDivElement, FAQSectionHeaderProps>(
  ({ className, align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-12 md:mb-16",
          align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FAQSectionHeader.displayName = "FAQSectionHeader";

// FAQSectionTitle component
export interface FAQSectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
}

export const FAQSectionTitle = forwardRef<HTMLHeadingElement, FAQSectionTitleProps>(
  ({ className, as: Component = "h2", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-3xl font-bold text-foreground md:text-4xl", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
FAQSectionTitle.displayName = "FAQSectionTitle";

// FAQSectionSubtitle component
export interface FAQSectionSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FAQSectionSubtitle = forwardRef<HTMLParagraphElement, FAQSectionSubtitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("mt-4 text-lg text-muted-foreground", className)} {...props}>
        {children}
      </p>
    );
  },
);
FAQSectionSubtitle.displayName = "FAQSectionSubtitle";

// FAQList component
export interface FAQListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "accordion" | "simple" | "bordered";
  gap?: "sm" | "md" | "lg";
  maxWidth?: "sm" | "md" | "lg" | "full";
}

const gapClasses = {
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-6",
};

const maxWidthClasses = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-3xl",
  full: "max-w-full",
};

export const FAQList = forwardRef<HTMLDivElement, FAQListProps>(
  (
    {
      className,
      variant = "accordion",
      gap = "md",
      maxWidth = "lg",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto", gapClasses[gap], maxWidthClasses[maxWidth], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FAQList.displayName = "FAQList";

// FAQAccordionItem component
export interface FAQAccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  answer: string | ReactNode;
  defaultOpen?: boolean;
  iconStyle?: "chevron" | "plus-minus";
  variant?: "default" | "bordered" | "separated";
}

const accordionVariants = {
  default: "border-b border-border",
  bordered: "rounded-lg border border-border",
  separated: "rounded-lg bg-muted/50",
};

export const FAQAccordionItem = forwardRef<HTMLDivElement, FAQAccordionItemProps>(
  (
    {
      className,
      question,
      answer,
      defaultOpen = false,
      iconStyle = "chevron",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div
        ref={ref}
        className={cn(accordionVariants[variant], variant !== "default" && "mb-3", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-primary",
            variant !== "default" && "px-6",
          )}
        >
          <span className="font-medium text-foreground">{question}</span>
          {iconStyle === "chevron" ? (
            <ChevronDownIcon
              className={cn(
                "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          ) : isOpen ? (
            <MinusIcon className="size-5 shrink-0 text-muted-foreground" />
          ) : (
            <PlusIcon className="size-5 shrink-0 text-muted-foreground" />
          )}
        </button>
        <div
          className={cn(
            "grid transition-all duration-200",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "pb-4 text-muted-foreground",
                variant !== "default" && "px-6",
              )}
            >
              {answer}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
FAQAccordionItem.displayName = "FAQAccordionItem";

// FAQSimpleItem component
export interface FAQSimpleItemProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  answer: string | ReactNode;
}

export const FAQSimpleItem = forwardRef<HTMLDivElement, FAQSimpleItemProps>(
  ({ className, question, answer, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <dt className="font-semibold text-foreground">{question}</dt>
        <dd className="text-muted-foreground">{answer}</dd>
      </div>
    );
  },
);
FAQSimpleItem.displayName = "FAQSimpleItem";

// FAQGrid component (for two-column layout)
export interface FAQGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2;
  gap?: "sm" | "md" | "lg";
}

const gridGapClasses = {
  sm: "gap-4",
  md: "gap-6 md:gap-8",
  lg: "gap-8 md:gap-12",
};

export const FAQGrid = forwardRef<HTMLDivElement, FAQGridProps>(
  ({ className, columns = 2, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
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
FAQGrid.displayName = "FAQGrid";

// FAQCategories component (for categorized FAQs)
export interface FAQCategoryItem {
  name: string;
  count?: number;
}

export interface FAQCategoriesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  categories: FAQCategoryItem[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export const FAQCategories = forwardRef<HTMLDivElement, FAQCategoriesProps>(
  ({ className, categories, activeCategory, onChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-8 flex flex-wrap items-center justify-center gap-2", className)}
        {...props}
      >
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => onChange(category.name)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.name
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            )}
          >
            {category.name}
            {category.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-75">({category.count})</span>
            )}
          </button>
        ))}
      </div>
    );
  },
);
FAQCategories.displayName = "FAQCategories";

// CompleteFAQSection component - pre-composed full FAQ section
export interface CompleteFAQSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  items: FAQItem[];
  variant?: FAQAccordionItemProps["variant"];
  iconStyle?: FAQAccordionItemProps["iconStyle"];
  enableCategories?: boolean;
  contactCTA?: {
    text: string;
    linkText: string;
    href?: string;
    onClick?: () => void;
  };
}

export const CompleteFAQSection = forwardRef<HTMLElement, CompleteFAQSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      items,
      variant = "default",
      iconStyle = "chevron",
      enableCategories = false,
      contactCTA,
      ...props
    },
    ref,
  ) => {
    const categories = enableCategories
      ? Array.from(new Set(items.map((item) => item.category || "General")))
      : [];
    const [activeCategory, setActiveCategory] = useState(categories[0] || "General");

    const filteredItems = enableCategories
      ? items.filter((item) => (item.category || "General") === activeCategory)
      : items;

    return (
      <FAQSection ref={ref} className={className} {...props}>
        <FAQSectionHeader>
          <FAQSectionTitle>{title}</FAQSectionTitle>
          {subtitle && <FAQSectionSubtitle>{subtitle}</FAQSectionSubtitle>}
        </FAQSectionHeader>

        {enableCategories && categories.length > 1 && (
          <FAQCategories
            categories={categories.map((name) => ({
              name,
              count: items.filter((item) => (item.category || "General") === name).length,
            }))}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        <FAQList>
          {filteredItems.map((item) => (
            <FAQAccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              variant={variant}
              iconStyle={iconStyle}
            />
          ))}
        </FAQList>

        {contactCTA && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              {contactCTA.text}{" "}
              <a
                href={contactCTA.href}
                onClick={contactCTA.onClick}
                className="font-medium text-primary hover:underline"
              >
                {contactCTA.linkText}
              </a>
            </p>
          </div>
        )}
      </FAQSection>
    );
  },
);
CompleteFAQSection.displayName = "CompleteFAQSection";
