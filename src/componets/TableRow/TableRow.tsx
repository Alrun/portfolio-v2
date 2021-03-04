import React from 'react';
import TableCell from '../TableCell/TableCell';

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

export const tableCells = (columns: any, item: any) => [
    <TableCell col={columns[0]}>
        <div>{item.symbol}</div>
        <div>{item.title}</div>
    </TableCell>,

    <TableCell col={columns[1]}>
        <div>{item.quantity}</div>
        <div>{item.value}</div>
    </TableCell>,

    <TableCell col={columns[2]}>
        <div>{item.price_buy}</div>
        <div>{item.price_current}</div>
    </TableCell>,

    <TableCell col={columns[3]}>
        <div>{item.change}</div>
    </TableCell>,

    <TableCell col={columns[4]}>
        <div>{item.sold}</div>
    </TableCell>,

    <TableCell col={columns[5]}>
        <div>{item.quota}</div>
    </TableCell>,

    <TableCell col={columns[6]}>
        <div>{item.wallet}</div>
        <div>{item.date}</div>
    </TableCell>,

    <TableCell col={columns[7]}>
        <div>:</div>
    </TableCell>
];

export const tableCellsGroup = (columns: any, item: any) => [
    <TableCell col={columns[0]}>
        <div>{item.symbol}</div>
    </TableCell>,

    <TableCell col={columns[1]}>
        <div>{item.quantity}</div>
        <div>{item.value}</div>
    </TableCell>,

    <TableCell col={columns[2]}>
        <div>{item.price_buy}</div>
        <div>{item.price_current}</div>
    </TableCell>,

    <TableCell col={columns[3]}>
        <div>{item.change}</div>
    </TableCell>,

    <TableCell col={columns[4]}>
        <div>{item.sold}</div>
    </TableCell>,

    <TableCell col={columns[5]}>
        <div>{item.quota}</div>
    </TableCell>,

    <TableCell col={columns[6]}>
        <div>{item.wallet}</div>
        <div>{item.date}</div>
    </TableCell>,

    <TableCell col={columns[7]}>
        <div>:</div>
    </TableCell>
];

export default function TableRow({ item, columns, children, isGroup }: any) {

    console.log(isGroup);
    return children || isGroup ? (
        <div className={classes.root}>{tableCellsGroup(columns, item).map((cell: any) => cell)}</div>
    ) : (
        <div className={classes.root}>{tableCells(columns, item).map((cell: any) => cell)}</div>
    );
}
// <div className={classes.root}>
//     {columns &&
//     columns.map((item: any) => (
//         <div
//             data-col-id={item.id}
//             style={{
//                 minWidth: item.width,
//                 width: item.width,
//                 maxWidth: item.width,
//                 order: item.order
//             }}
//             className={classes.col}
//         >
//             <span>{quantity}</span>
//         </div>
//     ))}
// </div>
