"use client";

import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, Badge, Link, Avatar } from "@/components/atoms";
import { Tabs, Tab, Rating, IconButton } from "@/components/molecules";
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
  CardBody,
  ProductGallery,
  ProductDetails as ProductDetailsComponent,
  ProductListing,
  type GalleryImage,
  type ProductListingItem,
} from "@/components/organisms";
import {
  HeartIcon,
  ShareIcon,
  ShoppingBagIcon,
  TruckIcon,
  RefreshIcon,
  ShieldIcon,
  StarIcon,
  CheckIcon,
} from "@/lib/icons";

// Product data
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency?: string;
  images: GalleryImage[];
  category: {
    name: string;
    slug: string;
  };
  brand?: string;
  sku?: string;
  inStock: boolean;
  stockCount?: number;
  variants?: ProductVariant[];
  specifications?: {
    label: string;
    value: string;
  }[];
  features?: string[];
  rating?: {
    average: number;
    count: number;
  };
  reviews?: ProductReview[];
  badges?: {
    type: "sale" | "new" | "bestseller" | "limited";
    label: string;
  }[];
}

export interface ProductVariant {
  id: string;
  name: string;
  type: "size" | "color" | "material" | "style";
  options: {
    id: string;
    label: string;
    value: string;
    available: boolean;
    priceModifier?: number;
  }[];
}

export interface ProductReview {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  rating: number;
  title?: string;
  content: string;
  date: string;
  helpful?: number;
  images?: string[];
}

// ProductPage props
export interface ProductPageProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  relatedProducts?: ProductListingItem[];
  recentlyViewed?: ProductListingItem[];
  onAddToCart?: (productId: string, quantity: number, variants: Record<string, string>) => void;
  onAddToWishlist?: (productId: string) => void;
  onShare?: () => void;
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: {
    label: string;
    href: string;
  }[];
  header?: ReactNode;
  footer?: ReactNode;
  cartItemCount?: number;
  policies?: {
    icon: ReactNode;
    title: string;
    description: string;
  }[];
}

