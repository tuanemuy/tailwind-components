"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Switch } from "@/components/atoms/Switch";
import { BellIcon, MailIcon, SmartphoneIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  notificationChannelVariants,
  notificationSettingsRowVariants,
  notificationSettingsVariants,
} from "@/components/variants/notificationSettings";

export interface NotificationSetting {
  id: string;
  title: string;
  description?: string;
  enabled: boolean;
  channels?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
}

export interface NotificationSettingsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationSettingsVariants> {
  title?: string;
  description?: string;
  settings: NotificationSetting[];
  onSettingChange?: (id: string, enabled: boolean) => void;
  onChannelChange?: (
    id: string,
    channel: "email" | "push" | "sms",
    enabled: boolean,
  ) => void;
  showChannels?: boolean;
}

export const NotificationSettings = forwardRef<
  HTMLDivElement,
  NotificationSettingsProps
>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      settings,
      onSettingChange,
      onChannelChange,
      showChannels = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(notificationSettingsVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || description) && (
          <div className="mb-4 space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Settings list */}
        <div className="divide-y divide-border">
          {settings.map((setting) => (
            <NotificationSettingRow
              key={setting.id}
              setting={setting}
              variant={variant}
              showChannels={showChannels}
              onToggle={(enabled) => onSettingChange?.(setting.id, enabled)}
              onChannelToggle={(channel, enabled) =>
                onChannelChange?.(setting.id, channel, enabled)
              }
            />
          ))}
        </div>
      </div>
    );
  },
);
NotificationSettings.displayName = "NotificationSettings";

// Single setting row
interface NotificationSettingRowProps
  extends VariantProps<typeof notificationSettingsRowVariants> {
  setting: NotificationSetting;
  showChannels?: boolean;
  onToggle?: (enabled: boolean) => void;
  onChannelToggle?: (
    channel: "email" | "push" | "sms",
    enabled: boolean,
  ) => void;
}

const NotificationSettingRow = ({
  setting,
  variant,
  showChannels = false,
  onToggle,
  onChannelToggle,
}: NotificationSettingRowProps) => {
  return (
    <div className={cn(notificationSettingsRowVariants({ variant }))}>
      <div className="flex-1">
        <h4 className="font-medium text-foreground">{setting.title}</h4>
        {setting.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {setting.description}
          </p>
        )}
        {/* Channel toggles */}
        {showChannels && setting.channels && setting.enabled && (
          <div className="mt-3 flex items-center gap-2">
            {setting.channels.email !== undefined && (
              <button
                type="button"
                onClick={() =>
                  onChannelToggle?.("email", !setting.channels?.email)
                }
                className={cn(
                  notificationChannelVariants({
                    active: setting.channels.email,
                    size: "sm",
                  }),
                )}
                aria-label="Email notifications"
              >
                <MailIcon className="size-4" />
              </button>
            )}
            {setting.channels.push !== undefined && (
              <button
                type="button"
                onClick={() =>
                  onChannelToggle?.("push", !setting.channels?.push)
                }
                className={cn(
                  notificationChannelVariants({
                    active: setting.channels.push,
                    size: "sm",
                  }),
                )}
                aria-label="Push notifications"
              >
                <BellIcon className="size-4" />
              </button>
            )}
            {setting.channels.sms !== undefined && (
              <button
                type="button"
                onClick={() => onChannelToggle?.("sms", !setting.channels?.sms)}
                className={cn(
                  notificationChannelVariants({
                    active: setting.channels.sms,
                    size: "sm",
                  }),
                )}
                aria-label="SMS notifications"
              >
                <SmartphoneIcon className="size-4" />
              </button>
            )}
          </div>
        )}
      </div>
      <Switch
        checked={setting.enabled}
        onChange={(e) => onToggle?.(e.target.checked)}
      />
    </div>
  );
};

// Grouped notification settings
export interface NotificationGroup {
  id: string;
  title: string;
  description?: string;
  settings: NotificationSetting[];
}

export interface GroupedNotificationSettingsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  groups: NotificationGroup[];
  onSettingChange?: (
    groupId: string,
    settingId: string,
    enabled: boolean,
  ) => void;
  showChannels?: boolean;
  onChannelChange?: (
    groupId: string,
    settingId: string,
    channel: "email" | "push" | "sms",
    enabled: boolean,
  ) => void;
}

export const GroupedNotificationSettings = forwardRef<
  HTMLDivElement,
  GroupedNotificationSettingsProps
