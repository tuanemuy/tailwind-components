import type { Meta, StoryObj } from "@storybook/react";
import {
  TestimonialCard,
  TestimonialQuote,
  TestimonialContent,
  TestimonialRating,
  TestimonialAuthor,
  TestimonialAuthorAvatar,
  TestimonialAuthorInfo,
  TestimonialAuthorName,
  TestimonialAuthorTitle,
  TestimonialSection,
  TestimonialSectionHeader,
  TestimonialSectionTitle,
  TestimonialSectionSubtitle,
  TestimonialGrid,
  TestimonialCarousel,
  TestimonialCarouselItem,
  TestimonialFeatured,
} from "./index";

const meta: Meta<typeof TestimonialCard> = {
  title: "Organisms/TestimonialCard",
  component: TestimonialCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated", "quote"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

// Sample testimonials
const testimonials = [
  {
    id: "1",
    content:
      "This product has completely transformed how our team works. The intuitive interface and powerful features have boosted our productivity by 40%.",
    author: {
      name: "Sarah Chen",
      title: "Product Manager",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    rating: 5,
  },
  {
    id: "2",
    content:
      "I've tried many similar tools, but this one stands out for its simplicity and effectiveness. Highly recommended for any development team.",
    author: {
      name: "Michael Roberts",
      title: "CTO",
      company: "StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    rating: 5,
  },
  {
    id: "3",
    content:
      "The customer support is exceptional. They helped us migrate our entire system in just two days with zero downtime.",
    author: {
      name: "Emily Watson",
      title: "Engineering Lead",
      company: "Enterprise Inc",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    rating: 4,
  },
  {
    id: "4",
    content:
      "A game-changer for our workflow. We've saved countless hours on manual tasks since implementing this solution.",
    author: {
      name: "David Kim",
      title: "Senior Developer",
      company: "DevStudio",
      initials: "DK",
    },
    rating: 5,
  },
];

export const Default: Story = {
  render: () => (
    <TestimonialCard className="max-w-md">
      <TestimonialQuote>
        <TestimonialContent>{testimonials[0].content}</TestimonialContent>
      </TestimonialQuote>
      <div className="mt-6">
        <TestimonialAuthor>
          <TestimonialAuthorAvatar
            src={testimonials[0].author.avatar}
            alt={testimonials[0].author.name}
          />
          <TestimonialAuthorInfo>
            <TestimonialAuthorName>{testimonials[0].author.name}</TestimonialAuthorName>
            <TestimonialAuthorTitle>
              {testimonials[0].author.title} at {testimonials[0].author.company}
            </TestimonialAuthorTitle>
          </TestimonialAuthorInfo>
        </TestimonialAuthor>
      </div>
    </TestimonialCard>
  ),
};

export const WithRating: Story = {
  render: () => (
    <TestimonialCard className="max-w-md">
      <TestimonialRating rating={5} className="mb-4" />
      <TestimonialContent>{testimonials[1].content}</TestimonialContent>
      <div className="mt-6">
        <TestimonialAuthor>
          <TestimonialAuthorAvatar
            src={testimonials[1].author.avatar}
            alt={testimonials[1].author.name}
          />
          <TestimonialAuthorInfo>
            <TestimonialAuthorName>{testimonials[1].author.name}</TestimonialAuthorName>
            <TestimonialAuthorTitle>
              {testimonials[1].author.title}, {testimonials[1].author.company}
            </TestimonialAuthorTitle>
          </TestimonialAuthorInfo>
        </TestimonialAuthor>
      </div>
    </TestimonialCard>
  ),
};

export const QuoteVariant: Story = {
  render: () => (
    <TestimonialCard variant="quote" className="max-w-md">
      <TestimonialContent size="lg">{testimonials[0].content}</TestimonialContent>
      <div className="mt-6">
        <TestimonialAuthor>
          <TestimonialAuthorAvatar
            src={testimonials[0].author.avatar}
            alt={testimonials[0].author.name}
          />
          <TestimonialAuthorInfo>
            <TestimonialAuthorName>{testimonials[0].author.name}</TestimonialAuthorName>
            <TestimonialAuthorTitle>
              {testimonials[0].author.title}
            </TestimonialAuthorTitle>
          </TestimonialAuthorInfo>
        </TestimonialAuthor>
      </div>
    </TestimonialCard>
  ),
};

export const ElevatedVariant: Story = {
  render: () => (
    <TestimonialCard variant="elevated" className="max-w-md">
      <TestimonialQuote iconPosition="inline" className="mb-4">
        <TestimonialContent>{testimonials[2].content}</TestimonialContent>
      </TestimonialQuote>
      <TestimonialAuthor>
        <TestimonialAuthorAvatar
          src={testimonials[2].author.avatar}
          alt={testimonials[2].author.name}
        />
        <TestimonialAuthorInfo>
          <TestimonialAuthorName>{testimonials[2].author.name}</TestimonialAuthorName>
          <TestimonialAuthorTitle>
            {testimonials[2].author.title}
          </TestimonialAuthorTitle>
        </TestimonialAuthorInfo>
      </TestimonialAuthor>
    </TestimonialCard>
  ),
};

export const WithInitials: Story = {
  render: () => (
    <TestimonialCard className="max-w-md">
      <TestimonialRating rating={5} className="mb-4" />
      <TestimonialContent>{testimonials[3].content}</TestimonialContent>
      <div className="mt-6">
        <TestimonialAuthor>
          <TestimonialAuthorAvatar
            initials={testimonials[3].author.initials}
            alt={testimonials[3].author.name}
          />
          <TestimonialAuthorInfo>
            <TestimonialAuthorName>{testimonials[3].author.name}</TestimonialAuthorName>
            <TestimonialAuthorTitle>
              {testimonials[3].author.title}
            </TestimonialAuthorTitle>
          </TestimonialAuthorInfo>
        </TestimonialAuthor>
      </div>
    </TestimonialCard>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <TestimonialCard className="max-w-sm text-center">
      <TestimonialAuthor layout="vertical" className="mb-6">
        <TestimonialAuthorAvatar
          src={testimonials[0].author.avatar}
          alt={testimonials[0].author.name}
          size="lg"
        />
        <TestimonialAuthorInfo>
          <TestimonialAuthorName>{testimonials[0].author.name}</TestimonialAuthorName>
          <TestimonialAuthorTitle>
            {testimonials[0].author.title}
          </TestimonialAuthorTitle>
        </TestimonialAuthorInfo>
      </TestimonialAuthor>
      <TestimonialQuote showIcon={false}>
        <TestimonialContent>{testimonials[0].content}</TestimonialContent>
      </TestimonialQuote>
      <TestimonialRating rating={5} className="mt-4 justify-center" />
    </TestimonialCard>
  ),
};

export const TestimonialGridLayout: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <TestimonialSection>
      <TestimonialSectionHeader>
        <TestimonialSectionTitle>What our customers say</TestimonialSectionTitle>
        <TestimonialSectionSubtitle>
          Don&apos;t just take our word for it. See what our customers have to say.
        </TestimonialSectionSubtitle>
      </TestimonialSectionHeader>
      <TestimonialGrid columns={3}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id}>
            <TestimonialRating rating={testimonial.rating} className="mb-4" />
            <TestimonialContent>{testimonial.content}</TestimonialContent>
            <div className="mt-6">
              <TestimonialAuthor>
                <TestimonialAuthorAvatar
                  src={testimonial.author.avatar}
                  initials={testimonial.author.initials}
                  alt={testimonial.author.name}
                />
                <TestimonialAuthorInfo>
                  <TestimonialAuthorName>{testimonial.author.name}</TestimonialAuthorName>
                  <TestimonialAuthorTitle>
                    {testimonial.author.title}
                  </TestimonialAuthorTitle>
                </TestimonialAuthorInfo>
              </TestimonialAuthor>
            </div>
          </TestimonialCard>
        ))}
      </TestimonialGrid>
    </TestimonialSection>
  ),
};

