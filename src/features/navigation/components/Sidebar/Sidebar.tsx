// src/features/navigation/components/Sidebar/Sidebar.tsx
import React from 'react';
import { SidebarMenu } from './SidebarMenu';
import { useNavigation } from '../../hooks/useNavigation';
import { Button } from '@/shared/components/ui/Button';
import { Icon } from '@/shared/components/ui/Icon';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

export const Sidebar: React.FC = () => {
    const { menuItems, collapsed, toggleSidebar, closeMobileSidebar } = useNavigation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (isMobile && collapsed) {
        return null;
    }

    return (
        <aside
            className={`
        h-full bg-white border-r border-gray-200
        transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : ''}
      `}
        >
            <div className="flex flex-col h-full">
                {/* Logo area */}
                <div className="h-16 flex items-center justify-between px-4 border-b">
                    {!collapsed && <span className="text-xl font-bold">Admin</span>}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={isMobile ? closeMobileSidebar : toggleSidebar}
                    >
                        <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} />
                    </Button>
                </div>

                {/* Menu area */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <SidebarMenu items={menuItems} depth={0} />
                </nav>

                {/* Footer area */}
                {!collapsed && (
                    <div className="p-4 border-t">
                        <div className="text-xs text-gray-500">
                            Version 1.0.0
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};
