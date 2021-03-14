import React from 'react';
import ReactDOM from 'react-dom';
import { Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';

import classes from './Popover.module.scss';
import useInterval from '../../hooks/useInterval';

export interface PopoverProps {
    content: React.ReactNode;
    show: boolean;
    children: React.ReactNode;
    placement?: Placement;
}

export default function Popover({ content, show, children, placement = 'auto' }: PopoverProps) {
    const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(null);

    const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        strategy: 'fixed',
        modifiers: [
            { name: 'offset', options: { offset: [0, 8] } },
            { name: 'arrow', options: { element: arrowElement } }
        ]
    });

    const updateCallback = React.useCallback(() => {
        if (update) {
            console.log('popover updated');
            update();
        }
    }, [update]);

    useInterval(updateCallback, show ? 1000 : null);

    return (
        <>
            <div className={classes.target} ref={setReferenceElement as any}>
                {children}
            </div>

            {/* {ReactDOM.createPortal( */}
            <div
                className={show ? `${classes.container} ${classes.show}` : classes.container}
                // @ts-ignore
                show={show}
                ref={setPopperElement as any}
                style={styles.popper}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...attributes.popper}
            >
                {content}
                <div
                    className={`arrow-${attributes.popper?.['data-popper-placement'] ?? 'Arrow'}`}
                    ref={setArrowElement as any}
                    style={styles.arrow}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...attributes.arrow}
                />
            </div>
            {/* document.body */}
            {/* )} */}
        </>
    );
}
