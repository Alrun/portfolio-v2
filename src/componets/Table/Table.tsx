import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { reorder, resize, setData, tableSelector } from '../../redux/slices/table/table';
import classes from './Table.module.scss';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import TableFooter from '../TableFooter/TableFooter';
import { tableDataSuccess } from '../../__mock__/tableDataMock';

export default function Table() {
    const { columns, items, loading, error } = useSelector(tableSelector);
    const dispatch = useDispatch();

    const rendersCount = React.useRef<number>(0);

    const rootRef = React.useRef<HTMLDivElement>(null);
    const headRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    /**
     * Get data
     */
    React.useEffect(() => {
        dispatch(setData(JSON.parse(tableDataSuccess).data));
    }, [dispatch]);
    /**
     * Reorder columns
     */
    const handleReorder = React.useCallback(
        (orders) => {
            dispatch(reorder(orders));
        },
        [dispatch]
    );
    /**
     * Resize column
     */
    const handleResize = React.useCallback(
        (id, width) => {
            dispatch(resize({ id, width }));
        },
        [dispatch]
    );
    /**
     * Connect scroll and head
     */
    const handleScrollEvent = (e: any) => {
        const head = headRef.current;
        const body = bodyRef.current;

        if ('ontouchstart' in document.documentElement) {
            if (head) head.scrollLeft = e.target.scrollLeft;
        } else if (head && body) {
            body.scrollLeft = e.target.scrollLeft;
            head.scrollLeft = e.target.scrollLeft;
        }
    };
    /**
     * Add body scroll listener
     */
    React.useLayoutEffect(() => {
        const body = bodyRef.current;
        const scroll = scrollRef.current;

        if ('ontouchstart' in document.documentElement) {
            if (body) {
                body.style.overflow = 'auto';
                body.addEventListener('scroll', handleScrollEvent, { passive: true });
            }
        } else if (scroll) {
            scroll.addEventListener('scroll', handleScrollEvent, { passive: true });
        }

        return (): void => {
            if ('ontouchstart' in document.documentElement) {
                if (body) {
                    body.removeEventListener('scroll', handleScrollEvent);
                }
            } else if (scroll) {
                scroll.removeEventListener('scroll', handleScrollEvent);
            }
        };
    }, []);

    return (
        <div className={classes.root} ref={rootRef}>
            <div className={classes.container}>
                <TableHead
                    columns={columns}
                    handleResize={handleResize}
                    handleReorder={handleReorder}
                    ref={headRef}
                    tableRef={rootRef}
                    bodyRef={bodyRef}
                />

                <TableBody columns={columns} items={items} loading={loading} error={error} ref={bodyRef} />

                <TableFooter columns={columns} ref={scrollRef} />
            </div>

            {/* eslint-disable-next-line no-plusplus */}
            <b style={{ position: 'absolute', top: '130px' }}>Table RENDER COUNT: {++rendersCount.current}</b>
        </div>
    );
}
