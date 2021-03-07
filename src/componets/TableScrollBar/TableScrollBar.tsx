import React from 'react';

import classes from './TableScrollBar.module.scss';


export default function TableScrollBar({columns, setRef}: any) {

    // const rootRef = React.useRef<HTMLDivElement>(null);
    // const headRef = React.useRef<HTMLDivElement>(null);
    // const bodyRef = React.useRef<HTMLDivElement>(null);
    // const scrollRef = React.useRef<HTMLDivElement>(null);

    // const handleScrollEvent = (e: any) => {
    //     const headWrapper = headRef.current?.children[0] as HTMLElement;
    //     const body = bodyRef.current as HTMLElement;
    //
    //     if ('ontouchstart' in document.documentElement) {
    //         headWrapper.scrollLeft = e.target.scrollLeft;
    //     } else {
    //         body.scrollLeft = e.target.scrollLeft;
    //         headWrapper.scrollLeft = e.target.scrollLeft;
    //     }
    // };
    //
    // React.useEffect(() => {
    //     setRef(scrollRef);
    // //     const body = bodyRef.current;
    // //     const scroll = scrollRef.current;
    // //
    // //     if ('ontouchstart' in document.documentElement) {
    // //         if (body) {
    // //             body.style.overflow = 'auto';
    // //             body.addEventListener('scroll', handleScrollEvent, { passive: true });
    // //         }
    // //     } else if (scroll) {
    // //         scroll.addEventListener('scroll', handleScrollEvent, { passive: true });
    // //     }
    // //
    // //     return (): void => {
    // //         if ('ontouchstart' in document.documentElement) {
    // //             if (body) {
    // //                 body.removeEventListener('scroll', handleScrollEvent);
    // //             }
    // //         } else if (scroll) {
    // //             scroll.removeEventListener('scroll', handleScrollEvent);
    // //         }
    // //     };
    // }, [setRef]);

    return (
        <div ref={(el) => setRef(el)} className={classes.footerWrapper}>
            <div>1111</div>
            <div
                className={classes.scrollBar}
                style={{
                    width: `${columns.reduce((acc: any, cur: any) => {
                        if (!cur.isHidden && !cur.isFixed) {
                            return acc + cur.width;
                        }
                        return acc;
                    }, 350)}px`
                }}
            />
        </div>
    );
}
