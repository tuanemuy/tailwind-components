import type { Meta, StoryObj } from "@storybook/react";
import {
  CompleteTeamSection,
  FeaturedTeamMember,
  TeamGrid,
  type TeamMember,
  TeamMemberCard,
  TeamMemberList,
  TeamSection,
  TeamSectionHeader,
  TeamSectionSubtitle,
  TeamSectionTitle,
} from ".";

const meta: Meta<typeof TeamSection> = {
  title: "Organisms/Marketing/TeamSection",
  component: TeamSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof TeamSection>;

const sampleTeam: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Passionate about building products that make a difference.",
    socials: [
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Building scalable systems that power modern applications.",
    socials: [
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "github", url: "https://github.com" },
    ],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Head of Design",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    bio: "Creating beautiful and intuitive user experiences.",
    socials: [
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    id: "4",
    name: "David Kim",
    role: "Head of Engineering",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    bio: "Leading the team to build amazing software.",
    socials: [
      { platform: "github", url: "https://github.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    bio: "Turning ideas into products that users love.",
    socials: [
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Marketing Lead",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "Growing our brand and reaching new audiences.",
    socials: [
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    id: "7",
    name: "Anna Martinez",
    role: "Customer Success",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    bio: "Making sure every customer achieves their goals.",
    socials: [{ platform: "linkedin", url: "https://linkedin.com" }],
  },
  {
    id: "8",
    name: "Chris Taylor",
    role: "DevOps Engineer",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    bio: "Keeping our infrastructure running smoothly.",
    socials: [{ platform: "github", url: "https://github.com" }],
  },
];

export const Default: Story = {
  render: () => (
    <TeamSection>
      <TeamSectionHeader>
        <TeamSectionTitle>Meet Our Team</TeamSectionTitle>
        <TeamSectionSubtitle>
          The talented people behind our success
        </TeamSectionSubtitle>
      </TeamSectionHeader>

      <TeamGrid columns={4}>
        {sampleTeam.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </TeamGrid>
    </TeamSection>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <TeamSection>
      <TeamSectionHeader>
        <TeamSectionTitle>Leadership Team</TeamSectionTitle>
        <TeamSectionSubtitle>
          Experienced leaders driving our vision
        </TeamSectionSubtitle>
      </TeamSectionHeader>

      <TeamGrid columns={3}>
        {sampleTeam.slice(0, 6).map((member) => (
          <TeamMemberCard key={member.id} member={member} avatarSize="lg" />
        ))}
      </TeamGrid>
    </TeamSection>
  ),
};

export const CardVariant: Story = {
  render: () => (
    <TeamSection backgroundColor="muted">
      <TeamSectionHeader>
        <TeamSectionTitle>Our Team</TeamSectionTitle>
      </TeamSectionHeader>

      <TeamGrid columns={4}>
        {sampleTeam.map((member) => (
          <TeamMemberCard key={member.id} member={member} variant="card" />
        ))}
      </TeamGrid>
    </TeamSection>
  ),
};

export const DetailedCards: Story = {
  render: () => (
    <TeamSection>
      <TeamSectionHeader>
        <TeamSectionTitle>Meet the Founders</TeamSectionTitle>
      </TeamSectionHeader>

      <TeamGrid columns={3}>
        {sampleTeam.slice(0, 3).map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            variant="detailed"
            avatarSize="lg"
            showBio
          />
        ))}
      </TeamGrid>
    </TeamSection>
  ),
};

export const ListLayout: Story = {
  render: () => (
    <TeamSection>
      <TeamSectionHeader align="left">
        <TeamSectionTitle>Team Members</TeamSectionTitle>
        <TeamSectionSubtitle>
          Our growing team of passionate individuals
        </TeamSectionSubtitle>
      </TeamSectionHeader>

      <div className="mx-auto max-w-2xl">
        <TeamMemberList members={sampleTeam.slice(0, 5)} variant="detailed" />
      </div>
    </TeamSection>
  ),
};

export const WithFeaturedMember: Story = {
  render: () => (
    <TeamSection>
      <TeamSectionHeader>
        <TeamSectionTitle>Leadership</TeamSectionTitle>
      </TeamSectionHeader>

      <FeaturedTeamMember
        member={sampleTeam[0]}
        quote="Our mission is to empower businesses with the tools they need to succeed in the digital age."
      />

      <div className="mt-16">
        <h3 className="mb-8 text-center text-xl font-semibold">Team Members</h3>
        <TeamGrid columns={4}>
          {sampleTeam.slice(1).map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </TeamGrid>
      </div>
    </TeamSection>
  ),
};

export const WithInitials: Story = {
  render: () => {
    const teamWithInitials = sampleTeam.map((m) => ({
      ...m,
      avatar: undefined,
      initials: m.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    }));

    return (
      <TeamSection>
        <TeamSectionHeader>
          <TeamSectionTitle>Our Team</TeamSectionTitle>
        </TeamSectionHeader>

        <TeamGrid columns={4}>
          {teamWithInitials.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </TeamGrid>
      </TeamSection>
    );
  },
};

export const CompleteTeamSectionExample: Story = {
  name: "CompleteTeamSection",
  render: () => (
    <CompleteTeamSection
      title="The People Behind Our Success"
      subtitle="Talented individuals working together to build something amazing"
      members={sampleTeam}
      columns={4}
    />
  ),
};

export const WithFeaturedComplete: Story = {
  render: () => (
    <CompleteTeamSection
      title="Meet Our Team"
      subtitle="A diverse group of passionate professionals"
      members={sampleTeam.slice(1)}
      columns={4}
      featuredMember={{
        ...sampleTeam[0],
        quote: "Building great products starts with building a great team.",
      }}
      showBio={false}
    />
  ),
};
