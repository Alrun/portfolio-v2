import React from 'react';

import classes from './Button.module.scss';
import Ripple from '../Ripple/Ripple';
import { RippleProps } from '../Ripple/Ripple.d';

export interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Optional click handler
     */
    color?: 'primary';
    onClick?: () => void;
    children: JSX.Element | string;
    isDisabled?: boolean;
    tabIndex?: number;
    addClasses?: string;
    ripple?: RippleProps['ripple'];
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
    primary = false,
    size = 'medium',

    color,
    ripple,
    backgroundColor,
    addClasses = '',
    children,
    isDisabled = false,
    tabIndex = 0
}: ButtonProps) => {
    const rootRef = React.useRef<any>(null);
    const rippleRef = React.useRef<any>(null);

    const handleClick = (e: any) => {
        rippleRef.current.start(e);
    };

    return (
        <button
            ref={rootRef}
            type="button"
            className={`${classes.root} ${addClasses}`}
            style={{ backgroundColor }}
            tabIndex={isDisabled ? -1 : tabIndex}
            disabled={isDisabled}
            onClick={handleClick}
        >
            {children}
            <Ripple ref={rippleRef} ripple={ripple} />
        </button>
    );
};
