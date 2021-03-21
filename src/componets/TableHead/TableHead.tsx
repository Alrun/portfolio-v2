import React from 'react';

import classes from './TableHead.module.scss';
import headCellClasses from '../TableHeadCell/TableHeadCell.module.scss';
// import bodyCellClasses from '../TableHeadCell/TableHeadCell.module.scss';

import { TableHeadProps } from './TableHead.d';

import useDraggable from '../../hooks/useDraggable';
import TableHeadCell from '../TableHeadCell/TableHeadCell';

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

        const drag = useDraggable(reorderItemsRef.current, '[data-col-id]');
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
        /**
         * Reorder column
         */
        React.useEffect(() => {
            if (drag.status === 'start') {
                if (drag.dragEl) {
                    const draggedCol: HTMLDivElement | null = drag.dragEl.closest('[data-col-id]');

                    if (draggedCol) {
                        /**
                         * Highlight body reorder column cells
                         */
                        bodyRef.current
                            .querySelectorAll(`[data-col-id="${draggedCol.dataset.colId}"]`)
                            .forEach((item: any) => {
                                item.style.backgroundColor = '#ececec';
                            });
                        /**
                         * Create overlay for dragged column
                         */
                        if (!tableRef.current.querySelector(`.${classes.overlay}`)) {
                            const orderOverlay: HTMLDivElement = document.createElement('div');

                            orderOverlay.classList.add(classes.overlay);
                            orderOverlay.style.width = `${draggedCol.offsetWidth}px`;
                            orderOverlay.style.left = `${draggedCol.offsetLeft}px`;

                            bodyRef.current.append(orderOverlay);
                        }

                        draggedCol.classList.add(headCellClasses.dragged);
                    }
                    /**
                     * Add overlay columns for correct drag target all over the screen
                     */
                    const targetCols = columnItemsRef.current.filter(
                        (col) => col.dataset.colId !== draggedCol?.dataset.colId
                    );

                    targetCols.forEach((item) => {
                        const colOverlay = document.createElement('span');

                        colOverlay.classList.add(classes.targetOverlay);
                        item.appendChild(colOverlay);
                    });
                }

                document.body.style.cursor = 'move';
                rootRef.current?.classList.add(classes.reordering);

                console.log('start', drag);
            }

            if (drag.status === 'move') {
                if (drag.dragEl) {
                    const draggedCol: HTMLDivElement | null = drag.dragEl.closest('[data-col-id]');

                    if (draggedCol) {
                        /**
                         * Move dragged column overlay
                         */
                        const orderOverlay = document.querySelector<HTMLElement>(`.${classes.overlay}`);

                        if (orderOverlay) {
                            orderOverlay.style.transform = `translate(${drag.deltaX}px, 0px)`;
                        }
                        /**
                         * Apply drag effect
                         */
                        draggedCol.style.left = `${drag.deltaX}px`;
                        draggedCol.style.zIndex = '1000';
                        draggedCol.style.opacity = '0.5';
                    }
                }

                const bodyCols = bodyRef.current?.querySelectorAll('[data-col-id]');

                if (bodyCols) {
                    /**
                     * Add class to highlight target column when dragging to the right or left
                     */
                    bodyCols.forEach((item: any) => {
                        const correction = -1; // Border corrected delta

                        if (
                            drag.dragEl &&
                            drag.deltaX >= 0 &&
                            drag.initialX + drag.deltaX + correction > item.getBoundingClientRect().left &&
                            drag.initialX + drag.deltaX + correction <
                                item.getBoundingClientRect().left + item.offsetWidth
                        ) {
                            item.classList.add(classes.activeRight);
                            /**
                             * Add class to highlight for dragged column
                             */
                            if (
                                drag.deltaX < drag.dragEl.offsetWidth &&
                                item.dataset.colId === drag.dragEl?.dataset.colId
                            ) {
                                item.classList.add(classes.activeLeft);
                            }
                        } else if (
                            drag.deltaX < 0 &&
                            drag.initialX + drag.deltaX - correction > item.getBoundingClientRect().left &&
                            drag.initialX + drag.deltaX - correction <
                                item.getBoundingClientRect().left + item.offsetWidth
                        ) {
                            item.classList.add(classes.activeLeft);
                        } else {
                            item.classList.remove(classes.activeLeft);
                            item.classList.remove(classes.activeRight);
                        }
                    });
                }
                // const cols: NodeListOf<HTMLDivElement> | undefined = tableRef.current?.querySelectorAll(
                //     `[data-col-id]`
                // );
                // const draggedCol = [...cols].filter((item) => item.dataset.colId === drag.dragEl?.dataset.colId)[0];
                // const draggedCol: HTMLDivElement | undefined | null = rootRef.current?.querySelector(
                //     `[data-col-id=${drag.dragEl?.dataset.colId}]`
                // );
                // console.log('move', drag.initialX + drag.deltaX);
            }

            if (drag.status === 'stop') {
                const cells: NodeListOf<HTMLElement> | undefined = tableRef.current?.querySelectorAll(`[data-col-id]`);
                /**
                 * Remove overlay columns
                 */
                const targetOverlays = rootRef.current?.querySelectorAll(`.${classes.targetOverlay}`);

                if (targetOverlays) {
                    targetOverlays.forEach((item) => item.remove());
                }

                if (drag.dragEl) {
                    if (cells) {
                        cells.forEach((item) => {
                            // item.style.backgroundColor = 'initial';
                            item.classList.remove(classes.targetOverlay);
                            item.classList.remove(classes.activeLeft);
                            item.classList.remove(classes.activeRight);
                        });
                        /**
                         * Remove drag column overlay
                         */
                        const orderOverlay: NodeListOf<HTMLElement> | undefined = bodyRef.current?.querySelectorAll(
                            `.${classes.overlay}`
                        );

                        if (orderOverlay) {
                            orderOverlay.forEach((item) => item.remove());
                        }
                        /**
                         * Set initial styles for drag column
                         */
                        if (drag.dragEl) {
                            const currentColCells = [...cells].filter(
                                (item) => drag.dragEl && item.dataset.colId === drag.dragEl.dataset.colId
                            );
                            /**
                             * Set new styles for head cell in dragged column
                             */
                            currentColCells[0].style.zIndex = 'auto';
                            currentColCells[0].style.left = `0px`;
                            currentColCells[0].style.opacity = '1';
                            /**
                             * Set initial background cells in dragged column
                             */
                            currentColCells.forEach((cel: any) => {
                                cel.style.backgroundColor = 'initial';
                            });

                            currentColCells[0].classList.remove(headCellClasses.dragged);
                        }
                    }

                    const draggedCol: HTMLDivElement | null = drag.dragEl.closest('[data-col-id]');

                    if (draggedCol && drag.targetEl) {
                        const dragEl = {
                            id: draggedCol.dataset.colId,
                            order: Number(draggedCol.style.order)
                        };

                        const targetEl = {
                            id: drag.targetEl.dataset.colId,
                            order: Number(drag.targetEl.style.order)
                        };

                        const defineOrders = columnItemsRef.current.map((item) => {
                            const elId: string | undefined = item?.dataset.colId;
                            const elOrder: number = Number(item?.style.order);
                            /**
                             * Set drag element current order
                             */
                            if (elId === dragEl.id) {
                                return {
                                    id: elId,
                                    order: Number(targetEl.order)
                                };
                            }
                            /**
                             * Reordering intermediate blocks when dragged to the right
                             */
                            if (dragEl.order > targetEl.order && elOrder < dragEl.order && elOrder >= targetEl.order) {
                                return {
                                    id: elId,
                                    order: elOrder + 1
                                };
                            }
                            /**
                             * Reordering intermediate blocks when dragged to the left
                             */
                            if (dragEl.order < targetEl.order && elOrder > dragEl.order && elOrder <= targetEl.order) {
                                return {
                                    id: elId,
                                    order: elOrder - 1
                                };
                            }
                            /**
                             * Fallback
                             */
                            return {
                                id: elId,
                                order: elOrder
                            };
                        });
                        /**
                         * Dispatch if the columns belong to the same parent
                         */
                        const dragElContainer = drag.dragEl.closest(`.${classes.fixed}`);
                        const targetElContainer = drag.targetEl.closest(`.${classes.fixed}`);

                        if (!dragElContainer === !targetElContainer) {
                            handleReorder(defineOrders);
                        }
                    }
                }

                rootRef.current?.classList.remove(classes.reordering);
                document.body.style.cursor = 'default';

                console.log('stop ', drag);
            }

            // return () => console.log(111);
        }, [bodyRef, drag, handleReorder, tableRef]);

        return (
            <div ref={rootRef} className={classes.root} style={{ paddingLeft: `${padding}px` }}>
                <div ref={ref} className={classes.wrapper}>
                    <div className={classes.container} style={{ minWidth: `${fullWidth}px` }}>
                        {columns && (
                            <>
                                <div className={classes.fixed}>
                                    {fixedColumns.map((item: any) => (
                                        <TableHeadCell
                                            key={item.head[0].id}
                                            item={item}
                                            align={item.align}
                                            ref={addColumnRefs}
                                            isReorderable={item.reorderable && fixedColumns.length > 1}
                                            isResizable={item.resizable}
                                        />
                                    ))}
                                </div>

                                {visibleColumns.map((item: any) => (
                                    <TableHeadCell
                                        key={item.head[0].id}
                                        item={item}
                                        align={item.align}
                                        ref={addColumnRefs}
                                        isReorderable={item.reorderable}
                                        isResizable={item.resizable}
                                    />
                                ))}
                            </>
                        )}
                        <b style={{ position: 'absolute', top: '80px' }}>
                            {/* eslint-disable-next-line no-plusplus */}
                            Table Head RENDER COUNT: {++rendersCount.current}
                        </b>
                    </div>
                </div>
            </div>
        );
    }
);

export default TableHead;
