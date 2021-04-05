import React from 'react';

import classes from './TableHeadItem.module.scss';
import TableResize from '../TableResize/TableResize';
import TableHeadCell from '../TableHeadCell/TableHeadCell';

interface TableReorderItemProps {
    id: string;
    item: any;
    isDraggable: boolean;
    width: number;
    order: number;
    headRef: React.RefObject<HTMLDivElement>;
    bodyRef: React.RefObject<HTMLDivElement>;
    handleResize: any; // () => void;
}

const TableHeadItem = React.forwardRef<HTMLDivElement, TableReorderItemProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableHeadItemRef(
        { id, headRef, bodyRef, isDraggable, item, width, order, handleResize }: TableReorderItemProps,
        ref
    ) {
        const rootRef = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

        return (
            <div
                ref={rootRef}
                data-id={id}
                className={classes.dragItem}
                style={{
                    minWidth: width,
                    width,
                    maxWidth: width,
                    order
                }}
            >
                {isDraggable && (
                    <div className={classes.dragTrigger} aria-hidden="true">
                        <span className={classes.iconWrapper}>
                            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10.1538" y="1" width="3.84616" height="3.80953" fill="#AAAAAA" />
                                <rect x="4" y="7.09521" width="3.84616" height="3.80953" fill="#AAAAAA" />
                                <rect x="4" y="13.1905" width="3.84616" height="3.80953" fill="#AAAAAA" />
                                <rect x="10.1538" y="7.09521" width="3.84616" height="3.80953" fill="#AAAAAA" />
                                <rect x="4" y="1" width="3.84616" height="3.80953" fill="#AAAAAA" />
                            </svg>
                        </span>
                    </div>
                )}
                <TableHeadCell
                    // key={item.head[0].id}
                    id={id}
                    // isDraggable={item.reorderable && fixedColumns.length > 1}
                    item={item}
                    width={item.width}
                    align={item.align}
                    isResizable={item.resizable}
                    handleResize={handleResize}
                />
                <TableResize
                    id={id}
                    containerRef={rootRef}
                    bodyRef={bodyRef}
                    width={item.width}
                    handleResize={handleResize}
                />
            </div>
        );
    }
);

export default TableHeadItem;
