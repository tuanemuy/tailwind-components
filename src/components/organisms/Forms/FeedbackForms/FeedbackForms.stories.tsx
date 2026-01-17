import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircleIcon,
  MessageSquareIcon,
  SmileIcon,
  ZapIcon,
} from "@/lib/icons";
import {
  type FeedbackCategory,
  FeedbackForm,
  NPSSurvey,
  QuickFeedback,
  RatingForm,
} from "./index";

const meta: Meta<typeof FeedbackForm> = {
  title: "Organisms/Forms/FeedbackForms",
  component: FeedbackForm,
  parameters: {
    layout: "centered",
  },
};

export default meta;

// =============================================================================
// FeedbackForm Stories
// =============================================================================

const feedbackCategories: FeedbackCategory[] = [
  {
    id: "bug",
    label: "Bug Report",
    description: "Something isn't working correctly",
    icon: <AlertCircleIcon className="size-5 text-destructive" />,
  },
  {
    id: "feature",
    label: "Feature Request",
    description: "Suggest a new feature or improvement",
    icon: <ZapIcon className="size-5 text-primary" />,
  },
  {
    id: "general",
    label: "General Feedback",
    description: "Share your thoughts with us",
    icon: <MessageSquareIcon className="size-5 text-muted-foreground" />,
  },
  {
    id: "praise",
    label: "Praise",
    description: "Tell us what you love",
    icon: <SmileIcon className="size-5 text-success" />,
  },
];

export const FeedbackFormDefault: StoryObj<typeof FeedbackForm> = {
  render: () => (
    <div className="w-[500px]">
      <FeedbackForm
        categories={feedbackCategories}
        onSubmit={(data) => console.log("Feedback:", data)}
        showEmailField
      />
    </div>
  ),
};

export const FeedbackFormCard: StoryObj<typeof FeedbackForm> = {
  render: () => (
    <div className="w-[500px]">
      <FeedbackForm
        variant="card"
        categories={feedbackCategories}
        onSubmit={(data) => console.log("Feedback:", data)}
        showEmailField
      />
    </div>
  ),
};

export const FeedbackFormSimple: StoryObj<typeof FeedbackForm> = {
  render: () => (
    <div className="w-[400px]">
      <FeedbackForm
        onSubmit={(data) => console.log("Feedback:", data)}
        placeholder="What's on your mind?"
        submitLabel="Send"
      />
    </div>
  ),
};

// =============================================================================
// RatingForm Stories
// =============================================================================

export const RatingFormStars: StoryObj<typeof RatingForm> = {
  render: () => (
    <div className="w-[400px]">
      <RatingForm
        type="stars"
        question="How would you rate your experience?"
        onSubmit={(data) => console.log("Rating:", data)}
      />
    </div>
  ),
};

export const RatingFormEmoji: StoryObj<typeof RatingForm> = {
  render: () => (
    <div className="w-[400px]">
      <RatingForm
        type="emoji"
        question="How are you feeling today?"
        labels={{ low: "Very unhappy", high: "Very happy" }}
        onSubmit={(data) => console.log("Rating:", data)}
      />
    </div>
  ),
};

export const RatingFormNumeric: StoryObj<typeof RatingForm> = {
  render: () => (
    <div className="w-[500px]">
      <RatingForm
        type="numeric"
        maxRating={10}
        question="Rate this feature from 1-10"
        labels={{ low: "Not useful", high: "Very useful" }}
        onSubmit={(data) => console.log("Rating:", data)}
      />
    </div>
  ),
};

export const RatingFormThumbs: StoryObj<typeof RatingForm> = {
  render: () => (
    <div className="w-[400px]">
      <RatingForm
        type="thumbs"
        question="Did this article help you?"
        onSubmit={(data) => console.log("Rating:", data)}
        showComment={false}
      />
    </div>
  ),
};

export const RatingFormCard: StoryObj<typeof RatingForm> = {
  render: () => (
    <div className="w-[450px]">
      <RatingForm
        variant="card"
        type="stars"
        question="How would you rate our service?"
        onSubmit={(data) => console.log("Rating:", data)}
      />
    </div>
  ),
};

// =============================================================================
// NPSSurvey Stories
// =============================================================================

export const NPSSurveyDefault: StoryObj<typeof NPSSurvey> = {
  render: () => (
    <div className="w-[600px]">
      <NPSSurvey onSubmit={(data) => console.log("NPS:", data)} />
    </div>
  ),
};