>(
  (
    {
      className,
      groups,
      onSettingChange,
      showChannels,
      onChannelChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-8", className)} {...props}>
        {groups.map((group) => (
          <div key={group.id}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {group.title}
              </h3>
              {group.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {group.description}
                </p>
              )}
            </div>
            <div className="rounded-lg border border-border">
              <div className="divide-y divide-border">
                {group.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-start justify-between gap-4 p-4"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {setting.title}
                      </h4>
                      {setting.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {setting.description}
                        </p>
                      )}
                      {showChannels && setting.channels && setting.enabled && (
                        <div className="mt-3 flex items-center gap-2">
                          {setting.channels.email !== undefined && (
                            <button
                              type="button"
                              onClick={() =>
                                onChannelChange?.(
                                  group.id,
                                  setting.id,
                                  "email",
                                  !setting.channels?.email,
                                )
                              }
                              className={cn(
                                notificationChannelVariants({
                                  active: setting.channels.email,
                                  size: "sm",
                                }),
                              )}
                              aria-label="Email"
                            >
                              <MailIcon className="size-4" />
                            </button>
                          )}
                          {setting.channels.push !== undefined && (
                            <button
                              type="button"
                              onClick={() =>
                                onChannelChange?.(
                                  group.id,
                                  setting.id,
                                  "push",
                                  !setting.channels?.push,
                                )
                              }
                              className={cn(
                                notificationChannelVariants({
                                  active: setting.channels.push,
                                  size: "sm",
                                }),
                              )}
                              aria-label="Push"
                            >
                              <BellIcon className="size-4" />
                            </button>
                          )}
                          {setting.channels.sms !== undefined && (
                            <button
                              type="button"
                              onClick={() =>
                                onChannelChange?.(
                                  group.id,
                                  setting.id,
                                  "sms",
                                  !setting.channels?.sms,
                                )
                              }
                              className={cn(
                                notificationChannelVariants({
                                  active: setting.channels.sms,
                                  size: "sm",
                                }),
                              )}
                              aria-label="SMS"
                            >
                              <SmartphoneIcon className="size-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onChange={(e) =>
                        onSettingChange?.(
                          group.id,
                          setting.id,
                          e.target.checked,
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
);
GroupedNotificationSettings.displayName = "GroupedNotificationSettings";

// Compact notification toggle card
export interface NotificationToggleCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  enabled: boolean;
  onToggle?: (enabled: boolean) => void;
}

export const NotificationToggleCard = forwardRef<
  HTMLDivElement,
  NotificationToggleCardProps
>(
  (
    { className, icon, title, description, enabled, onToggle, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-4 rounded-lg border border-border p-4",
          enabled && "border-primary/50 bg-primary/5",
          className,
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              enabled
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            <span className="size-5">{icon}</span>
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{title}</h4>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Switch
          checked={enabled}
          onChange={(e) => onToggle?.(e.target.checked)}
        />
      </div>
    );
  },
);
NotificationToggleCard.displayName = "NotificationToggleCard";

// Email digest settings
export interface EmailDigestSettingsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  frequency: "daily" | "weekly" | "monthly" | "never";
  onFrequencyChange?: (
    frequency: "daily" | "weekly" | "monthly" | "never",
  ) => void;
}

export const EmailDigestSettings = forwardRef<
  HTMLDivElement,
  EmailDigestSettingsProps
>(({ className, frequency, onFrequencyChange, ...props }, ref) => {
  const options = [
    {
      value: "daily",
      label: "Daily",
      description: "Receive a summary every day",
    },
    {
      value: "weekly",
      label: "Weekly",
      description: "Receive a summary every week",
    },
    {
      value: "monthly",
      label: "Monthly",
      description: "Receive a summary every month",
    },
    {
      value: "never",
      label: "Never",
      description: "Don't receive email digests",
    },
  ] as const;

  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Email Digest</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose how often you want to receive email summaries
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onFrequencyChange?.(option.value)}
            className={cn(
              "flex flex-col items-start rounded-lg border p-4 text-left transition-colors",
              frequency === option.value
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50",
            )}
          >
            <span
              className={cn(
                "font-medium",
                frequency === option.value ? "text-primary" : "text-foreground",
              )}
            >
              {option.label}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              {option.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});
EmailDigestSettings.displayName = "EmailDigestSettings";

// Notification preferences panel
export interface NotificationPreferencesPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  settings: NotificationSetting[];
  onSettingChange?: (id: string, enabled: boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
  saving?: boolean;
}

export const NotificationPreferencesPanel = forwardRef<
  HTMLDivElement,
  NotificationPreferencesPanelProps
>(
  (
    {
      className,
      title = "Notification Preferences",
      settings,
      onSettingChange,
      onSave,
      onCancel,
      saving = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-card", className)}
        {...props}
      >
        {/* Header */}
        <div className="border-b border-border p-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>

        {/* Settings */}
        <div className="divide-y divide-border p-4">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{setting.title}</h4>
                {setting.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                )}
              </div>
              <Switch
                checked={setting.enabled}
                onChange={(e) =>
                  onSettingChange?.(setting.id, e.target.checked)
                }
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        {(onSave || onCancel) && (
          <div className="flex items-center justify-end gap-3 border-t border-border p-4">
            {onCancel && (
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            )}
            {onSave && (
              <Button variant="primary" onClick={onSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
NotificationPreferencesPanel.displayName = "NotificationPreferencesPanel";
