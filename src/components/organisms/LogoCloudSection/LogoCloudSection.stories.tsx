import type { Meta, StoryObj } from "@storybook/react";
import {
  CompleteLogoCloudSection,
  LogoCloudHeader,
  LogoCloudSection,
  LogoCloudTitle,
  LogoGrid,
  type LogoItem,
  LogoItemComponent,
  LogoMarquee,
  LogoRow,
  SimpleLogoCloud,
} from ".";

const meta: Meta<typeof LogoCloudSection> = {
  title: "Organisms/Marketing/LogoCloudSection",
  component: LogoCloudSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof LogoCloudSection>;

// Sample logos using placeholder images
const sampleLogos: LogoItem[] = [
  {
    id: "1",
    name: "Google",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    url: "https://google.com",
  },
  {
    id: "2",
    name: "Microsoft",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    url: "https://microsoft.com",
  },
  {
    id: "3",
    name: "Amazon",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    url: "https://amazon.com",
  },
  {
    id: "4",
    name: "Netflix",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://netflix.com",
  },
  {
    id: "5",
    name: "Spotify",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    url: "https://spotify.com",
  },
  {
    id: "6",
    name: "Slack",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    url: "https://slack.com",
  },
];

export const Default: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle>Trusted by industry leaders</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoRow>
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle>Our Partners</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoGrid columns={6}>
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} />
        ))}
      </LogoGrid>
    </LogoCloudSection>
  ),
};

export const FourColumnGrid: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle>Featured Clients</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoGrid columns={4} gap="lg">
        {sampleLogos.slice(0, 4).map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} size="lg" />
        ))}
      </LogoGrid>
    </LogoCloudSection>
  ),
};

export const GrayscaleLogos: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle>Companies using our platform</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoRow>
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} variant="grayscale" />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};

export const ColoredLogos: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle>Powered by the best</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoRow>
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} variant="default" />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};

export const MutedBackground: Story = {
  render: () => (
    <LogoCloudSection backgroundColor="muted">
      <LogoCloudHeader>
        <LogoCloudTitle>Join thousands of companies</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoRow gap="lg">
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};

export const MarqueeAnimation: Story = {
  render: () => (
    <LogoCloudSection padding="lg">
      <LogoCloudHeader>
        <LogoCloudTitle>Trusted worldwide</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoMarquee logos={sampleLogos} speed="normal" />
    </LogoCloudSection>
  ),
};

export const SlowMarquee: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle>Our growing community</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoMarquee logos={sampleLogos} speed="slow" pauseOnHover />
    </LogoCloudSection>
  ),
};

export const ReverseMarquee: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle>Industry recognition</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoMarquee logos={sampleLogos} direction="right" />
    </LogoCloudSection>
  ),
};

export const SmallLogos: Story = {
  render: () => (
    <LogoCloudSection padding="sm">
      <LogoRow gap="sm">
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} size="sm" />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};

export const LargeLogos: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader>
        <LogoCloudTitle size="lg">Featured in</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoRow gap="lg">
        {sampleLogos.slice(0, 4).map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} size="lg" />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};

export const SimpleLogoCloudExample: Story = {
  name: "SimpleLogoCloud",
  render: () => (
    <div className="py-12">
      <SimpleLogoCloud
        title="Trusted by leading companies"
        logos={sampleLogos}
      />
    </div>
  ),
};

export const CompleteLogoCloudSectionExample: Story = {
  name: "CompleteLogoCloudSection - Row",
  render: () => (
    <CompleteLogoCloudSection
      title="Trusted by industry leaders"
      logos={sampleLogos}
      variant="row"
    />
  ),
};

export const CompleteWithGrid: Story = {
  render: () => (
    <CompleteLogoCloudSection
      title="Our clients"
      logos={sampleLogos}
      variant="grid"
      columns={6}
      backgroundColor="muted"
    />
  ),
};

export const CompleteWithMarquee: Story = {
  render: () => (
    <CompleteLogoCloudSection
      title="Worldwide recognition"
      logos={sampleLogos}
      variant="marquee"
    />
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <LogoCloudSection padding="sm">
      <LogoRow>
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};

export const LeftAlignedTitle: Story = {
  render: () => (
    <LogoCloudSection>
      <LogoCloudHeader align="left">
        <LogoCloudTitle>As seen in</LogoCloudTitle>
      </LogoCloudHeader>

      <LogoRow>
        {sampleLogos.map((logo) => (
          <LogoItemComponent key={logo.id} logo={logo} />
        ))}
      </LogoRow>
    </LogoCloudSection>
  ),
};
