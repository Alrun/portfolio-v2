import React from 'react';

import classes from './TableHeadCell.module.scss';

export interface TableHeadProps {
    item: any;
    isDraggable?: boolean;
    isResizable?: boolean;
}

const TableHeadCell = React.forwardRef<HTMLDivElement, TableHeadProps>(
    ({ item, isDraggable, isResizable }: TableHeadProps, ref) => (
        <div
            ref={ref}
            data-col-id={item.head[0].id}
            data-draggable="container"
            className={classes.root}
            key={item.head[0].id}
            style={{
                minWidth: item.width,
                width: item.width,
                maxWidth: item.width,
                order: item.order
            }}
        >
            <div
                data-draggable="toggle"
                className={isDraggable ? classes.reorder : `${classes.reorder} ${classes.hidden}`}
                aria-hidden="true"
            />

            <span className={classes.ripple} />

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

            <div
                data-resizable="toggle"
                className={isResizable ? classes.resizer : `${classes.resizer} ${classes.hidden}`}
                aria-hidden="true"
            />
        </div>
    )
);

export default TableHeadCell;
