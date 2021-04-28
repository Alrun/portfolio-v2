import React from 'react';
import clsx from 'clsx';

import classes from './Button.module.scss';
import { ButtonProps } from './Button.d';
import Ripple from '../Ripple/Ripple';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function ButtonRef(
        {
            variant = 'default',
            color = 'primary',
            size = 'medium',
            iconStart,
            iconEnd,
            ripple = 'default',
            href,
            style,
            onClick,
            children,
            isDisabled = false,
            tabIndex = 0
        }: ButtonProps,
        ref
    ) {
        const rootRef = React.useRef<any>(null);
        const rippleRef = React.useRef<any>(null);

        React.useImperativeHandle(ref, () => rootRef.current as HTMLButtonElement);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            /**
             * Disable anchor behaviour
             */
            e.preventDefault();

            if (ripple) rippleRef.current.start(e);
            if (onClick) onClick(e);
        };

        /**
         * Disable drag effect for anchor element
         */
        React.useEffect(() => {
            const el = rootRef.current;
            const preventDefault = (e: any) => e.preventDefault();

            if (href && el) el.addEventListener('dragstart', preventDefault);

            return () => {
                if (href && el) el.removeEventListener('dragstart', preventDefault);
            };
        }, [href]);

        return (
            <>
                {href ? (
                    <a
                        href={href}
                        ref={rootRef}
                        className={clsx(
                            classes.root,
                            classes[variant],
                            classes[size],
                            classes[color],
                            !React.Children.count(children) && classes.rounded,
                            isDisabled && classes.disabled
                        )}
                        style={style}
                        tabIndex={isDisabled ? -1 : tabIndex}
                        onClick={handleClick}
                    >
                        <span className={classes.label}>
                            {iconStart && (
                                <span
                                    className={clsx(classes.icon, React.Children.count(children) && classes.iconStart)}
                                >
                                    {iconStart}
                                </span>
                            )}
                            {children}
                            {iconEnd && (
                                <span className={clsx(classes.icon, React.Children.count(children) && classes.iconEnd)}>
                                    {iconEnd}
                                </span>
                            )}
                        </span>

                        <Ripple
                            ref={rippleRef}
                            ripple={!React.Children.count(children) ? 'center' : ripple}
                            addClasses={classes.background}
                        />
                    </a>
                ) : (
                    <button
                        ref={rootRef}
                        type="button"
                        className={clsx(
                            classes.root,
                            classes[variant],
                            classes[size],
                            classes[color],
                            !React.Children.count(children) && classes.rounded,
                            isDisabled && classes.disabled
                        )}
                        style={style}
                        disabled={isDisabled}
                        tabIndex={isDisabled ? -1 : tabIndex}
                        onClick={handleClick}
                    >
                        <span className={classes.label}>
                            {iconStart && (
                                <span
                                    className={clsx(classes.icon, React.Children.count(children) && classes.iconStart)}
                                >
                                    {iconStart}
                                </span>
                            )}
                            {children}
                            {iconEnd && (
                                <span className={clsx(classes.icon, React.Children.count(children) && classes.iconEnd)}>
                                    {iconEnd}
                                </span>
                            )}
                        </span>

                        <Ripple
                            ref={rippleRef}
                            ripple={!React.Children.count(children) ? 'center' : ripple}
                            addClasses={classes.background}
                        />
                    </button>
                )}
            </>
        );
    }
);

export default Button;
