import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';

export interface TableFixedColumnProps {
    columns: TableColumnInterface[];
    items: TableItemInterface[];
    groupOpen?: string[];
    handleGroupOpen?: (id: string) => void;
    // loading: boolean;
    // error: string;
}
