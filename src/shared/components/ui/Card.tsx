import React from 'react';

import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { CardProps } from '../../lib/ui-lib/types';

export const Card: React.FC<CardProps> = (props) => {
    const library = useUILibrary();
    const CardComponent = library.Card;
    return <CardComponent {...props} />;
};