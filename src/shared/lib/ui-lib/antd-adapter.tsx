// // Update to include layout components in the main UILibrary
// import React from 'react';
// import {
//     Button as AntButton,
//     Input as AntInput,
//     Card as AntCard,
//     Modal as AntModal,
//     Select as AntSelect,
//     Table as AntTable,
//     Form as AntForm,
//     ConfigProvider,
//     Layout,
//     Flex
// } from 'antd';
// import * as Icons from '@ant-design/icons';
// import type { UILibrary, ButtonProps, InputProps, CardProps, ModalProps, SelectProps, TableProps, IconProps, FormProps, FormItemProps } from './types';

// const { Header: AntHeader, Footer: AntFooter, Sider: AntSider, Content: AntContent } = Layout;

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

// // Ant Design Adapter - now includes layout components
// export const AntDUILibrary: UILibrary = {
//     // Form components (your existing ones)
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
//         { Password: AntInput.Password }
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
//     },

//     // Layout components - now included
//     Header: ({ children, style, className }) => (
//         <AntHeader style={style} className={className}>{children}</AntHeader>
//     ),
//     Footer: ({ children, style, className }) => (
//         <AntFooter style={style} className={className}>{children}</AntFooter>
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
//         <AntContent style={style} className={className}>{children}</AntContent>
//     ),
//     Layout: ({ children, style, className, hasSider }) => (
//         <Layout style={style} className={className} hasSider={hasSider}>{children}</Layout>
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
// Full AntD adapter — every component in UILibrary wired up.
// ColorPrimary set to COMMUTR green #00A86B.

import React from "react";
import {
    Button as AntButton,
    Input as AntInput,
    Card as AntCard,
    Modal as AntModal,
    Drawer as AntDrawer,
    Select as AntSelect,
    Table as AntTable,
    Form as AntForm,
    Checkbox as AntCheckbox,
    Radio as AntRadio,
    Switch as AntSwitch,
    Slider as AntSlider,
    DatePicker as AntDatePicker,
    Upload as AntUpload,
    Tag as AntTag,
    Badge as AntBadge,
    Avatar as AntAvatar,
    Progress as AntProgress,
    Skeleton as AntSkeleton,
    Timeline as AntTimeline,
    Steps as AntSteps,
    Empty as AntEmpty,
    Result as AntResult,
    Tabs as AntTabs,
    Breadcrumb as AntBreadcrumb,
    Dropdown as AntDropdown,
    Pagination as AntPagination,
    Menu as AntMenu,
    Tooltip as AntTooltip,
    Popconfirm as AntPopconfirm,
    Popover as AntPopover,
    Alert as AntAlert,
    Spin as AntSpin,
    Space as AntSpace,
    Divider as AntDivider,
    Typography as AntTypography,
    ConfigProvider,
    Layout,
    Flex,
    notification as antNotification,
    message as antMessage,
} from "antd";
import * as Icons from "@ant-design/icons";

import type {
    UILibrary,
    ButtonProps,
    InputProps,
    TextAreaProps,
    CardProps,
    ModalProps,
    DrawerProps,
    SelectProps,
    CheckboxProps,
    RadioProps,
    RadioGroupProps,
    SwitchProps,
    SliderProps,
    DatePickerProps,
    UploadProps,
    FormProps,
    FormItemProps,
    TableProps,
    TagProps,
    BadgeProps,
    AvatarProps,
    ProgressProps,
    SkeletonProps,
    TimelineProps,
    StepsProps,
    EmptyProps,
    ResultProps,
    TabsProps,
    BreadcrumbProps,
    DropdownProps,
    PaginationProps,
    MenuProps,
    TooltipProps,
    PopconfirmProps,
    PopoverProps,
    AlertProps,
    SpinProps,
    SpaceProps,
    DividerProps,
    TypographyTextProps,
    TypographyTitleProps,
    TypographyParagraphProps,
    LayoutProps,
    HeaderProps,
    FooterProps,
    SiderProps,
    ContentProps,
    FlexProps,
    IconProps,
} from "./types";

