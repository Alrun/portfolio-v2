import React from 'react';
import Tippy from '@tippyjs/react/headless';
// eslint-disable-next-line import/no-extraneous-dependencies
// import 'tippy.js/dist/tippy.css';
import { useSpring, animated } from 'react-spring';
import Button from '../Button/Button';

// const Box = styled(animated.div)`
//   background: #333;
//   color: white;
//   padding: 5px 10px;
//   border-radius: 4px;
// `;

export default function Dropdown() {
    const [visible, setVisible] = React.useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const config = { tension: 300, friction: 15 };
    const initialStyles = { opacity: 0, /* transform: 'scale(0.5)' */ };
    const [props, setSpring] = useSpring(() => initialStyles);

    const onMount = () => {
        setSpring({
            opacity: 1,
            // transform: 'scale(1)',
            onRest: () => {},
            config
        });
    }

    const onHide = ({ unmount }: any) => {
        setSpring({
            ...initialStyles,
            onRest: unmount,
            config: { ...config, clamp: true }
        });
    }

    const clickOutside = (instanse: any, e: any) => {
        if (instanse.popper !== e.target.closest('[data-tippy-root]')) hide();
    };

    return (
        <Tippy
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
            render={(attrs) => (
                <animated.div style={props} className="box" {...attrs}>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div data-popper-arrow="" />
                </animated.div>
            )}
        >
            <Button color="primary" variant="outline" onClick={visible ? hide : show}>
                My button
            </Button>
        </Tippy>
    );
}
