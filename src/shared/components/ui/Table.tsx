import { useUILibrary } from '../../lib/ui-lib/ui-library-context';
import type { TableProps } from '../../lib/ui-lib/types';

export const Table = <T extends object>(props: TableProps<T>) => {
    const library = useUILibrary();
    const TableComponent = library.Table;
    return <TableComponent {...(props as any)} />;
};