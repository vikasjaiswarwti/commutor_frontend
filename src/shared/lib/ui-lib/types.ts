import React from "react";

// Abstract component props
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  type?: "primary" | "default" | "dashed" | "link" | "text";
  size?: "small" | "middle" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  block?: boolean;
  htmlType?: "button" | "submit" | "reset";
}

export interface InputProps {
  value?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  prefix?: React.ReactNode;
  size?: "small" | "middle" | "large";
  type?: string;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
  bordered?: boolean;
  loading?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string | number;
  onChange?: (value: any) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  allowClear?: boolean;
  mode?: "multiple" | "tags";
}

export interface TableColumn<T = any> {
  title: string;
  dataIndex?: string;
  key?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number | string;
  sorter?: boolean | ((a: T, b: T) => number);
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize: number) => void;
  };
  rowKey?: string | ((record: T) => string);
  className?: string;
}

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export interface FormProps {
  children: React.ReactNode;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  layout?: "vertical" | "horizontal" | "inline";
  initialValues?: any;
  size?: "small" | "middle" | "large";
  className?: string;
}

export interface FormItemProps {
  name?: string | string[];
  label?: React.ReactNode;
  rules?: any[]; // You can type this more strictly based on AntD/MUI needs
  children: React.ReactNode;
  valuePropName?: string;
  className?: string;
  noStyle?: boolean;
}

export interface UILibrary {
  Button: React.FC<ButtonProps>;
  // Input: React.FC<InputProps>;
  Input: React.FC<InputProps> & { Password: React.ComponentType<any> };
  Card: React.FC<CardProps>;
  Modal: React.FC<ModalProps>;
  Select: React.FC<SelectProps>;
  Table: React.FC<TableProps>;
  Icon: React.FC<IconProps>;
  Form: React.FC<FormProps>; // New
  FormItem: React.FC<FormItemProps>; // New
}
