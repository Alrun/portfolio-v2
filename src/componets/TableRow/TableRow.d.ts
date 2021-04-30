import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';
import { CheckboxChange } from '../Table/Table.d';

export interface TableRowProps {
    item: TableItemInterface;
    columns: TableColumnInterface[];
    children?: JSX.Element[];
    isGroup?: boolean;
    isCheckboxChecked?: boolean;
    handleGroupOpen?: (id: string) => void;
    handleCheckboxChange?: CheckboxChange;
}
