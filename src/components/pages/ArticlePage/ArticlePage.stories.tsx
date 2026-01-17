import type { Meta, StoryObj } from "@storybook/react";
import { GlobeIcon } from "@/components/icons";
import { ArticleCard, ArticleContent, ArticlePage } from ".";

const meta: Meta<typeof ArticlePage> = {
  title: "Pages/ArticlePage",
  component: ArticlePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["default", "centered", "wide", "sidebar"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticlePage>;

// Sample logo
const Logo = (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
  </div>
);

// Sample navigation
const navigation = [
  { id: "home", label: "Home", href: "/" },
  { id: "blog", label: "Blog", href: "/blog", active: true },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

// Sample author
const author = {
  name: "Sarah Johnson",
  avatar: "https://i.pravatar.cc/150?img=5",
  role: "Senior Writer",
  bio: "Sarah is a senior writer with over 10 years of experience in technology journalism. She specializes in cloud computing and developer tools.",
  href: "/authors/sarah-johnson",
};

// Sample tags
const tags = [
  { label: "React", href: "/tags/react" },
  { label: "TypeScript", href: "/tags/typescript" },
  { label: "Web Development", href: "/tags/web-development" },
  { label: "Tutorial" },
];

// Sample table of contents
const tableOfContents = [
  { id: "introduction", label: "Introduction", level: 1 },
  { id: "getting-started", label: "Getting Started", level: 1 },
  { id: "installation", label: "Installation", level: 2 },
  { id: "configuration", label: "Configuration", level: 2 },
  { id: "best-practices", label: "Best Practices", level: 1 },
  { id: "performance", label: "Performance Tips", level: 2 },
  { id: "conclusion", label: "Conclusion", level: 1 },
];

// Sample related articles
const relatedArticles = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    excerpt: "Learn the basics of Next.js and build your first application.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    href: "/blog/nextjs-14",
    date: "Jan 10, 2024",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS",
    excerpt: "Advanced techniques for building beautiful UIs with Tailwind.",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=400&q=80",
    href: "/blog/tailwind-css",
    date: "Jan 8, 2024",
  },
  {
    id: "3",
    title: "State Management in React",
    excerpt: "Compare different state management solutions for React apps.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80",
    href: "/blog/react-state",
    date: "Jan 5, 2024",
  },
];

// Sample content
const SampleContent = () => (
  <ArticleContent>
    <h2 id="introduction">Introduction</h2>
    <p>
      Building modern web applications requires a solid understanding of
      component architecture and design patterns. In this comprehensive guide,
      we&apos;ll explore the best practices for creating reusable, maintainable
      components.
    </p>
    <p>
      Whether you&apos;re just starting out or looking to level up your skills,
      this article will provide valuable insights and practical examples.
    </p>

    <h2 id="getting-started">Getting Started</h2>
    <p>
      Before we dive into the technical details, let&apos;s set up our
      development environment and understand the prerequisites.
    </p>

    <h3 id="installation">Installation</h3>
    <p>
      First, you&apos;ll need to install the necessary dependencies. Run the
      following command in your terminal:
    </p>
    <pre>
      <code>npm install @preline/ui tailwindcss postcss autoprefixer</code>
    </pre>

    <h3 id="configuration">Configuration</h3>
    <p>
      Next, configure your tailwind.config.js file to include the component
      library paths and extend the default theme as needed.
    </p>
    <pre>
      <code>{`module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@preline/ui/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}</code>
    </pre>

    <h2 id="best-practices">Best Practices</h2>
    <p>
      Following best practices ensures your code is maintainable, scalable, and
      performs well in production environments.
    </p>

    <h3 id="performance">Performance Tips</h3>
    <ul>
      <li>Use code splitting to reduce initial bundle size</li>
      <li>Implement lazy loading for images and components</li>
      <li>Memoize expensive computations with useMemo and useCallback</li>
      <li>Optimize re-renders with React.memo</li>
    </ul>

    <blockquote>
      <p>
        &quot;The key to building great software is not about writing more code,
        it&apos;s about writing the right code.&quot;
      </p>
    </blockquote>

    <h2 id="conclusion">Conclusion</h2>
    <p>
      We&apos;ve covered a lot of ground in this article, from setting up your
      development environment to implementing best practices for performance
      optimization.
    </p>
    <p>
      Remember, the best way to learn is by doing. Start building your own
      projects and apply these concepts in real-world scenarios.
    </p>
  </ArticleContent>
);

// Default article
export const Default: Story = {
  args: {
    layout: "default",
    title: "Building Modern Web Applications with React and TypeScript",
    subtitle:
      "A comprehensive guide to creating scalable, type-safe applications",
    featuredImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    author,
    date: "January 15, 2024",
    readTime: "8 min read",
    category: "Development",
    categoryHref: "/category/development",
    tags,
    logo: Logo,
    logoText: "Preline Blog",
    navigation,
    previousArticle: {
      title: "Introduction to TypeScript Generics",
      href: "/blog/typescript-generics",
    },
    nextArticle: {
      title: "Advanced React Patterns",
      href: "/blog/react-patterns",
    },
    relatedArticles,
    children: <SampleContent />,
  },
};

// Centered layout
export const CenteredLayout: Story = {
  args: {
    ...Default.args,
    layout: "centered",
  },
};

// Wide layout
export const WideLayout: Story = {
  args: {
    ...Default.args,
    layout: "wide",
  },
};

// With sidebar (table of contents)
export const WithSidebar: Story = {
  args: {
    ...Default.args,
    layout: "sidebar",
    tableOfContents,
  },
};

// Without featured image
export const WithoutImage: Story = {
  args: {
    layout: "default",
    title: "Understanding JavaScript Closures",
    subtitle: "A deep dive into one of JavaScript's most important concepts",
    author,
    date: "January 12, 2024",
    readTime: "5 min read",
    category: "JavaScript",
    tags: [
      { label: "JavaScript" },
      { label: "Closures" },
      { label: "Fundamentals" },
    ],
    logo: Logo,
    logoText: "Preline Blog",
    navigation,
    children: <SampleContent />,
  },
};

// Minimal (no author, no navigation)
export const Minimal: Story = {
  args: {
    layout: "centered",
    title: "Quick Tips for Better CSS",
    date: "January 8, 2024",
    readTime: "3 min read",
    showFooter: false,
    children: <SampleContent />,
  },
};

// With all related content
export const FullArticle: Story = {
  args: {
    ...Default.args,
    layout: "sidebar",
    tableOfContents,
    relatedArticles,
  },
};

// Article cards showcase
export const ArticleCards: Story = {
  render: () => (
    <div className="p-8 space-y-12">
      {/* Default cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Default Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              author={author}
              readTime="5 min read"
              category="Development"
            />
          ))}
        </div>
      </section>

      {/* Horizontal cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Horizontal Cards</h2>
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              variant="horizontal"
              author={author}
              readTime="5 min read"
              category="Development"
            />
          ))}
        </div>
      </section>

      {/* Featured card */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Card</h2>
        <ArticleCard
          title="The Future of Web Development: Trends to Watch in 2024"
          excerpt="Explore the emerging technologies and patterns that will shape how we build for the web."
          image="https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80"
          href="/blog/future-web-dev"
          variant="featured"
          author={author}
          date="January 1, 2024"
          category="Trends"
        />
      </section>
    </div>
  ),
};
