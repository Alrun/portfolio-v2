import React from 'react';
import './button.scss';

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
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
    // eslint-disable-next-line react/prop-types
    primary = false,
    // eslint-disable-next-line react/prop-types
    size = 'medium',
    // eslint-disable-next-line react/prop-types
    backgroundColor,
    // eslint-disable-next-line react/prop-types
    label,
    ...props
}) => {
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
    return (
        <button
            type="button"
            className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
            style={{ backgroundColor }}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
        >
            {label}
        </button>
    );
};
