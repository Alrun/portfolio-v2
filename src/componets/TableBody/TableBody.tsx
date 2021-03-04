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

export default function TableBody({ columns, items, fixedColumns, loading, error }: any) {
    const rendersCount = React.useRef<number>(0);

    return (
        <>
            {!!items.length && (
                <>
                     <TableFixedColumn columns={columns} items={items} fixedColumns={fixedColumns} />

                    {items.map((item: any) =>
                        item.group?.length ? (
                            <>
                                <TableRow key={item.id} item={item} columns={columns} />
                                <div className={classes.group}>
                                    {item.group.map((groupItem: any) => (
                                        <TableRow key={groupItem.id} item={groupItem} columns={columns} isGroup />
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
        </>
    );
}
