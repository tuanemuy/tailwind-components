import { forwardRef, type ReactNode, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { RatingDisplay } from "@/components/molecules/Rating";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ProductDetailModal
export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: { id: string; value: string; available?: boolean }[];
}

export interface ProductDetail {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  features?: string[];
}

export interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (data: {
    productId: string;
    quantity: number;
    variants: Record<string, string>;
  }) => void;
  onAddToWishlist?: (productId: string) => void;
  product: ProductDetail;
  loading?: boolean;
  className?: string;
}

export const ProductDetailModal = forwardRef<
  HTMLDivElement,
  ProductDetailModalProps
>(
  (
    {
      isOpen,
      onClose,
      onAddToCart,
      onAddToWishlist,
      product,
      loading,
      className,
    },
    ref,
  ) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState<
      Record<string, string>
    >({});
    const [isWishlisted, setIsWishlisted] = useState(false);

    const currency = product.currency || "$";
    const hasDiscount =
      product.originalPrice && product.originalPrice > product.price;
    const discountPercent =
      hasDiscount && product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const handlePrevImage = () => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1,
      );
    };

    const handleNextImage = () => {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1,
      );
    };

    const handleVariantChange = (variantName: string, optionId: string) => {
      setSelectedVariants((prev) => ({ ...prev, [variantName]: optionId }));
    };

    const handleAddToCart = () => {
      onAddToCart({
        productId: product.id,
        quantity,
        variants: selectedVariants,
      });
    };

    const handleWishlist = () => {
      setIsWishlisted((prev) => !prev);
      onAddToWishlist?.(product.id);
    };

    const allVariantsSelected =
      !product.variants ||
      product.variants.every((v) => selectedVariants[v.name]);

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader showCloseButton bordered={false} />

        <ModalBody padding="md">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Image gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                {product.images.length > 0 && (
                  <img
                    src={product.images[currentImageIndex].url}
                    alt={product.images[currentImageIndex].alt || product.name}
                    className="size-full object-cover"
                  />
                )}
                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute start-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
                    >
                      <ChevronLeftIcon className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
                    >
                      <ChevronRightIcon className="size-5" />
                    </button>
                  </>
                )}
                {hasDiscount && (
                  <Badge
                    variant="destructive"
                    className="absolute start-2 top-2"
                  >
                    -{discountPercent}%
                  </Badge>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      type="button"
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "size-16 shrink-0 overflow-hidden rounded-lg border-2",
                        currentImageIndex === index
                          ? "border-primary"
                          : "border-transparent",
                      )}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${product.name} ${index + 1}`}
                        className="size-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {product.name}
                </h2>
                {product.rating !== undefined && (
                  <div className="mt-1 flex items-center gap-2">
                    <RatingDisplay value={product.rating} size="sm" />
                    {product.reviewCount !== undefined && (
                      <span className="text-sm text-muted-foreground">
                        ({product.reviewCount} reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {currency}
                  {product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {currency}
                    {product.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              )}

              {/* Variants */}
              {product.variants?.map((variant) => (
                <div key={variant.name}>
                  <span className="mb-2 block text-sm font-medium text-foreground">
                    {variant.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => {
                      const isSelected =
                        selectedVariants[variant.name] === option.id;
                      return (
                        <button
                          type="button"
                          key={option.id}
                          onClick={() =>
                            handleVariantChange(variant.name, option.id)
                          }
                          disabled={option.available === false || loading}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-muted-foreground/50",
                            option.available === false &&
                              "cursor-not-allowed opacity-50 line-through",
                          )}
                        >
                          {option.value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div>
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Quantity
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={loading || quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={loading}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <ul className="space-y-1">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckIcon className="size-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Stock status */}
              {product.inStock !== undefined && (
                <Badge variant={product.inStock ? "success" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          {onAddToWishlist && (
            <Button
              variant="outline"
              onClick={handleWishlist}
              disabled={loading}
            >
              <HeartIcon
                className={cn(
                  "size-4",
                  isWishlisted && "fill-current text-destructive",
                )}
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleAddToCart}
            loading={loading}
            disabled={!allVariantsSelected || product.inStock === false}
            className="flex-1 md:flex-initial"
          >
            <ShoppingBagIcon className="size-4" />
            Add to Cart
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
ProductDetailModal.displayName = "ProductDetailModal";

// SizeGuideModal
export interface SizeChartRow {
  size: string;
  measurements: Record<string, string>;
}

export interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: ReactNode;
  headers: string[];
  rows: SizeChartRow[];
  notes?: string[];
  measurementUnit?: "cm" | "inches";
  className?: string;
}

export const SizeGuideModal = forwardRef<HTMLDivElement, SizeGuideModalProps>(
  (
    {
      isOpen,
      onClose,
      title = "Size Guide",
      subtitle,
      headers,
      rows,
      notes = [],
      measurementUnit = "cm",
      className,
    },
    ref,
  ) => {
    const [unit, setUnit] = useState<"cm" | "inches">(measurementUnit);

    const convertValue = (value: string): string => {
      if (unit === "inches" && measurementUnit === "cm") {
        const num = Number.parseFloat(value);
        if (!Number.isNaN(num)) {
          return (num / 2.54).toFixed(1);
        }
      }
      if (unit === "cm" && measurementUnit === "inches") {
        const num = Number.parseFloat(value);
        if (!Number.isNaN(num)) {
          return (num * 2.54).toFixed(1);
        }
      }
      return value;
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        className={className}
      >
        <ModalHeader title={title} subtitle={subtitle} showCloseButton />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Unit toggle */}
            <div className="flex items-center justify-end gap-2">
              <span className="text-sm text-muted-foreground">Unit:</span>
              <div className="flex rounded-lg border border-border p-1">
                <button
                  type="button"
                  onClick={() => setUnit("cm")}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    unit === "cm"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("inches")}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    unit === "inches"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  inches
                </button>
              </div>
            </div>

            {/* Size chart table */}
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-start text-sm font-medium text-foreground">
                      Size
                    </th>
                    {headers.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-start text-sm font-medium text-foreground"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={row.size}
                      className={cn(
                        "border-b border-border last:border-b-0",
                        index % 2 === 0 ? "bg-background" : "bg-muted/30",
                      )}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {row.size}
                      </td>
                      {headers.map((header) => (
                        <td
                          key={header}
                          className="px-4 py-3 text-sm text-muted-foreground"
                        >
                          {convertValue(row.measurements[header] || "-")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes */}
            {notes.length > 0 && (
              <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-foreground">Notes:</p>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
SizeGuideModal.displayName = "SizeGuideModal";

// ViewLookModal (Complete the look / Outfit view)
export interface LookItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export interface ViewLookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (items: string[]) => void;
  onViewItem?: (itemId: string) => void;
  title?: string;
  subtitle?: ReactNode;
  mainImage: string;
  items: LookItem[];
  currency?: string;
  loading?: boolean;
  className?: string;
}

export const ViewLookModal = forwardRef<HTMLDivElement, ViewLookModalProps>(
  (
    {
      isOpen,
      onClose,
      onAddToCart,
      onViewItem,
      title = "Complete the Look",
      subtitle,
      mainImage,
      items,
      currency = "$",
      loading,
      className,
    },
    ref,
  ) => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(
      new Set(items.map((i) => i.id)),
    );

    const toggleItem = (itemId: string) => {
      setSelectedItems((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        return next;
      });
    };

    const totalPrice = items
      .filter((item) => selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.price, 0);

    const handleAddToCart = () => {
      onAddToCart(Array.from(selectedItems));
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Main look image */}
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img
                src={mainImage}
                alt="Complete look"
                className="size-full object-cover"
              />
            </div>

            {/* Items */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select items to add to your cart
              </p>
              <div className="space-y-3">
                {items.map((item) => {
                  const isSelected = selectedItems.has(item.id);
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex gap-3 rounded-lg border p-3 transition-colors",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        disabled={loading}
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border",
                        )}
                      >
                        {isSelected && <CheckIcon className="size-3" />}
                      </button>

                      <button
                        type="button"
                        className="size-16 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-muted"
                        onClick={() => onViewItem?.(item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      </button>

                      <div className="min-w-0 flex-1">
                        {item.category && (
                          <p className="text-xs text-muted-foreground">
                            {item.category}
                          </p>
                        )}
                        <button
                          type="button"
                          className="cursor-pointer truncate font-medium text-foreground hover:underline"
                          onClick={() => onViewItem?.(item.id)}
                        >
                          {item.name}
                        </button>
                        <p className="text-sm font-semibold text-foreground">
                          {currency}
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">
                  {selectedItems.size} items selected
                </span>
                <span className="text-lg font-bold text-foreground">
                  {currency}
                  {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            loading={loading}
            disabled={selectedItems.size === 0}
          >
            <ShoppingBagIcon className="size-4" />
            Add {selectedItems.size} items to Cart
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
ViewLookModal.displayName = "ViewLookModal";
