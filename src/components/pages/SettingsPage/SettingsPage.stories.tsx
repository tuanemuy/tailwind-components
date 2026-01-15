import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPage, SettingsPageSkeleton, SettingsForm, SettingsToggle } from ".";
import { FormField } from "@/components/molecules";
import {
  GlobeIcon,
  UserIcon,
  LockIcon,
  BellIcon,
  CreditCardIcon,
  ShieldIcon,
  PaletteIcon,
} from "@/lib/icons";

const meta: Meta<typeof SettingsPage> = {
  title: "Pages/SettingsPage",
  component: SettingsPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "tabbed", "sidebar"],
    },
    loading: {
      control: "boolean",
    },
    saveLoading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SettingsPage>;

// Sample user
const sampleUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
};

// Logo component
const Logo = () => (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">Preline</span>
  </div>
);

// Profile settings content
const ProfileSettings = () => (
  <SettingsForm
    title="Profile Information"
    description="Update your profile details here."
    onSubmit={(data) => console.log("Profile saved:", data)}
  >
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        label="First name"
        inputProps={{ name: "firstName", defaultValue: "John" }}
      />
      <FormField
        label="Last name"
        inputProps={{ name: "lastName", defaultValue: "Doe" }}
      />
    </div>
    <FormField
      label="Email"
      type="email"
      inputProps={{ name: "email", defaultValue: "john@example.com" }}
    />
    <FormField
      label="Bio"
      inputProps={{ name: "bio", defaultValue: "Software engineer..." }}
    />
  </SettingsForm>
);

// Notification settings content
const NotificationSettings = () => (
  <div className="divide-y divide-border">
    <SettingsToggle
      label="Email notifications"
      description="Receive email notifications for important updates"
      checked={true}
      onCheckedChange={(checked) => console.log("Email notifications:", checked)}
    />
    <SettingsToggle
      label="Push notifications"
      description="Receive push notifications on your devices"
      checked={false}
      onCheckedChange={(checked) => console.log("Push notifications:", checked)}
    />
    <SettingsToggle
      label="Weekly digest"
      description="Receive a weekly summary of your activity"
      checked={true}
      onCheckedChange={(checked) => console.log("Weekly digest:", checked)}
    />
    <SettingsToggle
      label="Marketing emails"
      description="Receive updates about new features and promotions"
      checked={false}
      onCheckedChange={(checked) => console.log("Marketing emails:", checked)}
    />
  </div>
);

// Security settings content
const SecuritySettings = () => (
  <div className="space-y-6">
    <SettingsForm
      title="Change Password"
      description="Update your password to keep your account secure."
      onSubmit={(data) => console.log("Password changed:", data)}
      saveText="Update password"
    >
      <FormField
        label="Current password"
        type="password"
        inputProps={{ name: "currentPassword" }}
      />
      <FormField
        label="New password"
        type="password"
        inputProps={{ name: "newPassword" }}
      />
      <FormField
        label="Confirm new password"
        type="password"
        inputProps={{ name: "confirmPassword" }}
      />
    </SettingsForm>

    <div className="pt-6 border-t border-border">
      <h3 className="text-lg font-medium text-foreground mb-4">Two-Factor Authentication</h3>
      <SettingsToggle
        label="Enable 2FA"
        description="Add an extra layer of security to your account"
        checked={false}
        onCheckedChange={(checked) => console.log("2FA:", checked)}
      />
    </div>
  </div>
);

// Sample sections with content
const sectionsWithContent = [
  {
    id: "profile",
    label: "Profile",
    icon: <UserIcon className="size-5" />,
    description: "Manage your public profile information",
    content: <ProfileSettings />,
  },
  {
    id: "security",
    label: "Security",
    icon: <LockIcon className="size-5" />,
    description: "Configure security settings and two-factor authentication",
    content: <SecuritySettings />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <BellIcon className="size-5" />,
    description: "Choose what notifications you want to receive",
    content: <NotificationSettings />,
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCardIcon className="size-5" />,
    description: "Manage your billing information and subscription",
    content: (
      <div className="text-center py-8 text-muted-foreground">
        Billing settings content...
      </div>
    ),
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: <ShieldIcon className="size-5" />,
    description: "Control your privacy settings",
    content: (
      <div className="text-center py-8 text-muted-foreground">
        Privacy settings content...
      </div>
    ),
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: <PaletteIcon className="size-5" />,
    description: "Customize the look and feel",
    content: (
      <div className="text-center py-8 text-muted-foreground">
        Appearance settings content...
      </div>
    ),
  },
];

// Default sidebar layout
export const Default: Story = {
  args: {
    variant: "sidebar",
    sections: sectionsWithContent,
    user: sampleUser,
    logo: <Logo />,
    onSave: (data) => console.log("Settings saved:", data),
  },
};

// Tabbed layout
export const TabbedLayout: Story = {
  args: {
    variant: "tabbed",
    sections: sectionsWithContent.slice(0, 4),
    user: sampleUser,
    logo: <Logo />,
    onSave: (data) => console.log("Settings saved:", data),
  },
};

// Stacked layout (default variant)
export const StackedLayout: Story = {
  args: {
    variant: "default",
    sections: sectionsWithContent.slice(0, 3),
    user: sampleUser,
    logo: <Logo />,
    onSave: (data) => console.log("Settings saved:", data),
  },
};

// With success message
export const WithSuccessMessage: Story = {
  args: {
    variant: "sidebar",
    sections: sectionsWithContent,
    user: sampleUser,
    logo: <Logo />,
    successMessage: "Your settings have been saved successfully.",
    onSave: (data) => console.log("Settings saved:", data),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    variant: "sidebar",
    sections: sectionsWithContent,
    user: sampleUser,
    logo: <Logo />,
    loading: true,
  },
};

// Skeleton
export const Skeleton: StoryObj<typeof SettingsPageSkeleton> = {
  render: () => <SettingsPageSkeleton />,
};
