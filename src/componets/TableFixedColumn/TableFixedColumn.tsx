import React from 'react';
import { useSpring, animated } from 'react-spring';

import classes from './TableFixedColumn.module.scss';
import { TableFixedColumnProps } from './TableFixedColumn.d';

import TableRow, { tableCells, tableCellsGroup } from '../TableRow/TableRow';
import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';

export default function TableFixedColumn({ columns, items, groupOpen = [], handleGroupOpen }: TableFixedColumnProps) {
    // const defineFixedColumns = columns.filter((col: any) => col.fixed && !col.hidden);
    const defineCell = (cols: TableColumnInterface[], item: TableItemInterface, group?: boolean) =>
        group
            ? tableCellsGroup(cols, item).filter((col) => col.props.col.fixed && !col.props.col.hidden)
            : tableCells(cols, item, handleGroupOpen).filter((col) => col.props.col.fixed && !col.props.col.hidden);

    return (
        <div className={classes.root}>
            {!!items.length &&
                items.map((item) =>
                    item.group?.length ? (
                        <div className={classes.collapse} key={item.id}>
                            <TableRow item={item} columns={columns}>
                                {defineCell(columns, item)}
                            </TableRow>

                            {groupOpen.includes(item.id) && (
                                <div className={classes.group}>
                                    {item.group.map((groupItem) => (
                                        <TableRow key={groupItem.id} item={groupItem} columns={columns} isGroup>
                                            {defineCell(columns, groupItem, true)}
                                        </TableRow>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <TableRow key={item.id} item={item} columns={columns}>
                            {defineCell(columns, item)}
                        </TableRow>
                    )
                )}
        </div>
    );
}
