import React from 'react';

import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { SelectProps } from '../../lib/ui-lib/types';

export const Select: React.FC<SelectProps> = (props) => {
    const library = useUILibrary();
    const SelectComponent = library.Select;
    return <SelectComponent {...props} />;
};