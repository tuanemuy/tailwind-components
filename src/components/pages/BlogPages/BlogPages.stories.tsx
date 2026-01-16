import type { Meta, StoryObj } from "@storybook/react";
import {
  FacebookIcon,
  GlobeIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/lib/icons";
import { BlogListPage, BlogPostPage } from ".";

// BlogListPage meta
const blogListMeta: Meta<typeof BlogListPage> = {
  title: "Pages/BlogPages/BlogListPage",
  component: BlogListPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["grid", "list", "magazine"],
    },
    loading: {
      control: "boolean",
    },
  },
};

export default blogListMeta;
type BlogListStory = StoryObj<typeof BlogListPage>;

// Logo component
const Logo = () => (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">Preline</span>
  </div>
);

// Sample categories
const sampleCategories = [
  { id: "all", name: "All", count: 24 },
  { id: "technology", name: "Technology", slug: "technology", count: 8 },
  { id: "design", name: "Design", slug: "design", count: 6 },
  { id: "business", name: "Business", slug: "business", count: 5 },
  { id: "marketing", name: "Marketing", slug: "marketing", count: 5 },
];

// Sample posts
const samplePosts = [
  {
    id: "1",
    title: "Getting Started with React 19: What's New and Exciting",
    slug: "getting-started-react-19",
    excerpt:
      "Explore the latest features in React 19 including the new compiler, Actions, and more.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "1",
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      bio: "Senior Developer",
    },
    category: { id: "technology", name: "Technology", slug: "technology" },
    tags: ["React", "JavaScript", "Web Development"],
    publishedAt: "March 15, 2025",
    readingTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Designing for Accessibility: A Comprehensive Guide",
    slug: "designing-accessibility-guide",
    excerpt:
      "Learn how to create inclusive designs that work for everyone, regardless of ability.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "2",
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      bio: "UX Designer",
    },
    category: { id: "design", name: "Design", slug: "design" },
    tags: ["Accessibility", "UX", "Design"],
    publishedAt: "March 12, 2025",
    readingTime: "6 min read",
  },
  {
    id: "3",
    title: "The Future of AI in Business: Trends to Watch in 2025",
    slug: "ai-business-trends-2025",
    excerpt:
      "Discover how artificial intelligence is reshaping industries and what to expect next.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "3",
      name: "Mike Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      bio: "Tech Analyst",
    },
    category: { id: "business", name: "Business", slug: "business" },
    tags: ["AI", "Business", "Technology"],
    publishedAt: "March 10, 2025",
    readingTime: "10 min read",
  },
  {
    id: "4",
    title: "Building a Strong Brand Identity from Scratch",
    slug: "building-brand-identity",
    excerpt:
      "Step-by-step guide to creating a memorable brand that resonates with your audience.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "4",
      name: "Sarah Williams",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      bio: "Brand Strategist",
    },
    category: { id: "marketing", name: "Marketing", slug: "marketing" },
    tags: ["Branding", "Marketing", "Strategy"],
    publishedAt: "March 8, 2025",
    readingTime: "7 min read",
  },
  {
    id: "5",
    title: "Modern CSS Techniques You Should Know",
    slug: "modern-css-techniques",
    excerpt:
      "Level up your CSS skills with these modern techniques and best practices.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "1",
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      bio: "Senior Developer",
    },
    category: { id: "technology", name: "Technology", slug: "technology" },
    tags: ["CSS", "Web Development", "Frontend"],
    publishedAt: "March 5, 2025",
    readingTime: "5 min read",
  },
  {
    id: "6",
    title: "Content Marketing Strategies That Actually Work",
    slug: "content-marketing-strategies",
    excerpt:
      "Proven strategies to create content that drives engagement and conversions.",
    content: "",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "4",
      name: "Sarah Williams",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      bio: "Brand Strategist",
    },
    category: { id: "marketing", name: "Marketing", slug: "marketing" },
    tags: ["Content", "Marketing", "SEO"],
    publishedAt: "March 3, 2025",
    readingTime: "9 min read",
  },
];

// Default blog list
export const Default: BlogListStory = {
  args: {
    posts: samplePosts,
    categories: sampleCategories,
    logo: <Logo />,
    navigation: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 5,
      onPageChange: (page) => console.log("Page:", page),
    },
    onCategoryChange: (categoryId) => console.log("Category:", categoryId),
    onSearch: (query) => console.log("Search:", query),
  },
};

// Grid layout
export const GridLayout: BlogListStory = {
  args: {
    variant: "grid",
    posts: samplePosts,
    categories: sampleCategories,
    logo: <Logo />,
    onCategoryChange: (categoryId) => console.log("Category:", categoryId),
  },
};

