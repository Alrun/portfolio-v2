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

export default function TableCell({title}: any) {
    return (
        <div className={classes.root}>
            <div>
                <span>{title}</span>
            </div>
        </div>
    );
}
