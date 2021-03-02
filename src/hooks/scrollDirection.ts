import React from 'react';

export default function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = React.useState<string | null>(null);
    const [prevOffset, setPrevOffset] = React.useState(0);

    const toggleScrollDirection = () => {
        const { scrollY } = window;

        if (scrollY === 0) {
            setScrollDirection(null);
        }

        if (scrollY > prevOffset) {
            setScrollDirection('down');
        } else if (scrollY < prevOffset) {
            setScrollDirection('up');
        }

        setPrevOffset(scrollY);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', toggleScrollDirection);

        return () => {
            window.removeEventListener('scroll', toggleScrollDirection);
        };
    });

    return scrollDirection;
}
