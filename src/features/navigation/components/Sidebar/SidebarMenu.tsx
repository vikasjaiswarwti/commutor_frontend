// src/features/navigation/components/Sidebar/SidebarMenu.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MenuItem } from '@/shared/types/menu.types';
import { Button } from '@/shared/components/ui/Button';
import { Icon } from '@/shared/components/ui/Icon';

interface SidebarMenuProps {
    items: MenuItem[];
    depth: number;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, depth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const collapsed = useSelector((state: any) => state.navigation.collapsed);
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const sortedItems = [...items].sort((a, b) => a.orderNo - b.orderNo);

    const toggleItem = (menuId: string) => {
        setOpenItems(prev => {
            const next = new Set(prev);
            if (next.has(menuId)) {
                next.delete(menuId);
            } else {
                next.add(menuId);
            }
            return next;
        });
    };

    const isActive = (routeUrl: string | null) => {
        if (!routeUrl) return false;
        return location.pathname === routeUrl;
    };

    if (!items.length) return null;

    return (
        <ul className={`space-y-1 ${depth > 0 ? 'ml-4' : ''}`}>
            {sortedItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openItems.has(item.menuId);
                const active = isActive(item.routeUrl);

                if (!item.isAssigned) return null;

                return (
                    <li key={item.menuId}>
                        <Button
                            variant={active ? 'primary' : 'ghost'}
                            size="sm"
                            className={`
                w-full justify-start px-4 py-2
                ${collapsed && !hasChildren ? 'justify-center' : ''}
              `}
                            onClick={() => {
                                if (hasChildren) {
                                    toggleItem(item.menuId);
                                } else if (item.routeUrl) {
                                    navigate(item.routeUrl);
                                }
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                {item.icon && <Icon name={item.icon} size={20} />}
                                {!collapsed && (
                                    <span className="flex-1 text-left">{item.menuName}</span>
                                )}
                                {hasChildren && !collapsed && (
                                    <Icon
                                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                                        size={16}
                                    />
                                )}
                            </div>
                        </Button>

                        {hasChildren && isOpen && (
                            <SidebarMenu items={item.children} depth={depth + 1} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};