export const NPSSurveyCard: StoryObj<typeof NPSSurvey> = {
  render: () => (
    <div className="w-[600px]">
      <NPSSurvey
        variant="card"
        onSubmit={(data) => console.log("NPS:", data)}
      />
    </div>
  ),
};

export const NPSSurveyCustomQuestion: StoryObj<typeof NPSSurvey> = {
  render: () => (
    <div className="w-[600px]">
      <NPSSurvey
        variant="card"
        question="How likely are you to recommend our product to others?"
        followUpQuestions={{
          detractor: "What disappointed you about our product?",
          passive: "What could we improve to make you love our product?",
          promoter: "What made you love our product?",
        }}
        onSubmit={(data) => console.log("NPS:", data)}
      />
    </div>
  ),
};

export const NPSSurveyNoFollowup: StoryObj<typeof NPSSurvey> = {
  render: () => (
    <div className="w-[600px]">
      <NPSSurvey
        showFollowUp={false}
        onSubmit={(data) => console.log("NPS:", data)}
      />
    </div>
  ),
};

// =============================================================================
// QuickFeedback Stories
// =============================================================================

export const QuickFeedbackDefault: StoryObj<typeof QuickFeedback> = {
  render: () => (
    <div className="p-4 rounded-xl border border-border bg-card">
      <p className="text-sm mb-4">
        This is some content that the user might find helpful or not.
      </p>
      <QuickFeedback
        onFeedback={(positive) => console.log("Positive:", positive)}
      />
    </div>
  ),
};

export const QuickFeedbackCustomLabels: StoryObj<typeof QuickFeedback> = {
  render: () => (
    <div className="p-4 rounded-xl border border-border bg-card">
      <QuickFeedback
        question="Did you find what you were looking for?"
        positiveLabel="Found it"
        negativeLabel="Not yet"
        onFeedback={(positive) => console.log("Positive:", positive)}
      />
    </div>
  ),
};

// =============================================================================
// Combined Examples
// =============================================================================

export const FeedbackWidget: StoryObj<typeof FeedbackForm> = {
  render: () => (
    <div className="w-[350px] rounded-xl border border-border bg-card shadow-lg overflow-hidden">
      <div className="p-4 bg-primary text-primary-foreground">
        <h3 className="font-semibold">Send us feedback</h3>
        <p className="text-sm opacity-80">We'd love to hear from you</p>
      </div>
      <div className="p-4">
        <FeedbackForm
          variant="inline"
          onSubmit={(data) => console.log("Feedback:", data)}
          placeholder="What's on your mind?"
          submitLabel="Send"
        />
      </div>
    </div>
  ),
};

export const ProductFeedbackFlow: StoryObj<typeof RatingForm> = {
  render: () => (
    <div className="w-[500px] space-y-8">
      {/* Step 1: Quick Rating */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Step 1: Quick Rating</h3>
        <RatingForm
          type="thumbs"
          question="Did this feature meet your expectations?"
          showComment={false}
          onSubmit={(data) => console.log("Step 1:", data)}
        />
      </div>

      {/* Step 2: Detailed Rating */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Step 2: Rate Your Experience</h3>
        <RatingForm
          type="stars"
          question="How would you rate this feature overall?"
          onSubmit={(data) => console.log("Step 2:", data)}
        />
      </div>

      {/* Step 3: NPS */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Step 3: Recommendation</h3>
        <NPSSurvey
          question="Would you recommend this feature to a colleague?"
          onSubmit={(data) => console.log("Step 3:", data)}
        />
      </div>
    </div>
  ),
};

export const InlineHelpfulFeedback: StoryObj<typeof QuickFeedback> = {
  render: () => (
    <div className="w-[600px] space-y-6">
      {/* Article content */}
      <div className="prose prose-sm">
        <h2>How to Get Started</h2>
        <p>
          Follow these steps to set up your account and start using our
          platform. First, create your profile by clicking the "Sign Up" button.
          Then, verify your email address to activate your account.
        </p>
        <p>
          Once your account is active, you can explore all the features
          available in your dashboard. We recommend starting with the tutorial
          to get familiar with the interface.
        </p>
      </div>

      {/* Feedback prompt */}
      <div className="border-t border-border pt-4">
        <QuickFeedback
          question="Was this article helpful?"
          onFeedback={(positive) => {
            if (!positive) {
              console.log("Show detailed feedback form");
            }
          }}
        />
      </div>
    </div>
  ),
};
