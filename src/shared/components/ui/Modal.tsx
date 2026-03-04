import React from 'react';

import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { ModalProps } from '../../lib/ui-lib/types';

export const Modal: React.FC<ModalProps> = (props) => {
    const library = useUILibrary();
    const ModalComponent = library.Modal;
    return <ModalComponent {...props} />;
};