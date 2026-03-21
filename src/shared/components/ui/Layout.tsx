// src/shared/components/ui/Layout.tsx
import React from 'react';
import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { LayoutProps, HeaderProps, FooterProps, SiderProps, ContentProps } from '../../lib/ui-lib/types';

export const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
    const library = useUILibrary();
    const LayoutComponent = library.Layout;
    return <LayoutComponent {...props}>{children}</LayoutComponent>;
};

export const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
    const library = useUILibrary();
    const HeaderComponent = library.Header;
    return <HeaderComponent {...props}>{children}</HeaderComponent>;
};

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => {
    const library = useUILibrary();
    const FooterComponent = library.Footer;
    return <FooterComponent {...props}>{children}</FooterComponent>;
};

export const Sider: React.FC<SiderProps> = ({ children, ...props }) => {
    const library = useUILibrary();
    const SiderComponent = library.Sider;
    return <SiderComponent {...props}>{children}</SiderComponent>;
};

export const Content: React.FC<ContentProps> = ({ children, ...props }) => {
    const library = useUILibrary();
    const ContentComponent = library.Content;
    return <ContentComponent {...props}>{children}</ContentComponent>;
};