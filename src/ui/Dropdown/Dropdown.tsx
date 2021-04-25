import React from 'react';
import Tippy from '@tippyjs/react/headless';
// eslint-disable-next-line import/no-extraneous-dependencies
// import 'tippy.js/dist/tippy.css';

export default function Dropdown() {
    const [visible, setVisible] = React.useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

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
            render={(attrs) => (
                <div className="box" style={{ background: '#eee', pointerEvents: 'auto' }} {...attrs}>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div>My tippy box</div>
                    <div data-popper-arrow="" />
                </div>
            )}
        >
            <button type="button" onClick={visible ? hide : show}>
                My button
            </button>
        </Tippy>
    );

    //
    // return (
    //     <Tippy content="Tooltip" visible={visible} onClickOutside={hide}>
    //         <button type="button" onClick={visible ? hide : show}>Reference</button>
    //     </Tippy>
    // );
}
