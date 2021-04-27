import React from 'react';
import { useSpring, animated, config } from 'react-spring';

import classes from './TableBody.module.scss';
import { TableBodyProps } from './TableBody.d';

import TableRow from '../TableRow/TableRow';
import TableFixedColumn from '../TableFixedColumn/TableFixedColumn';

const TableBody = React.forwardRef<HTMLDivElement, TableBodyProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableBodyRef(
        { columns, items, groupOpen = [], handleGroupOpen /* , loading, error */ }: TableBodyProps,
        ref
    ) {
        const rendersCount = React.useRef<number>(0);

        const props = useSpring({ config: { ...config.stiff }, from: { opacity: 0 }, to: { opacity: 1 } });

        const fixedColumns = columns.filter((col) => col.fixed && !col.hidden);

        const padding = fixedColumns.reduce((acc, cur) => {
            if (!cur.hidden) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        const fullWidth = columns.reduce((acc, cur) => {
            if (!cur.hidden && !cur.fixed) {
                return acc + cur.width;
            }
            return acc;
        }, 0);

        return (
            <div ref={ref} className={classes.root} style={{ paddingLeft: `${padding}px` }}>
                <TableFixedColumn
                    columns={columns}
                    items={items}
                    groupOpen={groupOpen}
                    handleGroupOpen={handleGroupOpen}
                />

                <div className={classes.container} style={{ minWidth: `${fullWidth}px` }}>
                    {!!items.length &&
                        items.map((item) =>
                            item.group?.length ? (
                                <div data-group={item.id} key={item.id}>
                                    <TableRow item={item} columns={columns} />

                                    {groupOpen.includes(item.id) && (
                                        <animated.div style={props} className={classes.group}>
                                            {item.group.map((groupItem) => (
                                                <TableRow
                                                    key={groupItem.id}
                                                    item={groupItem}
                                                    columns={columns}
                                                    isGroup
                                                />
                                            ))}
                                        </animated.div>
                                    )}
                                </div>
                            ) : (
                                <TableRow key={item.id} item={item} columns={columns} />
                            )
                        )}
                    <b style={{ position: 'absolute', top: '130px' }}>
                        {/* eslint-disable-next-line no-plusplus */}
                        Table Body RENDER COUNT: {++rendersCount.current}
                    </b>
                </div>
            </div>
        );
    }
);

export default TableBody;
