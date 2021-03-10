import React from 'react';

import classes from './TableFixedColumn.module.scss';
import TableCell from '../TableCell/TableCell';
import TableRow, { tableCells, tableCellsGroup } from '../TableRow/TableRow';

export default function TableFixedColumn({ columns, items }: any) {
    // const defineFixedColumns = columns.filter((col: any) => col.fixed && !col.hidden);
    const defineCell = (cols: any, item: any, group?: boolean) =>
        group
            ? tableCellsGroup(cols, item).filter((col) => col.props.col.fixed && !col.props.col.hidden)
            : tableCells(cols, item).filter((col) => col.props.col.fixed && !col.props.col.hidden);

    return (
        <div className={classes.root}>
            {!!items.length &&
                items.map((item: any) =>
                    item.group?.length ? (
                        <div className={classes.collapse} key={item.id}>
                            <TableRow item={item} columns={columns}>
                                {defineCell(columns, item)}
                            </TableRow>
                            <div className={classes.group}>
                                {item.group.map((groupItem: any) => (
                                    <TableRow key={groupItem.id} item={groupItem} columns={columns} isGroup>
                                        {defineCell(columns, groupItem, true)}
                                    </TableRow>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <TableRow key={item.id} item={item} columns={columns}>
                            {defineCell(columns, item)}
                        </TableRow>
                    )
                )}
        </div>
    );
}

// item.group ? (
//     <>
//         <TableRow key={item.id} item={item} columns={columns}>
//             {/* {tableCells(columns, item).filter(col => col[id])} */}
//             {/* <TableCell col={columns[id]}> */}
//             {/*    <div>{item.symbol}</div> */}
//             {/*    <div>{item.title}</div> */}
//             {/* </TableCell> */}
//         </TableRow>
//         <div className={classes.group}>
//             {item.group.map((groupItem: any) =>
//                 fixedColumns.map((id: string) => (
//                     <TableCell col={columns[id]}>
//                         <div>{item.symbol}</div>
//                         <div>{item.title}</div>
//                     </TableCell>
//                 ))
//             )}
//         </div>
//     </>
// ) :
