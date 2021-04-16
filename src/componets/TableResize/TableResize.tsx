import React from 'react';
import classes from './TableResize.module.scss';

interface TableResizeProps {
    id: string;
    width: number;
    minWidth?: number;
    containerRef: React.RefObject<HTMLDivElement>;
    headRef: React.RefObject<HTMLDivElement>;
    bodyRef: React.RefObject<HTMLDivElement>;
    paddingLeft?: number;
    handleResize: (id: string, width: number) => void;
}

const TableResize = ({
    id,
    width,
    minWidth = 50,
    headRef,
    bodyRef,
    containerRef,
    paddingLeft,
    handleResize
}: TableResizeProps) => {
    const rootRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const container: HTMLElement | null = containerRef.current;
        const resizeTrigger = rootRef.current;

        let initialX: number;
        let deltaX: number;

        const onMouseMove = (e: any) => {
            if (e.type === 'touchmove') {
                deltaX = e.changedTouches[0].clientX - initialX;
            } else {
                deltaX = e.clientX - initialX;
            }

            if (container) {
                /**
                 * Get the body column with the current id
                 */
                const cells: NodeListOf<HTMLDivElement> | undefined = bodyRef.current?.querySelectorAll(
                    `[data-id=${id}]`
                );
                /**
                 * Set width resized column
                 */
                if ((container.offsetWidth >= minWidth && deltaX > 0) || container.offsetWidth > minWidth) {
                    /**
                     * Apply new width for current resized header cell
                     */
                    container.style.width = `${width + deltaX}px`;
                    container.style.minWidth = `${width + deltaX}px`;
                    container.style.maxWidth = `${width + deltaX}px`;
                    /**
                     * Apply new width for body column
                     */
                    if (cells) {
                        cells.forEach((item) => {
                            item.style.width = `${width + deltaX}px`;
                            item.style.minWidth = `${width + deltaX}px`;
                            item.style.maxWidth = `${width + deltaX}px`;
                        });
                    }
                } else if (container.offsetWidth <= minWidth) {
                    /**
                     * Set min width for current resized header cell
                     */
                    container.style.width = `${minWidth}px`;
                    container.style.minWidth = `${minWidth}px`;
                    container.style.maxWidth = `${minWidth}px`;
                    /**
                     * Set min width for body column
                     */
                    if (cells) {
                        cells.forEach((item) => {
                            item.style.width = `${minWidth}px`;
                            item.style.minWidth = `${minWidth}px`;
                            item.style.maxWidth = `${minWidth}px`;
                        });
                    }
                }
                /**
                 * Change padding if there is a fixed column
                 */
                if (paddingLeft && !(container.offsetWidth < minWidth + 1)) {
                    if (headRef.current) {
                        headRef.current.style.paddingLeft = `${paddingLeft + deltaX}px`;
                    }

                    if (bodyRef.current) {
                        bodyRef.current.style.paddingLeft = `${paddingLeft + deltaX}px`;
                    }
                }
            }

            // console.log('move');
        };

        /**
         * Drag stop
         */
        const onMouseUp = (e: any) => {
            if (e.type === 'touchend') {
                window.removeEventListener('touchmove', onMouseMove);
                window.removeEventListener('touchend', onMouseUp);
            } else {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            }

            // if (resize.dragEl) {
            //     const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
            //     const id: string | undefined = currentCol?.dataset.colId;

            if (container) {
                handleResize(id, container.offsetWidth);
            }
            // }
            // /**
            //  * Remove classes head cells when drag stop
            //  */
            // columnItemsRef.current.forEach((el) => {
            //     el.classList.remove(classes.dragged);
            //     el.classList.remove(classes.draggedActive);
            // });
            //
            headRef.current?.classList.remove('dragging');
            container?.classList.remove('drag-active');

            document.body.style.cursor = 'auto';

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

            /**
             * Add class all head cells when drag start
             */
            // rootRef.current?.classList.add(classes.dragged);
            // /**
            //  * Add class of dragged head cell
            //  */
            // if (resize.dragEl) {
            //     const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-id]`);
            //
            //     currentCol?.classList.add(classes.draggedActive);
            // }
            //
            headRef.current?.classList.add('dragging');
            container?.classList.add('drag-active');
            document.body.style.cursor = 'col-resize';

            console.log('start');
        };

        const preventDefault = (e: any) => e.preventDefault();

        if (resizeTrigger) {
            resizeTrigger.addEventListener('dragstart', preventDefault);
            resizeTrigger.addEventListener('mousedown', onMousedown);
            resizeTrigger.addEventListener('touchstart', onMousedown);
        }

        return () => {
            if (resizeTrigger) {
                resizeTrigger.removeEventListener('dragstart', preventDefault);
                resizeTrigger.removeEventListener('mousedown', onMousedown);
                resizeTrigger.removeEventListener('touchstart', onMousedown);
            }
        };
    }, [bodyRef, containerRef, handleResize, headRef, id, minWidth, paddingLeft, width]);

    return <div className={classes.root} ref={rootRef} aria-hidden="true" />;
};

export default TableResize;
