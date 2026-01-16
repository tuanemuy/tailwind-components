"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Badge, Button, ProgressBar } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { Card, CardBody } from "@/components/organisms";
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  FolderIcon,
  RocketIcon,
  UserIcon,
  UsersIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// =============================================================================
// Shared Types
// =============================================================================

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
}

// =============================================================================
// OnboardingPlansPage - オンボーディング：プラン選択
// =============================================================================

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  period?: "monthly" | "yearly";
  features: string[];
  popular?: boolean;
  icon?: ReactNode;
}

export interface OnboardingPlansPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
  selectedPlan?: string;
  onSelectPlan?: (planId: string) => void;
  onContinue?: (planId: string) => void;
  onSkip?: () => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  loading?: boolean;
  showAnnualToggle?: boolean;
  isAnnual?: boolean;
  onToggleAnnual?: (annual: boolean) => void;
}

export const OnboardingPlansPage = forwardRef<
  HTMLDivElement,
  OnboardingPlansPageProps
>(
  (
    {
      className,
      logo,
      title = "Choose your plan",
      subtitle = "Select the plan that best fits your needs. You can change this later.",
      plans = [],
      selectedPlan,
      onSelectPlan,
      onContinue,
      onSkip,
      onBack,
      currentStep = 1,
      totalSteps = 4,
      loading = false,
      showAnnualToggle = true,
      isAnnual = false,
      onToggleAnnual,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = useState(
      selectedPlan || plans.find((p) => p.popular)?.id,
    );

    const handleSelect = (planId: string) => {
      setSelected(planId);
      onSelectPlan?.(planId);
    };

    const handleContinue = () => {
      if (selected) {
        onContinue?.(selected);
      }
    };

    const formatPrice = (price: number, currency = "USD") => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
      }).format(price);
    };

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {/* Header */}
        <header className="border-b border-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {logo}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="w-full">
          <ProgressBar
            value={(currentStep / totalSteps) * 100}
            size="xs"
            showLabel={false}
            className="rounded-none"
          />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Annual toggle */}
            {showAnnualToggle && (
              <div className="flex items-center justify-center gap-3 mb-8">
                <span
                  className={cn(
                    "text-sm",
                    !isAnnual
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() => onToggleAnnual?.(!isAnnual)}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    isAnnual ? "bg-primary" : "bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      isAnnual ? "translate-x-7" : "translate-x-1",
                    )}
                  />
                </button>
                <span
                  className={cn(
                    "text-sm",
                    isAnnual
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  Yearly
                  <Badge variant="success" size="sm" className="ml-2">
                    Save 20%
                  </Badge>
                </span>
              </div>
            )}

            {/* Plans grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => handleSelect(plan.id)}
                  className={cn(
                    "relative text-left rounded-xl border-2 p-6 transition-all",
                    selected === plan.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                    plan.popular && "ring-2 ring-primary/20",
                  )}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    {plan.icon && (
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {plan.icon}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">
                      {formatPrice(
                        isAnnual ? plan.price * 0.8 : plan.price,
                        plan.currency,
                      )}
                    </span>
                    <span className="text-muted-foreground">
                      /{plan.period === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckIcon className="size-4 text-success shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {selected === plan.id && (
                    <div className="absolute top-4 right-4 size-6 rounded-full bg-primary flex items-center justify-center">
                      <CheckIcon className="size-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  <ArrowLeftIcon className="size-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleContinue}
                loading={loading}
                disabled={!selected}
              >
                Continue
                <ChevronRightIcon className="size-4 ml-2" />
              </Button>
              {onSkip && (
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Skip for now
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  },
);
OnboardingPlansPage.displayName = "OnboardingPlansPage";

// =============================================================================
// OnboardingSyncContactsPage - オンボーディング：連絡先同期
// =============================================================================

export interface ContactSource {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  connected?: boolean;
  contactCount?: number;
}

export interface OnboardingSyncContactsPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  sources: ContactSource[];
  onConnect?: (sourceId: string) => void;
  onDisconnect?: (sourceId: string) => void;
  onContinue?: (connectedSources: string[]) => void;
  onSkip?: () => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  loading?: boolean;
  connectingSource?: string;
}

export const OnboardingSyncContactsPage = forwardRef<
  HTMLDivElement,
  OnboardingSyncContactsPageProps
>(
  (
    {
      className,
      logo,
      title = "Import your contacts",
      subtitle = "Connect your accounts to import contacts and get started faster.",
      sources = [],
      onConnect,
      onDisconnect,
      onContinue,
      onSkip,
      onBack,
      currentStep = 2,
      totalSteps = 4,
      loading = false,
      connectingSource,
      ...props
    },
    ref,
  ) => {
    const connectedSources = sources
      .filter((s) => s.connected)
      .map((s) => s.id);

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {/* Header */}
        <header className="border-b border-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {logo}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="w-full">
          <ProgressBar
            value={(currentStep / totalSteps) * 100}
            size="xs"
            showLabel={false}
            className="rounded-none"
          />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 py-8">
          <div className="w-full max-w-lg">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UsersIcon className="size-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Sources */}
            <div className="space-y-3 mb-8">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border",
                    source.connected
                      ? "border-success bg-success/5"
                      : "border-border",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                      {source.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {source.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {source.connected
                          ? `${source.contactCount || 0} contacts imported`
                          : source.description}
                      </p>
                    </div>
                  </div>
                  {source.connected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDisconnect?.(source.id)}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      loading={connectingSource === source.id}
                      onClick={() => onConnect?.(source.id)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => onContinue?.(connectedSources)}
                loading={loading}
                className="w-full"
              >
                Continue
                <ChevronRightIcon className="size-4 ml-2" />
              </Button>
              <div className="flex items-center justify-center gap-4">
                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Back
                  </button>
                )}
                {onSkip && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Skip for now
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
);
OnboardingSyncContactsPage.displayName = "OnboardingSyncContactsPage";

// =============================================================================
// OnboardingRolePage - オンボーディング：役割選択
// =============================================================================

export interface UserRole {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
}

export interface OnboardingRolePageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  roles: UserRole[];
  selectedRole?: string;
  onSelectRole?: (roleId: string) => void;
  onContinue?: (roleId: string) => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  loading?: boolean;
}

