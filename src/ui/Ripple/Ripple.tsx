import React from 'react';

import { RippleProps } from './Ripple.d';
import classes from './Ripple.module.scss';

const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function RippleRef({ ripple = 'default', addClasses = '' }: RippleProps, ref) {
        const rootRef = React.useRef<HTMLSpanElement>(null);

        const start = React.useCallback(
            (event) => {
                const button = event.currentTarget;
                const circle = document.createElement('span');
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                const radius = diameter / 2;

                if (rootRef.current) {
                    const { top, left, width, height } = rootRef.current.getBoundingClientRect();

                    const posX =
                        ripple === 'center'
                            ? Math.round(width / 2 - radius)
                            : Math.round(event.clientX - left - radius);
                    const posY =
                        ripple === 'center'
                            ? Math.round(height / 2 - radius)
                            : Math.round(event.clientY - top - radius);

                    // eslint-disable-next-line no-multi-assign
                    circle.style.width = circle.style.height = `${diameter}px`;
                    circle.style.left = `${posX}px`;
                    circle.style.top = `${posY}px`;
                    circle.classList.add(classes.ripple);
                }

                setTimeout(() => {
                    const el = rootRef.current?.getElementsByClassName(classes.ripple)[0];

                    if (el) {
                        el.remove();
                    }
                }, 1000);

                rootRef.current?.appendChild(circle);
            },
            [ripple]
        );

        React.useImperativeHandle(ref, () => ({ start } as any), [start]);

        return <span ref={rootRef} className={`${classes.root} ${addClasses}`} />;
    }
);

export default Ripple;
