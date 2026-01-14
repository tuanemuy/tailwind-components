import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput } from "./index";

const meta: Meta<typeof SearchInput> = {
  title: "Molecules/SearchInput",
  component: SearchInput,
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

export const Default: Story = {
  args: {
    placeholder: "Search...",
    className: "w-[300px]",
  },
};

const ControlledSearchInput = () => {
  const [value, setValue] = useState("");

  return (
    <SearchInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
      placeholder="Search..."
      className="w-[300px]"
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledSearchInput />,
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Search...",
    className: "w-[250px]",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Search...",
    className: "w-[350px]",
  },
};

export const WithShortcut: Story = {
  args: {
    placeholder: "Search...",
    showShortcut: true,
    className: "w-[300px]",
  },
};

export const WithCustomShortcut: Story = {
  args: {
    placeholder: "Search...",
    showShortcut: true,
    shortcutKey: "/",
    className: "w-[300px]",
  },
};

export const Loading: Story = {
  args: {
    placeholder: "Search...",
    loading: true,
    className: "w-[300px]",
  },
};

const LoadingSearchDemo = () => {
  const [value, setValue] = useState("searching...");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <SearchInput
      value={value}
      onChange={handleChange}
      onClear={() => setValue("")}
      loading={loading}
      placeholder="Type to search..."
      className="w-[300px]"
    />
  );
};

export const InteractiveLoading: Story = {
  render: () => <LoadingSearchDemo />,
};

export const WithoutClearButton: Story = {
  args: {
    placeholder: "Search...",
    showClearButton: false,
    className: "w-[300px]",
  },
};
