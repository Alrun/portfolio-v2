import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';
import { CheckboxItems, CheckboxChange } from '../Table/Table.d';

export interface TableFixedColumnProps {
    columns: TableColumnInterface[];
    items: TableItemInterface[];
    groupOpen?: string[];
    handleGroupOpen?: (id: string) => void;
    checkedItems?: CheckboxItems;
    handleCheckboxChange?: CheckboxChange;
    // loading: boolean;
    // error: string;
}
