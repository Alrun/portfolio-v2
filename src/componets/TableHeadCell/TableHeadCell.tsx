import React from 'react';
import { usePopper } from 'react-popper';

import classes from './TableHeadCell.module.scss';
import { TableHeadCellProps } from './TableHeadCell.d';

import Ripple from '../../ui/Ripple/Ripple';
import Tooltip, { MouseoverTooltip } from '../../ui/Tooltip/Tooltip';
import useDraggable from '../../hooks/useDraggable';

const TableHeadCell = React.forwardRef<HTMLDivElement, TableHeadCellProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableHeadCellRef({ item, isResizable, align = 'start' }: TableHeadCellProps, ref) {
        const rippleRef = React.useRef<any>(null);

        const rootRef = React.useRef<HTMLDivElement>(null);
        const columnItemsRef = React.useRef<HTMLDivElement[]>([]);
        const reorderItemsRef = React.useRef<HTMLDivElement[]>([]);
        const resizeItemsRef = React.useRef<HTMLDivElement[]>([]);

        // const padding = fixedColumns.reduce((acc: any, cur: any) => {
        //     if (!cur.hidden) {
        //         return acc + cur.width;
        //     }
        //     return acc;
        // }, 0);
        //
        // const fullWidth = columns.reduce((acc: any, cur: any) => {
        //     if (!cur.hidden && !cur.fixed) {
        //         return acc + cur.width;
        //     }
        //     return acc;
        // }, 0);

        // const addColumnRefs = React.useCallback((node) => {
        //     if (node) {
        //         const resizeNode = node.querySelector('[data-resizable="true"]');
        //         const reorderNode = node.querySelector('[data-reorderable="true"]');
        //
        //         if (resizeNode) resizeItemsRef.current.push(resizeNode);
        //         if (reorderNode) reorderItemsRef.current.push(reorderNode);
        //
        //         columnItemsRef.current.push(node);
        //     }
        // }, []);

        const resize = useDraggable(resizeItemsRef.current);
        /**
         * Resize column
         */
        React.useEffect(() => {
            if (resize.status === 'start') {
                /**
                 * Add class all head cells when drag start
                 */
                // columnItemsRef.current.forEach((el) => {
                //     el.classList.add(classes.dragged);
                // });
                // /**
                //  * Add class of dragged head cell
                //  */
                // if (resize.dragEl) {
                //     const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                //
                //     currentCol?.classList.add(classes.draggedActive);
                // }
                //
                // document.body.style.cursor = 'col-resize';

                console.log('start', resize);
            }

            if (resize.status === 'move') {
                // if (resize.dragEl) {
                //     const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                //     const id: string | undefined = currentCol?.dataset.colId;
                //     const isFixed: boolean = !!currentCol?.closest(`.${classes.fixed}`);
                //
                //     if (id) {
                //         const initialWidth = columns.filter((col: any) => col.head[0].id === id)[0].width;
                //         const cells = tableRef.current.querySelectorAll(`[data-col-id=${id}]`);
                //
                //         cells.forEach((item: any) => {
                //             item.style.width = `${initialWidth + resize.deltaX}px`;
                //             item.style.minWidth = `${initialWidth + resize.deltaX}px`;
                //             item.style.maxWidth = `${initialWidth + resize.deltaX}px`;
                //         });
                //
                //         if (isFixed) {
                //             if (rootRef.current) {
                //                 rootRef.current.style.paddingLeft = `${padding + resize.deltaX}px`;
                //             }
                //
                //             if (bodyRef.current) {
                //                 bodyRef.current.style.paddingLeft = `${padding + resize.deltaX}px`;
                //             }
                //         }
                //     }
                // }
            }

            if (resize.status === 'stop') {
                // if (resize.dragEl) {
                //     const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
                //     const id: string | undefined = currentCol?.dataset.colId;
                //
                //     if (currentCol && id) {
                //         handleResize(id, currentCol.offsetWidth);
                //     }
                // }
                // /**
                //  * Remove classes head cells when drag stop
                //  */
                // columnItemsRef.current.forEach((el) => {
                //     el.classList.remove(classes.dragged);
                //     el.classList.remove(classes.draggedActive);
                // });
                //
                // document.body.style.cursor = 'default';

                console.log('stop ', resize);
            }
        }, []);


        const handleClick = (e: any) => {
            console.log('click ', e.currentTarget.dataset.buttonId);

            rippleRef.current.start(e);

            // rippleRef.current[tt](111);
            // <Ripple test="1111" />
        };

        const handleDropdown = (e: any) => console.log('dropdown');

        // console.log(item);

        return (
            <div

                // data-col-id={item.head[0].id}
                // data-reorderable="container"
                className={`${classes.root}`}
                // key={item.head[0].id}

            >
                <div className={`${classes.container} ${classes[align]}`}>
                    <div className={classes.actions}>
                        <button
                            onClick={handleDropdown}
                            className={classes.dropdown}
                            type="button"
                            aria-label="toggle-dropdown"
                        >
                            <span className={classes.iconWrapper}>
                                <svg
                                    className={classes.dropdownIcon}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 18 18"
                                >
                                    <rect x="7" y="13.2" fill="currentColor" width="4" height="3.8" />
                                    <rect x="7" y="7.1" fill="currentColor" width="4" height="3.8" />
                                    <rect x="7" y="1" fill="currentColor" width="4" height="3.8" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <Ripple ref={rippleRef} />

                    <div className={classes.labels}>
                        {item.head.map(
                            (el: any) =>
                                el.id && (
                                    <button
                                        key={el.id}
                                        data-button-id={el.id}
                                        onClick={handleClick}
                                        className={classes.button}
                                        type="button"
                                    >
                                        <MouseoverTooltip text={el.title} placement="bottom">
                                            <span className={classes.text}>
                                                {el.title} o={item.order}
                                            </span>
                                        </MouseoverTooltip>

                                        {(el.id === 'current_value' || el.id === 'quota') && (
                                            <b style={{ fontSize: 26, lineHeight: 1 }}>↓</b>
                                        )}
                                    </button>
                                )
                        )}
                    </div>
                </div>
                <div className={classes.resizer}>
                    {isResizable && (
                        <div
                            data-resizable={!!isResizable}
                            // data-resizable='toggle'
                            className={classes.resizeTrigger}
                            aria-hidden="true"
                        />
                    )}
                    <div className={classes.separator} />
                </div>
                {/* <div className={classes.separator}> */}
                {/*    {isResizable && ( */}
                {/*        <div */}
                {/*            data-resizable={!!isResizable} */}
                {/*            // data-resizable='toggle' */}
                {/*            className={classes.resizer} */}
                {/*            aria-hidden="true" */}
                {/*        /> */}
                {/*    )} */}
                {/* </div> */}
            </div>
        );
    }
);

export default TableHeadCell;
