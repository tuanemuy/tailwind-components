import { forwardRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/atoms";
import { CheckIcon } from "@/lib/icons";

// NewsletterSection component
export interface NewsletterSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted" | "primary" | "gradient";
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
  primary: "bg-primary text-primary-foreground",
  gradient: "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground",
};

export const NewsletterSection = forwardRef<HTMLElement, NewsletterSectionProps>(
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
NewsletterSection.displayName = "NewsletterSection";

// NewsletterContent component
export interface NewsletterContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
};

export const NewsletterContent = forwardRef<HTMLDivElement, NewsletterContentProps>(
  ({ className, align = "center", maxWidth = "lg", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          maxWidthClasses[maxWidth],
          align === "center" ? "mx-auto text-center" : "text-left",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
NewsletterContent.displayName = "NewsletterContent";

// NewsletterTitle component
export interface NewsletterTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
  size?: "sm" | "md" | "lg";
}

const titleSizeClasses = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
};

export const NewsletterTitle = forwardRef<HTMLHeadingElement, NewsletterTitleProps>(
  ({ className, as: Component = "h2", size = "md", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("font-bold", titleSizeClasses[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
NewsletterTitle.displayName = "NewsletterTitle";

// NewsletterDescription component
export interface NewsletterDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const NewsletterDescription = forwardRef<HTMLParagraphElement, NewsletterDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("mt-3 opacity-80", className)} {...props}>
        {children}
      </p>
    );
  },
);
NewsletterDescription.displayName = "NewsletterDescription";

// NewsletterForm component
export interface NewsletterFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (email: string) => void | Promise<void>;
  layout?: "inline" | "stacked";
  placeholder?: string;
  buttonText?: string;
  loading?: boolean;
  inverted?: boolean;
}

export const NewsletterForm = forwardRef<HTMLFormElement, NewsletterFormProps>(
  (
    {
      className,
      onSubmit,
      layout = "inline",
      placeholder = "Enter your email",
      buttonText = "Subscribe",
      loading = false,
      inverted = false,
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        onSubmit(email.trim());
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(
          "mt-6",
          layout === "inline"
            ? "flex flex-col gap-3 sm:flex-row sm:gap-2"
            : "space-y-3",
          className,
        )}
        {...props}
      >
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={cn(
            layout === "inline" && "sm:flex-1",
            inverted && "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60",
          )}
        />
        <Button
          type="submit"
          variant={inverted ? "secondary" : "primary"}
          disabled={loading}
          className={cn(
            layout === "stacked" && "w-full",
            inverted && "bg-background text-foreground hover:bg-background/90",
          )}
        >
          {loading ? "Subscribing..." : buttonText}
        </Button>
      </form>
    );
  },
);
NewsletterForm.displayName = "NewsletterForm";

// NewsletterSuccess component
export interface NewsletterSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  showIcon?: boolean;
}

export const NewsletterSuccess = forwardRef<HTMLDivElement, NewsletterSuccessProps>(
  (
    {
      className,
      title = "Thanks for subscribing!",
      message = "Check your email for confirmation.",
      showIcon = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("mt-6 flex flex-col items-center gap-3 text-center", className)}
        {...props}
      >
        {showIcon && (
          <div className="flex size-12 items-center justify-center rounded-full bg-success/10">
            <CheckIcon className="size-6 text-success" />
          </div>
        )}
        <div>
          <div className="font-semibold">{title}</div>
          <p className="text-sm opacity-75">{message}</p>
        </div>
      </div>
    );
  },
);
NewsletterSuccess.displayName = "NewsletterSuccess";

// NewsletterFeatures component (for listing benefits)
export interface NewsletterFeatureItem {
  icon?: ReactNode;
  text: string;
}

export interface NewsletterFeaturesProps extends React.HTMLAttributes<HTMLUListElement> {
  features: NewsletterFeatureItem[];
  layout?: "row" | "column";
}

export const NewsletterFeatures = forwardRef<HTMLUListElement, NewsletterFeaturesProps>(
  ({ className, features, layout = "row", ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "mt-6 flex gap-4 text-sm",
          layout === "column" ? "flex-col" : "flex-row flex-wrap justify-center",
          className,
        )}
        {...props}
      >
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            {feature.icon || <CheckIcon className="size-4 text-success" />}
            <span className="opacity-80">{feature.text}</span>
          </li>
        ))}
      </ul>
    );
  },
);
NewsletterFeatures.displayName = "NewsletterFeatures";

// NewsletterPrivacy component
export interface NewsletterPrivacyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  privacyUrl?: string;
  privacyText?: string;
}

