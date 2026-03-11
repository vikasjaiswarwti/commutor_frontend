// Use union types instead of enums
export type UserRole = "admin" | "user" | "moderator" | "guest";

export type UserStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "pending_verification";

// Optional: Create constants objects if you need iterable values
export const UserRoles = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
  GUEST: "guest",
} as const;

export const UserStatuses = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  PENDING_VERIFICATION: "pending_verification",
} as const;

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  role: UserRole; // Now using union type
  status: UserStatus; // Now using union type
  avatar?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string | null;
  emailVerified: boolean;
  twoFactorEnabled?: boolean;
  preferences?: UserPreferences;
  permissions?: string[];
}

export interface UserPreferences {
  theme?: "light" | "dark" | "system";
  language?: string;
  notifications?: NotificationPreferences;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: "12h" | "24h";
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
  newsletter: boolean;
}

export interface UserProfile extends Omit<
  User,
  "email" | "role" | "status" | "permissions"
> {
  // Profile-specific fields that are safe to expose publicly
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistrationData extends UserCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  acceptTerms?: boolean;
}

export interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  avatar?: string | null;
  preferences?: Partial<UserPreferences>;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserFilters {
  role?: UserRole; // Now using union type
  status?: UserStatus; // Now using union type
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole; // Now using union type
  phoneNumber?: string;
  dateOfBirth?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Type guard to check if an object is a User
export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.email === "string" &&
    typeof obj.firstName === "string" &&
    typeof obj.lastName === "string" &&
    ["admin", "user", "moderator", "guest"].includes(obj.role) &&
    ["active", "inactive", "suspended", "pending_verification"].includes(
      obj.status,
    )
  );
}

// Helper function to get user's full name
export function getFullName(
  user: Pick<User, "firstName" | "lastName">,
): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

// Helper function to get user initials for avatar fallback
export function getUserInitials(
  user: Pick<User, "firstName" | "lastName">,
): string {
  const firstInitial = user.firstName?.charAt(0) || "";
  const lastInitial = user.lastName?.charAt(0) || "";
  return (firstInitial + lastInitial).toUpperCase() || "?";
}
