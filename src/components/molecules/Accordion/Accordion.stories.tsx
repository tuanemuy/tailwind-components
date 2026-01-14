import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./index";
import { InfoIcon, SettingsIcon, UserIcon, CreditCardIcon } from "@/lib/icons";

const meta: Meta<typeof Accordion> = {
  title: "Molecules/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion className="w-[450px]" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion variant="bordered" className="w-[450px]" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is your refund policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day money-back guarantee. If you&apos;re not satisfied,
          contact support for a full refund.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
        <AccordionContent>
          You can cancel anytime from your account settings. Your access will
          continue until the end of your billing period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
        <AccordionContent>
          Yes! You can upgrade or downgrade your plan at any time. Changes take
          effect immediately.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Separated: Story = {
  render: () => (
    <Accordion variant="separated" className="w-[450px]" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          Welcome to our platform! Here&apos;s everything you need to know to get
          started quickly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          Manage your profile, notification preferences, and security settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing & Payments</AccordionTrigger>
        <AccordionContent>
          View your billing history, update payment methods, and manage
          subscriptions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[450px]" defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>
          This accordion allows multiple items to be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>
          Both this and the first section can be open simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          Try opening multiple sections at once!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Accordion variant="bordered" className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={<InfoIcon className="size-5" />}>
          General Information
        </AccordionTrigger>
        <AccordionContent>
          Basic information about your account and profile.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={<UserIcon className="size-5" />}>
          Profile Settings
        </AccordionTrigger>
        <AccordionContent>
          Update your personal information, photo, and bio.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon={<CreditCardIcon className="size-5" />}>
          Billing
        </AccordionTrigger>
        <AccordionContent>
          Manage your payment methods and billing information.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger icon={<SettingsIcon className="size-5" />}>
          Advanced Settings
        </AccordionTrigger>
        <AccordionContent>
          Configure advanced options and preferences.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Small: Story = {
  render: () => (
    <Accordion size="sm" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Small Accordion</AccordionTrigger>
        <AccordionContent>
          This is a small accordion with compact spacing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          Perfect for sidebars and compact layouts.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Large: Story = {
  render: () => (
    <Accordion size="lg" className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Large Accordion</AccordionTrigger>
        <AccordionContent>
          This accordion has larger text and more spacious padding for
          better readability in featured sections.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Section</AccordionTrigger>
        <AccordionContent>
          Great for FAQs and documentation pages.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["item-1"]);

    return (
      <div className="w-[450px] space-y-4">
        <div className="flex gap-x-2">
          <button
            onClick={() => setValue(["item-1"])}
            className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          >
            Open First
          </button>
          <button
            onClick={() => setValue(["item-2"])}
            className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          >
            Open Second
          </button>
          <button
            onClick={() => setValue([])}
            className="rounded bg-muted px-3 py-1.5 text-sm"
          >
            Close All
          </button>
        </div>
        <Accordion value={value} onValueChange={setValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>Content of the first item.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>Content of the second item.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

export const NonCollapsible: Story = {
  render: () => (
    <Accordion className="w-[450px]" defaultValue={["item-1"]} collapsible={false}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Always One Open</AccordionTrigger>
        <AccordionContent>
          This accordion requires at least one item to be open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Click to Switch</AccordionTrigger>
        <AccordionContent>
          You can switch between items but cannot close all.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
