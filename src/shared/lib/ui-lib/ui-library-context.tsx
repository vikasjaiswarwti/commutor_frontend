import React, { createContext, useContext } from 'react';
import type { UILibrary } from './types';
import { AntDUILibrary, AntDProvider } from './antd-adapter';

// We can easily switch to MUI by importing a different adapter
// import { MuiUILibrary, MuiProvider } from './mui-adapter';

interface UILibraryContextType {
    library: UILibrary;
}

const UILibraryContext = createContext<UILibraryContextType | undefined>(undefined);

// Choose which UI library to use
const ACTIVE_LIBRARY = 'antd'; // Change to 'mui' to switch

export const UILibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Select the appropriate library and provider
    let library: UILibrary;
    let ProviderComponent: React.FC<{ children: React.ReactNode }>;

    switch (ACTIVE_LIBRARY) {
        case 'antd':
            library = AntDUILibrary;
            ProviderComponent = AntDProvider;
            break;
        // case 'mui':
        //   library = MuiUILibrary;
        //   ProviderComponent = MuiProvider;
        //   break;
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

export const useUILibrary = (): UILibrary => {
    const context = useContext(UILibraryContext);
    if (!context) {
        throw new Error('useUILibrary must be used within UILibraryProvider');
    }
    return context.library;
};