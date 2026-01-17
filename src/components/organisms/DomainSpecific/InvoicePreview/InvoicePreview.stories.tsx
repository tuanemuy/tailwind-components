import type { Meta, StoryObj } from "@storybook/react";
import {
  type InvoiceData,
  InvoicePreview,
  InvoicePreviewList,
  MiniInvoicePreview,
} from "./index";

const meta: Meta<typeof InvoicePreview> = {
  title: "Organisms/DomainSpecific/InvoicePreview",
  component: InvoicePreview,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "detailed"],
    },
    showActions: {
      control: "boolean",
    },
    showPaymentInfo: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InvoicePreview>;

// Sample invoice data
const sampleInvoice: InvoiceData = {
  invoiceNumber: "INV-2024-001",
  status: "sent",
  date: "January 15, 2024",
  dueDate: "January 30, 2024",
  from: {
    name: "John Smith",
    company: "Acme Design Co.",
    address: ["123 Business Street", "Suite 100", "San Francisco, CA 94102"],
    email: "billing@acmedesign.co",
    phone: "+1 (555) 123-4567",
    taxId: "12-3456789",
  },
  to: {
    name: "Jane Doe",
    company: "Tech Startup Inc.",
    address: ["456 Innovation Ave", "Floor 5", "New York, NY 10001"],
    email: "jane@techstartup.com",
    phone: "+1 (555) 987-6543",
  },
  items: [
    {
      id: "1",
      description: "Website Design & Development",
      quantity: 1,
      unitPrice: 5000,
      amount: 5000,
    },
    {
      id: "2",
      description: "Logo Design",
      quantity: 1,
      unitPrice: 1500,
      amount: 1500,
    },
    {
      id: "3",
      description: "Brand Guidelines Document",
      quantity: 1,
      unitPrice: 800,
      amount: 800,
    },
    {
      id: "4",
      description: "Social Media Kit",
      quantity: 1,
      unitPrice: 600,
      amount: 600,
    },
  ],
  subtotal: 7900,
  discount: 400,
  discountLabel: "Early payment discount",
  tax: 675,
  taxRate: 9,
  taxLabel: "Sales Tax",
  total: 8175,
  currency: "USD",
  currencySymbol: "$",
  notes: "Thank you for choosing Acme Design Co. for your design needs.",
  terms:
    "Payment is due within 15 days. Late payments are subject to a 1.5% monthly interest charge.",
  paymentInfo: {
    bankName: "First National Bank",
    accountName: "Acme Design Co.",
    accountNumber: "1234567890",
    routingNumber: "021000021",
  },
};

// Paid invoice
const paidInvoice: InvoiceData = {
  ...sampleInvoice,
  invoiceNumber: "INV-2024-002",
  status: "paid",
};

// Overdue invoice
const overdueInvoice: InvoiceData = {
  ...sampleInvoice,
  invoiceNumber: "INV-2024-003",
  status: "overdue",
  dueDate: "December 15, 2023",
};

// Detailed invoice with more line item info
const detailedInvoice: InvoiceData = {
  ...sampleInvoice,
  invoiceNumber: "INV-2024-004",
  items: [
    {
      id: "1",
      description: "Senior Designer - Website Design",
      quantity: 40,
      unit: "hours",
      unitPrice: 150,
      amount: 6000,
      tax: 540,
    },
    {
      id: "2",
      description: "Junior Designer - UI Components",
      quantity: 20,
      unit: "hours",
      unitPrice: 80,
      amount: 1600,
      tax: 144,
    },
    {
      id: "3",
      description: "Stock Photography License",
      quantity: 10,
      unit: "images",
      unitPrice: 50,
      amount: 500,
      discount: 50,
    },
    {
      id: "4",
      description: "Font License - Annual",
      quantity: 2,
      unit: "license",
      unitPrice: 200,
      amount: 400,
    },
  ],
  subtotal: 8500,
  discount: 50,
  tax: 684,
  taxRate: 9,
  total: 9134,
};

// International invoice with IBAN
const internationalInvoice: InvoiceData = {
  ...sampleInvoice,
  invoiceNumber: "INV-2024-005",
  currency: "EUR",
  currencySymbol: "€",
  paymentInfo: {
    bankName: "Deutsche Bank",
    accountName: "Acme Design GmbH",
    iban: "DE89 3704 0044 0532 0130 00",
    swift: "DEUTDEDB",
  },
};

// ============================================
// Stories
// ============================================

export const Default: Story = {
  args: {
    invoice: sampleInvoice,
    variant: "default",
    showActions: true,
    showPaymentInfo: true,
  },
};

