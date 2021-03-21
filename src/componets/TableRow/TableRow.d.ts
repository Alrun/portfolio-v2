import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';

export interface TableRowProps {
    item: TableItemInterface;
    columns: TableColumnInterface[];
    children?: JSX.Element[];
    isGroup?: boolean;
}
