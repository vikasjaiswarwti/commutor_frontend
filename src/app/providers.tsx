import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'

import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { Toaster } from '@/shared/components/ui/Toaster'

interface Props {
    children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter>
                    {children}
                    <Toaster position="top-right" />
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    )
}