// Default policies
const defaultPolicies = [
  {
    icon: <TruckIcon className="size-5" />,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: <RefreshIcon className="size-5" />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: <ShieldIcon className="size-5" />,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
];

export const ProductPage = forwardRef<HTMLDivElement, ProductPageProps>(
  (
    {
      className,
      product,
      relatedProducts = [],
      recentlyViewed = [],
      onAddToCart,
      onAddToWishlist,
      onShare,
      logo,
      logoText,
      logoHref = "/",
      navigation = [],
      header,
      footer,
      cartItemCount = 0,
      policies = defaultPolicies,
      children,
      ...props
    },
    ref,
  ) => {
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    const handleVariantChange = (type: string, value: string) => {
      setSelectedVariants((prev) => ({ ...prev, [type]: value }));
    };

    const handleAddToCart = () => {
      onAddToCart?.(product.id, quantity, selectedVariants);
    };

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: product.currency || "USD",
      }).format(price);
    };

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
          actions={
            <div className="flex items-center gap-2">
              <IconButton
                icon={<HeartIcon className="size-5" />}
                variant="ghost"
                size="sm"
                label="Wishlist"
              />
              <div className="relative">
                <IconButton
                  icon={<ShoppingBagIcon className="size-5" />}
                  variant="ghost"
                  size="sm"
                  label="Cart"
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
            </div>
          }
        />
      );
    };

    const renderBreadcrumbs = () => (
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-foreground">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>
    );

    const renderVariants = () => (
      <div className="space-y-4">
        {product.variants?.map((variant) => (
          <div key={variant.id}>
            <p className="text-sm font-medium text-foreground mb-2">
              {variant.name}: {selectedVariants[variant.type] || "Select"}
            </p>
            <div className="flex flex-wrap gap-2">
              {variant.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleVariantChange(variant.type, option.value)}
                  disabled={!option.available}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                    selectedVariants[variant.type] === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : option.available
                        ? "border-border hover:border-primary"
                        : "border-border bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    const renderQuantitySelector = () => (
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-foreground">Quantity:</p>
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-muted transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-border min-w-[50px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-muted transition-colors"
          >
            +
          </button>
        </div>
      </div>
    );

    const renderPolicies = () => (
      <div className="grid grid-cols-3 gap-4">
        {policies.map((policy, index) => (
          <div key={index} className="text-center p-3">
            <div className="size-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
              {policy.icon}
            </div>
            <p className="text-sm font-medium text-foreground">{policy.title}</p>
            <p className="text-xs text-muted-foreground">{policy.description}</p>
          </div>
        ))}
      </div>
    );

    const renderReviews = () => (
      <div className="space-y-6">
        {/* Review summary */}
        {product.rating && (
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{product.rating.average.toFixed(1)}</p>
              <Rating value={product.rating.average} readonly size="sm" />
              <p className="text-sm text-muted-foreground mt-1">{product.rating.count} reviews</p>
            </div>
          </div>
        )}

        {/* Reviews list */}
        <div className="space-y-4">
          {product.reviews?.map((review) => (
            <Card key={review.id} variant="bordered">
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={review.author.avatar}
                      alt={review.author.name}
                      initials={review.author.name.split(" ").map(n => n[0]).join("")}
                      size="sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{review.author.name}</p>
                        {review.author.verified && (
                          <Badge variant="soft" size="sm">
                            <CheckIcon className="size-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <Rating value={review.rating} readonly size="sm" />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                {review.title && (
                  <h4 className="font-medium text-foreground mb-1">{review.title}</h4>
                )}
                <p className="text-sm text-muted-foreground">{review.content}</p>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Review image ${index + 1}`}
                        className="size-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );

    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        footer={footer || <Footer variant="simple" copyright="All rights reserved." />}
        className={className}
        {...props}
      >
        <PageContent maxWidth="6xl" padding="lg">
          {/* Breadcrumbs */}
          {renderBreadcrumbs()}

          {/* Product details */}
          <PageSection>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Gallery */}
              <div>
                <ProductGallery
                  images={product.images}
                  variant="thumbnails"
                />
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Badges */}
                {product.badges && product.badges.length > 0 && (
                  <div className="flex gap-2">
                    {product.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant={badge.type === "sale" ? "destructive" : "default"}
                      >
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title and rating */}
                <div>
                  {product.brand && (
                    <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                  )}
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h1>
                  {product.rating && (
                    <div className="flex items-center gap-2">
                      <Rating value={product.rating.average} readonly size="sm" />
                      <span className="text-sm text-muted-foreground">
                        ({product.rating.count} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <Badge variant="destructive">
                        Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                      </Badge>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{product.description}</p>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && renderVariants()}

                {/* Quantity */}
                {renderQuantitySelector()}

                {/* Stock status */}
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <>
                      <span className="size-2 rounded-full bg-success" />
                      <span className="text-sm text-success">
                        In stock
                        {product.stockCount && product.stockCount < 10 && (
                          <span className="text-muted-foreground"> - Only {product.stockCount} left</span>
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="size-2 rounded-full bg-destructive" />
                      <span className="text-sm text-destructive">Out of stock</span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingBagIcon className="size-5 mr-2" />
                    Add to Cart
                  </Button>
                  <IconButton
                    icon={<HeartIcon className="size-5" />}
                    variant="outline"
                    size="lg"
                    label="Add to wishlist"
                    onClick={() => onAddToWishlist?.(product.id)}
                  />
                  <IconButton
                    icon={<ShareIcon className="size-5" />}
                    variant="outline"
                    size="lg"
                    label="Share"
                    onClick={onShare}
                  />
                </div>

                {/* Policies */}
                {renderPolicies()}
              </div>
            </div>
          </PageSection>

          {/* Tabs: Description, Specifications, Reviews */}
          <PageSection>
            <Tabs value={activeTab} onValueChange={setActiveTab} variant="underline">
              <Tab value="description">Description</Tab>
              {product.specifications && product.specifications.length > 0 && (
                <Tab value="specifications">Specifications</Tab>
              )}
              {product.reviews && product.reviews.length > 0 && (
                <Tab value="reviews">
                  Reviews ({product.reviews.length})
                </Tab>
              )}
            </Tabs>

            <div className="mt-6">
              {activeTab === "description" && (
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>{product.description}</p>
                  {product.features && (
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === "specifications" && product.specifications && (
                <div className="grid gap-2">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex justify-between py-3 px-4",
                        index % 2 === 0 && "bg-muted/50 rounded-lg"
                      )}
                    >
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && renderReviews()}
            </div>
          </PageSection>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <PageSection>
              <h2 className="text-2xl font-bold text-foreground mb-6">You might also like</h2>
              <ProductListing
                products={relatedProducts}
                variant="grid"
                columns={4}
              />
            </PageSection>
          )}

          {/* Recently viewed */}
          {recentlyViewed.length > 0 && (
            <PageSection>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recently Viewed</h2>
              <ProductListing
                products={recentlyViewed}
                variant="grid"
                columns={4}
              />
            </PageSection>
          )}

          {children}
        </PageContent>
      </PageLayout>
    );
  },
);
ProductPage.displayName = "ProductPage";
