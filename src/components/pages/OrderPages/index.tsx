"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Badge, Button, Link } from "@/components/atoms";
import { FormField, Tab, Tabs } from "@/components/molecules";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Header,
  HeaderLogo,
  PageContent,
  PageLayout,
  PageSection,
  Timeline,
  TimelineItemComponent,
} from "@/components/organisms";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  SearchIcon,
  ShoppingBagIcon,
  TruckIcon,
  UserIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// =============================================================================
// Shared Types
// =============================================================================

export interface OrderItem {
  id: string;
  name: string;
  image?: string;
  variant?: string;
  quantity: number;
  price: number;
}

export interface OrderStatus {
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  date: string;
  description?: string;
}

// =============================================================================
// CheckOrderPage - 注文確認ページ（ゲスト）
// =============================================================================

export interface CheckOrderPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  onSearch?: (orderId: string, email: string) => void;
  onCreateAccount?: () => void;
  onLogin?: () => void;
  loading?: boolean;
  error?: string;
}

export const CheckOrderPage = forwardRef<HTMLDivElement, CheckOrderPageProps>(
  (
    {
      className,
      logo,
      title = "Track your order",
      subtitle = "Enter your order number and email to check your order status.",
      onSearch,
      onCreateAccount,
      onLogin,
      loading = false,
      error,
      ...props
    },
    ref,
  ) => {
    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(orderId, email);
    };

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {/* Header */}
        <Header
          variant="bordered"
          logo={logo && <HeaderLogo>{logo}</HeaderLogo>}
          actions={
            <div className="flex items-center gap-2">
              {onLogin && (
                <Button variant="ghost" size="sm" onClick={onLogin}>
                  Sign in
                </Button>
              )}
              {onCreateAccount && (
                <Button size="sm" onClick={onCreateAccount}>
                  Create account
                </Button>
              )}
            </div>
          }
        />

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
          <div className="w-full max-w-md">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <PackageIcon className="size-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Form */}
            <Card variant="bordered">
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField
                    label="Order number"
                    required
                    inputProps={{
                      value: orderId,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setOrderId(e.target.value),
                      placeholder: "e.g., ORD-12345",
                      leftIcon: (
                        <SearchIcon className="size-4 text-muted-foreground" />
                      ),
                    }}
                  />
                  <FormField
                    label="Email address"
                    type="email"
                    required
                    helpText="The email you used when placing your order"
                    inputProps={{
                      value: email,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value),
                      placeholder: "you@example.com",
                      leftIcon: (
                        <MailIcon className="size-4 text-muted-foreground" />
                      ),
                    }}
                  />

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={!orderId || !email}
                  >
                    <SearchIcon className="size-4 mr-2" />
                    Track order
                  </Button>
                </form>
              </CardBody>
            </Card>

            {/* Additional links */}
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                Having trouble finding your order?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  },
);
CheckOrderPage.displayName = "CheckOrderPage";

// =============================================================================
// OrderCheckupPage - 注文追跡ページ（タブ切り替え）
// =============================================================================

export interface OrderDetails {
  id: string;
  date: string;
  status: OrderStatus["status"];
  statusHistory: OrderStatus[];
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  total: number;
  currency?: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export interface OrderCheckupPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  order: OrderDetails;
  onTrackShipment?: () => void;
  onContactSupport?: () => void;
  onReorder?: () => void;
  onReturnItem?: (itemId: string) => void;
  onContinueShopping?: () => void;
  showTabs?: boolean;
}

export const OrderCheckupPage = forwardRef<
  HTMLDivElement,
  OrderCheckupPageProps
