import React from 'react';

import classes from './TableRow.module.scss';
import { TableRowProps } from './TableRow.d';

import TableCell from '../TableCell/TableCell';
import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';

export const tableCells = (columns: TableColumnInterface[], item: TableItemInterface) => [
    <TableCell key="1" col={columns[0]}>
        <div>{item.symbol}</div>
        <div>{item.title}</div>
    </TableCell>,

    <TableCell key="2" col={columns[1]}>
        <div>{item.quantity}</div>
        <div>{item.value}</div>
    </TableCell>,

    <TableCell key="3" col={columns[2]}>
        <div>{item.price_buy}</div>
        <div>{item.price_current}</div>
    </TableCell>,

    <TableCell key="4" col={columns[3]}>
        <div>{item.change}</div>
    </TableCell>,

    <TableCell key="5" col={columns[4]}>
        <div>{item.sold}</div>
    </TableCell>,

    <TableCell key="6" col={columns[5]}>
        <div>{item.quota}</div>
    </TableCell>,

    <TableCell key="7" col={columns[6]}>
        <div>{item.wallet}</div>
        <div>{item.date}</div>
    </TableCell>,

    <TableCell key="8" col={columns[7]}>
        <div>:</div>
    </TableCell>
];

export const tableCellsGroup = (columns: TableColumnInterface[], item: TableItemInterface) => [
    <TableCell key="1" col={columns[0]}>
        <div>{item.symbol}</div>
    </TableCell>,

    <TableCell key="2" col={columns[1]}>
        <div>{item.quantity}</div>
        <div>{item.value}</div>
    </TableCell>,

    <TableCell key="3" col={columns[2]}>
        <div>{item.price_buy}</div>
        <div>{item.price_current}</div>
    </TableCell>,

    <TableCell key="4" col={columns[3]}>
        <div>{item.change}</div>
    </TableCell>,

    <TableCell key="5" col={columns[4]}>
        <div>{item.sold}</div>
    </TableCell>,

    <TableCell key="6" col={columns[5]}>
        <div>{item.quota}</div>
    </TableCell>,

    <TableCell key="7" col={columns[6]}>
        <div>{item.wallet}</div>
        <div>{item.date}</div>
    </TableCell>,

    <TableCell key="8" col={columns[7]}>
        <div>:</div>
    </TableCell>
];

export default function TableRow({ item, columns, children, isGroup }: TableRowProps) {
    const defineGroup = isGroup ? (
        <div className={classes.root}>
            {tableCellsGroup(columns, item).filter((cell) => !cell.props.col.fixed && !cell.props.col.hidden)}
        </div>
    ) : (
        <div className={classes.root}>
            {tableCells(columns, item).filter((cell) => !cell.props.col.fixed && !cell.props.col.hidden)}
        </div>
    );

    return children ? <div className={classes.root}><div className={classes.checkbox}>X</div>{children}</div> : defineGroup;
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
