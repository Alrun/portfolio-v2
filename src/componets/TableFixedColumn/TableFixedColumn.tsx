import React from 'react';

import classes from './TableFixedColumn.module.scss';
import { TableFixedColumnProps } from './TableFixedColumn.d';

import TableRow, { tableCells, tableCellsGroup } from '../TableRow/TableRow';
import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';
import Collapse from '../../ui/Collapse/Collapse';

export default function TableFixedColumn({
    columns,
    items,
    groupOpen = [],
    checkedItems = {},
    handleGroupOpen,
    handleCheckboxChange
}: TableFixedColumnProps) {
    // const defineFixedColumns = columns.filter((col: any) => col.fixed && !col.hidden);
    const defineCell = (cols: TableColumnInterface[], item: TableItemInterface, group?: boolean) =>
        group
            ? tableCellsGroup(cols, item).filter((col) => col.props.col.fixed && !col.props.col.hidden)
            : tableCells(cols, item, handleGroupOpen).filter((col) => col.props.col.fixed && !col.props.col.hidden);

    const handleGroupCheckboxChange = (tt: any, tt2: any) => {
        console.log(tt, tt2);
    }

    return (
        <div className={classes.root}>
            {!!items.length &&
                items.map((item) =>
                    item.group?.length ? (
                        <div className={classes.collapse} key={item.id}>
                            <TableRow
                                item={item}
                                columns={columns}
                                handleCheckboxChange={handleGroupCheckboxChange}
                                isCheckboxChecked={checkedItems[item.id]}
                            >
                                {defineCell(columns, item)}
                            </TableRow>

                            <Collapse show={groupOpen.includes(item.id)} id={item.id}>
                                <div className={classes.group}>
                                    {item.group.map((groupItem) => (
                                        <TableRow
                                            key={groupItem.id}
                                            item={groupItem}
                                            columns={columns}
                                            isGroup
                                            isCheckboxChecked={checkedItems[item.id]}
                                            handleCheckboxChange={handleGroupCheckboxChange}
                                        >
                                            {defineCell(columns, groupItem, true)}
                                        </TableRow>
                                    ))}
                                </div>
                            </Collapse>
                        </div>
                    ) : (
                        <TableRow
                            key={item.id}
                            item={item}
                            columns={columns}
                            isCheckboxChecked={checkedItems[item.id]}
                            handleCheckboxChange={handleCheckboxChange}
                        >
                            {defineCell(columns, item)}
                        </TableRow>
                    )
                )}
        </div>
    );
}