export const TwoColumnGrid: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <TestimonialSection className="bg-muted/50">
      <TestimonialSectionHeader>
        <TestimonialSectionTitle>Loved by teams worldwide</TestimonialSectionTitle>
      </TestimonialSectionHeader>
      <TestimonialGrid columns={2} gap="lg">
        {testimonials.slice(0, 2).map((testimonial) => (
          <TestimonialCard key={testimonial.id} variant="elevated" size="lg">
            <TestimonialQuote>
              <TestimonialContent size="lg">{testimonial.content}</TestimonialContent>
            </TestimonialQuote>
            <div className="mt-8">
              <TestimonialAuthor>
                <TestimonialAuthorAvatar
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  size="lg"
                />
                <TestimonialAuthorInfo>
                  <TestimonialAuthorName>{testimonial.author.name}</TestimonialAuthorName>
                  <TestimonialAuthorTitle>
                    {testimonial.author.title} at {testimonial.author.company}
                  </TestimonialAuthorTitle>
                </TestimonialAuthorInfo>
              </TestimonialAuthor>
            </div>
          </TestimonialCard>
        ))}
      </TestimonialGrid>
    </TestimonialSection>
  ),
};

export const CarouselLayout: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <TestimonialSection>
      <TestimonialSectionHeader>
        <TestimonialSectionTitle>Customer Stories</TestimonialSectionTitle>
        <TestimonialSectionSubtitle>
          Scroll to see more testimonials from our happy customers.
        </TestimonialSectionSubtitle>
      </TestimonialSectionHeader>
      <TestimonialCarousel>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCarouselItem key={`${testimonial.id}-${index}`}>
            <TestimonialCard className="h-full">
              <TestimonialRating rating={testimonial.rating} className="mb-4" />
              <TestimonialContent>{testimonial.content}</TestimonialContent>
              <div className="mt-6">
                <TestimonialAuthor>
                  <TestimonialAuthorAvatar
                    src={testimonial.author.avatar}
                    initials={testimonial.author.initials}
                    alt={testimonial.author.name}
                  />
                  <TestimonialAuthorInfo>
                    <TestimonialAuthorName>{testimonial.author.name}</TestimonialAuthorName>
                    <TestimonialAuthorTitle>
                      {testimonial.author.title}
                    </TestimonialAuthorTitle>
                  </TestimonialAuthorInfo>
                </TestimonialAuthor>
              </div>
            </TestimonialCard>
          </TestimonialCarouselItem>
        ))}
      </TestimonialCarousel>
    </TestimonialSection>
  ),
};

