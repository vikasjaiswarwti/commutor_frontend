import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';

import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { Toaster } from '@/shared/components/ui/Toaster';
import { UILibraryProvider } from '@/shared/lib/ui-lib/ui-library-context';

interface Props {
    children: React.ReactNode;
}

export const AppProviders = ({ children }: Props) => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <UILibraryProvider>
                    <BrowserRouter>
                        {children}
                        <Toaster position="top-right" />
                    </BrowserRouter>
                </UILibraryProvider>
            </Provider>
        </ErrorBoundary>
    );
};