"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Badge, Checkbox } from "@/components/atoms";
import { PlusIcon, ShoppingBagIcon, CheckIcon } from "@/lib/icons";

// Types
export interface LookItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  category?: string;
  selected?: boolean;
  inStock?: boolean;
  href?: string;
}

export interface CompleteTheLookProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  mainImage?: string;
  mainImageAlt?: string;
  items: LookItem[];
  selectedItems?: string[];
  variant?: "default" | "compact" | "horizontal";
  showTotalPrice?: boolean;
  onItemSelect?: (itemId: string, selected: boolean) => void;
  onAddAllToCart?: (items: LookItem[]) => void;
  onItemClick?: (item: LookItem) => void;
}

const formatPrice = (amount: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const CompleteTheLook = forwardRef<HTMLDivElement, CompleteTheLookProps>(
  (
    {
      className,
      title = "Complete the Look",
      description,
      mainImage,
      mainImageAlt,
      items,
      selectedItems: controlledSelectedItems,
      variant = "default",
      showTotalPrice = true,
      onItemSelect,
      onAddAllToCart,
      onItemClick,
      ...props
    },
    ref,
  ) => {
    const [internalSelectedItems, setInternalSelectedItems] = useState<string[]>(
      items.filter((item) => item.selected).map((item) => item.id),
    );

    const selectedItems = controlledSelectedItems ?? internalSelectedItems;

    const handleItemSelect = (itemId: string, selected: boolean) => {
      if (controlledSelectedItems === undefined) {
        setInternalSelectedItems((prev) =>
          selected ? [...prev, itemId] : prev.filter((id) => id !== itemId),
        );
      }
      onItemSelect?.(itemId, selected);
    };

    const selectedItemsData = items.filter((item) => selectedItems.includes(item.id));
    const totalPrice = selectedItemsData.reduce((sum, item) => sum + item.price, 0);
    const totalOriginalPrice = selectedItemsData.reduce(
      (sum, item) => sum + (item.originalPrice || item.price),
      0,
    );
    const hasSavings = totalOriginalPrice > totalPrice;

    if (variant === "compact") {
      return (
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {showTotalPrice && selectedItems.length > 0 && (
              <div className="text-right">
                <span className="font-semibold text-foreground">
                  {formatPrice(totalPrice)}
                </span>
                {hasSavings && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    {formatPrice(totalOriginalPrice)}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {items.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "relative flex-shrink-0 size-20 rounded-lg overflow-hidden border-2 transition-all",
                  selectedItems.includes(item.id)
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-muted-foreground",
                  !item.inStock && "opacity-50",
                )}
                onClick={() => handleItemSelect(item.id, !selectedItems.includes(item.id))}
                disabled={!item.inStock}
              >
                <img src={item.image} alt={item.name} className="size-full object-cover" />
                {selectedItems.includes(item.id) && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="size-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckIcon className="size-3 text-primary-foreground" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {onAddAllToCart && selectedItems.length > 0 && (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => onAddAllToCart(selectedItemsData)}
            >
              <ShoppingBagIcon className="size-4 mr-2" />
              Add {selectedItems.length} Items to Cart
            </Button>
          )}
        </div>
      );
    }

    if (variant === "horizontal") {
      return (
        <div ref={ref} className={cn("space-y-6", className)} {...props}>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            {description && <p className="mt-1 text-muted-foreground">{description}</p>}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {mainImage && (
              <div className="flex-shrink-0 w-64 aspect-[3/4] rounded-xl overflow-hidden bg-muted">
                <img src={mainImage} alt={mainImageAlt || title} className="size-full object-cover" />
              </div>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex-shrink-0 w-48 rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md",
                  selectedItems.includes(item.id) && "ring-2 ring-primary",
                )}
              >
                <div className="relative aspect-square">
                  <img src={item.image} alt={item.name} className="size-full object-cover" />
                  <button
                    className={cn(
                      "absolute top-2 right-2 size-6 rounded-full flex items-center justify-center transition-colors",
                      selectedItems.includes(item.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/80 text-foreground hover:bg-background",
                    )}
                    onClick={() => handleItemSelect(item.id, !selectedItems.includes(item.id))}
                    disabled={!item.inStock}
                  >
                    {selectedItems.includes(item.id) ? (
                      <CheckIcon className="size-3" strokeWidth={3} />
                    ) : (
                      <PlusIcon className="size-3" />
                    )}
                  </button>
                </div>
                <div className="p-3">
                  {item.category && (
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {item.category}
                    </span>
                  )}
                  <h4
                    className="text-sm font-medium text-foreground line-clamp-1 cursor-pointer hover:text-primary"
                    onClick={() => onItemClick?.(item)}
                  >
                    {item.name}
                  </h4>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={cn("text-sm font-semibold", item.originalPrice && "text-destructive")}>
                      {formatPrice(item.price, item.currency)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(item.originalPrice, item.currency)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showTotalPrice && selectedItems.length > 0 && (
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                  {hasSavings && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(totalOriginalPrice)}
                      </span>
                      <Badge variant="destructive" size="sm">
                        Save {formatPrice(totalOriginalPrice - totalPrice)}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              {onAddAllToCart && (
                <Button variant="primary" onClick={() => onAddAllToCart(selectedItemsData)}>
                  <ShoppingBagIcon className="size-4 mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          )}
        </div>
      );
    }

    // Default variant - grid with main image
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          {description && <p className="mt-1 text-muted-foreground">{description}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main styled image */}
          {mainImage && (
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
              <img src={mainImage} alt={mainImageAlt || title} className="size-full object-cover" />

              {/* Hotspots/indicators pointing to items */}
              <div className="absolute inset-0 pointer-events-none">
                {items.slice(0, 4).map((item, index) => {
                  const positions = [
                    { top: "20%", left: "30%" },
                    { top: "40%", right: "25%" },
                    { top: "60%", left: "40%" },
                    { bottom: "20%", right: "35%" },
                  ];
                  const pos = positions[index];

                  return (
                    <button
                      key={item.id}
                      className={cn(
                        "absolute size-8 rounded-full bg-background/80 backdrop-blur-sm border-2 flex items-center justify-center pointer-events-auto transition-all hover:scale-110",
                        selectedItems.includes(item.id) ? "border-primary" : "border-border",
                      )}
                      style={pos}
                      onClick={() => handleItemSelect(item.id, !selectedItems.includes(item.id))}
                    >
                      <PlusIcon className="size-4 text-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Items list */}
          <div className="space-y-4">
            {items.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              const hasDiscount = item.originalPrice && item.originalPrice > item.price;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex gap-4 p-3 rounded-lg border transition-colors",
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground",
                    !item.inStock && "opacity-50",
                  )}
                >
                  <div
                    className="relative flex-shrink-0 size-20 rounded-lg overflow-hidden bg-muted cursor-pointer"
                    onClick={() => onItemClick?.(item)}
                  >
                    <img src={item.image} alt={item.name} className="size-full object-cover" />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">Sold Out</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {item.category && (
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {item.category}
                      </span>
                    )}
                    <h4
                      className="font-medium text-foreground line-clamp-1 cursor-pointer hover:text-primary"
                      onClick={() => onItemClick?.(item)}
                    >
                      {item.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={cn("font-semibold", hasDiscount ? "text-destructive" : "text-foreground")}>
                        {formatPrice(item.price, item.currency)}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice!, item.currency)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) => handleItemSelect(item.id, e.target.checked)}
                      disabled={!item.inStock}
                    />
                  </div>
                </div>
              );
            })}

            {/* Total and Add to Cart */}
            {showTotalPrice && (
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">
                    Total ({selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""})
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                    {hasSavings && (
                      <div className="text-sm">
                        <span className="text-muted-foreground line-through mr-2">
                          {formatPrice(totalOriginalPrice)}
                        </span>
                        <span className="text-success font-medium">
                          Save {formatPrice(totalOriginalPrice - totalPrice)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {onAddAllToCart && (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => onAddAllToCart(selectedItemsData)}
                    disabled={selectedItems.length === 0}
                  >
                    <ShoppingBagIcon className="size-4 mr-2" />
                    Add {selectedItems.length > 0 ? `${selectedItems.length} Items` : "Selected Items"} to Cart
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
CompleteTheLook.displayName = "CompleteTheLook";

// ShopTheLook - Slider variant for multiple looks
export interface ShopTheLookProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  looks: Array<{
    id: string;
    image: string;
    imageAlt?: string;
    items: LookItem[];
  }>;
  onLookClick?: (lookId: string) => void;
  onItemClick?: (item: LookItem) => void;
}

export const ShopTheLook = forwardRef<HTMLDivElement, ShopTheLookProps>(
  ({ className, title = "Shop the Look", looks, onLookClick, onItemClick, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>

        <div className="relative group">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {looks.map((look) => (
              <div key={look.id} className="flex-shrink-0 w-72">
                <div
                  className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted cursor-pointer group/look"
                  onClick={() => onLookClick?.(look.id)}
                >
                  <img src={look.image} alt={look.imageAlt || "Look"} className="size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/look:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/look:opacity-100 transition-opacity">
                    <div className="flex -space-x-2">
                      {look.items.slice(0, 4).map((item, index) => (
                        <div
                          key={item.id}
                          className="size-10 rounded-full border-2 border-background overflow-hidden"
                          style={{ zIndex: 10 - index }}
                        >
                          <img src={item.image} alt={item.name} className="size-full object-cover" />
                        </div>
                      ))}
                      {look.items.length > 4 && (
                        <div className="size-10 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                          <span className="text-xs font-medium text-muted-foreground">
                            +{look.items.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-white">
                      {look.items.length} products
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
ShopTheLook.displayName = "ShopTheLook";
