import React from 'react';
import Popover, { PopoverProps } from '../Popover/Popover';
import classes from './Tooltip.module.scss';

interface TooltipProps extends Omit<PopoverProps, 'content'> {
    // text: string;
    children: JSX.Element | string;
}

export default function Dropdown({children }: TooltipProps) {
    return <div>children</div>
    // return <Popover content={<div className={classes.container}></div>}  children={children}/>;
}

// export function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
//     const [show, setShow] = React.useState(false);
//
//     const open = React.useCallback(() => setShow(true), [setShow]);
//
//     return (
//         <Dropdown {...rest} show={show}>
//             {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */ }
//             <div onClick={open} className="tooltip-wrapper">
//                 {children}
//             </div>
//         </Dropdown>
//     );
// }