>(
  (
    {
      className,
      logo,
      order,
      onTrackShipment,
      onContactSupport,
      onReorder,
      onReturnItem,
      onContinueShopping,
      showTabs = true,
      ...props
    },
    ref,
  ) => {
    const [activeTab, setActiveTab] = useState("status");

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: order.currency || "USD",
      }).format(price);
    };

    const getStatusIcon = (status: OrderStatus["status"]) => {
      switch (status) {
        case "pending":
          return <ClockIcon className="size-4" />;
        case "confirmed":
        case "processing":
          return <PackageIcon className="size-4" />;
        case "shipped":
          return <TruckIcon className="size-4" />;
        case "delivered":
          return <CheckCircleIcon className="size-4" />;
        default:
          return <PackageIcon className="size-4" />;
      }
    };

    const getStatusColor = (status: OrderStatus["status"]) => {
      switch (status) {
        case "delivered":
          return "success";
        case "cancelled":
          return "destructive";
        case "shipped":
          return "info";
        default:
          return "secondary";
      }
    };

    const renderStatusTab = () => (
      <div className="space-y-6">
        {/* Current status */}
        <Card variant="bordered">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <div>
                <Badge variant={getStatusColor(order.status)} className="mb-2">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <h3 className="font-semibold text-foreground">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Placed on {order.date}
                </p>
              </div>
              {order.estimatedDelivery && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery
                  </p>
                  <p className="font-medium text-foreground">
                    {order.estimatedDelivery}
                  </p>
                </div>
              )}
            </div>

            {/* Tracking info */}
            {order.trackingNumber && (
              <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Tracking number
                  </p>
                  <p className="font-medium text-foreground">
                    {order.trackingNumber}
                  </p>
                  {order.carrier && (
                    <p className="text-xs text-muted-foreground">
                      via {order.carrier}
                    </p>
                  )}
                </div>
                {onTrackShipment && (
                  <Button variant="outline" size="sm" onClick={onTrackShipment}>
                    Track shipment
                  </Button>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Status timeline */}
        <Card variant="bordered">
          <CardHeader title="Order progress" />
          <CardBody>
            <Timeline>
              {order.statusHistory.map((status, index) => (
                <TimelineItemComponent
                  key={`${status.status}-${status.date}`}
                  icon={getStatusIcon(status.status)}
                  title={
                    status.status.charAt(0).toUpperCase() +
                    status.status.slice(1)
                  }
                  description={status.description}
                  timestamp={status.date}
                  dotVariant={
                    index < order.statusHistory.length - 1
                      ? "success"
                      : index === order.statusHistory.length - 1
                        ? "primary"
                        : "default"
                  }
                  isLast={index === order.statusHistory.length - 1}
                />
              ))}
            </Timeline>
          </CardBody>
        </Card>
      </div>
    );

    const renderItemsTab = () => (
      <Card variant="bordered">
        <CardHeader title={`Items (${order.items.length})`} />
        <CardBody>
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-20 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  {item.variant && (
                    <p className="text-sm text-muted-foreground">
                      {item.variant}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  {onReturnItem && order.status === "delivered" && (
                    <button
                      type="button"
                      onClick={() => onReturnItem(item.id)}
                      className="text-sm text-primary hover:underline mt-1"
                    >
                      Return item
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="mt-6 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">
                {formatPrice(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">
                {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">{formatPrice(order.tax)}</span>
            </div>
            {order.discount && order.discount > 0 && (
              <div className="flex justify-between text-sm text-success">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </CardBody>
        {onReorder && (
          <CardFooter>
            <Button variant="outline" onClick={onReorder} className="w-full">
              Reorder items
            </Button>
          </CardFooter>
        )}
      </Card>
    );

    const renderShippingTab = () => (
      <Card variant="bordered">
        <CardHeader title="Shipping address" />
        <CardBody>
          <div className="flex items-start gap-3">
            <MapPinIcon className="size-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">
                {order.shippingAddress.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.country}
              </p>
              {order.shippingAddress.phone && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                  <PhoneIcon className="size-4" />
                  {order.shippingAddress.phone}
                </p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    );

    return (
      <PageLayout
        ref={ref}
        header={
          <Header
            variant="bordered"
            logo={logo && <HeaderLogo>{logo}</HeaderLogo>}
          />
        }
        className={className}
        {...props}
      >
        <PageContent maxWidth="4xl" padding="lg">
          <PageSection>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                Order Details
              </h1>
              {onContinueShopping && (
                <Button variant="outline" onClick={onContinueShopping}>
                  Continue shopping
                </Button>
              )}
            </div>

            {showTabs ? (
              <Tabs
                value={activeTab}
                onChange={setActiveTab}
                variant="bordered"
              >
                <Tab value="status" label="Status">
                  {renderStatusTab()}
                </Tab>
                <Tab value="items" label="Items">
                  {renderItemsTab()}
                </Tab>
                <Tab value="shipping" label="Shipping">
                  {renderShippingTab()}
                </Tab>
              </Tabs>
            ) : (
              <div className="space-y-6">
                {renderStatusTab()}
                {renderItemsTab()}
                {renderShippingTab()}
              </div>
            )}

            {/* Support section */}
            {onContactSupport && (
              <Card variant="bordered" className="mt-6">
                <CardBody className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    Need help with your order?
                  </p>
                  <Button variant="outline" onClick={onContactSupport}>
                    Contact support
                  </Button>
                </CardBody>
              </Card>
            )}
          </PageSection>
        </PageContent>
      </PageLayout>
    );
  },
);
OrderCheckupPage.displayName = "OrderCheckupPage";

// =============================================================================
// GuestCheckoutPage - ゲストチェックアウト選択ページ
// =============================================================================

export interface GuestCheckoutPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  onGuestCheckout?: () => void;
  onLogin?: () => void;
  onCreateAccount?: () => void;
  itemCount?: number;
  cartTotal?: number;
  currency?: string;
  benefits?: string[];
}

export const GuestCheckoutPage = forwardRef<
  HTMLDivElement,
  GuestCheckoutPageProps
>(
  (
    {
      className,
      logo,
      title = "How would you like to checkout?",
      subtitle = "Choose an option to continue with your purchase.",
      onGuestCheckout,
      onLogin,
      onCreateAccount,
      itemCount = 0,
      cartTotal = 0,
      currency = "USD",
      benefits = [
        "Track your order status",
        "Access order history",
        "Faster checkout next time",
        "Exclusive member discounts",
      ],
      ...props
    },
    ref,
  ) => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(price);
    };

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {/* Header */}
        <Header
          variant="bordered"
          logo={logo && <HeaderLogo>{logo}</HeaderLogo>}
          actions={
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShoppingBagIcon className="size-4" />
              <span>{itemCount} items</span>
              <span className="mx-2">|</span>
              <span className="font-medium text-foreground">
                {formatPrice(cartTotal)}
              </span>
            </div>
          }
        />

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 py-8">
          <div className="w-full max-w-2xl">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Guest checkout */}
              <Card variant="bordered" className="relative">
                <CardBody className="text-center py-8">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <ShoppingBagIcon className="size-6 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Checkout as guest
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    No account required. Just enter your details and complete
                    your purchase.
                  </p>
                  <Button
                    variant="outline"
                    onClick={onGuestCheckout}
                    className="w-full"
                  >
                    Continue as guest
                    <ChevronRightIcon className="size-4 ml-2" />
                  </Button>
                </CardBody>
              </Card>

              {/* Sign in or create account */}
              <Card variant="bordered" className="relative border-primary">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Recommended
                </Badge>
                <CardBody className="text-center py-8">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <UserIcon className="size-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Sign in or create account
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get these benefits when you sign in:
                  </p>
                  <ul className="text-sm text-left space-y-2 mb-6">
                    {benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <CheckCircleIcon className="size-4 text-success shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2">
                    <Button onClick={onLogin}>Sign in</Button>
                    <Button variant="outline" onClick={onCreateAccount}>
                      Create account
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Security note */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              Your information is secure and will only be used to process your
              order.
            </p>
          </div>
        </main>
      </div>
    );
  },
);
GuestCheckoutPage.displayName = "GuestCheckoutPage";
