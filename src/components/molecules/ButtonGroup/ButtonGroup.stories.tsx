import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./index";
import { Button } from "@/components/atoms";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";

const meta: Meta<typeof ButtonGroup> = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["attached", "separated"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Attached: Story = {
  render: () => (
    <ButtonGroup variant="attached">
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Separated: Story = {
  render: () => (
    <ButtonGroup variant="separated">
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup variant="attached" orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const VerticalSeparated: Story = {
  render: () => (
    <ButtonGroup variant="separated" orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup variant="attached">
      <Button variant="outline" leftIcon={<ChevronLeftIcon className="size-4" />}>
        Previous
      </Button>
      <Button variant="outline" rightIcon={<ChevronRightIcon className="size-4" />}>
        Next
      </Button>
    </ButtonGroup>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup variant="attached">
        <Button variant="primary">Save</Button>
        <Button variant="primary">
          <ChevronRightIcon className="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="attached">
        <Button variant="secondary">Edit</Button>
        <Button variant="secondary">Delete</Button>
        <Button variant="secondary">Share</Button>
      </ButtonGroup>
    </div>
  ),
};
