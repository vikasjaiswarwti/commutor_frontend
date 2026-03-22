// src/features/user-management/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Public API of the user-management feature.
// Other features and routes import from here — never from internal paths.
// ─────────────────────────────────────────────────────────────────────────────

export { default as UserListPage } from "./pages/UserListPage";

export { userApi } from "./services/userApi";

export type { CreateUserDto, UpdateUserDto } from "./services/userApi";
