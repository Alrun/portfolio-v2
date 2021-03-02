import React from 'react';

import classes from './TableRow.module.scss';

export interface TableRowDataInterface {
    coin: string;
    title: string;
    quantity: number;
    price_buy: number;
    change: number;
    sold: number;
    quota: number;
    wallet: string;
}

export interface TableRowPropsInterface {
    row: TableRowDataInterface;
    columns: any;
}

export default function TableRow({
    row: { coin, title, quantity, price_buy, change, sold, quota, wallet },
    columns
}: TableRowPropsInterface) {
    return (
        <div className={classes.root}>
            {columns &&
                columns.map((item: any) => (
                <div
                    data-col-id={item.id}
                    style={{
                        minWidth: item.width,
                        width: item.width,
                        maxWidth: item.width,
                        order: item.order
                    }}
                    className={classes.col}
                >
                    <span>{quantity}</span>
                </div>
            ))}
        </div>
    );
}
