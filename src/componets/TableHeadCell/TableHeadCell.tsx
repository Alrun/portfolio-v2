import React from 'react';
import { usePopper } from 'react-popper';

import classes from './TableHeadCell.module.scss';
import Ripple from '../../ui/Ripple/Ripple';
import Tooltip, { MouseoverTooltip } from '../../ui/Tooltip/Tooltip';

export interface TableHeadProps {
    item: any;
    isDraggable?: boolean;
    isResizable?: boolean;
    side?: 'start' | 'end';
}

const TableHeadCell = React.forwardRef<HTMLDivElement, TableHeadProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableHeadCellRef({ item, isDraggable, isResizable, side = 'start' }: TableHeadProps, ref) {
        const handleClick = (e: any) => console.log(e.currentTarget.dataset.buttonId);
        const handleDropdown = (e: any) => console.log('dropdown');

        return (
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
                    // data-draggable={isDraggable ? 'toggle' : false}
                    className={isDraggable ? classes.reorder : `${classes.reorder} ${classes.hidden}`}
                    // className={classes.reorder}
                    aria-hidden="true"
                >
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

                <Ripple>
                    <div className={classes.container}>
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
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect x="7" y="13.1905" width="4" height="3.80952" fill="inherit" />
                                        <rect x="7" y="7.09521" width="4" height="3.80952" fill="inherit" />
                                        <rect x="7" y="1" width="4" height="3.80952" fill="inherit" />
                                    </svg>
                                </span>
                            </button>
                        </div>

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
                </Ripple>
                <div
                    data-resizable={isResizable ? 'toggle' : false}
                    // data-resizable='toggle'
                    className={classes.resizer}
                    aria-hidden="true"
                />
            </div>
        );
    }
);

export default TableHeadCell;
