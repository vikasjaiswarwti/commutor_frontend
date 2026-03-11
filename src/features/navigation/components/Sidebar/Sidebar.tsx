
import React from 'react';
import { SidebarMenu } from './SidebarMenu';
import { useNavigation } from '../../hooks/useNavigation';
import { useUILibrary } from '../../../../shared/lib/ui-lib/ui-library-context';


export const Sidebar: React.FC = () => {
    const { menuItems, collapsed, toggleSidebar } = useNavigation();

    const { Sider } = useUILibrary(); // Get Sider from UI library

    return (
        <Sider
            width={256}
            collapsed={collapsed}
            onCollapse={toggleSidebar}
            collapsible
            breakpoint="lg"
            theme="light"
            className="h-screen fixed left-0 top-0 bottom-0 overflow-auto"
            style={{
                boxShadow: '2px 0 8px 0 rgba(0,0,0,0.05)',
                zIndex: 100,
                backgroundColor:'blue'
            }}
        >
            <div className="flex flex-col h-full">
                {/* Logo area */}
                {/* <div className="h-16 flex items-center px-4 border-b">
                    {!collapsed ? (
                        <span className="text-xl font-bold text-blue-600">Admin</span>
                    ) : (
                        <span className="text-xl font-bold text-blue-600 mx-auto">A</span>
                    )}
                </div> */}

                {/* Menu area */}
                {/* <nav className="flex-1 overflow-y-auto py-4">
                    <SidebarMenu items={menuItems} depth={0} collapsed={collapsed} />
                </nav> */}

                {/* Footer area */}
                {/* {!collapsed && (
                    <div className="p-4 border-t text-center">
                        <div className="text-xs text-gray-500">v1.0.0</div>
                    </div>
                )} */}
            </div>
        </Sider>
    );
};