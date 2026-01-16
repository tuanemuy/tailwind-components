import type { Meta, StoryObj } from "@storybook/react";
import {
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  HeartIcon,
  RocketIcon,
  ShieldIcon,
  UsersIcon,
  ZapIcon,
} from "@/lib/icons";
import {
  CareersDetailPage,
  type CaseStudyPage,
  type CustomerStoryPage,
} from "./index";

// =============================================================================
// CareersDetailPage Stories
// =============================================================================

const careersDetailMeta: Meta<typeof CareersDetailPage> = {
  title: "Pages/ArticlePages/CareersDetailPage",
  component: CareersDetailPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default careersDetailMeta;
type CareersDetailStory = StoryObj<typeof CareersDetailPage>;

export const DefaultCareersDetail: CareersDetailStory = {
  args: {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    locationType: "hybrid",
    employmentType: "full-time",
    salary: "$150,000 - $200,000",
    postedDate: "January 5, 2026",
    closingDate: "February 28, 2026",
    experienceLevel: "5+ years",
    companyName: "TechCorp",
    companyDescription:
      "We're building the future of cloud computing with innovative solutions that help businesses scale globally.",
    companySize: "500-1000",
    companyIndustry: "Technology",
    description: (
      <div>
        <p>
          We're looking for a Senior Frontend Engineer to join our growing team.
          You'll work on our flagship product, building beautiful and performant
          user interfaces that millions of users interact with daily.
        </p>
        <p className="mt-4">
          This is an opportunity to work with cutting-edge technologies and make
          a real impact on how people work and collaborate online.
        </p>
      </div>
    ),
    responsibilities: [
      "Lead the development of new frontend features and improvements",
      "Collaborate with designers to implement pixel-perfect UI components",
      "Mentor junior developers and conduct code reviews",
      "Optimize application performance and ensure accessibility standards",
      "Contribute to technical architecture decisions",
      "Write comprehensive tests and documentation",
    ],
    requirements: [
      {
        category: "Technical Skills",
        items: [
          "5+ years of experience with React, Vue, or similar frameworks",
          "Strong proficiency in TypeScript and modern JavaScript",
          "Experience with state management solutions (Redux, Zustand, etc.)",
          "Understanding of web performance optimization techniques",
          "Familiarity with testing frameworks (Jest, Testing Library, Cypress)",
        ],
      },
      {
        category: "Soft Skills",
        items: [
          "Excellent communication and collaboration skills",
          "Ability to work independently and take ownership",
          "Experience mentoring other developers",
          "Strong problem-solving abilities",
        ],
      },
    ],
    niceToHave: [
      "Experience with Next.js or similar meta-frameworks",
      "Knowledge of GraphQL and REST API design",
      "Contributions to open source projects",
      "Experience with design systems and component libraries",
      "Background in UX/UI design",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "GraphQL",
      "PostgreSQL",
      "AWS",
      "Docker",
      "GitHub Actions",
    ],
    benefits: [
      {
        icon: <HeartIcon className="size-5" />,
        title: "Health Insurance",
        description: "Comprehensive medical, dental, and vision coverage",
      },
      {
        icon: <GlobeIcon className="size-5" />,
        title: "Remote Flexibility",
        description: "Work from anywhere with flexible hours",
      },
      {
        icon: <RocketIcon className="size-5" />,
        title: "Learning Budget",
        description: "$3,000 annual budget for courses and conferences",
      },
      {
        icon: <UsersIcon className="size-5" />,
        title: "Team Events",
        description: "Quarterly team retreats and monthly social events",
      },
    ],
    relatedJobs: [
      {
        id: "1",
        title: "Staff Frontend Engineer",
        department: "Engineering",
        location: "Remote",
        href: "#",
      },
      {
        id: "2",
        title: "Frontend Tech Lead",
        department: "Engineering",
        location: "New York, NY",
        href: "#",
      },
      {
        id: "3",
        title: "Senior Backend Engineer",
        department: "Engineering",
        location: "San Francisco, CA",
        href: "#",
      },
    ],
    navigation: [
      { id: "1", label: "All Jobs", href: "#" },
      { id: "2", label: "Engineering", href: "#", active: true },
      { id: "3", label: "Product", href: "#" },
      { id: "4", label: "Design", href: "#" },
    ],
    onApply: () => console.log("Apply clicked"),
    onSave: () => console.log("Save clicked"),
    onShare: () => console.log("Share clicked"),
  },
};

export const RemotePosition: CareersDetailStory = {
  args: {
    ...DefaultCareersDetail.args,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Worldwide",
    locationType: "remote",
    employmentType: "full-time",
    salary: "$120,000 - $160,000",
    experienceLevel: "3+ years",
    description: (
      <p>
        Join our infrastructure team to build and maintain the systems that
        power our global platform. You'll work with modern cloud technologies
        and help us scale to millions of users.
      </p>
    ),
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure on AWS and GCP",
      "Monitor system performance and respond to incidents",
      "Automate operational tasks and improve developer experience",
    ],
    requirements: [
      {
        category: "Required",
        items: [
          "3+ years of DevOps or SRE experience",
          "Strong Linux administration skills",
          "Experience with Kubernetes and Docker",
          "Proficiency in Python, Go, or similar languages",
        ],
      },
    ],
    techStack: [
      "Kubernetes",
      "Docker",
      "Terraform",
      "AWS",
      "GCP",
      "Python",
      "Go",
    ],
    benefits: [
      {
        icon: <GlobeIcon className="size-5" />,
        title: "100% Remote",
        description: "Work from anywhere in the world",
      },
      {
        icon: <ZapIcon className="size-5" />,
        title: "Equipment Budget",
        description: "$2,500 for your home office setup",
      },
    ],
  },
};

