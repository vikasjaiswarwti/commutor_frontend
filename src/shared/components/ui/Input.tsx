// import React from 'react';

// import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
// import type { InputProps } from '../../lib/ui-lib/types';

// export const Input: React.FC<InputProps> = (props) => {
//     const library = useUILibrary();
//     const InputComponent = library.Input;
//     return <InputComponent {...props} />;
// };

import React from 'react';
import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { InputProps } from '../../lib/ui-lib/types';

// Define the type for our wrapper
type InputComponent = React.FC<InputProps> & {
    Password: React.FC<InputProps>;
};

export const Input: InputComponent = (props) => {
    const library = useUILibrary();
    const InputComponent = library.Input;
    return <InputComponent {...props} />;
};

// Map the Password sub-component
Input.Password = (props) => {
    const library = useUILibrary();
    const PasswordComponent = library.Input.Password;
    return <PasswordComponent {...props} />;
};