export const FeaturedTestimonial: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <TestimonialSection>
      <TestimonialFeatured>
        <div className="text-center">
          <TestimonialRating rating={5} className="mb-6 justify-center" />
          <TestimonialQuote showIcon={false}>
            <TestimonialContent size="lg" className="text-xl md:text-2xl font-medium">
              &ldquo;This product has completely transformed how our team works. The intuitive
              interface and powerful features have boosted our productivity by 40%. I can&apos;t
              imagine going back to how we worked before.&rdquo;
            </TestimonialContent>
          </TestimonialQuote>
          <div className="mt-8">
            <TestimonialAuthor layout="vertical">
              <TestimonialAuthorAvatar
                src={testimonials[0].author.avatar}
                alt={testimonials[0].author.name}
                size="lg"
              />
              <TestimonialAuthorInfo>
                <TestimonialAuthorName className="text-lg">
                  {testimonials[0].author.name}
                </TestimonialAuthorName>
                <TestimonialAuthorTitle>
                  {testimonials[0].author.title} at {testimonials[0].author.company}
                </TestimonialAuthorTitle>
              </TestimonialAuthorInfo>
            </TestimonialAuthor>
          </div>
        </div>
      </TestimonialFeatured>
    </TestimonialSection>
  ),
};

export const MinimalStyle: Story = {
  render: () => (
    <TestimonialCard variant="default" size="sm" className="max-w-sm border-none">
      <TestimonialContent size="sm" className="italic text-muted-foreground">
        &ldquo;{testimonials[0].content}&rdquo;
      </TestimonialContent>
      <div className="mt-4">
        <TestimonialAuthorName className="text-sm">
          — {testimonials[0].author.name}, {testimonials[0].author.title}
        </TestimonialAuthorName>
      </div>
    </TestimonialCard>
  ),
};
