import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';

export interface TableBodyProps {
    columns: TableColumnInterface[];
    items: TableItemInterface[];
    loading?: boolean;
    error?: string;
    groupOpen?: string[];
    handleGroupOpen?: (id: string) => void;
}
