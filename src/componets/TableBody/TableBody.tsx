import React from 'react';

import classes from './TableBody.module.scss';
import { TableBodyProps } from './TableBody.d';

import TableRow from '../TableRow/TableRow';
import TableFixedColumn from '../TableFixedColumn/TableFixedColumn';
import Collapse from '../../ui/Collapse/Collapse';

const TableBody = React.forwardRef<HTMLDivElement, TableBodyProps>(
    /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
    function TableBodyRef(
        {
            columns,
            items,
            groupOpen = [],
            handleGroupOpen,
            checkedItems = {},
            handleCheckboxChange /* , loading, error */
        }: TableBodyProps,
        ref
    ) {
        const rendersCount = React.useRef<number>(0);

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
                    checkedItems={checkedItems}
                    handleCheckboxChange={handleCheckboxChange}
                />

                <div className={classes.container} style={{ minWidth: `${fullWidth}px` }}>
                    {!!items.length &&
                        items.map((item) =>
                            item.group?.length ? (
                                <div data-group={item.id} key={item.id}>
                                    <TableRow item={item} columns={columns} />

                                    <Collapse show={groupOpen.includes(item.id)} id={item.id}>
                                        <div className={classes.group}>
                                            {item.group.map((groupItem) => (
                                                <TableRow
                                                    key={groupItem.id}
                                                    item={groupItem}
                                                    columns={columns}
                                                    isGroup
                                                />
                                            ))}
                                        </div>
                                    </Collapse>
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
