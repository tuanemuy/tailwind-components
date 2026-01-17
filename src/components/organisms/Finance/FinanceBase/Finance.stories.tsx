import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";
import { DollarSignIcon } from "@/components/icons";
import {
  AccountCard,
  BalanceCard,
  type Currency,
  CurrencySelect,
  PaymentCard,
  type ReceiptItem,
  ReceiptTimeline,
  type Transaction,
  TransactionList,
  TransferForm,
} from "./index";

// =============================================================================
// BalanceCard Stories
// =============================================================================

const meta: Meta<typeof BalanceCard> = {
  title: "Organisms/Finance/FinanceBase/BalanceCard",
  component: BalanceCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

export const Default: Story = {
  args: {
    balance: "$12,450.00",
    currency: "USD",
    label: "Available Balance",
  },
};

export const WithTrend: Story = {
  args: {
    balance: "$12,450.00",
    currency: "USD",
    label: "Available Balance",
    trend: {
      value: "+12.5%",
      direction: "up",
    },
  },
};

export const Primary: Story = {
  args: {
    balance: "$12,450.00",
    currency: "USD",
    label: "Total Balance",
    variant: "primary",
    trend: {
      value: "+8.2%",
      direction: "up",
    },
    actions: (
      <>
        <Button variant="secondary" size="sm">
          Send
        </Button>
        <Button variant="secondary" size="sm">
          Receive
        </Button>
      </>
    ),
  },
};

export const Gradient: Story = {
  args: {
    balance: "$25,890.50",
    currency: "USD",
    label: "Investment Portfolio",
    variant: "gradient",
    trend: {
      value: "-2.3%",
      direction: "down",
    },
  },
};

// =============================================================================
// TransactionList Stories
// =============================================================================

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    title: "Netflix Subscription",
    description: "Monthly subscription",
    amount: "$15.99",
    type: "debit",
    status: "completed",
    date: "Today",
    category: "Entertainment",
  },
  {
    id: "2",
    title: "Salary Deposit",
    description: "Monthly salary",
    amount: "$5,000.00",
    type: "credit",
    status: "completed",
    date: "Yesterday",
    category: "Income",
  },
  {
    id: "3",
    title: "Amazon Purchase",
    description: "Electronics",
    amount: "$249.99",
    type: "debit",
    status: "pending",
    date: "Jan 10",
    category: "Shopping",
  },
  {
    id: "4",
    title: "Refund - Uber",
    description: "Trip cancellation",
    amount: "$12.50",
    type: "credit",
    status: "completed",
    date: "Jan 9",
    category: "Transport",
  },
  {
    id: "5",
    title: "Payment Failed",
    description: "Insufficient funds",
    amount: "$500.00",
    type: "debit",
    status: "failed",
    date: "Jan 8",
    category: "Transfer",
  },
];

export const TransactionListDefault: StoryObj<typeof TransactionList> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <h3 className="font-semibold mb-4">Recent Transactions</h3>
      <TransactionList transactions={sampleTransactions} />
    </div>
  ),
};

export const TransactionListCompact: StoryObj<typeof TransactionList> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <TransactionList transactions={sampleTransactions} variant="compact" />
    </div>
  ),
};

// =============================================================================
// PaymentCard Stories
// =============================================================================

export const PaymentCardVisa: StoryObj<typeof PaymentCard> = {
  render: () => (
    <PaymentCard
      cardNumber="4532123456789012"
      cardHolder="JOHN DOE"
      expiryDate="12/25"
      cardType="visa"
      isDefault
    />
  ),
};

export const PaymentCardMastercard: StoryObj<typeof PaymentCard> = {
  render: () => (
    <PaymentCard
      cardNumber="5412123456789012"
      cardHolder="JANE SMITH"
      expiryDate="06/26"
      cardType="mastercard"
    />
  ),
};

export const PaymentCardWithActions: StoryObj<typeof PaymentCard> = {
  render: () => (
    <PaymentCard
      cardNumber="4532123456789012"
      cardHolder="JOHN DOE"
      expiryDate="12/25"
      cardType="visa"
      onEdit={() => alert("Edit clicked")}
      onDelete={() => alert("Delete clicked")}
    />
  ),
};