export const InternshipPosition: CareersDetailStory = {
  args: {
    ...DefaultCareersDetail.args,
    title: "Software Engineering Intern",
    department: "Engineering",
    location: "San Francisco, CA",
    locationType: "onsite",
    employmentType: "internship",
    salary: "$45/hour",
    experienceLevel: "0-1 years",
    closingDate: "March 15, 2026",
    description: (
      <p>
        Join us for a 12-week summer internship program! You'll work on real
        projects alongside experienced engineers and gain hands-on experience
        with modern development practices.
      </p>
    ),
    responsibilities: [
      "Contribute to production codebase under mentorship",
      "Participate in team meetings and code reviews",
      "Complete a capstone project presented to the company",
    ],
    requirements: [
      {
        category: "Requirements",
        items: [
          "Currently pursuing a CS degree or equivalent",
          "Basic programming skills in any language",
          "Eagerness to learn and grow",
        ],
      },
    ],
    niceToHave: [
      "Personal projects or open source contributions",
      "Experience with web development",
    ],
    techStack: ["JavaScript", "Python", "Git"],
    benefits: [
      {
        icon: <RocketIcon className="size-5" />,
        title: "Mentorship",
        description: "1:1 mentorship from senior engineers",
      },
      {
        icon: <UsersIcon className="size-5" />,
        title: "Social Events",
        description: "Weekly intern events and activities",
      },
    ],
  },
};

// =============================================================================
// CaseStudyPage Stories
// Title: Pages/ArticlePages/CaseStudyPage
// =============================================================================

type CaseStudyStory = StoryObj<typeof CaseStudyPage>;

