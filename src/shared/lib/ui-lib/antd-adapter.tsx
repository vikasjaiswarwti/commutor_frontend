// import React from 'react';

// import {
//     Button as AntButton,
//     Input as AntInput,
//     Card as AntCard,
//     Modal as AntModal,
//     Select as AntSelect,
//     Table as AntTable,
//     Form as AntForm,
//     ConfigProvider
// } from 'antd';

// import { Layout, Flex } from 'antd';

// import * as Icons from '@ant-design/icons';

// import type { UILibrary, ButtonProps, InputProps, CardProps, ModalProps, SelectProps, TableProps, IconProps, FormProps, FormItemProps, LayoutComponents } from './types';


// // Map variant to Ant Design button type
// const mapVariantToAntType = (variant?: string): 'primary' | 'default' | 'dashed' | 'text' | 'link' => {
//     switch (variant) {
//         case 'primary':
//             return 'primary';
//         case 'secondary':
//             return 'default';
//         case 'outline':
//             return 'default';
//         case 'ghost':
//             return 'text';
//         default:
//             return 'default';
//     }
// };

// const { Header: AntHeader, Footer: AntFooter, Sider: AntSider, Content: AntContent } = Layout;

// // Ant Design Adapter
// export const AntDUILibrary: UILibrary = {
//     Button: ({ variant = 'primary', block, size = 'middle', children, onClick, disabled, loading, className, htmlType, ...props }: ButtonProps) => (
//         <AntButton
//             type={mapVariantToAntType(variant)}
//             block={block}
//             size={size}
//             onClick={onClick}
//             disabled={disabled}
//             loading={loading}
//             className={className}
//             htmlType={htmlType}
//             {...props}
//         >
//             {children}
//         </AntButton>
//     ),

//     Input: Object.assign(
//         ({ prefix, error, label, ...props }: InputProps) => (
//             <div className="w-full">
//                 {label && <div className="mb-1 text-sm font-medium">{label}</div>}
//                 <AntInput
//                     prefix={prefix}
//                     status={error ? 'error' : undefined}
//                     {...props}
//                 />
//                 {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
//             </div>
//         ),
//         { Password: AntInput.Password } // Attach AntD's Password component
//     ),

//     Form: ({ children, ...props }: FormProps) => (
//         <AntForm {...props}>{children}</AntForm>
//     ),

//     FormItem: ({ children, ...props }: FormItemProps) => (
//         <AntForm.Item {...props}>{children}</AntForm.Item>
//     ),

//     Card: ({ children, title, className, bordered = true, loading = false }: CardProps) => (
//         <AntCard title={title} className={className} bordered={bordered} loading={loading}>
//             {children}
//         </AntCard>
//     ),

//     Modal: ({ open, onClose, title, children, footer, width }: ModalProps) => (
//         <AntModal
//             open={open}
//             onCancel={onClose}
//             title={title}
//             footer={footer}
//             width={width}
//             destroyOnClose
//         >
//             {children}
//         </AntModal>
//     ),

//     Select: ({ value, onChange, options, placeholder, disabled, loading, className, allowClear, mode }: SelectProps) => (
//         <AntSelect
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             disabled={disabled}
//             loading={loading}
//             className={className}
//             allowClear={allowClear}
//             mode={mode}
//             options={options}
//             style={{ width: '100%' }}
//         />
//     ),

//     Table: ({ columns, dataSource, loading, pagination, rowKey, className }: TableProps) => (
//         <AntTable
//             columns={columns}
//             dataSource={dataSource}
//             loading={loading}
//             pagination={pagination}
//             rowKey={rowKey}
//             className={className}
//         />
//     ),

//     Icon: ({ name, size = 16, className, onClick }: IconProps) => {
//         // Convert kebab-case to PascalCase (e.g., "chevron-left" -> "ChevronLeftOutlined")
//         const iconName = name
//             .split('-')
//             .map(part => part.charAt(0).toUpperCase() + part.slice(1))
//             .join('') + 'Outlined';

//         const IconComponent = (Icons as any)[iconName];

//         if (!IconComponent) {
//             console.warn(`Icon "${iconName}" not found in Ant Design icons`);
//             return null;
//         }

//         return <IconComponent style={{ fontSize: size }} className={className} onClick={onClick} />;
//     }
// };

