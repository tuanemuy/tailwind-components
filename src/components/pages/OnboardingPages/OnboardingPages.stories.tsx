import type { Meta, StoryObj } from "@storybook/react";
import {
  BuildingIcon,
  CodeIcon,
  MailIcon,
  PaletteIcon,
  PhoneIcon,
  RocketIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
  ZapIcon,
} from "@/components/icons";
import {
  OnboardingPlansPage,
  OnboardingProjectPage,
  OnboardingRolePage,
  OnboardingSyncContactsPage,
} from "./index";

// =============================================================================
// OnboardingPlansPage Stories
// =============================================================================

const plansMeta: Meta<typeof OnboardingPlansPage> = {
  title: "Pages/Onboarding/OnboardingPlansPage",
  component: OnboardingPlansPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default plansMeta;
type PlansStory = StoryObj<typeof OnboardingPlansPage>;

const samplePlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals",
    price: 9,
    period: "monthly" as const,
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "Email support",
      "1GB storage",
    ],
    icon: <ZapIcon className="size-5" />,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for small teams",
    price: 29,
    period: "monthly" as const,
    popular: true,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Team collaboration",
    ],
    icon: <RocketIcon className="size-5" />,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    period: "monthly" as const,
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "Unlimited storage",
      "SSO & SAML",
      "Custom contracts",
    ],
    icon: <StarIcon className="size-5" />,
  },
];

export const DefaultPlans: PlansStory = {
  args: {
    plans: samplePlans,
    onContinue: (planId) => alert(`Selected plan: ${planId}`),
    onSkip: () => alert("Skipped"),
    onBack: () => alert("Go back"),
  },
};

export const PlansWithAnnualToggle: PlansStory = {
  args: {
    plans: samplePlans,
    showAnnualToggle: true,
    isAnnual: false,
    onToggleAnnual: (annual) => alert(`Annual: ${annual}`),
    onContinue: (planId) => alert(`Selected plan: ${planId}`),
  },
};

export const PlansLoading: PlansStory = {
  args: {
    plans: samplePlans,
    loading: true,
    selectedPlan: "pro",
  },
};

// =============================================================================
// OnboardingSyncContactsPage Stories
// =============================================================================

const _syncContactsMeta: Meta<typeof OnboardingSyncContactsPage> = {
  title: "Pages/Onboarding/OnboardingSyncContactsPage",
  component: OnboardingSyncContactsPage,
  parameters: {
    layout: "fullscreen",
  },
};

type SyncContactsStory = StoryObj<typeof OnboardingSyncContactsPage>;

const contactSources = [
  {
    id: "google",
    name: "Google Contacts",
    description: "Import from your Google account",
    icon: <MailIcon className="size-5 text-muted-foreground" />,
    connected: false,
  },
  {
    id: "outlook",
    name: "Outlook",
    description: "Import from Microsoft Outlook",
    icon: <MailIcon className="size-5 text-muted-foreground" />,
    connected: true,
    contactCount: 142,
  },
  {
    id: "phone",
    name: "Phone Contacts",
    description: "Import from your phone",
    icon: <PhoneIcon className="size-5 text-muted-foreground" />,
    connected: false,
  },
  {
    id: "csv",
    name: "CSV Import",
    description: "Upload a CSV file",
    icon: <UsersIcon className="size-5 text-muted-foreground" />,
    connected: false,
  },
];

export const DefaultSyncContacts: SyncContactsStory = {
  args: {
    sources: contactSources,
    onConnect: (sourceId) => alert(`Connect: ${sourceId}`),
    onDisconnect: (sourceId) => alert(`Disconnect: ${sourceId}`),
    onContinue: (sources) => alert(`Continue with: ${sources.join(", ")}`),
    onSkip: () => alert("Skipped"),
    onBack: () => alert("Go back"),
  },
};

export const SyncContactsConnecting: SyncContactsStory = {
  args: {
    sources: contactSources,
    connectingSource: "google",
    onConnect: (sourceId) => alert(`Connect: ${sourceId}`),
    onDisconnect: (sourceId) => alert(`Disconnect: ${sourceId}`),
    onContinue: (sources) => alert(`Continue with: ${sources.join(", ")}`),
  },
};

// =============================================================================
// OnboardingRolePage Stories
// =============================================================================

const _roleMeta: Meta<typeof OnboardingRolePage> = {
  title: "Pages/Onboarding/OnboardingRolePage",
  component: OnboardingRolePage,
  parameters: {
    layout: "fullscreen",
  },
};

type RoleStory = StoryObj<typeof OnboardingRolePage>;

const userRoles = [
  {
    id: "developer",
    name: "Developer",
    description: "I build software and applications",
    icon: <CodeIcon className="size-5 text-muted-foreground" />,
  },
  {
    id: "designer",
    name: "Designer",
    description: "I create visual designs and UX",
    icon: <PaletteIcon className="size-5 text-muted-foreground" />,
  },
  {
    id: "manager",
    name: "Manager",
    description: "I lead teams and manage projects",
    icon: <UsersIcon className="size-5 text-muted-foreground" />,
  },
  {
    id: "executive",
    name: "Executive",
    description: "I make strategic decisions",
    icon: <BuildingIcon className="size-5 text-muted-foreground" />,
  },
  {
    id: "freelancer",
    name: "Freelancer",
    description: "I work independently for clients",
    icon: <UserIcon className="size-5 text-muted-foreground" />,
  },
  {
    id: "other",
    name: "Other",
    description: "Something else entirely",
    icon: <SettingsIcon className="size-5 text-muted-foreground" />,
  },
];

export const DefaultRole: RoleStory = {
  args: {
    roles: userRoles,
    onContinue: (roleId) => alert(`Selected role: ${roleId}`),
    onBack: () => alert("Go back"),
  },
};

export const RolePreselected: RoleStory = {
  args: {
    roles: userRoles,
    selectedRole: "developer",
    onContinue: (roleId) => alert(`Selected role: ${roleId}`),
  },
};

// =============================================================================
// OnboardingProjectPage Stories
// =============================================================================

const _projectMeta: Meta<typeof OnboardingProjectPage> = {
  title: "Pages/Onboarding/OnboardingProjectPage",
  component: OnboardingProjectPage,
  parameters: {
    layout: "fullscreen",
  },
};

type ProjectStory = StoryObj<typeof OnboardingProjectPage>;

export const DefaultProject: ProjectStory = {
  args: {
    onSubmit: (data) => alert(`Project created: ${JSON.stringify(data)}`),
    onSkip: () => alert("Skipped"),
    onBack: () => alert("Go back"),
  },
};

export const ProjectWithTeamInvite: ProjectStory = {
  args: {
    showTeamInvite: true,
    onSubmit: (data) => alert(`Project created: ${JSON.stringify(data)}`),
    onSkip: () => alert("Skipped"),
  },
};

export const ProjectLoading: ProjectStory = {
  args: {
    loading: true,
    onSubmit: (data) => alert(`Project created: ${JSON.stringify(data)}`),
  },
};
