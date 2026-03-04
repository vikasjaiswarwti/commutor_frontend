import React from 'react';

import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { InputProps } from '../../lib/ui-lib/types';

export const Input: React.FC<InputProps> = (props) => {
    const library = useUILibrary();
    const InputComponent = library.Input;
    return <InputComponent {...props} />;
};