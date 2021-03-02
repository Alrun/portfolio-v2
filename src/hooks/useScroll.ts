import React from 'react';
import throttle from 'lodash/throttle';

export const getDocHeight = (): number =>
    Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );

export const calculateScrollDistance = (): number => {
    const scrollTop = window.pageYOffset; // how much the user has scrolled by
    const winHeight = window.innerHeight;
    const docHeight = getDocHeight();
    const totalDocScrollLength = docHeight - winHeight;

    return Math.floor((scrollTop / totalDocScrollLength) * 100);
};

// const HideOnScroll = ({ children }: NavbarInterface): JSX.Element => {
//     const [scrollDistance, setScrollDistance] = React.useState<number>(0);
//     const scrollDown = useScrollTrigger({ threshold: 60 });
//     const trigger = scrollDown ? false : scrollDistance < 90;
//
//     React.useEffect(() => {
//         const handler = throttle(
//             () => {
//                 requestAnimationFrame(() => {
//                     setScrollDistance(isBrowser ? calculateScrollDistance() : 0);
//                 });
//             },
//             500,
//             { leading: true }
//         );
//
//         document.addEventListener('scroll', handler);
//
//         return (): void => {
//             document.removeEventListener('scroll', handler);
//         };
//     });
//
//     return (
//         <Slide appear={false} direction="down" in={trigger}>
//         {children}
//         </Slide>
// );
// };

interface ScrollState {
    scrollDirection: string | null;
    // prevOffset: number;
    position: {
        x: number;
        y: number;
    };
}

export default function useScroll(
    targetElement: any,
    // container: any,
    delay: number = 0
): ScrollState {
    const [state, setState] = React.useState<ScrollState>({
        scrollDirection: null,
        // prevOffset: 0,
        position: {
            x: 0,
            y: 0
        }
    });

    // console.log(target, container, delay);

    // const targetEl = target?.current;
    // const containerEl = container?.current ? container?.current : document.body;
    //
    // const getClientRect = (element?: HTMLElement) => element?.getBoundingClientRect();

    // const targetPosition = getClientRect(element?.current || document.body);
    // const containerPosition = getClientRect(boundingElement?.current);

    // const getScrollPosition

    // const [scrollDirection, setScrollDirection] = React.useState<string | null>(null);
    // const [prevOffset, setPrevOffset] = React.useState(0);
    // const [position, setPosition] = React.useState<{ x: number; y: number }>({
    //     x: 0,
    //     y: 0
    // });

    // const toggleScrollDirection = () => {
    //     const { scrollY } = window;
    //
    //     if (scrollY === 0) {
    //         setScrollDirection(null);
    //     }
    //
    //     if (scrollY > prevOffset) {
    //         setScrollDirection('down');
    //     } else if (scrollY < prevOffset) {
    //         setScrollDirection('up');
    //     }
    //
    //     setPrevOffset(scrollY);
    // };
    // const isBrowser = typeof window !== `undefined`;
    const zeroPosition = { x: 0, y: 0 };

    // const getScrollPosition = ({ element, useWindow, boundingElement }: any) => {
    //     // if (!isBrowser) {
    //     //     return zeroPosition;
    //     // }
    //
    //     if (useWindow) {
    //         return { x: window.scrollX, y: window.scrollY };
    //     }
    //
    //     const targetPosition = getClientRect(element?.current || document.body);
    //     const containerPosition = getClientRect(boundingElement?.current);
    //
    //     if (!targetPosition) {
    //         return zeroPosition;
    //     }
    //
    //     return containerPosition
    //         ? {
    //               x: (containerPosition.x || 0) - (targetPosition.x || 0),
    //               y: (containerPosition.y || 0) - (targetPosition.y || 0)
    //           }
    //         : { x: targetPosition.left, y: targetPosition.top };
    // };

    React.useLayoutEffect(() => {
        const el = targetElement ? targetElement.current : null;

        const handleScrollEvent = /* throttle( */
            () => {
                if (el) {
                    setState({
                        scrollDirection: null,
                        position: {
                            x: el.scrollLeft,
                            y: el.scrollTop
                        }
                    });
                } else {
                    setState({
                        scrollDirection: null,
                        position: {
                            x: window.scrollX,
                            y: window.scrollY
                        }
                    });
                }
            };
            /* delay,
            { leading: true } */
        // );

        if (el) {
            el.addEventListener('scroll', handleScrollEvent, { passive: true });
        } else {
            window.addEventListener('scroll', handleScrollEvent, { passive: true });
        }

        return (): void => {
            if (el) {
                el.removeEventListener('scroll', handleScrollEvent);
            } else {
                window.removeEventListener('scroll', handleScrollEvent);
            }
        };
    }, [delay, targetElement]);

    // const handler = () => {
    //     if (root) {
    //         setState({
    //             ...state,
    //             position: {
    //                 x: root.scrollLeft,
    //                 y: root.scrollTop
    //             }
    //         });
    //     } else {
    //         setState({
    //             ...state,
    //             position: {
    //                 x: window.scrollX,
    //                 y: window.scrollY
    //             }
    //         });
    //     }
    // };

    // highlight-starts
    // const debouncedSave = React.useCallback(
    //     throttle(() => handler(), 1000),
    //     [] // will be created only once initially
    // );
    // highlight-ends

    // React.useEffect(() => {
    //     if (root) {
    //         root.addEventListener('scroll', debouncedSave);
    //         // on(ref.current, 'scroll', handler, {
    //         //     capture: false,
    //         //     passive: true
    //         // });
    //     } else {
    //         window.addEventListener('scroll', debouncedSave);
    //     }
    //
    //     return () => {
    //         if (root) {
    //             root.addEventListener('scroll', debouncedSave);
    //             // off(ref.current, 'scroll', handler);
    //         } else {
    //             window.removeEventListener('scroll', debouncedSave);
    //         }
    //     };
    // }, [ref, root, state]);

    // React.useEffect(() => {
    //     window.addEventListener('scroll', toggleScrollDirection);
    //
    //     return () => {
    //         window.removeEventListener('scroll', toggleScrollDirection);
    //     };
    // });

    return state;
}
