import React from 'react';
import { useSpring, animated, config, useTransition } from 'react-spring';
import classes from './Collapse.module.scss';

// export function useHeight({ on = true /* no value means on */ } = {} as any) {
//     const ref = React.useRef<any>();
//     const [height, set] = React.useState(0);
//     const heightRef = React.useRef(height);
//     const [ro] = React.useState(
//         () =>
//             new ResizeObserver((packet) => {
//                 if (ref.current && heightRef.current !== ref.current.offsetHeight) {
//                     heightRef.current = ref.current.offsetHeight;
//                     set(ref.current.offsetHeight);
//                 }
//             })
//     );
//     React.useLayoutEffect(() => {
//         if (on && ref.current) {
//             set(ref.current.offsetHeight);
//             ro.observe(ref.current, {});
//         }
//         return () => ro.disconnect();
//     }, [on, ref.current]);
//     return [ref, height as any];
// }

const Collapse: React.FC<any> = ({ show, children }: any) => {
    // const [height, setHeight] = React.useState(0);
    // const [expand, setExpand] = React.useState(false);
    // const [heightRef, height] = useHeight();

    const rootRef = React.useRef<HTMLDivElement>(null);
    const height = React.useRef(0);

    const transitions = useTransition(show, {
        from: { life: '100%', maxHeight: 0, opacity: 0 },
        // enter: { maxHeight: height, opacity: 1, onChange: (frame: any) => {
        //     frame.value.maxHeight = 50
        //         // Per-item event listeners
        //         console.log('onChange:', frame)
        //     }, },
        keys: (item) => item.key,
        leave: [{ opacity: 0 }, { maxHeight: 0 }],
        enter: (item) => async (next, cancel) => {
            await next({ life: '100%', maxHeight: height });
            await next({ maxHeight: height, opacity: 1 });
        },
        reverse: show,
        delay: 200,
        // config: config.gentle,
        // delay: 200,
        config: show ? { duration: 350 } : { duration: 250 }
        // onRest: () => set(!toggle),
    });

    // React.useEffect(() => {
    //     console.log(height);
    //     if (show && rootRef.current) {
    //         // console.log(rootRef.current.offsetHeight);
    //
    //         setHeight(rootRef.current.offsetHeight);
    //         // setExpand(show);
    //     }
    // }, [height, show]);

    return transitions(
        (styles, item, t, i) =>
            item && (
                <animated.div className={classes.container} style={ styles }>
                    <div ref={rootRef}>{ children }</div>
                </animated.div>
            )
    );
};

export default Collapse;
