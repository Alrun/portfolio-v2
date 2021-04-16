import React from 'react';
import { usePopper } from 'react-popper';

import classes from './TableHeadCell.module.scss';
import { TableHeadCellProps } from './TableHeadCell.d';

import Ripple from '../../ui/Ripple/Ripple';
import Tooltip, { MouseoverTooltip } from '../../ui/Tooltip/Tooltip';

const TableHeadCell = React.forwardRef<HTMLDivElement, any>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableHeadCellRef({ item, align = 'start' }: any, ref) {
        const rippleRef = React.useRef<any>(null);

        const rootRef = React.useRef<HTMLDivElement>(null);

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
                ref={rootRef}
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

// <div
//     data-id={child.props.id}
//     ref={addDraggableItems}
//     className={classes.dragItem}
//     style={{
//         minWidth: child.props.children.props.item.width,
//         width: child.props.children.props.item.width,
//         maxWidth: child.props.children.props.item.width,
//         order: child.props.children.props.item.order
//     }}
// >
