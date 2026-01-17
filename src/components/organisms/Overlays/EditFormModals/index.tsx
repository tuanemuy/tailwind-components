import { forwardRef, type ReactNode, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { DatePicker } from "@/components/molecules/DatePicker";
import { FormField } from "@/components/molecules/FormField";
import { Select, type SelectOption } from "@/components/molecules/Select";
import { TimePicker, type TimeValue } from "@/components/molecules/TimePicker";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import {
  CalendarIcon,
  FolderIcon,
  ImageIcon,
  MailIcon,
  PlusIcon,
  TagIcon,
  UserIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// EditUserModal
// ============================================
export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  department?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  tags?: string[];
}

export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  title?: string;
  subtitle?: ReactNode;
  roles?: SelectOption[];
  departments?: SelectOption[];
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const EditUserModal = forwardRef<HTMLDivElement, EditUserModalProps>(
  (
    {
      isOpen,
      onClose,
      onSave,
      initialData = {},
      title = "Edit User",
      subtitle,
      roles = [],
      departments = [],
      submitText = "Save Changes",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [formData, setFormData] = useState<UserFormData>({
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      role: initialData.role || "",
      department: initialData.department || "",
      location: initialData.location || "",
      bio: initialData.bio || "",
      avatar: initialData.avatar || "",
      tags: initialData.tags || [],
    });
    const [newTag, setNewTag] = useState("");
    const [errors, setErrors] = useState<
      Partial<Record<keyof UserFormData, string>>
    >({});

    const handleChange = (
      field: keyof UserFormData,
      value: string | string[],
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const addTag = () => {
      if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), newTag.trim()],
        }));
        setNewTag("");
      }
    };

    const removeTag = (tag: string) => {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags?.filter((t) => t !== tag),
      }));
    };

    const validate = (): boolean => {
      const newErrors: Partial<Record<keyof UserFormData, string>> = {};

      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validate()) {
        onSave(formData);
      }
    };

    const handleClose = () => {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "",
        department: initialData.department || "",
        location: initialData.location || "",
        bio: initialData.bio || "",
        avatar: initialData.avatar || "",
        tags: initialData.tags || [],
      });
      setErrors({});
      setNewTag("");
      onClose();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={
            <span className="flex items-center gap-2">
              <UserIcon className="size-5" />
              {title}
            </span>
          }
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-6">
            {/* Avatar section */}
            <div className="flex items-center gap-4">
              <Avatar
                src={formData.avatar}
                alt={`${formData.firstName} ${formData.lastName}`}
                size="xl"
                fallback={formData.firstName.charAt(0) || "U"}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Profile Photo
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, GIF or PNG. Max size 2MB.
                </p>
                <div className="mt-2 flex gap-2">
                  <Button variant="outline" size="sm" disabled={loading}>
                    <ImageIcon className="size-4" />
                    Upload
                  </Button>
                  {formData.avatar && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleChange("avatar", "")}
                      disabled={loading}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Name fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="First Name" required error={errors.firstName}>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  disabled={loading}
                />
              </FormField>
              <FormField label="Last Name" required error={errors.lastName}>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  disabled={loading}
                />
              </FormField>
            </div>

            {/* Contact fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Email" required error={errors.email}>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email"
                  leftIcon={<MailIcon className="size-4" />}
                  disabled={loading}
                />
              </FormField>
              <FormField label="Phone">
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  disabled={loading}
                />
              </FormField>
            </div>

            {/* Role and Department */}
            {(roles.length > 0 || departments.length > 0) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {roles.length > 0 && (
                  <FormField label="Role">
                    <Select
                      value={formData.role}
                      onChange={(value) => handleChange("role", value)}
                      options={roles}
                      placeholder="Select role"
                      disabled={loading}
                    />
                  </FormField>
                )}
                {departments.length > 0 && (
                  <FormField label="Department">
                    <Select
                      value={formData.department}
                      onChange={(value) => handleChange("department", value)}
                      options={departments}
                      placeholder="Select department"
                      disabled={loading}
                    />
                  </FormField>
                )}
              </div>
            )}

            {/* Location */}
            <FormField label="Location">
              <Input
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter location"
                disabled={loading}
              />
            </FormField>

            {/* Bio */}
            <FormField label="Bio">
              <Textarea
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Enter bio"
                rows={3}
                disabled={loading}
              />
            </FormField>

            {/* Tags */}
            <FormField label="Tags">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    disabled={loading || !newTag.trim()}
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} soft className="gap-1">
                        <TagIcon className="size-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 rounded-full hover:bg-muted"
                          disabled={loading}
                        >
                          <XIcon className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormField>
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
EditUserModal.displayName = "EditUserModal";

