import React from 'react';

import './button.scss';
import Ripple from '../Ripple/Ripple';

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
    onClick?: () => void;
    children: JSX.Element | string;
    isDisabled?: boolean;
    tabIndex?: number;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
    primary = false,
    size = 'medium',
    backgroundColor,
    children,
    isDisabled,
    tabIndex = 0
}: ButtonProps) => {
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return (
        <button
            type="button"
            className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
            style={{ backgroundColor }}
            tabIndex={isDisabled ? -1 : tabIndex}
        >
            {children}
            <Ripple />
        </button>
    );
};
