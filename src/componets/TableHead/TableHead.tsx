import React from 'react';

import classes from './TableHead.module.scss';
import { TableHeadProps } from './TableHead.d';
import TableReorder from '../TableReorder/TableReorder';
import TableHeadItem from '../TableHeadItem/TableHeadItem';

const TableHead = React.forwardRef<HTMLDivElement, TableHeadProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableHeadRef({ handleResize, handleReorder, columns, bodyRef }: TableHeadProps, ref) {
        const rootRef = React.useRef<HTMLDivElement>(null);

        const rendersCount = React.useRef(0);

        const visibleColumns = columns.filter((col) => !col.fixed && !col.hidden);
        const fixedColumns = columns.filter((col) => col.fixed && !col.hidden);

        const fixedColsWidth = fixedColumns.reduce((acc, cur) => {
            if (!cur.hidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        const visibleColsWidth = visibleColumns.reduce((acc, cur) => {
            if (!cur.hidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        return (
            <div ref={rootRef} className={classes.root} style={{ paddingLeft: `${fixedColsWidth}px` }}>
                {columns && (
                    <>
                        <div className={classes.fixed}>
                            <div className={classes.checkbox}>X</div>
                            <TableReorder
                                id="reorder-fixed"
                                bodyRef={bodyRef}
                                headRef={rootRef}
                                handleReorder={handleReorder}
                            >
                                {fixedColumns.map((item: any) => (
                                    <TableHeadItem
                                        key={item.head[0].id}
                                        id={item.head[0].id}
                                        item={item}
                                        width={item.width}
                                        order={item.order}
                                        reorderable={item.reorderable}
                                        resizable={item.resizable}
                                        paddingLeft={fixedColsWidth}
                                        bodyRef={bodyRef}
                                        headRef={rootRef}
                                        handleResize={handleResize}
                                    />
                                ))}
                            </TableReorder>
                        </div>
                        <div ref={ref} className={classes.container}>
                            <TableReorder
                                id="reorder"
                                minWidth={visibleColsWidth}
                                bodyRef={bodyRef}
                                headRef={rootRef}
                                handleReorder={handleReorder}
                            >
                                {visibleColumns.map((item: any) => (
                                    <TableHeadItem
                                        key={item.head[0].id}
                                        id={item.head[0].id}
                                        item={item}
                                        width={item.width}
                                        order={item.order}
                                        reorderable={item.reorderable}
                                        resizable={item.resizable}
                                        bodyRef={bodyRef}
                                        headRef={rootRef}
                                        handleResize={handleResize}
                                    />
                                ))}
                            </TableReorder>
                        </div>
                    </>
                )}

                <b style={{ position: 'absolute', top: '130px' }}>
                    {/* eslint-disable-next-line no-plusplus */}
                    Table Head RENDER COUNT: {++rendersCount.current}
                </b>
            </div>
        );
    }
);

export default TableHead;
