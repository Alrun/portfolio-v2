import React from 'react';

interface DraggableState {
    dragEl: HTMLElement | null;
    targetEl: HTMLElement | null;
    initialX: number;
    initialY: number;
    deltaX: number;
    deltaY: number;
    status: 'start' | 'move' | 'stop' | null;
}

export default function useDraggable(ref: React.RefObject<HTMLElement[]>, selector: string) {
    const [state, setState] = React.useState<DraggableState>({
        dragEl: null,
        targetEl: null,
        initialX: 0,
        initialY: 0,
        deltaX: 0,
        deltaY: 0,
        status: null
    });

    React.useEffect(() => {
        const draggableList = ref.current;

        if (!draggableList) return;

        draggableList.forEach((draggableEl) => {
            const el: HTMLElement | null = draggableEl.getAttribute(selector)
                ? draggableEl
                : draggableEl.closest(selector);

            let initialX: number;
            let initialY: number;
            let deltaX: number;
            let deltaY: number;

            function onMouseMove(e: any) {
                if (e.type === 'touchmove') {
                    deltaX = e.changedTouches[0].clientX - initialX;
                    deltaY = e.changedTouches[0].clientY - initialY;
                } else {
                    deltaX = e.clientX - initialX;
                    deltaY = e.clientY - initialY;
                }

                if (el) {
                    setState({
                        dragEl: el,
                        targetEl: null,
                        initialX,
                        initialY,
                        deltaX,
                        deltaY,
                        status: 'move'
                    });
                }
            }

            function onMouseUp(e: any) {
                let targetEl;

                if (el) {
                    el.style.visibility = 'hidden';
                }

                if (e.type === 'touchend') {
                    targetEl = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

                    window.removeEventListener('touchmove', onMouseMove);
                    window.removeEventListener('touchend', onMouseUp);
                } else {
                    targetEl = document.elementFromPoint(e.clientX, e.clientY);

                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                }

                if (el) {
                    el.style.visibility = 'visible';

                    setState({
                        dragEl: el,
                        targetEl: targetEl ? targetEl.closest('[data-col-id]') : null,
                        initialX,
                        initialY,
                        deltaX: 0,
                        deltaY: 0,
                        status: 'stop'
                    });
                }

                document.body.style.cursor = 'default';
            }

            function onMousedown(e: any) {
                if (e.type === 'touchstart') {
                    initialX = e.changedTouches[0].clientX;
                    initialY = e.changedTouches[0].clientY;

                    window.addEventListener('touchmove', onMouseMove);
                    window.addEventListener('touchend', onMouseUp);
                } else {
                    if (e.button !== 0) return; // only left mouse button

                    initialX = e.clientX;
                    initialY = e.clientY;

                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                }

                if (el) {
                    setState({
                        dragEl: el,
                        targetEl: null,
                        initialX,
                        initialY,
                        deltaX,
                        deltaY,
                        status: 'start'
                    });
                }

                document.body.style.cursor = 'move';
            }

            draggableEl.addEventListener('dragstart', (e) => e.preventDefault());
            draggableEl.addEventListener('mousedown', onMousedown);
            draggableEl.addEventListener('touchstart', onMousedown);
        });
    }, [ref, selector]);

    return state;
}
