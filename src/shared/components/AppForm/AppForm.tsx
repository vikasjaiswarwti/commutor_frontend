// src/shared/components/AppForm/AppForm.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Fix: DatePicker.RangePicker is typed as ComponentType<any> | undefined in the
//      UILibrary interface, so JSX will complain about it directly.
//      Solution: extract it into a local const with a null check before rendering.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from "react";
import { useUILibrary } from "../../lib/ui-lib/ui-library-context";
import type { FieldError } from "../../types/api-error.types";

// ── Field definition types ────────────────────────────────────────────────────

export type FieldType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "multiselect"
    | "date"
    | "daterange"
    | "switch"
    | "checkbox"
    | "custom";

export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface FormFieldDef {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
    options?: SelectOption[];
    rules?: any[];
    formItemProps?: Record<string, unknown>;
    fieldProps?: Record<string, unknown>;
    render?: (formInstance: any) => React.ReactNode;
    span?: number;
    hidden?: (values: Record<string, unknown>) => boolean;
    help?: string;
}

// ── Field renderer ────────────────────────────────────────────────────────────

interface FieldRendererProps {
    field: FormFieldDef;
    lib: ReturnType<typeof useUILibrary>;
    formInstance: any;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, lib, formInstance }) => {
    const { Input, Select, DatePicker, Switch, Checkbox } = lib;

    // ── Fix: extract RangePicker with a guard before JSX uses it ─────────────
    // DatePicker.RangePicker is typed as ComponentType<any> | undefined.
    // Assigning to a local const + checking avoids the TS2604/TS2786 errors.
    const RangePicker = DatePicker?.RangePicker;

    switch (field.type) {
        case "text":
        case "email":
            return (
                <Input
                    type={field.type}
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    maxLength={field.maxLength}
                    disabled={field.disabled}
                    {...(field.fieldProps ?? {})}
                />
            );

        case "password":
            return (
                <Input.Password
                    placeholder={field.placeholder ?? "Enter password"}
                    disabled={field.disabled}
                    {...(field.fieldProps ?? {})}
                />
            );

        case "number":
            return (
                <Input
                    type="number"
                    placeholder={field.placeholder ?? "0"}
                    disabled={field.disabled}
                    {...(field.fieldProps ?? {})}
                />
            );

        case "textarea":
            return (
                <Input.TextArea
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    maxLength={field.maxLength}
                    disabled={field.disabled}
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    {...(field.fieldProps ?? {})}
                />
            );

        case "select":
            return (
                <Select
                    placeholder={field.placeholder ?? `Select ${field.label.toLowerCase()}`}
                    options={field.options}
                    disabled={field.disabled}
                    allowClear
                    showSearch
                    filterOption={(input: string, option: any) =>
                        String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    {...(field.fieldProps ?? {})}
                />
            );

        case "multiselect":
            return (
                <Select
                    mode="multiple"
                    placeholder={field.placeholder ?? `Select ${field.label.toLowerCase()}`}
                    options={field.options}
                    disabled={field.disabled}
                    allowClear
                    showSearch
                    filterOption={(input: string, option: any) =>
                        String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    {...(field.fieldProps ?? {})}
                />
            );

        case "date":
            return (
                <DatePicker
                    placeholder={field.placeholder ?? "Select date"}
                    disabled={field.disabled}
                    style={{ width: "100%" }}
                    {...(field.fieldProps ?? {})}
                />
            );

        case "daterange":
            // Guard: RangePicker may be undefined if the UILibrary adapter omits it.
            // Fallback to two separate date pickers or a plain message.
            if (!RangePicker) {
                console.warn("AppForm: DatePicker.RangePicker is not available in the active UILibrary adapter.");
                return (
                    <Input
                        placeholder="RangePicker not available"
                        disabled
                    />
                );
            }
            return (
                <RangePicker
                    disabled={field.disabled}
                    style={{ width: "100%" }}
                    {...(field.fieldProps ?? {})}
                />
            );

        case "switch":
            return (
                <Switch
                    disabled={field.disabled}
                    {...(field.fieldProps ?? {})}
                />
            );

        case "checkbox":
            return (
                <Checkbox
                    disabled={field.disabled}
                    {...(field.fieldProps ?? {})}
                >
                    {field.placeholder ?? field.label}
                </Checkbox>
            );

        case "custom":
            return field.render ? <>{field.render(formInstance)}</> : null;

        default:
            return (
                <Input
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    {...(field.fieldProps ?? {})}
                />
            );
    }
};

// ── AppForm props ─────────────────────────────────────────────────────────────

export interface AppFormProps {
    fields: FormFieldDef[];
    initialValues?: Record<string, unknown>;
    onSubmit: (values: Record<string, unknown>) => Promise<void> | void;
    onCancel?: () => void;
    serverErrors?: FieldError[] | null | undefined;
    isSubmitting?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    showCancel?: boolean;
    layout?: "vertical" | "horizontal" | "inline";
    twoColumn?: boolean;
    style?: React.CSSProperties;
    hideSubmit?: boolean;
    resetOnSuccess?: boolean;
}

// ── AppForm ───────────────────────────────────────────────────────────────────

export const AppForm: React.FC<AppFormProps> = ({
    fields,
    initialValues,
    onSubmit,
    onCancel,
    serverErrors,
    isSubmitting = false,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    showCancel = false,
    layout = "vertical",
    twoColumn = false,
    style,
    hideSubmit = false,
    resetOnSuccess = false,
}) => {
    const lib = useUILibrary();
    const { Form, FormItem, Button } = lib;

    // Form.useForm is exposed as a static method on the Form component via the adapter
    // Cast needed because the UILibrary type declares it as optional
    const [form] = (Form as any).useForm();

    // Wire server-side field errors onto the correct form fields
    useEffect(() => {
        if (!serverErrors || serverErrors.length === 0) return;
        form.setFields(
            serverErrors.map((fe) => ({ name: fe.field, errors: [fe.message] }))
        );
    }, [serverErrors, form]);

    // Sync initialValues when switching between create / edit
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const handleFinish = async (values: Record<string, unknown>) => {
        await onSubmit(values);
        if (resetOnSuccess) form.resetFields();
    };

    const currentValues: Record<string, unknown> = form.getFieldsValue?.() ?? {};

    const formItems = fields
        .filter((f) => !f.hidden?.(currentValues))
        .map((field) => {
            const rules: any[] = field.rules ? [...field.rules] : [];

            if (field.required && !rules.some((r) => r.required)) {
                rules.unshift({ required: true, message: `${field.label} is required` });
            }
            if (field.type === "email") {
                rules.push({ type: "email", message: "Enter a valid email address" });
            }

            const valuePropName =
                field.type === "switch" || field.type === "checkbox" ? "checked" : "value";

            return (
                <div
                    key={field.name}
                    style={twoColumn ? { gridColumn: `span ${field.span ?? 12}` } : undefined}
                >
                    <FormItem
                        name={field.name}
                        label={field.label}
                        rules={rules}
                        valuePropName={valuePropName}
                        help={field.help}
                        {...(field.formItemProps ?? {})}
                    >
                        <FieldRenderer field={field} lib={lib} formInstance={form} />
                    </FormItem>
                </div>
            );
        });

    return (
        <Form
            form={form}
            layout={layout}
            initialValues={initialValues}
            onFinish={handleFinish}
            style={style}
            disabled={isSubmitting}
            scrollToFirstError
        >
            {twoColumn ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                    {formItems}
                </div>
            ) : (
                formItems
            )}

            {!hideSubmit && (
                <FormItem style={{ marginTop: 8, marginBottom: 0 }}>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        {showCancel && onCancel && (
                            <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
                                {cancelLabel}
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            {submitLabel}
                        </Button>
                    </div>
                </FormItem>
            )}
        </Form>
    );
};