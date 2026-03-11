import React from 'react';
import { useUILibrary } from '../../lib/ui-lib/ui-library-context';

export const Form: React.FC<any> & { Item: React.FC<any> } = ({ children, props }) => {
    const { Form: FormComponent } = useUILibrary();
    return <FormComponent {...props}>{children}</FormComponent>;
}

// Map the sub-component Item
Form.Item = ({ children, props }) => {
    const { FormItem } = useUILibrary();
    return <FormItem {...props}>{children}</FormItem>;
};