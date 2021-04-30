import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import classes from './TableFooter.module.scss';
import { TableFooterProps } from './TableFooter.d';
import Button from '../../ui/Button/Button';

const TableFooter = React.forwardRef<HTMLDivElement, TableFooterProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableFooterRef({ columns, checkedCount }: TableFooterProps, ref) {
        const width = columns.reduce((acc, cur) => {
            if (!cur.hidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        // const rendersCount = React.useRef<number>(0);

        return (
            <div className={classes.root}>
                <AnimatePresence initial={false}>
                    {checkedCount && (
                        <motion.div
                            key="action"
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
                            <div style={{ display: 'flex', padding: 15, background: '#f6c3c3' }}>
                                {`Selected ${checkedCount}`}
                                <Button variant="filled" color="danger">
                                    Delete
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={ref} className={classes.container}>
                    {/* <div className={classes.actions}> */}
                    {/*    <span>Table Footer Actions</span> */}
                    {/*    <b style={{ marginLeft: 'auto' }}> */}
                    {/*        /!* eslint-disable-next-line no-plusplus *!/ */}
                    {/*        Table Footer RENDER COUNT: {++rendersCount.current} */}
                    {/*    </b> */}
                    {/* </div> */}

                    <div
                        className={classes.scrollBar}
                        style={{
                            width: `${width}px`
                        }}
                    />
                </div>
            </div>
        );
    }
);

export default TableFooter;
