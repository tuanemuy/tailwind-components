import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ReviewModal, ProductReviewModal } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof ReviewModal> = {
  title: "Organisms/Overlays/ReviewModal",
  component: ReviewModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReviewModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Write a Review</Button>
        <ReviewModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => {
            console.log("Review submitted:", data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const ProductReview: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Review Product</Button>
        <ProductReviewModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => {
            console.log("Review submitted:", data);
            setIsOpen(false);
          }}
          productName="Wireless Headphones"
          productImage="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100"
        />
      </>
    );
  },
};

export const EditReview: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Edit Review</Button>
        <ReviewModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => {
            console.log("Review updated:", data);
            setIsOpen(false);
          }}
          title="Edit Review"
          submitText="Update Review"
          initialRating={4}
          initialReview="I really enjoyed using this product. The quality is excellent and it exceeded my expectations."
        />
      </>
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsOpen(false);
      }, 2000);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Submit Review</Button>
        <ReviewModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </>
    );
  },
};
