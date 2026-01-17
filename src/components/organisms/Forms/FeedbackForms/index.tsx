"use client";

import type { VariantProps } from "class-variance-authority";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/Textarea";
import { Rating } from "@/components/molecules/Rating";
import {
  CheckCircleIcon,
  HeartIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import {
  feedbackCategoryVariants,
  feedbackFormVariants,
  npsLabelVariants,
  npsScaleVariants,
  npsScoreVariants,
  npsSurveyVariants,
  ratingFormVariants,
  ratingScaleItemVariants,
  ratingScaleVariants,
  thankYouVariants,
} from "@/components/variants";

// =============================================================================
// FeedbackForm
// =============================================================================

export type FeedbackCategory = {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
};

export interface FeedbackFormProps
  extends VariantProps<typeof feedbackFormVariants> {
  categories?: FeedbackCategory[];
  onSubmit?: (data: {
    category?: string;
    message: string;
    email?: string;
  }) => void;
  showEmailField?: boolean;
  placeholder?: string;
  submitLabel?: string;
  className?: string;
}

export function FeedbackForm({
  categories,
  onSubmit,
  showEmailField = false,
  placeholder = "Tell us what you think...",
  submitLabel = "Send Feedback",
  variant,
  className,
}: FeedbackFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ category: selectedCategory, message, email });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={cn(thankYouVariants({ variant: "default" }), className)}>
        <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircleIcon className="size-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold">Thank you for your feedback!</h3>
        <p className="text-muted-foreground">
          We appreciate you taking the time to share your thoughts with us.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setMessage("");
            setSelectedCategory(undefined);
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(feedbackFormVariants({ variant }), className)}
    >
      {categories && categories.length > 0 && (
        <div>
          <Label className="mb-3 block">What is this about?</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={cn(
                  feedbackCategoryVariants({
                    variant:
                      selectedCategory === category.id ? "selected" : "default",
                  }),
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon && (
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    {category.icon}
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium">{category.label}</p>
                  {category.description && (
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="feedback-message">Your feedback</Label>
        <Textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          rows={4}
          required
        />
      </div>

      {showEmailField && (
        <div>
          <Label htmlFor="feedback-email">Email (optional)</Label>
          <Input
            id="feedback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <p className="text-xs text-muted-foreground mt-1">
            We&apos;ll only use this to follow up on your feedback
          </p>
        </div>
      )}

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}

// =============================================================================
// RatingForm
// =============================================================================

export type RatingType = "stars" | "emoji" | "numeric" | "thumbs";

export interface RatingFormProps
  extends VariantProps<typeof ratingFormVariants> {
  type?: RatingType;
  question?: string;
  labels?: { low?: string; high?: string };
  maxRating?: number;
  onSubmit?: (data: { rating: number; comment?: string }) => void;
  showComment?: boolean;
  submitLabel?: string;
  className?: string;
}

export function RatingForm({
  type = "stars",
  question = "How would you rate your experience?",
  labels = { low: "Poor", high: "Excellent" },
  maxRating = 5,
  onSubmit,
  showComment = true,
  submitLabel = "Submit Rating",
  variant,
  className,
}: RatingFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating !== null) {
      onSubmit?.({ rating, comment });
      setIsSubmitted(true);
    }
  };

  const emojis = ["😞", "😕", "😐", "🙂", "😄"];
  const thumbsOptions = [
    { value: 0, icon: <ThumbsDownIcon className="size-6" />, label: "No" },
    { value: 1, icon: <ThumbsUpIcon className="size-6" />, label: "Yes" },
  ];

  if (isSubmitted) {
    return (
      <div className={cn(thankYouVariants({ variant: "default" }), className)}>
        <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircleIcon className="size-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold">Thank you!</h3>
        <p className="text-muted-foreground">Your rating has been submitted.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(ratingFormVariants({ variant }), className)}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold">{question}</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        {type === "stars" && (
          <Rating
            value={rating || 0}
            onChange={setRating}
            max={maxRating}
            size="lg"
          />
        )}

        {type === "emoji" && (
          <div className={cn(ratingScaleVariants({ variant: "emoji" }))}>
            {emojis.slice(0, maxRating).map((emoji, index) => (
              <button
                key={emoji}
                type="button"
                className={cn(
                  ratingScaleItemVariants({
                    variant: rating === index + 1 ? "selected" : "emoji",
                  }),
                )}
                onClick={() => setRating(index + 1)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {type === "numeric" && (
          <div className={cn(ratingScaleVariants({ variant: "numeric" }))}>
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                className={cn(
                  ratingScaleItemVariants({
                    variant: rating === num ? "selected" : "numeric",
                  }),
                )}
                onClick={() => setRating(num)}
              >
                {num}
              </button>
            ))}
          </div>
        )}

        {type === "thumbs" && (
          <div className="flex gap-4">
            {thumbsOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border border-border p-6 transition-all",
                  rating === option.value
                    ? "border-primary bg-primary/10"
                    : "hover:border-primary hover:bg-primary/5",
                )}
                onClick={() => setRating(option.value)}
              >
                {option.icon}
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {labels && type !== "thumbs" && (
          <div className="flex w-full justify-between text-sm text-muted-foreground">
            <span>{labels.low}</span>
            <span>{labels.high}</span>
          </div>
        )}
      </div>

      {showComment && (
        <div>
          <Label htmlFor="rating-comment">Additional comments (optional)</Label>
          <Textarea
            id="rating-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience..."
            rows={3}
          />
        </div>
      )}

      <Button type="submit" className="w-full" disabled={rating === null}>
        {submitLabel}
      </Button>
    </form>
  );
}

// =============================================================================
// NPSSurvey
// =============================================================================

export interface NPSSurveyProps extends VariantProps<typeof npsSurveyVariants> {
  question?: string;
  onSubmit?: (data: { score: number; reason?: string }) => void;
  showFollowUp?: boolean;
  followUpQuestions?: {
    detractor?: string;
    passive?: string;
    promoter?: string;
  };
  className?: string;
}

export function NPSSurvey({
  question = "How likely are you to recommend us to a friend or colleague?",
  onSubmit,
  showFollowUp = true,
  followUpQuestions = {
    detractor: "What could we do better?",
    passive: "What would make you give us a higher score?",
    promoter: "What do you like most about us?",
  },
  variant,
  className,
}: NPSSurveyProps) {
  const [score, setScore] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [step, setStep] = useState<"score" | "followup" | "thanks">("score");

  const getScoreType = (
    score: number,
  ): "detractor" | "passive" | "promoter" => {
    if (score <= 6) return "detractor";
    if (score <= 8) return "passive";
    return "promoter";
  };

  const handleScoreSelect = (selectedScore: number) => {
    setScore(selectedScore);
    if (showFollowUp) {
      setStep("followup");
    } else {
      onSubmit?.({ score: selectedScore });
      setStep("thanks");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (score !== null) {
      onSubmit?.({ score, reason });
      setStep("thanks");
    }
  };

  if (step === "thanks") {
    return (
      <div className={cn(thankYouVariants({ variant: "card" }), className)}>
        <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
          <HeartIcon className="size-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold">Thank you!</h3>
        <p className="text-muted-foreground">
          Your feedback helps us improve and serve you better.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(npsSurveyVariants({ variant }), className)}>
      {step === "score" && (
        <>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{question}</h3>
          </div>

          <div className={cn(npsScaleVariants({}))}>
            {Array.from({ length: 11 }, (_, i) => i).map((num) => {
              const type = getScoreType(num);
              return (
                <button
                  key={num}
                  type="button"
                  className={cn(
                    npsScoreVariants({
                      variant: score === num ? type : "default",
                    }),
                  )}
                  onClick={() => handleScoreSelect(num)}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span className={cn(npsLabelVariants({ position: "start" }))}>
              Not at all likely
            </span>
            <span className={cn(npsLabelVariants({ position: "end" }))}>
              Extremely likely
            </span>
          </div>
        </>
      )}

      {step === "followup" && score !== null && (
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 mb-4">
              <span className="text-lg font-semibold">{score}</span>
              <span className="text-sm text-muted-foreground">/10</span>
            </div>
            <h3 className="text-lg font-semibold">
              {followUpQuestions[getScoreType(score)]}
            </h3>
          </div>

          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Your feedback..."
            rows={4}
          />

          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onSubmit?.({ score });
                setStep("thanks");
              }}
            >
              Skip
            </Button>
            <Button type="submit" className="flex-1">
              Submit Feedback
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

// =============================================================================
// Quick Feedback (Inline)
// =============================================================================

export interface QuickFeedbackProps {
  question?: string;
  onFeedback?: (isPositive: boolean) => void;
  positiveLabel?: string;
  negativeLabel?: string;
  className?: string;
}

export function QuickFeedback({
  question = "Was this helpful?",
  onFeedback,
  positiveLabel = "Yes",
  negativeLabel = "No",
  className,
}: QuickFeedbackProps) {
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const handleFeedback = (isPositive: boolean) => {
    setFeedback(isPositive);
    onFeedback?.(isPositive);
  };

  if (feedback !== null) {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <CheckCircleIcon className="size-4 text-success" />
        <span className="text-muted-foreground">Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-sm text-muted-foreground">{question}</span>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(true)}
          className="gap-1"
        >
          <ThumbsUpIcon className="size-4" />
          {positiveLabel}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(false)}
          className="gap-1"
        >
          <ThumbsDownIcon className="size-4" />
          {negativeLabel}
        </Button>
      </div>
    </div>
  );
}

// Types are exported at their definitions above
