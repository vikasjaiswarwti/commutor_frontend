import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header'
import { useNavigation } from '../../hooks/useNavigation';

export const MainLayout: React.FC = () => {
    const { collapsed } = useNavigation();

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className={`
        flex-1 flex flex-col transition-all duration-300
        ${collapsed ? 'ml-20' : 'ml-64'}
      `}>
                <Header />

                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};