import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Separator } from "@/components/atoms/Separator";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from "./index";

const meta: Meta<typeof Drawer> = {
  title: "Organisms/Layout/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Interactive wrapper for drawer stories
const DrawerDemo = ({
  position = "right",
  size = "md",
  children,
}: {
  position?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open {position.charAt(0).toUpperCase() + position.slice(1)} Drawer
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        size={size}
      >
        {children || (
          <>
            <DrawerHeader title="Drawer Title" subtitle="Optional subtitle" />
            <DrawerBody>
              <p className="text-muted-foreground">
                This is the drawer body content. You can put any content here.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save</Button>
            </DrawerFooter>
          </>
        )}
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const LeftDrawer: Story = {
  render: () => <DrawerDemo position="left" />,
};

export const TopDrawer: Story = {
  render: () => <DrawerDemo position="top" size="md" />,
};

export const BottomDrawer: Story = {
  render: () => <DrawerDemo position="bottom" size="md" />,
};

export const LargeDrawer: Story = {
  render: () => <DrawerDemo size="lg" />,
};

export const UserProfile: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>View Profile</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <DrawerHeader title="User Profile" />
          <DrawerBody padding="none">
            {/* Profile Header */}
            <div className="p-6 text-center border-b border-border">
              <Avatar
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400"
                alt="John Doe"
                size="xl"
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Product Designer</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="success" size="sm">
                  Online
                </Badge>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  About
                </h4>
                <dl className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <dt className="text-muted-foreground">Email:</dt>
                    <dd>john.doe@example.com</dd>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <dt className="text-muted-foreground">Location:</dt>
                    <dd>San Francisco, CA</dd>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <dt className="text-muted-foreground">Timezone:</dt>
                    <dd>PST (UTC-8)</dd>
                  </div>
                </dl>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">UI Design</Badge>
                  <Badge variant="secondary">UX Research</Badge>
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">Prototyping</Badge>
                </div>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
            <Button className="flex-1">Follow</Button>
          </DrawerFooter>
        </Drawer>
      </div>
    );
  },
};

export const FilterDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="left"
        >
          <DrawerHeader title="Filters" />
          <DrawerBody>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  {["Electronics", "Clothing", "Books", "Home & Garden"].map(
                    (item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{item}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-3">Price Range</h4>
                <div className="space-y-2">
                  {["$0 - $25", "$25 - $50", "$50 - $100", "$100+"].map(
                    (item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="price"
                          className="rounded-full"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-3">Rating</h4>
                <div className="space-y-2">
                  {["4+ stars", "3+ stars", "2+ stars", "1+ stars"].map(
                    (item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{item}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter align="between">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Clear All
            </Button>
            <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
          </DrawerFooter>
        </Drawer>
      </div>
    );
  },
};

export const NoOverlay: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          Open Drawer (No Overlay)
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showOverlay={false}
        >
          <DrawerHeader title="No Overlay" />
          <DrawerBody>
            <p className="text-muted-foreground">
              This drawer does not have a backdrop overlay. The page behind
              remains interactive.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </div>
    );
  },
};
