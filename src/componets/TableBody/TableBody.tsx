import React from 'react';

import TableRow, { tableCells, TableRowDataInterface } from '../TableRow/TableRow';

import classes from './TableBody.module.scss';
import TableCell from '../TableCell/TableCell';
import TableFixedColumn from '../TableFixedColumn/TableFixedColumn';

// export interface TableBodyData {
//     currency: string;
//     items: TableRowDataInterface[];
// }

export interface TableBodyProps {
    columns: any;
    items: TableRowDataInterface[];
    loading: boolean;
    error: string;
}

const TableBody = React.forwardRef<HTMLDivElement, TableBodyProps>(
    ({ columns, items, loading, error }: TableBodyProps, ref) => {
        const rendersCount = React.useRef<number>(0);

        const defineFixedColumns = columns.filter((col: any) => col.isFixed && !col.isHidden);

        const padding = defineFixedColumns.reduce((acc: any, cur: any) => {
            if (!cur.isHidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        return (
            <div ref={ref} className={classes.root} style={{ paddingLeft: `${padding}px` }}>
                <div className={classes.wrapper}>
                    {!!items.length && (
                        <>
                            {defineFixedColumns.length && <TableFixedColumn columns={columns} items={items} />}

                            {items.map((item: any) =>
                                item.group?.length ? (
                                    <>
                                        <TableRow key={item.id} item={item} columns={columns} />
                                        <div className={classes.group}>
                                            {item.group.map((groupItem: any) => (
                                                <TableRow
                                                    key={groupItem.id}
                                                    item={groupItem}
                                                    columns={columns}
                                                    isGroup
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <TableRow key={item.id} item={item} columns={columns} />
                                )
                            )}
                        </>
                    )}
                    {/* eslint-disable-next-line no-plusplus */}
                    <b>Table Body RENDER COUNT: {++rendersCount.current}</b>
                </div>
            </div>
        );
    }
);

export default TableBody;
