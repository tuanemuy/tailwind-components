import type { Meta, StoryObj } from "@storybook/react";
import {
  CalendarIcon,
  CodeIcon,
  DollarSignIcon,
  HeartIcon,
  HomeIcon,
  MegaphoneIcon,
  RocketIcon,
  UsersIcon,
} from "@/components/icons";
import {
  CareersHero,
  CareersSection,
  CareersSectionHeader,
  CareersSectionSubtitle,
  CareersSectionTitle,
  CompleteCareersSection,
  type Department,
  DepartmentFilter,
  DepartmentGroup,
  JobCard,
  JobGrid,
  JobList,
  type JobPosition,
  type PerkItem,
  PerksGrid,
} from "./";

const meta: Meta<typeof CareersSection> = {
  title: "Organisms/Marketing/CareersSection",
  component: CareersSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CareersSection>;

// Sample job positions
const sampleJobs: JobPosition[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "full-time",
    salary: "$150k - $200k",
    description:
      "We're looking for a senior frontend developer to help build our next-generation web platform.",
    requirements: [
      "5+ years React experience",
      "TypeScript expertise",
      "Team leadership",
    ],
    posted: "2 days ago",
    href: "#",
  },
  {
    id: "2",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "remote",
    salary: "$120k - $160k",
    description:
      "Join our design team to create beautiful, user-centered experiences.",
    requirements: [
      "Figma proficiency",
      "Design systems experience",
      "User research skills",
    ],
    posted: "1 week ago",
    href: "#",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "full-time",
    salary: "$140k - $180k",
    description:
      "Help us build and maintain our cloud infrastructure at scale.",
    requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines"],
    posted: "3 days ago",
    href: "#",
  },
  {
    id: "4",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Los Angeles, CA",
    type: "full-time",
    salary: "$100k - $130k",
    description: "Lead our marketing initiatives and grow our brand presence.",
    requirements: [
      "B2B SaaS experience",
      "Data-driven approach",
      "Content strategy",
    ],
    posted: "5 days ago",
    href: "#",
  },
  {
    id: "5",
    title: "Customer Success Associate",
    department: "Customer Success",
    location: "Remote",
    type: "remote",
    salary: "$60k - $80k",
    description: "Help our customers succeed with our platform.",
    requirements: [
      "Customer service experience",
      "Technical aptitude",
      "Problem-solving",
    ],
    posted: "1 day ago",
    href: "#",
  },
  {
    id: "6",
    title: "Engineering Intern",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "internship",
    salary: "$40/hr",
    description: "Summer internship opportunity for aspiring engineers.",
    requirements: ["CS student", "JavaScript/Python", "Eagerness to learn"],
    posted: "2 weeks ago",
    href: "#",
  },
];

// Sample departments
const sampleDepartments: Department[] = [
  {
    id: "eng",
    name: "Engineering",
    description: "Build the future of our platform",
    icon: <CodeIcon className="size-5" />,
    positions: sampleJobs.filter((j) => j.department === "Engineering"),
  },
  {
    id: "design",
    name: "Design",
    description: "Create beautiful experiences",
    icon: <UsersIcon className="size-5" />,
    positions: sampleJobs.filter((j) => j.department === "Design"),
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Tell our story to the world",
    icon: <MegaphoneIcon className="size-5" />,
    positions: sampleJobs.filter((j) => j.department === "Marketing"),
  },
];

// Sample perks
const samplePerks: PerkItem[] = [
  {
    id: "1",
    icon: <HeartIcon className="size-5" />,
    title: "Health Insurance",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family.",
  },
  {
    id: "2",
    icon: <HomeIcon className="size-5" />,
    title: "Remote Work",
    description:
      "Work from anywhere with flexible hours and async-first culture.",
  },
  {
    id: "3",
    icon: <CalendarIcon className="size-5" />,
    title: "Unlimited PTO",
    description:
      "Take the time you need to recharge and maintain work-life balance.",
  },
  {
    id: "4",
    icon: <DollarSignIcon className="size-5" />,
    title: "Competitive Salary",
    description:
      "Market-rate compensation with equity options for all employees.",
  },
  {
    id: "5",
    icon: <RocketIcon className="size-5" />,
    title: "Learning Budget",
    description: "$2,000 annual budget for courses, conferences, and books.",
  },
  {
    id: "6",
    icon: <UsersIcon className="size-5" />,
    title: "Team Events",
    description:
      "Regular team offsites and virtual events to build connections.",
  },
];

