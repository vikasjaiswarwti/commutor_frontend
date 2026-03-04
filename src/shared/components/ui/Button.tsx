import React from 'react';
import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { ButtonProps } from '../../lib/ui-lib/types';

export const Button: React.FC<ButtonProps> = (props) => {
    const library = useUILibrary();
    const ButtonComponent = library.Button;
    return <ButtonComponent {...props} />;
};