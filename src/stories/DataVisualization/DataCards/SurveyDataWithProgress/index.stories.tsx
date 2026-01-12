import type { Meta, StoryObj } from "@storybook/react";
import { SurveyDataWithProgress } from "./index";

const meta: Meta<typeof SurveyDataWithProgress> = {
  title: "DataCards/SurveyDataWithProgress",
  component: SurveyDataWithProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomQuestion: Story = {
  args: {
    question: "What is your preferred programming language?",
    questionType: "Single choice",
    totalResponses: 120,
    options: [
      { label: "TypeScript", percentage: 35, responseCount: 42 },
      { label: "JavaScript", percentage: 28, responseCount: 34 },
      { label: "Python", percentage: 20, responseCount: 24 },
      { label: "Go", percentage: 12, responseCount: 14 },
      { label: "Rust", percentage: 5, responseCount: 6 },
    ],
  },
};

export const TwoOptions: Story = {
  args: {
    question: "Do you use dark mode?",
    questionType: "Yes/No",
    totalResponses: 50,
    options: [
      { label: "Yes", percentage: 72, responseCount: 36 },
      { label: "No", percentage: 28, responseCount: 14 },
    ],
  },
};
