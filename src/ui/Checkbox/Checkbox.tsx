import React from 'react';
import clsx from 'clsx';

import { CheckboxProps } from './Checkbox.d';
import classes from './Checkbox.module.scss';
import Ripple from '../Ripple/Ripple';

const renderIcon = (type: string, check: boolean) => {
    switch (type) {
        case 'indeterminate':
            return (
                <svg className={classes.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
                </svg>
            );
        default:
            return check ? (
                <svg className={classes.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            ) : (
                <svg className={classes.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
            );
    }
};

const Checkbox: React.FC<CheckboxProps> = ({
    variant = 'default',
    color = 'primary',
    value = '',
    name = '',
    isChecked = false,
    isRequired = false,
    isDisabled = false,
    ripple = true,
    onChange,
    children
}: CheckboxProps) => {
    const [checked, setChecked] = React.useState(!!isChecked);
    const rippleRef = React.useRef<any>(null);

    const handleClick = (e: any) => {
        if (ripple) rippleRef.current.start(e);

        setChecked(!checked);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);

        console.log(e.target.value);
    };

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className={clsx(classes.label, isDisabled && classes.disabled)}>
                <span className={clsx(classes.checkbox, classes[color])} aria-disabled={isDisabled}>
                    <input
                        onClick={handleClick}
                        onChange={handleChange}
                        type="checkbox"
                        name={name}
                        value={value}
                        checked={checked}
                        disabled={isDisabled}
                        required={isRequired}
                        data-indeterminate={variant === 'indeterminate'}
                        // aria-label="labelText"
                        // aria-required="true"
                        className={classes.input}
                    />
                    {renderIcon(variant, checked)}
                    <Ripple ref={rippleRef} ripple="center" addClasses={classes.background} />
                </span>
                {children && <span className={classes.child}>{children}</span>}
            </label>
        </>
    );
};

export default Checkbox;
