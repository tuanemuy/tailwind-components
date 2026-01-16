"use client";

import type { VariantProps } from "class-variance-authority";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckIcon, ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  menuItemVariants,
  menuLabelVariants,
  menuVariants,
} from "@/lib/variants/menu";

type MenuSize = "sm" | "md" | "lg";

interface MenuContextValue {
  size: MenuSize;
  onClose?: () => void;
}

const MenuContext = createContext<MenuContextValue>({ size: "md" });

const useMenuContext = () => useContext(MenuContext);

// Menu
export interface MenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuVariants> {
  onClose?: () => void;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ className, size = "md", onClose, children, ...props }, ref) => {
    const resolvedSize = size ?? "md";
    return (
      <MenuContext.Provider value={{ size: resolvedSize, onClose }}>
        <div
          ref={ref}
          role="menu"
          className={cn(menuVariants({ size }), className)}
          {...props}
        >
          {children}
        </div>
      </MenuContext.Provider>
    );
  },
);
Menu.displayName = "Menu";

// MenuItem
export interface MenuItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof menuItemVariants> {
  icon?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  closeOnSelect?: boolean;
  disabled?: boolean;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      className,
      size: propSize,
      variant = "default",
      disabled = false,
      icon,
      shortcut,
      checked,
      closeOnSelect = true,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const { size: contextSize, onClose } = useMenuContext();
    const size = propSize ?? contextSize;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (closeOnSelect && onClose) {
        onClose();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        className={cn(menuItemVariants({ size, variant, disabled }), className)}
        onClick={handleClick}
        {...props}
      >
        {checked !== undefined && (
          <span className="size-4">
            {checked && <CheckIcon className="size-full" />}
          </span>
        )}
        {icon && <span className="size-4 shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{children}</span>
        {shortcut && (
          <span className="ms-auto text-xs text-muted-foreground">
            {shortcut}
          </span>
        )}
      </button>
    );
  },
);
MenuItem.displayName = "MenuItem";

// MenuLabel
export interface MenuLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuLabelVariants> {}

export const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ className, size: propSize, children, ...props }, ref) => {
    const { size: contextSize } = useMenuContext();
    const size = propSize ?? contextSize;

    return (
      <div
        ref={ref}
        className={cn(menuLabelVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
MenuLabel.displayName = "MenuLabel";

// MenuDivider
export const MenuDivider = forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("my-1 h-px border-0 bg-border", className)}
    {...props}
  />
));
MenuDivider.displayName = "MenuDivider";

// SubMenu
export interface SubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  icon?: React.ReactNode;
}

export const SubMenu = forwardRef<HTMLDivElement, SubMenuProps>(
  ({ className, trigger, icon, children, ...props }, _ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { size } = useMenuContext();

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
      <div ref={containerRef} className="relative" {...props}>
        <button
          type="button"
          className={cn(menuItemVariants({ size }), className)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {icon && <span className="size-4 shrink-0">{icon}</span>}
          <span className="flex-1 text-left">{trigger}</span>
          <ChevronRightIcon className="size-4" />
        </button>

        {isOpen && (
          <div
            className="absolute start-full top-0 ms-1"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Menu size={size}>{children}</Menu>
          </div>
        )}
      </div>
    );
  },
);
SubMenu.displayName = "SubMenu";

// ContextMenu wrapper
export interface ContextMenuProps {
  children: React.ReactNode;
  menu: React.ReactNode;
  disabled?: boolean;
}

export const ContextMenu = ({
  children,
  menu,
  disabled = false,
}: ContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-50"
          style={{ left: position.x, top: position.y }}
        >
          <Menu onClose={() => setIsOpen(false)}>{menu}</Menu>
        </div>
      )}
    </>
  );
};
ContextMenu.displayName = "ContextMenu";
