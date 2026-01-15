import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/organisms/Modal";

// ============================================
// SettingsModal
// ============================================
export interface SettingItem {
  id: string;
  label: string;
  description?: string;
  type: "toggle" | "select" | "input" | "custom";
  value: string | boolean;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  customRender?: (value: string | boolean, onChange: (value: string | boolean) => void) => ReactNode;
}

export interface SettingSection {
  id: string;
  title: string;
  description?: string;
  items: SettingItem[];
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: Record<string, string | boolean>) => void;
  sections: SettingSection[];
  title?: string;
  subtitle?: ReactNode;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const SettingsModal = forwardRef<HTMLDivElement, SettingsModalProps>(
  (
    {
      isOpen,
      onClose,
      onSave,
      sections,
      title = "Settings",
      subtitle,
      submitText = "Save Changes",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [settings, setSettings] = useState<Record<string, string | boolean>>(() => {
      const initial: Record<string, string | boolean> = {};
      sections.forEach((section) => {
        section.items.forEach((item) => {
          initial[item.id] = item.value;
        });
      });
      return initial;
    });
    const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

    const handleChange = (id: string, value: string | boolean) => {
      setSettings((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
      onSave(settings);
    };

    const handleClose = () => {
      // Reset to initial values
      const initial: Record<string, string | boolean> = {};
      sections.forEach((section) => {
        section.items.forEach((item) => {
          initial[item.id] = item.value;
        });
      });
      setSettings(initial);
      onClose();
    };

    const renderSettingItem = (item: SettingItem) => {
      const value = settings[item.id];

      switch (item.type) {
        case "toggle":
          return (
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => handleChange(item.id, e.target.checked)}
                disabled={item.disabled || loading}
                className="peer sr-only"
              />
              <div
                className={cn(
                  "h-6 w-11 rounded-full bg-muted transition-colors",
                  "after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:bg-background after:transition-transform",
                  "peer-checked:bg-primary peer-checked:after:translate-x-full",
                  "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                )}
              />
            </label>
          );

        case "select":
          return (
            <select
              value={value as string}
              onChange={(e) => handleChange(item.id, e.target.value)}
              disabled={item.disabled || loading}
              className={cn(
                "rounded-lg border border-input bg-background px-3 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {item.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        case "input":
          return (
            <Input
              value={value as string}
              onChange={(e) => handleChange(item.id, e.target.value)}
              disabled={item.disabled || loading}
              className="max-w-xs"
            />
          );

        case "custom":
          return item.customRender?.(value, (newValue) => handleChange(item.id, newValue));

        default:
          return null;
      }
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="xl"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="none">
          <div className="flex min-h-[400px]">
            {/* Sidebar */}
            {sections.length > 1 && (
              <div className="w-48 shrink-0 border-r border-border bg-muted/30 p-2">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        activeSection === section.id
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {sections
                .filter((s) => sections.length === 1 || s.id === activeSection)
                .map((section) => (
                  <div key={section.id} className="space-y-6">
                    {sections.length > 1 && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {section.title}
                        </h3>
                        {section.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {section.description}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
                        >
                          <div className="flex-1">
                            <label
                              htmlFor={item.id}
                              className="text-sm font-medium text-foreground"
                            >
                              {item.label}
                            </label>
                            {item.description && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0">{renderSettingItem(item)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={handleSave} loading={loading}>
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
SettingsModal.displayName = "SettingsModal";
