"use client";

import { forwardRef, useMemo } from "react";
import { Avatar, Badge } from "@/components/atoms";
import { cn } from "@/lib/utils";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "../DataTable";

// ============================================
// User Types
// ============================================

export type UserStatus = "active" | "inactive" | "pending" | "suspended";
export type UserRole = "admin" | "moderator" | "member" | "viewer" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: UserStatus;
  role: UserRole;
  department?: string;
  location?: string;
  joinedAt?: string;
  lastActiveAt?: string;
  verified?: boolean;
  twoFactorEnabled?: boolean;
}

// ============================================
// UsersTable Props
// ============================================

export interface UsersTableProps
  extends Omit<DataTableProps<User>, "data" | "columns" | "getRowKey"> {
  users: User[];
  showDepartment?: boolean;
  showLocation?: boolean;
  showDates?: boolean;
  showSecurity?: boolean;
  onUserClick?: (user: User) => void;
  customColumns?: DataTableColumn<User>[];
}

// ============================================
// Status & Role Config
// ============================================

const statusConfig: Record<
  UserStatus,
  {
    label: string;
    variant: "success" | "warning" | "destructive" | "secondary";
  }
> = {
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "secondary" },
  pending: { label: "Pending", variant: "warning" },
  suspended: { label: "Suspended", variant: "destructive" },
};

const roleConfig: Record<UserRole, { label: string; color: string }> = {
  admin: { label: "Admin", color: "bg-primary/10 text-primary" },
  moderator: { label: "Moderator", color: "bg-warning/10 text-warning" },
  member: { label: "Member", color: "bg-muted text-muted-foreground" },
  viewer: { label: "Viewer", color: "bg-muted text-muted-foreground" },
  guest: { label: "Guest", color: "bg-muted text-muted-foreground" },
};

// ============================================
// UsersTable Component
// ============================================

export const UsersTable = forwardRef<HTMLDivElement, UsersTableProps>(
  (
    {
      className,
      users,
      showDepartment = false,
      showLocation = false,
      showDates = true,
      showSecurity = false,
      onUserClick,
      customColumns,
      ...props
    },
    ref,
  ) => {
    const columns = useMemo<DataTableColumn<User>[]>(() => {
      const baseColumns: DataTableColumn<User>[] = [
        {
          key: "name",
          header: "User",
          sortable: true,
          filterable: true,
          filterType: "text",
          minWidth: "250px",
          render: (_, user) => (
            <div className="flex items-center gap-3">
              <Avatar
                src={user.avatar}
                alt={user.name}
                fallback={user.name.slice(0, 2)}
                size="sm"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {user.name}
                  </span>
                  {user.verified && (
                    <Badge variant="success" size="sm">
                      Verified
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          ),
        },
        {
          key: "status",
          header: "Status",
          sortable: true,
          filterable: true,
          filterType: "select",
          filterOptions: Object.entries(statusConfig).map(
            ([value, { label }]) => ({
              value,
              label,
            }),
          ),
          width: "120px",
          render: (_, user) => {
            const config = statusConfig[user.status];
            return (
              <Badge variant={config.variant} size="sm">
                {config.label}
              </Badge>
            );
          },
        },
        {
          key: "role",
          header: "Role",
          sortable: true,
          filterable: true,
          filterType: "select",
          filterOptions: Object.entries(roleConfig).map(
            ([value, { label }]) => ({
              value,
              label,
            }),
          ),
          width: "120px",
          render: (_, user) => {
            const config = roleConfig[user.role];
            return (
              <span
                className={cn(
                  "inline-flex items-center px-2 py-1 rounded text-xs font-medium",
                  config.color,
                )}
              >
                {config.label}
              </span>
            );
          },
        },
      ];

      if (showDepartment) {
        baseColumns.push({
          key: "department",
          header: "Department",
          sortable: true,
          filterable: true,
          filterType: "text",
          width: "150px",
          render: (_, user) => (
            <span className="text-sm text-muted-foreground">
              {user.department || "-"}
            </span>
          ),
        });
      }

      if (showLocation) {
        baseColumns.push({
          key: "location",
          header: "Location",
          sortable: true,
          width: "150px",
          render: (_, user) => (
            <span className="text-sm text-muted-foreground">
              {user.location || "-"}
            </span>
          ),
        });
      }

      if (showDates) {
        baseColumns.push({
          key: "joinedAt",
          header: "Joined",
          sortable: true,
          width: "120px",
          render: (_, user) => {
            if (!user.joinedAt) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <span className="text-sm text-muted-foreground">
                {new Date(user.joinedAt).toLocaleDateString()}
              </span>
            );
          },
        });

        baseColumns.push({
          key: "lastActiveAt",
          header: "Last Active",
          sortable: true,
          width: "120px",
          render: (_, user) => {
            if (!user.lastActiveAt) {
              return <span className="text-muted-foreground">-</span>;
            }
            const date = new Date(user.lastActiveAt);
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            let timeAgo: string;
            if (days === 0) {
              timeAgo = "Today";
            } else if (days === 1) {
              timeAgo = "Yesterday";
            } else if (days < 7) {
              timeAgo = `${days} days ago`;
            } else {
              timeAgo = date.toLocaleDateString();
            }

            return (
              <span className="text-sm text-muted-foreground">{timeAgo}</span>
            );
          },
        });
      }

      if (showSecurity) {
        baseColumns.push({
          key: "twoFactorEnabled",
          header: "2FA",
          width: "80px",
          align: "center",
          render: (_, user) => (
            <Badge
              variant={user.twoFactorEnabled ? "success" : "secondary"}
              size="sm"
            >
              {user.twoFactorEnabled ? "On" : "Off"}
            </Badge>
          ),
        });
      }

      // Add custom columns
      if (customColumns) {
        baseColumns.push(...customColumns);
      }

      return baseColumns;
    }, [showDepartment, showLocation, showDates, showSecurity, customColumns]);

    return (
      <DataTable<User>
        ref={ref}
        className={className}
        data={users}
        columns={columns}
        getRowKey={(user) => user.id}
        onRowClick={onUserClick}
        {...props}
      />
    );
  },
);

UsersTable.displayName = "UsersTable";
