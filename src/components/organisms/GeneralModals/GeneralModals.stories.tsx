import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { InvoiceModal, KeyboardShortcutsModal, LocationModal } from "./index";

const meta: Meta = {
  title: "Organisms/Overlays/GeneralModals",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Keyboard Shortcuts Modal Stories
export const KeyboardShortcuts: StoryObj<typeof KeyboardShortcutsModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const shortcuts = [
      {
        name: "General",
        shortcuts: [
          { label: "Open command palette", keys: ["Cmd", "K"] },
          { label: "Save changes", keys: ["Cmd", "S"] },
          { label: "Undo", keys: ["Cmd", "Z"] },
          { label: "Redo", keys: ["Cmd", "Shift", "Z"] },
          { label: "Show keyboard shortcuts", keys: ["Cmd", "/"] },
        ],
      },
      {
        name: "Navigation",
        shortcuts: [
          { label: "Go to Dashboard", keys: ["Cmd", "1"] },
          { label: "Go to Projects", keys: ["Cmd", "2"] },
          { label: "Go to Tasks", keys: ["Cmd", "3"] },
          { label: "Go to Settings", keys: ["Cmd", "4"] },
        ],
      },
      {
        name: "Editing",
        shortcuts: [
          { label: "Bold text", keys: ["Cmd", "B"] },
          { label: "Italic text", keys: ["Cmd", "I"] },
          { label: "Underline text", keys: ["Cmd", "U"] },
          { label: "Insert link", keys: ["Cmd", "Shift", "L"] },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Keyboard Shortcuts</Button>
        <KeyboardShortcutsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          categories={shortcuts}
        />
      </>
    );
  },
};

export const KeyboardShortcutsWindows: StoryObj<typeof KeyboardShortcutsModal> =
  {
    render: () => {
      const [isOpen, setIsOpen] = useState(false);
      const shortcuts = [
        {
          name: "General",
          shortcuts: [
            { label: "Open command palette", keys: ["Ctrl", "K"] },
            { label: "Save changes", keys: ["Ctrl", "S"] },
            { label: "Undo", keys: ["Ctrl", "Z"] },
            { label: "Redo", keys: ["Ctrl", "Y"] },
          ],
        },
        {
          name: "Navigation",
          shortcuts: [
            { label: "Switch tabs", keys: ["Ctrl", "Tab"] },
            { label: "Go back", keys: ["Alt", "←"] },
            { label: "Go forward", keys: ["Alt", "→"] },
            { label: "Refresh", keys: ["F5"] },
          ],
        },
      ];

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Shortcuts (Windows)</Button>
          <KeyboardShortcutsModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            categories={shortcuts}
            title="Keyboard Shortcuts (Windows)"
          />
        </>
      );
    },
  };

// Invoice Modal Stories
export const Invoice: StoryObj<typeof InvoiceModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const invoice = {
      invoiceNumber: "INV-2024-001",
      date: "January 15, 2024",
      dueDate: "February 15, 2024",
      from: {
        name: "Acme Inc.",
        address: ["123 Business St", "San Francisco, CA 94105"],
        email: "billing@acme.com",
      },
      to: {
        name: "John Doe",
        address: ["456 Customer Ave", "Los Angeles, CA 90001"],
        email: "john.doe@example.com",
      },
      items: [
        {
          description: "Web Development Services",
          quantity: 40,
          unitPrice: 150,
          amount: 6000,
        },
        {
          description: "UI/UX Design",
          quantity: 20,
          unitPrice: 120,
          amount: 2400,
        },
        {
          description: "Project Management",
          quantity: 10,
          unitPrice: 100,
          amount: 1000,
        },
      ],
      subtotal: 9400,
      tax: 940,
      total: 10340,
      currency: "$",
      notes: "Payment is due within 30 days. Thank you for your business!",
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Invoice</Button>
        <InvoiceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          invoice={invoice}
          onPrint={() => console.log("Print invoice")}
          onDownload={() => console.log("Download invoice")}
        />
      </>
    );
  },
};

export const InvoicePaid: StoryObj<typeof InvoiceModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const invoice = {
      invoiceNumber: "INV-2024-002",
      date: "January 10, 2024",
      dueDate: "February 10, 2024",
      paidDate: "January 25, 2024",
      from: {
        name: "Tech Solutions Ltd",
        address: ["789 Tech Park", "Austin, TX 78701"],
      },
      to: {
        name: "Jane Smith",
        address: ["321 Main St", "Seattle, WA 98101"],
      },
      items: [
        {
          description: "Annual Software License",
          quantity: 1,
          unitPrice: 999,
          amount: 999,
        },
        {
          description: "Premium Support Package",
          quantity: 1,
          unitPrice: 299,
          amount: 299,
        },
      ],
      subtotal: 1298,
      tax: 129.8,
      total: 1427.8,
      currency: "$",
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Paid Invoice</Button>
        <InvoiceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          invoice={invoice}
          onPrint={() => console.log("Print invoice")}
          onDownload={() => console.log("Download invoice")}
        />
      </>
    );
  },
};

// Location Modal Stories
export const LocationPicker: StoryObj<typeof LocationModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const locations = [
      {
        id: "1",
        name: "San Francisco Office",
        address: "123 Market Street, San Francisco, CA 94105",
        type: "office" as const,
      },
      {
        id: "2",
        name: "New York Headquarters",
        address: "456 Park Avenue, New York, NY 10022",
        type: "office" as const,
      },
      {
        id: "3",
        name: "Main Warehouse",
        address: "789 Industrial Blvd, Oakland, CA 94607",
        type: "warehouse" as const,
      },
      {
        id: "4",
        name: "Remote Office - Seattle",
        address: "321 Pine Street, Seattle, WA 98101",
        type: "office" as const,
      },
      {
        id: "5",
        name: "Home Office",
        address: "Work from home",
        type: "home" as const,
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Select Location</Button>
        <LocationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          locations={locations}
          onSelect={(location) => {
            console.log("Selected location:", location);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const LocationPickerWithDefault: StoryObj<typeof LocationModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const locations = [
      {
        id: "1",
        name: "Downtown Store",
        address: "100 Main St, San Francisco, CA",
        type: "store" as const,
      },
      {
        id: "2",
        name: "Mall Location",
        address: "200 Shopping Center Dr, San Jose, CA",
        type: "store" as const,
      },
      {
        id: "3",
        name: "Warehouse Pickup",
        address: "300 Industrial Way, Oakland, CA",
        type: "warehouse" as const,
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Change Pickup Location</Button>
        <LocationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          locations={locations}
          currentLocationId="1"
          onSelect={(location) => {
            console.log("Selected location:", location);
            setIsOpen(false);
          }}
          title="Select Pickup Location"
          subtitle="Choose where you'd like to pick up your order"
        />
      </>
    );
  },
};
