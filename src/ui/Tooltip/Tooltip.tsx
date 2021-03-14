import React from 'react';
import Popover, { PopoverProps } from '../Popover/Popover';
import classes from './Tooltip.module.scss';

interface TooltipProps extends Omit<PopoverProps, 'content'> {
    text: string;
}

export default function Tooltip({ text, ...rest }: TooltipProps) {
    return <Popover content={<div className={classes.container}>{text}</div>} {...rest} />;
}

export function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
    const [show, setShow] = React.useState(false);

    const open = React.useCallback(() => setShow(true), [setShow]);
    const close = React.useCallback(() => setShow(false), [setShow]);

    return (
        <Tooltip {...rest} show={show}>
            <div onMouseEnter={open} onMouseLeave={close}>
                {children}
            </div>
        </Tooltip>
    );
}
