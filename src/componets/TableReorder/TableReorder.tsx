import React from 'react';

import classes from './TableReorder.module.scss';
import headItemClasses from '../TableHeadItem/TableHeadItem.module.scss';
import TableHeadItem from '../TableHeadItem/TableHeadItem';

interface TableReorderProps {
    id: string;
    width: number;
    headRef: React.RefObject<HTMLDivElement>;
    bodyRef: React.RefObject<HTMLDivElement>;
    handleReorder: (orders: any) => void;
    children: JSX.Element | JSX.Element[];
}

const TableReorder = ({ id, width, bodyRef, headRef, handleReorder, children }: TableReorderProps) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const draggableItemsRef = React.useRef<HTMLDivElement[]>([]);
    const rendersCount = React.useRef(0);

    const addDraggableItems = React.useCallback((node) => {
        if (node) draggableItemsRef.current.push(node);
    }, []);

    React.useEffect(() => {
        if (!draggableItemsRef.current) return;

        const container = rootRef.current?.parentElement;
        const otherScopesItems = headRef.current?.querySelectorAll(`.${classes.root}:not(#${id}) .${classes.dragItem}`);
        const scopeIdList: string[] = [];
        /**
         * Define IDs of dragged items in the current container
         */
        draggableItemsRef.current.forEach((item) => {
            if (item.dataset.id) scopeIdList.push(item.dataset.id);
        });

        draggableItemsRef.current.forEach((draggableEl) => {
            let initialX: number;
            let deltaX: number;

            const dragTrigger = draggableEl.querySelector(`.${headItemClasses.dragTrigger}`);
            const draggableNotCurrent = draggableItemsRef.current.filter(
                (el) => el.dataset.id !== draggableEl.dataset.id
            );
            /**
             * Drag move
             */
            function onMouseMove(e: any) {
                if (e.type === 'touchmove') {
                    deltaX = e.changedTouches[0].clientX - initialX;
                } else {
                    deltaX = e.clientX - initialX;
                }
                /**
                 * Move dragged column overlay
                 */
                const orderOverlay = bodyRef.current?.querySelector(`.${classes.overlay}`);

                if (orderOverlay instanceof HTMLElement) {
                    orderOverlay.style.transform = `translate(${deltaX}px, 0px)`;
                }
                /**
                 * Apply drag effect for current head cell
                 */
                draggableEl.style.transform = `translate(${deltaX}px, 0)`;
                /**
                 * Add class to highlight target column when dragging to the right or left
                 */
                const bodyCellsScope: NodeListOf<HTMLElement> | undefined = bodyRef.current?.querySelectorAll(
                    '[data-id]'
                );

                if (bodyCellsScope) {
                    [...bodyCellsScope]
                        .filter((item) => (item.dataset.id ? scopeIdList.includes(item.dataset.id) : false))
                        .forEach((item: any) => {
                            const correction = -1; // Border corrected delta
                            const right =
                                deltaX >= 0 &&
                                initialX + deltaX + correction > item.getBoundingClientRect().left &&
                                initialX + deltaX + correction < item.getBoundingClientRect().left + item.offsetWidth;
                            const left =
                                deltaX < 0 &&
                                initialX + deltaX - correction > item.getBoundingClientRect().left &&
                                initialX + deltaX - correction < item.getBoundingClientRect().left + item.offsetWidth;

                            if (right) {
                                item.classList.add(classes.activeRight);
                                /**
                                 * Add class to highlight for dragged column
                                 */
                                if (deltaX < draggableEl.offsetWidth && item.dataset.id === draggableEl?.dataset.id) {
                                    item.classList.add(classes.activeLeft);
                                }
                            } else if (left) {
                                item.classList.add(classes.activeLeft);
                            } else {
                                item.classList.remove(classes.activeLeft);
                                item.classList.remove(classes.activeRight);
                            }
                        });
                }
            }

            /**
             * Drag stop
             */
            function onMouseUp(e: any) {
                let dragTarget;

                draggableEl.style.pointerEvents = 'none';

                if (e.type === 'touchend') {
                    dragTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

                    window.removeEventListener('touchmove', onMouseMove);
                    window.removeEventListener('touchend', onMouseUp);
                } else {
                    dragTarget = document.elementFromPoint(e.clientX, e.clientY);

                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                }

                if (dragTarget) {
                    const currentDragTarget: HTMLDivElement | null = dragTarget.closest(`.${headItemClasses.dragItem}`);

                    if (currentDragTarget) {
                        const dragEl = {
                            id: draggableEl.dataset.id,
                            order: Number(draggableEl.style.order)
                        };

                        const targetEl = {
                            id: currentDragTarget.dataset.id,
                            order: Number(currentDragTarget.style.order)
                        };

                        const defineOrders = draggableItemsRef.current.map((item) => {
                            const elId: string | undefined = item?.dataset.id;
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
                        // const dragElContainer = drag.dragEl.closest(`.${classes.fixed}`);
                        // const targetElContainer = drag.targetEl.closest(`.${classes.fixed}`);

                        handleReorder(defineOrders);
                    }
                }
                /**
                 * Set initial styles for drag column
                 */
                draggableEl.style.transform = 'none';
                draggableEl.style.zIndex = 'auto';
                draggableEl.style.opacity = '1';
                /**
                 * Remove overlay columns
                 */
                const targetOverlays = rootRef.current?.querySelectorAll(`.${classes.targetOverlay}`);

                if (targetOverlays) {
                    targetOverlays.forEach((item) => item.remove());
                }

                const cells: NodeListOf<HTMLElement> | undefined = bodyRef.current?.querySelectorAll(`[data-id]`);

                if (cells) {
                    cells.forEach((item) => {
                        item.classList.remove(classes.targetOverlay);
                        item.classList.remove(classes.activeLeft);
                        item.classList.remove(classes.activeRight);
                    });
                }
                /**
                 * Remove drag column overlay
                 */
                const draggableOverlay: NodeListOf<HTMLElement> | undefined = bodyRef.current?.querySelectorAll(
                    `.${classes.overlay}`
                );

                if (draggableOverlay) {
                    draggableOverlay.forEach((item) => item.remove());
                }

                bodyRef.current?.querySelectorAll(`[data-id="${draggableEl.dataset.id}"]`).forEach((item: any) => {
                    item.style.backgroundColor = 'inherit';
                });

                draggableEl.classList.remove(classes.dragged);

                // const currentColCells = [...cells].filter(
                //     (item) => drag.dragEl && item.dataset.colId === drag.dragEl.dataset.colId
                // );
                // /**
                //  * Set new styles for head cell in dragged column
                //  */
                // currentColCells[0].style.zIndex = 'auto';
                // currentColCells[0].style.left = `0px`;
                // currentColCells[0].style.opacity = '1';
                // /**
                //  * Set initial background cells in dragged column
                //  */
                // currentColCells.forEach((cel: any) => {
                //     cel.style.backgroundColor = 'initial';
                // });
                //
                // currentColCells[0].classList.remove(headCellClasses.dragged);
                // }

                // const draggedCol: HTMLDivElement | null = drag.dragEl.closest('[data-col-id]');

                // rootRef.current?.classList.remove(classes.reordering);
                document.body.style.cursor = 'default';
                draggableEl.style.pointerEvents = 'auto';

                otherScopesItems?.forEach((item: any) => {
                    item.classList.remove(classes.dragged);
                    item.style.cursor = 'auto';
                });
            }

            /**
             * Drag start
             */
            function onMousedown(e: any) {
                if (e.type === 'touchstart') {
                    initialX = e.changedTouches[0].clientX;

                    window.addEventListener('touchmove', onMouseMove);
                    window.addEventListener('touchend', onMouseUp);
                } else {
                    if (e.button !== 0) return; // only left mouse button

                    initialX = e.clientX;

                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                }

                draggableEl.style.zIndex = '1000';
                draggableEl.style.opacity = '0.5';
                // draggableEl.style.pointerEvents = 'none';
                draggableEl.classList.add(classes.dragged);
                /**
                 * Highlight body reorder column cells
                 */
                bodyRef.current?.querySelectorAll(`[data-id="${draggableEl.dataset.id}"]`).forEach((item: any) => {
                    item.style.backgroundColor = '#ececec';

                    item.classList.add(classes.activeLeft);
                });
                /**
                 * Create overlay for dragged column
                 */
                if (bodyRef.current && !bodyRef.current?.querySelector(`.${classes.overlay}`)) {
                    const orderOverlay: HTMLDivElement = document.createElement('div');

                    orderOverlay.classList.add(classes.overlay);
                    orderOverlay.style.width = `${draggableEl.offsetWidth}px`;
                    orderOverlay.style.left = `${draggableEl.offsetLeft}px`;

                    if (container?.scrollLeft) {
                        orderOverlay.style.left = `${draggableEl.offsetLeft - bodyRef.current.scrollLeft}px`;
                    } else {
                        orderOverlay.style.left = `${draggableEl.offsetLeft}px`;
                    }

                    bodyRef.current.append(orderOverlay);
                }
                /**
                 * Add overlay columns for correct drag target all over the screen
                 */
                draggableNotCurrent.forEach((item) => {
                    const colOverlay = document.createElement('div');
                    const parent: HTMLElement | null | undefined = bodyRef.current?.parentElement;
                    const offset = item.offsetLeft + (parent?.offsetLeft || 0);

                    colOverlay.classList.add(classes.targetOverlay);
                    colOverlay.style.width = `${item.offsetWidth}px`;

                    if (container?.scrollLeft) {
                        colOverlay.style.left = `${offset - (bodyRef.current ? bodyRef.current.scrollLeft : 0)}px`;
                    } else {
                        colOverlay.style.left = `${offset}px`;
                    }

                    item.appendChild(colOverlay);
                });

                otherScopesItems?.forEach((item: any) => {
                    item.classList.add(classes.dragged);
                    item.style.cursor = 'not-allowed';
                });

                document.body.style.cursor = 'move';

                console.log('start');
            }

            if (dragTrigger) {
                dragTrigger.addEventListener('dragstart', (e) => e.preventDefault());
                dragTrigger.addEventListener('mousedown', onMousedown);
                dragTrigger.addEventListener('touchstart', onMousedown);
            }
        });
    }, [bodyRef, handleReorder, headRef, id]);

    return (
        <>
            <div ref={rootRef} id={id} className={classes.root} style={{minWidth: width}}>
                {React.Children.map(children, (child) => <TableHeadItem ref={addDraggableItems} {...child.props} />)}
            </div>
            <b style={{ position: 'absolute', top: '80px' }}>
                {/* eslint-disable-next-line no-plusplus */}
                Droppable RENDER COUNT: {++rendersCount.current}
            </b>
        </>
    );
};

export default TableReorder;
