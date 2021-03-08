import React from 'react';

// import debounce from 'lodash/debounce';
import dots from '../../assets/icons/dots-square.svg';

import classes from './TableHead.module.scss';
import useDraggable from '../../hooks/useDraggable';
import useScroll from '../../hooks/useScroll';
import TableFixedColumn from '../TableFixedColumn/TableFixedColumn';

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
    rootRef: any;
}

const TableHead = React.forwardRef<HTMLDivElement, TableHeadProps>(
    ({ handleResize, handleReorder, columns, rootRef }: TableHeadProps, ref) => {
        const wrapperRef = React.useRef<HTMLDivElement>(null);
        const columnItemsRef = React.useRef<HTMLElement[]>([]);
        const resizeItemsRef = React.useRef<HTMLElement[]>([]);
        const rendersCount = React.useRef(0);

        const addColumnRef = React.useCallback((node) => {
            if (node) {
                columnItemsRef.current.push(node);
            }
        }, []);

        const addResizeRef = React.useCallback((node) => {
            if (node) {
                resizeItemsRef.current.push(node);
            }
        }, []);

        // React.useEffect(() => {
        //     const parentEl = rootRef.current?.parentNode as HTMLElement;
        //
        //     console.log(parentEl.getBoundingClientRect().top, scroll.position.y);
        //
        //     // window.requestAnimationFrame(() => {
        //         if (parentEl.getBoundingClientRect().top < 0) {
        //             // if (parentEl.getBoundingClientRect()) {
        //             // @ts-ignore
        //             rootRef.current.style.position = 'fixed'
        //             // rootRef.current.style.top = `${Math.abs(parentEl.getBoundingClientRect().top)}px`
        //             // console.log(parentEl.getBoundingClientRect());
        //         } else {
        //             // @ts-ignore
        //             rootRef.current.style.position = 'relative'
        //         }
        //     // });
        //
        //
        // }, [scroll]);

        // React.useEffect(() => {
        //     handleSetWidth(rootRef.current?.scrollWidth);
        // }, [handleSetWidth]);

        const drag = useDraggable(columnItemsRef, '[data-draggable="true"]');
        const resize = useDraggable(resizeItemsRef, `.${classes.resizer}`);

        React.useEffect(() => {
            if (resize.dragEl && resize.status === 'start') {
                console.log('start', resize);
            }

            if (resize.dragEl && resize.status === 'move') {
                const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                const id: string | undefined = currentCol?.dataset.colId;

                if (id) {
                    const initialWidth = columns.filter((col: any) => col.head[0].id === id)[0].width;
                    const cells = rootRef.current.querySelectorAll(`[data-col-id=${id}]`);

                    cells.forEach((item: any) => {
                        item.style.width = `${initialWidth + resize.deltaX}px`;
                        item.style.minWidth = `${initialWidth + resize.deltaX}px`;
                        item.style.maxWidth = `${initialWidth + resize.deltaX}px`;
                            });

                    // console.log(cells);
                    // const wrapperRef.current?.parentNode
                    //     ?.querySelectorAll<HTMLElement>(`[data-col-id="${drag.dragEl.dataset.colId}"]`)
                    //     .forEach((item) => {
                    //         item.style.backgroundColor = '#ececec';
                    //     });

                    // console.log(columns.filter((col: any) => col.head[0].id === id));

                    // const {width} = col.getBoundingClientRect();

                    // col.getBoundingClientRect().width = 500
                    // currentCol.style.width = `${initialWidth + resize.deltaX}px`;
                    // currentCol.style.minWidth = `${initialWidth + resize.deltaX}px`;
                    // currentCol.style.maxWidth = `${initialWidth + resize.deltaX}px`;
                }

                // console.log('move', resize.deltaX);
            }

            if (resize.status === 'stop') {
                console.log('stop ', resize);
            }
        }, [resize]);

        React.useEffect(() => {
            if (drag.dragEl && drag.status === 'start') {
                /**
                 * Highlight reorder column cells
                 */
                wrapperRef.current?.parentNode
                    ?.querySelectorAll<HTMLElement>(`[data-col-id="${drag.dragEl.dataset.colId}"]`)
                    .forEach((item) => {
                        item.style.backgroundColor = '#ececec';
                    });
                /**
                 * Create reorder overlay
                 */
                if (!document.querySelector(`.${classes.overlay}`)) {
                    const orderOverlay: HTMLDivElement = document.createElement('div');

                    orderOverlay.classList.add(classes.overlay);

                    if (wrapperRef && wrapperRef.current && wrapperRef.current.parentNode) {
                        wrapperRef.current.parentNode.append(orderOverlay);
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
                const cols: NodeListOf<HTMLElement> | undefined = wrapperRef.current?.parentNode?.querySelectorAll(
                    `[data-col-id]`
                );

                if (cols) {
                    const bodyCols = [...cols].filter((item) => !item.dataset.draggable);
                    const draggedCol = [...cols].filter((item) => item.dataset.colId === drag.dragEl?.dataset.colId)[0];
                    const orderOverlay = document.querySelector<HTMLElement>(`.${classes.overlay}`);
                    /**
                     * Apply drag effect
                     */
                    draggedCol.style.left = `${drag.deltaX}px`;
                    draggedCol.style.zIndex = '100';
                    draggedCol.style.opacity = '0.5';
                    /**
                     * Move dragged column overlay
                     */
                    if (orderOverlay) {
                        orderOverlay.style.transform = `translate(${drag.deltaX}px, 0px)`;
                    }
                    /**
                     * Add class to highlight target column when dragging to the right or left
                     */
                    bodyCols.forEach((item) => {
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
                const cols: NodeListOf<HTMLElement> | undefined = wrapperRef.current?.parentNode?.querySelectorAll(
                    `[data-col-id]`
                );
                const orderOverlay:
                    | NodeListOf<HTMLElement>
                    | undefined = wrapperRef.current?.parentNode?.querySelectorAll(`.${classes.overlay}`);

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
        }, [drag, drag.status, drag.deltaX, handleReorder]);

        const defineColumns = (cols: any) => cols.filter((col: any) => !col.isFixed && !col.isHidden);
        const defineFixedColumns = (cols: any) => cols.filter((col: any) => col.isFixed && !col.isHidden);

        const padding = defineFixedColumns(columns).reduce((acc: any, cur: any) => {
            if (!cur.isHidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        return (
            <div ref={ref} className={classes.root} style={{ paddingLeft: `${padding}px` }}>
                <div ref={wrapperRef} className={classes.wrapper}>
                    {columns && (
                        <>
                            <div className={classes.fixed} style={{ height: wrapperRef.current?.offsetHeight }}>
                                {defineFixedColumns(columns).map((item: any) => (
                                    <div
                                        // ref={addColumnRef}
                                        data-col-id={item.head[0].id}
                                        data-draggable="true"
                                        data-resizable="true"
                                        className={classes.col}
                                        key={item.head[0].id}
                                        style={{
                                            minWidth: item.width,
                                            width: item.width,
                                            maxWidth: item.width,
                                            order: item.order
                                        }}
                                    >
                                        <div ref={addColumnRef} className={classes.reorder} aria-hidden="true" />

                                        <div className={classes.wrapper}>
                                            <div className={classes.actions}>
                                                <button
                                                    className={classes.dropdown}
                                                    type="button"
                                                    aria-label="toggle-dropdown"
                                                />
                                            </div>
                                            <div className={classes.container}>
                                                {item.head.map(
                                                    (el: any) =>
                                                        el.id && (
                                                            <button
                                                                data-button-id={el.id}
                                                                className={classes.button}
                                                                key={el.id}
                                                                type="button"
                                                            >
                                                                <span className={classes.text}>
                                                                    {el.title} o={item.order}
                                                                </span>
                                                                {(el.id === 'current_value' || el.id === 'quota') && (
                                                                    <b style={{ fontSize: 26, lineHeight: 1 }}>↓</b>
                                                                )}
                                                            </button>
                                                        )
                                                )}
                                            </div>
                                        </div>

                                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                                        <div ref={addResizeRef} className={classes.resizer} aria-hidden="true" />
                                    </div>
                                ))}
                            </div>

                            {/* {fixedColumns.length && ( */}
                            {/*    <TableFixedHead columns={columns} items={items} fixedColumns={fixedColumns} /> */}
                            {/* )} */}

                            {defineColumns(columns).map((item: any) => (
                                <div
                                    // ref={addColumnRef}
                                    data-col-id={item.head[0].id}
                                    data-draggable="true"
                                    data-resizable="true"
                                    className={classes.col}
                                    key={item.head[0].id}
                                    style={{
                                        minWidth: item.width,
                                        width: item.width,
                                        maxWidth: item.width,
                                        order: item.order
                                    }}
                                >
                                    <div ref={addColumnRef} className={classes.reorder} aria-hidden="true" />

                                    <div className={classes.wrapper}>
                                        <div className={classes.actions}>
                                            <button
                                                className={classes.dropdown}
                                                type="button"
                                                aria-label="toggle-dropdown"
                                            />
                                        </div>
                                        <div className={classes.container}>
                                            {item.head.map(
                                                (el: any) =>
                                                    el.id && (
                                                        <button
                                                            data-button-id={el.id}
                                                            className={classes.button}
                                                            key={el.id}
                                                            type="button"
                                                        >
                                                            <span className={classes.text}>
                                                                {el.title} o={item.order}
                                                            </span>
                                                            {(el.id === 'current_value' || el.id === 'quota') && (
                                                                <b style={{ fontSize: 26, lineHeight: 1 }}>↓</b>
                                                            )}
                                                        </button>
                                                    )
                                            )}
                                        </div>
                                    </div>

                                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                                    <div ref={addResizeRef} className={classes.resizer} aria-hidden="true" />
                                </div>
                            ))}
                        </>
                    )}
                    <b style={{ position: 'absolute', top: '80px' }}>
                        {/* eslint-disable-next-line no-plusplus */}
                        Table Head RENDER COUNT: {++rendersCount.current}
                    </b>
                </div>
            </div>
        );
    }
);

export default TableHead;
