import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/organisms/Modal";
import { DatePicker } from "@/components/molecules/DatePicker";
import { TimePicker, type TimeValue } from "@/components/molecules/TimePicker";
import { Select, type SelectOption } from "@/components/molecules/Select";
import { ClockIcon, CheckIcon } from "@/lib/icons";

// SnoozeModal
export interface SnoozeOption {
  id: string;
  label: string;
  duration: number; // in minutes
}

const defaultSnoozeOptions: SnoozeOption[] = [
  { id: "5min", label: "5 minutes", duration: 5 },
  { id: "15min", label: "15 minutes", duration: 15 },
  { id: "30min", label: "30 minutes", duration: 30 },
  { id: "1hour", label: "1 hour", duration: 60 },
  { id: "2hours", label: "2 hours", duration: 120 },
  { id: "tomorrow", label: "Tomorrow morning (9:00 AM)", duration: -1 },
  { id: "custom", label: "Pick a date & time", duration: 0 },
];

export interface SnoozeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSnooze: (until: Date) => void;
  title?: string;
  subtitle?: ReactNode;
  options?: SnoozeOption[];
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const SnoozeModal = forwardRef<HTMLDivElement, SnoozeModalProps>(
  (
    {
      isOpen,
      onClose,
      onSnooze,
      title = "Snooze",
      subtitle = "Remind me about this later",
      options = defaultSnoozeOptions,
      submitText = "Snooze",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [selectedId, setSelectedId] = useState("");
    const [customDate, setCustomDate] = useState<Date | undefined>(undefined);
    const [customTime, setCustomTime] = useState<TimeValue>({ hours: 9, minutes: 0 });

    const handleSubmit = () => {
      const option = options.find((o) => o.id === selectedId);
      if (!option) return;

      let snoozeUntil: Date;

      if (option.id === "custom" && customDate) {
        snoozeUntil = new Date(customDate);
        snoozeUntil.setHours(customTime.hours, customTime.minutes, 0, 0);
      } else if (option.id === "tomorrow") {
        snoozeUntil = new Date();
        snoozeUntil.setDate(snoozeUntil.getDate() + 1);
        snoozeUntil.setHours(9, 0, 0, 0);
      } else {
        snoozeUntil = new Date();
        snoozeUntil.setMinutes(snoozeUntil.getMinutes() + option.duration);
      }

      onSnooze(snoozeUntil);
    };

    const handleClose = () => {
      setSelectedId("");
      setCustomDate(undefined);
      setCustomTime({ hours: 9, minutes: 0 });
      onClose();
    };

    const isCustomSelected = selectedId === "custom";
    const canSubmit = selectedId && (selectedId !== "custom" || customDate);

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="sm"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                disabled={loading}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-3 text-start transition-colors",
                  selectedId === option.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50",
                )}
              >
                <ClockIcon className="size-5 text-muted-foreground" />
                <span className="flex-1 text-sm font-medium">{option.label}</span>
                {selectedId === option.id && (
                  <CheckIcon className="size-5 text-primary" />
                )}
              </button>
            ))}

            {/* Custom date/time picker */}
            {isCustomSelected && (
              <div className="mt-4 space-y-4 rounded-lg border border-border p-4">
                <DatePicker
                  value={customDate}
                  onChange={setCustomDate}
                  minDate={new Date()}
                  placeholder="Select date"
                  disabled={loading}
                />
                <TimePicker
                  value={customTime}
                  onChange={setCustomTime}
                  disabled={loading}
                />
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!canSubmit}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
SnoozeModal.displayName = "SnoozeModal";

// ScheduleModal
export interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: Date, time: TimeValue) => void;
  title?: string;
  subtitle?: ReactNode;
  initialDate?: Date;
  initialTime?: TimeValue;
  minDate?: Date;
  maxDate?: Date;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const ScheduleModal = forwardRef<HTMLDivElement, ScheduleModalProps>(
  (
    {
      isOpen,
      onClose,
      onSchedule,
      title = "Schedule",
      subtitle,
      initialDate,
      initialTime = { hours: 9, minutes: 0 },
      minDate,
      maxDate,
      submitText = "Schedule",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [date, setDate] = useState<Date | undefined>(initialDate);
    const [time, setTime] = useState<TimeValue>(initialTime);

    const handleSubmit = () => {
      if (date) {
        onSchedule(date, time);
      }
    };

    const handleClose = () => {
      setDate(initialDate);
      setTime(initialTime);
      onClose();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="sm"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date</label>
              <DatePicker
                value={date}
                onChange={setDate}
                minDate={minDate}
                maxDate={maxDate}
                placeholder="Select date"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Time</label>
              <TimePicker
                value={time}
                onChange={setTime}
                disabled={loading}
              />
            </div>

            {/* Preview */}
            {date && (
              <div className="rounded-lg border border-border bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">Scheduled for:</p>
                <p className="font-medium text-foreground">
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {`${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`}
                </p>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!date}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
ScheduleModal.displayName = "ScheduleModal";

// RecurrenceModal
export type RecurrenceFrequency = "daily" | "weekly" | "monthly" | "yearly" | "custom";

export interface RecurrenceSettings {
  frequency: RecurrenceFrequency;
  interval: number;
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  dayOfMonth?: number;
  endType: "never" | "date" | "occurrences";
  endDate?: Date;
  occurrences?: number;
}

const frequencyOptions: SelectOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "custom", label: "Custom" },
];

const daysOfWeekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface RecurrenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: RecurrenceSettings) => void;
  title?: string;
  subtitle?: ReactNode;
  initialSettings?: Partial<RecurrenceSettings>;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const RecurrenceModal = forwardRef<HTMLDivElement, RecurrenceModalProps>(
  (
    {
      isOpen,
      onClose,
      onSave,
      title = "Repeat",
      subtitle,
      initialSettings,
      submitText = "Save",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [settings, setSettings] = useState<RecurrenceSettings>({
      frequency: initialSettings?.frequency || "weekly",
      interval: initialSettings?.interval || 1,
      daysOfWeek: initialSettings?.daysOfWeek || [1], // Monday by default
      dayOfMonth: initialSettings?.dayOfMonth || 1,
      endType: initialSettings?.endType || "never",
      endDate: initialSettings?.endDate,
      occurrences: initialSettings?.occurrences || 10,
    });

    const updateSettings = <K extends keyof RecurrenceSettings>(
      key: K,
      value: RecurrenceSettings[K],
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const toggleDayOfWeek = (day: number) => {
      setSettings((prev) => {
        const current = prev.daysOfWeek || [];
        const updated = current.includes(day)
          ? current.filter((d) => d !== day)
          : [...current, day].sort();
        return { ...prev, daysOfWeek: updated };
      });
    };

    const handleSubmit = () => {
      onSave(settings);
    };

    const handleClose = () => {
      setSettings({
        frequency: initialSettings?.frequency || "weekly",
        interval: initialSettings?.interval || 1,
        daysOfWeek: initialSettings?.daysOfWeek || [1],
        dayOfMonth: initialSettings?.dayOfMonth || 1,
        endType: initialSettings?.endType || "never",
        endDate: initialSettings?.endDate,
        occurrences: initialSettings?.occurrences || 10,
      });
      onClose();
    };

    const getPreviewText = (): string => {
      const { frequency, interval, daysOfWeek } = settings;
      const plural = interval > 1;

      switch (frequency) {
        case "daily":
          return plural ? `Every ${interval} days` : "Every day";
        case "weekly":
          const days = daysOfWeek?.map((d) => daysOfWeekLabels[d]).join(", ") || "";
          return plural
            ? `Every ${interval} weeks on ${days}`
            : `Weekly on ${days}`;
        case "monthly":
          return plural
            ? `Every ${interval} months`
            : "Monthly";
        case "yearly":
          return plural
            ? `Every ${interval} years`
            : "Yearly";
        default:
          return "Custom recurrence";
      }
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-6">
            {/* Frequency */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Repeat
              </label>
              <Select
                value={settings.frequency}
                onChange={(value) =>
                  updateSettings("frequency", value as RecurrenceFrequency)
                }
                options={frequencyOptions}
                disabled={loading}
              />
            </div>

            {/* Interval */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Every
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  max={99}
                  value={settings.interval}
                  onChange={(e) =>
                    updateSettings("interval", Math.max(1, parseInt(e.target.value) || 1))
                  }
                  disabled={loading}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">
                  {settings.frequency === "daily"
                    ? "day(s)"
                    : settings.frequency === "weekly"
                      ? "week(s)"
                      : settings.frequency === "monthly"
                        ? "month(s)"
                        : "year(s)"}
                </span>
              </div>
            </div>

            {/* Days of week (for weekly) */}
            {settings.frequency === "weekly" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  On
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeekLabels.map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDayOfWeek(index)}
                      disabled={loading}
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                        settings.daysOfWeek?.includes(index)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* End type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Ends
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="endType"
                    checked={settings.endType === "never"}
                    onChange={() => updateSettings("endType", "never")}
                    disabled={loading}
                    className="size-4"
                  />
                  <span className="text-sm">Never</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="endType"
                    checked={settings.endType === "date"}
                    onChange={() => updateSettings("endType", "date")}
                    disabled={loading}
                    className="size-4"
                  />
                  <span className="text-sm">On date</span>
                  {settings.endType === "date" && (
                    <div className="ml-auto">
                      <DatePicker
                        value={settings.endDate}
                        onChange={(date) =>
                          updateSettings("endDate", date)
                        }
                        minDate={new Date()}
                        disabled={loading}
                      />
                    </div>
                  )}
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="endType"
                    checked={settings.endType === "occurrences"}
                    onChange={() => updateSettings("endType", "occurrences")}
                    disabled={loading}
                    className="size-4"
                  />
                  <span className="text-sm">After</span>
                  {settings.endType === "occurrences" && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={999}
                        value={settings.occurrences || 10}
                        onChange={(e) =>
                          updateSettings(
                            "occurrences",
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        disabled={loading}
                        className="w-16"
                      />
                      <span className="text-sm text-muted-foreground">
                        occurrences
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">Preview:</p>
              <p className="font-medium text-foreground">{getPreviewText()}</p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
RecurrenceModal.displayName = "RecurrenceModal";
