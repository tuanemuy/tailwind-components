"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import {
  SearchIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  PlusIcon,
  FilterIcon,
  UsersIcon,
  TagIcon,
  FileIcon,
  ClockIcon,
  EditIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@/lib/icons";

// ============================================
// Types
// ============================================

export type CustomerStatus = "active" | "inactive" | "pending" | "lead";
export type CustomerType = "individual" | "company";

export interface CustomerAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface CustomerContact {
  email?: string;
  phone?: string;
  website?: string;
}

export interface CustomerTag {
  id: string;
  name: string;
  color?: string;
}

export interface CustomerNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy?: string;
}

export interface CustomerActivity {
  id: string;
  type: "email" | "call" | "meeting" | "note" | "order" | "task";
  title: string;
  description?: string;
  date: string;
  user?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  type: CustomerType;
  status: CustomerStatus;
  company?: string;
  jobTitle?: string;
  address?: CustomerAddress;
  contact?: CustomerContact;
  tags?: CustomerTag[];
  notes?: CustomerNote[];
  activities?: CustomerActivity[];
  orders?: CustomerOrder[];
  createdAt: string;
  lastContactedAt?: string;
  totalSpent?: number;
  ordersCount?: number;
}

export interface CRMFilter {
  status?: CustomerStatus[];
  type?: CustomerType[];
  tags?: string[];
  search?: string;
}

// ============================================
// CRMLayout Component
// ============================================

export interface CRMLayoutProps {
  customers?: Customer[];
  selectedCustomer?: Customer;
  filters?: CRMFilter;
  showDetails?: boolean;
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onSelectCustomer?: (id: string) => void;
  onCreateCustomer?: () => void;
  onEditCustomer?: (id: string) => void;
  onDeleteCustomer?: (id: string) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: CRMFilter) => void;
  onPageChange?: (page: number) => void;
  header?: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export const CRMLayout = ({
  customers = [],
  selectedCustomer,
  filters: _filters,
  showDetails = true,
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onSelectCustomer,
  onCreateCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onSearch,
  onFilter: _onFilter,
  onPageChange,
  header,
  sidebar: _sidebar,
  className,
}: CRMLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className={cn("flex h-full bg-background", className)}>
      {/* Customer List */}
      <div
        className={cn(
          "flex flex-col border-r border-border bg-card shrink-0",
          showDetails && selectedCustomer ? "w-80" : "flex-1"
        )}
      >
        {/* Header */}
        {header || (
          <CRMHeader
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onCreateCustomer={onCreateCustomer}
            isLoading={isLoading}
          />
        )}

        {/* Customer List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <CustomerListSkeleton />
          ) : customers.length === 0 ? (
            <EmptyCustomerState onCreateCustomer={onCreateCustomer} />
          ) : (
            <div className="divide-y divide-border">
              {customers.map((customer) => (
                <CustomerListItem
                  key={customer.id}
                  customer={customer}
                  isSelected={selectedCustomer?.id === customer.id}
                  onClick={() => onSelectCustomer?.(customer.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-x-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => onPageChange?.(currentPage - 1)}
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange?.(currentPage + 1)}
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Customer Details */}
      {showDetails && selectedCustomer && (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <CustomerDetailsPanel
            customer={selectedCustomer}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onEdit={() => onEditCustomer?.(selectedCustomer.id)}
            onDelete={() => onDeleteCustomer?.(selectedCustomer.id)}
          />
        </div>
      )}
    </div>
  );
};

// ============================================
// CRMHeader Component
// ============================================

interface CRMHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onCreateCustomer?: () => void;
  isLoading: boolean;
}

const CRMHeader = ({
  searchQuery,
  onSearch,
  onCreateCustomer,
  isLoading,
}: CRMHeaderProps) => (
  <div className="p-4 border-b border-border space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">Customers</h2>
      <Button size="sm" onClick={onCreateCustomer}>
        <PlusIcon className="size-4 mr-2" />
        Add
      </Button>
    </div>
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search customers..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-9"
      />
    </div>
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm">
        <FilterIcon className="size-4 mr-2" />
        Filter
      </Button>
      <Badge variant="secondary">All ({isLoading ? "..." : "—"})</Badge>
    </div>
  </div>
);

// ============================================
// CustomerListItem Component
// ============================================

