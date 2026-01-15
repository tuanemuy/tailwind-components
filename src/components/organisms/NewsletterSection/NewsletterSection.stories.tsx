import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  NewsletterSection,
  NewsletterContent,
  NewsletterTitle,
  NewsletterDescription,
  NewsletterForm,
  NewsletterSuccess,
  NewsletterFeatures,
  NewsletterPrivacy,
  SimpleNewsletter,
  CompleteNewsletterSection,
} from ".";

const meta: Meta<typeof NewsletterSection> = {
  title: "Organisms/Marketing/NewsletterSection",
  component: NewsletterSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterSection>;

export const Default: Story = {
  render: () => (
    <NewsletterSection>
      <NewsletterContent>
        <NewsletterTitle>Subscribe to our newsletter</NewsletterTitle>
        <NewsletterDescription>
          Get the latest updates and insights delivered to your inbox.
        </NewsletterDescription>
        <NewsletterForm onSubmit={(email) => console.log("Subscribed:", email)} />
        <NewsletterPrivacy />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const WithFeatures: Story = {
  render: () => (
    <NewsletterSection backgroundColor="muted">
      <NewsletterContent>
        <NewsletterTitle>Stay in the loop</NewsletterTitle>
        <NewsletterDescription>
          Join 10,000+ subscribers getting weekly insights.
        </NewsletterDescription>
        <NewsletterForm
          onSubmit={(email) => console.log("Subscribed:", email)}
          buttonText="Join Now"
        />
        <NewsletterFeatures
          features={[
            { text: "Weekly insights" },
            { text: "No spam" },
            { text: "Unsubscribe anytime" },
          ]}
        />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const StackedLayout: Story = {
  render: () => (
    <NewsletterSection>
      <NewsletterContent maxWidth="md">
        <NewsletterTitle size="lg">Get notified</NewsletterTitle>
        <NewsletterDescription>
          Be the first to know when we launch new features.
        </NewsletterDescription>
        <NewsletterForm
          onSubmit={(email) => console.log("Subscribed:", email)}
          layout="stacked"
        />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const PrimaryBackground: Story = {
  render: () => (
    <NewsletterSection backgroundColor="primary">
      <NewsletterContent>
        <NewsletterTitle>Join our community</NewsletterTitle>
        <NewsletterDescription>
          Get exclusive content and early access to new features.
        </NewsletterDescription>
        <NewsletterForm
          onSubmit={(email) => console.log("Subscribed:", email)}
          inverted
        />
        <NewsletterPrivacy />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const GradientBackground: Story = {
  render: () => (
    <NewsletterSection backgroundColor="gradient">
      <NewsletterContent>
        <NewsletterTitle size="lg">Stay Updated</NewsletterTitle>
        <NewsletterDescription>
          Subscribe for the latest news and updates from our team.
        </NewsletterDescription>
        <NewsletterForm
          onSubmit={(email) => console.log("Subscribed:", email)}
          inverted
          buttonText="Subscribe"
        />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const SuccessState: Story = {
  render: () => (
    <NewsletterSection backgroundColor="muted">
      <NewsletterContent>
        <NewsletterTitle>You're subscribed!</NewsletterTitle>
        <NewsletterSuccess
          title="Welcome aboard!"
          message="Check your inbox for a confirmation email."
        />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <NewsletterSection>
      <NewsletterContent align="left" maxWidth="lg">
        <NewsletterTitle>Newsletter</NewsletterTitle>
        <NewsletterDescription>
          Stay up to date with the latest news, announcements, and articles.
        </NewsletterDescription>
        <NewsletterForm onSubmit={(email) => console.log("Subscribed:", email)} />
        <NewsletterPrivacy />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const InteractiveExample: Story = {
  render: function Render() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (email: string) => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Subscribed:", email);
      setLoading(false);
      setSuccess(true);
    };

    return (
      <NewsletterSection backgroundColor="muted">
        <NewsletterContent>
          <NewsletterTitle>Subscribe to updates</NewsletterTitle>
          <NewsletterDescription>
            Get notified about new features and updates.
          </NewsletterDescription>

          {success ? (
            <NewsletterSuccess />
          ) : (
            <>
              <NewsletterForm onSubmit={handleSubmit} loading={loading} />
              <NewsletterFeatures
                features={[
                  { text: "Product updates" },
                  { text: "Tips & tricks" },
                  { text: "Exclusive offers" },
                ]}
              />
              <NewsletterPrivacy />
            </>
          )}
        </NewsletterContent>
      </NewsletterSection>
    );
  },
};

export const SimpleNewsletterExample: Story = {
  name: "SimpleNewsletter",
  render: () => (
    <div className="py-16 px-4">
      <SimpleNewsletter
        title="Stay in the loop"
        description="Get the latest updates delivered to your inbox."
        onSubmit={(email) => console.log("Subscribed:", email)}
        features={["Weekly insights", "No spam", "Unsubscribe anytime"]}
        privacyUrl="#"
      />
    </div>
  ),
};

export const CompleteNewsletterSectionExample: Story = {
  name: "CompleteNewsletterSection",
  render: () => (
    <CompleteNewsletterSection
      title="Subscribe to our newsletter"
      description="Join 10,000+ subscribers and get our latest articles and updates delivered straight to your inbox."
      onSubmit={(email) => console.log("Subscribed:", email)}
      features={["Weekly insights", "Exclusive content", "No spam"]}
      privacyUrl="#"
    />
  ),
};

export const CompletePrimaryBackground: Story = {
  render: () => (
    <CompleteNewsletterSection
      title="Never miss an update"
      description="Be the first to know about new features, tips, and insights."
      onSubmit={(email) => console.log("Subscribed:", email)}
      backgroundColor="primary"
      features={["Product news", "Best practices", "Community updates"]}
    />
  ),
};

export const CompleteGradientBackground: Story = {
  render: () => (
    <CompleteNewsletterSection
      title="Join our community"
      description="Get exclusive access to resources, tutorials, and more."
      onSubmit={(email) => console.log("Subscribed:", email)}
      backgroundColor="gradient"
      buttonText="Join Now"
    />
  ),
};

export const CompleteSplitLayout: Story = {
  render: () => (
    <CompleteNewsletterSection
      title="Get the latest updates"
      description="Stay informed with our weekly newsletter featuring industry insights, product updates, and exclusive content."
      onSubmit={(email) => console.log("Subscribed:", email)}
      layout="split"
      image={{
        src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
        alt: "Newsletter illustration",
      }}
      features={[
        "Weekly curated content",
        "Industry insights and trends",
        "Exclusive subscriber offers",
        "Early access to new features",
      ]}
      privacyUrl="#"
    />
  ),
};

export const CompleteWithSuccessState: Story = {
  render: function Render() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (email: string) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Subscribed:", email);
      setLoading(false);
      setSuccess(true);
    };

    return (
      <CompleteNewsletterSection
        title="Subscribe to updates"
        description="Get notified about new features and company news."
        onSubmit={handleSubmit}
        loading={loading}
        success={success}
        features={["Weekly digest", "Product updates", "Community news"]}
        privacyUrl="#"
        backgroundColor="muted"
      />
    );
  },
};

export const SmallPadding: Story = {
  render: () => (
    <NewsletterSection padding="sm">
      <NewsletterContent maxWidth="sm">
        <NewsletterTitle size="sm">Quick subscribe</NewsletterTitle>
        <NewsletterForm onSubmit={(email) => console.log("Subscribed:", email)} />
      </NewsletterContent>
    </NewsletterSection>
  ),
};

export const LargePadding: Story = {
  render: () => (
    <NewsletterSection padding="xl" backgroundColor="muted">
      <NewsletterContent>
        <NewsletterTitle size="lg">Join Our Newsletter</NewsletterTitle>
        <NewsletterDescription>
          Subscribe to receive the latest updates, articles, and resources directly in your inbox.
        </NewsletterDescription>
        <NewsletterForm
          onSubmit={(email) => console.log("Subscribed:", email)}
          buttonText="Subscribe Now"
        />
        <NewsletterFeatures
          features={[
            { text: "Monthly insights" },
            { text: "Exclusive resources" },
            { text: "No spam, ever" },
          ]}
        />
        <NewsletterPrivacy />
      </NewsletterContent>
    </NewsletterSection>
  ),
};
