import type { Meta, StoryObj } from "@storybook/react";
import { SurveyDataWithVerticalProgressBar } from "./index";

const meta: Meta<typeof SurveyDataWithVerticalProgressBar> = {
  title: "DataCards/SurveyDataWithVerticalProgressBar",
  component: SurveyDataWithVerticalProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SatisfactionSurvey: Story = {
  args: {
    question: "How satisfied are you with our service?",
    questionType: "Satisfaction scale",
    totalResponses: 100,
    average: 4.2,
    leftLabel: "Very Dissatisfied",
    rightLabel: "Very Satisfied",
    options: [
      { value: 1, responseCount: 5, percentage: 10 },
      { value: 2, responseCount: 8, percentage: 16 },
      { value: 3, responseCount: 15, percentage: 30 },
      { value: 4, responseCount: 35, percentage: 70 },
      { value: 5, responseCount: 37, percentage: 74 },
    ],
  },
};

export const LikelihoodScale: Story = {
  args: {
    question: "How likely are you to recommend us to a friend?",
    questionType: "NPS scale",
    totalResponses: 80,
    average: 4.5,
    leftLabel: "Not Likely",
    rightLabel: "Very Likely",
    options: [
      { value: 1, responseCount: 2, percentage: 5 },
      { value: 2, responseCount: 3, percentage: 8 },
      { value: 3, responseCount: 10, percentage: 25 },
      { value: 4, responseCount: 25, percentage: 62 },
      { value: 5, responseCount: 40, percentage: 100 },
    ],
  },
};