// =============================================================================
// TransferForm Stories
// =============================================================================

const sampleAccounts = [
  { id: "1", name: "Checking Account", balance: "$5,240.00" },
  { id: "2", name: "Savings Account", balance: "$12,800.00" },
  { id: "3", name: "Investment Account", balance: "$45,600.00" },
];

export const TransferFormDefault: StoryObj<typeof TransferForm> = {
  render: () => (
    <div className="w-[400px]">
      <TransferForm
        accounts={sampleAccounts}
        onSubmit={(data) => console.log("Transfer:", data)}
      />
    </div>
  ),
};

export const TransferFormCard: StoryObj<typeof TransferForm> = {
  render: () => (
    <div className="w-[400px]">
      <TransferForm
        variant="card"
        accounts={sampleAccounts}
        onSubmit={(data) => console.log("Transfer:", data)}
      />
    </div>
  ),
};

// =============================================================================
// AccountCard Stories
// =============================================================================

export const AccountCardDefault: StoryObj<typeof AccountCard> = {
  render: () => (
    <div className="w-[350px] space-y-2">
      <AccountCard
        name="Checking Account"
        type="Primary"
        balance="$5,240.00"
        accountNumber="****4521"
        isSelected
      />
      <AccountCard
        name="Savings Account"
        type="High Yield"
        balance="$12,800.00"
        accountNumber="****7892"
      />
      <AccountCard
        name="Investment Account"
        type="Brokerage"
        balance="$45,600.00"
        accountNumber="****3456"
        icon={<DollarSignIcon className="size-5" />}
      />
    </div>
  ),
};

// =============================================================================
// ReceiptTimeline Stories
// =============================================================================

const receiptItems: ReceiptItem[] = [
  { id: "1", label: "Subtotal", value: "$249.99", status: "completed" },
  { id: "2", label: "Shipping", value: "$9.99", status: "completed" },
  { id: "3", label: "Tax", value: "$25.00", status: "completed" },
  { id: "4", label: "Discount", value: "-$20.00", status: "completed" },
];

export const ReceiptTimelineDefault: StoryObj<typeof ReceiptTimeline> = {
  render: () => (
    <div className="w-[350px]">
      <ReceiptTimeline
        title="Order Summary"
        items={receiptItems}
        total={{ label: "Total", value: "$264.98" }}
      />
    </div>
  ),
};

// =============================================================================
// CurrencySelect Stories
// =============================================================================

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
];

export const CurrencySelectDefault: StoryObj<typeof CurrencySelect> = {
  render: () => (
    <CurrencySelect
      currencies={currencies}
      value="USD"
      onChange={(c) => console.log("Selected:", c)}
    />
  ),
};

// =============================================================================
// Combined Finance Dashboard
// =============================================================================

export const FinanceDashboard: Story = {
  render: () => (
    <div className="w-[800px] space-y-6 p-6 bg-background rounded-xl">
      <div className="grid grid-cols-2 gap-4">
        <BalanceCard
          balance="$12,450.00"
          currency="USD"
          label="Total Balance"
          variant="gradient"
          trend={{ value: "+12.5%", direction: "up" }}
          actions={
            <>
              <Button variant="secondary" size="sm">
                Send
              </Button>
              <Button variant="secondary" size="sm">
                Receive
              </Button>
            </>
          }
        />
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-semibold mb-4">Quick Transfer</h3>
          <TransferForm
            accounts={sampleAccounts}
            variant="compact"
            onSubmit={(data) => console.log("Transfer:", data)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          <TransactionList transactions={sampleTransactions.slice(0, 4)} />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">Payment Methods</h3>
          <PaymentCard
            cardNumber="4532123456789012"
            cardHolder="JOHN DOE"
            expiryDate="12/25"
            cardType="visa"
            isDefault
            size="sm"
          />
        </div>
      </div>
    </div>
  ),
};