export const DefaultCaseStudy: CaseStudyStory = {
  args: {
    title: "How Acme Corp Increased Revenue by 150% with Our Platform",
    subtitle:
      "A deep dive into how we helped transform their digital operations",
    clientName: "Acme Corporation",
    clientIndustry: "E-commerce",
    clientSize: "500-1000 employees",
    clientWebsite: "https://example.com",
    date: "January 2026",
    readTime: "8 min read",
    category: "E-commerce",
    timeline: "6 months",
    featuredImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
    metrics: [
      {
        label: "Revenue Growth",
        value: "150%",
        change: "vs previous year",
        changeDirection: "up" as const,
      },
      {
        label: "Customer Retention",
        value: "95%",
        change: "+20%",
        changeDirection: "up" as const,
      },
      {
        label: "Load Time",
        value: "0.8s",
        change: "-60%",
        changeDirection: "down" as const,
      },
      {
        label: "Conversion Rate",
        value: "4.2%",
        change: "+85%",
        changeDirection: "up" as const,
      },
    ],
    overview: (
      <div>
        <p>
          Acme Corporation, a leading e-commerce retailer, was struggling with
          their legacy platform. Slow page loads, poor mobile experience, and
          limited scalability were hurting their growth potential.
        </p>
        <p className="mt-4">
          They partnered with us to completely transform their digital
          infrastructure, resulting in dramatic improvements across all key
          metrics.
        </p>
      </div>
    ),
    challenges: [
      {
        title: "Legacy Infrastructure",
        description:
          "Their 10-year-old platform couldn't keep up with modern demands, resulting in frequent outages during peak traffic.",
      },
      {
        title: "Poor Mobile Experience",
        description:
          "With 70% of traffic coming from mobile, their non-responsive design was costing them significant revenue.",
      },
      {
        title: "Scalability Issues",
        description:
          "Black Friday and holiday sales consistently caused site crashes, damaging customer trust.",
      },
    ],
    solutions: [
      {
        icon: <RocketIcon className="size-5" />,
        title: "Modern Architecture",
        description:
          "Rebuilt the platform using a microservices architecture with auto-scaling capabilities.",
      },
      {
        icon: <ZapIcon className="size-5" />,
        title: "Performance Optimization",
        description:
          "Implemented CDN, image optimization, and code splitting to achieve sub-second load times.",
      },
      {
        icon: <ShieldIcon className="size-5" />,
        title: "Mobile-First Design",
        description:
          "Complete redesign with mobile-first approach, resulting in 3x better mobile conversion.",
      },
    ],
    quote: {
      content:
        "The transformation was remarkable. We went from dreading peak traffic to embracing it. Our platform now handles 10x the load without breaking a sweat.",
      author: {
        name: "Sarah Johnson",
        role: "CTO",
        company: "Acme Corporation",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
    },
    resultsContent: (
      <div>
        <p>
          After six months of implementation, Acme Corporation saw
          transformative results across their entire business:
        </p>
        <ul className="mt-4 space-y-2">
          <li>• 150% increase in overall revenue</li>
          <li>• 95% customer retention rate</li>
          <li>• 60% reduction in page load time</li>
          <li>• Zero downtime during Black Friday 2025</li>
          <li>• 85% improvement in conversion rate</li>
        </ul>
      </div>
    ),
    tags: [
      { label: "E-commerce", href: "#" },
      { label: "Performance", href: "#" },
      { label: "Scalability", href: "#" },
      { label: "Mobile", href: "#" },
    ],
    relatedCaseStudies: [
      {
        id: "1",
        title: "Scaling a FinTech Startup to 10M Users",
        client: "PayFlow Inc.",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
        href: "#",
      },
      {
        id: "2",
        title: "Healthcare Platform Digital Transformation",
        client: "MedCare Systems",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
        href: "#",
      },
    ],
    navigation: [
      { id: "1", label: "All Case Studies", href: "#" },
      { id: "2", label: "E-commerce", href: "#", active: true },
      { id: "3", label: "FinTech", href: "#" },
      { id: "4", label: "Healthcare", href: "#" },
    ],
    onDownload: () => console.log("Download PDF"),
    onShare: () => console.log("Share"),
  },
};

export const TechCaseStudy: CaseStudyStory = {
  args: {
    ...DefaultCaseStudy.args,
    title: "Building a Real-Time Analytics Platform for DataStream",
    subtitle: "How we helped process 1 billion events per day",
    clientName: "DataStream Analytics",
    clientIndustry: "Technology",
    clientSize: "100-200 employees",
    category: "Technology",
    timeline: "8 months",
    metrics: [
      {
        label: "Events/Day",
        value: "1B+",
        change: "from 10M",
        changeDirection: "up" as const,
      },
      {
        label: "Latency",
        value: "<50ms",
        change: "-95%",
        changeDirection: "down" as const,
      },
      {
        label: "Uptime",
        value: "99.99%",
        change: "+0.09%",
        changeDirection: "up" as const,
      },
      {
        label: "Cost Savings",
        value: "60%",
        change: "infrastructure",
        changeDirection: "down" as const,
      },
    ],
    solutions: [
      {
        icon: <DatabaseIcon className="size-5" />,
        title: "Event Streaming",
        description:
          "Implemented Apache Kafka for high-throughput event ingestion.",
      },
      {
        icon: <ZapIcon className="size-5" />,
        title: "Real-Time Processing",
        description: "Built stream processing pipelines using Apache Flink.",
      },
      {
        icon: <CodeIcon className="size-5" />,
        title: "Scalable Storage",
        description:
          "Designed a time-series database optimized for analytics queries.",
      },
    ],
  },
};

// =============================================================================
// CustomerStoryPage Stories
// Title: Pages/ArticlePages/CustomerStoryPage
// =============================================================================

type CustomerStoryStory = StoryObj<typeof CustomerStoryPage>;

export const DefaultCustomerStory: CustomerStoryStory = {
  args: {
    title: "How StartupX Scaled from 0 to 1 Million Users in 6 Months",
    subtitle:
      "The story of rapid growth and the infrastructure that made it possible",
    category: "Startup",
    date: "January 10, 2026",
    readTime: "10 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    customer: {
      name: "Alex Chen",
      role: "Co-founder & CTO",
      company: "StartupX",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      industry: "SaaS",
      location: "Austin, TX",
      website: "https://example.com",
    },
    metrics: [
      {
        label: "Users",
        value: "1M+",
        change: "in 6 months",
        changeDirection: "up" as const,
      },
      {
        label: "Uptime",
        value: "99.9%",
        change: "during growth",
        changeDirection: "up" as const,
      },
      {
        label: "Response Time",
        value: "45ms",
        change: "p95",
        changeDirection: "down" as const,
      },
      {
        label: "Cost/User",
        value: "$0.02",
        change: "-80%",
        changeDirection: "down" as const,
      },
    ],
    testimonial: {
      highlight: "We couldn't have scaled this fast without their platform.",
      content:
        "The team was incredible to work with. They understood our challenges and helped us build infrastructure that could grow with us.",
    },
    background: (
      <p>
        StartupX launched their productivity app in early 2025 with a small team
        and big ambitions. What they didn't anticipate was going viral on
        ProductHunt and facing a 100x traffic spike overnight.
      </p>
    ),
    problem: (
      <div>
        <p>
          When StartupX hit the front page of ProductHunt, their simple Heroku
          setup couldn't handle the load. The site went down, and they were
          losing potential users by the thousands.
        </p>
        <p className="mt-4">
          They needed a solution that could scale instantly and handle
          unpredictable traffic patterns without breaking the bank.
        </p>
      </div>
    ),
    quotes: [
      {
        content:
          "We went from panicking about our site being down to confidently handling any traffic spike.",
        context: "Reflecting on the transformation",
      },
    ],
    solution: (
      <div>
        <p>
          We migrated StartupX to our serverless platform in just 48 hours. The
          auto-scaling architecture meant they never had to worry about capacity
          planning again.
        </p>
        <p className="mt-4">
          Key improvements included edge caching, database connection pooling,
          and intelligent load balancing across multiple regions.
        </p>
      </div>
    ),
    outcome: (
      <div>
        <p>
          Six months later, StartupX serves over 1 million users with 99.9%
          uptime. Their infrastructure costs actually decreased as they grew,
          thanks to efficient resource utilization.
        </p>
        <p className="mt-4">
          The team can now focus entirely on product development, knowing their
          infrastructure will scale automatically.
        </p>
      </div>
    ),
    productsUsed: [
      {
        icon: <RocketIcon className="size-4" />,
        name: "Serverless Compute",
        description: "Auto-scaling compute platform",
      },
      {
        icon: <DatabaseIcon className="size-4" />,
        name: "Managed Database",
        description: "PostgreSQL with auto-failover",
      },
      {
        icon: <GlobeIcon className="size-4" />,
        name: "Edge Network",
        description: "Global CDN and caching",
      },
    ],
    tags: [
      { label: "Startup", href: "#" },
      { label: "Scaling", href: "#" },
      { label: "Serverless", href: "#" },
    ],
    relatedStories: [
      {
        id: "1",
        title: "Enterprise Migration Success Story",
        customer: "GlobalCorp",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
        href: "#",
      },
      {
        id: "2",
        title: "How We Helped a Gaming Company Handle Launch Day",
        customer: "GameStudio Inc.",
        image:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
        href: "#",
      },
    ],
    navigation: [
      { id: "1", label: "All Stories", href: "#" },
      { id: "2", label: "Startup", href: "#", active: true },
      { id: "3", label: "Enterprise", href: "#" },
      { id: "4", label: "Gaming", href: "#" },
    ],
    onContactSales: () => console.log("Contact sales"),
    onShare: () => console.log("Share"),
  },
};

