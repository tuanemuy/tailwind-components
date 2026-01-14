import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ComboBox } from "./index";
import type { ComboBoxOption } from "./index";

const meta: Meta<typeof ComboBox> = {
  title: "Molecules/ComboBox",
  component: ComboBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks: ComboBoxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "qwik", label: "Qwik" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-[250px]">
        <ComboBox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Select framework"
        />
      </div>
    );
  },
};

export const WithSelectedValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>("react");
    return (
      <div className="w-[250px]">
        <ComboBox
          options={frameworks}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-[200px]">
        <ComboBox
          options={frameworks}
          value={value}
          onChange={setValue}
          size="sm"
        />
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-[300px]">
        <ComboBox
          options={frameworks}
          value={value}
          onChange={setValue}
          size="lg"
        />
      </div>
    );
  },
};

const countries: ComboBoxOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
];

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-[250px]">
        <ComboBox
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Select country"
          searchPlaceholder="Search countries..."
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    const options: ComboBoxOption[] = [
      { value: "free", label: "Free Plan" },
      { value: "pro", label: "Pro Plan" },
      { value: "enterprise", label: "Enterprise (Contact Sales)", disabled: true },
    ];

    return (
      <div className="w-[250px]">
        <ComboBox
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Select plan"
        />
      </div>
    );
  },
};

export const NotSearchable: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-[250px]">
        <ComboBox
          options={frameworks}
          value={value}
          onChange={setValue}
          searchable={false}
          placeholder="Select framework"
        />
      </div>
    );
  },
};

export const CustomMessages: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-[250px]">
        <ComboBox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="フレームワークを選択"
          searchPlaceholder="検索..."
          emptyMessage="見つかりませんでした"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[250px]">
      <ComboBox
        options={frameworks}
        value="react"
        disabled
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [framework, setFramework] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    return (
      <div className="w-[300px] space-y-4 rounded-lg border border-border p-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Framework</label>
          <ComboBox
            options={frameworks}
            value={framework}
            onChange={setFramework}
            placeholder="Select framework"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Country</label>
          <ComboBox
            options={countries}
            value={country}
            onChange={setCountry}
            placeholder="Select country"
          />
        </div>
        {(framework || country) && (
          <div className="rounded-md bg-muted p-2 text-sm">
            <p>Framework: {framework || "Not selected"}</p>
            <p>Country: {country || "Not selected"}</p>
          </div>
        )}
      </div>
    );
  },
};
