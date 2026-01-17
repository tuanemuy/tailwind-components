"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Avatar, Button, Switch } from "@/components/atoms";
import { Tab, Tabs } from "@/components/molecules";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormActions,
  FormBody,
  Header,
  HeaderLogo,
  PageContent,
  PageLayout,
  PageSection,
  type SettingsNavSection,
  SettingsSidebar,
} from "@/components/organisms";
import {
  BellIcon,
  CheckIcon,
  CreditCardIcon,
  GlobeIcon,
  LockIcon,
  PaletteIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// Settings page variants
type SettingsVariant = "default" | "tabbed" | "sidebar";

// Settings section
export interface SettingsSection {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  description?: string;
}

// SettingsPage props
export interface SettingsPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SettingsVariant;
  sections?: SettingsSection[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  onSave?: (data: Record<string, unknown>) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  header?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  saveLoading?: boolean;
  successMessage?: string;
}

// Default settings sections
const defaultSections: SettingsSection[] = [
  {
    id: "profile",
    label: "Profile",
    icon: <UserIcon className="size-5" />,
    description: "Manage your public profile information",
    content: null,
  },
  {
    id: "account",
    label: "Account",
    icon: <SettingsIcon className="size-5" />,
    description: "Manage your account settings and preferences",
    content: null,
  },
  {
    id: "security",
    label: "Security",
    icon: <LockIcon className="size-5" />,
    description: "Configure security settings and two-factor authentication",
    content: null,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <BellIcon className="size-5" />,
    description: "Choose what notifications you want to receive",
    content: null,
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCardIcon className="size-5" />,
    description: "Manage your billing information and subscription",
    content: null,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: <ShieldIcon className="size-5" />,
    description: "Control your privacy settings",
    content: null,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: <PaletteIcon className="size-5" />,
    description: "Customize the look and feel",
    content: null,
  },
  {
    id: "language",
    label: "Language & Region",
    icon: <GlobeIcon className="size-5" />,
    description: "Set your language and regional preferences",
    content: null,
  },
];

export const SettingsPage = forwardRef<HTMLDivElement, SettingsPageProps>(
  (
    {
      className,
      variant = "sidebar",
      sections = defaultSections,
      activeSection: controlledActiveSection,
      onSectionChange,
      onSave,
      user,
      logo,
      logoText = "Settings",
      logoHref = "/",
      header,
      footer,
      loading = false,
      saveLoading = false,
      successMessage,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalActiveSection, setInternalActiveSection] = useState(
      sections[0]?.id || "profile",
    );
    const activeSection = controlledActiveSection ?? internalActiveSection;

    const handleSectionChange = (sectionId: string) => {
      setInternalActiveSection(sectionId);
      onSectionChange?.(sectionId);
    };

    const currentSection = sections.find((s) => s.id === activeSection);

    const renderSidebarNav = (): SettingsNavSection[] => {
      return [
        {
          id: "settings-nav",
          items: sections.map((section) => ({
            id: section.id,
            label: section.label,
            icon: section.icon,
            active: section.id === activeSection,
            onClick: () => handleSectionChange(section.id),
          })),
        },
      ];
    };

    const renderContent = () => {
      if (loading) {
        return <SettingsPageSkeleton />;
      }

      return (
        <div className="space-y-6">
          {/* Section header */}
          {currentSection && (
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {currentSection.label}
              </h2>
              {currentSection.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {currentSection.description}
                </p>
              )}
            </div>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="flex items-center gap-2 rounded-lg bg-success/10 border border-success/20 p-3 text-sm text-success">
              <CheckIcon className="size-4" />
              {successMessage}
            </div>
          )}

          {/* Section content */}
          <Card variant="bordered">
            <CardBody>{currentSection?.content || children}</CardBody>
          </Card>
        </div>
      );
    };

    const renderHeader = () => {
      if (header) return header;

      return (
        <Header
          variant="bordered"
          sticky
          logo={
            <HeaderLogo href={logoHref} text={logoText}>
              {logo}
            </HeaderLogo>
          }
          actions={
            user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {user.email}
                </span>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  initials={user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  size="sm"
                />
              </div>
            )
          }
        />
      );
    };

    // Sidebar layout
    if (variant === "sidebar") {
      return (
        <PageLayout
          ref={ref}
          header={renderHeader()}
          footer={footer}
          sidebar={
            <SettingsSidebar
              sections={renderSidebarNav()}
            />
          }
          className={className}
          {...props}
        >
          <PageContent maxWidth="2xl" padding="md">
            {renderContent()}
          </PageContent>
        </PageLayout>
      );
    }

    // Tabbed layout
    if (variant === "tabbed") {
      return (
        <PageLayout
          ref={ref}
          header={renderHeader()}
          footer={footer}
          className={className}
          {...props}
        >
          <PageContent maxWidth="4xl" padding="md">
            <PageSection>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            </PageSection>
            <PageSection>
              <Tabs
                value={activeSection}
                onValueChange={handleSectionChange}
                variant="underline"
              >
                {sections.map((section) => (
                  <Tab key={section.id} value={section.id}>
                    <span className="flex items-center gap-2">
                      {section.icon}
                      {section.label}
                    </span>
                  </Tab>
                ))}
              </Tabs>
            </PageSection>
            <PageSection>{renderContent()}</PageSection>
          </PageContent>
        </PageLayout>
      );
    }

    // Default layout (stacked)
    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        footer={footer}
        className={className}
        {...props}
      >
        <PageContent maxWidth="2xl" padding="md">
          <PageSection>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </PageSection>
          {sections.map((section) => (
            <PageSection key={section.id}>
              <Card variant="bordered">
                <CardHeader
                  title={section.label}
                  subtitle={section.description}
                  bordered
                />
                <CardBody>{section.content}</CardBody>
              </Card>
            </PageSection>
          ))}
          {children}
        </PageContent>
      </PageLayout>
    );
  },
);
SettingsPage.displayName = "SettingsPage";

// Settings form components
export interface SettingsFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  title?: string;
  description?: string;
  onSubmit?: (data: Record<string, unknown>) => void;
  loading?: boolean;
  saveText?: string;
}

export const SettingsForm = forwardRef<HTMLFormElement, SettingsFormProps>(
  (
    {
      className,
      title,
      description,
      onSubmit,
      loading,
      saveText = "Save changes",
      children,
      ...props
    },
    ref,
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, unknown> = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      onSubmit?.(data);
    };

    return (
      <Form ref={ref} onSubmit={handleSubmit} className={className} {...props}>
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h3 className="text-lg font-medium text-foreground">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        <FormBody>{children}</FormBody>
        <FormActions align="end" className="mt-6 pt-6 border-t border-border">
          <Button type="submit" loading={loading}>
            {saveText}
          </Button>
        </FormActions>
      </Form>
    );
  },
);
SettingsForm.displayName = "SettingsForm";

// Settings toggle item
export interface SettingsToggleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const SettingsToggle = forwardRef<HTMLDivElement, SettingsToggleProps>(
  (
    {
      className,
      label,
      description,
      checked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between py-3", className)}
        {...props}
      >
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Switch
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
        />
      </div>
    );
  },
);
SettingsToggle.displayName = "SettingsToggle";

// Settings page skeleton
export interface SettingsPageSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SettingsPageSkeleton = forwardRef<
  HTMLDivElement,
  SettingsPageSkeletonProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("animate-pulse space-y-6", className)}
      {...props}
    >
      <div className="space-y-2">
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-48 bg-muted rounded" />
            </div>
            <div className="h-6 w-12 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
});
SettingsPageSkeleton.displayName = "SettingsPageSkeleton";
