import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ message, isOpen, onClose, children }: any) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal">
            <span>{message}</span>
            <button type="button" onClick={onClose}>
                Close
            </button>
        </div>,
        document.body
    );
};

export default Modal;

// function Component() {
//     const [open, setOpen] = React.useState(false);
//     return (
//         <div className="component">
//             <button type="button" onClick={() => setOpen(true)}>Open Modal</button>
//             <Modal message="Hello World!" isOpen={open} onClose={() => setOpen(false)} />
//         </div>
//     );
// }
