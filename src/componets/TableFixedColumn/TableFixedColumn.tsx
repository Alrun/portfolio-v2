import React from 'react';

import classes from './TableFixedColumn.module.scss';
import TableCell from '../TableCell/TableCell';
import TableRow from '../TableRow/TableRow';

export default function TableFixedColumn({ columns, items, fixedColumns }: any) {
    return (
        fixedColumns.length &&
        fixedColumns.map((id: string) => (
            <div className={classes.root}>
                {!!items.length &&

                    items.map((item: any) =>
                        item.group ? (
                            <>
                                <TableRow key={item.id} item={item} columns={columns}>
                                    {/* {tableCells(columns, item).filter(col => col[id])} */}
                                    {/* <TableCell col={columns[id]}> */}
                                    {/*    <div>{item.symbol}</div> */}
                                    {/*    <div>{item.title}</div> */}
                                    {/* </TableCell> */}
                                </TableRow>
                                <div className={classes.group}>
                                    {item.group.map((groupItem: any) => (
                                        <TableRow key={groupItem.id} item={groupItem} columns={columns}>
                                            <TableCell col={columns[id]}>
                                                <div>{item.symbol}</div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <TableRow key={item.id} item={item} columns={columns}>
                                <TableCell col={columns[id]}>
                                    <div>{item.symbol}</div>
                                    <div>{item.title}</div>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                )
            </div>
        ))
    );
}
