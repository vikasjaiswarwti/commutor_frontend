// import React from "react";
// import type { ReactNode } from "react";

// // Abstract component props
// export interface ButtonProps {
//   variant?: "primary" | "secondary" | "outline" | "ghost";
//   type?: "primary" | "default" | "dashed" | "link" | "text";
//   size?: "small" | "middle" | "large";
//   children: React.ReactNode;
//   onClick?: () => void;
//   disabled?: boolean;
//   loading?: boolean;
//   className?: string;
//   block?: boolean;
//   htmlType?: "button" | "submit" | "reset";
// }

// export interface InputProps {
//   value?: string;
//   // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onChange?: (e: any) => void;
//   placeholder?: string;
//   disabled?: boolean;
//   error?: string;
//   label?: string;
//   prefix?: React.ReactNode;
//   size?: "small" | "middle" | "large";
//   type?: string;
//   className?: string;
// }

// export interface CardProps {
//   children: React.ReactNode;
//   title?: React.ReactNode;
//   className?: string;
//   bordered?: boolean;
//   loading?: boolean;
// }

// export interface ModalProps {
//   open: boolean;
//   onClose: () => void;
//   title?: React.ReactNode;
//   children: React.ReactNode;
//   footer?: React.ReactNode;
//   width?: number | string;
// }

// export interface SelectOption {
//   label: string;
//   value: string | number;
//   disabled?: boolean;
// }

// export interface SelectProps {
//   value?: string | number;
//   onChange?: (value: any) => void;
//   options: SelectOption[];
//   placeholder?: string;
//   disabled?: boolean;
//   loading?: boolean;
//   className?: string;
//   allowClear?: boolean;
//   mode?: "multiple" | "tags";
// }

// export interface TableColumn<T = any> {
//   title: string;
//   dataIndex?: string;
//   key?: string;
//   render?: (value: any, record: T, index: number) => React.ReactNode;
//   width?: number | string;
//   sorter?: boolean | ((a: T, b: T) => number);
// }

// export interface TableProps<T = any> {
//   columns: TableColumn<T>[];
//   dataSource: T[];
//   loading?: boolean;
//   pagination?: {
//     current?: number;
//     pageSize?: number;
//     total?: number;
//     onChange?: (page: number, pageSize: number) => void;
//   };
//   rowKey?: string | ((record: T) => string);
//   className?: string;
// }

// export interface IconProps {
//   name: string;
//   size?: number;
//   className?: string;
//   onClick?: () => void;
// }

// export interface FormProps {
//   children: React.ReactNode;
//   onFinish?: (values: any) => void;
//   onFinishFailed?: (errorInfo: any) => void;
//   layout?: "vertical" | "horizontal" | "inline";
//   initialValues?: any;
//   size?: "small" | "middle" | "large";
//   className?: string;
// }

// export interface FormItemProps {
//   name?: string | string[];
//   label?: React.ReactNode;
//   rules?: any[]; // You can type this more strictly based on AntD/MUI needs
//   children: React.ReactNode;
//   valuePropName?: string;
//   className?: string;
//   noStyle?: boolean;
// }

// export interface LayoutProps {
//   children?: ReactNode;
//   style?: React.CSSProperties;
//   className?: string;
//   hasSider?: boolean;
// }

// export interface HeaderProps {
//   children?: ReactNode;
//   style?: React.CSSProperties;
//   className?: string;
// }

// export interface FooterProps {
//   children?: ReactNode;
//   style?: React.CSSProperties;
//   className?: string;
// }

// export interface SiderProps {
//   children?: ReactNode;
//   width?: string | number;
//   style?: React.CSSProperties;
//   className?: string;
//   collapsible?: boolean;
//   collapsed?: boolean;
//   onCollapse?: (collapsed: boolean) => void;
//   theme?: "light" | "dark";
//   breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
// }

