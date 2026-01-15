"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, Link, Textarea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import {
  PageLayout,
  PageContent,
  PageSection,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  Footer,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormBody,
  FormRow,
  FormActions,
} from "@/components/organisms";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  MessageSquareIcon,
  TwitterIcon,
  LinkedInIcon,
  GitHubIcon,
} from "@/lib/icons";

// Contact page variants
type ContactVariant = "default" | "split" | "centered" | "minimal";

// Contact info item
export interface ContactInfo {
  type: "email" | "phone" | "address" | "hours" | "custom";
  label: string;
  value: string;
  href?: string;
  icon?: ReactNode;
}

// Office location
export interface OfficeLocation {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  hours?: string;
  mapUrl?: string;
}

// ContactPage props
export interface ContactPageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ContactVariant;
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo[];
  offices?: OfficeLocation[];
  onSubmit?: (data: ContactFormData) => void;
  loading?: boolean;
  successMessage?: string;
  showMap?: boolean;
  mapUrl?: string;
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: {
    label: string;
    href: string;
  }[];
  header?: ReactNode;
  footer?: ReactNode;
  socialLinks?: {
    icon: ReactNode;
    href: string;
    label: string;
  }[];
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}

// Default contact info
const defaultContactInfo: ContactInfo[] = [
  {
    type: "email",
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    type: "phone",
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    type: "address",
    label: "Address",
    value: "123 Main Street, City, State 12345",
  },
  {
    type: "hours",
    label: "Business Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM",
  },
];

const contactIcons: Record<ContactInfo["type"], ReactNode> = {
  email: <MailIcon className="size-5" />,
  phone: <PhoneIcon className="size-5" />,
  address: <MapPinIcon className="size-5" />,
  hours: <ClockIcon className="size-5" />,
  custom: <MessageSquareIcon className="size-5" />,
};

