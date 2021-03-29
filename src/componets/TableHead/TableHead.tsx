import React from 'react';

import classes from './TableHead.module.scss';
import headCellClasses from '../TableHeadCell/TableHeadCell.module.scss';
// import bodyCellClasses from '../TableHeadCell/TableHeadCell.module.scss';

import { TableHeadProps } from './TableHead.d';

import useDraggable from '../../hooks/useDraggable';
import TableHeadCell from '../TableHeadCell/TableHeadCell';
import TableReorder, { TableReorderItem } from '../TableReorder/TableReorder';

const TableHead = React.forwardRef<HTMLDivElement, TableHeadProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableHeadRef({ handleResize, handleReorder, columns, tableRef, bodyRef }: TableHeadProps, ref) {
        const rootRef = React.useRef<HTMLDivElement>(null);
        const columnItemsRef = React.useRef<HTMLDivElement[]>([]);
        const reorderItemsRef = React.useRef<HTMLDivElement[]>([]);
        const resizeItemsRef = React.useRef<HTMLDivElement[]>([]);

        const rendersCount = React.useRef(0);

        const visibleColumns = columns.filter((col) => !col.fixed && !col.hidden);
        const fixedColumns = columns.filter((col) => col.fixed && !col.hidden);

        const padding = fixedColumns.reduce((acc: any, cur: any) => {
            if (!cur.hidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        const fullWidth = columns.reduce((acc: any, cur: any) => {
            if (!cur.hidden && !cur.fixed) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        const addColumnRefs = React.useCallback((node) => {
            if (node) {
                const resizeNode = node.querySelector('[data-resizable="true"]');
                const reorderNode = node.querySelector('[data-reorderable="true"]');

                if (resizeNode) resizeItemsRef.current.push(resizeNode);
                if (reorderNode) reorderItemsRef.current.push(reorderNode);

                columnItemsRef.current.push(node);
            }
        }, []);

        const resize = useDraggable(resizeItemsRef.current);
        /**
         * Resize column
         */
        React.useEffect(() => {
            if (resize.status === 'start') {
                /**
                 * Add class all head cells when drag start
                 */
                columnItemsRef.current.forEach((el) => {
                    el.classList.add(headCellClasses.dragged);
                });
                /**
                 * Add class of dragged head cell
                 */
                if (resize.dragEl) {
                    const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);

                    currentCol?.classList.add(headCellClasses.draggedActive);
                }

                document.body.style.cursor = 'col-resize';

                console.log('start', resize);
            }

            if (resize.status === 'move') {
                if (resize.dragEl) {
                    const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                    const id: string | undefined = currentCol?.dataset.colId;
                    const isFixed: boolean = !!currentCol?.closest(`.${classes.fixed}`);

                    if (id) {
                        const initialWidth = columns.filter((col: any) => col.head[0].id === id)[0].width;
                        const cells = tableRef.current.querySelectorAll(`[data-col-id=${id}]`);

                        cells.forEach((item: any) => {
                            item.style.width = `${initialWidth + resize.deltaX}px`;
                            item.style.minWidth = `${initialWidth + resize.deltaX}px`;
                            item.style.maxWidth = `${initialWidth + resize.deltaX}px`;
                        });

                        if (isFixed) {
                            if (rootRef.current) {
                                rootRef.current.style.paddingLeft = `${padding + resize.deltaX}px`;
                            }

                            if (bodyRef.current) {
                                bodyRef.current.style.paddingLeft = `${padding + resize.deltaX}px`;
                            }
                        }
                    }
                }
            }

            if (resize.status === 'stop') {
                if (resize.dragEl) {
                    const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                    const id: string | undefined = currentCol?.dataset.colId;

                    if (currentCol && id) {
                        handleResize(id, currentCol.offsetWidth);
                    }
                }
                /**
                 * Remove classes head cells when drag stop
                 */
                columnItemsRef.current.forEach((el) => {
                    el.classList.remove(headCellClasses.dragged);
                    el.classList.remove(headCellClasses.draggedActive);
                });

                document.body.style.cursor = 'default';

                console.log('stop ', resize);
            }
        }, [bodyRef, columns, handleResize, padding, resize, tableRef]);

        return (
            <div ref={rootRef} className={classes.root} style={{ paddingLeft: `${padding}px` }}>
                {columns && (
                    <>
                        <div className={classes.fixed}>
                            <TableReorder
                                id="reorder-fixed"
                                bodyRef={bodyRef}
                                headRef={rootRef}
                                handleReorder={handleReorder}
                            >
                                {fixedColumns.map((item: any) => (
                                    <TableReorderItem
                                        key={item.head[0].id}
                                        id={item.head[0].id}
                                        isDraggable={item.reorderable && fixedColumns.length > 1}
                                    >
                                        <TableHeadCell
                                            item={item}
                                            align={item.align}
                                            ref={addColumnRefs}
                                            isResizable={item.resizable}
                                        />
                                    </TableReorderItem>
                                ))}
                            </TableReorder>
                        </div>
                        <div ref={ref} className={classes.container}>
                            <TableReorder
                                id="reorder"
                                bodyRef={bodyRef}
                                headRef={rootRef}
                                handleReorder={handleReorder}
                            >
                                {visibleColumns.map((item: any) => (
                                    <TableReorderItem
                                        key={item.head[0].id}
                                        id={item.head[0].id}
                                        isDraggable={item.reorderable}
                                    >
                                        <TableHeadCell
                                            item={item}
                                            align={item.align}
                                            ref={addColumnRefs}
                                            isResizable={item.resizable}
                                        />
                                    </TableReorderItem>
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
