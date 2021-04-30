import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';
import { CheckboxItems, CheckboxChange } from '../Table/Table.d';

export interface TableBodyProps {
    columns: TableColumnInterface[];
    items: TableItemInterface[];
    loading?: boolean;
    error?: string;
    groupOpen?: string[];
    handleGroupOpen?: (id: string) => void;
    checkedItems?: CheckboxItems;
    handleCheckboxChange?: CheckboxChange;
}