export const ContactPage = forwardRef<HTMLDivElement, ContactPageProps>(
  (
    {
      className,
      variant = "default",
      title = "Get in touch",
      subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      contactInfo = defaultContactInfo,
      offices = [],
      onSubmit,
      loading = false,
      successMessage,
      showMap = false,
      mapUrl,
      logo,
      logoText,
      logoHref = "/",
      navigation = [],
      header,
      footer,
      socialLinks = [],
      children,
      ...props
    },
    ref,
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: ContactFormData = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      };
      onSubmit?.(data);
    };

    const renderContactInfo = () => (
      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <div key={index} className="flex gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              {info.icon || contactIcons[info.type]}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{info.label}</p>
              {info.href ? (
                <Link href={info.href} className="text-sm text-muted-foreground hover:text-primary">
                  {info.value}
                </Link>
              ) : (
                <p className="text-sm text-muted-foreground">{info.value}</p>
              )}
            </div>
          </div>
        ))}

        {socialLinks.length > 0 && (
          <div className="pt-6 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-4">Follow us</p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    const renderContactForm = () => (
      <Card variant="bordered">
        <CardHeader
          title="Send us a message"
          subtitle="Fill out the form below and we'll get back to you within 24 hours."
        />
        <CardBody>
          {successMessage ? (
            <div className="text-center py-8">
              <div className="size-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <MailIcon className="size-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Message sent!</h3>
              <p className="text-muted-foreground">{successMessage}</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormBody>
                <FormRow columns={2}>
                  <FormField
                    label="First name"
                    required
                    inputProps={{
                      name: "firstName",
                      placeholder: "John",
                    }}
                  />
                  <FormField
                    label="Last name"
                    required
                    inputProps={{
                      name: "lastName",
                      placeholder: "Doe",
                    }}
                  />
                </FormRow>
                <FormRow columns={2}>
                  <FormField
                    label="Email"
                    type="email"
                    required
                    inputProps={{
                      name: "email",
                      placeholder: "john@example.com",
                    }}
                  />
                  <FormField
                    label="Phone"
                    type="tel"
                    inputProps={{
                      name: "phone",
                      placeholder: "+1 (555) 123-4567",
                    }}
                  />
                </FormRow>
                <FormField
                  label="Company"
                  inputProps={{
                    name: "company",
                    placeholder: "Your company name",
                  }}
                />
                <FormField
                  label="Subject"
                  inputProps={{
                    name: "subject",
                    placeholder: "How can we help?",
                  }}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    required
                  />
                </div>
              </FormBody>
              <FormActions align="end" className="mt-6">
                <Button type="submit" loading={loading}>
                  Send message
                </Button>
              </FormActions>
            </Form>
          )}
        </CardBody>
      </Card>
    );

    const renderOffices = () => (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office, index) => (
          <Card key={index} variant="bordered">
            <CardBody>
              <h3 className="text-lg font-semibold text-foreground mb-3">{office.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <MapPinIcon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{office.address}</span>
                </div>
                {office.phone && (
                  <div className="flex gap-2">
                    <PhoneIcon className="size-4 text-muted-foreground shrink-0" />
                    <Link href={`tel:${office.phone}`} className="text-muted-foreground hover:text-primary">
                      {office.phone}
                    </Link>
                  </div>
                )}
                {office.email && (
                  <div className="flex gap-2">
                    <MailIcon className="size-4 text-muted-foreground shrink-0" />
                    <Link href={`mailto:${office.email}`} className="text-muted-foreground hover:text-primary">
                      {office.email}
                    </Link>
                  </div>
                )}
                {office.hours && (
                  <div className="flex gap-2">
                    <ClockIcon className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{office.hours}</span>
                  </div>
                )}
              </div>
              {office.mapUrl && (
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href={office.mapUrl} target="_blank">
                    View on map
                  </Link>
                </Button>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    );

    const renderHeader = () => {
      if (header) return header;

      return (
        <Header
          variant="bordered"
          sticky
          logo={
            <HeaderLogo href={logoHref} text={logoText}>
              {logo}
            </HeaderLogo>
          }
          navigation={
            navigation.length > 0 && (
              <HeaderNav>
                {navigation.map((item, index) => (
                  <HeaderNavItem key={index} href={item.href}>
                    {item.label}
                  </HeaderNavItem>
                ))}
              </HeaderNav>
            )
          }
        />
      );
    };

    // Split layout
    if (variant === "split") {
      return (
        <PageLayout
          ref={ref}
          header={renderHeader()}
          footer={footer || <Footer variant="simple" copyright="All rights reserved." />}
          className={className}
          {...props}
        >
          <div className="min-h-[calc(100vh-4rem)] flex">
            {/* Left side - Info */}
            <div className="hidden lg:flex lg:w-1/2 bg-muted/30 p-12 flex-col justify-center">
              <div className="max-w-md">
                <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
                <p className="text-lg text-muted-foreground mb-8">{subtitle}</p>
                {renderContactInfo()}
              </div>
            </div>
            {/* Right side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
              <div className="w-full max-w-lg">
                {renderContactForm()}
              </div>
            </div>
          </div>
        </PageLayout>
      );
    }

    // Default layout
    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        footer={footer || <Footer variant="simple" copyright="All rights reserved." />}
        className={className}
        {...props}
      >
        <PageContent maxWidth="6xl" padding="lg">
          {/* Hero section */}
          <PageSection className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          </PageSection>

          {/* Main content */}
          <PageSection>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact info */}
              <div className="lg:col-span-1">
                {renderContactInfo()}
              </div>
              {/* Contact form */}
              <div className="lg:col-span-2">
                {renderContactForm()}
              </div>
            </div>
          </PageSection>

          {/* Offices */}
          {offices.length > 0 && (
            <PageSection>
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Offices</h2>
              {renderOffices()}
            </PageSection>
          )}

          {/* Map */}
          {showMap && mapUrl && (
            <PageSection>
              <div className="rounded-lg overflow-hidden border border-border h-96">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </PageSection>
          )}

          {children}
        </PageContent>
      </PageLayout>
    );
  },
);
ContactPage.displayName = "ContactPage";
