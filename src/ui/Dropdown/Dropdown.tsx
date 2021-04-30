import React from 'react';
import Tippy from '@tippyjs/react/headless';
// eslint-disable-next-line import/no-extraneous-dependencies
// import 'tippy.js/dist/tippy.css';
import { useSpring, motion } from 'framer-motion';
import Button from '../Button/Button';

export default function Dropdown() {
    const [visible, setVisible] = React.useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const springConfig = { damping: 15, stiffness: 300 };
    // const initialScale = 0.5;
    const opacity = useSpring(0, springConfig);
    // const scale = useSpring(initialScale, springConfig);

    function onMount() {
        // scale.set(1);
        opacity.set(1);
    }

    function onHide({ unmount }: any) {
        // const cleanup = scale.onChange((value) => {
        //     if (value <= initialScale) {
        //         cleanup();
        //         unmount();
        //     }
        // });

        // scale.set(initialScale);
        opacity.set(0);
    }

    const clickOutside = (instanse: any, e: any) => {
        if (instanse.popper !== e.target.closest('[data-tippy-root]')) hide();
    };

    return (
        <Tippy
            render={(attrs) => (
                <motion.div style={{ /* scale, */ opacity }} className="box" {...attrs}>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div data-popper-arrow="" />
                </motion.div>
            )}
            visible={visible}
            placement="bottom"
            onClickOutside={clickOutside}
            popperOptions={{
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 0]
                        }
                    }
                    // {
                    //     name: 'arrow',
                    //     options: {
                    //         element: arrow, // can be a CSS selector too
                    //     },
                    // },
                ]
            }}
            interactive
            animation
            onMount={onMount}
            onHide={onHide}
        >
            <Button color="primary" variant="outline" onClick={visible ? hide : show}>
                My button
            </Button>
        </Tippy>
    );
}
