// // src/features/user-management/pages/UserListPage.tsx
// // ─────────────────────────────────────────────────────────────────────────────
// // This file is ONLY an orchestration layer.
// // It wires hooks together and renders layout + shared primitives.
// //
// // What lives elsewhere:
// //   constants/userConstants.ts   — status map, role options
// //   constants/userFormFields.ts  — FormFieldDef[] schema
// //   hooks/useUserTable.ts        — columns, tableState, search
// //   hooks/useUserModal.ts        — open/close/editingUser state
// //   hooks/useUserMutations.ts    — create/update/delete + loading/error
// //   components/UserFormModal.tsx — modal + form rendering
// //   services/userApi.ts          — RTK Query endpoints
// // ─────────────────────────────────────────────────────────────────────────────

// import React from "react";
// import { useGetUsersQuery } from "../services/userApi";
// import { ApiStateWrapper } from "../../../shared/components/ApiState/ApiStateWrapper";
// import { AppTable } from "../../../shared/components/AppTable/AppTable";
// import { useUILibrary } from "../../../shared/lib/ui-lib/ui-library-context";

// import { UserFormModal } from "../components/UserFormModal";
// import { useUserTable } from "../hooks/useUserTable";
// import { useUserModal } from "../hooks/useUserModal";
// import { useUserMutations } from "../hooks/useUserMutations";

// import type { User } from "../../../shared/types/user.types";

// export const UserListPage: React.FC = () => {
//     const { Button, Input } = useUILibrary();

//     // ── Modal state ────────────────────────────────────────────────────────────
//     const { isOpen, editingUser, openCreate, openEdit, close } = useUserModal();

//     // ── Mutations ──────────────────────────────────────────────────────────────
//     const {
//         createUser, updateUser, deleteUser,
//         isCreating, isUpdating,
//         createError, updateError,
//     } = useUserMutations({
//         onCreateSuccess: () => { close(); refetch(); },
//         onUpdateSuccess: () => { close(); refetch(); },
//     });

//     // ── Table (columns + pagination + search) ─────────────────────────────────
//     const {
//         columns, tableState, setTableState,
//         search, handleSearch, queryArgs,
//     } = useUserTable({
//         onEdit: openEdit,
//         onDelete: (id: string) => deleteUser(id),
//     });

//     // ── Data fetch ─────────────────────────────────────────────────────────────
//     const { data, isLoading, error, refetch } = useGetUsersQuery(queryArgs);

//     // ── Form submit — decides create vs update based on editingUser ────────────
//     const handleSubmit = async (values: Record<string, unknown>) => {
//         if (editingUser) {
//             await updateUser({ id: editingUser.id, ...values });
//         } else {
//             await createUser(values as any);
//         }
//     };

//     // ── Active form error (create or update, whichever modal is for) ──────────
//     const activeError = editingUser ? updateError : createError;

//     // ── Render ─────────────────────────────────────────────────────────────────
//     return (
//         <div style={{ padding: 24 }}>

//             {/* Header */}
//             <div style={{
//                 display: "flex", justifyContent: "space-between",
//                 alignItems: "center", marginBottom: 20,
//             }}>
//                 <div>
//                     <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)" }}>
//                         Users
//                     </h1>
//                     <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>
//                         Manage team members and their access levels
//                     </p>
//                 </div>
//                 <Button variant="primary" onClick={openCreate}>
//                     + Add user
//                 </Button>
//             </div>

//             {/* Search toolbar */}
//             <div style={{ marginBottom: 16 }}>
//                 <Input
//                     placeholder="Search by name or email…"
//                     value={search}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
//                     style={{ maxWidth: 320 }}
//                     allowClear
//                 />
//             </div>

//             {/* Table with all state handling */}
//             <ApiStateWrapper
//                 isLoading={isLoading}
//                 error={error}
//                 isEmpty={data?.items?.length === 0}
//                 onRetry={refetch}
//                 skeletonVariant="table"
//                 skeletonRows={8}
//                 emptyMessage="No users yet. Add your first team member."
//                 emptyAction={
//                     <Button variant="primary" onClick={openCreate}>
//                         Add user
//                     </Button>
//                 }
//             >
//                 <AppTable<User>
//                     columns={columns}
//                     dataSource={data?.items ?? []}
//                     rowKey="id"
//                     total={data?.total}
//                     tableState={tableState}
//                     onTableChange={setTableState}
//                     scroll={{ x: 900 }}
//                 />
//             </ApiStateWrapper>

//             {/* Create / Edit modal — fully isolated component */}
//             <UserFormModal
//                 open={isOpen}
//                 onClose={close}
//                 editingUser={editingUser}
//                 onSubmit={handleSubmit}
//                 isSubmitting={isCreating || isUpdating}
//                 serverErrors={activeError?.fieldErrors}
//             />
//         </div>
//     );
// };

// export default UserListPage;


