import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "@/components/molecules/Dropdown";
import { BellIcon, SearchIcon, SettingsIcon } from "@/lib/icons";
import {
  Header,
  HeaderActions,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
} from "./index";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <Header
        logo={<HeaderLogo href="#" text="Acme Inc" />}
        navigation={
          <HeaderNav>
            <HeaderNavItem href="#" active>
              Home
            </HeaderNavItem>
            <HeaderNavItem href="#">Products</HeaderNavItem>
            <HeaderNavItem href="#">Pricing</HeaderNavItem>
            <HeaderNavItem href="#">About</HeaderNavItem>
          </HeaderNav>
        }
        actions={
          <HeaderActions>
            <Button variant="ghost">Log in</Button>
            <Button>Sign up</Button>
          </HeaderActions>
        }
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
    );
  },
};

export const WithUserMenu: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <Header
        logo={<HeaderLogo href="#" text="Dashboard" />}
        navigation={
          <HeaderNav>
            <HeaderNavItem href="#" active>
              Overview
            </HeaderNavItem>
            <HeaderNavItem href="#">Analytics</HeaderNavItem>
            <HeaderNavItem href="#">Reports</HeaderNavItem>
            <HeaderNavItem href="#">Settings</HeaderNavItem>
          </HeaderNav>
        }
        actions={
          <HeaderActions>
            <Button variant="ghost" size="sm" className="size-9 p-0">
              <SearchIcon className="size-5" />
            </Button>
            <Button variant="ghost" size="sm" className="size-9 p-0 relative">
              <BellIcon className="size-5" />
              <Badge
                variant="destructive"
                size="sm"
                className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px]"
              >
                3
              </Badge>
            </Button>
          </HeaderActions>
        }
        userMenu={
          <Dropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 focus:outline-none"
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400"
                  alt="User"
                  size="sm"
                />
              </button>
            }
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <DropdownDivider />
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Billing</DropdownItem>
            <DropdownDivider />
            <DropdownItem destructive>Sign out</DropdownItem>
          </Dropdown>
        }
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
    );
  },
};

export const Transparent: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 min-h-[200px]">
        <Header
          variant="transparent"
          logo={<HeaderLogo href="#" text="Startup" className="text-white" />}
          navigation={
            <HeaderNav>
              <HeaderNavItem
                href="#"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                Features
              </HeaderNavItem>
              <HeaderNavItem
                href="#"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                Pricing
              </HeaderNavItem>
              <HeaderNavItem
                href="#"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                About
              </HeaderNavItem>
            </HeaderNav>
          }
          actions={
            <HeaderActions>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Log in
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                Get Started
              </Button>
            </HeaderActions>
          }
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
    );
  },
};

export const Elevated: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <Header
        variant="elevated"
        logo={<HeaderLogo href="#" text="Elevated" />}
        navigation={
          <HeaderNav>
            <HeaderNavItem href="#" active>
              Home
            </HeaderNavItem>
            <HeaderNavItem href="#">Services</HeaderNavItem>
            <HeaderNavItem href="#">Contact</HeaderNavItem>
          </HeaderNav>
        }
        actions={
          <HeaderActions>
            <Button>Contact Us</Button>
          </HeaderActions>
        }
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
    );
  },
};

export const MobileOpen: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(true);

    return (
      <div className="max-w-md mx-auto border rounded-lg overflow-hidden">
        <Header
          logo={<HeaderLogo href="#" text="Mobile" />}
          navigation={
            <HeaderNav orientation="vertical">
              <HeaderNavItem href="#" active>
                Home
              </HeaderNavItem>
              <HeaderNavItem href="#">Products</HeaderNavItem>
              <HeaderNavItem href="#">About</HeaderNavItem>
              <HeaderNavItem href="#">Contact</HeaderNavItem>
            </HeaderNav>
          }
          actions={
            <HeaderActions>
              <Button className="w-full">Sign up</Button>
            </HeaderActions>
          }
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
    );
  },
};

export const SimpleHeader: Story = {
  render: () => (
    <Header
      logo={<HeaderLogo href="#" text="Simple" />}
      actions={
        <HeaderActions>
          <Button variant="ghost" size="sm" className="size-9 p-0">
            <SettingsIcon className="size-5" />
          </Button>
        </HeaderActions>
      }
      showMobileMenuButton={false}
    />
  ),
};
