import React from 'react';

const Draggable = React.forwardRef<HTMLDivElement, any>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    // eslint-disable-next-line react/prop-types
    function DraggableRef({ children }: any, ref) {
        // console.log('drag ', ref);

        return children;
    }
);

export default Draggable;