// ============================================
// EditEventModal
// ============================================
export interface EventFormData {
  title: string;
  description?: string;
  date?: Date;
  startTime?: TimeValue;
  endTime?: TimeValue;
  location?: string;
  isAllDay?: boolean;
  attendees?: string[];
  category?: string;
  reminder?: string;
  color?: string;
}

export interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EventFormData) => void;
  initialData?: Partial<EventFormData>;
  title?: string;
  subtitle?: ReactNode;
  categories?: SelectOption[];
  reminderOptions?: SelectOption[];
  colorOptions?: { value: string; label: string; color: string }[];
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

const defaultReminderOptions: SelectOption[] = [
  { value: "none", label: "No reminder" },
  { value: "5m", label: "5 minutes before" },
  { value: "15m", label: "15 minutes before" },
  { value: "30m", label: "30 minutes before" },
  { value: "1h", label: "1 hour before" },
  { value: "1d", label: "1 day before" },
];

const defaultColorOptions = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
  { value: "yellow", label: "Yellow", color: "bg-yellow-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "pink", label: "Pink", color: "bg-pink-500" },
];

export const EditEventModal = forwardRef<HTMLDivElement, EditEventModalProps>(
  (
    {
      isOpen,
      onClose,
      onSave,
      initialData = {},
      title = "Edit Event",
      subtitle,
      categories = [],
      reminderOptions = defaultReminderOptions,
      colorOptions = defaultColorOptions,
      submitText = "Save Event",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [formData, setFormData] = useState<EventFormData>({
      title: initialData.title || "",
      description: initialData.description || "",
      date: initialData.date,
      startTime: initialData.startTime,
      endTime: initialData.endTime,
      location: initialData.location || "",
      isAllDay: initialData.isAllDay || false,
      attendees: initialData.attendees || [],
      category: initialData.category || "",
      reminder: initialData.reminder || "none",
      color: initialData.color || "blue",
    });
    const [newAttendee, setNewAttendee] = useState("");
    const [errors, setErrors] = useState<
      Partial<Record<keyof EventFormData, string>>
    >({});

    const handleChange = <K extends keyof EventFormData>(
      field: K,
      value: EventFormData[K],
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const addAttendee = () => {
      if (
        newAttendee.trim() &&
        !formData.attendees?.includes(newAttendee.trim())
      ) {
        setFormData((prev) => ({
          ...prev,
          attendees: [...(prev.attendees || []), newAttendee.trim()],
        }));
        setNewAttendee("");
      }
    };

    const removeAttendee = (attendee: string) => {
      setFormData((prev) => ({
        ...prev,
        attendees: prev.attendees?.filter((a) => a !== attendee),
      }));
    };

    const validate = (): boolean => {
      const newErrors: Partial<Record<keyof EventFormData, string>> = {};

      if (!formData.title.trim()) {
        newErrors.title = "Event title is required";
      }
      if (!formData.date) {
        newErrors.date = "Date is required";
      }
      if (!formData.isAllDay && formData.startTime && formData.endTime) {
        const startMinutes =
          formData.startTime.hours * 60 + formData.startTime.minutes;
        const endMinutes =
          formData.endTime.hours * 60 + formData.endTime.minutes;
        if (startMinutes >= endMinutes) {
          newErrors.endTime = "End time must be after start time";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validate()) {
        onSave(formData);
      }
    };

    const handleClose = () => {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        date: initialData.date,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        location: initialData.location || "",
        isAllDay: initialData.isAllDay || false,
        attendees: initialData.attendees || [],
        category: initialData.category || "",
        reminder: initialData.reminder || "none",
        color: initialData.color || "blue",
      });
      setErrors({});
      setNewAttendee("");
      onClose();
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
          title={
            <span className="flex items-center gap-2">
              <CalendarIcon className="size-5" />
              {title}
            </span>
          }
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Title */}
            <FormField label="Event Title" required error={errors.title}>
              <Input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter event title"
                disabled={loading}
              />
            </FormField>

            {/* Description */}
            <FormField label="Description">
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter description"
                rows={2}
                disabled={loading}
              />
            </FormField>

            {/* Date */}
            <FormField label="Date" required error={errors.date}>
              <DatePicker
                value={formData.date}
                onChange={(date) => handleChange("date", date)}
                disabled={loading}
              />
            </FormField>

            {/* All day toggle */}
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isAllDay}
                onChange={(e) => handleChange("isAllDay", e.target.checked)}
                disabled={loading}
                className="size-4 rounded border-input"
              />
              <span className="text-sm text-foreground">All day event</span>
            </label>

            {/* Time range */}
            {!formData.isAllDay && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Start Time">
                  <TimePicker
                    value={formData.startTime}
                    onChange={(time) => handleChange("startTime", time)}
                    disabled={loading}
                  />
                </FormField>
                <FormField label="End Time" error={errors.endTime}>
                  <TimePicker
                    value={formData.endTime}
                    onChange={(time) => handleChange("endTime", time)}
                    disabled={loading}
                  />
                </FormField>
              </div>
            )}

            {/* Location */}
            <FormField label="Location">
              <Input
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter location"
                disabled={loading}
              />
            </FormField>

            {/* Category and Reminder */}
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.length > 0 && (
                <FormField label="Category">
                  <Select
                    value={formData.category}
                    onChange={(value) => handleChange("category", value)}
                    options={categories}
                    placeholder="Select category"
                    disabled={loading}
                  />
                </FormField>
              )}
              <FormField label="Reminder">
                <Select
                  value={formData.reminder}
                  onChange={(value) => handleChange("reminder", value)}
                  options={reminderOptions}
                  disabled={loading}
                />
              </FormField>
            </div>

            {/* Color */}
            <FormField label="Color">
              <div className="flex gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange("color", option.value)}
                    className={cn(
                      "size-8 rounded-full transition-all",
                      option.color,
                      formData.color === option.value
                        ? "ring-2 ring-ring ring-offset-2"
                        : "opacity-60 hover:opacity-100",
                    )}
                    title={option.label}
                    disabled={loading}
                  />
                ))}
              </div>
            </FormField>

            {/* Attendees */}
            <FormField label="Attendees">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newAttendee}
                    onChange={(e) => setNewAttendee(e.target.value)}
                    placeholder="Add attendee email"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAttendee();
                      }
                    }}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAttendee}
                    disabled={loading || !newAttendee.trim()}
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                </div>
                {formData.attendees && formData.attendees.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.attendees.map((attendee) => (
                      <Badge key={attendee} soft className="gap-1">
                        <UserIcon className="size-3" />
                        {attendee}
                        <button
                          type="button"
                          onClick={() => removeAttendee(attendee)}
                          className="ml-1 rounded-full hover:bg-muted"
                          disabled={loading}
                        >
                          <XIcon className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormField>
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
EditEventModal.displayName = "EditEventModal";

// ============================================
// CreateProjectModal
// ============================================
export interface ProjectFormData {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  priority?: string;
  teamMembers?: string[];
  tags?: string[];
  visibility?: "private" | "team" | "public";
  template?: string;
}

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: ProjectFormData) => void;
  initialData?: Partial<ProjectFormData>;
  title?: string;
  subtitle?: ReactNode;
  statusOptions?: SelectOption[];
  priorityOptions?: SelectOption[];
  templateOptions?: SelectOption[];
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

const defaultStatusOptions: SelectOption[] = [
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
];

const defaultPriorityOptions: SelectOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export const CreateProjectModal = forwardRef<
  HTMLDivElement,
  CreateProjectModalProps
>(
  (
    {
      isOpen,
      onClose,
      onCreate,
      initialData = {},
      title = "Create Project",
      subtitle,
      statusOptions = defaultStatusOptions,
      priorityOptions = defaultPriorityOptions,
      templateOptions = [],
      submitText = "Create Project",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [formData, setFormData] = useState<ProjectFormData>({
      name: initialData.name || "",
      description: initialData.description || "",
      startDate: initialData.startDate,
      endDate: initialData.endDate,
      status: initialData.status || "planning",
      priority: initialData.priority || "medium",
      teamMembers: initialData.teamMembers || [],
      tags: initialData.tags || [],
      visibility: initialData.visibility || "team",
      template: initialData.template || "",
    });
    const [newMember, setNewMember] = useState("");
    const [newTag, setNewTag] = useState("");
    const [errors, setErrors] = useState<
      Partial<Record<keyof ProjectFormData, string>>
    >({});

    const handleChange = <K extends keyof ProjectFormData>(
      field: K,
      value: ProjectFormData[K],
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const addMember = () => {
      if (
        newMember.trim() &&
        !formData.teamMembers?.includes(newMember.trim())
      ) {
        setFormData((prev) => ({
          ...prev,
          teamMembers: [...(prev.teamMembers || []), newMember.trim()],
        }));
        setNewMember("");
      }
    };

    const removeMember = (member: string) => {
      setFormData((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers?.filter((m) => m !== member),
      }));
    };

    const addTag = () => {
      if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), newTag.trim()],
        }));
        setNewTag("");
      }
    };

    const removeTag = (tag: string) => {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags?.filter((t) => t !== tag),
      }));
    };

    const validate = (): boolean => {
      const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};

      if (!formData.name.trim()) {
        newErrors.name = "Project name is required";
      }
      if (
        formData.startDate &&
        formData.endDate &&
        formData.startDate > formData.endDate
      ) {
        newErrors.endDate = "End date must be after start date";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validate()) {
        onCreate(formData);
      }
    };

    const handleClose = () => {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        status: initialData.status || "planning",
        priority: initialData.priority || "medium",
        teamMembers: initialData.teamMembers || [],
        tags: initialData.tags || [],
        visibility: initialData.visibility || "team",
        template: initialData.template || "",
      });
      setErrors({});
      setNewMember("");
      setNewTag("");
      onClose();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={
            <span className="flex items-center gap-2">
              <FolderIcon className="size-5" />
              {title}
            </span>
          }
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Template selection */}
            {templateOptions.length > 0 && (
              <FormField label="Template">
                <Select
                  value={formData.template}
                  onChange={(value) => handleChange("template", value)}
                  options={[
                    { value: "", label: "Blank project" },
                    ...templateOptions,
                  ]}
                  disabled={loading}
                />
              </FormField>
            )}

            {/* Project name */}
            <FormField label="Project Name" required error={errors.name}>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter project name"
                disabled={loading}
              />
            </FormField>

            {/* Description */}
            <FormField label="Description">
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter project description"
                rows={3}
                disabled={loading}
              />
            </FormField>

            {/* Date range */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Start Date">
                <DatePicker
                  value={formData.startDate}
                  onChange={(date) => handleChange("startDate", date)}
                  disabled={loading}
                />
              </FormField>
              <FormField label="End Date" error={errors.endDate}>
                <DatePicker
                  value={formData.endDate}
                  onChange={(date) => handleChange("endDate", date)}
                  disabled={loading}
                />
              </FormField>
            </div>

            {/* Status and Priority */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Status">
                <Select
                  value={formData.status}
                  onChange={(value) => handleChange("status", value)}
                  options={statusOptions}
                  disabled={loading}
                />
              </FormField>
              <FormField label="Priority">
                <Select
                  value={formData.priority}
                  onChange={(value) => handleChange("priority", value)}
                  options={priorityOptions}
                  disabled={loading}
                />
              </FormField>
            </div>

            {/* Visibility */}
            <FormField label="Visibility">
              <div className="flex gap-2">
                {(["private", "team", "public"] as const).map((visibility) => (
                  <button
                    key={visibility}
                    type="button"
                    onClick={() => handleChange("visibility", visibility)}
                    disabled={loading}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm transition-colors",
                      formData.visibility === visibility
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-muted",
                    )}
                  >
                    {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Team members */}
            <FormField label="Team Members">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    placeholder="Add team member email"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addMember();
                      }
                    }}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMember}
                    disabled={loading || !newMember.trim()}
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                </div>
                {formData.teamMembers && formData.teamMembers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.teamMembers.map((member) => (
                      <Badge key={member} soft className="gap-1">
                        <UserIcon className="size-3" />
                        {member}
                        <button
                          type="button"
                          onClick={() => removeMember(member)}
                          className="ml-1 rounded-full hover:bg-muted"
                          disabled={loading}
                        >
                          <XIcon className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormField>

            {/* Tags */}
            <FormField label="Tags">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    disabled={loading || !newTag.trim()}
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} soft className="gap-1">
                        <TagIcon className="size-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 rounded-full hover:bg-muted"
                          disabled={loading}
                        >
                          <XIcon className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormField>
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
CreateProjectModal.displayName = "CreateProjectModal";
