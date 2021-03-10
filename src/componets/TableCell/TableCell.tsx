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

export default function TableCell({ col: { head, width, order }, addClasses, children }: any) {
    return (
        <div
            data-col-id={head[0].id}
            style={{
                minWidth: width,
                width,
                maxWidth: width,
                order
            }}
            className={classes.root}
        >
            {children}
        </div>
    );
}
