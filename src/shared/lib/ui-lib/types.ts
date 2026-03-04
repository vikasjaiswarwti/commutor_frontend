import React from "react";

// Abstract component props
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "middle" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
}

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
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

export interface UILibrary {
  Button: React.FC<ButtonProps>;
  Input: React.FC<InputProps>;
  Card: React.FC<CardProps>;
  Modal: React.FC<ModalProps>;
  Select: React.FC<SelectProps>;
  Table: React.FC<TableProps>;
  Icon: React.FC<IconProps>;
}