// export interface ContentProps {
//   children?: ReactNode;
//   style?: React.CSSProperties;
//   className?: string;
// }

// export interface FlexProps {
//   children?: ReactNode;
//   gap?: string | number;
//   wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse";
//   style?: React.CSSProperties;
//   className?: string;
//   justify?:
//     | "flex-start"
//     | "flex-end"
//     | "center"
//     | "space-between"
//     | "space-around"
//     | "space-evenly";
//   align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
//   direction?: "row" | "column" | "row-reverse" | "column-reverse";
// }

// export interface UILibrary {
//   // Form components
//   Button: React.FC<ButtonProps>;
//   Input: React.FC<InputProps> & { Password: React.ComponentType<any> };
//   Card: React.FC<CardProps>;
//   Modal: React.FC<ModalProps>;
//   Select: React.FC<SelectProps>;
//   Table: React.FC<TableProps>;
//   Icon: React.FC<IconProps>;
//   Form: React.FC<FormProps>;
//   FormItem: React.FC<FormItemProps>;

//   // Layout components - add these
//   Layout: React.FC<LayoutProps>;
//   Header: React.FC<HeaderProps>;
//   Footer: React.FC<FooterProps>;
//   Sider: React.FC<SiderProps>;
//   Content: React.FC<ContentProps>;
//   Flex: React.FC<FlexProps>;
// }

// // Remove the separate LayoutComponents interface since it's now in UILibrary

// src/shared/lib/ui-lib/types.ts
// Exhaustive prop-type definitions for the UILibrary abstraction layer.
// Every component a dashboard app could need is defined here so swapping
// AntD → MUI (or any other lib) only requires touching the adapter, not
// the consuming feature code.

import React from "react";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   PRIMITIVE TYPES
═══════════════════════════════════════════════════════════════════════════ */

export type Size = "small" | "middle" | "large";
export type Status = "success" | "warning" | "error" | "info";
export type Placement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

/* ═══════════════════════════════════════════════════════════════════════════
   FORM COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */

export interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "link"
    | "text";
  size?: Size;
  children?: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  block?: boolean;
  htmlType?: "button" | "submit" | "reset";
  icon?: ReactNode;
  danger?: boolean;
  shape?: "default" | "circle" | "round";
  href?: string;
  target?: string;
  /** AntD passthrough type */
  type?: "primary" | "default" | "dashed" | "link" | "text";
}

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement> | any) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement> | any) => void;
  onPressEnter?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  size?: Size;
  type?: string;
  className?: string;
  style?: React.CSSProperties;
  maxLength?: number;
  allowClear?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export interface TextAreaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | any) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}

export interface CardProps {
  children: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  loading?: boolean;
  hoverable?: boolean;
  cover?: ReactNode;
  actions?: ReactNode[];
  bodyStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  size?: "default" | "small";
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onOk?: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode | null;
  width?: number | string;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  confirmLoading?: boolean;
  okText?: string;
  cancelText?: string;
  destroyOnClose?: boolean;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  placement?: "left" | "right" | "top" | "bottom";
  closable?: boolean;
  maskClosable?: boolean;
  footer?: ReactNode;
  extra?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  destroyOnClose?: boolean;
}

export interface SelectOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  children?: SelectOption[];
}

export interface SelectProps {
  value?: string | number | (string | number)[];
  onChange?: (value: any, option?: any) => void;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  allowClear?: boolean;
  mode?: "multiple" | "tags";
  size?: Size;
  showSearch?: boolean;
  filterOption?: boolean | ((input: string, option: any) => boolean);
  onSearch?: (value: string) => void;
  notFoundContent?: ReactNode;
  maxTagCount?: number | "responsive";
  open?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;
  dropdownRender?: (menu: ReactNode) => ReactNode;
}

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  indeterminate?: boolean;
}