// List layout
export const ListLayout: BlogListStory = {
  args: {
    variant: "list",
    posts: samplePosts,
    categories: sampleCategories,
    logo: <Logo />,
    onCategoryChange: (categoryId) => console.log("Category:", categoryId),
  },
};

// Magazine layout
export const MagazineLayout: BlogListStory = {
  args: {
    variant: "magazine",
    posts: samplePosts,
    categories: sampleCategories,
    logo: <Logo />,
    onCategoryChange: (categoryId) => console.log("Category:", categoryId),
  },
};

// With search
export const WithSearch: BlogListStory = {
  args: {
    posts: samplePosts,
    categories: sampleCategories,
    logo: <Logo />,
    onSearch: (query) => console.log("Search:", query),
  },
};

// BlogPostPage stories
export const BlogPost: StoryObj<typeof BlogPostPage> = {
  render: (args) => <BlogPostPage {...args} />,
  args: {
    post: {
      id: "1",
      title: "Getting Started with React 19: What's New and Exciting",
      slug: "getting-started-react-19",
      excerpt:
        "Explore the latest features in React 19 including the new compiler, Actions, and more.",
      content: `
        <p>React 19 is finally here, bringing a host of exciting new features that will transform how we build web applications. In this comprehensive guide, we'll explore everything you need to know about the latest version of React.</p>

        <h2 id="new-compiler">The New React Compiler</h2>
        <p>One of the most significant additions in React 19 is the new compiler. This compiler automatically optimizes your React code, eliminating the need for manual memoization in most cases.</p>

        <h2 id="actions">Server Actions and Form Handling</h2>
        <p>React 19 introduces a new way to handle form submissions with Actions. This feature makes it easier to handle loading states, errors, and optimistic updates.</p>

        <h2 id="use-hook">The new use() Hook</h2>
        <p>The new use() hook is a game-changer for working with promises and context in React. It allows you to read resources during render, making data fetching patterns much simpler.</p>

        <h2 id="improvements">Other Improvements</h2>
        <p>React 19 also includes improvements to ref handling, better support for Web Components, and enhanced developer tools.</p>

        <h2 id="conclusion">Conclusion</h2>
        <p>React 19 represents a significant step forward for the library. The new features make it easier to build performant, user-friendly applications while reducing boilerplate code.</p>
      `,
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
      author: {
        id: "1",
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        bio: "Senior Software Engineer with 10+ years of experience in web development. Passionate about React and modern JavaScript.",
      },
      category: { id: "technology", name: "Technology", slug: "technology" },
      tags: ["React", "JavaScript", "Web Development"],
      publishedAt: "March 15, 2025",
      readingTime: "8 min read",
    },
    tableOfContents: [
      { id: "new-compiler", title: "The New React Compiler", level: 2 },
      { id: "actions", title: "Server Actions and Form Handling", level: 2 },
      { id: "use-hook", title: "The new use() Hook", level: 2 },
      { id: "improvements", title: "Other Improvements", level: 2 },
      { id: "conclusion", title: "Conclusion", level: 2 },
    ],
    relatedPosts: samplePosts.slice(1, 4),
    showTableOfContents: true,
    showShareButtons: true,
    shareButtons: [
      {
        icon: <TwitterIcon className="size-4" />,
        label: "Twitter",
        onClick: () => console.log("Share Twitter"),
      },
      {
        icon: <LinkedInIcon className="size-4" />,
        label: "LinkedIn",
        onClick: () => console.log("Share LinkedIn"),
      },
      {
        icon: <FacebookIcon className="size-4" />,
        label: "Facebook",
        onClick: () => console.log("Share Facebook"),
      },
    ],
    logo: <Logo />,
    navigation: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
    ],
  },
};

// Blog post without TOC
export const BlogPostSimple: StoryObj<typeof BlogPostPage> = {
  render: (args) => <BlogPostPage {...args} />,
  args: {
    post: samplePosts[0],
    relatedPosts: samplePosts.slice(1, 4),
    showTableOfContents: false,
    showShareButtons: true,
    logo: <Logo />,
  },
};

// Blog post with comments
export const BlogPostWithComments: StoryObj<typeof BlogPostPage> = {
  render: (args) => <BlogPostPage {...args} />,
  args: {
    post: {
      ...samplePosts[0],
      content: "<p>This is a sample blog post content...</p>",
    },
    comments: [
      {
        id: "1",
        author: {
          name: "Alice",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        },
        content: "Great article! Very informative.",
        createdAt: "2 hours ago",
        likes: 5,
      },
      {
        id: "2",
        author: {
          name: "Bob",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        },
        content: "Thanks for sharing this. Really helpful!",
        createdAt: "1 day ago",
        likes: 3,
      },
    ],
    showComments: true,
    onComment: (comment) => console.log("New comment:", comment),
    logo: <Logo />,
  },
};
