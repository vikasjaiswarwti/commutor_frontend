// src/shared/components/ui/Flex.tsx
import React from 'react';
import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { FlexProps } from '../../lib/ui-lib/types';

export const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
    const library = useUILibrary();
    const FlexComponent = library.Flex;
    return <FlexComponent {...props}>{children}</FlexComponent>;
};