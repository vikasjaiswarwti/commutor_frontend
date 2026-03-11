// src/shared/components/layouts/MainLayout/MainLayout.tsx
// Now correctly using the hook
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUILibrary } from '../../../lib/ui-lib/ui-library-context';
import { Sidebar } from '../../../../features/navigation/components/Sidebar/Sidebar';
import { Header } from '../../../../features/navigation/components/Header/Header';

export const MainLayout: React.FC = () => {
    const { Layout, Content } = useUILibrary(); // Now this works!

    const layoutStyle: React.CSSProperties = {
        minHeight: '100vh',
        width: '100%',
    };

    const headerStyle: React.CSSProperties = {
        padding: 0,
        background: '#fff',
        height: 'auto',
        lineHeight: 'normal',
        position: 'sticky',
        top: 0,
        zIndex: 99,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    };

    const contentStyle: React.CSSProperties = {
        padding: '24px',
        minHeight: 'calc(100vh - 64px)',
        background: '#f5f5f5',
    };

    return (
        <Layout style={layoutStyle} hasSider>
            <Sidebar />
            <Layout>
                <Header style={headerStyle} />
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};