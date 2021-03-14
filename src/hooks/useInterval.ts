import React from 'react';

export default function useInterval(callback: () => void, delay: null | number, leading = true) {
    const savedCallback = React.useRef<() => void>();
    /**
     * Remember the latest callback
     */
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    /**
     * Set up the interval
     */
    React.useEffect(() => {
        let id: NodeJS.Timeout;

        function tick() {
            const { current } = savedCallback;

            if (current) current();
        }

        if (delay !== null) {
            if (leading) tick();
            id = setInterval(tick, delay);
        }

        return () => {
            if (delay !== null) clearInterval(id);
        };
    }, [delay, leading]);
}
