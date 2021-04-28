import React from 'react';
import Tippy from '@tippyjs/react';
// import { TooltipProps, TooltipChildProps } from './Tooltip.d';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tippy.js/dist/tippy.css';

const Child = React.forwardRef<HTMLElement, any>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TooltipChildRef({ children }: any, ref) {
        return <>{React.cloneElement(children, { ref })}</>;
    }
);

export default function Popover({ content, children, interactive = false, hideOnClick = false }: any) {
    const childRef = React.useRef<HTMLElement>(null);

    return (
        <Tippy content={content} reference={childRef} interactive={interactive} hideOnClick={hideOnClick}>
            <Child ref={childRef}>{children}</Child>
        </Tippy>
    );
}