// src/features/user-management/pages/UserListPage.tsx  (STATIC MOCK VERSION)
// ─────────────────────────────────────────────────────────────────────────────
// Uses static mock data. When API is ready:
//   1. Remove the mock import
//   2. Replace the 4 useState lines with: const { data, isLoading, error, refetch } = useGetUsersQuery(queryArgs);
//   3. Done. Everything else stays identical.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from "react";
import { ApiStateWrapper } from "../../../shared/components/ApiState/ApiStateWrapper";
import { AppTable, col, buildColumns } from "../../../shared/components/AppTable/AppTable";
import { AppForm } from "../../../shared/components/AppForm/AppForm";
import { useUILibrary } from "../../../shared/lib/ui-lib/ui-library-context";
import type { FormFieldDef } from "../../../shared/components/AppForm/AppForm";

import { MOCK_USERS_RESPONSE } from "../constants/mockData";
import type { MockUser } from "../constants/mockData";

// ── Static lookups ────────────────────────────────────────────────────────────

const USER_STATUS_MAP = {
    active: { label: "Active", color: "success" },
    inactive: { label: "Inactive", color: "default" },
    banned: { label: "Banned", color: "error" },
    pending: { label: "Pending", color: "warning" },
} as const;

const ROLE_OPTIONS = [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "Operator", value: "operator" },
    { label: "Viewer", value: "viewer" },
];

const USER_FORM_FIELDS: FormFieldDef[] = [
    { name: "firstName", label: "First name", type: "text", required: true, span: 12 },
    { name: "lastName", label: "Last name", type: "text", required: true, span: 12 },
    { name: "email", label: "Email address", type: "email", required: true, span: 12 },
    { name: "phone", label: "Phone number", type: "text", span: 12, placeholder: "+91 98765 43210" },
    { name: "role", label: "Role", type: "select", required: true, options: ROLE_OPTIONS, span: 12 },
    {
        name: "status", label: "Status", type: "select", required: true, span: 12,
        options: [{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }],
        hidden: (values) => !values["id"],
    },
    { name: "notes", label: "Notes", type: "textarea", placeholder: "Optional internal notes..." },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export const UserListPage: React.FC = () => {
    const { Modal, Button, Input } = useUILibrary();

    // ── MOCK: replace these 4 lines with useGetUsersQuery() when API is ready ──
    const [data] = useState(MOCK_USERS_RESPONSE);
    const isLoading = false;
    const error = null;
    const refetch = () => { };
    // ──────────────────────────────────────────────────────────────────────────

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<MockUser | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Client-side search filter (remove when using server-side API)
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return q
            ? data.items.filter(
                (u) =>
                    `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q)
            )
            : data.items;
    }, [data.items, search]);

    // Client-side pagination (remove when using server-side API)
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    const openCreate = () => { setEditingUser(null); setModalOpen(true); };
    const openEdit = (u: MockUser) => { setEditingUser(u); setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); setEditingUser(null); };

    const handleSubmit = async (values: Record<string, unknown>) => {
        console.log(editingUser ? "UPDATE" : "CREATE", values);
        closeModal();
    };

    const handleDelete = (u: MockUser) => {
        console.log("DELETE", u.id);
    };

    const columns = useMemo(
        () =>
            buildColumns<MockUser>([
                col.text("firstName", "Name", {
                    sortable: true,
                    render: (_, row) => `${row.firstName} ${row.lastName}`,
                }),
                col.text("email", "Email", { sortable: true }),
                col.text("phone", "Phone"),
                col.text("role", "Role", {
                    render: (val) => ROLE_OPTIONS.find((o) => o.value === val)?.label ?? String(val),
                }),
                col.status("status", "Status", { map: USER_STATUS_MAP }),
                col.dateTime("createdAt", "Joined", { sortable: true }),
                col.actions<MockUser>([
                    { label: "Edit", onClick: openEdit },
                    { label: "Delete", danger: true, confirm: true, confirmTitle: "Delete this user?", onClick: handleDelete },
                ]),
            ]),
        []
    );

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)" }}>Users</h1>
                    <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>
                        Manage team members and their access levels
                    </p>
                </div>
                <Button variant="primary" onClick={openCreate}>+ Add user</Button>
            </div>

            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search by name or email…"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); }}
                    style={{ maxWidth: 320 }}
                    allowClear
                />
            </div>

            <ApiStateWrapper
                isLoading={isLoading}
                error={error}
                isEmpty={filtered.length === 0}
                onRetry={refetch}
                skeletonVariant="table"
                skeletonRows={8}
                emptyMessage="No users found."
                emptyAction={<Button variant="primary" onClick={openCreate}>Add user</Button>}
            >
                <AppTable<MockUser>
                    columns={columns}
                    dataSource={paginated}
                    rowKey="id"
                    total={filtered.length}
                    tableState={{ page, pageSize }}
                    onTableChange={(s) => setPage(s.page)}
                    scroll={{ x: 900 }}
                />
            </ApiStateWrapper>

            <Modal open={modalOpen} onClose={closeModal} title={editingUser ? "Edit user" : "Create user"} width={700} destroyOnClose footer={null}>
                <AppForm
                    fields={USER_FORM_FIELDS}
                    // initialValues={editingUser ?? undefined}
                    onSubmit={handleSubmit}
                    onCancel={closeModal}
                    isSubmitting={false}
                    submitLabel={editingUser ? "Save changes" : "Create user"}
                    showCancel
                    twoColumn
                />
            </Modal>
        </div>
    );
};

export default UserListPage;