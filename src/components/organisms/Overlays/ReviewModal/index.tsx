import { forwardRef, type ReactNode, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Textarea } from "@/components/atoms/Textarea";
import { Rating } from "@/components/molecules/Rating";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; review: string }) => void;
  title?: string;
  subtitle?: ReactNode;
  itemName?: string;
  itemImage?: string;
  initialRating?: number;
  initialReview?: string;
  maxRating?: number;
  placeholder?: string;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  requireReview?: boolean;
  minReviewLength?: number;
  className?: string;
}

export const ReviewModal = forwardRef<HTMLDivElement, ReviewModalProps>(
  (
    {
      isOpen,
      onClose,
      onSubmit,
      title = "Write a review",
      subtitle,
      itemName,
      itemImage,
      initialRating = 0,
      initialReview = "",
      maxRating = 5,
      placeholder = "Share your experience...",
      submitText = "Submit review",
      cancelText = "Cancel",
      loading,
      requireReview = false,
      minReviewLength = 0,
      className,
    },
    ref,
  ) => {
    const [rating, setRating] = useState(initialRating);
    const [review, setReview] = useState(initialReview);

    const canSubmit =
      rating > 0 && (!requireReview || review.trim().length >= minReviewLength);

    const handleSubmit = () => {
      if (canSubmit) {
        onSubmit({ rating, review: review.trim() });
      }
    };

    const handleClose = () => {
      setRating(initialRating);
      setReview(initialReview);
      onClose();
    };

    const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-6">
            {/* Item info */}
            {(itemImage || itemName) && (
              <div className="flex items-center gap-3">
                {itemImage && (
                  <img
                    src={itemImage}
                    alt={itemName || "Item"}
                    className="size-16 rounded-lg border border-border object-cover"
                  />
                )}
                {itemName && (
                  <p className="font-medium text-foreground">{itemName}</p>
                )}
              </div>
            )}

            {/* Rating */}
            <div className="space-y-2">
              <span className="block text-sm font-medium text-foreground">
                Rating
              </span>
              <div className="flex items-center gap-3">
                <Rating
                  value={rating}
                  onChange={setRating}
                  max={maxRating}
                  size="lg"
                />
                {rating > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {ratingLabels[rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Review text */}
            <div className="space-y-2">
              <label
                htmlFor="review-textarea"
                className="block text-sm font-medium text-foreground"
              >
                Review{" "}
                {requireReview && <span className="text-destructive">*</span>}
              </label>
              <Textarea
                id="review-textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={placeholder}
                rows={4}
                disabled={loading}
              />
              {requireReview && minReviewLength > 0 && (
                <p className="text-xs text-muted-foreground">
                  Minimum {minReviewLength} characters
                  {review.length > 0 &&
                    ` (${review.length}/${minReviewLength})`}
                </p>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!canSubmit}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
ReviewModal.displayName = "ReviewModal";

// ProductReviewModal - Convenience component for product reviews
export interface ProductReviewModalProps
  extends Omit<ReviewModalProps, "title"> {
  productName: string;
  productImage?: string;
}

export const ProductReviewModal = forwardRef<
  HTMLDivElement,
  ProductReviewModalProps
>(({ productName, productImage, ...props }, ref) => {
  return (
    <ReviewModal
      ref={ref}
      title="Review this product"
      itemName={productName}
      itemImage={productImage}
      {...props}
    />
  );
});
ProductReviewModal.displayName = "ProductReviewModal";
