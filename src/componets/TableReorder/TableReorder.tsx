import React from 'react';

import { TableReorderProps } from './TableReorder.d';
import classes from './TableReorder.module.scss';
import headItemClasses from '../TableHeadItem/TableHeadItem.module.scss';
import TableHeadItem from '../TableHeadItem/TableHeadItem';

const TableReorder = ({ id, minWidth, bodyRef, headRef, handleReorder, children }: TableReorderProps) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const draggableItemsRef = React.useRef<HTMLDivElement[]>([]);

    const addDraggableItems = React.useCallback((node) => {
        const itemsIdList = draggableItemsRef.current.map((el) => el.dataset.id);

        if (node && !itemsIdList.includes(node.dataset.id)) draggableItemsRef.current.push(node);
    }, []);

    React.useEffect(() => {
        const container = rootRef.current?.parentElement;
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
            const onMouseMove = (e: any) => {
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
            };

            /**
             * Drag stop
             */
            const onMouseUp = (e: any) => {
                let dragTarget;

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
                    const currentDragTarget: HTMLDivElement | null = dragTarget.closest(`.${headItemClasses.root}`);

                    if (currentDragTarget) {
                        const isDraggable = !!currentDragTarget.querySelector(`.${headItemClasses.dragTrigger}`);

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
                                return { id: elId, order: Number(targetEl.order) };
                            }
                            /**
                             * Reordering intermediate blocks when dragged to the right
                             */
                            if (dragEl.order > targetEl.order && elOrder < dragEl.order && elOrder >= targetEl.order) {
                                return { id: elId, order: elOrder + 1 };
                            }
                            /**
                             * Reordering intermediate blocks when dragged to the left
                             */
                            if (dragEl.order < targetEl.order && elOrder > dragEl.order && elOrder <= targetEl.order) {
                                return { id: elId, order: elOrder - 1 };
                            }
                            /**
                             * Fallback
                             */
                            return { id: elId, order: elOrder };
                        });

                        if (isDraggable) handleReorder(defineOrders);
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

                draggableEl.classList.remove('drag-active');
                rootRef.current?.classList.remove('drag-group');
                headRef.current?.classList.remove('dragging');

                document.body.style.cursor = 'default';

                console.log('stop');
            };

            /**
             * Drag start
             */
            const onMousedown = (e: any) => {
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

                draggableEl.classList.add('drag-active');
                headRef.current?.classList.add('dragging');
                rootRef.current?.classList.add('drag-group');

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

                document.body.style.cursor = 'move';

                console.log('start');
            };

            const preventDefault = (e: any) => e.preventDefault();

            if (dragTrigger) {
                dragTrigger.addEventListener('dragstart', preventDefault);
                dragTrigger.addEventListener('mousedown', onMousedown);
                dragTrigger.addEventListener('touchstart', onMousedown);
            }

            return () => {
                if (dragTrigger) {
                    dragTrigger.removeEventListener('dragstart', preventDefault);
                    dragTrigger.removeEventListener('mousedown', onMousedown);
                    dragTrigger.removeEventListener('touchstart', onMousedown);
                }
            };
        });
    }, [bodyRef, handleReorder, headRef]);

    return (
        <div ref={rootRef} id={id} className={classes.root} style={{ minWidth: minWidth || 'auto' }}>
            {React.Children.map(children, (child) => (
                <TableHeadItem ref={addDraggableItems} {...child.props} />
            ))}
        </div>
    );
};

export default TableReorder;
