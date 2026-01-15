import type { Meta, StoryObj } from "@storybook/react";
import {
  StatsSection,
  StatsSectionHeader,
  StatsSectionTitle,
  StatsSectionSubtitle,
  StatsGrid,
  StatCard,
  StatsRow,
  CompleteStatsSection,
  SimpleStatsBar,
  type StatItem,
} from ".";
import { UsersIcon, DollarSignIcon, ChartIcon, GlobeIcon } from "@/lib/icons";

const meta: Meta<typeof StatsSection> = {
  title: "Organisms/Marketing/StatsSection",
  component: StatsSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof StatsSection>;

const sampleStats: StatItem[] = [
  {
    id: "1",
    value: "10K+",
    label: "Active Users",
    description: "People using our platform daily",
    trend: { value: "+12%", direction: "up", label: "from last month" },
    icon: <UsersIcon className="size-6" />,
  },
  {
    id: "2",
    value: "$2.5M",
    label: "Revenue Generated",
    description: "Total revenue this quarter",
    trend: { value: "+8%", direction: "up", label: "from last quarter" },
    icon: <DollarSignIcon className="size-6" />,
  },
  {
    id: "3",
    value: "99.9%",
    label: "Uptime",
    description: "System reliability",
    icon: <ChartIcon className="size-6" />,
  },
  {
    id: "4",
    value: "150+",
    label: "Countries",
    description: "Global reach",
    trend: { value: "+5", direction: "up", label: "new countries" },
    icon: <GlobeIcon className="size-6" />,
  },
];

export const Default: Story = {
  render: () => (
    <StatsSection>
      <StatsSectionHeader>
        <StatsSectionTitle>Our Impact in Numbers</StatsSectionTitle>
        <StatsSectionSubtitle>
          Trusted by thousands of businesses worldwide
        </StatsSectionSubtitle>
      </StatsSectionHeader>

      <StatsGrid columns={4}>
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const WithCards: Story = {
  render: () => (
    <StatsSection backgroundColor="muted">
      <StatsSectionHeader>
        <StatsSectionTitle>Company Metrics</StatsSectionTitle>
      </StatsSectionHeader>

      <StatsGrid columns={4} variant="simple">
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} variant="card" />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const BorderedVariant: Story = {
  render: () => (
    <StatsSection>
      <StatsSectionHeader>
        <StatsSectionTitle>Key Statistics</StatsSectionTitle>
      </StatsSectionHeader>

      <StatsGrid columns={4}>
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} variant="bordered" />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <StatsSection>
      <StatsSectionHeader>
        <StatsSectionTitle>Platform Highlights</StatsSectionTitle>
        <StatsSectionSubtitle>
          See what makes us different
        </StatsSectionSubtitle>
      </StatsSectionHeader>

      <StatsGrid columns={4}>
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} variant="icon" />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const DividedLayout: Story = {
  render: () => (
    <StatsSection>
      <StatsGrid columns={4} variant="divided">
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} showTrend={false} />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <StatsSection>
      <StatsSectionHeader>
        <StatsSectionTitle>Why Choose Us</StatsSectionTitle>
      </StatsSectionHeader>

      <StatsGrid columns={3}>
        {sampleStats.slice(0, 3).map((stat) => (
          <StatCard key={stat.id} stat={stat} size="lg" />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const InlineRow: Story = {
  render: () => (
    <StatsSection padding="sm">
      <StatsRow
        stats={sampleStats.map((s) => ({
          ...s,
          value: s.value,
        }))}
      />
    </StatsSection>
  ),
};

export const PrimaryBackground: Story = {
  render: () => (
    <StatsSection backgroundColor="primary">
      <StatsSectionHeader>
        <StatsSectionTitle>Growing Every Day</StatsSectionTitle>
        <StatsSectionSubtitle>
          Join thousands of satisfied customers
        </StatsSectionSubtitle>
      </StatsSectionHeader>

      <StatsGrid columns={4} variant="divided">
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} showTrend={false} />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const GradientBackground: Story = {
  render: () => (
    <StatsSection backgroundColor="gradient">
      <StatsSectionHeader>
        <StatsSectionTitle>Our Success Story</StatsSectionTitle>
      </StatsSectionHeader>

      <StatsGrid columns={4} variant="divided">
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} showTrend={false} />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const WithTrends: Story = {
  render: () => (
    <StatsSection>
      <StatsSectionHeader>
        <StatsSectionTitle>Performance Metrics</StatsSectionTitle>
        <StatsSectionSubtitle>
          Real-time data from our platform
        </StatsSectionSubtitle>
      </StatsSectionHeader>

      <StatsGrid columns={4}>
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} variant="card" showTrend />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <StatsSection>
      <StatsSectionHeader align="left">
        <StatsSectionTitle>Company Overview</StatsSectionTitle>
        <StatsSectionSubtitle>
          Key metrics that drive our business
        </StatsSectionSubtitle>
      </StatsSectionHeader>

      <StatsGrid columns={4}>
        {sampleStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} align="left" />
        ))}
      </StatsGrid>
    </StatsSection>
  ),
};

export const CompleteStatsSectionExample: Story = {
  name: "CompleteStatsSection",
  render: () => (
    <CompleteStatsSection
      title="Trusted by Industry Leaders"
      subtitle="Our platform powers businesses of all sizes"
      stats={sampleStats}
      showTrend
    />
  ),
};

export const CompleteWithCards: Story = {
  render: () => (
    <CompleteStatsSection
      title="Our Impact"
      subtitle="See how we're making a difference"
      stats={sampleStats}
      variant="card"
      backgroundColor="muted"
    />
  ),
};

export const SimpleStatsBarExample: Story = {
  name: "SimpleStatsBar",
  render: () => (
    <div className="bg-muted/50 py-8">
      <div className="container mx-auto px-4">
        <SimpleStatsBar
          stats={[
            { value: "10K+", label: "Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
            { value: "50+", label: "Integrations" },
          ]}
        />
      </div>
    </div>
  ),
};
