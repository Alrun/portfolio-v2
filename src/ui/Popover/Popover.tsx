import React from 'react';
import { Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';

import classes from './Popover.module.scss';
import useInterval from '../../hooks/useInterval';

export interface PopoverProps {
    content: React.ReactNode;
    show: boolean;
    children?: React.ReactNode;
    placement?: Placement;
}

export default function Popover({ content, show, children, placement = 'auto' }: PopoverProps) {
    const referenceElement = React.useRef<HTMLDivElement>(null);
    const popperElement = React.useRef<HTMLDivElement>(null);
    const arrowElement = React.useRef<HTMLDivElement>(null);


    const { styles, update, attributes } = usePopper(referenceElement.current, popperElement.current, {
        placement,
        strategy: 'fixed',
        modifiers: [
            { name: 'offset', options: { offset: [0, 8] } },
            { name: 'arrow', options: { element: arrowElement.current } }
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
            <div className={classes.target} ref={referenceElement}>
                {children}
            </div>

            {/* {ReactDOM.createPortal( */}
            <div
                className={show ? `${classes.container} ${classes.show}` : classes.container}
                // show={show ? }
                ref={popperElement}
                style={styles.popper}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...attributes.popper}
            >
                {content}
                <div
                    className={`arrow-${attributes.popper?.['data-popper-placement'] ?? 'Arrow'}`}
                    ref={arrowElement}
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
