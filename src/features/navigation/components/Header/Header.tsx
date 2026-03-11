import React from 'react';
import { Button } from '../../../../shared/components/ui/Button';
import { Icon } from '../../../../shared/components/ui/Icon';

import { useNavigation } from '../../hooks/useNavigation';

import { useAuth } from '../../../auth/hooks/useAuth';

import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery';

export const Header: React.FC = () => {

    const { toggleSidebar } = useNavigation();

    const { user, logout } = useAuth();

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Left section */}
                    <div className="flex items-center gap-3">

                        {isMobile && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleSidebar}
                                icon={<Icon name="menu" />}
                            />
                        )}

                        {/* Page title - can be dynamic based on route */}
                        <h1 className="text-xl font-semibold text-gray-800">
                            Dashboard
                        </h1>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<Icon name="bell" />}
                            className="relative"
                        >
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Button>

                        {/* User menu */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500">{user?.role || 'Admin'}</p>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={logout}
                                icon={<Icon name="logout" />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};