const { Header: AntHeader, Footer: AntFooter, Sider: AntSider, Content: AntContent } = Layout;
const { Text, Title, Paragraph, Link } = AntTypography;

/* ── Variant → AntD button type ─────────────────────────────────────────── */
const variantToAntType = (v?: string): "primary" | "default" | "dashed" | "text" | "link" => {
    switch (v) {
        case "primary": return "primary";
        case "outline": return "default";
        case "secondary": return "default";
        case "ghost": return "text";
        case "link": return "link";
        case "text": return "text";
        case "danger": return "primary";
        default: return "default";
    }
};

/* ══════════════════════════════════════════════════════════════════════════
   ADAPTER
══════════════════════════════════════════════════════════════════════════ */
export const AntDUILibrary: UILibrary = {

    /* ── Form ────────────────────────────────────────────────────────────── */

    Button: ({ variant, block, size = "middle", children, onClick, disabled, loading,
        className, style, htmlType, icon, danger, shape, href, target, type }: ButtonProps) => (
        <AntButton
            type={type ?? variantToAntType(variant)}
            block={block}
            size={size}
            onClick={onClick as any}
            disabled={disabled}
            loading={loading}
            className={className}
            style={style}
            htmlType={htmlType}
            icon={icon}
            danger={danger ?? variant === "danger"}
            shape={shape}
            href={href}
            target={target}
        >
            {children}
        </AntButton>
    ),

    Input: Object.assign(
        ({ prefix, suffix, addonBefore, addonAfter, error, label, allowClear,
            autoFocus, maxLength, id, name, autoComplete, ...props }: InputProps) => (
            <div style={{ width: "100%" }}>
                {label && <div style={{ marginBottom: 4, fontSize: 13, fontWeight: 500 }}>{label}</div>}
                <AntInput
                    prefix={prefix}
                    suffix={suffix}
                    addonBefore={addonBefore}
                    addonAfter={addonAfter}
                    status={error ? "error" : undefined}
                    allowClear={allowClear}
                    autoFocus={autoFocus}
                    maxLength={maxLength}
                    id={id}
                    name={name}
                    autoComplete={autoComplete}
                    {...props}
                />
                {error && <div style={{ marginTop: 4, fontSize: 12, color: "#EF4444" }}>{error}</div>}
            </div>
        ),
        {
            Password: (props: InputProps) => <AntInput.Password {...props} />,
            TextArea: ({ autoSize, ...props }: TextAreaProps) => (
                <AntInput.TextArea autoSize={autoSize as any} {...props} />
            ),
            Search: ({ onSearch, enterButton, ...props }: InputProps & { onSearch?: (v: string) => void; enterButton?: any }) => (
                <AntInput.Search onSearch={onSearch} enterButton={enterButton} {...props} />
            ),
        }
    ),

    Select: ({ value, onChange, options, placeholder, disabled, loading, className, style,
        allowClear, mode, size, showSearch, filterOption, onSearch, notFoundContent,
        maxTagCount, open, onDropdownVisibleChange, dropdownRender }: SelectProps) => (
        <AntSelect
            value={value}
            onChange={onChange}
            options={options as any}
            placeholder={placeholder}
            disabled={disabled}
            loading={loading}
            className={className}
            style={{ width: "100%", ...style }}
            allowClear={allowClear}
            mode={mode}
            size={size}
            showSearch={showSearch}
            filterOption={filterOption as any}
            onSearch={onSearch}
            notFoundContent={notFoundContent}
            maxTagCount={maxTagCount as any}
            open={open}
            onDropdownVisibleChange={onDropdownVisibleChange}
            dropdownRender={dropdownRender as any}
        />
    ),

    Checkbox: Object.assign(
        ({ checked, defaultChecked, onChange, disabled, children, className, style, indeterminate }: CheckboxProps) => (
            <AntCheckbox
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
                className={className}
                style={style}
                indeterminate={indeterminate}
            >
                {children}
            </AntCheckbox>
        ),
        { Group: AntCheckbox.Group }
    ),

    Radio: Object.assign(
        ({ value, checked, onChange, disabled, children, className, style }: RadioProps) => (
            <AntRadio
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={className}
                style={style}
            >
                {children}
            </AntRadio>
        ),
        {
            Group: ({ value, defaultValue, onChange, options, optionType, buttonStyle,
                children, disabled, className, style, size }: RadioGroupProps) => (
                <AntRadio.Group
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    options={options as any}
                    optionType={optionType}
                    buttonStyle={buttonStyle}
                    disabled={disabled}
                    className={className}
                    style={style}
                    size={size}
                >
                    {children}
                </AntRadio.Group>
            ),
            Button: AntRadio.Button,
        }
    ),

    Switch: ({ checked, defaultChecked, onChange, disabled, loading, size,
        checkedChildren, unCheckedChildren, className, style }: SwitchProps) => (
        <AntSwitch
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            loading={loading}
            size={size}
            checkedChildren={checkedChildren}
            unCheckedChildren={unCheckedChildren}
            className={className}
            style={style}
        />
    ),

    Slider: ({ value, defaultValue, onChange, min, max, step, disabled, range, marks, tooltip, className, style }: SliderProps) => (
        <AntSlider
            value={value as any}
            defaultValue={defaultValue as any}
            onChange={onChange as any}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            range={range}
            marks={marks as any}
            tooltip={tooltip as any}
            className={className}
            style={style}
        />
    ),

    DatePicker: Object.assign(
        ({ value, defaultValue, onChange, placeholder, disabled, format, showTime,
            picker, allowClear, size, className, style, disabledDate, ranges }: DatePickerProps) => (
            <AntDatePicker
                value={value}
                defaultValue={defaultValue}
                onChange={onChange as any}
                placeholder={placeholder}
                disabled={disabled}
                format={format}
                showTime={showTime as any}
                picker={picker}
                allowClear={allowClear}
                size={size}
                className={className}
                style={{ width: "100%", ...style }}
                disabledDate={disabledDate}
            />
        ),
        { RangePicker: AntDatePicker.RangePicker }
    ),

    Upload: ({ children, action, accept, multiple, maxCount, fileList, onChange, onRemove,
        beforeUpload, customRequest, listType, showUploadList, disabled, className, style, drag }: UploadProps) => {
        const commonProps = {
            action, accept, multiple, maxCount, fileList, onChange, onRemove,
            beforeUpload, customRequest, listType, showUploadList, disabled, className, style,
        };
        if (drag) {
            return <AntUpload.Dragger {...commonProps}>{children}</AntUpload.Dragger>;
        }
        return <AntUpload {...commonProps}>{children}</AntUpload>;
    },

    Form: Object.assign(
        ({ children, onFinish, onFinishFailed, onValuesChange, layout, initialValues, size,
            className, style, labelCol, wrapperCol, preserve, scrollToFirstError,
            validateTrigger, form, name, colon, requiredMark, disabled }: FormProps) => (
            <AntForm
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onValuesChange}
                layout={layout}
                initialValues={initialValues}
                size={size}
                className={className}
                style={style}
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                preserve={preserve}
                scrollToFirstError={scrollToFirstError}
                validateTrigger={validateTrigger}
                form={form}
                name={name}
                colon={colon}
                requiredMark={requiredMark}
                disabled={disabled}
            >
                {children}
            </AntForm>
        ),
        { useForm: AntForm.useForm }
    ),

    FormItem: ({ name, label, rules, children, valuePropName, className, style, noStyle,
        dependencies, extra, help, tooltip, required, hasFeedback, validateStatus }: FormItemProps) => (
        <AntForm.Item
            name={name}
            label={label}
            rules={rules}
            valuePropName={valuePropName}
            className={className}
            style={style}
            noStyle={noStyle}
            dependencies={dependencies}
            extra={extra}
            help={help}
            tooltip={tooltip as any}
            required={required}
            hasFeedback={hasFeedback}
            validateStatus={validateStatus}
        >
            {children}
        </AntForm.Item>
    ),

    /* ── Data display ─────────────────────────────────────────────────────── */

    Table: ({ columns, dataSource, loading, pagination, rowKey, className, style, scroll,
        rowSelection, expandable, summary, onRow, size, bordered, sticky, showHeader,
        title, footer, locale, onChange }: TableProps) => (
        <AntTable
            columns={columns as any}
            dataSource={dataSource}
            loading={loading}
            pagination={pagination as any}
            rowKey={rowKey as any}
            className={className}
            style={style}
            scroll={scroll}
            rowSelection={rowSelection as any}
            expandable={expandable as any}
            summary={summary as any}
            onRow={onRow as any}
            size={size}
            bordered={bordered}
            sticky={sticky}
            showHeader={showHeader}
            title={title}
            footer={footer}
            locale={locale as any}
            onChange={onChange as any}
        />
    ),

    Card: ({ children, title, extra, className, style, bordered = true, loading = false,
        hoverable, cover, actions, bodyStyle, headStyle, size }: CardProps) => (
        <AntCard
            title={title}
            extra={extra}
            className={className}
            style={style}
            bordered={bordered}
            loading={loading}
            hoverable={hoverable}
            cover={cover}
            actions={actions as any}
            bodyStyle={bodyStyle}
            headStyle={headStyle}
            size={size}
        >
            {children}
        </AntCard>
    ),

    Tag: ({ children, color, closable, onClose, icon, className, style, bordered }: TagProps) => (
        <AntTag
            color={color}
            closable={closable}
            onClose={onClose}
            icon={icon}
            className={className}
            style={style}
            bordered={bordered}
        >
            {children}
        </AntTag>
    ),

    Badge: ({ count, dot, overflowCount, showZero, status, color, text, size,
        offset, children, className, style }: BadgeProps) => (
        <AntBadge
            count={count}
            dot={dot}
            overflowCount={overflowCount}
            showZero={showZero}
            status={status}
            color={color}
            text={text}
            size={size}
            offset={offset as any}
            className={className}
            style={style}
        >
            {children}
        </AntBadge>
    ),

    Avatar: Object.assign(
        ({ src, alt, size, shape, icon, children, className, style, onError, draggable }: AvatarProps) => (
            <AntAvatar
                src={src}
                alt={alt}
                size={size as any}
                shape={shape}
                icon={icon}
                className={className}
                style={style}
                onError={onError}
                draggable={draggable}
            >
                {children}
            </AntAvatar>
        ),
        { Group: AntAvatar.Group }
    ),

    Progress: ({ percent, type, status, strokeColor, trailColor, strokeWidth, showInfo,
        format, size, success, className, style, steps, gapDegree, gapPosition }: ProgressProps) => (
        <AntProgress
            percent={percent}
            type={type}
            status={status}
            strokeColor={strokeColor as any}
            trailColor={trailColor}
            strokeWidth={strokeWidth}
            showInfo={showInfo}
            format={format}
            size={size as any}
            success={success}
            className={className}
            style={style}
            steps={steps}
            gapDegree={gapDegree}
            gapPosition={gapPosition}
        />
    ),

    Skeleton: ({ active, avatar, loading, paragraph, title, round, className, style, children }: SkeletonProps) => (
        <AntSkeleton
            active={active}
            avatar={avatar as any}
            loading={loading}
            paragraph={paragraph as any}
            title={title as any}
            round={round}
            className={className}
            style={style}
        >
            {children}
        </AntSkeleton>
    ),

    Timeline: ({ items, mode, pending, pendingDot, reverse, className, style }: TimelineProps) => (
        <AntTimeline
            items={items as any}
            mode={mode}
            pending={pending}
            pendingDot={pendingDot}
            reverse={reverse}
            className={className}
            style={style}
        />
    ),

    Steps: ({ current, items, direction, labelPlacement, progressDot, size, status, type,
        onChange, className, style }: StepsProps) => (
        <AntSteps
            current={current}
            items={items as any}
            direction={direction}
            labelPlacement={labelPlacement}
            progressDot={progressDot as any}
            size={size}
            status={status}
            type={type as any}
            onChange={onChange}
            className={className}
            style={style}
        />
    ),

    Empty: ({ description, image, imageStyle, children, className, style }: EmptyProps) => (
        <AntEmpty
            description={description}
            image={image as any}
            imageStyle={imageStyle}
            className={className}
            style={style}
        >
            {children}
        </AntEmpty>
    ),

    Result: ({ status, title, subTitle, extra, icon, className, style, children }: ResultProps) => (
        <AntResult
            status={status}
            title={title}
            subTitle={subTitle}
            extra={extra}
            icon={icon}
            className={className}
            style={style}
        >
            {children}
        </AntResult>
    ),

    /* ── Navigation ─────────────────────────────────────────────────────── */

    Tabs: ({ activeKey, defaultActiveKey, onChange, items, type, tabPosition, size,
        tabBarExtraContent, animated, destroyInactiveTabPane, centered, className, style,
        onEdit, onTabClick, hideAdd, tabBarGutter, tabBarStyle }: TabsProps) => (
        <AntTabs
            activeKey={activeKey}
            defaultActiveKey={defaultActiveKey}
            onChange={onChange}
            items={items as any}
            type={type}
            tabPosition={tabPosition}
            size={size}
            tabBarExtraContent={tabBarExtraContent as any}
            animated={animated as any}
            destroyInactiveTabPane={destroyInactiveTabPane}
            centered={centered}
            className={className}
            style={style}
            onEdit={onEdit as any}
            onTabClick={onTabClick}
            hideAdd={hideAdd}
            tabBarGutter={tabBarGutter}
            tabBarStyle={tabBarStyle}
        />
    ),

    Breadcrumb: ({ items, separator, className, style, itemRender }: BreadcrumbProps) => (
        <AntBreadcrumb
            items={items as any}
            separator={separator}
            className={className}
            style={style}
            itemRender={itemRender as any}
        />
    ),

    Dropdown: ({ menu, trigger, placement, open, onOpenChange, disabled, children,
        dropdownRender, overlayClassName, overlayStyle, destroyPopupOnHide, arrow, className }: DropdownProps) => (
        <AntDropdown
            menu={menu as any}
            trigger={trigger as any}
            placement={placement}
            open={open}
            onOpenChange={onOpenChange}
            disabled={disabled}
            dropdownRender={dropdownRender as any}
            overlayClassName={overlayClassName}
            overlayStyle={overlayStyle}
            destroyPopupOnHide={destroyPopupOnHide}
            arrow={arrow}
            className={className}
        >
            {/* AntD Dropdown requires a single child element, not a fragment */}
            <span style={{ display: "inline-flex" }}>{children}</span>
        </AntDropdown>
    ),

    Pagination: ({ current, defaultCurrent, total, pageSize, defaultPageSize, onChange,
        onShowSizeChange, showSizeChanger, showQuickJumper, showTotal, pageSizeOptions,
        simple, disabled, hideOnSinglePage, className, style, showLessItems,
        responsive, itemRender }: PaginationProps) => (
        <AntPagination
            current={current}
            defaultCurrent={defaultCurrent}
            total={total}
            pageSize={pageSize}
            defaultPageSize={defaultPageSize}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showSizeChanger={showSizeChanger}
            showQuickJumper={showQuickJumper}
            showTotal={showTotal}
            pageSizeOptions={pageSizeOptions}
            simple={simple}
            disabled={disabled}
            hideOnSinglePage={hideOnSinglePage}
            className={className}
            style={style}
            showLessItems={showLessItems}
            responsive={responsive}
            itemRender={itemRender as any}
        />
    ),

    Menu: ({ items, mode, theme, selectedKeys, defaultSelectedKeys, openKeys, defaultOpenKeys,
        onClick, onOpenChange, inlineCollapsed, inlineIndent, className, style, selectable,
        multiple, expandIcon, triggerSubMenuAction, subMenuCloseDelay, subMenuOpenDelay,
        forceSubMenuRender, overflowedIndicator }: MenuProps) => (
        <AntMenu
            items={items as any}
            mode={mode}
            theme={theme}
            selectedKeys={selectedKeys}
            defaultSelectedKeys={defaultSelectedKeys}
            openKeys={openKeys}
            defaultOpenKeys={defaultOpenKeys}
            onClick={onClick as any}
            onOpenChange={onOpenChange}
            inlineCollapsed={inlineCollapsed}
            inlineIndent={inlineIndent}
            className={className}
            style={style}
            selectable={selectable}
            multiple={multiple}
            expandIcon={expandIcon as any}
            triggerSubMenuAction={triggerSubMenuAction}
            subMenuCloseDelay={subMenuCloseDelay}
            subMenuOpenDelay={subMenuOpenDelay}
            forceSubMenuRender={forceSubMenuRender}
            overflowedIndicator={overflowedIndicator}
        />
    ),

    /* ── Feedback ────────────────────────────────────────────────────────── */

    Modal: ({ open, onClose, onOk, title, children, footer, width, centered, closable,
        maskClosable, confirmLoading, okText, cancelText, destroyOnClose,
        className, style, zIndex }: ModalProps) => (
        <AntModal
            open={open}
            onCancel={onClose}
            onOk={onOk}
            title={title}
            footer={footer}
            width={width}
            centered={centered}
            closable={closable}
            maskClosable={maskClosable}
            confirmLoading={confirmLoading}
            okText={okText}
            cancelText={cancelText}
            destroyOnClose={destroyOnClose}
            className={className}
            style={style}
            zIndex={zIndex}
        >
            {children}
        </AntModal>
    ),

    Drawer: ({ open, onClose, title, children, width, height, placement, closable,
        maskClosable, footer, extra, className, style, zIndex, destroyOnClose }: DrawerProps) => (
        <AntDrawer
            open={open}
            onClose={onClose}
            title={title}
            width={width}
            height={height}
            placement={placement}
            closable={closable}
            maskClosable={maskClosable}
            footer={footer}
            extra={extra}
            className={className}
            style={style}
            zIndex={zIndex}
            destroyOnClose={destroyOnClose}
        >
            {children}
        </AntDrawer>
    ),

    Tooltip: ({ title, placement = "top", children, open, defaultOpen, onOpenChange,
        trigger, color, overlayClassName, overlayStyle, mouseEnterDelay, mouseLeaveDelay,
        destroyTooltipOnHide, arrow, className, style, zIndex }: TooltipProps) => (
        <AntTooltip
            title={title}
            placement={placement}
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            trigger={trigger as any}
            color={color}
            overlayClassName={overlayClassName}
            overlayStyle={overlayStyle}
            mouseEnterDelay={mouseEnterDelay}
            mouseLeaveDelay={mouseLeaveDelay}
            destroyTooltipOnHide={destroyTooltipOnHide}
            arrow={arrow as any}
            className={className}
            style={style}
            zIndex={zIndex}
        >
            {/* AntD Tooltip requires a single DOM element child */}
            <span style={{ display: "inline-flex" }}>{children}</span>
        </AntTooltip>
    ),

    Popconfirm: ({ title, description, onConfirm, onCancel, okText, cancelText, children,
        placement, open, onOpenChange, icon, disabled, showCancel, overlayClassName,
        overlayStyle, zIndex }: PopconfirmProps) => (
        <AntPopconfirm
            title={title}
            description={description}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            placement={placement}
            open={open}
            onOpenChange={onOpenChange as any}
            icon={icon}
            disabled={disabled}
            showCancel={showCancel}
            overlayClassName={overlayClassName}
            overlayStyle={overlayStyle}
            zIndex={zIndex}
        >
            <span style={{ display: "inline-flex" }}>{children}</span>
        </AntPopconfirm>
    ),

    Popover: ({ title, content, placement, trigger, open, onOpenChange, children,
        overlayClassName, overlayStyle, className, style, arrow, destroyTooltipOnHide,
        zIndex, color, mouseEnterDelay, mouseLeaveDelay }: PopoverProps) => (
        <AntPopover
            title={title}
            content={content}
            placement={placement}
            trigger={trigger as any}
            open={open}
            onOpenChange={onOpenChange}
            overlayClassName={overlayClassName}
            overlayStyle={overlayStyle}
            className={className}
            style={style}
            arrow={arrow}
            destroyTooltipOnHide={destroyTooltipOnHide}
            zIndex={zIndex}
            color={color}
            mouseEnterDelay={mouseEnterDelay}
            mouseLeaveDelay={mouseLeaveDelay}
        >
            <span style={{ display: "inline-flex" }}>{children}</span>
        </AntPopover>
    ),

    Alert: ({ type, message, description, closable, onClose, showIcon, icon, banner,
        action, afterClose, className, style }: AlertProps) => (
        <AntAlert
            type={type}
            message={message}
            description={description}
            closable={closable}
            onClose={onClose}
            showIcon={showIcon}
            icon={icon}
            banner={banner}
            action={action}
            afterClose={afterClose}
            className={className}
            style={style}
        />
    ),

    Spin: ({ spinning = true, tip, delay, className, style, children, fullscreen }: SpinProps) => (
        <AntSpin
            spinning={spinning}
            tip={tip as any}
            delay={delay}
            className={className}
            style={style}
            fullscreen={fullscreen}

        >
            {children}
        </AntSpin>
    ),

    // Imperative APIs — pass through directly
    notification: antNotification,
    message: antMessage,

    /* ── Layout ──────────────────────────────────────────────────────────── */

    Layout: ({ children, style, className, hasSider }: LayoutProps) => (
        <Layout style={style} className={className} hasSider={hasSider}>{children}</Layout>
    ),
    Header: ({ children, style, className }: HeaderProps) => (
        <AntHeader style={style} className={className}>{children}</AntHeader>
    ),
    Footer: ({ children, style, className }: FooterProps) => (
        <AntFooter style={style} className={className}>{children}</AntFooter>
    ),
    Sider: ({ children, width, collapsedWidth, style, className, collapsible, collapsed,
        defaultCollapsed, onCollapse, onBreakpoint, theme, breakpoint, trigger,
        reverseArrow, zeroWidthTriggerStyle }: SiderProps) => (
        <AntSider
            width={width}
            collapsedWidth={collapsedWidth}
            style={style}
            className={className}
            collapsible={collapsible}
            collapsed={collapsed}
            defaultCollapsed={defaultCollapsed}
            onCollapse={onCollapse as any}
            onBreakpoint={onBreakpoint}
            theme={theme}
            breakpoint={breakpoint}
            trigger={trigger}
            reverseArrow={reverseArrow}
            zeroWidthTriggerStyle={zeroWidthTriggerStyle}
        >
            {children}
        </AntSider>
    ),
    Content: ({ children, style, className }: ContentProps) => (
        <AntContent style={style} className={className}>{children}</AntContent>
    ),
    Flex: ({ children, gap, wrap, style, className, justify, align, direction, flex }: FlexProps) => (
        <Flex
            gap={gap}
            wrap={wrap as any}
            style={style}
            className={className}
            justify={justify}
            align={align}
            vertical={direction === "column" || direction === "column-reverse"}
            flex={flex as any}
        >
            {children}
        </Flex>
    ),
    Space: ({ children, size, direction, align, wrap, split, className, style }: SpaceProps) => (
        <AntSpace
            size={size as any}
            direction={direction}
            align={align}
            wrap={wrap}
            split={split}
            className={className}
            style={style}
        >
            {children}
        </AntSpace>
    ),
    Divider: ({ type, plain, dashed, children, className, style }: DividerProps) => (
        <AntDivider
            type={type}
            plain={plain}
            dashed={dashed}
            className={className}
            style={style}
        >
            {children}
        </AntDivider>
    ),

    /* ── Typography ─────────────────────────────────────────────────────── */
    Typography: {
        Text: (props: TypographyTextProps) => <Text {...props as any} />,
        Title: ({ level = 1, ...props }: TypographyTitleProps) => <Title level={level} {...props as any} />,
        Paragraph: (props: TypographyParagraphProps) => <Paragraph {...props as any} />,
        Link: ({ href, target, ...props }: TypographyTextProps & { href?: string; target?: string }) => (
            <Link href={href} target={target} {...props as any} />
        ),
    },

    /* ── Icon ────────────────────────────────────────────────────────────── */
    Icon: ({ name, size = 16, className, style, onClick, spin, rotate, twoToneColor }: IconProps) => {
        const pascal = name
            .split("-")
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join("");

        const IconComponent: React.ComponentType<any> =
            (Icons as any)[pascal + "Outlined"] ??
            (Icons as any)[pascal + "Filled"] ??
            (Icons as any)[pascal + "TwoTone"] ??
            (Icons as any)[pascal];

        if (!IconComponent) return null;

        return (
            <IconComponent
                style={{ fontSize: size, ...style }}
                className={className}
                onClick={onClick as any}
                spin={spin}
                rotate={rotate}
                twoToneColor={twoToneColor}
            />
        );
    },
};