export const NewsletterPrivacy = forwardRef<HTMLParagraphElement, NewsletterPrivacyProps>(
  (
    {
      className,
      privacyUrl = "#",
      privacyText = "Read our privacy policy",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <p ref={ref} className={cn("mt-4 text-xs opacity-60", className)} {...props}>
        {children || (
          <>
            We care about your data.{" "}
            <a href={privacyUrl} className="underline hover:opacity-100">
              {privacyText}
            </a>
            .
          </>
        )}
      </p>
    );
  },
);
NewsletterPrivacy.displayName = "NewsletterPrivacy";

// SimpleNewsletter component - pre-composed inline newsletter
export interface SimpleNewsletterProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit: (email: string) => void | Promise<void>;
  features?: string[];
  privacyUrl?: string;
  loading?: boolean;
  success?: boolean;
  inverted?: boolean;
}

export const SimpleNewsletter = forwardRef<HTMLDivElement, SimpleNewsletterProps>(
  (
    {
      className,
      title,
      description,
      placeholder,
      buttonText,
      onSubmit,
      features,
      privacyUrl,
      loading = false,
      success = false,
      inverted = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("text-center", className)} {...props}>
        <NewsletterTitle size="sm">{title}</NewsletterTitle>
        {description && <NewsletterDescription>{description}</NewsletterDescription>}

        {success ? (
          <NewsletterSuccess />
        ) : (
          <>
            <NewsletterForm
              onSubmit={onSubmit}
              placeholder={placeholder}
              buttonText={buttonText}
              loading={loading}
              inverted={inverted}
            />
            {features && features.length > 0 && (
              <NewsletterFeatures
                features={features.map((text) => ({ text }))}
              />
            )}
            {privacyUrl && <NewsletterPrivacy privacyUrl={privacyUrl} />}
          </>
        )}
      </div>
    );
  },
);
SimpleNewsletter.displayName = "SimpleNewsletter";

// CompleteNewsletterSection component - pre-composed full newsletter section
export interface CompleteNewsletterSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit: (email: string) => void | Promise<void>;
  features?: string[];
  privacyUrl?: string;
  loading?: boolean;
  success?: boolean;
  backgroundColor?: NewsletterSectionProps["backgroundColor"];
  layout?: "centered" | "split";
  image?: {
    src: string;
    alt: string;
  };
}

export const CompleteNewsletterSection = forwardRef<HTMLElement, CompleteNewsletterSectionProps>(
  (
    {
      className,
      title,
      description,
      placeholder,
      buttonText,
      onSubmit,
      features,
      privacyUrl,
      loading = false,
      success = false,
      backgroundColor = "muted",
      layout = "centered",
      image,
      ...props
    },
    ref,
  ) => {
    const isPrimaryBg = backgroundColor === "primary" || backgroundColor === "gradient";

    if (layout === "split" && image) {
      return (
        <NewsletterSection ref={ref} backgroundColor={backgroundColor} className={className} {...props}>
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
            <NewsletterContent align="left" maxWidth="xl">
              <NewsletterTitle size="lg">{title}</NewsletterTitle>
              {description && <NewsletterDescription>{description}</NewsletterDescription>}

              {success ? (
                <NewsletterSuccess />
              ) : (
                <>
                  <NewsletterForm
                    onSubmit={onSubmit}
                    placeholder={placeholder}
                    buttonText={buttonText}
                    loading={loading}
                    layout="stacked"
                    inverted={isPrimaryBg}
                  />
                  {features && features.length > 0 && (
                    <NewsletterFeatures
                      features={features.map((text) => ({ text }))}
                      layout="column"
                    />
                  )}
                  {privacyUrl && <NewsletterPrivacy privacyUrl={privacyUrl} />}
                </>
              )}
            </NewsletterContent>

            <div className="hidden lg:block">
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </NewsletterSection>
      );
    }

    return (
      <NewsletterSection ref={ref} backgroundColor={backgroundColor} className={className} {...props}>
        <NewsletterContent>
          <NewsletterTitle size="lg">{title}</NewsletterTitle>
          {description && <NewsletterDescription>{description}</NewsletterDescription>}

          {success ? (
            <NewsletterSuccess />
          ) : (
            <>
              <NewsletterForm
                onSubmit={onSubmit}
                placeholder={placeholder}
                buttonText={buttonText}
                loading={loading}
                inverted={isPrimaryBg}
              />
              {features && features.length > 0 && (
                <NewsletterFeatures
                  features={features.map((text) => ({ text }))}
                />
              )}
              {privacyUrl && <NewsletterPrivacy privacyUrl={privacyUrl} />}
            </>
          )}
        </NewsletterContent>
      </NewsletterSection>
    );
  },
);
CompleteNewsletterSection.displayName = "CompleteNewsletterSection";
