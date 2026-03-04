import React from 'react';
import {
    Button as AntButton,
    Input as AntInput,
    Card as AntCard,
    Modal as AntModal,
    Select as AntSelect,
    Table as AntTable,
    ConfigProvider
} from 'antd';

import * as Icons from '@ant-design/icons';

import type { UILibrary, ButtonProps, InputProps, CardProps, ModalProps, SelectProps, TableProps, IconProps } from './types';

// Map variant to Ant Design button type
const mapVariantToAntType = (variant?: string): 'primary' | 'default' | 'dashed' | 'text' | 'link' => {
    switch (variant) {
        case 'primary':
            return 'primary';
        case 'secondary':
            return 'default';
        case 'outline':
            return 'default';
        case 'ghost':
            return 'text';
        default:
            return 'default';
    }
};

// Ant Design Adapter
export const AntDUILibrary: UILibrary = {
    Button: ({ variant = 'primary', size = 'middle', children, onClick, disabled, loading, className, htmlType, ...props }: ButtonProps) => (
        <AntButton
            type={mapVariantToAntType(variant)}
            size={size}
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            className={className}
            htmlType={htmlType}
            {...props}
        >
            {children}
        </AntButton>
    ),

    Input: ({ value, onChange, placeholder, disabled, error, label, size = 'middle', type = 'text', className }: InputProps) => (
        <div className="w-full">
            {label && <div className="mb-1 text-sm font-medium">{label}</div>}
            <AntInput
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                size={size}
                type={type}
                className={className}
                status={error ? 'error' : undefined}
            />
            {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
        </div>
    ),

    Card: ({ children, title, className, bordered = true, loading = false }: CardProps) => (
        <AntCard title={title} className={className} bordered={bordered} loading={loading}>
            {children}
        </AntCard>
    ),

    Modal: ({ open, onClose, title, children, footer, width }: ModalProps) => (
        <AntModal
            open={open}
            onCancel={onClose}
            title={title}
            footer={footer}
            width={width}
            destroyOnClose
        >
            {children}
        </AntModal>
    ),

    Select: ({ value, onChange, options, placeholder, disabled, loading, className, allowClear, mode }: SelectProps) => (
        <AntSelect
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            loading={loading}
            className={className}
            allowClear={allowClear}
            mode={mode}
            options={options}
            style={{ width: '100%' }}
        />
    ),

    Table: ({ columns, dataSource, loading, pagination, rowKey, className }: TableProps) => (
        <AntTable
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
            rowKey={rowKey}
            className={className}
        />
    ),

    Icon: ({ name, size = 16, className, onClick }: IconProps) => {
        // Convert kebab-case to PascalCase (e.g., "chevron-left" -> "ChevronLeftOutlined")
        const iconName = name
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 'Outlined';

        const IconComponent = (Icons as any)[iconName];

        if (!IconComponent) {
            console.warn(`Icon "${iconName}" not found in Ant Design icons`);
            return null;
        }

        return <IconComponent style={{ fontSize: size }} className={className} onClick={onClick} />;
    }
};

// Theme provider wrapper for Ant Design
export const AntDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0284c7',
                    borderRadius: 6,
                },
                components: {
                    Button: {
                        controlHeight: 36,
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};