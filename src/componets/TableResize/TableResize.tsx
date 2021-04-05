import React from 'react';
import classes from './TableResize.module.scss';
import useDraggable from '../../hooks/useDraggable';

interface TableResizeProps {
    id: string;
    width: number;
    containerRef: React.RefObject<HTMLDivElement>;
    // headRef: React.RefObject<HTMLDivElement>;
    bodyRef: React.RefObject<HTMLDivElement>;
    handleResize: (id: string, width: number) => void;
}

const TableResize = ({ id, width, bodyRef, containerRef, handleResize }: TableResizeProps) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const resizeTriggerRef = React.useRef<HTMLDivElement>(null);

    const resize = useDraggable(resizeTriggerRef.current);
    /**
     * Resize column
     */
    React.useEffect(() => {
        if (resize.status === 'start') {
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
            document.body.style.cursor = 'col-resize';

            console.log('start', resize);
        }

        if (resize.status === 'move') {
            if (resize.dragEl) {
                // const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-id]`);
                // const id: string | undefined = currentCol?.dataset.colId;
                // const isFixed: boolean = !!currentCol?.closest(`.${classes.fixed}`);

                // currentCol.style.width =

                // const initialWidth = columns.filter((col: any) => col.head[0].id === id)[0].width;
                if (containerRef.current) {
                    containerRef.current.style.width = `${width + resize.deltaX}px`;
                    containerRef.current.style.minWidth = `${width + resize.deltaX}px`;
                    containerRef.current.style.maxWidth = `${width + resize.deltaX}px`;
                }

                const cells: NodeListOf<HTMLDivElement> | undefined = bodyRef.current?.querySelectorAll(
                    `[data-id=${id}]`
                );

                if (cells) {
                    cells.forEach((item) => {
                        item.style.width = `${width + resize.deltaX}px`;
                        item.style.minWidth = `${width + resize.deltaX}px`;
                        item.style.maxWidth = `${width + resize.deltaX}px`;
                    });
                }

                // if (id) {
                //     const initialWidth = columns.filter((col: any) => col.head[0].id === id)[0].width;
                //     const cells = tableRef.current.querySelectorAll(`[data-id=${id}]`);
                //
                //     cells.forEach((item: any) => {
                //         item.style.width = `${initialWidth + resize.deltaX}px`;
                //         item.style.minWidth = `${initialWidth + resize.deltaX}px`;
                //         item.style.maxWidth = `${initialWidth + resize.deltaX}px`;
                //     });
                //
                //     if (isFixed) {
                //         if (rootRef.current) {
                //             rootRef.current.style.paddingLeft = `${padding + resize.deltaX}px`;
                //         }
                //
                //         if (bodyRef.current) {
                //             bodyRef.current.style.paddingLeft = `${padding + resize.deltaX}px`;
                //         }
                //     }
                // }
            }
        }

        if (resize.status === 'stop') {
            // if (resize.dragEl) {
            //     const currentCol: HTMLElement | null = resize.dragEl.closest(`[data-col-id]`);
            //     const id: string | undefined = currentCol?.dataset.colId;

            if (containerRef.current) {
                handleResize(id, containerRef.current.offsetWidth);
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
            document.body.style.cursor = 'auto';

            console.log('stop ', resize);
        }
    }, [bodyRef, containerRef, handleResize, id, resize, width]);

    return (
        <>
            <div ref={rootRef} className={classes.root}>
                <div
                    className={classes.resizeTrigger}
                    // data-resizable={!!isResizable}
                    data-resizable="toggle"
                    ref={resizeTriggerRef}
                    aria-hidden="true"
                />

                <div className={classes.separator} />
            </div>
        </>
    );
};

export default TableResize;