export const Compact: Story = {
  args: {
    invoice: sampleInvoice,
    variant: "compact",
    showActions: false,
  },
};

export const Detailed: Story = {
  args: {
    invoice: detailedInvoice,
    variant: "detailed",
  },
};

export const Paid: Story = {
  args: {
    invoice: paidInvoice,
    variant: "default",
  },
};

export const Overdue: Story = {
  args: {
    invoice: overdueInvoice,
    variant: "default",
  },
};

export const Draft: Story = {
  args: {
    invoice: { ...sampleInvoice, status: "draft" },
    variant: "default",
  },
};

export const WithoutActions: Story = {
  args: {
    invoice: sampleInvoice,
    showActions: false,
  },
};

export const WithoutPaymentInfo: Story = {
  args: {
    invoice: sampleInvoice,
    showPaymentInfo: false,
  },
};

export const International: Story = {
  args: {
    invoice: internationalInvoice,
    variant: "default",
  },
};

export const WithCallbacks: Story = {
  args: {
    invoice: sampleInvoice,
    onDownload: () => alert("Download clicked"),
    onPrint: () => alert("Print clicked"),
    onSendEmail: () => alert("Send email clicked"),
  },
};

// MiniInvoicePreview Stories
export const MiniPreview: StoryObj<typeof MiniInvoicePreview> = {
  render: () => (
    <div className="max-w-sm">
      <MiniInvoicePreview
        invoice={{
          invoiceNumber: "INV-2024-001",
          clientName: "Tech Startup Inc.",
          date: "Jan 15, 2024",
          dueDate: "Jan 30, 2024",
          total: 8175,
          status: "sent",
        }}
        onClick={() => alert("Invoice clicked")}
      />
    </div>
  ),
};

export const MiniPreviewPaid: StoryObj<typeof MiniInvoicePreview> = {
  render: () => (
    <div className="max-w-sm">
      <MiniInvoicePreview
        invoice={{
          invoiceNumber: "INV-2024-002",
          clientName: "Another Client LLC",
          date: "Jan 10, 2024",
          dueDate: "Jan 25, 2024",
          total: 3500,
          status: "paid",
        }}
      />
    </div>
  ),
};

export const MiniPreviewOverdue: StoryObj<typeof MiniInvoicePreview> = {
  render: () => (
    <div className="max-w-sm">
      <MiniInvoicePreview
        invoice={{
          invoiceNumber: "INV-2023-099",
          clientName: "Late Payer Corp",
          date: "Dec 01, 2023",
          dueDate: "Dec 15, 2023",
          total: 12500,
          status: "overdue",
        }}
      />
    </div>
  ),
};

// InvoicePreviewList Stories
export const List: StoryObj<typeof InvoicePreviewList> = {
  render: () => (
    <div className="max-w-md">
      <InvoicePreviewList
        invoices={[
          {
            id: "1",
            invoiceNumber: "INV-2024-001",
            clientName: "Tech Startup Inc.",
            date: "Jan 15, 2024",
            dueDate: "Jan 30, 2024",
            total: 8175,
            status: "sent",
          },
          {
            id: "2",
            invoiceNumber: "INV-2024-002",
            clientName: "Another Client LLC",
            date: "Jan 10, 2024",
            dueDate: "Jan 25, 2024",
            total: 3500,
            status: "paid",
          },
          {
            id: "3",
            invoiceNumber: "INV-2023-099",
            clientName: "Late Payer Corp",
            date: "Dec 01, 2023",
            dueDate: "Dec 15, 2023",
            total: 12500,
            status: "overdue",
          },
          {
            id: "4",
            invoiceNumber: "INV-2024-003",
            clientName: "New Project Co.",
            date: "Jan 18, 2024",
            total: 5000,
            status: "draft",
          },
        ]}
        onInvoiceClick={(id) => alert(`Invoice ${id} clicked`)}
      />
    </div>
  ),
};

export const EmptyList: StoryObj<typeof InvoicePreviewList> = {
  render: () => (
    <div className="max-w-md">
      <InvoicePreviewList
        invoices={[]}
        emptyMessage="No invoices to display. Create your first invoice!"
      />
    </div>
  ),
};

// Full page example
export const FullPage: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8 bg-muted min-h-screen">
      <InvoicePreview
        invoice={sampleInvoice}
        onDownload={() => alert("Download")}
        onPrint={() => window.print()}
        onSendEmail={() => alert("Send email")}
      />
    </div>
  ),
};
