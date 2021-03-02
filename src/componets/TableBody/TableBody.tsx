import React from 'react';

import TableRow, { TableRowDataInterface } from '../TableRow/TableRow';

import classes from './TableBody.module.scss';
import useScroll from '../../hooks/useScroll';

export interface TableBodyData {
    currency: string;
    items: TableRowDataInterface[];
}

export interface TableBodyProps {
    data: TableBodyData;
    isLoading: boolean;
    columns: any;
    handleSetWidth: any;
}

export default function TableBody({ data: { currency, items }, isLoading, columns, handleSetWidth }: TableBodyProps) {
    const rootRef = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        handleSetWidth(rootRef.current?.scrollWidth);
    }, [handleSetWidth]);

    return (
        <div ref={rootRef} className={classes.table}>
            <TableRow row={items[0]} key={items[0].coin} columns={columns} />
            <div className={classes.group}>
                <TableRow row={items[0]} key={items[0].coin} columns={columns} />
                <TableRow row={items[1]} key={items[1].coin} columns={columns} />
            </div>
            {!!items.length && items.map((item) => <TableRow row={item} key={item.coin} columns={columns} />)}
        </div>
    );
}
