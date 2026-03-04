import React from 'react';

import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { IconProps } from '../../lib/ui-lib/types';

export const Icon: React.FC<IconProps> = (props) => {
  const library = useUILibrary();
  const IconComponent = library.Icon;
  return <IconComponent {...props} />;
};