import React from 'react';

import classes from './TableRow.module.scss';
import { TableRowProps } from './TableRow.d';

import TableCell from '../TableCell/TableCell';
import { TableColumnInterface, TableItemInterface } from '../../redux/slices/table/table.d';
import Checkbox from '../../ui/Checkbox/Checkbox';
import Button from '../../ui/Button/Button';

export const tableCells = (columns: TableColumnInterface[], item: TableItemInterface, handleGroupOpen?: any) => [
    <TableCell key="1" col={columns[0]}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <div>{item.symbol}</div>
                <div>{item.title}</div>
            </div>

            {item.group?.length ? (
                <Button
                    color="secondary"
                    iconStart={
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                    }
                    onClick={() => handleGroupOpen(item.id)}
                />
            ) : (
                <Button
                    color="secondary"
                    iconStart={
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                    }
                    onClick={() => console.log('Dropdown')}
                />
            )}
        </div>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>{item.symbol}</div>
            <Button
                color="success"
                iconStart={
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                }
                onClick={() => console.log('Dropdown')}
            />
        </div>
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

export default function TableRow({
    item,
    columns,
    children,
    isGroup,
    isCheckboxChecked,
    handleCheckboxChange
}: TableRowProps) {
    const defineGroup = isGroup ? (
        <div className={classes.root}>
            {tableCellsGroup(columns, item).filter((cell) => !cell.props.col.fixed && !cell.props.col.hidden)}
        </div>
    ) : (
        <div className={classes.root}>
            {tableCells(columns, item).filter((cell) => !cell.props.col.fixed && !cell.props.col.hidden)}
        </div>
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleCheckboxChange) handleCheckboxChange(item.id, e.target.checked);
    };

    return children ? (
        <div className={classes.root}>
            <Checkbox color="secondary" isChecked={isCheckboxChecked} onChange={handleChange} />
            {children}
        </div>
    ) : (
        defineGroup
    );
}
