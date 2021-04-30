import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapseProps {
    show: boolean;
    children: JSX.Element;
    id?: string;
}

const Collapse: React.FC<CollapseProps> = ({ show, children, id }: CollapseProps) => (
    <AnimatePresence initial={false}>
        {show && (
            <motion.div
                key={id}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 }
                }}
                transition={{
                    duration: 0.2
                    // ease: [0.04, 0.62, 0.23, 0.98]
                }}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

export default Collapse;
