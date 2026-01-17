import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms";
import {
  CheckCircleIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@/components/icons";
import { Step, Stepper } from "./index";

const meta: Meta<typeof Stepper> = {
  title: "Molecules/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
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
    <Stepper currentStep={1} className="w-[600px]">
      <Step label="Account" description="Create your account" />
      <Step label="Profile" description="Set up your profile" />
      <Step label="Complete" description="Finish setup" />
    </Stepper>
  ),
};

export const Completed: Story = {
  render: () => (
    <Stepper currentStep={3} className="w-[600px]">
      <Step label="Account" description="Create your account" />
      <Step label="Profile" description="Set up your profile" />
      <Step label="Complete" description="Finish setup" />
    </Stepper>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stepper currentStep={1} className="w-[600px]">
      <Step
        label="Account"
        description="Create your account"
        icon={<UserIcon className="size-full" />}
      />
      <Step
        label="Payment"
        description="Add payment method"
        icon={<CreditCardIcon className="size-full" />}
      />
      <Step
        label="Complete"
        description="Finish setup"
        icon={<CheckCircleIcon className="size-full" />}
      />
    </Stepper>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stepper orientation="vertical" currentStep={2}>
      <Step label="Order Placed" description="Your order has been placed" />
      <Step label="Processing" description="We are preparing your order" />
      <Step label="Shipped" description="Your order is on the way" />
      <Step label="Delivered" description="Order delivered" />
    </Stepper>
  ),
};

export const VerticalWithIcons: Story = {
  render: () => (
    <Stepper orientation="vertical" currentStep={1}>
      <Step
        label="Cart"
        description="Review items in your cart"
        icon={<ShoppingBagIcon className="size-full" />}
      />
      <Step
        label="Payment"
        description="Enter payment details"
        icon={<CreditCardIcon className="size-full" />}
      />
      <Step
        label="Confirmation"
        description="Order confirmed"
        icon={<CheckCircleIcon className="size-full" />}
      />
    </Stepper>
  ),
};

export const Small: Story = {
  render: () => (
    <Stepper currentStep={1} size="sm" className="w-[500px]">
      <Step label="Step 1" />
      <Step label="Step 2" />
      <Step label="Step 3" />
      <Step label="Step 4" />
    </Stepper>
  ),
};

export const Large: Story = {
  render: () => (
    <Stepper currentStep={1} size="lg" className="w-[700px]">
      <Step label="Account" description="Create your account" />
      <Step label="Profile" description="Set up your profile" />
      <Step label="Complete" description="Finish setup" />
    </Stepper>
  ),
};

export const WithError: Story = {
  render: () => (
    <Stepper currentStep={2} className="w-[600px]">
      <Step label="Account" description="Create your account" />
      <Step label="Payment" description="Payment failed" status="error" />
      <Step label="Complete" description="Finish setup" />
    </Stepper>
  ),
};

const InteractiveStepperDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Set up your profile" },
    { label: "Preferences", description: "Configure settings" },
    { label: "Complete", description: "All done!" },
  ];

  return (
    <div className="w-[700px] space-y-8">
      <Stepper currentStep={currentStep}>
        {steps.map((step) => (
          <Step
            key={step.label}
            label={step.label}
            description={step.description}
          />
        ))}
      </Stepper>

      <div className="rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold">{steps[currentStep].label}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {steps[currentStep].description}
        </p>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveStepperDemo />,
};