interface CustomerListItemProps {
  customer: Customer;
  isSelected: boolean;
  onClick: () => void;
}

const CustomerListItem = ({
  customer,
  isSelected,
  onClick,
}: CustomerListItemProps) => {
  const statusColors: Record<CustomerStatus, string> = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
    pending: "bg-yellow-500",
    lead: "bg-blue-500",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer transition-colors hover:bg-muted/50",
        isSelected && "bg-muted"
      )}
    >
      <div className="flex items-start gap-x-3">
        <div className="relative">
          <Avatar
            src={customer.avatar}
            alt={customer.name}
            fallback={customer.name.charAt(0)}
            size="md"
          />
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white",
              statusColors[customer.status]
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate">{customer.name}</p>
            {customer.type === "company" && (
              <Badge variant="outline" size="sm">
                Company
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {customer.email}
          </p>
          {customer.company && (
            <p className="text-sm text-muted-foreground truncate">
              {customer.company}
            </p>
          )}
          {customer.tags && customer.tags.length > 0 && (
            <div className="flex gap-x-1 mt-2">
              {customer.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  size="sm"
                  style={tag.color ? { backgroundColor: tag.color } : undefined}
                >
                  {tag.name}
                </Badge>
              ))}
              {customer.tags.length > 2 && (
                <Badge variant="secondary" size="sm">
                  +{customer.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// CustomerDetailsPanel Component
// ============================================

interface CustomerDetailsPanelProps {
  customer: Customer;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CustomerDetailsPanel = ({
  customer,
  activeTab,
  onTabChange,
  onEdit,
  onDelete,
}: CustomerDetailsPanelProps) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity" },
    { id: "orders", label: "Orders" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Customer Header */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-start justify-between gap-x-4">
          <div className="flex items-start gap-x-4">
            <Avatar
              src={customer.avatar}
              alt={customer.name}
              fallback={customer.name.charAt(0)}
              size="lg"
            />
            <div>
              <h1 className="text-xl font-semibold">{customer.name}</h1>
              {customer.company && (
                <p className="text-muted-foreground">
                  {customer.jobTitle && `${customer.jobTitle} at `}
                  {customer.company}
                </p>
              )}
              <div className="flex items-center gap-x-3 mt-2">
                <Badge
                  variant={customer.status === "active" ? "default" : "secondary"}
                >
                  {customer.status}
                </Badge>
                {customer.tags?.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    style={tag.color ? { borderColor: tag.color, color: tag.color } : undefined}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <EditIcon className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete}>
              <TrashIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-x-1 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {activeTab === "overview" && (
          <CustomerOverview customer={customer} />
        )}
        {activeTab === "activity" && (
          <CustomerActivityList activities={customer.activities || []} />
        )}
        {activeTab === "orders" && (
          <CustomerOrdersList orders={customer.orders || []} />
        )}
        {activeTab === "notes" && (
          <CustomerNotesList notes={customer.notes || []} />
        )}
      </div>
    </div>
  );
};

// ============================================
// CustomerOverview Component
// ============================================

interface CustomerOverviewProps {
  customer: Customer;
}

const CustomerOverview = ({ customer }: CustomerOverviewProps) => (
  <div className="space-y-6">
    {/* Contact Info */}
    <div className="bg-muted/50 rounded-lg p-4">
      <h3 className="text-sm font-medium mb-3">Contact Information</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-x-3">
          <MailIcon className="size-4 text-muted-foreground" />
          <a
            href={`mailto:${customer.email}`}
            className="text-sm text-primary hover:underline"
          >
            {customer.email}
          </a>
        </div>
        {customer.phone && (
          <div className="flex items-center gap-x-3">
            <PhoneIcon className="size-4 text-muted-foreground" />
            <a
              href={`tel:${customer.phone}`}
              className="text-sm text-primary hover:underline"
            >
              {customer.phone}
            </a>
          </div>
        )}
        {customer.address && (
          <div className="flex items-start gap-x-3">
            <MapPinIcon className="size-4 text-muted-foreground mt-0.5" />
            <p className="text-sm">
              {[
                customer.address.street,
                customer.address.city,
                customer.address.state,
                customer.address.country,
                customer.address.zipCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}
        {customer.contact?.website && (
          <div className="flex items-center gap-x-3">
            <ExternalLinkIcon className="size-4 text-muted-foreground" />
            <a
              href={customer.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {customer.contact.website}
            </a>
          </div>
        )}
      </div>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-2xl font-bold">{customer.ordersCount || 0}</p>
        <p className="text-sm text-muted-foreground">Orders</p>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-2xl font-bold">
          ${(customer.totalSpent || 0).toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">Total Spent</p>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-2xl font-bold">{customer.activities?.length || 0}</p>
        <p className="text-sm text-muted-foreground">Activities</p>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-2xl font-bold">{customer.notes?.length || 0}</p>
        <p className="text-sm text-muted-foreground">Notes</p>
      </div>
    </div>

    {/* Timeline Info */}
    <div className="bg-muted/50 rounded-lg p-4">
      <h3 className="text-sm font-medium mb-3">Timeline</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Customer since</span>
          <span>{customer.createdAt}</span>
        </div>
        {customer.lastContactedAt && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last contacted</span>
            <span>{customer.lastContactedAt}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ============================================
// CustomerActivityList Component
// ============================================

interface CustomerActivityListProps {
  activities: CustomerActivity[];
}

const CustomerActivityList = ({ activities }: CustomerActivityListProps) => {
  const activityIcons: Record<CustomerActivity["type"], ReactNode> = {
    email: <MailIcon className="size-4" />,
    call: <PhoneIcon className="size-4" />,
    meeting: <CalendarIcon className="size-4" />,
    note: <FileIcon className="size-4" />,
    order: <TagIcon className="size-4" />,
    task: <ClockIcon className="size-4" />,
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <ClockIcon className="size-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No activities yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-x-3 p-3 rounded-lg hover:bg-muted/50"
        >
          <div className="size-8 flex items-center justify-center bg-muted rounded-full">
            {activityIcons[activity.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium">{activity.title}</p>
            {activity.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {activity.description}
              </p>
            )}
            <div className="flex items-center gap-x-2 mt-1">
              <span className="text-xs text-muted-foreground">
                {activity.date}
              </span>
              {activity.user && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {activity.user}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// CustomerOrdersList Component
// ============================================

interface CustomerOrdersListProps {
  orders: CustomerOrder[];
}

const CustomerOrdersList = ({ orders }: CustomerOrdersListProps) => {
  const statusColors: Record<CustomerOrder["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <TagIcon className="size-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50"
        >
          <div>
            <p className="font-medium">{order.orderNumber}</p>
            <p className="text-sm text-muted-foreground">
              {order.items} items • {order.date}
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="font-medium">${order.total.toLocaleString()}</span>
            <Badge className={statusColors[order.status]}>
              {order.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// CustomerNotesList Component
// ============================================

interface CustomerNotesListProps {
  notes: CustomerNote[];
}

const CustomerNotesList = ({ notes }: CustomerNotesListProps) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8">
        <FileIcon className="size-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No notes yet</p>
        <Button variant="outline" size="sm" className="mt-4">
          <PlusIcon className="size-4 mr-2" />
          Add Note
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <PlusIcon className="size-4 mr-2" />
          Add Note
        </Button>
      </div>
      {notes.map((note) => (
        <div key={note.id} className="p-4 rounded-lg border border-border">
          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
          <div className="flex items-center gap-x-2 mt-3 text-xs text-muted-foreground">
            <span>{note.createdAt}</span>
            {note.createdBy && (
              <>
                <span>•</span>
                <span>{note.createdBy}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// CustomerListSkeleton Component
// ============================================

const CustomerListSkeleton = () => (
  <div className="divide-y divide-border">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="p-4 animate-pulse">
        <div className="flex items-start gap-x-3">
          <div className="size-10 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="h-3 w-2/3 bg-muted rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ============================================
// EmptyCustomerState Component
// ============================================

interface EmptyCustomerStateProps {
  onCreateCustomer?: () => void;
}

const EmptyCustomerState = ({ onCreateCustomer }: EmptyCustomerStateProps) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
    <div className="size-16 flex items-center justify-center bg-muted rounded-full mb-4">
      <UsersIcon className="size-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-1">No customers yet</h3>
    <p className="text-sm text-muted-foreground mb-4">
      Add your first customer to get started
    </p>
    <Button onClick={onCreateCustomer}>
      <PlusIcon className="size-4 mr-2" />
      Add Customer
    </Button>
  </div>
);
