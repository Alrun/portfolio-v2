import React from 'react';

import classes from './TableFooter.module.scss';
import { TableColumnsInterface } from '../../redux/slices/table';

interface TableFooterProps extends React.ComponentPropsWithoutRef<'div'> {
    columns: TableColumnsInterface[];
}

const TableFooter = React.forwardRef<HTMLDivElement, TableFooterProps>(({ columns }: TableFooterProps, ref) => {
    const width = columns.reduce((acc: any, cur: any) => {
        if (!cur.isHidden) {
            return acc + cur.width;
        }
        return acc;
    }, 0);

    const rendersCount = React.useRef(0);

    return (
        <div className={classes.root}>
            <div ref={ref} className={classes.container}>
                <b style={{ position: 'absolute', bottom: '20px' }}>
                    {/* eslint-disable-next-line no-plusplus */}
                    Table Footer RENDER COUNT: {++rendersCount.current}
                </b>
                <div
                    className={classes.scrollBar}
                    style={{
                        width: `${width}px`
                    }}
                />
            </div>
        </div>
    );
});

export default TableFooter;
