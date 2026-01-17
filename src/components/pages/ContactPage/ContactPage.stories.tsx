import type { Meta, StoryObj } from "@storybook/react";
import { GitHubIcon, GlobeIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import { ContactPage } from ".";

const meta: Meta<typeof ContactPage> = {
  title: "Pages/ContactPage",
  component: ContactPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "split", "centered", "minimal"],
    },
    loading: {
      control: "boolean",
    },
    showMap: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContactPage>;

// Logo component
const Logo = () => (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">Preline</span>
  </div>
);

// Sample contact info
const sampleContactInfo = [
  {
    type: "email" as const,
    label: "Email",
    value: "hello@preline.com",
    href: "mailto:hello@preline.com",
  },
  {
    type: "phone" as const,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    type: "address" as const,
    label: "Address",
    value: "123 Innovation Drive, San Francisco, CA 94102",
  },
  {
    type: "hours" as const,
    label: "Business Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM PST",
  },
];

// Sample offices
const sampleOffices = [
  {
    name: "San Francisco (HQ)",
    address: "123 Innovation Drive, San Francisco, CA 94102",
    phone: "+1 (555) 123-4567",
    email: "sf@preline.com",
    hours: "Mon - Fri: 9AM - 6PM PST",
    mapUrl: "https://maps.google.com",
  },
  {
    name: "New York",
    address: "456 Tech Avenue, New York, NY 10001",
    phone: "+1 (555) 987-6543",
    email: "nyc@preline.com",
    hours: "Mon - Fri: 9AM - 6PM EST",
    mapUrl: "https://maps.google.com",
  },
  {
    name: "London",
    address: "789 Digital Street, London, UK EC1A 1BB",
    phone: "+44 20 1234 5678",
    email: "london@preline.com",
    hours: "Mon - Fri: 9AM - 6PM GMT",
    mapUrl: "https://maps.google.com",
  },
];

// Social links
const socialLinks = [
  {
    icon: <TwitterIcon className="size-5" />,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: <LinkedInIcon className="size-5" />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: <GitHubIcon className="size-5" />,
    href: "https://github.com",
    label: "GitHub",
  },
];

// Default contact page
export const Default: Story = {
  args: {
    contactInfo: sampleContactInfo,
    socialLinks,
    logo: <Logo />,
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

// Split layout
export const SplitLayout: Story = {
  args: {
    variant: "split",
    contactInfo: sampleContactInfo,
    socialLinks,
    logo: <Logo />,
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

// With offices
export const WithOffices: Story = {
  args: {
    contactInfo: sampleContactInfo,
    offices: sampleOffices,
    socialLinks,
    logo: <Logo />,
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

// With map
export const WithMap: Story = {
  args: {
    contactInfo: sampleContactInfo,
    showMap: true,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977877865!2d-122.39901068468204!3d37.78769977975722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c31%3A0x3930e3a4f1c47c!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1234567890",
    logo: <Logo />,
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    contactInfo: sampleContactInfo,
    loading: true,
    logo: <Logo />,
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

// Success message
export const SuccessMessage: Story = {
  args: {
    contactInfo: sampleContactInfo,
    successMessage:
      "Thank you for your message! We'll get back to you within 24 hours.",
    logo: <Logo />,
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

// Custom content
export const CustomContent: Story = {
  args: {
    title: "Let's talk",
    subtitle: "Have a question or want to work together? Drop us a line!",
    contactInfo: sampleContactInfo,
    socialLinks,
    logo: <Logo />,
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    title: "Contact Us",
    subtitle: "We're here to help and answer any questions you might have.",
    contactInfo: sampleContactInfo,
    offices: sampleOffices,
    socialLinks,
    showMap: true,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977877865!2d-122.39901068468204!3d37.78769977975722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c31%3A0x3930e3a4f1c47c!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1234567890",
    logo: <Logo />,
    navigation: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};