export const Default: Story = {
  render: () => (
    <CareersSection>
      <CareersSectionHeader>
        <CareersSectionTitle>Open Positions</CareersSectionTitle>
        <CareersSectionSubtitle>
          Join our team and help build the future of work. We're always looking
          for talented individuals to join us.
        </CareersSectionSubtitle>
      </CareersSectionHeader>

      <JobGrid columns={2}>
        {sampleJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </JobGrid>
    </CareersSection>
  ),
};

export const CompactCards: Story = {
  render: () => (
    <CareersSection>
      <CareersSectionHeader>
        <CareersSectionTitle>We're Hiring</CareersSectionTitle>
        <CareersSectionSubtitle>
          Explore our open positions and find your next opportunity.
        </CareersSectionSubtitle>
      </CareersSectionHeader>

      <JobList>
        {sampleJobs.map((job) => (
          <JobCard key={job.id} job={job} variant="compact" />
        ))}
      </JobList>
    </CareersSection>
  ),
};

export const DetailedCards: Story = {
  render: () => (
    <CareersSection>
      <CareersSectionHeader>
        <CareersSectionTitle>Career Opportunities</CareersSectionTitle>
        <CareersSectionSubtitle>
          Find your dream job and join an amazing team.
        </CareersSectionSubtitle>
      </CareersSectionHeader>

      <JobGrid columns={2}>
        {sampleJobs.slice(0, 4).map((job) => (
          <JobCard key={job.id} job={job} variant="detailed" />
        ))}
      </JobGrid>
    </CareersSection>
  ),
};

export const ByDepartment: Story = {
  render: () => (
    <CareersSection>
      <CareersSectionHeader>
        <CareersSectionTitle>Join Our Team</CareersSectionTitle>
        <CareersSectionSubtitle>
          Explore opportunities across different departments.
        </CareersSectionSubtitle>
      </CareersSectionHeader>

      <div className="space-y-12">
        {sampleDepartments.map((dept) => (
          <DepartmentGroup
            key={dept.id}
            department={dept}
            cardVariant="compact"
          />
        ))}
      </div>
    </CareersSection>
  ),
};

export const WithDepartmentFilter: Story = {
  render: () => (
    <CareersSection>
      <CareersSectionHeader>
        <CareersSectionTitle>Open Positions</CareersSectionTitle>
        <CareersSectionSubtitle>
          Filter by department to find your fit.
        </CareersSectionSubtitle>
      </CareersSectionHeader>

      <div className="mb-8 flex justify-center">
        <DepartmentFilter
          departments={[
            "Engineering",
            "Design",
            "Marketing",
            "Customer Success",
          ]}
        />
      </div>

      <JobGrid columns={2}>
        {sampleJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </JobGrid>
    </CareersSection>
  ),
};

export const Complete: Story = {
  render: () => (
    <CompleteCareersSection
      title="Join Our Growing Team"
      subtitle="We're building something special. Come be a part of it."
      jobs={sampleJobs}
      columns={2}
      cardVariant="default"
    />
  ),
};

export const WithHero: Story = {
  render: () => (
    <CareersSection>
      <CareersHero
        title="Build the Future With Us"
        subtitle="Join a team of passionate individuals working on solving the world's most challenging problems."
        stats={[
          { value: "100+", label: "Team Members" },
          { value: "15", label: "Countries" },
          { value: "4.8", label: "Glassdoor Rating" },
        ]}
        cta={{
          text: "View Open Positions",
          href: "#positions",
        }}
      />

      <div className="mt-16">
        <JobGrid columns={2}>
          {sampleJobs.slice(0, 4).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </JobGrid>
      </div>
    </CareersSection>
  ),
};

export const WithPerks: Story = {
  render: () => (
    <CareersSection>
      <CareersSectionHeader>
        <CareersSectionTitle>Why Work With Us?</CareersSectionTitle>
        <CareersSectionSubtitle>
          We offer competitive benefits and a great work environment.
        </CareersSectionSubtitle>
      </CareersSectionHeader>

      <PerksGrid perks={samplePerks} columns={3} />

      <div className="mt-16">
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
          Open Positions
        </h3>
        <JobGrid columns={2}>
          {sampleJobs.slice(0, 4).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </JobGrid>
      </div>
    </CareersSection>
  ),
};

export const SingleColumn: Story = {
  render: () => (
    <CareersSection>
      <CareersSectionHeader align="left">
        <CareersSectionTitle>Current Openings</CareersSectionTitle>
        <CareersSectionSubtitle>
          We're always looking for talented people to join our team.
        </CareersSectionSubtitle>
      </CareersSectionHeader>

      <JobGrid columns={1}>
        {sampleJobs.map((job) => (
          <JobCard key={job.id} job={job} variant="detailed" />
        ))}
      </JobGrid>
    </CareersSection>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <CompleteCareersSection
      title="Open Positions"
      subtitle="Find your next career opportunity with us."
      jobs={sampleJobs}
      columns={3}
      cardVariant="default"
    />
  ),
};
