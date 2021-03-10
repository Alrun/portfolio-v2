import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Table.module.scss';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import { tableDataSuccess } from '../../__mock__/tableDataMock';
import { reorder, resize, setData, tableSelector } from '../../redux/slices/table';
import TableFooter from '../TableFooter/TableFooter';

export default function Table() {
    const { columns, sort, items, groupOpen, loading, error } = useSelector(tableSelector);
    const dispatch = useDispatch();

    const rendersCount = React.useRef<number>(0);

    const rootRef = React.useRef<HTMLDivElement>(null);
    const headRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        dispatch(setData(JSON.parse(tableDataSuccess).data));
    }, [dispatch]);

    const handleReorder = React.useCallback(
        (orders) => {
            dispatch(reorder(orders));
        },
        [dispatch]
    );

    const handleResize = React.useCallback(
        (id, width) => {
            dispatch(resize({ id, width }));
        },
        [dispatch]
    );

    const handleScrollEvent = (e: any) => {
        const head = headRef.current as HTMLElement;
        const body = bodyRef.current as HTMLElement;

        if ('ontouchstart' in document.documentElement) {
            head.scrollLeft = e.target.scrollLeft;
        } else {
            body.scrollLeft = e.target.scrollLeft;
            head.scrollLeft = e.target.scrollLeft;
        }
    };

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
                />

                <TableBody items={items} columns={columns} loading={loading} error={error} ref={bodyRef} />

                <TableFooter columns={columns} ref={scrollRef} />
            </div>

            {/* eslint-disable-next-line no-plusplus */}
            <b>Table RENDER COUNT: {++rendersCount.current}</b>
        </div>
    );
}