export const EnterpriseStory: CustomerStoryStory = {
  args: {
    ...DefaultCustomerStory.args,
    title: "Digital Transformation at Fortune 500 Manufacturing Company",
    subtitle: "Modernizing legacy systems while maintaining zero downtime",
    category: "Enterprise",
    customer: {
      name: "Michael Roberts",
      role: "VP of Technology",
      company: "ManufactureCo",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      industry: "Manufacturing",
      location: "Detroit, MI",
      website: "https://example.com",
    },
    metrics: [
      {
        label: "Systems Migrated",
        value: "200+",
        change: "legacy apps",
        changeDirection: "up" as const,
      },
      {
        label: "Downtime",
        value: "0",
        change: "during migration",
        changeDirection: "down" as const,
      },
      {
        label: "Cost Reduction",
        value: "40%",
        change: "annual IT spend",
        changeDirection: "down" as const,
      },
      {
        label: "Deployment Speed",
        value: "10x",
        change: "faster releases",
        changeDirection: "up" as const,
      },
    ],
    testimonial: {
      highlight: "Zero downtime migration of 200+ systems",
      content:
        "Our board was skeptical about modernizing our 30-year-old systems. The results speak for themselves.",
    },
    productsUsed: [
      {
        icon: <ShieldIcon className="size-4" />,
        name: "Enterprise Security",
        description: "SOC 2 compliant infrastructure",
      },
      {
        icon: <DatabaseIcon className="size-4" />,
        name: "Data Migration",
        description: "Zero-downtime database sync",
      },
      {
        icon: <UsersIcon className="size-4" />,
        name: "Dedicated Support",
        description: "24/7 enterprise support team",
      },
    ],
  },
};

export const VideoCustomerStory: CustomerStoryStory = {
  args: {
    ...DefaultCustomerStory.args,
    title: "Inside the Rebuild: How StreamMedia Went Global",
    subtitle: "A video-first customer story",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featuredImage: undefined,
    customer: {
      name: "Emma Watson",
      role: "Head of Engineering",
      company: "StreamMedia",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      industry: "Media & Entertainment",
      location: "Los Angeles, CA",
    },
  },
};
