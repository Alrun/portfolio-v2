import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import throttle from 'lodash/throttle';
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
    const headRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    // const [width, setWidth] = React.useState<number>(0);

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

    const handleScrollEvent = (e: any) => {
        const headWrapper = headRef.current?.children[0] as HTMLElement;
        const body = bodyRef.current as HTMLElement;

        if ('ontouchstart' in document.documentElement) {
            headWrapper.scrollLeft = e.target.scrollLeft;
        } else {
            body.scrollLeft = e.target.scrollLeft;
            headWrapper.scrollLeft = e.target.scrollLeft;
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

    const handleSetWidth = (w: any) => {
        // console.log(111, w);
        // setWidth(w);
    };

    return (
        <div ref={rootRef} className={classes.root}>
            <div className={classes.wrapper}>
                <div ref={headRef} className={classes.head}>
                    <TableHead columns={columns} handleResize={handleResize} handleReorder={handleReorder} />
                </div>
                <div ref={bodyRef} className={classes.body}>
                    <div className={classes.bodyWrapper}>
                        <TableBody data={tableBodyData.data} columns={columns} isLoading={tableBodyData.isLoading} />
                    </div>
                </div>
                {/* <TableScrollBar width={width} /> */}
                <div className={classes.footer}>
                    <div>0000</div>
                    <div ref={scrollRef} className={classes.footerWrapper}>
                        <div>1111</div>
                        <div className={classes.scrollBar}
                            style={{
                                width: `${columns.reduce((acc, cur) => acc + cur.width, 0)}px`
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* eslint-disable-next-line no-plusplus */}
            <b>Table RENDER COUNT: {++rendersCount.current}</b>

            <input type="text" onChange={(e) => handleSetWidth(e.currentTarget)} />
        </div>
    );
}
