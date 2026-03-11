// src/features/navigation/components/Header/Header.tsx
// Refactor Header
import React from 'react';
import { Icon, Button } from '../../../../shared/components/ui';

import { useNavigation } from '../../hooks/useNavigation';

import { useAuth } from '../../../auth/hooks/useAuth';
import { useUILibrary } from '../../../../shared/lib/ui-lib/ui-library-context';

interface HeaderProps {
    style?: React.CSSProperties;
}

export const Header: React.FC<HeaderProps> = ({ style }) => {
    const { toggleSidebar, collapsed } = useNavigation();
    const { user, logout } = useAuth();

    const { Flex } = useUILibrary();

    return (
        <div style={style} className="bg-green-600 border-b border-gray-200 px-6 py-4">
            <Flex justify="space-between" align="center">
                <Flex gap="middle" align="center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        icon={<Icon name={collapsed ? 'menu-unfold' : 'menu-fold'} size={18} />}
                    />
                    <h1 className="text-xl font-semibold text-orange-800">Dashboard</h1>
                </Flex>

                <Flex gap="middle" align="center">
                    <Button variant="ghost" size="sm" icon={<Icon name="bell" size={18} />} />

                    <Flex gap="small" align="center">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-700">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={logout} icon={<Icon name="logout" size={18} />} />
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
};