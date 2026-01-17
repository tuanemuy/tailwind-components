import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileCard, CountryValue } from "./index";

const meta: Meta<typeof UserProfileCard> = {
  title: "Organisms/PageSections/UserProfileCard",
  component: UserProfileCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showFooter: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

const sampleDetails = [
  { label: "Full name", value: "Amanda Harvey" },
  { label: "Email", value: "amanda@site.com" },
  { label: "Phone", value: "+1 (609) 972-22-22" },
  { label: "Organization", value: "Notion" },
  { label: "Department", value: "-" },
  { label: "Account type", value: "Individual" },
  { label: "Country", value: <CountryValue countryCode="gb" countryName="United Kingdom" /> },
  { label: "City", value: "London" },
  { label: "State", value: "-" },
  { label: "Address line 1", value: "45 Roker Terrace, Latheronwheel" },
  { label: "Address line 2", value: "-" },
  { label: "Zip code", value: "KW5 8NW" },
];

export const Default: Story = {
  args: {
    avatarSrc:
      "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
    details: sampleDetails,
    onDelete: () => console.log("Delete clicked"),
    onCancel: () => console.log("Cancel clicked"),
    onSubmit: () => console.log("Add user clicked"),
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const WithoutFooter: Story = {
  args: {
    avatarSrc:
      "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
    details: sampleDetails,
    showFooter: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const WithDeleteOnly: Story = {
  args: {
    avatarSrc:
      "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
    details: sampleDetails,
    onDelete: () => console.log("Delete clicked"),
    deleteLabel: "Remove user",
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const EditMode: Story = {
  args: {
    avatarSrc:
      "https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
    details: sampleDetails,
    onDelete: () => console.log("Delete clicked"),
    onCancel: () => console.log("Cancel clicked"),
    onSubmit: () => console.log("Save changes clicked"),
    submitLabel: "Save changes",
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const WithFallbackAvatar: Story = {
  args: {
    avatarFallback: "AH",
    details: sampleDetails,
    onDelete: () => console.log("Delete clicked"),
    onCancel: () => console.log("Cancel clicked"),
    onSubmit: () => console.log("Add user clicked"),
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const MinimalDetails: Story = {
  args: {
    avatarSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    details: [
      { label: "Full name", value: "John Smith" },
      { label: "Email", value: "john@example.com" },
      { label: "Role", value: "Administrator" },
      { label: "Status", value: "Active" },
    ],
    onCancel: () => console.log("Cancel clicked"),
    onSubmit: () => console.log("Confirm clicked"),
    submitLabel: "Confirm",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const WithUSFlag: Story = {
  args: {
    avatarSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    details: [
      { label: "Full name", value: "Michael Johnson" },
      { label: "Email", value: "michael@example.com" },
      { label: "Phone", value: "+1 (555) 123-4567" },
      { label: "Country", value: <CountryValue countryCode="us" countryName="United States" /> },
      { label: "City", value: "New York" },
      { label: "State", value: "NY" },
    ],
    onCancel: () => console.log("Cancel clicked"),
    onSubmit: () => console.log("Add user clicked"),
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export const WithJapanFlag: Story = {
  args: {
    avatarSrc:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    details: [
      { label: "Full name", value: "Yuki Tanaka" },
      { label: "Email", value: "yuki@example.jp" },
      { label: "Phone", value: "+81 90-1234-5678" },
      { label: "Country", value: <CountryValue countryCode="jp" countryName="Japan" /> },
      { label: "City", value: "Tokyo" },
      { label: "Prefecture", value: "Tokyo" },
    ],
    onCancel: () => console.log("Cancel clicked"),
    onSubmit: () => console.log("Add user clicked"),
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};
