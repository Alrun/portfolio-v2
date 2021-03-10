import React from 'react';

import classes from './TableHeadCell.module.scss';

export interface TableHeadRef {
    cellRef: React.RefObject<HTMLDivElement>;
    reorderRef: React.RefObject<HTMLDivElement>;
    resizeRef: React.RefObject<HTMLDivElement>;
}

export interface TableHeadProps {
    item: any;
}

const TableHeadCell = React.forwardRef<TableHeadRef, TableHeadProps>(({ item }: TableHeadProps, ref) => {
    const cellRef = React.useRef<HTMLDivElement>(null);
    const reorderRef = React.useRef<HTMLDivElement>(null);
    const resizeRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
        cellRef,
        reorderRef,
        resizeRef
    }));

    return (
        <div
            ref={cellRef}
            data-col-id={item.head[0].id}
            data-draggable="true"
            data-resizable="true"
            className={classes.root}
            key={item.head[0].id}
            style={{
                minWidth: item.width,
                width: item.width,
                maxWidth: item.width,
                order: item.order
            }}
        >
            <div ref={reorderRef} className={classes.reorder} aria-hidden="true" />

            <div className={classes.container}>
                <div className={classes.actions}>
                    <button className={classes.dropdown} type="button" aria-label="toggle-dropdown" />
                </div>
                <div className={classes.labels}>
                    {item.head.map(
                        (el: any) =>
                            el.id && (
                                <button data-button-id={el.id} className={classes.button} key={el.id} type="button">
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

            <div ref={resizeRef} className={classes.resizer} aria-hidden="true" />
        </div>
    );
});

export default TableHeadCell;