// export const AntDLayout: LayoutComponents = {
//     Header: ({ children, style, className }) => (
//         <AntHeader style={style} className={className}>
//             {children}
//         </AntHeader>
//     ),
//     Footer: ({ children, style, className }) => (
//         <AntFooter style={style} className={className}>
//             {children}
//         </AntFooter>
//     ),
//     Sider: ({ children, width, style, className, collapsible, collapsed, onCollapse, theme, breakpoint }) => (
//         <AntSider
//             width={width}
//             style={style}
//             className={className}
//             collapsible={collapsible}
//             collapsed={collapsed}
//             onCollapse={onCollapse}
//             theme={theme}
//             breakpoint={breakpoint}
//         >
//             {children}
//         </AntSider>
//     ),
//     Content: ({ children, style, className }) => (
//         <AntContent style={style} className={className}>
//             {children}
//         </AntContent>
//     ),
//     Layout: ({ children, style, className, hasSider }) => (
//         <Layout style={style} className={className} hasSider={hasSider}>
//             {children}
//         </Layout>
//     ),
//     Flex: ({ children, gap, wrap, style, className, justify, align, direction }) => (
//         <Flex
//             gap={gap}
//             wrap={wrap}
//             style={style}
//             className={className}
//             justify={justify}
//             align={align}
//             vertical={direction === 'column'}
//         >
//             {children}
//         </Flex>
//     ),
// };

// // Theme provider wrapper for Ant Design
// export const AntDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     return (
//         <ConfigProvider
//             theme={{
//                 token: {
//                     colorPrimary: '#0284c7',
//                     borderRadius: 6,
//                 },
//                 components: {
//                     Button: {
//                         controlHeight: 36,
//                     },
//                 },
//             }}
//         >
//             {children}
//         </ConfigProvider>
//     );
// };

// src/shared/lib/ui-lib/antd-adapter.tsx
// Update to include layout components in the main UILibrary
import React from 'react';
import {
    Button as AntButton,
    Input as AntInput,
    Card as AntCard,
    Modal as AntModal,
    Select as AntSelect,
    Table as AntTable,
    Form as AntForm,
    ConfigProvider,
    Layout,
    Flex
} from 'antd';
import * as Icons from '@ant-design/icons';
import type { UILibrary, ButtonProps, InputProps, CardProps, ModalProps, SelectProps, TableProps, IconProps, FormProps, FormItemProps } from './types';

const { Header: AntHeader, Footer: AntFooter, Sider: AntSider, Content: AntContent } = Layout;

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

// Ant Design Adapter - now includes layout components
export const AntDUILibrary: UILibrary = {
    // Form components (your existing ones)
    Button: ({ variant = 'primary', block, size = 'middle', children, onClick, disabled, loading, className, htmlType, ...props }: ButtonProps) => (
        <AntButton
            type={mapVariantToAntType(variant)}
            block={block}
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

    Input: Object.assign(
        ({ prefix, error, label, ...props }: InputProps) => (
            <div className="w-full">
                {label && <div className="mb-1 text-sm font-medium">{label}</div>}
                <AntInput
                    prefix={prefix}
                    status={error ? 'error' : undefined}
                    {...props}
                />
                {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
            </div>
        ),
        { Password: AntInput.Password }
    ),

    Form: ({ children, ...props }: FormProps) => (
        <AntForm {...props}>{children}</AntForm>
    ),

    FormItem: ({ children, ...props }: FormItemProps) => (
        <AntForm.Item {...props}>{children}</AntForm.Item>
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
    },

    // Layout components - now included
    Header: ({ children, style, className }) => (
        <AntHeader style={style} className={className}>{children}</AntHeader>
    ),
    Footer: ({ children, style, className }) => (
        <AntFooter style={style} className={className}>{children}</AntFooter>
    ),
    Sider: ({ children, width, style, className, collapsible, collapsed, onCollapse, theme, breakpoint }) => (
        <AntSider
            width={width}
            style={style}
            className={className}
            collapsible={collapsible}
            collapsed={collapsed}
            onCollapse={onCollapse}
            theme={theme}
            breakpoint={breakpoint}
        >
            {children}
        </AntSider>
    ),
    Content: ({ children, style, className }) => (
        <AntContent style={style} className={className}>{children}</AntContent>
    ),
    Layout: ({ children, style, className, hasSider }) => (
        <Layout style={style} className={className} hasSider={hasSider}>{children}</Layout>
    ),
    Flex: ({ children, gap, wrap, style, className, justify, align, direction }) => (
        <Flex
            gap={gap}
            wrap={wrap}
            style={style}
            className={className}
            justify={justify}
            align={align}
            vertical={direction === 'column'}
        >
            {children}
        </Flex>
    ),
};

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