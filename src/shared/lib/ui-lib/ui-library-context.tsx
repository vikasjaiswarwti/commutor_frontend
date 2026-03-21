// import React, { createContext, useContext } from 'react';

// import type { UILibrary } from './types';
// import { AntDUILibrary, AntDProvider } from './antd-adapter';

// // We can easily switch to MUI by importing a different adapter
// // import { MuiUILibrary, MuiProvider } from './mui-adapter';

// interface UILibraryContextType {
//     library: UILibrary;
// }

// const UILibraryContext = createContext<UILibraryContextType | undefined>(undefined);

// // Choose which UI library to use
// const ACTIVE_LIBRARY = 'antd'; // Change to 'mui' to switch

// export const UILibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     // Select the appropriate library and provider
//     let library: UILibrary;
//     let ProviderComponent: React.FC<{ children: React.ReactNode }>;

//     switch (ACTIVE_LIBRARY) {
//         case 'antd':
//             library = AntDUILibrary;
//             ProviderComponent = AntDProvider;
//             break;
//         // case 'mui':
//         //   library = MuiUILibrary;
//         //   ProviderComponent = MuiProvider;
//         //   break;
//         default:
//             library = AntDUILibrary;
//             ProviderComponent = AntDProvider;
//     }

//     return (
//         <UILibraryContext.Provider value={{ library }}>
//             <ProviderComponent>
//                 {children}
//             </ProviderComponent>
//         </UILibraryContext.Provider>
//     );
// };

// export const useUILibrary = (): UILibrary => {
//     const context = useContext(UILibraryContext);
//     if (!context) {
//         throw new Error('useUILibrary must be used within UILibraryProvider');
//     }
//     return context.library;
// };


// src/shared/lib/ui-lib/ui-library-context.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Swappable UI library context.
// To switch from AntD to MUI:
//   1. Implement MuiUILibrary + MuiProvider in mui-adapter.tsx
//   2. Change ACTIVE_LIBRARY to 'mui' below — zero other changes needed
//
// Consuming code never imports from 'antd' directly — always via useUILibrary():
//   const { Button, Tooltip, Table, notification } = useUILibrary();
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext } from "react";
import type { UILibrary } from "./types";
import { AntDUILibrary, AntDProvider } from "./antd-adapter";

// ── Active library switch ─────────────────────────────────────────────────────
// "antd" | "mui" — only this line changes when swapping libraries
const ACTIVE_LIBRARY = "antd" as const;

type SupportedLibrary = "antd"; // | "mui" when MUI adapter is ready

// ── Context ───────────────────────────────────────────────────────────────────
interface UILibraryContextType {
    library: UILibrary;
}

const UILibraryContext = createContext<UILibraryContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────
export const UILibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let library: UILibrary;
    let ProviderComponent: React.FC<{ children: React.ReactNode }>;

    switch (ACTIVE_LIBRARY as SupportedLibrary) {
        case "antd":
            library = AntDUILibrary;
            ProviderComponent = AntDProvider;
            break;

        // Uncomment when MUI adapter is ready:
        // case "mui":
        //     library          = MuiUILibrary;
        //     ProviderComponent = MuiProvider;
        //     break;

        default:
            library = AntDUILibrary;
            ProviderComponent = AntDProvider;
    }

    return (
        <UILibraryContext.Provider value={{ library }}>
            <ProviderComponent>
                {children}
            </ProviderComponent>
        </UILibraryContext.Provider>
    );
};

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useUILibrary = (): UILibrary => {
    const context = useContext(UILibraryContext);
    if (!context) {
        throw new Error(
            "useUILibrary must be used within <UILibraryProvider>.\n" +
            "Make sure AppProviders wraps your component tree."
        );
    }
    return context.library;
};

// ── Type re-exports ───────────────────────────────────────────────────────────
// Import everything UI-related from this single file — no need to touch types.ts
// directly in feature code.
export type { UILibrary } from "./types";

export type {
    // Form
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
    // Data display
    TableProps,
    TableColumn,
    TagProps,
    BadgeProps,
    AvatarProps,
    ProgressProps,
    SkeletonProps,
    TimelineProps,
    TimelineItem,
    StepsProps,
    StepItem,
    EmptyProps,
    ResultProps,
    // Navigation
    TabsProps,
    TabItem,
    BreadcrumbProps,
    BreadcrumbItem,
    DropdownProps,
    MenuProps,
    MenuItemType,
    PaginationProps,
    // Feedback
    TooltipProps,
    PopconfirmProps,
    PopoverProps,
    AlertProps,
    SpinProps,
    NotificationConfig,
    MessageConfig,
    // Layout
    LayoutProps,
    HeaderProps,
    FooterProps,
    SiderProps,
    ContentProps,
    FlexProps,
    SpaceProps,
    DividerProps,
    // Typography
    TypographyTextProps,
    TypographyTitleProps,
    TypographyParagraphProps,
    // Icon
    IconProps,
    // Primitives
    Size,
    Status,
    Placement,
} from "./types";