/* ══════════════════════════════════════════════════════════════════════════
   CONFIG PROVIDER  —  COMMUTR green theme
══════════════════════════════════════════════════════════════════════════ */
export const AntDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#00A86B",
                colorPrimaryHover: "#009260",
                colorPrimaryActive: "#007A50",
                colorLink: "#00A86B",
                colorLinkHover: "#009260",
                borderRadius: 8,
                borderRadiusLG: 12,
                borderRadiusSM: 6,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 14,
                colorBgContainer: "#ffffff",
                colorBorder: "#E5E7EB",
                colorBorderSecondary: "#F0F0F0",
                colorText: "#111827",
                colorTextSecondary: "#6B7280",
                colorTextTertiary: "#9CA3AF",
                colorBgLayout: "#F7F8FA",
                controlHeight: 36,
                controlHeightSM: 28,
                controlHeightLG: 44,
            },
            components: {
                Button: {
                    colorPrimary: "#00A86B",
                    colorPrimaryHover: "#009260",
                    colorPrimaryActive: "#007A50",
                    primaryShadow: "0 2px 8px rgba(0,168,107,0.25)",
                    controlHeight: 36,
                },
                Menu: {
                    itemBg: "transparent",
                    itemHoverBg: "#EDF7F2",
                    itemSelectedBg: "#00875A",
                    itemSelectedColor: "#ffffff",
                    itemColor: "#374151",
                    itemHoverColor: "#00875A",
                    subMenuItemBg: "transparent",
                    collapsedIconSize: 18,
                    iconSize: 18,
                },
                Layout: {
                    siderBg: "#ffffff",
                    headerBg: "#ffffff",
                    bodyBg: "#F7F8FA",
                    footerBg: "#F7F8FA",
                },
                Table: {
                    headerBg: "#F9FAFB",
                    headerColor: "#6B7280",
                    rowHoverBg: "#F9FAFB",
                    borderColor: "#F0F0F0",
                },
                Input: {
                    activeBorderColor: "#00A86B",
                    hoverBorderColor: "#00A86B",
                    activeShadow: "0 0 0 3px rgba(0,168,107,0.12)",
                },
                Select: {
                    optionSelectedBg: "#EDF7F2",
                    optionSelectedColor: "#00A86B",
                },
                Switch: {
                    colorPrimary: "#00A86B",
                    colorPrimaryHover: "#009260",
                },
                Tabs: {
                    inkBarColor: "#00A86B",
                    itemSelectedColor: "#00A86B",
                    itemHoverColor: "#00A86B",
                },
            },
        }}
    >
        {children}
    </ConfigProvider>
);