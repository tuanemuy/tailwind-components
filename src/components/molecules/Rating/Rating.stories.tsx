import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Rating, RatingDisplay } from "./index";

const meta: Meta<typeof Rating> = {
  title: "Molecules/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    max: {
      control: { type: "number", min: 1, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return <Rating value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState(4);
    return <Rating value={value} onChange={setValue} showValue />;
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return <Rating value={value} onChange={setValue} size="sm" showValue />;
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState(4);
    return <Rating value={value} onChange={setValue} size="lg" showValue />;
  },
};

export const ExtraLarge: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return <Rating value={value} onChange={setValue} size="xl" showValue />;
  },
};

export const ReadOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={4.5} readonly showValue />
      <Rating value={3} readonly size="lg" />
    </div>
  ),
};

export const CustomMax: Story = {
  render: () => {
    const [value, setValue] = useState(7);
    return <Rating value={value} onChange={setValue} max={10} showValue />;
  },
};

export const DisplayVariant: Story = {
  render: () => (
    <div className="space-y-4">
      <RatingDisplay value={4.5} label="Excellent" />
      <RatingDisplay value={3.8} count={128} />
      <RatingDisplay value={4.2} label="Great product" count={1024} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const labels: Record<number, string> = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };

    return (
      <div className="space-y-4">
        <Rating value={value} onChange={setValue} size="lg" />
        <div className="text-center">
          <p className="text-lg font-medium">
            {value > 0 ? labels[value] : "Click to rate"}
          </p>
          {value > 0 && (
            <p className="text-sm text-muted-foreground">
              You rated {value} out of 5 stars
            </p>
          )}
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-x-4">
        <span className="w-20 text-sm text-muted-foreground">Small</span>
        <Rating value={4} readonly size="sm" />
      </div>
      <div className="flex items-center gap-x-4">
        <span className="w-20 text-sm text-muted-foreground">Medium</span>
        <Rating value={4} readonly size="md" />
      </div>
      <div className="flex items-center gap-x-4">
        <span className="w-20 text-sm text-muted-foreground">Large</span>
        <Rating value={4} readonly size="lg" />
      </div>
      <div className="flex items-center gap-x-4">
        <span className="w-20 text-sm text-muted-foreground">XL</span>
        <Rating value={4} readonly size="xl" />
      </div>
    </div>
  ),
};

export const ProductReview: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      if (rating > 0) {
        setSubmitted(true);
      }
    };

    if (submitted) {
      return (
        <div className="w-[300px] rounded-lg border border-border p-6 text-center">
          <p className="text-lg font-medium">Thank you!</p>
          <p className="text-sm text-muted-foreground">
            You rated this product {rating} stars
          </p>
          <Rating value={rating} readonly className="mt-4 justify-center" />
        </div>
      );
    }

    return (
      <div className="w-[300px] space-y-4 rounded-lg border border-border p-6">
        <div className="text-center">
          <p className="font-medium">How would you rate this product?</p>
          <p className="text-sm text-muted-foreground">
            Your feedback helps us improve
          </p>
        </div>
        <Rating
          value={rating}
          onChange={setRating}
          size="lg"
          className="justify-center"
        />
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Submit Review
        </button>
      </div>
    );
  },
};

export const ReviewSummary: Story = {
  render: () => (
    <div className="w-[300px] space-y-4 rounded-lg border border-border p-6">
      <div className="flex items-center gap-x-4">
        <span className="text-4xl font-bold">4.5</span>
        <div>
          <Rating value={4.5} readonly size="sm" />
          <p className="text-sm text-muted-foreground">Based on 1,234 reviews</p>
        </div>
      </div>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-x-2">
            <span className="w-3 text-sm">{stars}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-warning"
                style={{
                  width:
                    stars === 5
                      ? "65%"
                      : stars === 4
                        ? "20%"
                        : stars === 3
                          ? "10%"
                          : stars === 2
                            ? "3%"
                            : "2%",
                }}
              />
            </div>
            <span className="w-8 text-right text-sm text-muted-foreground">
              {stars === 5 ? "65%" : stars === 4 ? "20%" : stars === 3 ? "10%" : stars === 2 ? "3%" : "2%"}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