export const OnboardingRolePage = forwardRef<
  HTMLDivElement,
  OnboardingRolePageProps
>(
  (
    {
      className,
      logo,
      title = "What best describes your role?",
      subtitle = "This helps us personalize your experience.",
      roles = [],
      selectedRole,
      onSelectRole,
      onContinue,
      onBack,
      currentStep = 3,
      totalSteps = 4,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = useState(selectedRole);

    const handleSelect = (roleId: string) => {
      setSelected(roleId);
      onSelectRole?.(roleId);
    };

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {/* Header */}
        <header className="border-b border-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {logo}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="w-full">
          <ProgressBar
            value={(currentStep / totalSteps) * 100}
            size="xs"
            showLabel={false}
            className="rounded-none"
          />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 py-8">
          <div className="w-full max-w-lg">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="size-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Roles */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelect(role.id)}
                  className={cn(
                    "relative text-left p-4 rounded-lg border-2 transition-all",
                    selected === role.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div className="size-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                    {role.icon}
                  </div>
                  <h3 className="font-medium text-foreground mb-1">
                    {role.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                  {selected === role.id && (
                    <div className="absolute top-3 right-3 size-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckIcon className="size-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => selected && onContinue?.(selected)}
                loading={loading}
                disabled={!selected}
                className="w-full"
              >
                Continue
                <ChevronRightIcon className="size-4 ml-2" />
              </Button>
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-muted-foreground hover:text-foreground text-center"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  },
);
OnboardingRolePage.displayName = "OnboardingRolePage";

// =============================================================================
// OnboardingProjectPage - オンボーディング：プロジェクト作成
// =============================================================================

export interface OnboardingProjectPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit?: (data: {
    projectName: string;
    description?: string;
    teamMembers?: string[];
  }) => void;
  onSkip?: () => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  loading?: boolean;
  showTeamInvite?: boolean;
}

export const OnboardingProjectPage = forwardRef<
  HTMLDivElement,
  OnboardingProjectPageProps
>(
  (
    {
      className,
      logo,
      title = "Create your first project",
      subtitle = "Projects help you organize your work and collaborate with your team.",
      onSubmit,
      onSkip,
      onBack,
      currentStep = 4,
      totalSteps = 4,
      loading = false,
      showTeamInvite = true,
      ...props
    },
    ref,
  ) => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [teamEmail, setTeamEmail] = useState("");
    const [teamMembers, setTeamMembers] = useState<string[]>([]);

    const handleAddTeamMember = () => {
      if (teamEmail && !teamMembers.includes(teamEmail)) {
        setTeamMembers([...teamMembers, teamEmail]);
        setTeamEmail("");
      }
    };

    const handleRemoveTeamMember = (email: string) => {
      setTeamMembers(teamMembers.filter((m) => m !== email));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.({
        projectName,
        description: description || undefined,
        teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
      });
    };

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {/* Header */}
        <header className="border-b border-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {logo}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="w-full">
          <ProgressBar
            value={(currentStep / totalSteps) * 100}
            size="xs"
            showLabel={false}
            className="rounded-none"
          />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 py-8">
          <div className="w-full max-w-lg">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FolderIcon className="size-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Form */}
            <Card variant="bordered">
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField
                    label="Project name"
                    required
                    inputProps={{
                      value: projectName,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setProjectName(e.target.value),
                      placeholder: "My First Project",
                      autoFocus: true,
                    }}
                  />

                  <FormField
                    label="Description"
                    helpText="Optional"
                    inputProps={{
                      value: description,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(e.target.value),
                      placeholder: "A brief description of your project",
                    }}
                  />

                  {showTeamInvite && (
                    <div className="space-y-2">
                      <label
                        htmlFor="team-member-email"
                        className="text-sm font-medium text-foreground"
                      >
                        Invite team members
                        <span className="text-muted-foreground font-normal ml-1">
                          (optional)
                        </span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="team-member-email"
                          type="email"
                          value={teamEmail}
                          onChange={(e) => setTeamEmail(e.target.value)}
                          placeholder="colleague@example.com"
                          className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTeamMember();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddTeamMember}
                          disabled={!teamEmail}
                        >
                          Add
                        </Button>
                      </div>
                      {teamMembers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {teamMembers.map((email) => (
                            <Badge key={email} variant="soft" className="gap-1">
                              {email}
                              <button
                                type="button"
                                onClick={() => handleRemoveTeamMember(email)}
                                className="hover:text-foreground"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    type="submit"
                    loading={loading}
                    disabled={!projectName}
                    className="w-full"
                  >
                    <RocketIcon className="size-4 mr-2" />
                    Create project and get started
                  </Button>
                </form>
              </CardBody>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Back
                </button>
              )}
              {onSkip && (
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Skip for now
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  },
);
OnboardingProjectPage.displayName = "OnboardingProjectPage";
