import type { Meta, StoryObj } from "@storybook/react";
import { TeamCard, TeamCardGrid, TeamCardList } from "./";
import type { TeamCardData } from "./";
import { UsersIcon, CodeIcon, PaletteIcon, RocketIcon } from "@/lib/icons";

const meta: Meta<typeof TeamCard> = {
  title: "Organisms/TeamCard",
  component: TeamCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TeamCard>;

const sampleTeam: TeamCardData = {
  id: "1",
  name: "Engineering Team",
  description: "Building the core platform and infrastructure",
  color: "#3B82F6",
  icon: <CodeIcon className="size-6 text-white" />,
  members: [
    { id: "m1", name: "Alex Johnson", avatarFallback: "AJ", role: "Lead Engineer" },
    { id: "m2", name: "Maria Garcia", avatarFallback: "MG", role: "Senior Dev" },
    { id: "m3", name: "David Kim", avatarFallback: "DK", role: "Backend Dev" },
    { id: "m4", name: "Emily Brown", avatarFallback: "EB", role: "Frontend Dev" },
    { id: "m5", name: "Sarah Chen", avatarFallback: "SC", role: "DevOps" },
  ],
  projectCount: 12,
  isPrivate: false,
  isStarred: true,
  lead: { id: "m1", name: "Alex Johnson", avatarFallback: "AJ", role: "Lead Engineer" },
  tags: ["Engineering", "Core Platform"],
};

export const Default: Story = {
  args: {
    team: sampleTeam,
    onInvite: (team) => console.log("Invite to:", team.name),
    className: "w-[380px]",
  },
};

export const Featured: Story = {
  args: {
    team: {
      ...sampleTeam,
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=300&fit=crop",
    },
    variant: "featured",
    onStar: (team, starred) => console.log("Star:", team.name, starred),
    onInvite: (team) => console.log("Invite to:", team.name),
    className: "w-[380px]",
  },
};

export const FeaturedWithColor: Story = {
  args: {
    team: {
      ...sampleTeam,
      coverImage: undefined,
    },
    variant: "featured",
    onInvite: (team) => console.log("Invite to:", team.name),
    className: "w-[380px]",
  },
};

export const Horizontal: Story = {
  args: {
    team: sampleTeam,
    variant: "horizontal",
    onInvite: (team) => console.log("Invite to:", team.name),
    onSettings: (team) => console.log("Settings for:", team.name),
    className: "w-[700px]",
  },
};

export const Compact: Story = {
  args: {
    team: sampleTeam,
    variant: "compact",
    className: "w-[280px]",
  },
};

export const Private: Story = {
  args: {
    team: {
      ...sampleTeam,
      isPrivate: true,
    },
    className: "w-[380px]",
  },
};

// Sample teams
const sampleTeams: TeamCardData[] = [
  {
    id: "1",
    name: "Engineering",
    description: "Building the core platform",
    color: "#3B82F6",
    icon: <CodeIcon className="size-6 text-white" />,
    members: [
      { id: "m1", name: "Alex", avatarFallback: "A" },
      { id: "m2", name: "Maria", avatarFallback: "M" },
      { id: "m3", name: "David", avatarFallback: "D" },
    ],
    projectCount: 12,
    isStarred: true,
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Design",
    description: "Creating beautiful experiences",
    color: "#8B5CF6",
    icon: <PaletteIcon className="size-6 text-white" />,
    members: [
      { id: "m4", name: "Emily", avatarFallback: "E" },
      { id: "m5", name: "Sarah", avatarFallback: "S" },
    ],
    projectCount: 8,
    isPrivate: true,
  },
  {
    id: "3",
    name: "Marketing",
    description: "Growing our user base",
    color: "#10B981",
    icon: <RocketIcon className="size-6 text-white" />,
    members: [
      { id: "m6", name: "John", avatarFallback: "J" },
      { id: "m7", name: "Lisa", avatarFallback: "L" },
      { id: "m8", name: "Mike", avatarFallback: "M" },
      { id: "m9", name: "Anna", avatarFallback: "A" },
    ],
    projectCount: 5,
  },
  {
    id: "4",
    name: "Product",
    description: "Defining the roadmap",
    color: "#F59E0B",
    icon: <UsersIcon className="size-6 text-white" />,
    members: [
      { id: "m10", name: "Peter", avatarFallback: "P" },
    ],
    projectCount: 3,
    isStarred: true,
  },
];

export const Grid: StoryObj<typeof TeamCardGrid> = {
  render: () => (
    <TeamCardGrid
      teams={sampleTeams}
      columns={2}
      onTeamClick={(team) => console.log("Clicked:", team.name)}
      onInvite={(team) => console.log("Invite to:", team.name)}
      className="max-w-4xl"
    />
  ),
};

export const GridFeatured: StoryObj<typeof TeamCardGrid> = {
  render: () => (
    <TeamCardGrid
      teams={sampleTeams}
      variant="featured"
      columns={3}
      onTeamClick={(team) => console.log("Clicked:", team.name)}
      onInvite={(team) => console.log("Invite to:", team.name)}
      onStar={(team, starred) => console.log("Star:", team.name, starred)}
      className="max-w-5xl"
    />
  ),
};

export const List: StoryObj<typeof TeamCardList> = {
  render: () => (
    <TeamCardList
      teams={sampleTeams}
      onTeamClick={(team) => console.log("Clicked:", team.name)}
      onInvite={(team) => console.log("Invite to:", team.name)}
      onSettings={(team) => console.log("Settings:", team.name)}
      className="max-w-3xl"
    />
  ),
};