export interface RadioProps {
  value?: any;
  checked?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface RadioGroupProps {
  value?: any;
  defaultValue?: any;
  onChange?: (e: any) => void;
  options?: Array<{ label: ReactNode; value: any; disabled?: boolean }>;
  optionType?: "default" | "button";
  buttonStyle?: "outline" | "solid";
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  size?: Size;
}

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "default" | "small";
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface SliderProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  marks?: Record<
    number,
    ReactNode | { label: ReactNode; style?: React.CSSProperties }
  >;
  tooltip?: { open?: boolean; formatter?: (value?: number) => ReactNode };
  className?: string;
  style?: React.CSSProperties;
}

export interface DatePickerProps {
  value?: any;
  defaultValue?: any;
  onChange?: (date: any, dateString: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: string;
  showTime?: boolean | object;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  allowClear?: boolean;
  size?: Size;
  className?: string;
  style?: React.CSSProperties;
  disabledDate?: (current: any) => boolean;
  ranges?: Record<string, any>;
}

export interface UploadProps {
  children?: ReactNode;
  action?: string;
  accept?: string;
  multiple?: boolean;
  maxCount?: number;
  fileList?: any[];
  onChange?: (info: any) => void;
  onRemove?: (file: any) => void;
  beforeUpload?: (file: any, fileList: any[]) => boolean | Promise<any>;
  customRequest?: (options: any) => void;
  listType?: "text" | "picture" | "picture-card" | "picture-circle";
  showUploadList?:
    | boolean
    | {
        showPreviewIcon?: boolean;
        showRemoveIcon?: boolean;
        showDownloadIcon?: boolean;
      };
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  drag?: boolean;
}

export interface FormProps {
  children: ReactNode;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  layout?: "vertical" | "horizontal" | "inline";
  initialValues?: Record<string, any>;
  size?: Size;
  className?: string;
  style?: React.CSSProperties;
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  preserve?: boolean;
  scrollToFirstError?: boolean;
  validateTrigger?: string | string[];
  form?: any; // AntD form instance
  name?: string;
  colon?: boolean;
  requiredMark?: boolean | "optional";
  disabled?: boolean;
}

export interface FormItemProps {
  name?: string | string[];
  label?: ReactNode;
  rules?: any[];
  children: ReactNode;
  valuePropName?: string;
  className?: string;
  style?: React.CSSProperties;
  noStyle?: boolean;
  dependencies?: string[];
  extra?: ReactNode;
  help?: ReactNode;
  tooltip?: ReactNode;
  required?: boolean;
  hasFeedback?: boolean;
  validateStatus?: "success" | "warning" | "error" | "validating" | "";
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA DISPLAY
═══════════════════════════════════════════════════════════════════════════ */

export interface TableColumn<T = any> {
  title?: ReactNode;
  dataIndex?: string | string[];
  key?: string;
  render?: (value: any, record: T, index: number) => ReactNode;
  width?: number | string;
  fixed?: "left" | "right" | boolean;
  sorter?: boolean | ((a: T, b: T) => number);
  filters?: Array<{ text: ReactNode; value: any }>;
  onFilter?: (value: any, record: T) => boolean;
  ellipsis?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  defaultSortOrder?: "ascend" | "descend";
  showSorterTooltip?: boolean;
  colSpan?: number;
  rowSpan?: number;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?:
    | boolean
    | {
        current?: number;
        pageSize?: number;
        total?: number;
        onChange?: (page: number, pageSize: number) => void;
        showSizeChanger?: boolean;
        showQuickJumper?: boolean;
        showTotal?: (total: number, range: [number, number]) => ReactNode;
        pageSizeOptions?: string[];
        position?: Array<
          | "topLeft"
          | "topCenter"
          | "topRight"
          | "bottomLeft"
          | "bottomCenter"
          | "bottomRight"
        >;
      };
  rowKey?: string | ((record: T) => string);
  className?: string;
  style?: React.CSSProperties;
  scroll?: { x?: number | string | true; y?: number | string };
  rowSelection?: {
    type?: "checkbox" | "radio";
    selectedRowKeys?: any[];
    onChange?: (selectedRowKeys: any[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => object;
  };
  expandable?: {
    expandedRowRender?: (record: T) => ReactNode;
    rowExpandable?: (record: T) => boolean;
    defaultExpandAllRows?: boolean;
  };
  summary?: (data: readonly T[]) => ReactNode;
  onRow?: (record: T, index?: number) => object;
  size?: "small" | "middle" | "large";
  bordered?: boolean;
  sticky?: boolean;
  showHeader?: boolean;
  title?: () => ReactNode;
  footer?: () => ReactNode;
  locale?: { emptyText?: ReactNode };
  onChange?: (pagination: any, filters: any, sorter: any) => void;
}

export interface TagProps {
  children?: ReactNode;
  color?: string;
  closable?: boolean;
  onClose?: (e: any) => void;
  icon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
}

export interface BadgeProps {
  count?: number | ReactNode;
  dot?: boolean;
  overflowCount?: number;
  showZero?: boolean;
  status?: "success" | "processing" | "default" | "error" | "warning";
  color?: string;
  text?: ReactNode;
  size?: "default" | "small";
  offset?: [number | string, number | string];
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface AvatarProps {
  src?: string | ReactNode;
  alt?: string;
  size?:
    | number
    | Size
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      };
  shape?: "circle" | "square";
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onError?: () => boolean;
  draggable?: boolean;
}

export interface ProgressProps {
  percent?: number;
  type?: "line" | "circle" | "dashboard";
  status?: "success" | "exception" | "normal" | "active";
  strokeColor?: string | { from: string; to: string } | Record<string, string>;
  trailColor?: string;
  strokeWidth?: number;
  showInfo?: boolean;
  format?: (percent?: number) => ReactNode;
  size?: number | [number, number] | Size;
  success?: { percent?: number; strokeColor?: string };
  className?: string;
  style?: React.CSSProperties;
  steps?: number;
  gapDegree?: number;
  gapPosition?: "top" | "bottom" | "left" | "right";
}

export interface SkeletonProps {
  active?: boolean;
  avatar?: boolean | { size?: Size | number; shape?: "circle" | "square" };
  loading?: boolean;
  paragraph?:
    | boolean
    | { rows?: number; width?: number | string | Array<number | string> };
  title?: boolean | { width?: number | string };
  round?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export interface TimelineItem {
  label?: ReactNode;
  children?: ReactNode;
  color?: string;
  dot?: ReactNode;
  position?: "left" | "right";
}

export interface TimelineProps {
  items?: TimelineItem[];
  mode?: "left" | "alternate" | "right";
  pending?: ReactNode;
  pendingDot?: ReactNode;
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface StepItem {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  status?: "wait" | "process" | "finish" | "error";
  disabled?: boolean;
  subTitle?: ReactNode;
}

export interface StepsProps {
  current?: number;
  items?: StepItem[];
  direction?: "horizontal" | "vertical";
  labelPlacement?: "horizontal" | "vertical";
  progressDot?: boolean | ((iconDot: ReactNode, info: object) => ReactNode);
  size?: "default" | "small";
  status?: "wait" | "process" | "finish" | "error";
  type?: "default" | "navigation" | "inline";
  onChange?: (current: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface EmptyProps {
  description?: ReactNode;
  image?: ReactNode | string;
  imageStyle?: React.CSSProperties;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ResultProps {
  status?: "success" | "error" | "info" | "warning" | "404" | "403" | "500";
  title?: ReactNode;
  subTitle?: ReactNode;
  extra?: ReactNode;
  icon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════════════════ */

export interface TabItem {
  key: string;
  label: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

export interface TabsProps {
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  items?: TabItem[];
  type?: "line" | "card" | "editable-card";
  tabPosition?: "top" | "right" | "bottom" | "left";
  size?: Size;
  tabBarExtraContent?: ReactNode | { left?: ReactNode; right?: ReactNode };
  animated?: boolean | { inkBar?: boolean; tabPane?: boolean };
  destroyInactiveTabPane?: boolean;
  centered?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onEdit?: (targetKey: any, action: "add" | "remove") => void;
  onTabClick?: (key: string, e: any) => void;
  hideAdd?: boolean;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
}

export interface BreadcrumbItem {
  title?: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  menu?: { items: Array<{ key: string; label: ReactNode; href?: string }> };
  className?: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  itemRender?: (
    route: BreadcrumbItem,
    params: any,
    routes: BreadcrumbItem[],
    paths: string[],
  ) => ReactNode;
}

export interface MenuItemType {
  key: string;
  label?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  type?: "divider" | "group" | "item" | "submenu";
  onClick?: (info: any) => void;
  children?: MenuItemType[];
  title?: string;
  theme?: "light" | "dark";
}

export interface MenuProps {
  items?: MenuItemType[];
  mode?: "horizontal" | "vertical" | "inline";
  theme?: "light" | "dark";
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onClick?: (info: { key: string; keyPath: string[]; domEvent: Event }) => void;
  onOpenChange?: (openKeys: string[]) => void;
  inlineCollapsed?: boolean;
  inlineIndent?: number;
  className?: string;
  style?: React.CSSProperties;
  selectable?: boolean;
  multiple?: boolean;
  expandIcon?: ReactNode | ((props: object) => ReactNode);
  triggerSubMenuAction?: "hover" | "click";
  subMenuCloseDelay?: number;
  subMenuOpenDelay?: number;
  forceSubMenuRender?: boolean;
  overflowedIndicator?: ReactNode;
}

export interface PaginationProps {
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  pageSizeOptions?: string[];
  size?: "default" | "small";
  simple?: boolean;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showLessItems?: boolean;
  responsive?: boolean;
  itemRender?: (
    page: number,
    type: string,
    originalElement: ReactNode,
  ) => ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEEDBACK
═══════════════════════════════════════════════════════════════════════════ */

export interface TooltipProps {
  title: ReactNode;
  placement?: Placement;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?:
    | "hover"
    | "focus"
    | "click"
    | "contextMenu"
    | Array<"hover" | "focus" | "click" | "contextMenu">;
  color?: string;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  destroyTooltipOnHide?: boolean;
  arrow?: boolean | { pointAtCenter?: boolean };
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}

export interface PopconfirmProps {
  title?: ReactNode;
  description?: ReactNode;
  onConfirm?: (e?: React.MouseEvent) => void;
  onCancel?: (e?: React.MouseEvent) => void;
  okText?: ReactNode;
  cancelText?: ReactNode;
  children: ReactNode;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean, e?: React.MouseEvent) => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  icon?: ReactNode;
  disabled?: boolean;
  showCancel?: boolean;
  className?: string;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  zIndex?: number;
}

export interface PopoverProps {
  title?: ReactNode;
  content?: ReactNode;
  placement?: Placement;
  trigger?: "hover" | "focus" | "click" | "contextMenu" | Array<string>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  arrow?: boolean;
  destroyTooltipOnHide?: boolean;
  zIndex?: number;
  color?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export interface AlertProps {
  type?: "success" | "info" | "warning" | "error";
  message: ReactNode;
  description?: ReactNode;
  closable?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showIcon?: boolean;
  icon?: ReactNode;
  banner?: boolean;
  action?: ReactNode;
  afterClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface SpinProps {
  spinning?: boolean;
  size?: Size;
  tip?: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  fullscreen?: boolean;
  indicator?: ReactNode;
}

export interface NotificationConfig {
  message: ReactNode;
  description?: ReactNode;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
  placement?:
    | "top"
    | "topLeft"
    | "topRight"
    | "bottom"
    | "bottomLeft"
    | "bottomRight";
  icon?: ReactNode;
  key?: string;
  btn?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onClick?: () => void;
  closeIcon?: ReactNode;
  pauseOnHover?: boolean;
  showProgress?: boolean;
}

export interface MessageConfig {
  content: ReactNode;
  duration?: number;
  type?: "success" | "info" | "warning" | "error" | "loading";
  key?: string;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  icon?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LAYOUT
═══════════════════════════════════════════════════════════════════════════ */

export interface LayoutProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  hasSider?: boolean;
}

export interface HeaderProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export interface FooterProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export interface SiderProps {
  children?: ReactNode;
  width?: string | number;
  collapsedWidth?: number;
  style?: React.CSSProperties;
  className?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (
    collapsed: boolean,
    type: "clickTrigger" | "responsive",
  ) => void;
  onBreakpoint?: (broken: boolean) => void;
  theme?: "light" | "dark";
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  trigger?: ReactNode | null;
  reverseArrow?: boolean;
  zeroWidthTriggerStyle?: React.CSSProperties;
}

export interface ContentProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export interface FlexProps {
  children?: ReactNode;
  gap?: string | number;
  wrap?: boolean | "wrap" | "nowrap" | "wrap-reverse";
  style?: React.CSSProperties;
  className?: string;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "normal";
  align?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline"
    | "normal";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  flex?: string | number;
}

export interface SpaceProps {
  children?: ReactNode;
  size?: Size | number | [number, number];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  wrap?: boolean;
  split?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface DividerProps {
  type?: "horizontal" | "vertical";
  orientation?: "left" | "right" | "center";
  orientationMargin?: string | number;
  plain?: boolean;
  dashed?: boolean;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPOGRAPHY
═══════════════════════════════════════════════════════════════════════════ */

export interface TypographyTextProps {
  children?: ReactNode;
  type?: "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  delete?: boolean;
  underline?: boolean;
  strong?: boolean;
  italic?: boolean;
  ellipsis?:
    | boolean
    | {
        rows?: number;
        expandable?: boolean;
        suffix?: string;
        tooltip?: boolean | ReactNode;
        onExpand?: () => void;
      };
  copyable?:
    | boolean
    | {
        text?: string;
        onCopy?: () => void;
        icon?: ReactNode;
        tooltips?: boolean | ReactNode;
      };
  editable?: boolean | object;
  className?: string;
  style?: React.CSSProperties;
}

export interface TypographyTitleProps extends TypographyTextProps {
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface TypographyParagraphProps extends TypographyTextProps {
  // inherits all text props
}

/* ═══════════════════════════════════════════════════════════════════════════
   DROPDOWN
═══════════════════════════════════════════════════════════════════════════ */

export interface DropdownProps {
  menu?: {
    items?: Array<{
      key: string;
      label?: ReactNode;
      icon?: ReactNode;
      disabled?: boolean;
      danger?: boolean;
      type?: "divider" | "group";
      children?: any[];
      onClick?: (info: { key: string; domEvent: Event }) => void;
    }>;
    onClick?: (info: any) => void;
    selectedKeys?: string[];
    selectable?: boolean;
  };
  trigger?: Array<"click" | "hover" | "contextMenu">;
  placement?:
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | "top"
    | "topLeft"
    | "topRight";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children: ReactNode;
  dropdownRender?: (menu: ReactNode) => ReactNode;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  destroyPopupOnHide?: boolean;
  arrow?: boolean;
  className?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ICON
═══════════════════════════════════════════════════════════════════════════ */

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent) => void;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN LIBRARY INTERFACE
═══════════════════════════════════════════════════════════════════════════ */

export interface UILibrary {
  // ── Form ───────────────────────────────────────────────────────────────
  Button: React.FC<ButtonProps>;
  Input: React.FC<InputProps> & {
    Password: React.ComponentType<InputProps>;
    TextArea: React.ComponentType<TextAreaProps>;
    Search: React.ComponentType<
      InputProps & {
        onSearch?: (value: string) => void;
        enterButton?: ReactNode | boolean;
      }
    >;
  };
  Select: React.FC<SelectProps>;
  Checkbox: React.FC<CheckboxProps> & { Group?: React.ComponentType<any> };
  Radio: React.FC<RadioProps> & {
    Group: React.ComponentType<RadioGroupProps>;
    Button: React.ComponentType<RadioProps>;
  };
  Switch: React.FC<SwitchProps>;
  Slider: React.FC<SliderProps>;
  DatePicker: React.FC<DatePickerProps> & {
    RangePicker?: React.ComponentType<any>;
  };
  Upload: React.FC<UploadProps>;
  Form: React.FC<FormProps> & { useForm?: () => any };
  FormItem: React.FC<FormItemProps>;

  // ── Data display ────────────────────────────────────────────────────────
  Table: React.FC<TableProps>;
  Card: React.FC<CardProps>;
  Tag: React.FC<TagProps>;
  Badge: React.FC<BadgeProps>;
  Avatar: React.FC<AvatarProps> & { Group?: React.ComponentType<any> };
  Progress: React.FC<ProgressProps>;
  Skeleton: React.FC<SkeletonProps>;
  Timeline: React.FC<TimelineProps>;
  Steps: React.FC<StepsProps>;
  Empty: React.FC<EmptyProps>;
  Result: React.FC<ResultProps>;

  // ── Navigation ─────────────────────────────────────────────────────────
  Tabs: React.FC<TabsProps>;
  Breadcrumb: React.FC<BreadcrumbProps>;
  Dropdown: React.FC<DropdownProps>;
  Pagination: React.FC<PaginationProps>;
  Menu: React.FC<MenuProps>;

  // ── Feedback ────────────────────────────────────────────────────────────
  Modal: React.FC<ModalProps>;
  Drawer: React.FC<DrawerProps>;
  Tooltip: React.FC<TooltipProps>;
  Popconfirm: React.FC<PopconfirmProps>;
  Popover: React.FC<PopoverProps>;
  Alert: React.FC<AlertProps>;
  Spin: React.FC<SpinProps>;
  /** Imperative notification API — call notification.success({ ... }) */
  notification: {
    success: (config: NotificationConfig) => void;
    error: (config: NotificationConfig) => void;
    info: (config: NotificationConfig) => void;
    warning: (config: NotificationConfig) => void;
    open: (config: NotificationConfig) => void;
    destroy: (key?: string) => void;
  };
  /** Imperative message API — call message.success("Saved!") */
  message: {
    success: (content: ReactNode, duration?: number) => void;
    error: (content: ReactNode, duration?: number) => void;
    info: (content: ReactNode, duration?: number) => void;
    warning: (content: ReactNode, duration?: number) => void;
    loading: (content: ReactNode, duration?: number) => void;
    destroy: (key?: string) => void;
  };

  // ── Layout ──────────────────────────────────────────────────────────────
  Layout: React.FC<LayoutProps>;
  Header: React.FC<HeaderProps>;
  Footer: React.FC<FooterProps>;
  Sider: React.FC<SiderProps>;
  Content: React.FC<ContentProps>;
  Flex: React.FC<FlexProps>;
  Space: React.FC<SpaceProps>;
  Divider: React.FC<DividerProps>;

  // ── Typography ──────────────────────────────────────────────────────────
  Typography: {
    Text: React.FC<TypographyTextProps>;
    Title: React.FC<TypographyTitleProps>;
    Paragraph: React.FC<TypographyParagraphProps>;
    Link: React.FC<TypographyTextProps & { href?: string; target?: string }>;
  };

  // ── Icon ───────────────────────────────────────────────────────────────
  Icon: React.FC<IconProps>;
}
