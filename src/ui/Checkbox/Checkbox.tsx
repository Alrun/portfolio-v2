import React from 'react';

import classes from './Checkbox.module.scss';
import Ripple from '../Ripple/Ripple';
import { Button } from '../Button/Button';

export interface CheckboxProps {
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

const CheckboxIconChecked = () => (
    <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

const CheckboxIconUnChecked = () => (
    <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
);

/**
 * Primary UI component for user interaction
 */
export const Checkbox: React.FC<any> = ({
    value,
    isChecked,
    isRequired,
    isDisabled = false,
    isIndeterminate,
    name,
    onChange,

    primary = false,
    size = 'medium',
    backgroundColor,
    children,
    tabIndex = 0
}: any) => {
    const [checked, setChecked] = React.useState(!!isChecked);

    const rootRef = React.useRef<any>(null);
    const rippleRef = React.useRef<any>(null);

    const handleClick = (e: any) => {
        rippleRef.current.start(e);
        setChecked(!checked);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    return (
        <span className={classes.root} aria-disabled={isDisabled}>
            <input
                onClick={handleClick}
                onChange={handleChange}
                type="checkbox"
                name={name}
                value="tt"
                checked={checked}
                disabled={isDisabled}
                data-indeterminate={isIndeterminate ? 'true' : false}
                aria-label="labelText"
                aria-required="true"
                className={classes.input}
            />
            {checked ? <CheckboxIconChecked /> : <CheckboxIconUnChecked />}
            <Ripple ref={rippleRef} ripple="center" addClasses={classes.focus} />
        </span>
    );
};
