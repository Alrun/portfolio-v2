import React from 'react';

// import debounce from 'lodash/debounce';
import dots from '../../assets/icons/dots-square.svg';

import classes from './TableHead.module.scss';
import useDraggable from '../../hooks/useDraggable';
import useScroll from '../../hooks/useScroll';
import TableFixedColumn from '../TableFixedColumn/TableFixedColumn';
import TableHeadCell, { TableHeadRef } from '../TableHeadCell/TableHeadCell';

const colWidth: { [key: string]: number } = {
    min: 50,
    max: 500
};

export interface TableHeadProps {
    // data: {
    //     id: string;
    //     items: {
    //         id: string;
    //         title: string;
    //     }[];
    // }[];
    handleReorder: ({ dragEl, targetEl }: any) => void;
    handleResize: (width: any, cursor: any) => void;
    columns: any;
    tableRef: any;
}

const TableHead = React.forwardRef<HTMLDivElement, TableHeadProps>(
    ({ handleResize, handleReorder, columns, tableRef }: TableHeadProps, ref) => {
        const rootRef = React.useRef<HTMLDivElement>(null);
        const ttRef = React.useRef<any[]>([]);
        const columnItemsRef = React.useRef<HTMLDivElement[]>([]);
        const resizeItemsRef = React.useRef<HTMLDivElement[]>([]);
        // const columnItemsRef = React.useRef<HTMLElement[]>([]);
        const rendersCount = React.useRef(0);

        const addColumnRefs = React.useCallback((node: TableHeadRef | null) => {
            // console.log(node);
            if (node && !ttRef.current?.includes(node.cellRef.current?.dataset.colId)) {
                ttRef.current.push(node.cellRef.current?.dataset.colId);
                columnItemsRef.current.push(node.reorderRef.current as HTMLDivElement);
                resizeItemsRef.current.push(node.resizeRef.current as HTMLDivElement);
            }
        }, []);

        const drag = useDraggable(columnItemsRef, '[data-draggable="true"]');
        const resize = useDraggable(resizeItemsRef, `.${resizeItemsRef.current[0]?.className}`);

        React.useEffect(() => {
            if (resize.dragEl && resize.status === 'start') {
                console.log('start', resize);
            }

            if (resize.dragEl && resize.status === 'move') {
                const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                const id: string | undefined = currentCol?.dataset.colId;

                if (id) {
                    const initialWidth = columns.filter((col: any) => col.head[0].id === id)[0].width;
                    const cells = tableRef.current.querySelectorAll(`[data-col-id=${id}]`);

                    console.log(resize.deltaX);

                    cells.forEach((item: any) => {
                        if (
                            initialWidth + resize.deltaX > colWidth.min &&
                            initialWidth + resize.deltaX < colWidth.max
                        ) {
                            item.style.width = `${initialWidth + resize.deltaX}px`;
                            item.style.minWidth = `${initialWidth + resize.deltaX}px`;
                            item.style.maxWidth = `${initialWidth + resize.deltaX}px`;
                        }
                    });
                }

                // console.log('move', resize.deltaX);
            }

            if (resize.dragEl && resize.status === 'stop') {
                const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                const id: string | undefined = currentCol?.dataset.colId;

                if (currentCol && id) {
                    handleResize(id, currentCol.offsetWidth);
                }

                console.log('stop ', resize);
            }
        }, [columns, handleResize, resize, rootRef, tableRef]);

        React.useEffect(() => {
            if (drag.dragEl && drag.status === 'start') {
                /**
                 * Highlight reorder column cells
                 */
                tableRef.current
                    ?.querySelectorAll(`[data-col-id="${drag.dragEl.dataset.colId}"]`)
                    .forEach((item: any) => {
                    item.style.backgroundColor = '#ececec';
                });
                /**
                 * Create reorder overlay
                 */
                if (!document.querySelector(`.${classes.overlay}`)) {
                    const orderOverlay: HTMLDivElement = document.createElement('div');

                    orderOverlay.classList.add(classes.overlay);

                    if (rootRef && rootRef.current && rootRef.current.parentNode) {
                        rootRef.current.parentNode.append(orderOverlay);
                    }
                }
                /**
                 * Set initial position & width for reorder overlay
                 */
                const orderOverlay = document.querySelector<HTMLElement>(`.${classes.overlay}`);

                if (orderOverlay) {
                    orderOverlay.style.width = `${drag.dragEl.offsetWidth}px`;
                    orderOverlay.style.left = `${drag.dragEl.offsetLeft}px`;
                }

                console.log('start', drag);
            }

            if (drag.dragEl && drag.status === 'move') {
                // const cols: NodeListOf<HTMLDivElement> | undefined = tableRef.current?.querySelectorAll(
                //     `[data-col-id]`
                // );
                // const draggedCol = [...cols].filter((item) => item.dataset.colId === drag.dragEl?.dataset.colId)[0];
                const draggedCol: HTMLDivElement | undefined | null = rootRef.current?.querySelector(
                    `[data-col-id=${drag.dragEl?.dataset.colId}]`
                );
                const bodyCols = tableRef.current?.querySelectorAll(`[data-col-id]:not([data-draggable])`);

                if (draggedCol) {
                    /**
                     * Apply drag effect
                     */
                    draggedCol.style.left = `${drag.deltaX}px`;
                    draggedCol.style.zIndex = '100';
                    draggedCol.style.opacity = '0.5';

                    const orderOverlay = document.querySelector<HTMLElement>(`.${classes.overlay}`);
                    /**
                     * Move dragged column overlay
                     */
                    if (orderOverlay) {
                        orderOverlay.style.transform = `translate(${drag.deltaX}px, 0px)`;
                    }
                }

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

                // console.log('move', drag.initialX + drag.deltaX);
            }

            if (drag.status === 'stop') {
                const cols: NodeListOf<HTMLElement> | undefined = tableRef.current?.querySelectorAll(`[data-col-id]`);
                const orderOverlay: NodeListOf<HTMLElement> | undefined = tableRef.current?.querySelectorAll(
                    `.${classes.overlay}`
                );

                if (cols) {
                    cols.forEach((item) => {
                        item.style.backgroundColor = 'initial';
                        item.classList.remove(classes.activeLeft);
                        item.classList.remove(classes.activeRight);
                    });
                    /**
                     * Remove drag column overlay
                     */
                    if (orderOverlay) {
                        orderOverlay.forEach((item) => item.remove());
                    }
                    /**
                     * Set initial styles for drag column
                     */
                    if (drag.dragEl) {
                        const currentCol = [...cols].filter(
                            (item) => drag.dragEl && item.dataset.colId === drag.dragEl.dataset.colId
                        );

                        currentCol[0].style.zIndex = 'auto';
                        currentCol[0].style.left = `0px`;
                        currentCol[0].style.opacity = '1';
                    }
                }

                if (drag.dragEl && drag.targetEl) {
                    const dragEl = {
                        id: drag.dragEl.dataset.colId,
                        order: Number(drag.dragEl.style.order)
                    };

                    const targetEl = {
                        id: drag.targetEl.dataset.colId,
                        order: Number(drag.targetEl.style.order)
                    };

                    const defineOrders = columnItemsRef.current.map((item) => {
                        const el: HTMLElement | null = item.closest('[data-draggable="true"]');
                        const elId: string | undefined = el?.dataset.colId;
                        const elOrder: number = Number(el?.style.order);
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
                    console.log(defineOrders);
                    handleReorder(defineOrders);
                }

                console.log('stop ', drag);
            }

            // return () => console.log(111);
        }, [drag, drag.status, drag.deltaX, handleReorder, tableRef]);

        const defineColumns = (cols: any) => cols.filter((col: any) => !col.isFixed && !col.isHidden);
        const defineFixedColumns = (cols: any) => cols.filter((col: any) => col.isFixed && !col.isHidden);

        const padding = defineFixedColumns(columns).reduce((acc: any, cur: any) => {
            if (!cur.isHidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        const fullWidth = columns.reduce((acc: any, cur: any) => {
            if (!cur.isHidden && !cur.isFixed) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        return (
            <div ref={rootRef} className={classes.root} style={{ paddingLeft: `${padding}px` }}>
                <div ref={ref} className={classes.wrapper}>
                    <div className={classes.container} style={{ minWidth: `${fullWidth}px` }}>
                        {columns && (
                            <>
                                {/* <div className={classes.fixed}> */}
                                {/*    {defineFixedColumns(columns).map((item: any) => ( */}
                                {/*        <TableHeadCell */}
                                {/*            item={item} */}
                                {/*            ref={tt} */}
                                {/*        /> */}
                                {/*    ))} */}
                                {/* </div> */}

                                {defineColumns(columns).map((item: any) => (
                                    <TableHeadCell item={item} ref={addColumnRefs} />
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
