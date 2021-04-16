import React from 'react';

import classes from './TableCell.module.scss';

// export interface TableRowDataInterface {
//     coin: string;
//     title: string;
//     quantity: number;
//     price_buy: number;
//     change: number;
//     sold: number;
//     quota: number;
//     wallet: string;
// }
//
// export interface TableRowPropsInterface {
//     row: TableRowDataInterface;
//     columns: any;
// }

export default function TableCell({ col: { head, width, order, align = 'start' }, addClasses, children }: any) {
    return (
        <div
            data-id={head[0].id}
            style={{
                minWidth: width,
                width,
                maxWidth: width,
                order
            }}
            className={`${classes.root} ${classes[align]}`}
        >
            {children}
        </div>
    );
}
