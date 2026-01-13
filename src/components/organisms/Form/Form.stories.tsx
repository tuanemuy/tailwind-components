import type { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormHeader,
  FormBody,
  FormSection,
  FormRow,
  FormActions,
  FormDivider,
  SubmitButton,
} from "./index";
import { FormField, Select } from "@/components/molecules";
import { Button, Checkbox, Radio } from "@/components/atoms";

const meta: Meta<typeof Form> = {
  title: "Organisms/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

// Basic Form
export const Default: Story = {
  render: () => (
    <Form className="w-full max-w-md" onSubmit={(e) => console.log("Form submitted", e)}>
      <FormBody>
        <FormField label="Email" type="email" required inputProps={{ placeholder: "Enter your email" }} />
        <FormField label="Password" type="password" required inputProps={{ placeholder: "Enter your password" }} />
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <label htmlFor="remember" className="text-sm text-foreground">Remember me</label>
        </div>
      </FormBody>
      <FormActions>
        <SubmitButton>Sign In</SubmitButton>
      </FormActions>
    </Form>
  ),
};

// Card Variant Form
export const CardVariant: Story = {
  render: () => (
    <Form variant="card" className="w-full max-w-lg" onSubmit={(e) => console.log("Form submitted", e)}>
      <FormHeader
        title="Organization"
        description="Fill in the organization details"
      />
      <FormBody>
        <FormField
          label="Vendor"
          inputProps={{ placeholder: "eg. Nike" }}
        />
        <Select
          options={[
            { value: "clothing", label: "Clothing" },
            { value: "shoes", label: "Shoes" },
            { value: "electronics", label: "Electronics" },
            { value: "others", label: "Others" },
          ]}
          placeholder="Select category"
        />
        <Select
          options={[
            { value: "winter", label: "Winter" },
            { value: "spring", label: "Spring" },
            { value: "summer", label: "Summer" },
            { value: "autumn", label: "Autumn" },
          ]}
          placeholder="Select collection"
        />
        <FormField
          label="Tags"
          helpText="Separate multiple tags with commas"
          inputProps={{ placeholder: "Enter tags" }}
        />
      </FormBody>
      <FormActions bordered>
        <Button variant="outline">Cancel</Button>
        <SubmitButton>Save</SubmitButton>
      </FormActions>
    </Form>
  ),
};

// Form with Sections
export const WithSections: Story = {
  render: () => (
    <Form variant="card" className="w-full max-w-2xl" onSubmit={(e) => console.log("Form submitted", e)}>
      <FormHeader title="Create Account" />
      <FormBody>
        <FormSection title="Personal Information" description="Enter your personal details">
          <FormRow>
            <FormField label="First Name" required inputProps={{ placeholder: "John" }} />
            <FormField label="Last Name" required inputProps={{ placeholder: "Doe" }} />
          </FormRow>
          <FormField label="Email" type="email" required inputProps={{ placeholder: "john@example.com" }} />
        </FormSection>

        <FormDivider />

        <FormSection title="Address" description="Enter your shipping address">
          <FormField label="Street Address" inputProps={{ placeholder: "123 Main St" }} />
          <FormRow>
            <FormField label="City" inputProps={{ placeholder: "New York" }} />
            <FormField label="State" inputProps={{ placeholder: "NY" }} />
          </FormRow>
          <FormRow>
            <FormField label="ZIP Code" inputProps={{ placeholder: "10001" }} />
            <FormField label="Country" inputProps={{ placeholder: "United States" }} />
          </FormRow>
        </FormSection>
      </FormBody>
      <FormActions bordered>
        <Button variant="outline">Cancel</Button>
        <SubmitButton>Create Account</SubmitButton>
      </FormActions>
    </Form>
  ),
};

// Grid Layout Form
export const GridLayout: Story = {
  render: () => (
    <Form variant="card" className="w-full max-w-3xl" onSubmit={(e) => console.log("Form submitted", e)}>
      <FormHeader title="Product Details" />
      <FormBody columns={2} gap="md">
        <FormField label="Product Name" required inputProps={{ placeholder: "Enter product name" }} />
        <FormField label="SKU" inputProps={{ placeholder: "ABC-12345" }} />
        <FormField label="Price" type="number" inputProps={{ placeholder: "0.00" }} />
        <FormField label="Quantity" type="number" inputProps={{ placeholder: "0" }} />
        <div className="sm:col-span-2">
          <FormField
            label="Description"
            multiline
            inputProps={{ placeholder: "Enter product description", rows: 4 }}
          />
        </div>
      </FormBody>
      <FormActions bordered>
        <Button variant="outline">Cancel</Button>
        <Button variant="secondary">Save as Draft</Button>
        <SubmitButton>Publish</SubmitButton>
      </FormActions>
    </Form>
  ),
};

// Inline Form
export const InlineVariant: Story = {
  render: () => (
    <Form variant="inline" className="w-full max-w-2xl" onSubmit={(e) => console.log("Form submitted", e)}>
      <div className="flex-1 min-w-[200px]">
        <FormField
          label="Search"
          inputProps={{ placeholder: "Search products..." }}
        />
      </div>
      <div className="w-48">
        <Select
          options={[
            { value: "all", label: "All Categories" },
            { value: "clothing", label: "Clothing" },
            { value: "electronics", label: "Electronics" },
          ]}
          defaultValue="all"
        />
      </div>
      <SubmitButton>Search</SubmitButton>
    </Form>
  ),
};

// Form with Radio Groups
export const WithRadioGroup: Story = {
  render: () => (
    <Form variant="card" className="w-full max-w-lg" onSubmit={(e) => console.log("Form submitted", e)}>
      <FormHeader title="Shipping Method" />
      <FormBody>
        <FormSection>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <Radio name="shipping" value="standard" className="mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Standard Shipping</div>
                <div className="text-sm text-muted-foreground">5-7 business days - Free</div>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <Radio name="shipping" value="express" className="mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Express Shipping</div>
                <div className="text-sm text-muted-foreground">2-3 business days - $9.99</div>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <Radio name="shipping" value="overnight" className="mt-0.5" />
              <div>
                <div className="font-medium text-foreground">Overnight Shipping</div>
                <div className="text-sm text-muted-foreground">Next business day - $19.99</div>
              </div>
            </label>
          </div>
        </FormSection>
      </FormBody>
      <FormActions bordered>
        <Button variant="outline">Back</Button>
        <SubmitButton>Continue to Payment</SubmitButton>
      </FormActions>
    </Form>
  ),
};

// Form with Validation Errors
export const WithErrors: Story = {
  render: () => (
    <Form variant="card" className="w-full max-w-md" onSubmit={(e) => console.log("Form submitted", e)}>
      <FormHeader title="Sign Up" />
      <FormBody>
        <FormField
          label="Email"
          type="email"
          required
          error="Please enter a valid email address"
          inputProps={{ placeholder: "Enter your email", defaultValue: "invalid-email" }}
        />
        <FormField
          label="Password"
          type="password"
          required
          error="Password must be at least 8 characters"
          inputProps={{ placeholder: "Enter your password", defaultValue: "123" }}
        />
        <FormField
          label="Confirm Password"
          type="password"
          required
          inputProps={{ placeholder: "Confirm your password" }}
        />
      </FormBody>
      <FormActions bordered>
        <SubmitButton>Sign Up</SubmitButton>
      </FormActions>
    </Form>
  ),
};

// Disabled Form
export const Disabled: Story = {
  render: () => (
    <Form
      variant="card"
      className="w-full max-w-md"
      disabled
      onSubmit={(e) => console.log("Form submitted", e)}
    >
      <FormHeader title="Disabled Form" description="This form is currently disabled" />
      <FormBody>
        <FormField
          label="Name"
          inputProps={{ placeholder: "Enter your name", disabled: true }}
        />
        <FormField
          label="Email"
          type="email"
          inputProps={{ placeholder: "Enter your email", disabled: true }}
        />
      </FormBody>
      <FormActions bordered>
        <SubmitButton loading loadingText="Processing...">Submit</SubmitButton>
      </FormActions>
    </Form>
  ),
};

// Form with Divider Labels
export const WithDividerLabels: Story = {
  render: () => (
    <Form className="w-full max-w-md" onSubmit={(e) => console.log("Form submitted", e)}>
      <FormBody>
        <FormField label="Email" type="email" required inputProps={{ placeholder: "Enter your email" }} />
        <FormField label="Password" type="password" required inputProps={{ placeholder: "Enter your password" }} />
        <SubmitButton className="w-full">Sign In with Email</SubmitButton>

        <FormDivider label="Or continue with" />

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <svg className="size-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <svg className="size-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Button>
        </div>
      </FormBody>
    </Form>
  ),
};
