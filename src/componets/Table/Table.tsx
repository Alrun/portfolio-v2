import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Table.module.scss';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import { tableDataSuccess } from '../../__mock__/tableDataMock';
import { reorder, tableSelector } from '../../redux/slices/table';
import useScroll from '../../hooks/useScroll';

const tableBodyData = {
    data: JSON.parse(tableDataSuccess).data,
    isLoading: false
};

const TableScrollBar = ({ width }: any) => (
    <div className={classes.scrollBar}>
        <div className={classes.scrollBarInner} style={{ width: `${width}px` }} />
    </div>
);

export default function Table() {
    const { columns, sort, items, groupOpen, loading, error } = useSelector(tableSelector);
    const dispatch = useDispatch();
    const rendersCount = React.useRef<number>(0);

    const rootRef = React.useRef<HTMLDivElement>(null);

    const [width, setWidth] = React.useState<number>(0);

    // const handleSetWidth = (e: any) => {
    //     if (e.value) {
    //         // dispatch()
    //     }
    //
    //     console.log(e.value);
    //
    //     // dispatch()
    // };

    const handleResize = (w: any, c: any) => {
        console.log(c);
    };

    const handleReorder = React.useCallback(
        (orders) => {
            dispatch(reorder(orders));
        },
        [dispatch]
    );

    // React.useLayoutEffect(() => {
    //
    //         // @ts-ignore
    //         setWidth(rootRef.current?.scrollWidth);
    //
    //     console.log('w ', rootRef.current?.scrollWidth);
    //
    // }, []);

    const handleSetWidth = (w: any) => {
        console.log(111, w);
        // setWidth(w);
    };

    return (
        <div ref={rootRef} className={classes.root}>
            <div className={classes.wrapper}>
                <TableHead columns={columns} handleResize={handleResize} handleReorder={handleReorder} />
                <TableBody
                    data={tableBodyData.data}
                    columns={columns}
                    isLoading={tableBodyData.isLoading}
                    handleSetWidth={handleSetWidth}
                />
                {/* <TableScrollBar width={width} /> */}
            </div>
            {/* eslint-disable-next-line no-plusplus */}
            <b>Table RENDER COUNT: {++rendersCount.current}</b>

            <input type="text" onChange={(e) => handleSetWidth(e.currentTarget)} />
        </div>
    );
}
